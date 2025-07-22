import cloudinary from "../lib/cloudinary.js";
import { redis } from "../lib/redis.js";
import Products from "../models/product.model.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await Products.find({});
    res.json({ products });
  } catch (error) {
    console.log("Error in getAllProducts controller ", error);
    res
      .status(500)
      .json({ message: "internal Server Error", error: error.message });
  }
};

export const getFeaturedProducts = async (req, res) => {
  try {
    //fetching from redis
    let featuredProducts = redis.get("featured_products");
    if (featuredProducts) {
      return res.json(JSON.parse(featuredProducts));
    }

    // if not in redis fetch it from mongoDB
    featuredProducts = await Products.find({ isFeatured: true }).lean();
    // .lean() is gonna return plain javascript object instead of mongodb document which good for the performance.

    if (!featuredProducts) {
      return res.status(404).json({ message: "No featured Product found" });
    }

    //store in redis for future quick access
    await redis.set("featured_products", JSON.stringify(featuredProducts));
    res.json(featuredProducts);
  } catch (error) {
    console.log("Error in getFeaturedProduct controller");
    res.status(500).json({ message: "Server Error ", error: error.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, description, category, price, image } = req.body;
    let cloudinaryResponse = null;

    if (image) {
      cloudinaryResponse = await cloudinary.uploader.upload(image, {
        folder: "products",
      });
    }

    const product = await Products.create({
      name,
      category,
      price,
      description,
      image: cloudinaryResponse?.secure_url ? cloudinaryResponse : "",
    });
    res.status(201).json(product);
  } catch (error) {
    console.log("Error in create product middleware");
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const deleteProduct = async () => {
  try {
    const product = await Products.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.image) {
      const publicId = product.image.split("/").pop().split(".")[0];
      try {
        await cloudinary.uploader.destroy(`product/${publicId}`);
        console.log("Image deleted from cloudinary");
      } catch (error) {
        console.log("error in deleting the image from cloudinary", error);
      }
    }
    await Products.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.log("Error in product delete controller", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const getRecommendedProducts = async () => {
  try {
    const products = Products.aggregate([
      {
        $sample: {
          size: 3,
        },
        $project: {
          _id: 1,
          name: 1,
          description: 1,
          image: 1,
          price: 1,
        },
      },
    ]);
    res.json(products);
  } catch (error) {
    console.log("Error in getRecommendedProduct controller", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const getProductsByCategory = async () => {
  const { category } = req.params;
  try {
    const products = await Products.find({ category });
    res.json(products);
  } catch (error) {
    console.log("Error in getProductsByCategory controller", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const toggleFeaturedProduct = async () => {
    try {
      const product = await Products.findById(req.params.id);
      if(product){
        product.isFeatured=!product.isFeatured
        const updatedProduct = await product.save();
        await updateFeaturedProductCache();
        res.json(updatedProduct)
      }else{
        res.status(404).json({message:"Product not found"})
      }
    } catch (error) {
       console.log("Error in toggleFeaturedProduct controller", error.message);
       res.status(500).json({ message: "Server Error", error: error.message });
      
    }
}

async function updateFeaturedProductCache(){
  try {
    const featuredProducts = await Products.find({isFeatured:true}).lean();
    await redis.set("featured_products",JSON.stringify(featuredProducts))
  } catch (error) {
    console.log("Error in update Featured Product cache function", error.message);
    
  }
}