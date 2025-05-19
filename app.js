import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
// import authRoutes2 from '../../../src/routes/auth.routes.js'
import { UserRoutes } from './src/app/modules/User/user.route.js';
import { authRouter } from './src/app/modules/Authentication/Auth.routes.js';
import { roomRoute } from './src/app/modules/Rooms/room.route.js';





const app = express();

app.use(express.json());
app.use(cookieParser());

const corsOptions = {
  origin: ['http://localhost:5173'],
  credentials: true,
};

app.use(cors(corsOptions));
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', UserRoutes);
app.use('/api/v1/rooms', roomRoute);

// app.use('/', authRoutes2)

app.get('/', (req, res) => {
  res.send('Welcome to Book Shop');
});

export const App = app;
