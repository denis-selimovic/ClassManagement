# Class Management app

## What is it?
This is a full-stack application for class management. Tutors can create lessons and assignments inside their courses. Anyone who is enrolled can access to full course content. All lessons can be downloaded. Students can upload their assignments to the server, which can then be accessed by tutors. Supports all file formats for upload. Need registration to access courses and materials. Guest can only search courses and do not have any other access rights.

## Check out the application
* Web application is available [here](https://class-management-webapp.herokuapp.com).
* The API can be accessed via [this link](https://classm-api.herokuapp.com)

## Start the application locally

### Server
* Make sure you have node, npm and MongoDB installed on your machine
* Clone the github repository
* Navigate to the class-management-api folder and run __npm install__ to install the application dependencies
* In the api folder create a .env file with the following environment variables set: 

```javascript
MONGODB_HOST=
MONGODB_LOCALHOST=
PORT=
```
* We change the port to 8080 because the web application runs on port 3000 which would also be the default port here
* Run __npm start__
* Experiment with the API!

### Web Application
* Requires node, npm and angular-cli installed
* Navigate to the class-management-webapp folder and run __npm install__ to install the application dependencies
* Can be started in development and production mode
* For development mode use __ng build__ comand
* Development mode consumes API on localhost (you need server started on your machine)
* For production mode use __ng build --prod__ comand
* Production mode consumes API deployed on heroku
* Experiment with the app!
