const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const User = require("../models/User");
const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;

// passport middleware to handle user registration
passport.use(
  "signup",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        // Save the information provided by the User to the database
        const user = await User.create({ email, password  });

        // send the user information to the next middleware
        return done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

// create a passport middleware to handle User login
passport.use(
  "login",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password"
    },
    async (email, password, done) => {
      try {
        // find the user associated with the email provided by the user
        const user = await User.findOne({ email });
        if (!user) {
          // if user isn't found in the database, return a message
          return done(null, false, { message: "User not found" });
        }

        // validate password and make sure it matches with the corresponding hash stored in the database
        // if the passwords match, it should return a value of true
        const validate = await user.isValidPassword(password);
        if (!validate) {
          return done(null, false, { message: "wrong password" });
        }

        //send the user information to the next middleware
        return done(null, user, { message: "logged in successfully" });
      } catch (error) {
        return done(error);
      }
    }
  )
);

//verifies the token sent by the user is valid
passport.use(
  new JWTstrategy(
    {
      // secret we used to sign our JWT
      secretOrKey: "top_secret",
      // the user to send the token as a query parameter with the name 'secret_token'
      jwtFromRequest: ExtractJWT.fromUrlQueryParameter("secret_token")
    },
    async (token, done) => {
      try {
        // pass the user details to the next middleware
        return done(null, token.user);
      } catch (error) {
        done(error);
      }
    }
  )
);


