import express from 'express';
import { UserControllers } from './user.controller';

const router = express.Router();

router.post('/register', UserControllers.createUser);
router.post('/login');
router.post('/change-password');

export const UserRoutes = router;
