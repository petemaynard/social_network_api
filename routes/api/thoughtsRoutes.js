const router = require('express').Router();

const {
   getAllThoughts,
   getSingleThought,
   createNewThought,
   updateThought,
   removeThought,
   updateReaction,
   removeReaction} = require('../../controllers/thoughtController.js')

// /api/thoughts
router.route('/', get(getAllThoughts).post(createNewThought));

// /api/thoughts/:thoughtId
router.route('/:id', get(getSingleThought).put(updateThought).delete(removeThought));

// /api/thoughts/:thoughtId/reactions
router.route('/thoughts/:id/reactions', post(updateReaction).delete(removeReaction))

module.exports = router;

