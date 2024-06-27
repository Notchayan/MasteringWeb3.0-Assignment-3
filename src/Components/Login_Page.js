import React, {useEffect, useState} from "react";
import { GoogleLogin, googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import './Style_Sheets/Login_Page.css';
import logo from './../Images/user.png';


// log out function to log the user out of google and set the profile array to null
const logOut = (setUser, setProfile) => {
  setUser(null);
  setProfile(null);
};

const Login_Page = ({setProfile, user, setUser}) => {

    const [Google_user, setGoogleUser] = useState([]);

    let USER_NAME = React.createRef();
    let PASSWORD = React.createRef();


    const Google_login = useGoogleLogin({
        onSuccess: (codeResponse) => setGoogleUser(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });
    // log out function to log the user out of google and set the profile array to null
    const Google_logOut = () => {
        googleLogout();
        setProfile(null);
    };

    const Google = props => (
        <button onClick={Google_login} className="Google_Login_Button">Sign in with Google 🚀 </button>
    );

      
    const login = () => {
      console.log("oarwhg");
      console.log(PASSWORD.current.value);
      setUser({
        user_name: USER_NAME.current.value,
        password: PASSWORD.current.value,
      });
    };
    
    const Form = (props) => (
      <div>
        <div class="row">
          <label>{"Username"}</label>
      <input
        type={"text"}
        placeholder={"Enter your username"}
        ref={USER_NAME}
      />
      </div>
      <div class="row">
          <label>{"Password"}</label>
      <input
        type={"password"}
        placeholder={"Enter your password"}
        ref={PASSWORD}
      />
      </div>
          {/* <FormInput description="Password" placeholder="Enter your password" type="password"/> */}
      
          <FormButton title="Log in" onClick={login}/>
        </div>
     );

    const FormButton = (props) => (
        <div id="button" class="row">
            <button onClick={props.onClick}>{props.title}</button>
        </div>
    );
    
    const FormInput = (props) => (
        <div class="row">
            <label>{props.description}</label>
            <input type={props.type} placeholder={props.placeholder}/>
        </div>  
    );
  
    
    const OtherMethods = props => (
        <div id="alternativeLogin">
          <label>Or sign in with:</label>
          <br/><br/>
            <Google />
        </div>
      );
    

    useEffect(() => {
        
        if (Google_user) {
        axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${Google_user.access_token}`, {
            headers: {
                Authorization: `Bearer ${Google_user.access_token}`,
                Accept: 'application/json'
            }
            })
            .then((res) => {
                setProfile(res.data);
                console.log(res.data);
            })
            .catch((err) => console.log(err));
            }
            if(user){
                setProfile({
                    name:user.user_name,
                    picture:logo,
                    email:""
                });
            }
    }, [user, Google_user])
  return (
    <div className="Wrapper">
       <div id="loginform">
       <h2 id="headerTitle">Login</h2>
        <Form />
        <OtherMethods />
      </div>
      {/* <GoogleLogin size='medium' shape='pill' theme='filled_blue' logo_alignment='left' onSuccess={responseMessage} onError={errorMessage}/> */}
   
    </div>
  )
}

export {logOut};
export default Login_Page
