var db = require('./manageDB');

exports.findAll = function (callback) {
    db.executeQuery("select * from donhang", function (err, data){
        callback(err, data);
    });
}

exports.create = function (value ,callback) {
	var query = "INSERT INTO donhang SET ?";
	db.executeParamsQuery(query, value, function (err, data){
        callback(err, data);
    });
}

exports.delete = function (value, callback) {
	var query = "Delete From donhang Where madonhang = ?";
	db.executeParamsQuery(query, value, function(err, data){
		callback(err, data);
	});
}

exports.update = function (value, callback) {
	var query = "Update donhang Set tinhtrang=? Where madonhang = ?";
	db.executeParamsQuery(query, [value.tinhtrang, value.madonhang], function(err, data){
		callback(err, data);
	});
}

exports.findOne = function (value, callback) {
	var query = "Select* From donhang Where email = ?";
	db.executeParamsQuery(query, value, function(err, data){
		callback(err, data);
	});
}

exports.thongKeNgay = (callback) => {
	var query = `select sum(tongtien) as total, DATE_FORMAT(ngaygiaothucte, "%d-%M-%y") as date 
				 from donhang 
				 where DATEDIFF(now(),ngaygiaothucte) <= 7 and DATEDIFF(now(),ngaygiaothucte) >= 0 
				 group by day(ngaygiaothucte), month(ngaygiaothucte), year(ngaygiaothucte) 
				 order by ngaygiaothucte`;
	db.executeQuery(query, (err, data) => callback(err,data));
}

exports.thongKeThang = (callback) => {
	var query = `select sum(tongtien) as total, DATE_FORMAT(ngaygiaothucte, "%M-%y") as date 
				 from donhang 
				 where year(ngaygiaothucte) = year(now())
				 group by month(ngaygiaothucte), year(ngaygiaothucte)
				 order by ngaygiaothucte`;
	db.executeQuery(query, (err, data) => callback(err,data));
}

exports.thongKeNam = (callback) => {
	var query = `select sum(tongtien) as total, DATE_FORMAT(ngaygiaothucte, "%Y") as date 
				 from donhang 
				 group by year(ngaygiaothucte)
				 order by ngaygiaothucte`;
	db.executeQuery(query, (err, data) => callback(err,data));
}