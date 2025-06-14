import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import 'dotenv/config';
import bcrypt from "bcryptjs";
import admin from 'firebase-admin';
import serviceAccountKey from "./react-js-blog-website-1618a-firebase-adminsdk-fbsvc-b447eb8c0f.json" assert { type: "json" } // have to say type json to tell the node module node.js that it's a json file that we are importing
import { getAuth } from "firebase-admin/auth"

// helps with different port numbers between server and frontend
import cors from 'cors';

// nanoid will give a random unique string
import { nanoid } from 'nanoid';

// this will create a long string, to give access tokens to allow client permissions to change or update their profile
import jwt from 'jsonwebtoken';


// Schema below
import User from './Schema/User.js';

// To get the current directory (replaces __dirname in ES modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5005;


admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey)
})

app.use(express.json())

//this will enable our server to accept data from anywhere
app.use(cors({
  origin: 'http://localhost:5173', // Frontend URL
  methods: ['GET', 'POST'],
  credentials: true, // Allow cookies to be sent with the request
})) // was just app.use(cors) but chatGPT said to do this so that we don't get google authentication error

// Serve static files from the frontend's dist folder
// app.use(express.static(path.resolve(__dirname, '../blogging website - frontend/dist')));





app.post("/signup", (req, res) => {

  let {fullname, email, password} = req.body

  if (fullname.length < 3) {
      return res.status(403).json({ "error": "Fullname must be at least 3 letters long" })
  }
  // !email.length means if email length is 0 for example not entered, therefore is no length, it will give an error
  if (!email.length ) {
    return res.status(403).json({ "error": "Enter email"})
  }
  if (!emailRegex.test(email)) {
    return res.status(403).json({ "error": "Email is invalid"})
  }

  if (!passwordRegex.test(password)) {
    return res.status(403).json({ "error": "Password be 6 to 20 characters long with a numeric, 1 lowercase and 1 uppercase letters"})
  }

  //Have to make this function async as well as generateUsername is an asynchronous function and this function will await generateUsername function
  bcrypt.hash(password, 10, async (err, hashed_password) => {

    let username = await generateUsername(email); 

    // saves user information in the database using the user.js schema
    let user = new User({
      personal_info: { fullname, email, password: hashed_password, username }
    })
      
    user.save().then((u) => {
      return res.status(200).json(formatDatatoSend(u))
    })

    .catch(err => {

      if(err.code == 11000) {
        return res.status(500).json({ "error": "Email already exists"})
      }
      return res.status(500).json({ "error": err.message})
    })

  })
})

app.post("/signin", (req, res) => {
  let { email, password } = req.body;

  User.findOne({ "personal_info.email": email})
  .then((user) => {
    if(!user){
      return res.status(403).json({ "error": "Email not found"})
    }

    if(!user.google_auth){
      bcrypt.compare(password, user.personal_info.password, (err, result) => {

      if(err) {
        return res.status(403).json({ "error": "Error occurred while logging in, please try again."})
      }

      if(!result){
        return res.status(403).json({ "error": "Incorrect password "})

      } else {
        return res.status(200).json(formatDatatoSend(user))
      }

    })
    } else {
      return res.status(403).json({"error": "Account was created using google. Try logging in with google."})
    }

    


    
    
  })
  .catch(err => {
    console.log(err.message);
    return res.status(500).json({ "error": err.message })
  })
})

app.post("/google-auth", async (req, res) => {
  
  let { access_token } = req.body;

  getAuth()
    .verifyIdToken(access_token)
    .then(async (decodedUser) => {

    let { email, name, picture } = decodedUser;

    picture = picture.replace("s96-c", "s384-c") // improves resolution of google account image
  
    let user = await User.findOne({"personal_info.email": email}).select("personal_info.fullname personal_info.username personal_info.profile_img google_auth").then((u) => {
      return u || null
    })
    .catch(err => {
      return res.status(500).json({ "error": err.message})
    })

    if(user) { // login
      if(!user.google_auth) {
        return res.status(403).json({"error": "This email was signed up without google. Please log in with password to access the account"})
      } // if the user.google auth is false then we don't want the user to get login
    } else { // sign up (for the first time so we need to store it)
      let username = await generateUsername(email)

      user = new User({
        personal_info: { fullname: name, email, username },
        google_auth: true
      })

      await user.save().then((u) => { // saves user in the database
          user = u; 
      })
      .catch(err => {
        return res.status(500).json({"error": err.message})
      })

    }

    return res.status(200).json(formatDatatoSend(user)) //creates access token
    
    // this is to define whether or not this user exists inteh database, we will check if user is in teh databse we will jsut log in, but if not then we we will google pass the formatted data to the front end in order to proceed with the login authentication. the return u || null is for if there is any document in the database with that email it will give us back on object with full name, username, profile image and google auth. but if there is no document with that email it will just set this user equal to null so that on the next line we can ensure that we create it in the database. so basically if user exist we log them in and if not we have to store them on the database.
  })
  .catch(err => {
    return res.status(500).json({ "error": "Failed to authenticate with google. Try another google account"})
  })


})

// added to check backend is running
app.get("/test", (req, res) => {
  res.send("Backend is running!")
})

// Handle all requests by sending index.html
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../blogging website - frontend/dist', 'index.html'));
});



let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password



mongoose.connect(process.env.DB_LOCATION, {
  autoIndex: true
})

const formatDatatoSend = (user) => {
  //user._id is an id generated from MongoDB
  // the first argument of jwt.sign is what data we have to convert and second argument is a long private key to use as an algorithm to convert it into a hashing

  const access_token = jwt.sign({ id: user._id }, process.env.SECRET_ACCESS_KEY)

  return {
    access_token,
    profile_img: user.personal_info.profile_img,
    username: user.personal_info.username,
    fullname: user.personal_info.fullname
  }
}



// to give error message that username is already taken and to allow user to change username if username created from their email already exists, change to username that has a random number added to it
const generateUsername = async (email) => {
  let username = email.split("@")[0] // 'example: 'as@gmail.com' -> [as, gmail] -> as
  let isUsernameNotUnique = await User.exists({ "personal_info.username": username }).then((result) => result)

  // we add .substring(0, 5) just to give a shorter version of the random letters and numbers strign generated by nanoid
  isUsernameNotUnique ? username += nanoid().substring(0, 5) : "";

  return username
}




app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



