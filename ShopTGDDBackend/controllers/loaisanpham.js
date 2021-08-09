var LoaiSanPhamModel = require('../models/loaisanpham');
var cm = require('../models/loaisanpham');

exports.create = function (req, res) {
    // Create and Save a new Note
    var value = req.body;

    LoaiSanPhamModel.create(value, function (err, data) {
        if (err) {
            res.status(400).send(err);
            return;
        }
        res.send(data);
    });
};


exports.findAll = function (req, res) {
    // Retrieve and return all notes from the database.
    LoaiSanPhamModel.findAll(function (err, data) {
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
    var value = req.params.maloai;

    LoaiSanPhamModel.findOne(value, function (err, data) {
        if (err) {
            res.status(400).send(err);
            return;
        }
        res.send(data);
    });
};

exports.update = function (req, res) {
    // Update a note identified by the noteId in the request
    var id = req.params.maloai;

    LoaiSanPhamModel.findOne(id, function (err, data) {
        if (err) {
            res.status(400).send(err);
            return;
        }
        if (!data) {
            res.status(404).send(err);
            return;
        }

        var value = req.body;
        value.maloai = id;

        LoaiSanPhamModel.update(value, function(err, data){
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
    var value = req.params.maloai;

    LoaiSanPhamModel.delete(value, function (err, data) {
        if (err) {
            res.status(400).send(err);
            return;
        }
        res.send(data);
    });
};