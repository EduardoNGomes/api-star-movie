const { URI } = require('../Utils/routeAnnotation');
const FilmesService = require('./Filmes.service');

const filmesService = new FilmesService();

const createFilme = async(req, res) => {
    const body = req.body;
    const response = filmesService.createFilme(body);
    console.log('Criado: ', response);
    res.status(201).json();
}

const readAllFilmes = async(req, res) => {
    const response = await filmesService.readAllFilmes();
    res.status(200).json(response);
}

const findFilmeById = async(req, res) => {
    const id = req.params.id;
    console.log("id:", id);
    const response = await filmesService.findFilmeById(id);
    res.status(200).json(response);
}

const updateFilme = async(req, res) => {
    const id = req.params.id;
    const response = await filmesService.updateFilme(id, body);
    res.status(200).json(response);
}

const deleteFilme = async(req, res) => {
    const id = req.params.id;
    const response = await filmesService.deleteFilme(id);
    res.status(200).json(response);
}

module.exports = {
    createFilme: URI('/filmes','POST')(createFilme),
    readAllFilmes: URI('/filmes', 'GET')(readAllFilmes),
    findFilmeById: URI('/filmes/:id', 'GET')(findFilmeById),
    updateFilme: URI('/filmes/:id', 'PUT')(updateFilme),
    deleteFilme: URI('/filmes/:id', 'DELETE')(deleteFilme)
}