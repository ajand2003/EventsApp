# Events-App-V4
Sprint 4 of our Events App

Main objective: filtering system, map, and calendar

## Usage
```
$ git clone <repository>
$ cd Event-App-V4
$ cd server
$ npm install
$ npm start
$ cd ..
$ cd client
$ npm install
$ npm start
```

You may have an issue with linking to MongoDB because your IP address isn't listed in the allowed addresses. Ensure that your IP addr is added to the allowed list

## TODO
NOTE: todo list has been carried over to project board
* Hook create acount to login, so after you create an account you are redirected to login
* Move database variables to .env file
* If no database connection: give output to console before starting front end; you can try to login for ~2 minutes before you realize the connection was never established
* Need some UI work to make the cards format better

## Looking ahead
If we use the @googlemaps/react-wrapper for our map then we might want initial conditions to be zoom, lat, long as below:

16
33.776975498863216
-84.39714349784722

## Map

Check the map branch for map implementation. The changes are MapInit and MapPage 



