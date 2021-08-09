var db = require('./manageDB');

exports.findOne = function (value, page, callback) {
	var query = `SELECT DISTINCT * 
				from (sanpham sp join loaisanpham lsp on sp.loaisanpham = lsp.maloai) 
					join nhasanxuat nsx on nsx.ma_nsx = sp.nhasanxuat
				where sp.tensanpham like '%${value}%' or 
					  lsp.tenloai like '%${value}%' or 
					  nsx.ten_nsx like '%${value}%' 
				limit ${(page-1)*24}, 24`;
	db.executeQuery(query, function(err, data){
		callback(err, data);
	});
}
