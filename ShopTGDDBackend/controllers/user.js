var UserModel = require('../models/user');
var cm = require('../models/user');
var moment = require('moment');
var nodemailer = require('nodemailer');

exports.create = function (req, res) {
    // Create and Save a new Note
    var value = req.body;

    UserModel.create(value, function (err, data) {
        if (err) {
            res.status(400).send(err);
            return;
        }
        res.send(data);
    });
};


exports.findAll = function (req, res) {
    // Retrieve and return all notes from the database.
    UserModel.findAll(function (err, data) {
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
    var value = req.params.id;

    UserModel.findOne(value, function (err, data) {
        if (err) {
            res.status(400).send(err);
            return;
        }
        res.send(data);
    });
};

exports.update = function (req, res) {
    // Update a note identified by the noteId in the request
    var id = req.params.id;

    UserModel.findOne(id, function (err, data) {
        if (err) {
            res.status(400).send(err);
            return;
        }
        if (!data) {
            res.status(404).send(err);
            return;
        }

        var value = req.body;
        value.id = id;

        UserModel.update(value, function (err, data) {
            if (err) {
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
    var value = req.params.id;

    UserModel.delete(value, function (err, data) {
        if (err) {
            res.status(400).send(err);
            return;
        }
        res.send(data);
    });
};

exports.createByAdmin = (req, res) => {
    var password = Math.random().toString(36).slice(-8);
    var value = req.body;
    value.password = password;
    value.role = 1;
    value.createat = moment().format("YYYY-MM-DD");

    UserModel.findOneByEmail(value.email, function (err, data) {
        if (data.length > 0) {
            res.send({ "error": "Email have already exist!" });
            return;
        }
    });

    UserModel.create(value, function (err, data) {
        if (err) {
            res.status(400).send({ "error": err });
            return;
        }
        //
        nodemailer.createTestAccount((err, account) => {
            let transporter = nodemailer.createTransport({
                host: 'admin.gmail.com',
                port: 587,
                secure: false, // true for 465, false for other ports
                auth: {
                    user: 'macan28996@gmail.com', // generated ethereal user
                    pass: '123456' // generated ethereal password
                }
            });
            let mailOptions = {
                from: '"Admin ShopTGDD"',
                to: value.email,
                subject: 'Manager Invitation',
                text: '',
                html: `<div>Email: ${value.email}</div><b>Your password: ${value.password}</b>`
            };
            transporter.sendMail(mailOptions);
        });
        //
        res.send({ "error": null });
    });
}

exports.checkEmail = (req, res) => {
    UserModel.findOneByEmail(req.body.email, function (err, data) {
        if (data.length > 0) {
            res.send({ "error": "Email đã tồn tại!" });
            return;
        }
        else {
            res.send({ "error": null });
        }
    });
}

exports.forgot = (req, res) => {
    var password = Math.random().toString(36).slice(-8);

    UserModel.findOneByEmail(req.body.email, function (err, data) {
        if (data.length > 0) {
            data[0].password = password;
            UserModel.update(data[0], function (errUpdate, dataUpdate) {
                if (errUpdate) {
                    res.status(500).send(errUpdate);
                    return;
                } else {
                    nodemailer.createTestAccount((errMail, account) => {
                        let transporter = nodemailer.createTransport({
                            host: 'admin.gmail.com',
                            port: 587,
                            secure: false, // true for 465, false for other ports
                            auth: {
                                user: 'macan28996@gmail.com', // generated ethereal user
                                pass: '123456' // generated ethereal password
                            }
                        });
                        let mailOptions = {
                            from: '"ShopTGDD - Mật khẩu của bạn"',
                            to: data[0].email,
                            subject: 'ShopTGDD - Mật khẩu đã được thay đổi',
                            text: '',
                            html: `<div>Email: ${data[0].email}</div><b>Your password: ${data[0].password}</b>`
                        };
                        transporter.sendMail(mailOptions);
                    });
                    res.send({ "success": "Thành công!" });
                }
            });
        }
        else {
            res.send({ "error": "Email không tồn tại!" });
        }
    });
}