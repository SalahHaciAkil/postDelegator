# AnnounceKitBlogApp

loom first video: https://www.loom.com/share/0eb418efcfe94d2f8bd06cdc4a8c8efd

loom second video: https://www.loom.com/share/ee51b0c546024525a2790e56e34f8870

## Overview

This is a web application built with a frontend and a backend using Docker Compose.

## Prerequisites

To run this web application with Docker, you need to have Docker and Docker Compose installed on your machine. You can download and install Docker from the [official Docker website](https://www.docker.com/get-started).

If you would like to run the application without Docker, you will need to have Node.js and npm installed on your machine. You can download and install Node.js from the [official Node.js website](https://nodejs.org/en/download/).

## Installation

1. Clone this repository to your local machine.
2. Navigate to the root directory of the project.
3. To run the application with Docker, run `docker-compose up` to build and start the application. Access the application by going to http://localhost:3000 in your web browser.
4. To run the application without Docker:
   - Navigate to the `backend` directory and run `npm install` to install the backend dependencies.
   - Run `npm start` to start the backend server.
   - Navigate to the `frontend` directory and run `npm install` to install the frontend dependencies.
   - Run `npm start` to start the frontend server.
   - Access the application by going to http://localhost:3000 in your web browser.

## Usage

The web application consists of a frontend and a backend. The frontend is built using [React](https://reactjs.org/) and the backend is built using [Node.js](https://nodejs.org/).

### Directories

- Frontend: `frontend`
- Backend: `backend`

You can modify these directories to suit your needs.

## Docker Compose Configuration

The `docker-compose.yml` file contains the configuration for Docker Compose. It specifies the services to be run and their configurations. You can modify this file to add or remove services as needed.

## Contributing

If you would like to contribute to this project, please create a pull request with your changes.
