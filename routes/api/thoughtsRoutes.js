const router = require('express').Router();

const {
   getAllThought,
   getSingleThought,
   createNewThought,
   updateThoughtById,
   deleteThoughtById,
   addNewReaction,
   removeReaction} = require('../../controllers/thoughtController.js')


module.exports = router;

//Need this
router.get("/", async (req, res) => {
   try {
     const payload = await getAllThought()
     res.status(200).json({ status: "success", payload })
   }catch(err){
     console.log(err.message)
     res.status(500).json({ status: "error", payload: err.message })
   }
 })
  // Need this
 router.get("/:id", async (req, res) => {
   try {
     const payload = await getSingleThought(req.params.id)
     res.status(200).json({ status: "success", payload })
   }catch(err){
     console.log(err.message)
     res.status(500).json({ status: "error", payload: err.message })
   }
 })

 // Need this
 router.post("/", async (req, res) => {
   try {
     const payload = await createNewThought(req.body)
      res.status(200).json({ status: "success", payload })
   }catch(err){
     console.log(err.message)
     res.status(500).json({ status: "error", payload: err.message })
   }
 })

 router.put("/:id", async (req, res) => {
   try {
     const payload = await updateThoughtById(req.params.id, req.body)
     res.status(200).json({ status: "success", payload })
   }catch(err){
     console.log(err.message)
     res.status(500).json({ status: "error", payload: err.message })
   }
 })

 router.delete("/:id", async (req, res) => {
   try {
     const payload = await deleteThoughtById(req.params.id)
     res.status(200).json({ status: "success", payload })
   }catch(err){
     console.log(err.message)
     res.status(500).json({ status: "error", payload: err.message })
   }
 })

 // Add a new reaction
 router.post("/:thoughtId/reaction/", async (req, res) => {
   try {
      const payload = await addNewReaction(req.params.thoughtId, req.body);
      res.status(200).json({ status: "Success", payload });
   } catch (err) {
      console.log(err.message);
      res.status(500).json({ status: "error", message: err.message });
   }
});

// Delete a reaction
router.delete("/:thoughtId/reaction/:reactionId", async (req, res) => {
   try {
      console.log("router req.params.id is :" + req.params.thoughtId)
      console.log("router req.params.friendId is :" + req.params.reactionId)
      const payload = await removeReaction(req.params.thoughtId, req.params.reactionId);
      res.status(200).json({ status: "Success", payload });
   } catch (err) {
      console.log(err.message);
      res.status(500).json({ status: "error", message: err.message });
   }
});


module.exports = router;
