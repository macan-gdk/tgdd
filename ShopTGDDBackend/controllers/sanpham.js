var SanPhamModel = require('../models/sanpham');
var cm = require('../models/sanpham');

exports.create = function (req, res) {
    // Create and Save a new Note
    var value = req.body;

    SanPhamModel.create(value, function (err, data) {
        if (err) {
            res.status(400).send(err);
            return;
        }
        res.send(data);
    });
};


exports.findAll = function (req, res) {
    // Retrieve and return all notes from the database.
    SanPhamModel.findAll(function (err, data) {
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
    var value = req.params.masanpham;

    SanPhamModel.findOne(value, function (err, data) {
        if (err) {
            res.status(400).send(err);
            return;
        }
        res.send(data);
    });
};

exports.update = function (req, res) {
    // Update a note identified by the noteId in the request
    var id = req.params.masanpham;

    SanPhamModel.findOne(id, function (err, data) {
        if (err) {
            res.status(400).send(err);
            return;
        }
        if (!data) {
            res.status(404).send(err);
            return;
        }

        var value = req.body;
        value.masanpham = id;

        SanPhamModel.update(value, function(err, data){
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
    var value = req.params.masanpham;

    SanPhamModel.delete(value, function (err, data) {
        if (err) {
            res.status(400).send(err);
            return;
        }
        res.send(data);
    });
};

exports.top12 = (req, res) => {
    SanPhamModel.top12( (err, data) => {
        if(err) {
            res.status(400).send(err);
            return;
        }
        res.send(data);
    })
}

exports.top12ByID = (req, res) => {
    var id = req.params.masanpham;
    SanPhamModel.top12ByID(id, (err, data) => {
        if(err) {
            res.status(400).send(err);
            return;
        }
        res.send(data);
    })
}

exports.top12view = (req, res) => {
    SanPhamModel.top12view( (err, data) => {
        if(err) {
            res.status(400).send(err);
            return;
        }
        res.send(data);
    })
}

exports.findByCat = (req, res) => {
    let page = req.query.page ? req.query.page : 1;
    SanPhamModel.findByCat(req.params.maloai, page , (err, data) => {
        if(err) {
            res.status(400).send(err);
            return;
        }
        res.send(data);
    })
}

exports.upView = (req, res) => {
    SanPhamModel.upView(req.params.masanpham, (err, data) => {
        if(err) {
            res.status(400).send(err);
            return;
        }
        res.send(data);
    })
}

exports.updateSoLuong = function (req, res) {
    // Update a note identified by the noteId in the request
    var masanpham = req.params.masanpham;
    var value = req.body;
    var soluong = value.soluong;
    SanPhamModel.updateSoLuong(soluong, masanpham, function(err, data){
        if(err) {
            res.status(500).send(err);
            return;
        } else {
            res.send(data);
        }
    });
};