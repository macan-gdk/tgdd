var GioHangModel = require('../models/giohang');
var cm = require('../models/giohang');

exports.create = function (req, res) {
    // Create and Save a new Note
    var value = req.body;

    GioHangModel.create(value, function (err, data) {
        if (err) {
            res.status(400).send(err);
            return;
        }
        res.send(data);
    });
};

exports.findOne = function (req, res) {
    // Find a single note with a noteId
    var value = req.params.email;

    GioHangModel.findOne(value, function (err, data) {
        if (err) {
            res.status(400).send(err);
            return;
        }
        res.send(data);
    });
};

exports.update = function (req, res) {
    // Update a note identified by the noteId in the request
         var value = req.body;
        GioHangModel.update(value, function(err, data){
            if(err) {
                res.status(500).send(err);
                return;
            } else {
                res.send(data);
            }
        });
};


exports.delete = function (req, res) {
    // Delete a note with the specified noteId in the request
    var value = req.body;

    GioHangModel.delete(value, function (err, data) {
        if (err) {
            res.status(400).send(err);
            return;
        }
        res.send(data);
    });
};