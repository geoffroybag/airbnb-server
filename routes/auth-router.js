const express = require("express");
const bcrypt = require("bcrypt");

const User = require("../models/user-model.js");

const router = express.Router();

router.post("/signup", (req, res, next) => {
  const { fullName, email, originalPassword, avatar } = req.body;


  if (!fullName || !email || !originalPassword || !avatar) {
    next(new Error('Please enter all the forms'));
    return;
  }

  User.findOne({email: {$eq : email}})
  .then(data => {
    if (data) {
      next(new Error('This email already exists.'));
      return;
    }
  })
  .catch(err => next(err));
  
  if (!originalPassword || originalPassword.match(/[0-9]/) === null) {

    next(new Error('Your password must contain a number'))
    return; 
  }


  const encryptedPassword = bcrypt.hashSync(originalPassword, 10);

  User.create({ fullName, email, encryptedPassword, avatar })
    .then(userDoc => {
      // log in the user automatically when they sign up
      req.logIn(userDoc,()=>{
        // hide "encryptedpassword" before sending the JSON (security risk)
        userDoc.encryptedPassword = undefined;
        res.json({userDoc})
      })
    })
    .catch(err => next(err));
});
  
router.post("/login", (req, res, next) => {
    const { email, originalPassword } = req.body;
    
    User.findOne({ email: { $eq: email } })
    .then(userDoc => {
      if (!userDoc) {
        next(new Error('Incorrect Email'))
        return; 
      }
      
      // check the password
      const { encryptedPassword } = userDoc;
      // "compareSync()" will return FALSE if "originalPassword" is WRONG
      if (!bcrypt.compareSync(originalPassword, encryptedPassword)) {
        next(new Error('Incorrect Password'))
        return;
      }
      else {
        // "req.logIn()" is a Passport method that calls "serializeUser()"
        // (that saves the USER ID in the session)
        req.logIn(userDoc, () => {
          // hide "encryptedpassword" before sending the JSON (security risk)
          userDoc.encryptedPassword = undefined;
          res.json({userDoc})
        });
      }
    })
    .catch(err => next(err));
});

router.delete("/logout", (req, res, next) => {
  // "req.logOut()" is a Passport method that removes the user ID from session
  req.logOut();

  // send empty "userDoc" when you log out
  res.json({userDoc : null})
});

// create a route to pass the req.user info from Express to React
router.get("/checkuser", (req, res, next) => {
  if(req.user){
    req.user.encryptedPassword = undefined;
    res.json({userDoc : req.user});
  }
  else{
    res.json({userDoc : null})
  }
})


router.get("/settinguser/:userId", (req, res, next) => {
  const { userId } = req.params;
  
  User.findById(userId)
  .then(userDoc => {
    res.json(userDoc);
  })
  .catch(err => next(err))
})


router.put("/settinguser/:userId", (req, res, next) => {
  const { userId } = req.params;
  const { fullName, email, originalPassword, avatar } = req.body;

  const changement = { fullName, email, avatar };

  if (originalPassword) {
    changement.encryptedPassword = bcrypt.hashSync(originalPassword, 10);
  }

  User.findByIdAndUpdate(userId, { $set: changement }, {runValidators: true, new: true})
  .then(userDoc => {
    res.json(userDoc);
  })
  .catch(err => next(err));
})



module.exports = router;
