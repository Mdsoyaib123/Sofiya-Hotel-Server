import { Router } from 'express';
import { UserControllers } from './user.controller.js';

const router = Router();

router.post(
  '/create-new-user',
  UserControllers.createNewUser,
);
router.get('/get-all-users', UserControllers.RetriveUsers);
// router.patch(
//   '/deactivate-user/:id',
//   UserControllers.deactivateUser,
// );
// router.patch(
//   '/activate-user/:id',
//   UserControllers.activateUser,
// );

export const UserRoutes = router;
