# About this project (Features):

<li>You can make lists of activities to do which is stored in firebase database.</li> <br>

<li> CRUD Operation i.e you can create, read, update and delete data, in our case, activities, to help us remind us to do our tasks.</li><br>

<li>The entered activities/data are stored in the firebase and when the web page is refreshed or even closed, your list of activities still remain there after running the prorgam again.</li><br>

<li>If you have any spelling errors while adding the activity, you are able to update it by clicking on the pencil button so that you don't have to delete the task and type in another.

# Steps to follow to run this code:

<li> Clone this repo in your device by running the command  <b>'gh repo clone DigdarshanB/to-do-list'</b> on your terminal.</li><br>

<li>You should have node.js installed on your device.</li><br>

<li>Open the folder on your desired IDE.</li><br>

<li>For the data to be stored on firebase, open firebase and create a project. Then, initialise Firebase and begin using the SDKs by copying the code and updating your firebase.js file.</li><br>

<li>

//initialize firebase
const app = initializeApp(firebaseConfig);

//initialize firestore database
const db = getFirestore(app);

export { db };

<li>After configuring firebase and all, you are now ready to run the program.</li><br>

 <li>To run the program, open the terminal window and run the command <b> 'npm start' </b> </li>
