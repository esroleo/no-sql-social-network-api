## no-sql-social-network-api: Social Network API

1. [ Description. ](#desc)
2. [ Web Address. ](#web-address)
3. [ Usage tips. ](#usage)
4. [ Features. ](#features)
5. [ Credits. ](#credits)
6. [ Licenses. ](#licenses)
7. [ Install Command. ](#commandInstall)
8. [ Test Command. ](#commandTest)
9. [ Contributing. ](#contributing)
9. [ Questions. ](#questions)

### For license description, click on the badge to get more information.
[![License](https://img.shields.io/badge/License-MIT%20-blue.svg)](https://opensource.org/licenses/mit)

<a name="desc"></a>
## 1. Description

This is a back end web application that was built using MongoDB, Mongoose and express js to showcase a no sql network api.

### Major tech snapshot

![tech](./assets/images/tech-used.JPG?raw=true "tech-used.JPG")

<a name="web-address"></a>
## 2. How to Get There

### Open your favorite code editor (uses git) and run (MongoDB installation is required):

npm i
npm start


<a name="usage"></a>
## 3. Usage Tips

For more information - Please visit the following videos on how the application works and some background information.
Please note that on my first video I said 2 videos, but it turns out there is a more information that can be contain in 5 minutes videos :).
FYI - Currently I have the free version so I am constraint to 5 min videos :)

Insomnia related videos are 1-3. #4 is closing comments.

#1 - User related
https://drive.google.com/file/d/1VMRh78anli1O2lWMK8iXAZh9WsR3Mfeh/view

#2 - Thought related
https://drive.google.com/file/d/1j1yV2LdtBCGNNl9-cgAko37sIfmHKGSu/view

#3 - Thought related deletion continuation
https://drive.google.com/file/d/1INe8VQnQg4KZjoIkBj78cRR-2XgImQ2-/view

#4 - Goodbye
https://drive.google.com/file/d/1--VvZ32YYE3-rom_IR0nxmLhNs5uE8uy/view


If you want to run locally perform the following:

If you are still interested in running the application you would need to do the following:
* install MongoDb version 4.4.4 as minimum.
* npm i
* npm start

Insomnia path are:

* User related *

Create user: 
http://localhost:3001/api/users/

json sample:

{
  "username": "juan",
  "email": "juan@gmail.com"
}


Get all users: 
http://localhost:3001/api/users

Get users by ID, Update user by ID, Delete user by ID:
http://localhost:3001/api/users/<userId>

Add a new friend, Remove friend:
http://localhost:3001/api/users/<recipient userId>/friends/<friend user Id>

* Thoughts related *

New thought:
http://localhost:3001/api/thoughts/

json sample:

{
  "thoughtText": "Here's a cool thought -- reaction #2",
  "username": "juan",
  "userId": "6071c0b41360fe1888832dc6"
}

Get all thoughts:
http://localhost:3001/api/thoughts/

Get thought by Id, Update thought by id, Delete thought by Id:
http://localhost:3001/api/thoughts/<thoughtId>

Add a reaction to a thought by id:
http://localhost:3001/api/thoughts/<thoughtId>/reactions
  
Delete a reaction from thought by id's:
http://localhost:3001/api/thoughts/<thoughtId>/reactions/<reactionId>

<a name="features"></a>
## 4. Features

Application is running fully in the back end, all features are associated with insomnia. Please revisit usage tips for more information.

<a name="credits"></a>
## 5. Credits

Thank you Esteban Romero for working on this project.

<a name="licenses"></a>
## 6. Licenses

mit

<a name="commandInstall"></a>
## 7. Install Command

### Database dependency is --> MongoDB 4.4.4  
### npm install command will install javascript dependencies

npm i

<a name="commandTest"></a>
## 8. Test Command

No test commands available, if you would like any, please let me know.

<a name="contributing"></a>
## 9. Contributing

Please email Esteban Romero.

<a name="questions"></a>
## 10. Questions

Please reach out to me

GitHub Url: https://github.com/esroleo

Email address: esroleo@gmail.com
