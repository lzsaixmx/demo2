/*
Navicat MySQL Data Transfer

Source Server         : YXM
Source Server Version : 50558
Source Host           : localhost:3306
Source Database       : hotel_management

Target Server Type    : MYSQL
Target Server Version : 50558
File Encoding         : 65001

Date: 2019-11-30 18:13:07
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for blog
-- ----------------------------
DROP TABLE IF EXISTS `blog`;
CREATE TABLE `blog` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `roomname` varchar(255) CHARACTER SET utf8 NOT NULL,
  `titile` text CHARACTER SET utf8 NOT NULL,
  `date` bigint(20) NOT NULL,
  `username` varchar(255) CHARACTER SET utf8 NOT NULL,
  `imgname` varchar(255) CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of blog
-- ----------------------------
INSERT INTO `blog` VALUES ('1', '豪华双人间', '很漂亮的一家公寓，房间很大，有阳台，很宽敞明亮，设备很新很漂亮，卫生很干净，服务也周到热情，住的很满意,一如既往的住红源，\r\n				下次还要再到这里，只因为这里老板的热情周到，宾馆的整洁干净，价格合理。强烈推荐给大家', '152514785233', 'yxm', '5.jpg');
INSERT INTO `blog` VALUES ('2', '至尊套房', 'Hello, the founder of the hotel is mainly bringing family to China to play. \r\n				For three days, the parents and children are very satisfied. \r\n				The intimate butlers come from time to time to ask what is needed.\r\n				 The hotel environment is not bad. In the evening, I will play with my son on the lawn table,\r\n				  and I will visit you next time.', '1235214785236', 'yxm2', '1.jpg');
INSERT INTO `blog` VALUES ('3', '情侣套房', '这个房间特别好,尤其是隔音效果,一点声音都没有流出,我和女友昨晚玩得那么开心,女友声音那么大,早上去问服务员,服务员说没有听到任何声音,这个房间超棒!!!给个赞!!!', '1574862484698', 'yxm2', '9.jpg');
INSERT INTO `blog` VALUES ('4', '总体套房', '这个房间非常漂亮，我和老板都很喜欢!', '1574863544484', 'yxm2', '2.jpg');
INSERT INTO `blog` VALUES ('5', '简约精品房', 'asgsvszadfsxcsdvs', '1574943322710', 'yxm', '12.jpg');
INSERT INTO `blog` VALUES ('6', '商务办公房', 'sdasxvsDsz', '1574943693776', 'yxm', '7.jpg');
INSERT INTO `blog` VALUES ('7', '简约精品房', 'awjbdjawjdnoiva wjdnvjndiajso newiaeijbwaiojbdvoiawb osnvjsnkcs', '1574945091257', 'yxm', '4.jpg');
INSERT INTO `blog` VALUES ('8', '商务办公房', 'fgnedsfsadwn nofoqanwo nqoownqoanwonqoSN\r\n', '1574946361039', 'yxm', '2.jpg');
INSERT INTO `blog` VALUES ('9', '简约精品房', 'asasvcfssdsa', '1575027201164', 'yxm2', '10.jpg');
INSERT INTO `blog` VALUES ('10', '简约精品房', '第三部第八十ID不via dovnasodnoanodasdoanos   bisbdoaodnoasudv  sddfonsofs', '1575084067888', 'yxm', '3.jpg');

-- ----------------------------
-- Table structure for ctar
-- ----------------------------
DROP TABLE IF EXISTS `ctar`;
CREATE TABLE `ctar` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET utf8 NOT NULL,
  `ctartext` text CHARACTER SET utf8 NOT NULL,
  `ctardate` bigint(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of ctar
-- ----------------------------
INSERT INTO `ctar` VALUES ('1', 'yxm', '你好!', '1574942168487');
INSERT INTO `ctar` VALUES ('2', 'yxm', 'gbsibaisba', '1574942472142');
INSERT INTO `ctar` VALUES ('3', 'yxm', 'sbkjabdks', '1574942476334');
INSERT INTO `ctar` VALUES ('4', 'yxm', '在吗?', '1574942671796');
INSERT INTO `ctar` VALUES ('5', 'yxm', 'sdnksadks', '1574942679396');
INSERT INTO `ctar` VALUES ('6', 'yxm', 'sdvwsdvws', '1574942683218');
INSERT INTO `ctar` VALUES ('7', 'yxm', 'dvwadsw', '1574942685072');
INSERT INTO `ctar` VALUES ('8', 'yxm', 'sdvsds', '1574943650314');
INSERT INTO `ctar` VALUES ('9', 'yxm', '4161656', '1574946305089');
INSERT INTO `ctar` VALUES ('10', 'yxm2', 'sdsada ', '1575028150970');
INSERT INTO `ctar` VALUES ('11', 'yxm', 'nbhkb', '1575028215031');
INSERT INTO `ctar` VALUES ('12', 'yxm2', 'aSCAScac', '1575028228277');
INSERT INTO `ctar` VALUES ('13', 'yxm', '在吗', '1575093514204');

-- ----------------------------
-- Table structure for forum
-- ----------------------------
DROP TABLE IF EXISTS `forum`;
CREATE TABLE `forum` (
  `name` varchar(20) DEFAULT NULL,
  `release` date DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `content` text,
  `imgs` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of forum
-- ----------------------------
INSERT INTO `forum` VALUES ('小博', '2019-11-22', '苍老师', '苍井空，日本女演员、歌手，出生于日本东京。21世纪初，以泳装写真模特身份出道。2002年，与AliceJapan公司签约，成为AV女演员，开始获得人气。2003年开始，连续两年获得日本《VideoBoy》杂志年度性感女艺人第一名。2004年11月，移籍到S1，转型为杂志模特、电影演员。', '002.jpg');
INSERT INTO `forum` VALUES ('小小博', '2019-11-22', '郑和惠子', '郑合惠子，1994年9月16日出生于福建省福州市，中国内地影视女演员。\r\n\r\n2013年，高中毕业的郑合惠子考入了北京现代音乐学院播音主持系。2015年，郑合惠子加入万合天宜并正式开始演艺生涯[1]；同年，郑合惠子因出演古装喜剧《名侦探狄仁杰》而获得颇高人气[2]。2016年，郑合惠子主演了奇幻剧《奇星记之鲜衣怒马少年时》。2017年，搭档白客领衔主演青春校园励志剧《鲜肉老师》[3]；同年，她凭借青春剧《夏至未至》获得更多关注[4]', '001.jpeg');

-- ----------------------------
-- Table structure for room
-- ----------------------------
DROP TABLE IF EXISTS `room`;
CREATE TABLE `room` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `check_date` varchar(255) CHARACTER SET utf8 NOT NULL,
  `leave_date` varchar(255) CHARACTER SET utf8 NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 NOT NULL,
  `phone` varchar(255) CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of room
-- ----------------------------
INSERT INTO `room` VALUES ('1', '2019-11-05', '2019-11-05', 'æ¨ä¿®æ°', '12345678912');
INSERT INTO `room` VALUES ('2', '2019-11-05', '2019-11-05', 'æ¨ä¿®æ°', '12345678912');
INSERT INTO `room` VALUES ('3', '2019-11-30T06:20', '2019-12-10T18:30', 'çèè£è', '12345678912');
INSERT INTO `room` VALUES ('4', '2019-11-30T09:50', '2019-12-19T10:10', 'çèè£è', '12345678912');
INSERT INTO `room` VALUES ('5', '2019-12-05T01:02', '2019-12-27T17:30', 'asdf', '12345678912');
INSERT INTO `room` VALUES ('6', '2019-12-11T05:20', '2019-12-13T14:50', 'çèè£è', '12345678912');
INSERT INTO `room` VALUES ('7', '2019-11-30T00:50', '2019-11-30T20:50', 'yxm001', '12345678912');
INSERT INTO `room` VALUES ('8', '2019-12-09T02:04', '2019-12-12T08:05', 'yxm001', '12345678912');
INSERT INTO `room` VALUES ('9', '2019-12-03T01:05', '2019-12-05T09:50', 'yxm001', '12345678912');
INSERT INTO `room` VALUES ('10', '2019-12-09T05:07', '2019-12-03T15:50', 'yxm001', '12345678912');
INSERT INTO `room` VALUES ('11', '2019-12-02T08:05', '2019-12-07T05:03', 'yxm001', '12345678912');

-- ----------------------------
-- Table structure for userinfo
-- ----------------------------
DROP TABLE IF EXISTS `userinfo`;
CREATE TABLE `userinfo` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '客户编号',
  `userName` varchar(255) NOT NULL COMMENT '用户名',
  `password` varchar(255) NOT NULL COMMENT '密码',
  `name` varchar(255) NOT NULL COMMENT '姓名',
  `card` varchar(255) NOT NULL COMMENT '身份证',
  `birth` varchar(255) NOT NULL COMMENT '出生日期',
  `site` varchar(255) NOT NULL COMMENT '地址',
  `phone` varchar(255) NOT NULL COMMENT '电话',
  `push` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of userinfo
-- ----------------------------
INSERT INTO `userinfo` VALUES ('1', 'yxm', '4759', '杨修民', '360428123456789258', '2000-05-01', '东莞', '13713251492', '1');
INSERT INTO `userinfo` VALUES ('2', 'yxm2', '123456', 'yxm2', '131651165165', '2000-05-01', '东莞', '12345678912', '1');
INSERT INTO `userinfo` VALUES ('3', 'yxm3', '123456', '王者荣耀', '360428123456789258', '2000-05-01', '东莞', '1315666568', '1');
INSERT INTO `userinfo` VALUES ('4', 'yxm3', '123456', '王者荣耀', '360428123456789258', '2000-05-01', '东莞', '1315666568', '1');
INSERT INTO `userinfo` VALUES ('5', 'yxm4', '123456789', '王者荣耀', '360428123456789258', '2010-06-15', '东莞', '1315666568', '1');
INSERT INTO `userinfo` VALUES ('6', 'yxm', '123', 'yxm001', '360428123456789258', '2019-11-05', '东莞', '13713251492', '1');
INSERT INTO `userinfo` VALUES ('7', 'yxm', '123', '王者荣耀', '360428123456789258', '2019-11-08', '东莞', '13713251492', '1');
