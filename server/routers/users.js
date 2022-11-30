const router = require('express').Router();
const { findById } = require('../models/user.model');
let User = require('../models/user.model');

router.route('/').get((req, res) => {
  if(req.query.username){
    User.findOne({username: req.query.username})
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
  } else { 
    User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
  }
});

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const userType = req.body.userType
  const userEventList = [];
  const newUser = new User({username, password, userType, userEventList});
  User.findOne({ username: req.body.username }).then(
    (user) => {
      if (!user) {
        newUser.save()
          .then(() => res.json('User added!'))
          .catch(err => res.status(400).json('Error: ' + err));
      } else {
        return res.status(401).json({
            error: new Error('Username already exists!')
          }); 
      }
    });
});

router.route('/:username').delete((req, res) => {
  const name = req.body.username
    User.findOneAndRemove({username: name})
      .then(() => res.json('User deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });
router.route('/login').post((req, res) => {
    User.findOne({ username: req.body.username }).then(
        (user) => {
          if (!user) {
            return res.status(401).json({
              error: new Error('User not found!')
            });
          } else if (user.password!=req.body.password || user.userType != req.body.userType){
            return res.status(401).json({
                error: new Error('Wrong Password!')
              });
          } else {
            return res.json(user);
          }
        });
});


router.route('/addUserEvent').post((req, res) => {
  User.findOne({ username: req.body.username }).then((user => {
      for (let i = 0; i < user.userEventList.length; i++) {
        if(user.userEventList[i] == req.body._id) {
          return res.status(401).json({
            error: new Error('Already RSVP')
          });
        }
      }
      user.userEventList.push(req.body._id)
      user.save()
        .then(() => res.json('User Eventlist updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
  ).catch(err => res.status(400).json('Error: ' + err));
  

});


router.route('/deleteUserEvent').post((req, res) => {

  User.findOne({ username: req.body.username }).then(user => {
      let temp = []
      for (let i = 0; i < user.userEventList.length; i++) {
          if (user.userEventList[i] = req.body._id) {
            continue;
          }
          temp.push(user.userEventList[i])
      }
  
      user.userEventList = temp;

      user.save()
        .then(() => res.json('User Eventlist updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    }
  ).catch(err => res.status(400).json('Error: ' + err));
    
});
router.route('/deleteAll').post((req,res) => {
  User.deleteMany({})
  .then()
  .catch()
});
module.exports = router;