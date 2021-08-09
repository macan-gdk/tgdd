var CommentModel = require('../models/comment');
var cm = require('../models/comment');

exports.create = function (req, res) {
    // Create and Save a new Note
    var value = req.body;

    CommentModel.create(value, function (err, data) {
        if (err) {
            res.status(400).send(err);
            return;
        }
        res.send(data);
    });
};

exports.findOne = function (req, res) {
    // Find a single note with a noteId
    var value = req.params.sanpham;
    if (req.query.limit) {
        CommentModel.findOneLimit5(value, function (err, data) {
            if (err) {
                res.status(400).send(err);
                return;
            }
            res.send(data);
        });
    }
    else {
        CommentModel.findOne(value, function (err, data) {
            if (err) {
                res.status(400).send(err);
                return;
            }
            res.send(data);
        });
    }
};

exports.update = function (req, res) {
    // Update a note identified by the noteId in the request
    var id = req.params.macomment;

    CommentModel.findOne(id, function (err, data) {
        if (err) {
            res.status(400).send(err);
            return;
        }
        if (!data) {
            res.status(404).send(err);
            return;
        }

        var value = req.body;
        value.macomment = id;

        CommentModel.update(value, function(err, data){
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
    var value = req.params.macomment;

    CommentModel.delete(value, function (err, data) {
        if (err) {
            res.status(400).send(err);
            return;
        }
        res.send(data);
    });
};
