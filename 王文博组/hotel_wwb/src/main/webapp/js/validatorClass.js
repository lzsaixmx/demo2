/**
 * des   : 各种验证方法
 * author: YanxiSir
 * date  : 16/7/26
 */
define(function () {
    var validatorClass = function () {

        this.validType = {
            notEmpty: null,
            email: /^\w+((-\w+)|(\.\w+))*\@{1}\w+((-\w+)|(\.\w+))*\.{1}\w{2,4}(\.{0,1}\w{2,4}){0,4}$/,
            // 字符串
            textRange: 20, // 校验字符长度，validator.valid(txtInput.value, "textRange", 5, 20);
            loginName: /[^@]+@{1}[^@\.]+\.+[^@]+|[0-9a-zA-Z\u4e00-\u9fa5]*/,
            passengerName: /^[a-zA-Z]{1,20}\/[a-zA-Z]{1,20}((| )[a-zA-Z]{1,20}){0,20}$/,  // 乘机人姓名Luo/zhi或者Luoz/asf sdf或者asfd/asd/ad
            nickName: /^([a-zA-Z]|[\u4e00-\u9fa5]|\/| )+$/,   // 联系人姓名不能包含数字与符号
            enString: /^[a-zA-Z]+$/, // 验证是否只包含英文字符
            cnString: /^[\u4e00-\u9fa5]+$/, // 验证是否全部包含中文字符
            nonSpecialSign: /^[^~!@#$%^&*！￥…\s，。]*$/, // 不包含特殊字符
            // 日期
            date: null,  // 判断是否是日期格式yyyy-mm-dd
            dateEn: null, // 判断是否是日期格式mm/dd/yyyy
            dateRange: null,   // 判断是否在日前区间内，validator.valid(txtInput.value, "dateRange", "2001-1-1", "2009-1-1");
                               //文件名
            fileName: /^[a-z]:(\\[^\\\/:\*\?"><|]+)*\\?$/i,
            directoryName: /^[a-z]:(\\[^\\\/:\*\?"><|]+)+$/i,
            picFileName: /\.(jpg)|(jpeg)|(png)|(gif)$/i,
            attachFileName: /\.(doc)|(xls)|(txt)|(zip)|(rar)$/i,
            enName: /^[a-zA-Z\s]+$/, // 验证是否只包含英文字符和空格
            // 数字
            number: /^\d+$/,  // 数字
            zipCode: /^\d{6}$/, // 邮编
            idCard: null,    // 验证身份证有效性
            year: /^[1-2][0-9]{3}$/, // 年代
            integer: /^-?[0-9]{1,9}$/, // 整数
            real: /^-?[0-9]{1,28}(\.[0-9]*)?$/,
            phone: /^\d{3,4}-\d{7,8}((\s|;)+\d{3,4}-\d{7,8})*$/,
            mobile: /^1[0-9]{10}$|^86[0-9]{11}$|852[0-9]{8}$|853[0-9]{8}$|886[0-9]{9}$/, ////以13|15|18开头的11数字 新增加支持港澳台区号
            money: /^[0-9]{1,11}(\.[0-9]{1,2})?$/,  //钱
            password: null
        };

        this.valid = function (value, validType, params) {
            if (arguments.length < 2) {
                alert("validator.valid()缺少参数..");
            }

            var result = true;

            var arrValidateType = $.trim(validType).split("&");
            for (var i = 0; i < arrValidateType.length; i++) {
                if (!result) return false;

                var type = $.trim(arrValidateType[i]);
                switch (type) {
                    case "notEmpty":
                        result = !(value==null||value=="");
                        break;
                    case "textRange":
                        if (arguments.length < 4) {
                            return false;
                        }
                        result = this.validateTextLength(value, arguments[2], arguments[3]);
                        break;
                    case "idCard":
                        result = this.validateIDCard(value);
                        break;
                    case "date":
                        result = this.validateDate(value);
                        break;
                    case "dateEn":
                        result = this.validateDate(this.reFormatDateString(value));
                        break;
                    case "dateRange":
                        if (arguments.length < 4 && !this.validateDate(value)) {
                            return false;
                        }
                        result = this.validateDateRange(value, arguments[2], arguments[3]);
                        break;
                    case "password":
                        if (value.indexOf("<") != -1 || value.indexOf(">") != -1) {
                            return false;
                        }
                        result = this.validateTextLength(value, arguments[2], arguments[3]);
                        break;
                    default:
                        result = this.regularValidate(value, this.validType[type]);
                        break;
                }
            }

            return result;
        };
        this.validateIDCard =  function (sNo) {
            sNo = sNo.toString()
            if (sNo.length == 18) {
                var a, b, c
                if (!this.valid(sNo.substr(0, 17), "number")) { return false }
                a = parseInt(sNo.substr(0, 1)) * 7 + parseInt(sNo.substr(1, 1)) * 9 + parseInt(sNo.substr(2, 1)) * 10;
                a = a + parseInt(sNo.substr(3, 1)) * 5 + parseInt(sNo.substr(4, 1)) * 8 + parseInt(sNo.substr(5, 1)) * 4;
                a = a + parseInt(sNo.substr(6, 1)) * 2 + parseInt(sNo.substr(7, 1)) * 1 + parseInt(sNo.substr(8, 1)) * 6;
                a = a + parseInt(sNo.substr(9, 1)) * 3 + parseInt(sNo.substr(10, 1)) * 7 + parseInt(sNo.substr(11, 1)) * 9;
                a = a + parseInt(sNo.substr(12, 1)) * 10 + parseInt(sNo.substr(13, 1)) * 5 + parseInt(sNo.substr(14, 1)) * 8;
                a = a + parseInt(sNo.substr(15, 1)) * 4 + parseInt(sNo.substr(16, 1)) * 2;
                b = a % 11;
                if (b == 2) {
                    c = sNo.substr(17, 1).toUpperCase();
                }
                else {
                    c = parseInt(sNo.substr(17, 1));
                }

                switch (b) {
                    case 0: if (c != 1) { return false; } break;
                    case 1: if (c != 0) { return false; } break;
                    case 2: if (c != "X") { return false; } break;
                    case 3: if (c != 9) { return false; } break;
                    case 4: if (c != 8) { return false; } break;
                    case 5: if (c != 7) { return false; } break;
                    case 6: if (c != 6) { return false; } break;
                    case 7: if (c != 5) { return false; } break;
                    case 8: if (c != 4) { return false; } break;
                    case 9: if (c != 3) { return false; } break;
                    case 10: if (c != 2) { return false }
                }
            }
            else {
                if (!this.valid(sNo, "number")) { return false }
            }

            switch (sNo.length) {
                case 15:
                    var date = "19" + sNo.substr(6, 2) + "-" + sNo.substr(8, 2) + "-" + sNo.substr(10, 2);
                    return this.valid(date, "date");
                case 18:
                    var str = sNo.substr(6, 4) + "-" + sNo.substr(10, 2) + "-" + sNo.substr(12, 2);
                    return this.valid(str, "date");
            }
            return false
        };
        this.validateTextLength = function (value, minLen, maxLen) {
            var len = $.trim(value).length;
            if (minLen == null) {
                minLen = 0;
            }
            if (maxLen == null) {
                maxLen = 9999999;
            }

            return (len >= minLen) && (len <= maxLen);
        };
        this.validateDateRange = function (value, minDate, maxDate) {
            if (minDate == null) {
                minDate = "0001-01-01";
            }
            if (maxDate == null) {
                maxDate = "9999-12-31";
            }

            return this.reFormatDateString(value) >= this.reFormatDateString(minDate) &&
                this.reFormatDateString(value) <= this.reFormatDateString(maxDate);
        };

        this.regularValidate = function (value, reg) {
            reg.lastIndex = -1;
            if (value.length > 0) {
                return reg.test(value);
            }

            return true;
        };

        /*验证为正确的日期格式*/
        this.validateDate = function (value) {
            if (!this.regularValidate(value, /^\d{4}-\d{1,2}-\d{1,2}$/)) {
                return false;
            }

            var iaMonthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
            var iaDate = new Array(3)
            var year, month, day

            var result = true;
            var strValue = value;
            if (strValue.length != 0) {
                iaDate = strValue.split("-")
                if (iaDate.length != 3 || iaDate[1].length > 2 || iaDate[2].length > 2 || iaDate[1].length < 1 || iaDate[2].length < 1) {
                    result = false;
                }

                year = parseInt(iaDate[0], 10);
                month = parseInt(iaDate[1], 10);
                day = parseInt(iaDate[2], 10);

                if (isNaN(year) || isNaN(month) || isNaN(day)) {
                    result = false;
                }

                if (year < 1900 || year > 2100) {
                    result = false;
                }

                if (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)) iaMonthDays[1] = 29;
                if (month < 1 || month > 12 || day < 1 || day > iaMonthDays[month - 1]) {
                    result = false;
                }
            }
            else
                result = false;


            return result;
        };

        /*把日期字符串格式化成 yyyy-mm-dd格式 ，便于比较大小*/
        this.reFormatDateString = function (dateStr) {
            var dateArray = new Array(3);
            var year, month, day;

            if (dateStr.length == 0)
                return '';


            if (dateStr.indexOf("-") > -1) {
                dateArray = dateStr.split("-");
                if (dateArray.length != 3) {
                    return "";
                }
                year = dateArray[0];
                month = dateArray[1];
                day = dateArray[2];
            }
            else {
                dateArray = dateStr.split("/");
                if (dateArray.length != 3) {
                    return "";
                }
                year = dateArray[2];
                month = dateArray[0];
                day = dateArray[1];
            }

            if (year.length <= 2) year = '19' + year;
            if (month.length == 1) month = '0' + month;
            if (day.length == 1) day = '0' + day;
            return year + '-' + month + '-' + day;
        };

        /*把日期yyyy-mm-dd字符串格式化成 mm/dd/yyyy格式*/
        this.reFormatDateStringEn = function (dateStr) {
            var dateArray = new Array(3);
            var year, month, day;

            if (dateStr.length == 0)
                return "";

            if (dateStr.indexOf("-") > -1) {
                dateArray = dateStr.split("-");
                if (dateArray.length != 3) {
                    return "";
                }
                year = dateArray[0];
                month = dateArray[1];
                day = dateArray[2];


            }

            if (year.length <= 2) year = '20' + year;
            if (month.length == 1) month = '0' + month;
            if (day.length == 1) day = '0' + day;
            return month + "/" + day + "/" + year;
        };

        // 获得当前日期，用于比较
        this.getTodayString = function () {
            var d = new Date();
            return this.getDateString(d);
        };

        this.getDateString = function (dateObj) {
            var month = dateObj.getMonth() + 1;
            var day = dateObj.getDate();
            var monthStr = month > 9 ? month.toString() : '0' + month.toString();
            var dayStr = day > 9 ? day.toString() : '0' + day.toString();
            var result = dateObj.getFullYear().toString() + '-' +
                monthStr + '-' + dayStr;
            return result;
        };
        // 传入2009-1-1或1/1/2009转化成Date对象
        this.convertDate = function (dateString) {
            if (dateString.length == 0) return null;
            var str = this.reFormatDateString(dateString);
            var year, month, day;

            if (str.indexOf("-") > -1) {
                var dateArray = str.split("-");
                if (dateArray.length != 3) {
                    return null;
                }
                year = dateArray[0];
                month = dateArray[1];
                day = dateArray[2];
            }
            return new Date(year, parseInt(month, 10) - 1, day);
        };

        /*把日期字符串格式化成 yyyy-mm-dd HH:MM:ss格式 ，便于比较大小*/
        this.reFormatDateTimeString = function (dateStr) {
            var dateArray = new Array(3);
            var timeArray = new Array(3)
            var year, month, day
            var hour = "00", minute = "00", second = "00";
            var date = "";
            var time = "";

            if (dateStr.length == 0)
                return '';

            if (dateStr.indexOf(":") > -1) {
                date = dateStr.substring(0, dateStr.indexOf(" "));
                time = dateStr.substring(dateStr.indexOf(" ") + 1, dateStr.length);
            }
            else {
                date = dateStr;
                time = "";
            }

            if (date.indexOf("-") > -1) {
                dateArray = date.split("-");
                if (dateArray.length != 3) {
                    return "";
                }
                year = dateArray[0];
                month = dateArray[1];
                day = dateArray[2];
            }
            else {
                dateArray = date.split("/");
                if (dateArray.length != 3) {
                    return "";
                }
                year = dateArray[2];
                month = dateArray[0];
                day = dateArray[1];
            }
            if (time.indexOf(":") > -1) {
                timeArray = time.split(":");
                hour = timeArray[0];
                minute = timeArray[1];
                second = timeArray[2];
            }

            if (year.length <= 2) year = '19' + year;
            if (month.length == 1) month = '0' + month;
            if (day.length == 1) day = '0' + day;
            return new Date(year, parseInt(month, 10) - 1, day, hour, minute, second);
        };


        // 传入2009-1-1 10:00:05或1/1/2009 2:00:06转化成Date对象
        this.convertDateTime = function (dateString) {
            if (dateString.length == 0) return null;
            return this.reFormatDateTimeString(dateString);
        }

    };
    return validatorClass;
});