Programming Frameworks and Languages
====================================
# Server 

# Description

This server contains a simple Node.js application built with Express.js, serving as a backend for managing and retrieving items with location-based data. The application includes functionalities for creating, retrieving, updating, and deleting items, as well as filtering items based on various criteria such as user ID, keywords, location, date, and item ID.

# Prerequisites

Docker
Make 

# Getting Started

Building the Docker Image

* `make build`- this will build the current container and install any dependencies. 

Running Application: There are two methods of running the server. 

* `node app.js`
* `make run`

Note: please ensure you are inside the server directory before running these commands. 

# API Endpoints
GET /hello

Returns a simple JSON response with a greeting from the server.
GET /items

Retrieves all items stored in the application.
POST /item

Creates a new item with the provided data (user_id, keywords, description, lat, lon).
GET /items/user/:user_id

Retrieves items filtered by the specified user_id.
GET /items/keywords/:keywords

Retrieves items filtered by the specified keywords (comma-separated).
GET /items/location

Retrieves items filtered by location. Requires query parameters: lat, lon, and radius.
GET /item/:id

Retrieves an item by its ID.
GET /items/date/:date

Retrieves items filtered by the specified date.
DELETE /item/:id

Deletes the item with the specified ID.

# Technologies Used
Node.js
Express.js
geolib
Docker

# Dependencies

express
geolib
tailwindcss

# Prettier 

To run prettier in this directory simply run 

`npm run format`
                                                
# Server1 Mojolicious App

# Description

This is a simple Mojolicious web application written in Perl. It provides an API for managing items, allowing users to add, retrieve, and delete items.

# Prerequisites

Docker
Make 

# Getting Started

Building the Docker Image

* `make build`- this will build the current container and install any dependencies. 

Running Application: There are two methods of running the server. 

* `Perl app.pl`
* `make run`

Note: please ensure you are inside the server directory before running these commands. 

Accessing the Shell in the Docker Container

* `make shell` - This command opens a shell within the Docker container for debugging and development purposes.

# CPAN Modules

1. JSON
JSON is a widely used Perl module for encoding and decoding JSON (JavaScript Object Notation) data. In this application, it is utilised to handle JSON data in HTTP requests and responses.

2. Mojolicious::Plugin::SecureCORS
Mojolicious::Plugin::SecureCORS is a Mojolicious plugin that simplifies the process of handling Cross-Origin Resource Sharing (CORS). CORS is a security feature implemented by web browsers to control cross-origin requests. This plugin ensures that the necessary CORS headers are added to the HTTP responses, allowing controlled access to resources from different origins.

# Perltidy plugin

To run Perltidy use the following command 

`perltidy app.pl`

This will gen a new app.pl file with the extension .tdy. You can review the changes and if you are happy use mv app.pl app.pl.bck && mv app.pl.tdy app.pl to switch the copies. Maintaining the .bak file ensures that if anything breaks during the cleaning you can revert back to the previous version.

# Handling CORS in the Application

In the app.pl file, the following lines demonstrate how the SecureCORS plugin is applied to handle CORS headers:

use Mojolicious::Plugin::SecureCORS;

# ...

app->hook(before_dispatch => sub ($c) {
    $c->res->headers->header('Access-Control-Allow-Origin' => '*');
    $c->res->headers->header('Access-Control-Allow-Methods' => 'GET, POST, PUT, DELETE, OPTIONS');
    $c->res->headers->header('Access-Control-Allow-Headers' => 'Content-Type');
    $c->res->headers->header('Access-Control-Max-Age' => '3600');
});

# ...

These lines add CORS headers to the HTTP responses, allowing controlled cross-origin access to the Mojolicious application. Our origin is set to `*` (wild card) allowing all origins. Note this server is in development and wild cards pose a security risk. Before deployment cors handlers should be modified and set accordingly.

                                                API Endpoints
POST /item: Creates a new item.

Request example: 

                                            {
                                            "user_id": "string",
                                            "keywords": "string",
                                            "description": "string",
                                            "lat": "string",
                                            "lon": "string"
                                            }

Response example: 

                                            {
                                            "id": 1,
                                            "user_id": "string",
                                            "keywords": "string",
                                            "description": "string",
                                            "lat": "string",
                                            "lon": "string",
                                            "date_from": "ISO8601DateTime"
                                            }

GET /items: Retrieves a list of all items.

                                            [
                                            {
                                                "id": 1,
                                                "user_id": "string",
                                                "keywords": "string",
                                                "description": "string",
                                                "lat": "string",
                                                "lon": "string",
                                                "date_from": "ISO8601DateTime"
                                            },
                                            // Additional items
                                            ]

