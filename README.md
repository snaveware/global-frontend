# Global

### Description
The application is Web Frontend  for a shipping management system Created in angular

It allows users to perform CRUD functionalities for manifests, shipments, users, and usergroups(roles)

The system implements access control using both roles and permissions
Therefore, a user with admin privilages can assign and revoke  other users groups privilages.

The the system also has the ability to generate pdf documents for each manifest and send those documents via email


The Frontend is hosted  [Here](https://global-shipping.herokuapp.com/);

## NB: before running this project anywhere, you have to make sure that the backend/api is running somewhere and you have changed the **BACKEND_BASE_URL** in /source/environments to reflect the location where the backend/api is installed.

## the bacckend/api can be found in [https://github.com/evans-work/global-api.git] (https://github.com/evans-work/global-api.git)

### Running the project locally



#### In addition to node and npm, Make sure that angular cli is installed in your system

####  Install other dependancies by running 
**npm install**

####  Start the dev surver by running:

**ng serve**


### Running the project using Docker image 
1. Make sure docker is installed in your system
2. Run the following 2 commands

 docker pull snave020/global-frontend:latest
    
 docker run -d -p 80:80 snave020/global-frontend

*you can change the first port 80 to anything you wish*

*access the server through the provided port*

*You can also remove the -d flag to make the container run in the terminal*