import express from 'express';

import { deleteUser, getUser, getUsers, updateUser } from '../controllers/userController.js';
import { verifyToken, verifyUser, verifyAdmin } from '../utils/verifyToken.js';
const router = express.Router();

//router.get("/checkauth", verifyToken, (req, res, next) => {
//    res.json("You are logged in")
///})
//router.get("/checkuser/:id", verifyUser, (req, res, next) => {
//    res.json("You can delete your account")
//})
//router.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
 //   res.json("Hello admin")
//})

router.put('/:id', verifyUser, updateUser);
router.delete('/:id', verifyUser, deleteUser);
router.get('/:id', verifyUser, getUser);
router.get('/', verifyAdmin, getUsers);

export default router;