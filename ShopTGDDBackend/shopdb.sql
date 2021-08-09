

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for comment
-- ----------------------------
DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment` (
  `id_comment` int(11) NOT NULL AUTO_INCREMENT,
  `id_product` int(255) DEFAULT NULL,
  `email_user` varchar(255) DEFAULT NULL,
  `content` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `time` datetime DEFAULT NULL,
  PRIMARY KEY (`id_comment`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of comment
-- ----------------------------
INSERT INTO `comment` VALUES ('1', '1', 'macan28996@gmail.com', 'Sản phẩm giá rẻ, chất lượng tốt', '2020-05-28 15:18:34');

-- ----------------------------
-- Table structure for ctdonhang
-- ----------------------------
DROP TABLE IF EXISTS `ctdonhang`;
CREATE TABLE `ctdonhang` (
  `madonhang` int(11) unsigned NOT NULL,
  `masanpham` int(11) unsigned NOT NULL,
  `dongia` float(255,0) DEFAULT NULL,
  `soluong` int(11) DEFAULT NULL,
  PRIMARY KEY (`madonhang`,`masanpham`),
  KEY `ctdonhang_sanpham` (`masanpham`),
  CONSTRAINT `ctdonhang_donhang` FOREIGN KEY (`madonhang`) REFERENCES `donhang` (`madonhang`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `ctdonhang_sanpham` FOREIGN KEY (`masanpham`) REFERENCES `sanpham` (`masanpham`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of ctdonhang
-- ----------------------------
INSERT INTO `ctdonhang` VALUES ('1', '1', '10000000', '1');

-- ----------------------------
-- Table structure for donhang
-- ----------------------------
DROP TABLE IF EXISTS `donhang`;
CREATE TABLE `donhang` (
  `madonhang` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `ngaydat` datetime DEFAULT NULL,
  `diachigiaohang` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `sdt` varchar(15) COLLATE utf8_unicode_ci NOT NULL,
  `ngaygiaodukien` date DEFAULT NULL,
  `ngaygiaothucte` datetime DEFAULT NULL,
  `tongtien` float(255,0) DEFAULT NULL,
  `tinhtrang` int(1) unsigned DEFAULT '0',
  PRIMARY KEY (`madonhang`),
  KEY `donhang_user` (`email`),
  CONSTRAINT `donhang_user` FOREIGN KEY (`email`) REFERENCES `taikhoan` (`email`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of donhang
-- ----------------------------
INSERT INTO `donhang` VALUES ('1', 'macan28996@gmail.com', '2020-05-14 00:00:00', '55 Giải phóng, Hà Nội', '0961588796', '2020-05-20', '2020-05-25 00:00:00', '1000000', '0');

-- ----------------------------
-- Table structure for giohang
-- ----------------------------
DROP TABLE IF EXISTS `giohang`;
CREATE TABLE `giohang` (
  `email` varchar(255) CHARACTER SET utf8 NOT NULL,
  `masp` int(255) NOT NULL,
  `gia` int(255) DEFAULT NULL,
  `soluong` int(255) DEFAULT NULL,
  PRIMARY KEY (`masp`,`email`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of giohang
-- ----------------------------
INSERT INTO `giohang` VALUES ('macan28996@gmail.com', '1', '10000000', '69');

-- ----------------------------
-- Table structure for loaisanpham
-- ----------------------------
DROP TABLE IF EXISTS `loaisanpham`;
CREATE TABLE `loaisanpham` (
  `maloai` int(11) NOT NULL AUTO_INCREMENT,
  `tenloai` varchar(255) CHARACTER SET utf8 DEFAULT '',
  PRIMARY KEY (`maloai`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of loaisanpham
-- ----------------------------
INSERT INTO `loaisanpham` VALUES ('1', 'Điện thoại');
INSERT INTO `loaisanpham` VALUES ('2', 'Laptop');
INSERT INTO `loaisanpham` VALUES ('3', 'Phụ kiện');
INSERT INTO `loaisanpham` VALUES ('4', 'Đồng hồ');
INSERT INTO `loaisanpham` VALUES ('5', 'Tablet');

-- ----------------------------
-- Table structure for nhasanxuat
-- ----------------------------
DROP TABLE IF EXISTS `nhasanxuat`;
CREATE TABLE `nhasanxuat` (
  `ma_nsx` int(11) NOT NULL AUTO_INCREMENT,
  `ten_nsx` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`ma_nsx`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of nhasanxuat
-- ----------------------------
INSERT INTO `nhasanxuat` VALUES ('1', 'Iphone');
INSERT INTO `nhasanxuat` VALUES ('2', 'Sam Sung');
INSERT INTO `nhasanxuat` VALUES ('3', 'Oppo');
INSERT INTO `nhasanxuat` VALUES ('4', 'Foxconn');
INSERT INTO `nhasanxuat` VALUES ('5', 'Huawei');
INSERT INTO `nhasanxuat` VALUES ('6', 'Đồng hồ thời trang');
INSERT INTO `nhasanxuat` VALUES ('7', 'Đồng hồ thông minh');
INSERT INTO `nhasanxuat` VALUES ('8', 'Asus');
INSERT INTO `nhasanxuat` VALUES ('9', 'Dell');
INSERT INTO `nhasanxuat` VALUES ('10', 'Lenovo');

-- ----------------------------
-- Table structure for sanpham
-- ----------------------------
DROP TABLE IF EXISTS `sanpham`;
CREATE TABLE `sanpham` (
  `masanpham` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `tensanpham` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `gia` float(255,0) DEFAULT NULL,
  `soluong` int(255) DEFAULT NULL,
  `luotxem` int(255) unsigned DEFAULT '0',
  `daban` int(11) unsigned DEFAULT '0',
  `hinhanh` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `ngaynhap` date DEFAULT NULL,
  `loaisanpham` int(11) DEFAULT NULL,
  `nhasanxuat` int(11) DEFAULT NULL,
  PRIMARY KEY (`masanpham`)
) ENGINE=InnoDB AUTO_INCREMENT=144 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of sanpham
-- ----------------------------
INSERT INTO `sanpham` VALUES ('1', 'Iphone 11 64GB', '21690000', '50', '0', '0', 'https://cdn.tgdd.vn/Products/Images/42/153856/iphone-11-red-2-400x460-400x460.png', '2020-05-12', '1', '1');
INSERT INTO `sanpham` VALUES ('2', 'Iphone 11 Pro Max 512GB', '41990000', '60', '0', '0', 'https://cdn.tgdd.vn/Products/Images/42/210654/iphone-11-pro-max-512gb-gold-400x460.png', '2020-05-12', '1', '1');
INSERT INTO `sanpham` VALUES ('3', 'Iphone 11 Pro Max 256GB', '34000000', '80', '0', '0', 'https://cdn.tgdd.vn/Products/Images/42/210653/iphone-11-pro-max-256gb-black-400x460.png', '2020-05-12', '1', '1');
INSERT INTO `sanpham` VALUES ('4', 'Iphone 11 Pro 256GB', '30000000', '12', '0', '0', 'https://cdn.tgdd.vn/Products/Images/42/188705/iphone-11-pro-black-400x460.png', '2020-05-12', '1', '1');
INSERT INTO `sanpham` VALUES ('5', 'Iphone Xs 256GB', '29000000', '45', '0', '0', 'https://cdn.tgdd.vn/Products/Images/42/190322/iphone-xs-max-256gb-white-400x460.png', '2020-05-12', '1', '1');
INSERT INTO `sanpham` VALUES ('6', 'Iphone Xs 64GB', '20000000', '45', '0', '0', 'https://cdn.tgdd.vn/Products/Images/42/190322/iphone-xs-max-256gb-white-400x460.png', '2020-05-12', '1', '1');
INSERT INTO `sanpham` VALUES ('7', 'Iphone 8 Plus 256GB', '15000000', '78', '0', '0', 'https://cdn.tgdd.vn/Products/Images/42/114110/iphone-8-plus-1-400x460.png', '2020-05-12', '1', '1');
INSERT INTO `sanpham` VALUES ('8', 'Iphone X 128GB', '19000000', '98', '0', '0', 'https://cdn.tgdd.vn/Products/Images/42/78124/iphone-7-plus-gold-400x460-400x460.png', '2020-05-12', '1', '1');
INSERT INTO `sanpham` VALUES ('9', 'Iphone 7 32GB', '9000000', '65', '0', '0', 'https://cdn.tgdd.vn/Products/Images/42/78124/iphone-7-plus-gold-400x460-400x460.png', '2020-05-12', '1', '1');
INSERT INTO `sanpham` VALUES ('10', 'Iphone 12 512GB', '82000000', '12', '0', '0', 'https://cdn.tgdd.vn/Products/Images/42/210654/iphone-11-pro-max-512gb-gold-400x460.png', '2020-05-12', '1', '1');
INSERT INTO `sanpham` VALUES ('11', 'Samsung Galaxy S10 Lite', '12000000', '45', '0', '0', 'https://cdn.tgdd.vn/Products/Images/42/194251/samsung-galaxy-s10-lite-blue-chi-tiet-400x460.png', '2020-05-12', '1', '2');
INSERT INTO `sanpham` VALUES ('12', 'Samsung Galaxy S20', '20000000', '74', '0', '0', 'https://cdn.tgdd.vn/Products/Images/42/217935/samsung-galaxy-s20-400x460-hong-400x460.png', '2020-05-12', '1', '2');
INSERT INTO `sanpham` VALUES ('13', 'MacBook Air 2017 i5 1.8GHz/8GB/128GB (MQD32SA/A)', '25000000', '69', '0', '0', 'https://cdn.tgdd.vn/Products/Images/44/106875/apple-macbook-air-mqd32sa-a-i5-5350u-600x600.jpg', '2020-05-12', '2', '1');
INSERT INTO `sanpham` VALUES ('14', 'Asus VivoBook A412FA i3 8145U/4GB/512GB/Win10 ', '15000000', '63', '0', '0', 'https://cdn.tgdd.vn/Products/Images/44/203670/asus-vivobook-s412f-i3-8145u-4gb-512gb-ek342t3-1-1-600x600.jpg', '2020-05-12', '2', '8');
INSERT INTO `sanpham` VALUES ('15', 'Lenovo IdeaPad S340 14IIL i3 1005G1/8GB/512GB/Win10', '16000000', '25', '0', '0', 'https://cdn.tgdd.vn/Products/Images/44/214710/lenovo-ideapad-s340-14iil-i3-1005g1-8gb-512gb-win1-18-600x600.jpg', '2020-05-12', '2', '10');
INSERT INTO `sanpham` VALUES ('16', 'Dell Vostro 3590 i7 10510U/8GB/256GB/2GB 610R5/Win10', '16500000', '12', '0', '0', 'https://cdn.tgdd.vn/Products/Images/44/220718/dell-vostro-3590-i7-grmgk2-220718-600x600.jpg', '2020-05-12', '2', '9');
INSERT INTO `sanpham` VALUES ('17', 'Asus VivoBook X409JA i3 1005G1/4GB/512GB/Win10', '18000000', '15', '0', '0', 'https://cdn.tgdd.vn/Products/Images/44/220526/asus-x409ja-i3-ek015t-220526-1-600x600.jpg', '2020-05-12', '2', '8');
INSERT INTO `sanpham` VALUES ('18', 'Tai nghe Gaming Rapoo VH500 7.1 Đen', '250000', '18', '0', '0', 'https://cdn.tgdd.vn/Products/Images/54/219433/tai-nghe-gaming-rapoo-vh500-71-den-600x600.jpg', '2020-05-12', '3', '4');
INSERT INTO `sanpham` VALUES ('19', 'Cáp Type C- Lightning 1m Apple MX0K2 Trắng', '250000', '87', '0', '0', 'https://cdn.tgdd.vn/Products/Images/58/220088/cap-type-c-lightning-1m-apple-mx0k2-trang-ava-600x600.jpg', '2020-05-12', '3', '4');
INSERT INTO `sanpham` VALUES ('20', 'Cáp Type C - Lightning MFI 2m Mbest DS948-WB Xanh Rêu', '250000', '89', '0', '0', 'https://cdn.tgdd.vn/Products/Images/58/219146/cap-type-c-lightning-mfi-2m-mbest-ds948-wb-xanh-add-1-600x600-1-600x600.jpg', '2020-05-12', '3', '4');
INSERT INTO `sanpham` VALUES ('21', 'Bộ Adapter sạc kèm cáp Type C - Type C PD 25W Samsung EP-TA8000 Trắng', '250000', '58', '0', '0', 'https://cdn.tgdd.vn/Products/Images/58/218866/adapter-kem-cap-type-c-pd-25w-samsung-ep-ta8000-ava-600x600.jpg', '2020-05-12', '3', '4');
INSERT INTO `sanpham` VALUES ('22', 'Ốp lưng iPhone 7/8+ Nhựa dẻo BECKMAN JM TPU Đen', '250000', '68', '0', '0', 'https://cdn.tgdd.vn/Products/Images/60/221588/op-lung-iphone-7-8-plus-deo-beckman-jm-tpu-den-1-600x600.jpg', '2020-05-12', '3', '4');
INSERT INTO `sanpham` VALUES ('23', 'Ốp lưng iPhone 7/8+ nhựa dẻo Fiber PU Case COSANO Đen', '250000', '95', '0', '0', 'https://cdn.tgdd.vn/Products/Images/60/218636/op-lung-iphone-7-8-nhua-deo-fiber-pu-case-cosano-1-600x600.jpg', '2020-05-12', '3', '4');

-- ----------------------------
-- Table structure for taikhoan
-- ----------------------------
DROP TABLE IF EXISTS `taikhoan`;
CREATE TABLE `taikhoan` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `firstname` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `lastname` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `address` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `phone` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `role` int(1) unsigned DEFAULT '0',
  `status` int(1) unsigned DEFAULT '1',
  `createat` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `emailunique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of taikhoan
-- ----------------------------
INSERT INTO `taikhoan` VALUES ('1', 'admin@gmail.com', '123456', 'Admin', null, 'Admin Shop', '0961588797', '1', '1', '2020-05-14 11:02:42');
INSERT INTO `taikhoan` VALUES ('2', 'macan28996@gmail.com', '123456', 'Can', 'MT', '55 Giải phóng', '0961588796', '1', '1', '2020-05-14 16:35:44');
