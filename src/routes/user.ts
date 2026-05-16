import express from "express";
import { allUsers } from "../controllers/allUsers";
import { postUsers } from "../controllers/postUsers";
import { oneUser } from "../controllers/oneUser";
import { patchUser } from "../controllers/pacthUser";
import { deleteUser } from "../controllers/deleteUser";
const router = express.Router();

//REST API
router.route('/')
.get(allUsers)
.post(postUsers)

router.route('/:id')
.get(oneUser)
.patch(patchUser)
.delete(deleteUser)

export default router;