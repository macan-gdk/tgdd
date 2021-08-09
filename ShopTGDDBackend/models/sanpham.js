var db = require('./manageDB');
var moment = require('moment');

exports.findAll = function (callback) {
    db.executeQuery("select * from sanpham", function (err, data){
        callback(err, data);
    });
}

exports.create = function (value ,callback) {
	var query = "INSERT INTO sanpham SET ?";
	value.ngaynhap = moment().format("YYYY-MM-DD");
	db.executeParamsQuery(query, value, 
		function (err, data) {
        	callback(err, data);
        }
    );
}

exports.delete = function (value, callback) {
	var query = "Delete From sanpham Where masanpham = ?";
	db.executeParamsQuery(query, value, function(err, data){
		callback(err, data);
	});
}

exports.update = function (value, callback) {
	var query = "Update sanpham Set tensanpham=?, gia=?, soluong=?, luotxem=?, daban=?, hinhanh=?, loaisanpham=?, nhasanxuat=? Where masanpham = ?";
	console.log(value);
	db.executeParamsQuery(query, [value.tensanpham, value.gia, value.soluong, value.luotxem, value.daban, value.hinhanh, value.loaisanpham, value.nhasanxuat, value.masanpham], function(err, data){
		callback(err, data);
	});
}

exports.findOne = function (value, callback) {
	var query = "Select* From sanpham Where masanpham = ?";
	db.executeParamsQuery(query, value, function(err, data){
		callback(err, data);
	});
}

exports.top12 = (callback) => {
	var query = 'select * from sanpham ORDER BY daban desc limit 12';
	db.executeQuery(query, (err, data) => {
		callback(err, data);
	});
}

exports.top12ByID = (id, callback) => {
	var query = `select * from sanpham where loaisanpham = ${id} ORDER BY daban desc limit 12`;
	db.executeQuery(query, (err, data) => {
		callback(err, data);
	});
}

exports.top12view = (callback) => {
	var query = 'select * from sanpham ORDER BY luotxem desc limit 12';
	db.executeQuery(query, (err, data) => {
		callback(err, data);
	});
}

exports.findByCat = (maloai, page, callback) => {
	var query;
	if (page == 0) {
		query = `select count(*) as total from sanpham where loaisanpham = ${maloai}`;
	}
	else {
		query = `select * from sanpham where loaisanpham = ${maloai} limit ${(page-1)*20}, 20`;
	}
	db.executeQuery(query, (err, data) => {
		callback(err, data);
	});
}

exports.upView = (masanpham, callback) => {
	var query = "update sanpham set luotxem = luotxem + 1 where masanpham = " + masanpham;
	db.executeQuery(query, (err, data) => {
		callback(err, data);
	});
}

exports.updateSoLuong = function (soluong, masanpham, callback) {
	var query = "Update sanpham Set soluong = soluong - " + soluong + ", daban = daban + " + soluong + " where masanpham = " + masanpham;
	console.log(query);
	db.executeQuery(query, function(err, data){
		callback(err, data);
	});
}