# DNS-Server
### Run Locally
<hr>

To run this code in your local machine, follow these steps:

*Step 1:* Go to the folder on your desktop where you want the project directory to be created. Open a terminal in this folder and to clone this repository on your machine use the command:

`git clone https://github.com/naman-luthra/DNS-Server`

*Step 2:* Go to the project directory and open app.js if you have VSCode installed on your system you can open the file in VSCode using the following command.

`cd DNS-Server`

`code app.js`

*Step 3:* Now in the 12th line replace BITS@lite with your mySQL root password.

*Step 4:* Now open the `SQL Setup File.sql` and run all the queries in the file to setup the schema required for this application

*Step 5:* Now, in the terminal, inside the project directory, install the npm packages (Make sure you have the latest version of npm installed).

`npm install`

*Step 8:* Now that we have all the dependencies installed. It's time to run the node server.

`node app.js`

The application is now running on your machine. You can access it by typing *localhost:3000* in your browser.
