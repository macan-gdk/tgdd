var db = require('./manageDB');

exports.findAll = function (callback) {
    db.executeQuery("select * from ctdonhang", function (err, data){
        callback(err, data);
    });
}

exports.create = function (value ,callback) {
	var query = "INSERT INTO ctdonhang SET ?";
	db.executeParamsQuery(query, value, function (err, data){
        callback(err, data);
    });
}

exports.delete = function (value, callback) {
	var query = "Delete From ctdonhang Where mactdonhang = ?";
	db.executeParamsQuery(query, value, function(err, data){
		callback(err, data);
	});
}

exports.update = function (value, callback) {
	var query = "Update ctdonhang Set masanpham=?, dongia=?, soluong=? Where mactdonhang = ?";
	db.executeParamsQuery(query, [value.masanpham, value.dongia, value.soluong, value.mactdonhang], function(err, data){
		callback(err, data);
	});
}

exports.findOne = function (value, callback) {
	var query = "Select* From ctdonhang Where madonhang = ?";
	db.executeParamsQuery(query, value, function(err, data){
		callback(err, data);
	});
}

