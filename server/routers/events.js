function addUserToList(arr, temp) {
  arr.push(temp);
} 

function deleteUserFromList(arr, username) {
  temp = [];
  for(let i = 0; i < arr.length; i++) {
    if(arr[i] == username) {
      continue;
    }
    temp.push(arr[i])  
  }

  return temp;
}



const router = require('express').Router();
const { events } = require('../models/event.model');
let Event = require('../models/event.model');

router.route('/').get((req, res) => {
  Event.find()
    .then(events => res.json(events))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/deleteRSVPUser').post((req, res) => {
  
  Event.findById(req.body._id)
  .then(event => {
    s = req.body.status;
    if (s == "Won't be Attending") {
        event.wontAttendList = deleteUserFromList(event.wontAttendList, req.body.username);
    }
    else if (s == "Nemesis") {
        event.nemesisAttendList = deleteUserFromList(event.nemesisAttendList, req.body.username);
    }
    else if (s == "Attending") {
        event.willAttendList = deleteUserFromList(event.willAttendList, req.body.username);
    }
    else if (s == "Not sure") {
        event.maybeAttendList = deleteUserFromList(event.maybeAttendList, req.body.username);
    }
  
    event.save()
        .then(() => res.json('RSVPlist updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
  })
  .catch(err => res.status(400).json('Error: ' + err));
  

});



router.route('/addRSVPUser').post((req, res) => {

  
  Event.findById(req.body._id)
  .then(event => {
    s = req.body.status;
    event.wontAttendList = deleteUserFromList(event.wontAttendList, req.body.username);
    event.nemesisAttendList = deleteUserFromList(event.nemesisAttendList, req.body.username);
    event.willAttendList = deleteUserFromList(event.willAttendList, req.body.username);
    event.maybeAttendList = deleteUserFromList(event.maybeAttendList, req.body.username);
    console.log(s)
    if (s == "Won't be Attending") {
        addUserToList(event.wontAttendList, req.body.username);
    }
    else if (s == "Nemesis") {
        addUserToList(event.nemesisAttendList, req.body.username);
    }
    else if (s == "Attending") {
        addUserToList(event.willAttendList, req.body.username);
    }
    else if (s == "Not sure") {
        addUserToList(event.maybeAttendList, req.body.username);
    }
  

    event.save()
        .then(() => res.json('RSVPlist updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
  })
  .catch(err => res.status(400).json('Error: ' + err));
  

});

router.route('/add').post((req, res) => {

  const host = req.body.host;
  const location = req.body.location;
  const desc = req.body.desc;
  const date = req.body.date;
  const title = req.body.title;
  const time = req.body.time;
  const capacity = 50;
  const willAttendList = [];
  const maybeAttendList = [];
  const wontAttendList = [];
  const nemesisAttendList = [];
  const rsvpList = [];


  const newEvent = new Event({
    host,
    time,
    location,
    desc,
    date,
    title,
    rsvpList,
    willAttendList,
    maybeAttendList, 
    wontAttendList, 
    nemesisAttendList,
    capacity,
    
  });

  newEvent.save()
  .then(() => res.json('Event added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Event.findById(req.params.id)
    .then(event => res.json(event))
    .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/:id').delete((req, res) => {
  Event.findOneAndRemove({_id: req.body._id})
    .then(() => res.json('Event deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Event.findById(req.params.id)
    .then(event => {
        event.user = req.body.user;
        event.location = req.body.location;
        event.description = req.body.description;
        event.date = req.body.date;
        event.title = req.body.title;

      event.save()
        .then(() => res.json('Event updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;