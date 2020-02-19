# APP PUC-CAMPINAS

[![Build Status](https://travis-ci.org/pedr0ni/arch-app-pucc.svg?branch=master)](https://travis-ci.org/pedr0ni/arch-app-pucc)

## Visão geral.
O projeto baseia-se em remodelar o aplicativo existente da PUC-Campinas.

## Objetivos
* Desenvolver um novo aplicativo de alunos para PUC-Campinas
* Implementar novas funcionalidades

## Especificações
A arquitetura do projeto será estruturada na API, que será desenvolvida utilizando Java com a Framework Spring Boot, no CMS, feito em HTML, CSS e Javascript com a framework VueJs que irá consumir da API e do aplicativo de alunos que será feito com React Native e também irá consumir da API. Para armazenar o banco, será utilizado um servidor MySQL.

### Web API (Spring Boot - Java)
O Spring Boot é uma Framework reconhecida e completa na linguagem Java, e por ser relativamente fácil de ser usada, foi escolhida para ser a base do projeto.

### CMS (VueJS - HTML, CSS e Javascript)
A framework VueJS é uma das melhores opções no mercado, por ser fácil e eficiente. Para o CRUD da aplicação, será implementada uma Single Page Application, onde o usuário (administrador) poderá fazer o cadastro de alunos, aulas, etc…

### Aplicativo Aluno (React Native - Javascript)
O React Native é uma framework sólida e completa, desenvolvida pela comunidade e mantida pelo Facebook. A vantagem de uma App Híbrida é ter apenas um código para as duas plataformas (Android e iOS).
