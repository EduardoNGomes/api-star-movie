const { URI } = require('../Utils/routeAnnotation');

const createComentario = (req, res) => {
    const comentario = [
        {
            id: '5555',
            id_filme: '3333',
            descr: "Esse filme é uma linda história :)",
            status: 'P'
        }
    ];

    res.json(comentario);
}

const findComentarioById = (req, res) => {

    const id = req.params.id;

    const comentario = [
        {
            id
        }
    ];

    res.json(comentario)

}

const findComentarioByFilme = (req, res) => {

    const filme_id = req.params.id;

    const comentario = [
        {
            filme_id
        }
    ];

    res.json(comentario)

}

const updateComentario = (req, res) => {

    const body = req.body;
    res.json(body);

}

const deleteComentario = (req, res) => {

    const id = req.params.id;
    res.json(id);

}

module.exports = {
    createComentario: URI('/comentario','POST')(createComentario),
    findComentarioById: URI('/comentario/:id', 'GET')(findComentarioById),
    findComentarioByFilme: URI('/comentario/filme/:id', 'GET')(findComentarioByFilme),
    updateComentario: URI('/comentario', 'PUT')(updateComentario),
    deleteComentario: URI('/comentario/:id', 'DELETE')(deleteComentario)
}