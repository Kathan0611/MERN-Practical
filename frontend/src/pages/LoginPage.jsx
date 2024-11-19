import  { useState } from 'react'
import { FaEyeSlash } from 'react-icons/fa6';
import { PiUserCircleLight } from "react-icons/pi";
import { FaEye } from "react-icons/fa";
import { Link ,useNavigate} from 'react-router-dom';
import SummaryApi from '../common/index';
import { toast } from 'react-toastify';




const Login = () => {

    const[showPassword,setPassword]=useState(false);
    const [data,setData]=useState({
      Email:"",
      Password:""
    })
   
    const handleOnChange= (e)=>{
      const {name,value}=e.target
      
      setData((preve)=>{
        
        return {
            ...preve,
            [name]:value
      }
      })
    }

    const navigate=useNavigate();
   
    const handleSubmit=async(e)=>{
      e.preventDefault()
      const dataResponse= await fetch(SummaryApi.Login.url,{
        method:SummaryApi.Login.method,
        credentials:'include',
        headers:{ 
          "content-type":"application/json"
        },
        body:JSON.stringify(data)
      })

       const dataApi = await dataResponse.json();
       console.log("data",dataApi)

       if(dataApi.success){
           toast.success(dataApi.message)
           navigate('/')
       }
      
       if(dataApi.error){
         console.log(dataApi.error)
        toast.error(dataApi.message)
       }
    }
    console.log("data login",data)
  
  return (
    <>
    <section id='login'>
      <div className='bg-gray-100 mx-auto container p-4 border-separate'>
        <div className='bg-white p2 w-full max-w-md mx-auto border'>
            <div className='w-20 h-20 mx-auto text-8xl'>
                  <PiUserCircleLight/>
            </div>
            <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>
                <div className='grid'>
                    <label>Email :</label>
                    <div className='bg-slate-100 p-2 flex mx-1'>
                    <input  type="email" placeholder='enter email'
                     name="Email"
                     value={data.Email}
                     onChange={handleOnChange} className='w-full h-full outline-none bg-transparent'/>
                    </div>
                </div>
                <div>
                    <label>Password :</label>
                    <div className='bg-slate-100 p-2 flex mx-1'>
                    <input  type={showPassword? "text":"password"}
                     placeholder='enter password'  
                     value={data.Password}
                     name='Password'
                     onChange={handleOnChange}
                     className='w-full h-full outline-none bg-transparent'/>
                    <div className='cursor-pointer' onClick={()=>setPassword((preve)=>!preve)}>
                      <span>
                        {
                            showPassword?(
                                 <FaEyeSlash/>
                             ):
                             (
                                  <FaEye/>
                             )
                        }
                      </span>
                    </div>
                    </div>
                </div>
                <button className='bg-red-600 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-4'>Login</button>
            </form>
                 <p className='mx-4'>Don't have account ?<Link to={"/register"} className='tex-red-600 hover:text-red-700 hover:underline'>Signup</Link></p>
        </div>
 
      </div>
        </section>
        </>
  )
}

export default Login