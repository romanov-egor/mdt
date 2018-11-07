# My Daily Tasks
This project contains application for personal tasks management

**Be careful! This project uses Hypersonic 2! It will try to create database files
under D:/Work/MyDailyTasks-project/mdt/data/mdt-database during runtime! To change
this path, go to src\main\resources\configuration\main.xml, rewrite path and rebuild**

## Technology stack

* React
* Spring Web
* Spring Data JPA

## Build and Run Instructions

To build and run this application you will need:
* JDK 1.8 or higher
* Apache Maven 3.5.0 or higher

Don't forget to set `JAVA_HOME` and `M2_HOME` environment variables and add them to `PATH`.

Clone project with
```
    git clone https://github.com/romanov-egor/mdt.git
```
or download zip file and extract to any folder.

### To build application
Open command line, go to project folder and execute
```
    mvn clean package
```

### To run application
Download any application server you like and deploy .war file you built

## Launch instructions
After successful deployment open your favourite browser and go to http://localhost:8080/mdt/react/.
Enter credentials user/user.

Enjoy!