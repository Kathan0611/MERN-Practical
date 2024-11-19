const AppService = require("../services/app.service");
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const cloudinary = require('cloudinary').v2 
const path=require('path')
const fs=require('fs')


cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret 
});


// const AppController =  {
//   home:(req, res, next) =>{
//       res.send(AppService.home());
//   },
//   Register:async(req,res,next)=>{
//     register: async (req, res, next) => {
//       try {
        
//         const { error } = registerSchema.validate(req.body);
//         if (error) return res.status(400).send(error.details[0].message);

//         const user = await AppService.findUserByEmail(req.body.Email);
//         if (user) return res.status(400).send('User already exists');
  
//         const hashedPassword = await bcrypt.hash(req.body.Password, 10);
//         const newUser = await AppService.createUser({
//           ...req.body,
//           Password: hashedPassword, 
//         });
  
//         res.status(201).send({ message: 'User registered successfully', user: newUser });
//       } catch (error) {
//         next(error);
//       }
    

//   }
// },
//   Register:(req,res,next)=>{
//     res.send(AppService.Register());
//   }
// }

exports.Register=async(req,res)=>{
    try {  
       const {Email,Profile_Picture,Password,First_Name,Last_Name}=req.body
     let uploadResult;
      const user = await AppService.findUserByEmail(req.body.Email);
      if (user) 
        return res.status(400).json({
        error:true,
        success:false,
        statusCode:400,
        message:'User already exists'
      });


      if(Profile_Picture) {
        console.log("yotuurr")
        const decode=new Buffer.from(Profile_Picture,'utf-8')
        console.log(decode,"hellow")
        const filePath=path.resolve(__dirname,'../uploads/'+ `${Date.now()}.png`)
        console.log(filePath,"filePath")
        fs.writeFileSync(filePath, decode);
        if(!filePath){
            return 'localfilePath not exist'
          }
           uploadResult = await cloudinary.uploader.upload(filePath,{
             public_id: 'user',
             folder:'Profile',
             resource_type:'auto'
         }
     )
     .catch((error) => {
         console.log(error.message);
     });

      }

      const hashedPassword = await bcrypt.hash(req.body.Password, 10);
      const newUser = await AppService.createUser({
        First_Name:First_Name,
        Last_Name:Last_Name,
        Email:Email,
        Profile_Picture:uploadResult?uploadResult.secure_url:null,
        Password: hashedPassword, 
      });

      return res.status(201).json({
         error:false,
         success:true,
         statusCode:201,
         message: 'User registered successfully', 
         user: newUser 
        });
     }
     catch(error){
      console.log(error.message)
      return res.status(500).json({
        error:true,
        statusCode:500,
        message:"Internal server error"
      })
    }
  }
exports.Login=async(req,res)=>{
   try{
    const { Email, Password } = req.body;
   
      
      const existUser = await AppService.findUserByEmail(req.body.Email)
      if (!existUser) {
        return res.status(404).json({ 
          error:true,
          success:false,
          statusCode:404,
          message: "Users not found" 
        });
      } 
      else{
        
        const correctPassword= await  bcrypt.compareSync(Password,existUser.Password);

        if(!correctPassword){
            return res.status(401).json({
              error:true,
              success:false,
              statuscode:401,
              message:"Unauthorized User"
            })
        }
        const tokenData={
           _id:existUser._id,
            email:existUser.Email
        }
          
        const token = jwt.sign(tokenData, process.env.SECRECT_KEY,{expiresIn:'1d'});
        
         
        if (!token) {
          return res.status(400).json({ 
            success:false,
            statuscode:400,
            error:true,
            message: "token is not defined" 
          });
        }

        const tokenOptions={
          sameSite:'None',
          httpOnly:true,
          secure:true
        }
      
           return res.status(200).cookie('token',token,tokenOptions).json({
              error:false,
              success:true,
              statusCode: 200,
              message: "Login Successfully",
              data: {
                token: token,
                user: existUser,
              },
            });
          }
   }

   catch(error){
    console.log(error.message)
     return res.status(500).json({
        error:true,
        statusCode:500,
        message:"Internal server error"
     })

   }
}

exports.Home=async(req,res)=>{
   try{
       res.send(AppService.home());
   }
   catch(error){

    return res.status(500).json({
       error:true,
       success:false,
       message:'Internal serveral Error'
    })
  }
}

exports.userDetails=async (req,res)=>{
  try{
      console.log(req.userId,"jee");
      
      const user= await AppService.findById(req.userId)
      
      console.log('user',user)
       
       if(!user){
         return res.status(404).json({
           error: true,
           success:false,
           message:'user doesn`t exist',

         })
       }
       
       return res.status(200).json({
          error:false,
          success:true,
          message:'All userDetails getting Successfully',
          data:user
       })

  }
  catch(error){
    console.log(error.message)
    res.status(500).json({
      error:true,
      success:false,
      message:'server error'
    })
  }
}

exports.logout=async(req,res)=>{
  try{
       if(res?.clearCookie){

         const tokenOptions={
          httpOnly:true,
          secure:true,
          sameSite:'None'
         }
         
        res.clearCookie('token',tokenOptions) 

        res.status(200).json({
          error:false,
          success:true,
          message:"Logout Successfully",
          data:[]
        })
       } 
  }
  catch(error){
    console.log(error.message)
    return res.status(500).json({
      error:true,
      success:false,
      message: error.message ||'server error'
    })
  }
}