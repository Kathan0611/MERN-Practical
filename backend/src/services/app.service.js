const User=require('./../models/user.model');

const AppService = {
  home: () => ({ title: 'home' }),
  findUserByEmail: async (email) => {
    return await User.findOne({ Email: email });
  },
  createUser: async (userData) => {
    const user = new User(userData);
    return await user.save();
  },
  findById:async(userId)=>{
    const user= await User.findById({_id:userId})
    return user;
  }
}

module.exports = AppService;