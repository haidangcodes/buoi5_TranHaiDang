const User = require("../models/user.model");

exports.createUser = async (data) => {
  return await User.create(data);
};

exports.getAllUsers = async () => {
  return await User.find({ isDeleted: false }).populate("role");
};

exports.getUserById = async (id) => {
  return await User.findOne({ _id: id, isDeleted: false }).populate("role");
};

exports.updateUser = async (id, data) => {
  return await User.findOneAndUpdate(
    { _id: id, isDeleted: false },
    data,
    { new: true }
  );
};

exports.deleteUser = async (id) => {
  return await User.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
};

exports.enableUser = async (email, username) => {
  const user = await User.findOne({
    email,
    username,
    isDeleted: false
  });

  if (!user) return null;

  user.status = true;
  await user.save();

  return user;
};

exports.disableUser = async (email, username) => {
  const user = await User.findOne({
    email,
    username,
    isDeleted: false
  });

  if (!user) return null;

  user.status = false;
  await user.save();

  return user;
};