import React, { useState } from 'react';
import loginIcons from '../assets/signin.gif';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import imageTobase64 from '../helpers/imageTobase64';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    First_Name: '',
    Last_Name: '',
    Email: '',
    Password: '',
    confirmPassword: '',
    Profile_Picture: '',
    Birthdate: '',
    Phone_Number: '',
  });

  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUploadPic = async (e) => {
    const file = e.target.files[0];
    const imagePic = await imageTobase64(file);

    setData((prev) => ({
      ...prev,
      Profile_Picture: imagePic,
    }));
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (data.Password === data.confirmPassword) {
      const { confirmPassword, ...signupData } = data;
      console.log(data);

      const dataResponse = await fetch(SummaryApi.Signup.url, {
        method: SummaryApi.Signup.method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signupData),
      });

      const dataApi = await dataResponse.json();
       
      if (dataApi.success) {
        toast.success(dataApi.message);
        navigate('/login');
      }
   
      if (dataApi.error) {
        console.log(dataApi.message,"inside")
         toast.error(dataApi.message);
      }
    } else {
        toast.error('Passwords do not match');
    }
  };

  return (
    <section id="signup">
      <div className="mx-auto container p-4 bg-slate-200">
        <div className="bg-white p-5 w-full max-w-sm mx-auto">
          <div className="w-20 h-20 mx-auto relative overflow-hidden rounded-full">
            <div>
              <img src={data.Profile_Picture || loginIcons} alt="profile" />
            </div>
            <form>
              <label>
                <div className="text-xs bg-opacity-80 bg-slate-200 pb-4 pt-2 cursor-pointer text-center absolute bottom-0 w-full">
                  Upload Photo
                </div>
                <input type="file" className="hidden" onChange={handleUploadPic} />
              </label>
            </form>
          </div>

          <form className="pt-6 flex flex-col gap-2" onSubmit={handleSubmit}>
           
            <div className="grid">
              <label>First Name:</label>
              <div className="bg-slate-100 p-2">
                <input
                  type="text"
                  placeholder="Enter your first name"
                  name="First_Name"
                  value={data.First_Name}
                  onChange={handleOnChange}
                  className="w-full h-full outline-none bg-transparent"
                />
              </div>
            </div>

            
            <div className="grid">
              <label>Last Name:</label>
              <div className="bg-slate-100 p-2">
                <input
                  type="text"
                  placeholder="Enter your last name"
                  name="Last_Name"
                  value={data.Last_Name}
                  onChange={handleOnChange}
                  className="w-full h-full outline-none bg-transparent"
                />
              </div>
            </div>

           
            <div className="grid">
              <label>Email:</label>
              <div className="bg-slate-100 p-2">
                <input
                  type="email"
                  placeholder="Enter email"
                  name="Email"
                  value={data.Email}
                  onChange={handleOnChange}
                  className="w-full h-full outline-none bg-transparent"
                />
              </div>
            </div>

          
            <div className="grid">
              <label>Phone Number:</label>
              <div className="bg-slate-100 p-2">
                <input
                  type="tel"
                  placeholder="Enter your phone number"
                  name="Phone_Number"
                  value={data.Phone_Number}
                  onChange={handleOnChange}
                  className="w-full h-full outline-none bg-transparent"
                />
              </div>
            </div>

        
            <div className="grid">
              <label>Birthdate:</label>
              <div className="bg-slate-100 p-2">
                <input
                  type="date"
                  name="Birthdate"
                  value={data.Birthdate}
                  onChange={handleOnChange}
                  className="w-full h-full outline-none bg-transparent"
                />
              </div>
            </div>

        
            <div>
              <label>Password:</label>
              <div className="bg-slate-100 p-2 flex">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter password"
                  value={data.Password}
                  name="Password"
                  onChange={handleOnChange}
                  className="w-full h-full outline-none bg-transparent"
                />
                <div className="cursor-pointer text-xl" onClick={() => setShowPassword((prev) => !prev)}>
                  <span>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
                </div>
              </div>
            </div>

           
            <div>
              <label>Confirm Password:</label>
              <div className="bg-slate-100 p-2 flex">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Enter confirm password"
                  value={data.confirmPassword}
                  name="confirmPassword"
                  onChange={handleOnChange}
                  className="w-full h-full outline-none bg-transparent"
                />
                <div className="cursor-pointer text-xl" onClick={() => setShowConfirmPassword((prev) => !prev)}>
                  <span>{showConfirmPassword ? <FaEyeSlash /> : <FaEye />}</span>
                </div>
              </div>
            </div>

            <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6">
              Sign Up
            </button>
          </form>

          <p className="my-5">
            Already have an account?{' '}
            <Link to="/login" className="text-red-600 hover:text-red-700 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
