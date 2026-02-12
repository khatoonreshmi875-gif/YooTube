import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import cron from "node-cron";
import compression from "compression";
import session from "express-session";
import { User } from "./models/user.model.js";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
const app = express();
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  }),
);

app.use(
  express.json({
    limit: "16kb",
  }),
);
app.use(compression());
app.use(
  express.urlencoded({
    extended: true,
    limit: "160kb",
  }),
);

app.use(cookieParser());

app.use(
  session({
    secret: "your-session-secret", // use a strong secret in production
    resave: false,

    saveUninitialized: true,
  }),
);
app.use(passport.initialize());
app.use(passport.session());

// Configure Passport with Google OAuth strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.BACKEND_URL}/auth/google/callback`,
    },
    (accessToken, refreshToken, profile, done) => {
      // Here you can save user info to DB
      const userData = {
        googleId: profile.id,
        name: profile.displayName,
        email: profile.emails[0].value,
        accessToken,
        refreshToken,
      };

      return done(null, profile);
    },
  ),
);
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));
// Initialize Passport

// Routes
app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "consent",
  }),
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  async (req, res) => {
    try {
      let user = await User.findOne({ email: req.user.emails[0].value });
      if (user) {
        ("userId/.//././././/./././//.///", user);
        const { AccessToken, RefreshToken } =
          await generateRefreshAndAccessToken(user._id);
       
        res.redirect(
          `${process.env.CORS_ORIGIN}/google-success?token=${AccessToken}`,
        );
      }
      if (!user) {
        res.redirect(`${process.env.CORS_ORIGIN}/verify`);
      }
    } catch (err) {
      res.redirect(`${process.env.CORS_ORIGIN}/verify`);
    } // later replace with real JWT
  },
);
app.listen(8000, () => {
 
});

//routes

import userRouter from "./routes/user.route.js";
import videoRouter from "./routes/video.routes.js";
import dislikeRouter from "./routes/dislike.routes.js";
import commentRouter from "./routes/comment.routes.js";
import tweetRouter from "./routes/tweet.routes.js";
import playlistRouter from "./routes/playlist.routes.js";
import likeRouter from "./routes/like.routes.js";
import subscriptionRouter from "./routes/subscription.routes.js";
import reportRouter from "./routes/report.routes.js";
import { generateRefreshAndAccessToken } from "./utils/generateRefreshAndAccessToken.js";
import { refershAccessToken } from "./controllers/user.controller/auth/token/refreshAccessToken.js";

// import { syncViewsToMongo } from "./controllers/video.controller.js";
// //routes declaraton
app.use("/api/v1/users", userRouter);
app.use("/api/v1/dislikes", dislikeRouter);
app.use("/api/v1/videos", videoRouter);
app.use("/api/v1/comments", commentRouter);
app.use("/api/v1/likes", likeRouter);
app.use("/api/v1/playlists", playlistRouter);
app.use("/api/v1/tweets", tweetRouter);
app.use("/api/v1/subscriptions", subscriptionRouter);
app.use("/api/v1/reports", reportRouter);
cron.schedule("0 0 * * * ", async () => {
  await stats();
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: err.success || false,
    message: err.message || "Internal Server Error",
    errors: err.errors || [],
    data: err.data || null,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
});

export default app;
