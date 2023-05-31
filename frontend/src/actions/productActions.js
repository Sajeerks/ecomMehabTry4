import axios from 'axios'



export const getSingleProductAction  = (id)=>async(dispatch)=>{
    try {
       
       dispatch({type:"getSingleProductsRequest"})
          const {data} = await axios.get(`/api/v1/product/${id}`) 
         //  console.log(data)
          dispatch({type:"getSingleProductsSuccess" , payload:data.product})
   
    } catch (error) {
      // console.log("eror in getSingleProductsFail",error)
       dispatch({type:'getAllProductsFail' ,  payload:error.response.data.message})
    }
   
   }








export const getAllProductsAction  = (currentPage=1,price=[0,10000],keyword="",category,ratings=0)=>async(dispatch)=>{
    try {
       
       dispatch({type:"getAllProductsRequest"})
         //  console.log({currentPage})
         //  console.log({price})
         // console.log({keyword})
         // console.log({category})
         // console.log({ratings})

         // const {data} = await axios.get(`/api/v1/products`) 
         let link
         if(category){
              link =`/api/v1/products?page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}
              &keyword=${keyword}&category=${category}&ratings[gte]=${ratings}` 
         }else{
            link =`/api/v1/products?page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}
              &keyword=${keyword}&ratings[gte]=${ratings}` 
         }

          const {data} = await axios.get(link) 
         //  console.log(data)
          dispatch({type:"getAllProductsSuccess" , payload:data})
   
    } catch (error) {
      // console.log("eror in userProfileFail",error)
       dispatch({type:'getAllProductsFail' , payload:error.response.data.message})
    }
   
   }