import { Router } from 'express';
import { AuthControllers } from './Auth.controller.js';

const router = Router();

router.post('/login', AuthControllers.LoginUser);

export  const authRouter= router;
