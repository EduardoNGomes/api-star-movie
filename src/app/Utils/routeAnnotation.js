const express = require('express');
const router = express.Router();

function URI(uri, verb){

    const root_uri = '/v1/film-fans';
    const final_uri = root_uri + uri;

    return function(target, propertKey, descriptor){
        router[verb.toLowerCase()](final_uri, target);
    };
}

module.exports = {
    URI,
    router
}