var db = require('./manageDB');

exports.create = function (value ,callback) {
	var query = "INSERT INTO giohang SET ?";
	db.executeParamsQuery(query, value, function (err, data){
        callback(err, data);
    });
}

exports.delete = function (value, callback) {
	var query = "Delete From giohang Where email = ? and masp = ?";
	db.executeParamsQuery(query, [value.email, value.masp], function(err, data){
		callback(err, data);
	});
}

exports.update = function (value, callback) {
	var query = "Update giohang Set soluong = ? Where email = ? and masp = ?";
	db.executeParamsQuery(query, [value.soluong, value.email, value.masp], function(err, data){
		callback(err, data);
	});
}

exports.findOne = function (value, callback) {
	var query = "Select* From giohang Where email = ?";
	db.executeParamsQuery(query, value, function(err, data){
		callback(err, data);
	});
}

