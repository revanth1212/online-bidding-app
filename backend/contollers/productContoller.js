const Product=require('../models/productModel');
const APIFeatures = require('../utils/apifeatures');


//Get products - /api/v1/products
/* exports.getProducts = async(req, res, next)=>{
    const resPerPage=3;
    const apiFeatures=new APIFeatures(Product.find(),req.query).search().filter().paginate(resPerPage);
    const products= await apiFeatures.query;
    res.status(200).json({
        success : true,
        products
    })
} */
// Backend route handler for fetching paginated products
exports.getProducts = async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 2;

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const results = {};

  try {
    results.totalCount = await Product.countDocuments().exec();
    results.products = await Product.find().limit(limit).skip(startIndex).exec();

    res.status(200).json({
      success: true,
      pagination: {
        totalPages: Math.ceil(results.totalCount / limit),
        currentPage: page,
      },
      data: results.products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
    });
  }
};




//Create Product -/api/v1/product/new
exports.newProduct=async(req,res,next)=>{

    req.body.user=req.user.id;
    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        product
    })
}

//Get single product-/api/v1/product/id(get)

exports.getSingleProduct=async(req,res,next)=>{
    const product= await Product.findById(req.params.id);
    if(!product){
        return res.status(404).json({
            success:false,
            message:"Product not found"
        })
    }

    res.status(201).json({
        success:true,
        product
    })
}

//Update product-/api/v1/product/id(put)

exports.updateProduct=async(req,res,next)=>{
    let product;
    product=await Product.findById(req.params.id);

    if(!product){
        return res.status(404).json({
            success:false,
            message:"Product not found"
        })
    }
    
    product=await Product.findByIdAndUpdate(req.params.id,req.body,{
        new: true,
        runValidators:true
    })
    res.status(200).json({
        success:true,
        product
    })
}

exports.deleteProduct=async(req,res,next)=>{
    
    const product=await Product.findByIdAndDelete(req.params.id);

    if(!product){
        return res.status(404).json({
            success:false,
            message:"Product not found"
        })
    }

    await product.deleteOne();

    res.status(200).json({
        success:true,
        message:"Product deleted!"
    })
}