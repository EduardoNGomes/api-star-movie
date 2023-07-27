const express = require('express');
const { router } = require('./Utils/routeAnnotation');
const FilmesController = require('./Filmes/Filmes.controller');
const ComentarioController = require('./Comentarios/Comentarios.controller');

const app = express();
const port = 4002;
app.use(express.json());
app.use(router);

app.listen(port, () => {
    console.log(`Server Film Fans is running on port ${port}`);
})

//GET, POST, PATCH, PUT, DELETE

app.get('/v1/film-fans/check-live', (req, res) => {
    res.send("I'm live and breathing");
})