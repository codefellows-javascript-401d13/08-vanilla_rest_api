'use strict';

const storage = require('../lib/storage.js');
const response = require('../lib/response.js');
const Pet = require('../model/pet.js');

module.exports = function(router) {
    router.get('/api/pet', function(req, res) {
        if (req.url.query.id) {
            storage.fetchItem('pet', req.url.query.id)
            .then( pet => {
                response.sendJSON(res, 200, pet);
            })
            .catch( err => {
                console.error(err);
                response.sendText(res, 404, 'not found');
            });

            return;
        }
        response.sendText(res, 400, 'bad request');
    });

    router.post('/api/pet', function(req, res) {
        try {
            var pet = new Pet(req.body.name, req.body.type);
            storage.createItem('pet', pet);
            response.sendJSON(res, 200, pet);
        } catch (err) {
            console.error(err);
            response.sendText(res, 400, 'bad request');
        };
    });

    router.delete('api/pet', function(req, res) {
        if (req.url.query.id) {
            storage.deleteItem('pet', req.url.query.id)
            .then( () => {
                response.sendText(res, 204, 'no content');
            })
            .catch(err => {
                console.error(err);
                response.sendText(res, 404, 'not found');
            });

            return;
        }
        response.sendText(res, 400, 'bad request');
    });
};





