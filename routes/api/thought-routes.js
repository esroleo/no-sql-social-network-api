const router = require('express').Router();

const {
    addThought
   
  } = require('../../controllers/thought-controller');

// Set up GET all and POST at /api/Users
// /api/Users
router
  .route('/')
  .post(addThought)
;

module.exports = router;