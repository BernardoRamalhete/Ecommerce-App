<p align="center">
<img src="https://logosmarcas.net/wp-content/uploads/2020/04/Netflix-Logo.png" alt="netflix's logo" width='50%' align="center"/>
</p>
<h1 align="center">My Ecommerce App</h1>
<p>&nbsp</p>
<p align="center"> An second hand furniture marketplace. In this app the user can create an account and start to add products, with image, title, description and labels to make the product easier to find. Click the <strong>website</strong> shield to access it on heroku!</p>
<p>&nbsp</p>
<div align="center">

<a href='https://bernardo-netflix-clone.herokuapp.com/'>

<img src='https://img.shields.io/badge/website-000000?style=for-the-badge&logo=About.me&logoColor=white'/>

</a>
<img src='https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white'/>
<img src='https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white'/>
<img src='https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white'/>
<img src='https://img.shields.io/badge/Linux-FCC624?style=for-the-badge&logo=linux&logoColor=black'/>
<img src='https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E'/>

</div>

<div align='center'>
<img src='https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB'/>
<img src='https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white'/>
<img src='https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white'/>
<img src='https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white'/>
<img src='https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white'/>
<img src='https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white'/>
<img src='https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white'/>

</div>

<p>&nbsp</p>

<h2></h2>
<h3 align='center'>What does this app do?</h3>
<p>This app is a marketplace where users can place their second hand furniture for sale. The project have an user account system, products and comments, with users can make in their own products as well as from others.</p>

<h2></h2>
<h3 align='center'>How is the application build?</h3>
<p>The webapp is build using the MERN Stack (MongoDB, Express, React and Node.JS). The mongoDB database was managed using the mongoose package, the express controlls the api server side, while React controlls the frontend. The node enviromment make the development proccess easier and faster by making available the NPM packages and is responsible for running the API.</p>
<p>The secority aspect is handled by the JWT and bcrypt packages. That hash and salt the users passwords for storing in the database, and make the validation in the login without exposing the password client-side</p>
<p>The authenticantion size of the project is made using Bear Tokens, allocated in the local storage while the user is logged in and giving access to protect routes, like adding products and commenting.</p>
<h2></h2>
<h3 align='center'>How to run in your PC</h3>

<p align='center'>Before anything you must have a mongo DB atlas cluster. That's where the user data base will be hosted. To get more information in how to use mongoDB atlas, you can access <a href='https://docs.atlas.mongodb.com/tutorial/create-new-cluster/'>this link</a> and to learn how to connect your cluster with the application follow <a href='https://docs.atlas.mongodb.com/compass-connection/'>this tutorial</a>, but don't put the URI in the compass desktop app, select connect to application, and use the provide URI in the .env file to connect it to the netflix clone app</p>

<ol>
<li>Download the .zip file and extract it</li>
<li>Go to the terminal, navigate to the extracted folder and run</li>

```
npm i
```
<li>Next, in the root folder (not the backend or the frontend folder) create a file with the name '.env' and put the following values inside it:</li>

```js
PORT = 8000
JWT_SECRET = #place a key, it'll be used to hash the user's passwords to save in the database
MONGO_URI = #obtained in the mongo DB atlas
NODE_ENV = production
```

<li>Then run the following code in the terminal</li>

```
npm run build
```

<p>PS: Don't change directories, the code above must be used while still in the frontend folder</p>

<li>Go to the root folder by running this code in the terminal

```
cd ../
```
<li>Then start the app by using the following command in the terminal</li>

```
npm start
```

<li>To access the app go to your browser and type in the following url</li>

```
localhost:8000
```
</ol>
