<h1 align="center">PSP-Mock API</h1>

<h3 align="center">
  This application consists of a <strong>PSP - Payment Service Provider</strong> simulator, aiming to mock real world transactions and it's specifications. With two main functionalities <strong>cash-in</strong> and <strong>cash-out</strong>.
</h3>
<br>
<h4 align="center">O PSP-Mock was built in <a href="https://nodejs.org/en/">NodeJS</a>, with <a href="https://www.typescriptlang.org/">Typescript</a>


<br>
<br>

<h4 align="center">
	🚧   🚀 Ongoing development...  🚧
</h4>
<br>

Sumary
=================
<!--ts-->
   * [About](#About)
   * [How to use](#how-to-use)
      * [Requirements](#requirements)
      * [Running the API](#running-the-api)
      * [Introduction](#introduction)
      * [Merchant](#merchant)
   * [Technology Stack](#technology-stack)
   * [Tests](#tests)
<!--te-->
<br>
<br>

<!-- <h1 align="center">About</h1> -->


<h1 align="center">How to use</h1>

<h2> Requirements</h2>

Before you begin, you're gonna need the following tools installed on your machine:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/) and [Docker](https://www.docker.com/). You also need a platform to simulate requests, such as [Insomnia](https://insomnia.rest/download) or [Postman](https://www.postman.com/downloads/)
<br>
It's also good to have an editor to work with the code, but it's not mandatory. A good example is: [VSCode](https://code.visualstudio.com/).



<br>
<br>

## Running the API

```bash
#Clone this repo
$ git clone <https://github.com/wallace-camarinha/PSP-Mock>

# Access the project's folder on your terminal/cmd
$ cd psp-mock

# Install the dependencies
$ npm install

# Creates a new docker container to run the database
$ docker run --name postgres-pg -e POSTGRES_USERNAME=postgres -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres

# Execute the application locally
$ npm run dev:server

# The server will stat on port:5599 - access: http://localhost:5599
```

<br>
<br>


<h1 align="center">Introduction</h1>

This application was built following REST patterns.
<br>
Every request must be made to the <strong>endpoints</strong>, using HTTP verbs with standard "content/type" set to [JSON](http://www.json.org/).

<br>

Base URL: http://localhost:5599
<br>
💡<small> Currently the application only runs locally</small>

<br>

### See the API's documentation here http://localhost:5599/api-docs

<br>
<br>

<h1 align="center">Technologies</h1>

## This project was built with the following technologies

### Core Dependencies

- [Node.js](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/)

### Database Related Dependencies

- [PostgresSQL](https://www.postgresql.org/)
- [Docker](https://www.docker.com/)
- [Prisma](https://www.prisma.io/)

### Documentation

- [Swagger](https://swagger.io)
