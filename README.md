<h1 align="center">Desafio Pagar.me - Backend</h1>

<h3 align="center">
  Esse desafio consiste em criar uma applicação que simule um <strong>PSP - Payment Service Provider</strong> utilizando <a href="https://nodejs.org/en/">NodeJS</a>
</h3>
<br>
<h4 align="center">
	🚧   🚀 Em desenvolvimento...  🚧
</h4>
<br>

Tabela de conteúdos
=================
<!--ts-->
   * [Sobre](#Sobre)
   * [Como usar](#como-usar)
      * [Pre Requisitos](#pre-requisitos)
      * [Rodando o Backend](#rodando-o-backend)
      * [Introdução](#introdução)
      * [Merchant](#merchant)
   * [Tecnologias](#tecnologias)
   * [Tests](#testes)
<!--te-->
<br>
<br>

<!-- <h1 align="center">Sobre</h1> -->


<h1 align="center">Como Usar</h1>

## Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/).
<br>
Além disso é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/), e uma plataforma para simular as requisições, como o [Insomnia](https://insomnia.rest/download) ou [Postman](https://www.postman.com/downloads/)

<!-- Você pode utilizar este arquivo do Insomnia com as requisições utilizadas em desenvolvimento: download -->

<br>
<br>

## Rodando o Backend

```bash
#Clone este repositório
$ git clone <https://github.com/wallace-camarinha/Pagarme-Challenge>

# Acesse a pasta do projeto no terminal/cmd
$ cd nlw1

# Instale as dependências
$ npm install

# Execute a aplicação em modo de desenvolvimento
$ npm run dev:server

# O servidor inciará na porta:5555 - acesse <http://localhost:5555>
```

<br>
<br>

## Introdução

Este desafio foi desenvolvido seguindo padrões REST.
<br>
As operações são feitas através de requiseções aos <strong>endpoints</strong>, utilizando verbos HTTP com as mensagens em [JSON](http://www.json.org/).

<br>

URL Base: http://localhost:5555
<br>
💡<small> Atualmente a aplicação roda localmente</small>

<br>

## Merchant
O objeto ```merchant``` permite a criação de uma loja na aplicação. Um ```merchant``` possui os seguintes atributos:


| Atributos  |      Tipo     |           Descrição         |
|:----------:|:-------------:|:---------------------------:|
|     id     |  left-aligned |     Código do Merchant      |
|    name    |    centered   |       Nome do Merchant      |
| created_at | right-aligned | Data de criação do Merchant |
<br>
---

<br>

<h3>Criar Merchant - <q style="color:DodgerBlue">POST</q></h3>
Cria um Merchant na aplicação com o nome informado.
<br>
<small>Items com <a style="color:red">*</a> são obrigatórios.</small>
<br>
<br>

ENDPOINT:

>`http://localhost:5555/merchants`

<br>

BODY PARAMS:
<br>

* name<a style="color:red">*</a> -- `string`

EXEMPLO:

    {
      "name": "Dracarys Store"
    }
<br>

---
<br>


<h3>Listar Merchants - <q style="color:LightGreen">GET</q></h3>

Lista todos os Merchants já criados na aplicação.
<br>
<br>

ENDPOINT:

>`http://localhost:5555/merchants`
<br>

---
<br>


<h3>Listar um Merchant - <q style="color:LightGreen">GET</q></h3>

Obtém um Merchant atráves do seu identificador `merchant_id`
<br>
<small>Items com <a style="color:red">*</a> são obrigatórios.</small>
<br>
<br>

ENDPOINT:

>`http://localhost:5555/merchants/{merchant_id}`
<br>

<br>

PATH PARAMS:
<br>

* merchant_id<a style="color:red">*</a> -- `string`

EXEMPLO:

    http://localhost:5555/merchants/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx

<br>

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


### Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

- [Node.js](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
