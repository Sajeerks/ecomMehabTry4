import axios from 'axios'



export const  logoutAction = ()=>async(dispatch)=>{
   try {
      
      dispatch({type:"logoutRequest"})
      //  const config = { headers: { "Content-Type": "application/json" } };
         const {data} = await axios.get(`/api/v1/logout` ) 
         console.log(`data in logoutAction  =`,data)
         dispatch({type:"logoutSuccess" , payload:data.message})
  
   } catch (error) {
     console.log("eror in logoutFail",error)
      dispatch({type:'loadUserFail' ,  payload:error.response.data.message})
   }
  
  }





















export const  loadUserAction = ()=>async(dispatch)=>{
   try {
      
      dispatch({type:"loadUserRequest"})
       const config = { headers: { "Content-Type": "application/json" } };
         const {data} = await axios.get(`/api/v1/me` , config) 
        //  console.log(data)
         dispatch({type:"loadUserSuccess" , payload:data.user})
  
   } catch (error) {
   //   console.log("eror in loadUserAction",error)
      dispatch({type:'loadUserFail' ,  payload:error.response.data.message})
   }
  
  }










export const loginAction  = (email,password)=>async(dispatch)=>{
    try {
       
       dispatch({type:"loginRequest"})
        const config = { headers: { "Content-Type": "application/json" } };
          const {data} = await axios.post(`/api/v1/login` , {email, password} , config) 
         //  console.log(data)
          dispatch({type:"loginSuccess" , payload:data.user})
   
    } catch (error) {
      // console.log("eror in getSingleProductsFail",error)
       dispatch({type:'loginFail' ,  payload:error.response.data.message})
    }
   
   }




















export const createNewUserAction  = (formData)=>async(dispatch)=>{
    try {
       
       dispatch({type:"createUserRequest"})
    //    console.log("herererer")
    //    console.log(formData)
    //         for (var pair of formData.entries()) {
    // //   console.log("in product actions")
    //   console.log(pair[0]+ ', ' + pair[1]);
    //   }
       const config = { headers: { "Content-Type": "multipart/form-data" } };
     

          const {data} = await axios.post(`/api/v1/newuser`,formData,config) 
        //   console.log(data)
          dispatch({type:"createUserSuccess" , payload:data.user})
   
    } catch (error) {
    //   console.log("eror in createNewUserAction",error)
       dispatch({type:'createUserFail' ,  payload:error.response.data.message})
    }
   
   }