GET /item/:id: Retrieves details of a specific item. 

                                            {
                                            "id": 3,
                                            "user_id": "string",
                                            "keywords": "string",
                                            "description": "string",
                                            "lat": "string",
                                            "lon": "string",
                                            "date_from": "ISO8601DateTime"
                                            }

DELETE /item/:id: Deletes a specific item.

Response:
    204 No Content if the item is successfully deleted.
    404 Not Found if the item with the specified ID is not found.

Notes
The application uses the Mojolicious web framework and includes a simple item management API.
Ensure that required fields are present when creating items; otherwise, a 405 Method Not Allowed response is returned.
When running this application an index.html file will be displayed to show you simple curl commands to use in the terminal of your codespace. There is also the openapi.yml displayed. If you would like to navigate to the items via the browser simply enter /items at the end of the url. The displayed page should be black, with [] displayed. Once you post items they will be displayed here. Perltidy has been installed as an alternative to prettier.

# FreeCycle Client 

This repository contains the client-side code for FreeCycle, a web application for sharing and acquiring items within a community.

# Technologies Used
                                            
`Alpine.js`: A minimal JavaScript framework for building reactive web applications.
`Tailwind` CSS: A utility-first CSS framework for rapidly building custom designs.
`Python`: Used for serving the client locally during development.

# Features

- **Post Items:** Users can post items they want to give away, providing details such as user ID, location, description, keywords, and an image.
- **View Posted Items:** The application displays a list of items posted by users, including relevant information.
- **Delete Items:** Users can delete their posted items.

# Getting Started

Prerequisites:

Python (for local development)

To run this appication please use either two of the following commands:

`npm start`
`python3 -m http.server 8001`

To build with docker file:

`make build`
`make run`

This set of commands builds a Docker image for the client and runs it in a container, exposing it on port 8001.

# Structure

index.html: The main HTML file for the FreeCycle client.
makefile: Contains simple commands for building and running the client locally and with Docker.

# Client2

This is the second client-side code for the FreeCycle application. 

## Features

- **Post Items:** Users can post items they want to give away, providing details such as user ID, location, description, keywords, and an image.
- **View Posted Items:** The application displays a list of items posted by users, including relevant information.
- **Delete Items:** Users can delete their posted items.

## Prerequisites

Make sure you have the following installed:

- Node.js and npm (for development)

## Getting Started

# Configuration
T
he Prettier configuration is specified in the .prettierrc file.

# Technologies Used

Vue.js - Framework for reactive websites 
Bulma CSS framework - Layout framework
Prettier - Cleans up code to make it read and neat, depending on rules that have been set.

# FreeCycle Client2

This is the source code for FreeCycle, a web application built with Vue.js and Bulma. FreeCycle allows users to post and view items that are available for free, fostering a sense of community sharing. The application includes features such as adding new items, viewing posted items, and deleting items.

# Prerequisites

`Vue.js`: The JavaScript framework used for building the user interface.
`Bulma`: The CSS framework for styling the application.
`Python`: Used for serving the application locally.
`Docker`: Containerization tool for building and running the application in a container.

# Getting Started

Local Development

python3 -m http.server 8001

Docker
Build and run the application using Docker:

Build the Docker image:

# Application Structure

HTML: The structure of the web page is defined in index.html.
Vue.js: The JavaScript code for handling data and interactions is inlined within the HTML file.
Styling: Bulma CSS framework is used for styling. The stylesheet is included from a CDN.
Functionality
Adding Items: Users can add new items by filling out the form in the "Add Item" section. The data is sent to the server using a POST request.
Viewing Items: Posted items are displayed in the "Posted Items" section. Each item includes information such as ID, user ID, image, keywords, description, latitude, and longitude.
Deleting Items: Users can delete items by clicking the "Delete" button associated with each posted item. This action sends a DELETE request to the server.
Dockerfile
The Dockerfile is provided for containerization of the application. It uses the python:alpine base image, exposes port 8001, and copies the index.html file. The command to run the application inside the container is specified as CMD ["python3", "-m", "http.server", "8001"]

                                            Other notes. 
Prettier is not installed globally. It is installed in the directories of server, client and client1. Attempting to run prettier commands outside of these directories with throw an error. Please navigate to the correct directory before using these commands. 

Other commands for Prettier 

`npx prettier --write /filename./extension`

Perltidy is also installed in the directory of server1 only

