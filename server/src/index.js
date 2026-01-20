import dotenv from "dotenv";  
import { app } from "./app.js";
// require('dotenv').config({path: './env'});

import connectDB from "./db/index.js";
dotenv.config({
  path : './.env', 
})

connectDB()
.then(()=>{
  app.on("error",(error)=> {
    console.log("ERROR : ", error);
    throw error;
  })
  app.listen(process.env.PORT || 8000, ()=>{
    console.log(`Server is running at port : ${process.env.PORT}`);
  })
})
.catch((err)=>{
  console.log("MONGO db connection failed !!!",err);
})


// import express from "express"
// const app = express();

// ( async ()=> {
//   try {
//     await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
//     app.on("error",(error)=> {
//       console.log("ERROR : ", error);
//       throw error;
//     })

//     app.listen(process.env.PORT, () => {
//       console.log(`App is listening on port ${process.env.PORT}`);
//     })
//   }catch(error){
//     console.error("ERROR : ", error);
//     throw error;
//   }
// })()







// const express = require('express');
// const cors = require('cors');
// const passport = require('passport');
// const GitHubStrategy = require('passport-github2').Strategy;
// const session = require('express-session');
// const { Octokit } = require("octokit");
// const mongoose = require('mongoose');
// const User = require('./models/User');
// require('dotenv').config();

// const app = express();

// // 2. DATABASE CONNECTION
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log("✅ Connected to MongoDB via Compass/Atlas"))
//   .catch(err => console.error("❌ MongoDB Connection Error:", err));

// // 3. MIDDLEWARE
// app.use(cors()); // Allows frontend to talk to backend
// app.use(session({
//     secret: process.env.SESSION_SECRET || 'devqueue_secret',
//     resave: false,
//     saveUninitialized: false
// }));

// app.use(passport.initialize());
// app.use(passport.session());

// // 4. PASSPORT & MONGODB LOGIC
// passport.use(new GitHubStrategy({
//     clientID: process.env.GITHUB_CLIENT_ID,
//     clientSecret: process.env.GITHUB_CLIENT_SECRET,
//     callbackURL: "http://localhost:5000/auth/github/callback"
//   },
//   async function(accessToken, refreshToken, profile, done) {
//     try {
//       // This logic SAVES the user to your "users" collection in Compass
//       let user = await User.findOneAndUpdate(
//         { githubId: profile.id }, 
//         { 
//           username: profile.username,
//           avatarUrl: profile._json.avatar_url,
//           accessToken: accessToken 
//         },
//         { upsert: true, new: true } 
//       );
//       console.log(`💾 User saved to Database: ${user.username}`);
//       return done(null, user); 
//     } catch (err) {
//       console.error("Error in Strategy:", err);
//       return done(err, null);
//     }
//   }
// ));

// passport.serializeUser((user, done) => done(null, user));
// passport.deserializeUser((obj, done) => done(null, obj));

// // 5. ROUTES
// app.get('/', (req, res) => {
//     res.send('<h1>DevQueue Server</h1><a href="/auth/github">Login with GitHub</a>');
// });

// // Trigger GitHub Login
// app.get('/auth/github',
//   passport.authenticate('github', { scope: [ 'user:email', 'repo' ] }));

// // GitHub Redirects here after login
// app.get('/auth/github/callback', 
//   passport.authenticate('github', { failureRedirect: '/' }),
//   async function(req, res) {
//     // We use the accessToken saved in the User model
//     const octokit = new Octokit({ auth: req.user.accessToken });

//     try {
//       // Search for PRs where the author is the logged-in user
//       const response = await octokit.rest.search.issuesAndPullRequests({
//         q: `type:pr author:${req.user.username}`, 
//         per_page: 5 
//       });

//       const prs = response.data.items;
//       let htmlContent = `<h1>Welcome, ${req.user.username}</h1>`;
//       htmlContent += `<img src="${req.user.avatarUrl}" width="100" style="border-radius:50%"><br>`;
//       htmlContent += `<h3>Your Recent Pull Requests:</h3><ul>`;
      
//       if (prs.length === 0) {
//         htmlContent += `<li>No PRs found. Go contribute to open source!</li>`;
//       } else {
//         prs.forEach(pr => {
//           htmlContent += `<li><strong>${pr.title}</strong> - Status: ${pr.state}</li>`;
//         });
//       }
      
//       htmlContent += `</ul><p><b>Check MongoDB Compass!</b> You should see your record there.</p>`;
//       htmlContent += `<a href="/">Logout/Home</a>`;
      
//       res.send(htmlContent);

//     } catch (error) {
//       console.error("Octokit Error:", error);
//       res.status(500).send("Error fetching PRs from GitHub API.");
//     }
//   });

// // 6. START SERVER
// const PORT = 5000;
// app.listen(PORT, () => {
//     console.log(`🚀 Backend live at http://localhost:${PORT}`);
// });