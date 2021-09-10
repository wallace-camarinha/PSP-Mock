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


<!-- Você pode utilizar este arquivo do Insomnia com as requisições utilizadas em desenvolvimento: download -->

<br>
<br>

## Running the API

```bash
#Clone this repo
$ git clone <https://github.com/wallace-camarinha/Pagarme-Challenge>

# Access the project's folder on your terminal/cmd
$ cd psp-mock

# Install the dependencies
$ npm install

# Execute the application locally
$ npm run dev:server

# The server will stat on port:5555 - access: http://localhost:5555
```

<br>
<br>

## Introduction

This application was built following REST patterns.
<br>
Every request must be made to the <strong>endpoints</strong>, using HTTP verbs with standard "content/type" set to [JSON](http://www.json.org/).

<br>

Base URL: http://localhost:5555
<br>
💡<small> Currently the application only runs locally</small>

<br>

## Merchant
The object ```merchant``` allow the creation of a store. A ```merchant``` has the following attributes:


|    Attributes   |      Type     |         Description         |
|:---------------:|:-------------:|:---------------------------:|
|         id      |     string    |    Merchant's identifier    |
|        name     |     string    |       Merchant's name       |
| document_number |     string    |        Document (CNPJ)      |
|    created_at   |      date     |   Merchant's creation date  |
<br>
---

<br>

<h3>Create a Merchant - Method: <q style="color:DodgerBlue">POST</q></h3>
Creates a Merchant in the application.
<br>
<small>Items with <a style="color:red">*</a> are mandatory.</small>
<br>
<br>

ENDPOINT:

>`http://localhost:5555/merchants`

<br>

BODY PARAMS:
<br>

* name <a style="color:red">*</a> -- `string`
* document <a style="color:red">*</a> -- `string`

EXAMPLE:

    {
      "name": "No Man's Store"
      "cnpj": "12345678901234"
    }
<br>

---
<br>

<h3>List a Merchant - Method: <q style="color:LightGreen">GET</q></h3>

List a Merchant based on it's identifier `merchant_id` or `cnpj`, informed in the request's body.
<br>
<small>Items with <a style="color:red">*</a> are mandatory.</small>
<br>
<br>

ENDPOINT:

>`http://localhost:5555/merchants`
<br>

<br>

BODY:
<br>

* merchant_id <a style="color:red">*</a> -- `string`
</br>
<small>Obrigatório quando não é enviado um `cnpj`</small>

* cnpj <a style="color:red">*</a> -- `string`
</br>
<small>Obrigatório quando não é enviado um `merchant_id`</small>


EXAMPLE:

    {
      "merchant_id": "a31b8a1d-f28b-4ba3-a27e-d85301aa8a9d"
      "cnpj": "12345678901234"
    }

<br>

---
<br>

<h3>List All Merchants - Method: <q style="color:LightGreen">GET</q></h3>

Lists a collection of all Merchants ever created in the application.
<br>
<br>

ENDPOINT:

>`http://localhost:5555/merchants/list`
<br>

That simple!

---

















<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>


<h3 align="center">Tecnologias</h3>

As seguintes ferramentas foram usadas na construção do projeto:

### Core

- [Node.js](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/)

### Database Related Dependencies

- [PostgresSQL](https://www.postgresql.org/)
- [Docker](https://www.docker.com/)
- [Typeorm](https://typeorm.io/)
