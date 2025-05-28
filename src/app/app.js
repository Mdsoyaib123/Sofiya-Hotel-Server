import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
// import authRoutes2 from '../../../src/routes/auth.routes.js'
import { UserRoutes } from "./modules/User/user.route.js";
import { authRouter } from "./modules/Authentication/Auth.routes.js";
import { roomRoute } from "./modules/Rooms/room.route.js";
import { bookingRoutes } from "./modules/booking/booking.route.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = [
      "http://localhost:5173", // dev
      "https://assainment-11.vercel.app", // production frontend
    ];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", UserRoutes);
app.use("/api/v1/rooms", roomRoute);
app.use("/api/v1/bookingData", bookingRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to Book Shop");
});

export { app as App };
