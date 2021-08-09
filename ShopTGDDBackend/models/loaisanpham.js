var db = require('./manageDB');

exports.findAll = function (callback) {
    db.executeQuery("select * from loaisanpham", function (err, data){
        callback(err, data);
    });
}

exports.create = function (value ,callback) {
	var query = "INSERT INTO loaisanpham SET ?";
	db.executeParamsQuery(query, value, function (err, data){
        callback(err, data);
    });
}

exports.delete = function (value, callback) {
	var query = "Delete From loaisanpham Where maloai = ?";
	db.executeParamsQuery(query, value, function(err, data){
		callback(err, data);
	});
}

exports.update = function (value, callback) {
	var query = "Update loaisanpham Set tenloai=? Where maloai = ?";
	db.executeParamsQuery(query, [value.tenloai, value.maloai], function(err, data){
		callback(err, data);
	});
}

exports.findOne = function (value, callback) {
	var query = "Select * From loaisanpham Where maloai = ?";
	db.executeParamsQuery(query, value, function(err, data){
		callback(err, data);
	});
}

