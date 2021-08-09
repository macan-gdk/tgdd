var db = require('./manageDB');

exports.findAll = function (callback) {
    db.executeQuery("select * from taikhoan", function (err, data){
        callback(err, data);
    });
}

exports.create = function (value ,callback) {
	var query = "INSERT INTO taikhoan SET ?";
	db.executeParamsQuery(query, value, function (err, data){
        callback(err, data);
    });
}

exports.delete = function (value, callback) {
	var query = "Delete From taikhoan Where id = ?";
	db.executeParamsQuery(query, value, function(err, data){
		callback(err, data);
	});
}

exports.update = function (value, callback) {
	var query = "Update taikhoan Set email=?, password=?, firstname=?, lastname=?, address=?, phone=?, role=?, status=?, createat=? Where id = ?";
	db.executeParamsQuery(query, [value.email, value.password, value.firstname, value.lastname, value.address, value.phone, value.role, value.status, value.createat, value.id], function(err, data){
		callback(err, data);
	});
}

exports.findOne = function (value, callback) {
	var query = "Select* From taikhoan Where id = ?";
	db.executeParamsQuery(query, value, function(err, data){
		callback(err, data);
	});
}

exports.findOneByEmail = function (email, callback) {
	var query = `Select * From taikhoan Where email = '${email}'`;;
	db.executeParamsQuery(query, function(err, data){
		callback(err, data);
	});
}

