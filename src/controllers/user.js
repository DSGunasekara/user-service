import express from "express";
import User from "../models/user.js";

const router = express.Router();

//get all users
export const getUsers = (async(req, res)=>{
  try {
    const users = await User.find({})
    return res.status(200).send(users);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

//get one user
export const getUser = (async(req, res)=>{
  try {
    const user = await User.findOne({ _id: req.params.id })
    if (!user) return res.status(404).send("User does not exits");
    return res.status(200).send(user);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

//create a user
export const createUser = (async(req, res)=>{
  try {
    const { email, userName } = req.body;
    const checkUser = await User.findOne({ email, userName });
    if (checkUser) return res.status(409).send("User already exits");

    const user = new User({ ...req.body });

    user.save((error, savedUser) => {
      if (error) return res.status(400).send(error);
      return res.status(200).send(savedUser);
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

//update a user
export const updateUser = (async(req, res)=>{
  try {
    const checkUser = await User.findOne({ _id: req.params.id });
    if (!checkUser) return res.status(404).send("User does not exits");

    await User.updateOne({ _id: req.params.id }, req.body);
    return res.status(200).send("User updated");
  } catch (error) {
    return res.status(500).send(error);
  }
});

//delete user
export const deleteUser = (async(req, res)=>{
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) return res.status(404).send("User does not exits");

    await user.remove((error, _) => {
      if (error) return res.status(400).send(error);
      return res.status(200).send("User deleted");
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

export default router;