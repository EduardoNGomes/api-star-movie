<h1> 🌟 Star Movie API</h1>

#### Este projeto foi desenvolvido como um desafio proposto por [Josiel](https://www.linkedin.com/in/josiel-barbosa-nascimento/), Senior Software Engineer na Syngenta Digital Brasil. Ele conduziu uma trilha de desafios, demonstrando como criar uma API do zero até o deploy.

#### Neste projeto, tive a oportunidade de aplicar meus conhecimentos e habilidades para desenvolver a aplicação de acordo com os requisitos propostos.

<br>
<br>

# ✨ Funcionalidades

### 👤 User

[ :heavy_check_mark: ] Criação de usuário

[ :heavy_check_mark: ] Atualização de usuário

[ :heavy_check_mark: ] Authenticação de usuário

[ :heavy_check_mark: ] Selecão de usuário por id

[ :heavy_check_mark: ] Selecão de usuário por email

### 🎬 Movie

[ :heavy_check_mark: ] Criação de um filme

[ :heavy_check_mark: ] Seleção de todos os filmes

[ :heavy_check_mark: ] Seleção de um filme com todos os comentários relacionados a ele e a média total de avaliações

[ :heavy_check_mark: ] Remocão de um filme criado

### 💬 Comment

[ :heavy_check_mark: ] Criação de comentário para um filme existente

[ :heavy_check_mark: ] Remoção de um comentário

<br>
<br>

# ⚙️ Instalação

<br>

- Clone o repositório.

- Criar um arquivo `.env` com a informacoes seguindo o padrão do `.env.example`

- Instale as dependências necessárias usando `npm install`.

- Execute o arquivo da docker usando `docker compose up`.

  <strong>OBS: E necessário ter a docker instalada no computador.</strong>

- Execute as migrates para criar o banco de dados usando `npm run knex -- migrate:latest`.

- Execute a aplicação usando `npm run dev`.

<br>

# 📡 Endpoints da API

### Os seguintes endpoints estão disponíveis:

## 👤 User - Endpoints

- #### Criar um novo usuário.

  <p>Método: <strong>POST</strong> <p> 
  <p>rota: <strong>/user</strong> </p>

  ##### OBS: password precisa de no mínimo 8 caracteres

  #### <p>Exemplo para requisição:</p>

```
 {
  name: "user",
  email: "user@example.com",
  password: "userpassord"
 }
```

<hr>

- #### Autenticar usuário

  <p>Método: <strong>POST</strong> <p> 
  <p>rota: <strong>/user/session</strong> </p>

  #### <p>Exemplo para requisição:</p>

```
 {
  email: "user@example.com",
  password: "userpassord"
 }
```

<hr>

- #### Atualizar usuário.

  <p>Método: <strong>PUT</strong> <p> 
  <p>rota: <strong>/user/session</strong> </p>

  ##### OBS: Esta rota requer um Bearer Token

  ##### OBS: Todos os parâmetros que esta rota pode receber são opcionais

  #### <p>Exemplo para requisição:</p>

```
 {
  name: "username",
  image: "userimage.png",
  threads_url: "user-threads",
  twitter_url: "user-twitter",
  tiktok_url: "user-tiktok",
  instagram_url: "user-instagram",
 }
```

<hr>

- #### Selecionar usuário pelo ID.

  <p>Método: <strong>GET</strong> <p> 
  <p>rota: <strong>/user</strong> </p>

  ##### OBS: Esta rota requer um Bearer Token

<hr>

- #### Selecionar usuário pelo E-MAIL.

  <p>Método: <strong>POST</strong> <p> 
  <p>rota: <strong>/user</strong> </p>

  ##### OBS: Esta rota requer um Bearer Token

  #### <p>Exemplo para requisição:</p>

```
 {
  email: "user@example.com",
 }
```

<hr>

- #### Selecionar imagem do usuário

  <p>Método: <strong>GET</strong> <p> 
  <p>rota: <strong>/files/:image_name</strong> </p>

<br>

## 🎬 Movie - Endpoints

- #### Criar um novo filme.

  <p>Método: <strong>POST</strong> <p> 
  <p>rota: <strong>/movie</strong> </p>

  ##### OBS: A imagem deve ser um file do tipo jpg/jpeg/png

  ##### OBS: Age deve ser o ano de lançamento do filme

  ##### OBS: Esta rota requer um Bearer Token

  #### <p>Exemplo para requisição:</p>

```
 {
	title: "movie example",
	age: "1998",
	sinopse: "lorem lorem lorem lorem lorem lorem",
	image: "1e1a98285b6125b6a307-linux.jpeg",
 }
```

<hr>

- #### Selecionar todos os filmes.

  <p>Método: <strong>GET</strong> <p> 
  <p>rota: <strong>/movie</strong> </p>

  ##### OBS: Esta rota requer um Bearer Token

<hr>

- #### Selecionar um filme.

  <p>Método: <strong>GET</strong> <p> 
  <p>rota: <strong>/movie/:filme_id</strong> </p>

  ##### OBS: Esta rota trará os detalhes deste filme com todos os comentários e sua nota media de avaliação

  ##### OBS: Esta rota requer um Bearer Token

<hr>

- #### Deletar um filme.

  <p>Método: <strong>DEL</strong> <p> 
  <p>rota: <strong>/movie/:filme_id</strong> </p>

  ##### OBS: Só é possível deletar este filme se o usuário for o mesmo que o criou.

  ##### OBS: Esta rota requer um Bearer Token

<br>

## 💬 Comment - Endpoints

- #### Criar um novo comentário.

  <p>Método: <strong>POST</strong> <p> 
  <p>rota: <strong>/comment/:movie_id</strong> </p>

  ##### OBS: Esta rota requer um Bearer Token

  ##### OBS: A nota do filme deve ser de 0 a 5

  #### <p>Exemplo para requisição:</p>

```
{
	description: "Ótimo filme! Recomendo a todos!",
 	rating_movie: "2"
}
```

<hr>

- #### Deletar um comentário.

  <p>Método: <strong>DEL</strong> <p> 
  <p>rota: <strong>/comment/:comment_id</strong> </p>

  ##### OBS: Esta rota requer um Bearer Token

<br>

# Tecnologias Utilizadas

- TypeScript
- NodeJs
- Express
- Knex
- Multer
- Jwt
- Zod
- PostgreSQL
- Docker

<br>

#### Para testar toda aplicacao utilize também o Front-End [Movie Star](https://github.com/gabrielSantos1101/Front-star-Movies)

<hr>

## Contribuidores

| Nome                                                                    | Papel                 |
| ----------------------------------------------------------------------- | --------------------- |
| [Eduardo N Gomes](https://www.linkedin.com/in/eduardo-n-gomes/)         | Back-End \| Front-end |
| [Gabriel Santos](https://www.linkedin.com/in/gabriel-santos-bb4a10188/) | Front-End \| Design   |
| [Biro³](https://www.linkedin.com/in/birobirobiro/)                      | Design                |
| [Lara Azevedo](https://www.linkedin.com/in/larazevedoo/)                | Design                |
