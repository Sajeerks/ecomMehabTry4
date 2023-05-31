import React, { Fragment, useState, useRef, useEffect } from "react";
import "./LoginSignup.css";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Avatar, Button, Typography } from "@mui/material";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import profilePic from "../../images/Profile.png";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { createNewUserAction, loginAction } from "../../actions/userActions";
import Loader from "../Loader/Loader";
import { useTheme } from "@emotion/react";
import { Link, Navigate, redirect, useNavigate } from "react-router-dom";

const LoginSignup = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const  {loading:userLoading, user, error:userError, isAuthenticated , message:userMessage} = useSelector(state=>state.userReducer)

 const [showSingUP, setshowSingUP] = useState(false)
  const [userData, setuserData] = useState({
    name: "",
    email: "",
    password: "",
    avatar: "",
  });
 const theme = useTheme()
  const uploadInputRef = useRef(null);
  const loginPageRef = useRef(null);
  const sigUpPageRef = useRef(null);



  const [avatarPreview, setavatarPreview] = useState(profilePic);
  const [avatar, setavatar] = useState("");
  const hangleSignUpFormChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setavatarPreview(reader.result);
          setavatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    }
    else{
      setuserData({ ...userData, [e.target.name]: e.target.value });
  
  
    }

  }

  
  const createUserFormSubmithandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", userData.name);
    myForm.set("email", userData.email);
    myForm.set("password", userData.password);
    // myForm.set("avatar", userData.avatar);
    myForm.set("avatar", avatar);


    // console.log({ userData });
   dispatch(createNewUserAction(myForm))
    
    

    console.log("create user form submitted");
  };


  // console.log({userError})
  useEffect(() => {
  if(userError){
    toast.error(userError)
    dispatch({type:"clearErrors"})
  }
  if(userMessage){
    toast.success(userMessage)
    dispatch({type:"clearMessages"})
  }
  if(user){
    navigate("/")
  }
  }, [userError, user,userMessage])

  const loginFormSubmitHandler =(e)=>{
    e.preventDefault();
      dispatch(loginAction(userData.email,userData.password))
     console.log("login fom is submited")

  }
  const handleLoginChangeHandler =(e) =>{
    setuserData({ ...userData, [e.target.name]: e.target.value });
  }
  
const togglerFOrm =(value)=>{
 
   if(value ==="login"){
    setshowSingUP(false)
    loginPageRef.current.classList.add("toNeutral")
    loginPageRef.current.classList.remove("toRight")

    sigUpPageRef.current.classList.add("toRight")
    sigUpPageRef.current.classList.remove("toLeft")


   
   }else{
    setshowSingUP(true)
    loginPageRef.current.classList.remove("toNeutral")
    loginPageRef.current.classList.add("toRight")

    sigUpPageRef.current.classList.remove("toRight")
    sigUpPageRef.current.classList.add("toLeft")

   }
  

 

  //  showSingUP&& :
  //  sigUpPageRef
}


  return (
    <Fragment>
        {userLoading?(<Loader/>):(
            <Fragment>
              <div className="mainloginsignup_DIV">
              <div className="chooseFormDiv" >  
                 <Box display={"flex"}
                   sx={{flexDirection:"row" ,}}
                  >
                 <button onClick={()=>{togglerFOrm("login")}}   style={{backgroundColor:!showSingUP?"violet":"lightblue" }}> Login Form</button>
                 <button onClick={()=>{togglerFOrm("signup")}}   style={{backgroundColor:showSingUP?"violet":"lightblue" }}>Sign up Form </button>
         

                 </Box>
            
         
 
        </div>
      

    <div className="loginForm toNeutral"  ref={loginPageRef}  >
    <form
            onSubmit={loginFormSubmitHandler}
            encType="multipart/form-data"
          >
  
         <Box
              display={"flex"}
              flexDirection={"column"}
              alignItems={"center"}
              justifyContent={"center"}
              gap={"2vmax"}
              height={"100%"}
              // width={"60vw"}
              sx={{ flexGrow: 1 }}
              boxShadow={theme.shadows[10]}
              padding={10}
              
            >
           <TextField
                id="outlinedfdfdd-"
                label="email"
                variant="outlined"
                fullWidth
                type="email"
                name="email"
                placeholder="enter ur email"
                value={userData.email}
                onChange={handleLoginChangeHandler}
              />
              <TextField
                id="outlined-bdfdfasisfdfdc"
                label="password"
                variant="outlined"
                type="password"
                fullWidth
                name="password"
                placeholder="enter ur password"
                value={userData.password}
                onChange={handleLoginChangeHandler}
              />

        <Button variant="contained" fullWidth type="submit">
                LOGIN
              </Button>



            <Box  sx={{ml:"50%"}}>
                <Link  to="/forgotPassword">
              <Typography sx={{color:"grey"}}>forgot Password</Typography>

                </Link>
         
            </Box>



            </Box>











          </form>



    </div>
      







     
        <div className="onlySignUp_div toRight"  ref={sigUpPageRef} >
          <form
            onSubmit={createUserFormSubmithandler}
            encType="multipart/form-data"
          >
            <Box
              display={"flex"}
              flexDirection={"column"}
              alignItems={"center"}
              justifyContent={"center"}
              gap={"2vmax"}
              height={"80%"}
              // width={"60vw"}
              // sx={{ flexGrow: 1 }}
              px={"1vmax"}
              boxShadow={theme.shadows[10]}
              
            >
              {/* <Avatar sx={{ width: 56, height: 56 }} src={avatarPreview} /> */}
              <img className="signUpImage" src={avatarPreview} />

              <TextField
                id="outlined-basicss"
                label="name"
                variant="outlined"
                fullWidth
                placeholder="enter ur name"

                name="name"
                value={userData.name}
                onChange={hangleSignUpFormChange}
              />

              <TextField
                id="outlined-"
                label="email"
                variant="outlined"
                fullWidth
                type="email"
                name="email"
                placeholder="enter ur email"
                value={userData.email}
                onChange={hangleSignUpFormChange}
              />
              <TextField
                id="outlined-basic"
                label="password"
                variant="outlined"
                type="password"
                fullWidth
                name="password"
                placeholder="enter ur password"
                value={userData.password}
                onChange={hangleSignUpFormChange}
              />
                  <input
                ref={uploadInputRef}
                  accept="image/*"
                  style={{ display: "none" }}
                  id="raised-button-file"
                  // multiple
                  type="file"
                  name="avatar"
              
                  onChange ={hangleSignUpFormChange}
                />

              <Button  variant="outlined" fullWidth      onClick={() => uploadInputRef.current && uploadInputRef.current.click()} >
                 choose profile Pic
              </Button>

              {/* <TextField
                id="outline"
                // label="password"
                variant="outlined"
                type="file"
                fullWidth
                name="avatar"
              
                  onChange ={hangleSignUpFormChange}
              /> */}
              <Button variant="contained" fullWidth type="submit" sx={{mb:1} }>
                Create User
              </Button>
            </Box>
          </form>
        </div>
      </div>
      </Fragment>
        )}
    </Fragment>
  );
};

export default LoginSignup;
