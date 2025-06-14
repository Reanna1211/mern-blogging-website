import { useContext, useRef } from "react";
import AnimationWrapper from "../common/page-animation";
import InputBox from "../components/input.component";
import googleIcon from "../imgs/google.png";
import { Link, Navigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import { storeInSession } from "../common/session";
import { UserContext } from "../App";
import { authWithGoogle } from "../common/firebase";

const UserAuthForm = ({ type }) => {


    const authForm = useRef(); 
    // - not working as tutorial states

    let { userAuth : { access_token }, setUserAuth } = useContext(UserContext)

    console.log(access_token)

    //serverRoute is where it has to send the data and formData is what data to send
    const userAuthThroughServer = (serverRoute, formData) => {
        
        axios.post(import.meta.env.VITE_SERVER_DOMAIN + serverRoute, formData)
        .then(({ data }) => {
            // need to stringify data for this function to work then we will convert it back using JSON.parse
            storeInSession("user", JSON.stringify(data))
            // console.log(sessionStorage)
            setUserAuth(data)
            })
        .catch((error) => {
            toast.error(error?.response?.data?.error || 'Something went wrong')
        })
        }
        // .catch(({ response }) => {
        //     toast.error(response.data.error)
        // })
    

    const handleSubmit = (e) => {
        e.preventDefault();

        let serverRoute = type == "sign-in" ? "/signin" : "/signup";

        let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
        let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password


        // formData
        // removed authForm.current as parameter for FormData as no longer using useRef() and using the id of formElement found in form tag- reversed this as have gone back to ref
        // let form = new FormData(authForm.current);
        // let formData = {}

        if (!authForm.current || !(authForm.current instanceof HTMLFormElement)) {
    console.error("authForm is not attached or not a form.");
    return toast.error("Something went wrong. Please refresh and try again.");
  }

 

        //NEW

        const form = new FormData(authForm.current); // argument changed from authForm.current/e.target
        const formData = Object.fromEntries(form.entries());

        // for(let [key, value] of form.entries()) {
        //     formData[key] = value;
        // }

        console.log(formData)


        let { fullname, email, password } = formData

        // form validation

        // need an if statement for if there is a fullname submitted as in sign in page you'll get errors as fullname will be undefined.
        if(fullname){
            if (fullname.length < 3) {
                return toast.error("Fullname must be at least 3 letters long")
            }
        }
       
    
        if (!email.length ) {
          return toast.error("Enter email")
        }
        if (!emailRegex.test(email)) {
          return toast.error("Email is invalid")
        }
      
        if (!passwordRegex.test(password)) {
          return toast.error("Password be 6 to 20 characters long with a numeric, 1 lowercase and 1 uppercase letters")
        }

            
            userAuthThroughServer(serverRoute, formData)
    }
// for google Authentication 
    const handleGoogleAuth = (e) => {
            e.preventDefault();

            authWithGoogle().then(user => {
                
                let serverRoute = "/google-auth" 
                let formData = {
                    access_token: user.accessToken
                }
                userAuthThroughServer(serverRoute, formData)

            })
            .catch(err => {
                toast.error('Trouble logging in through Google')
                return console.log(err)
            })
    }

    return (
        access_token ? 
        <Navigate to="/" />
        :
        <AnimationWrapper keyValue={type}>
       {/* <section className="h-cover flex items-center justify-center"> */}
       <section className="flex items-center justify-center min-h-screen py-10">
        <Toaster />
        {/* Removed ref={authForm} from form as useRef() not working, added id="formElement instead- did the opposite returned ref stuff because issue with signing in/up. */}
        <form ref={authForm} className="w-[80%] max-w-[400px]">
            {/* <h1 className = "text-4xl font-gelasio capitalize text-center mb-24">  */}
            <h1 className="text-4xl font-gelasio capitalize text-center mb-10">
    
                {type == "sign-in" ? "Welcome back" : "Join us today"}
            </h1>

            {
                type != "sign-in" ? 
                <InputBox 
                    name="fullname"
                    type="text"
                    placeholder="Full Name"
                    
                />
                :""
            }

                <InputBox 
                name="email"
                type="email"
                placeholder="Email"
                
            />

                <InputBox 
                name="password"
                type="password"
                placeholder="Password"
                
            />
            
            {/* <button className="btn-light bg-lightpurple center mt-14"
                type="submit"
            > */}
            <button className="btn-light bg-lightpurple center mt-8" 
            type="submit"
            onClick={handleSubmit}> {/* changed from onClick/onSubmit */}
                { type.replace("-", " ") }
            </button>
            {/* <div className="relative w-full flex items-center gap-2 my-10 opacity-10 uppercase text-black font-bold"> */}
            <div className="relative w-full flex items-center gap-2 my-6 opacity-10 uppercase text-black font-bold">
  
                <hr className="w-1/2 border-black" />
                <p>or</p>
                <hr className="w-1/2 border-black" />

            </div>

            <button className="btn-light bg-lightgrey flex items-center justify-center gap-4 w-90% center"
            onClick={handleGoogleAuth}
            >
                <img src= {googleIcon} className="w-5 "/>
                continue with google
            </button>

            {
                type == "sign-in" ? 
                <p className="mt-6 text-dark-grey text-xl text-center">
                    Don't have an account ?
                    <Link to="/signup" className="underline text-black text-xl ml-1">
                    Join us today
                    </Link>


                </p>
                :
                <p className="mt-6 text-dark-grey text-xl text-center">
                Already a member? ?
                <Link to="/signin" className="underline text-black text-xl ml-1">
                Sign in here
                </Link>

            </p>


            }

        </form>

       </section>
       </AnimationWrapper>
    )
}

export default UserAuthForm;