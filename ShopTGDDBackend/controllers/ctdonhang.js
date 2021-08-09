var CTDonHangModel = require('../models/ctdonhang');
var cm = require('../models/ctdonhang');

exports.create = function (req, res) {
    // Create and Save a new Note
    var value = req.body;

    CTDonHangModel.create(value, function (err, data) {
        if (err) {
            res.status(400).send(err);
            return;
        }
        res.send(data);
    });
};


exports.findAll = function (req, res) {
    // Retrieve and return all notes from the database.
    CTDonHangModel.findAll(function (err, data) {
        if (err) {
            res.status(400).send(err);
            return;
        }
        res.send(data);
    }
    );
};

exports.findOne = function (req, res) {
    // Find a single note with a noteId
    var value = req.params.madonhang;

    CTDonHangModel.findOne(value, function (err, data) {
        if (err) {
            res.status(400).send(err);
            return;
        }
        res.send(data);
    });
};

exports.update = function (req, res) {
    // Update a note identified by the noteId in the request
    var id = req.params.madonhang;

    CTDonHangModel.findOne(id, function (err, data) {
        if (err) {
            res.status(400).send(err);
            return;
        }
        if (!data) {
            res.status(404).send(err);
            return;
        }

        var value = req.body;
        value.madonhang = id;

        CTDonHangModel.update(value, function(err, data){
            if(err) {
                res.status(500).send(err);
                return;
            } else {
                res.send(data);
            }
        });

    });
};


exports.delete = function (req, res) {
    // Delete a note with the specified noteId in the request
    var value = req.params.madonhang;

    CTDonHangModel.delete(value, function (err, data) {
        if (err) {
            res.status(400).send(err);
            return;
        }
        res.send(data);
    });
};