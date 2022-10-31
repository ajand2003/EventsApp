const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const userType = req.body.userType
  const newUser = new User({username, password, userType});

  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:username').delete((req, res) => {
    User.findOneAndRemove(req.params.username)
      .then(() => res.json('Event deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });
router.route('/login').post((req, res) => {
    User.findOne({ username: req.body.username }).then(
        (user) => {
            console.log(user);
          if (!user) {
            return res.status(401).json({
              error: new Error('User not found!')
            });
          } else if (user.password!=req.body.password){
            return res.status(401).json({
                error: new Error('Wrong Password!')
              });
          } else {
            return res.json(user);
          }
        });
});

module.exports = router;