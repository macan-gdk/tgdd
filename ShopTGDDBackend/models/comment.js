var db = require('./manageDB');

exports.create = function (value ,callback) {
	var query = "insert into comment SET ?";
	db.executeParamsQuery(query, value, function (err, data){
        callback(err, data);
    });
}

exports.delete = function (value, callback) {
	var query = "delete from comment where id_comment = ?";
	db.executeParamsQuery(query, value, function(err, data){
		callback(err, data);
	});
}

exports.update = function (value, callback) {
	var query = "update comment set content=?, time=now() Where id_comment = ?";
	db.executeParamsQuery(query, [value.content, value.macomment], function(err, data){
		callback(err, data);
	});
}

exports.findOneLimit5 = function (value, callback) {
	var query = "select * from comment where id_product = ? order by time desc limit 5";
	db.executeParamsQuery(query, value, function(err, data){
		callback(err, data);
	});
}

exports.findOne = (value, callback) => {
	var query = "select * from comment where id_product = ? order by time desc";
	db.executeParamsQuery(query, value, function(err, data){
		callback(err, data);
	});
}

