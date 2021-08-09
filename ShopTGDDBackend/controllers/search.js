var SearchModel = require('../models/search');
var cm = require('../models/search');

exports.findOne = function (req, res) {
    // Find a single note with a noteId
    var value = req.params.search;
    var page = req.query.page;
    SearchModel.findOne(value, page, function (err, data) {
        if (err) {
            res.status(400).send(err);
            return;
        }
        res.send(data);
    });
};

