const jwt=require('jsonwebtoken')
const User=require('../models/userModel')


exports.registerUser=async (req,res,next)=>{
    const {name, email,password, avatar}=req.body
    const user=await User.create({
        name,
        email,
        password,
        avatar
    });

    //sendToken(user, 201, res)
    //Creating JWT Token
    const token = user.getJwtToken();
    //setting cookies
    const options={
        expries:new Date(Date.now()+process.env.COOKIE_EXPRIES_TIME*35*60*60*1000),
        httpOnly:true,

    }
    res.status(201)
    .cookie('token',token,options)
    .json({
        success: true,
        user,
        token
    })
}

exports.loginUser = async (req, res, next) => {
    const { email, password } = req.body;
  
    try {
      // Find the user in the database
      const user = await User.findOne({ email }).select('+password');
      
      // Check if the password is valid
      if (!user || !await user.isValidPassword(password)) {
        return res.status(401).json({ success: false, message: 'Invalid email or password' });
      }
  
      // Generate JWT token
      const token = user.getJwtToken();
  
      // Set the cookie with the token
      res.cookie('token', token, {
        expires: new Date(Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000), // Expiry time
        httpOnly: true, // Cookie accessible only by the web server
        // Add other cookie options as needed
      });
  
      // Return success response with token
      res.status(200).json({ success: true, token });
    } catch (error) {
      // Handle errors
      console.error('Login failed:', error);
      res.status(500).json({ success: false, message: 'An error occurred during login' });
    }
  };
  

exports.logoutUser=async (req,res,next)=>{
    res.cookie('token',null,{
        expires:new Date(Date.now()),
        httpOnly:true
    })

    res.status(200).json({
        success:true,
        message:"Logged Out"
    })
}

//Get User Profile - /api/v1/myprofile




exports.getUserProfile = async (req, res) => {
    const user = await User.findById(req.user.id)
    //const user = await User.findOne(req.user.email);
    console.log(user)
    res.status(200).json({
        success:true,
        user
    })
}


// change password - /password/change
exports.changepassword  = async (req, res) => {

    const user = await User.findById(req.user.id).select('+password');
    const isMatch = await user.isValidPassword(req.body.oldpassword);
    if (!isMatch) {
            return res.status(401).json({ success: false, message: "old password is wrong" });
    }
    user.password = req.body.password;
    await user.save();
    res.status(200).json({
        success:true,
        message:'Password changed successfully'
    })
}



//Update profile - /update

exports.updateProfile = async (req, res, next) => {
    const { token } = req.cookies;
    const newUserData = {
        name: req.body.name,
        email: req.body.email
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //req.user = await User.findById(decoded.id);
    const user = await User.findByIdAndUpdate(decoded.id, newUserData, {
        new: true,
        //runValidators: true,
    })

    res.status(200).json({
        success: true,
        user
    })

}


 