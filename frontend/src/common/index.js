const backendDomain='http://localhost:5000';
console.log(process.env.REACT_APP_BACKEND_URL)
const SummaryApi = {
     Signup:{
        url:`${backendDomain}/api/v1/signup`,
        method:'post'
     },
     Login:{
       url:`${backendDomain}/api/v1/login`,
       method:'post'
     },
     current_user:{
      url:`${backendDomain}/api/v1/userdetails`,
      method:'get'
     }
    
}

export default SummaryApi;
