const router = require('express').Router();
const {
  getThoughts,
  getSingleCourse,
  createThought,
  updateThought,
  deleteThought,
} = require('../../controllers/courseController.js');

// /api/thoughts
router.route('/').get(getThoughts).post(createThought);

// /api/thoughts/:thoughtId
router
  .route('/:thoughtId')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

module.exports = router;
