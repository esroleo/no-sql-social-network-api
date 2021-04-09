const router = require('express').Router();

const {
    addThought,
    getAllThoughts,
    getThoughtById,
    updateThought,
    deleteThought,
    addThoughtReaction
   
  } = require('../../controllers/thought-controller');

// Set up GET all and POST at /api/Users
// /api/Users
router
  .route('/')
  .get(getAllThoughts)
  .post(addThought);

router
  .route('/:id')
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);

router.
  route('/:thoughtId/reactions')
  .post(addThoughtReaction)



module.exports = router;