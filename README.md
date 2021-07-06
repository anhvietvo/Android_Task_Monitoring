# Android Task Monitoring (ATM) 
[![react-native-android-build-apk](https://github.com/vietanhvo/Android_Task_Monitoring/actions/workflows/main.yml/badge.svg)](https://github.com/vietanhvo/Android_Task_Monitoring/actions/workflows/main.yml)

"ATM" is a project to keep track of your daily tasks. This is a mobile app which is made by [React Native](https://reactnative.dev/) - a powerful Facebook's framework. MySQL is used to create a database to support my application.

Android Task Monitoring project is made for my Principle of Database Management course. In this app, I try to connect to the database from a mobile app and implement some features. Firstly, users can create a schedule for their personal tasks and keep track of them easily. Secondly, I create a special feature called "Team". You can create a team and assign many users to your team. Next, everyone can connect with others to create tasks and work together.

The backend for this project is in [this repo](https://github.com/vietanhvo/server_ATM). Luckily, I have already deployed it to Heroku and you do not need to do anything more about it.

## Installation

You can install this game with git.

    git clone https://github.com/vietanhvo/Android_Task_Monitoring.git
    
## Usage
Firstly, move to the folder which contains the app by the command:

    cd .\Android_Task_Monitoring\
    
Next, using yarn (or npm if you want) to install all packages needed.
    
    yarn install
    
Finally, you can launch the app with Expo by

    yarn start
    
At that time, a new window will appear on your web browser. You can use your phone to scan the QR code and try out Android Task Monitoring project.

## More Information
You can find ER Diagrams, relational database, and the report with some screenshots in the folder report. This folder contains all our documents for this project. If you want to take an overview, you should start here.
