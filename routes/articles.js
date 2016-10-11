const express = require('express');
const router = express.Router();

router.route('/')
  .get((req, res) => {
    //Get stuff

  })

  .post((req, res) => {
    //post stuff
  })

  .put((req, res) => {
    //put
  })

  .delete((req, res) => {
    //delete
  });

  module.exports = router;