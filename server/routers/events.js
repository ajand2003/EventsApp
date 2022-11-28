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

// main events/ route
router.route('/').get(async(req, res) => {
  console.log(req);
  // query variable is set
  if (req.query.sort)
  {
    if (req.query.sort == "open") {//path is ?sort=open
      console.log("Searching for open");
      // If the capacity index doesn't exist in the willAttendList then we it is open
      Event.find({"willAttendList.capacity": {"$exists": false}})
      .then(events => res.json(events))
      .catch(err => res.status(400).json('Error: ' + err));
    }
    else if (req.query.sort == "name") {
      console.log("Filtering by name");
      Event.find()
        .sort({title:1})
        .then(events => res.json(events))
        .catch(err => res.status(400).json('Error: ' + err));
    }
    else if (req.query.sort == "date") {
      console.log("Filtering by date");
      Event.find()
        .sort({date:1, time:1})
        .then(events => res.json(events))
        .catch(err => res.status(400).json('Error: ' + err));
    } 
    else // if the query variable is not open, name, date then return all events
    {
      Event.find()
        .then(events => res.json(events))
        .catch(err => res.status(400).json('Error: ' + err));
    }
  } else {// if the query variable is not set then return all events
    Event.find()
      .then(events => res.json(events))
      .catch(err => res.status(400).json('Error: ' + err));
  }
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
    else if (s == "Not Sure") {
        event.maybeAttendList = deleteUserFromList(event.maybeAttendList, req.body.username);
    }
    else if (s == "Invite") {
      event.inviteList = deleteUserFromList(event.inviteList, req.body.username);
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
    if(event.invite) {
      let in_list = false;
      for (let i = 0; i < event.inviteList.length; i++) {
        console.log('hi')
        console.log(event.inviteList[i], req.body.username);
        if(event.inviteList[i] == req.body.username) {
          in_list = true;
          break;
        }
      }
      if(!in_list){
        return res.status(401).json({
          error: new Error('You Cannot Join this Event')
        });
      }
    }
    s = req.body.status;
    event.wontAttendList = deleteUserFromList(event.wontAttendList, req.body.username);
    event.nemesisAttendList = deleteUserFromList(event.nemesisAttendList, req.body.username);
    event.willAttendList = deleteUserFromList(event.willAttendList, req.body.username);
    event.maybeAttendList = deleteUserFromList(event.maybeAttendList, req.body.username);
    if (s == "Won't be Attending") {
        addUserToList(event.wontAttendList, req.body.username);
    }
    else if (s == "Nemesis") {
        addUserToList(event.nemesisAttendList, req.body.username);
    }
    else if (s == "Attending") {
        console.log('yo')
        addUserToList(event.willAttendList, req.body.username);
    }
    else if (s == "Not Sure") {
        addUserToList(event.maybeAttendList, req.body.username);
    }
  

    event.save()
        .then(() => res.json('RSVPlist updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
  })
  .catch(err => res.status(400).json('Error: ' + err));
  

});
router.route('/addInvite').post((req,res) => {
  Event.findById(req.body._id)
  .then(event => {
    addUserToList(event.inviteList, req.body.username)
    event.save()
        .then(() => res.json('Invite List Updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
  })
});
router.route('/removeInvite').post((req,res) => {
  Event.findById(req.body._id)
  .then(event => {
    event.inviteList = deleteUserFromList(event.inviteList, req.body.username)
    event.save()
        .then(() => res.json('Invite List Updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
  })
});
router.route('/add').post((req, res) => {

  const host = req.body.host;
  const location = req.body.location;
  const desc = req.body.desc;
  const date = req.body.date;
  const title = req.body.title;
  const time = req.body.time;
  const invite = req.body.invite;
  const inviteList = [];
  const capacity = req.body.capacity;
  const willAttendList = [];
  const maybeAttendList = [];
  const wontAttendList = [];
  const nemesisAttendList = [];


  const newEvent = new Event({
    host,
    time,
    location,
    desc,
    date,
    title,
    invite,
    inviteList,
    willAttendList,
    maybeAttendList, 
    wontAttendList, 
    nemesisAttendList,
    capacity,
    
  });
  console.log(newEvent);
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
router.route('/deleteAll').post((req,res) => {
  Event.deleteMany({})
  .then()
  .catch()
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