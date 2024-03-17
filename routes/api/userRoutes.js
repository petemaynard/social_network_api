const router = require('express').Router();
const {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUserById,
  deleteUserById,
  addNewFriend,
  removeNewFriend,
} = require('../../controllers/userController');


router.get("/", async (req, res) => {
   try {
     const payload = await getAllUsers()
     res.status(200).json({ status: "success", payload })
   }catch(err){
     console.log(err.message)
     res.status(500).json({ status: "error", payload: err.message })
   }
 })
 
 router.post("/", async (req, res) => {
   try {
     const payload = await createUser(req.body)
      res.status(200).json({ status: "success", payload })
   }catch(err){
     console.log(err.message)
     res.status(500).json({ status: "error", payload: err.message })
   }
 })
 
 router.get("/:id", async (req, res) => {
   try {
     const payload = await getSingleUser(req.params.id)
     res.status(200).json({ status: "success", payload })
   }catch(err){
     console.log(err.message)
     res.status(500).json({ status: "error", payload: err.message })
   }
 })
 
 router.put("/:id", async (req, res) => {
   try {
     const payload = await updateUserById(req.params.id, req.body)
     res.status(200).json({ status: "success", payload })
   }catch(err){
     console.log(err.message)
     res.status(500).json({ status: "error", payload: err.message })
   }
 })
 
 router.delete("/:id", async (req, res) => {
   try {
     const payload = await deleteUserById(req.params.id)
     res.status(200).json({ status: "success", payload })
   }catch(err){
     console.log(err.message)
     res.status(500).json({ status: "error", payload: err.message })
   }
 })

 router.post("/:id/friend/:friendId", async (req, res) => {
   try {
      const payload = await addNewFriend(req.params.id, req.params.friendId);
      res.status(200).json({ status: "Success", payload });
   } catch (err) {
      console.log(err.message);
      res.status(500).json({ status: "error", message: err.message });
   }
});

router.delete("/:id/friend/:friendId", async (req, res) => {
   try {
      console.log("router req.params.id is :" + req.params.id)
      console.log("router req.params.friendId is :" + req.params.friendId)
      const payload = await removeNewFriend(req.params.id, req.params.friendId);
      res.status(200).json({ status: "Success", payload });
   } catch (err) {
      console.log(err.message);
      res.status(500).json({ status: "error", message: err.message });
   }
});




module.exports = router;
