const router = require('express').Router();
const {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addNewFriend,
  removeFriend,
} = require('../../controllers/userController');

// /api/user
router.route('/').get(getAllUsers).post(createUser);

// /api/user/:userId
router.route('/:userId').get(getSingleUser).post(updateUser).delete(deleteUser);

// /api/user/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').post(addNewFriend).delete(removeFriend);


module.exports = router;
