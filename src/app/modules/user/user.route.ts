import express from 'express';
import { UserControllers } from './user.controller';
import { authChecker } from '../../middlewares/authChecker';
import { USER_ROLE } from './user.constants';

const router = express.Router();

router.post('/register', UserControllers.createUser);
router.post('/login', UserControllers.userLogin);
router.post(
  '/change-password',
  authChecker(USER_ROLE.admin, USER_ROLE.user),
  UserControllers.userPasswordChange,
);

export const UserRoutes = router;
