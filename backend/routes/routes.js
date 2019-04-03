const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");

const router = express.Router();

// when the user sends a post request to this route, passport authenticates the user based on the middleware created previously
router.post(
  "/signup",
  passport.authenticate("signup", { session: false }),
  async (req, res, next) => {
    res.json({
      message: "signup successful",
      user: req.user
    });
  }
);

router.post("/login", async (req, res, next) => {
  passport.authenticate("login", async (err, user, info) => {
    try {
      if (err || !user) {
        const error = new Error("An error occured");
        return next(error);
      }

      req.login(user, { session: false }, async error => {
        if (error) return next(error);
        // use only the email so we don't store the password
        const body = { _id: user._id, email: user.email };
        // sign the JWT token and populate the payload with the user email and id
        const token = jwt.sign({ user: body }, "top_secret");
        // send back the token to the user
        return res.json({ token });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});


module.exports = router;
