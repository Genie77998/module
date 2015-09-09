;(function(f) {
    if (typeof exports === "object" && typeof module !== "undefined") {
        module.exports = f();
    } else if (typeof define === "function" && (define.amd || define.cmd )) {
        define([], f);
    } else {
        var g;
        if (typeof window !== "undefined") {
            g = window;
        } else if (typeof global !== "undefined") {
            g = global;
        } else if (typeof self !== "undefined") {
            g = self;
        } else {
            g = this;
        }
        g.wwj = f();
    }
})(function() {
    var win = window,
        doc = document;
    return {
        flag: {
            emailReg: /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)/,
            phoreg: /^(130|131|132|133|134|135|136|137|138|139|147|150|151|152|153|155|156|157|158|159|177|180|181|182|183|185|186|187|188|189)\d{8}$/g,
            telphone: /^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/g
        },
        getID: function(id) { //id选择器
            return (typeof id) === 'string' ? doc.getElementById(id) : id;
        },
        getStyle: function(obj, attr) { //获取元素的css属性值
            return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj, null)[attr];
        },
        getByClass: function(a, b) { //class选择器
            var c = a.getElementsByTagName("*");
            var d = [];
            for (var i = 0; i < c.length; i++) {
                if (c[i].className == b) {
                    d.push(c[i]);
                }
            }
            return d;
        },
        appendStyle: function(cssText) { //动态样式
            var style = doc.createElement('style');
            style.type = "text/css";
            if (style.styleSheet) {
                style.styleSheet.cssText = cssText;
            } else {
                style.innerHTML = cssText;
            }
            doc.getElementsByTagName("head")[0].appendChild(style);
            return this;
        },
        loadStyle: function(href) { //动态导入样式
            var _this = this,
                links = doc.getElementsByTagName('link'),
                result = [];
            (function() {
                for (var i = 0; i < links.length; i++) {
                    if (links[i].getAttribute('type') == 'text/css') {
                        result.push(links[i].getAttribute('href'));
                    }
                }
            })();
            if (_this.indexOf(result, href) == -1) {
                var link = doc.createElement('link');
                link.rel = 'stylesheet';
                link.href = href;
                link.type = 'text/css';
                doc.getElementsByTagName("head")[0].appendChild(link);
            }
            return this;
        },
        getScrollTop: function() { //获取滚动条距离顶部的距离
            var scrollPos;
            if (window.pageYOffset) {
                scrollPos = window.pageYOffset;
            } else if (doc.compatMode && doc.compatMode != 'BackCompat') {
                scrollPos = doc.documentElement.scrollTop;
            } else if (doc.body) {
                scrollPos = doc.body.scrollTop;
            }
            return scrollPos;
        },
        hasClass: function(e, c) { //检测元素是否存在class
            var re = new RegExp("(^|\\s)" + c + "(\\s|$)");
            return re.test(e.className);
        },
        addClass: function(e, c) { //给元素添加class
            if (this.hasClass(e, c)) {
                return;
            }
            var newclass = e.className.split(' ');
            newclass.push(c);
            e.className = newclass.join(' ');
            return this;
        },
        removeClass: function(e, c) { //给元素移除class
            if (!this.hasClass(e, c)) {
                return;
            }
            var re = new RegExp("(^|\\s)" + c + "(\\s|$)", 'g');
            e.className = e.className.replace(re, ' ');
            return this;
        },
        winSize: function() { //返回可视窗口的宽高
            var result = {};
            result.width = win.innerWidth;
            result.height = win.innerHeight;
            if (typeof result.width != 'number') {
                if (doc.compatMode == 'CSS1Compat') {
                    result.width = doc.documentElement.clientWidth;
                    result.height = doc.documentElement.clientHeight;
                } else {
                    result.width = doc.body.clientWidth;
                    result.height = doc.body.clientHeight;
                }
            }
            return result;
        },
        isFunction: function(fn) { //检测是否为函数
            return fn && fn.constructor === Function ? !0 : !1;
        },
        isArray: function(arr) { //检测是否为数组
            return arr && arr.constructor == Array ? !0 : !1;
        },
        isNumber: function(number) { //检测是否为数字
            return number && number.constructor == Number ? !0 : !1;
        },
        isString: function(string) { //检测是否为字符串
            return string && string.constructor == String ? !0 : !1;
        },
        isEmptyObject: function(obj) { //检测是否为空对象
            var name;
            for (name in obj) return !1;
            return !0;
        },
        isEmptyVal: function(value) { //是否为空值
            return "" == this.trim(value) ? !0 : !1;
        },
        isChinese: function(name) { //检测是否是中文
            if (0 == name.length) return "";
            for (i = 0; i < name.length; i++)
                if (name.charCodeAt(i) > 128) return !0;
            return !1;
        },
        isEmail: function(value) { //检测是否为邮箱
            return this.flag.emailReg.test(value) ? !0 : !1;
        },
        isPhone: function(value) { //检测是否为手机号码
            return this.flag.phoreg.test(value) ? !0 : !1;
        },
        isTel: function(value) { //检测座机号
            return this.flag.telphone.test(value) ? !0 : !1;
        },
        parseJSON: function(str) { //将字符串的json转换为obj
            return str = str || {}, str.constructor !== String ? str : new Function("return " + str)();
        },
        extend: function() { //方法扩展
            var options, name, src, copy, copyIsArray, clone, target = arguments[0] || {},
                i = 1,
                length = arguments.length,
                _this = this,
                deep = false;
            if (typeof target === "boolean") {
                deep = target;
                target = arguments[1] || {};
                i = 2;
            }
            if (typeof target !== "object" && !_this.isFunction(target)) {
                target = {};
            }
            if (length === i) {
                target = this;
                --i;
            }
            for (; i < length; i++) {
                if ((options = arguments[i]) != null) {
                    for (name in options) {
                        src = target[name];
                        copy = options[name];
                        if (target === copy) {
                            continue;
                        }
                        if (deep && copy && (_this.isPlainObject(copy) || (copyIsArray = _this.isArray(copy)))) {
                            if (copyIsArray) {
                                copyIsArray = false;
                                clone = src && _this.isArray(src) ? src : [];
                            } else {
                                clone = src && _this.isPlainObject(src) ? src : {};
                            }
                            target[name] = _this.extend(deep, clone, copy);
                        } else if (copy !== undefined) {
                            target[name] = copy;
                        }
                    }
                }
            }
            return target;
        },
        isPlainObject: function(obj) {
            if (!obj || this.type(obj) !== "object" || obj.nodeType || this.isWindow(obj)) {
                return false;
            }
            try {
                if (obj.constructor && !core_hasOwn.call(obj, "constructor") && !core_hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
                    return false;
                }
            } catch (e) {
                return false;
            }
            var key;
            for (key in obj) {}
            return key === undefined || core_hasOwn.call(obj, key);
        },
        readyEvent: function(fn) { //防止覆盖window.onlaod事件
            if (fn == null) {
                fn = doc;
            }
            var oldonload = win.onload;
            if (typeof win.onload != "function") {
                win.onload = fn;
            } else {
                win.onload = function() {
                    oldonload();
                    fn();
                };
            }
            return this;
        },
        unbindEvent: function(el, eventName, eventHandler, capture) { //事件绑定
            capture = capture === true ? capture : false;
            if (el.removeEventListener) {
                el.removeEventListener(eventName, eventHandler, capture);
            } else if (el.detachEvent) {
                el.detachEvent("on" + eventName, eventHandler);
            } else {
                el["on" + eventName] = null;
            }
            return this;
        },
        bindEvent: function(el, eventName, eventHandler, capture) { //解除事件绑定
            capture = capture === true ? capture : false;
            if (el.addEventListener) {
                el.addEventListener(eventName, eventHandler, capture);
            } else if (el.attachEvent) {
                el.attachEvent("on" + eventName, eventHandler);
            } else {
                el["on" + eventName] = eventHandler;
            }
            return this;
        },
        preventDefault: function(evt) { //阻止默认事件
            if (evt.preventDefault) {
                evt.preventDefault();
            } else {
                evt.returnValue = false;
            }
            return this;
        },
        stopPropagation: function(evt) { //阻止冒泡
            if (evt.stopPropagation) {
                evt.stopPropagation();
            } else {
                evt.cancelBubble = true;
            }
            return this;
        },
        index: function(current) { //获取索引
            for (var i = 0, length = this.length; i < length; i++) {
                if (this[i] == current) {
                    return i;
                }
            }
        },
        objCount: function(a) { //获取对象的属性和方法数量
            var c, b = 0;
            for (c in a) a.hasOwnProperty(c) && b++;
            return b;
        },
        browser: function() { //获取浏览器类型及版本号
            var c, d, e, a = {},
                b = navigator.userAgent.toLowerCase();
            (c = b.match(/msie ([\d.]+)/)) ? a.ie = c[1]: (c = b.match(/firefox\/([\d.]+)/)) ? a.firefox = c[1] : (c = b.match(/chrome\/([\d.]+)/)) ? a.chrome = c[1] : (c = b.match(/opera.([\d.]+)/)) ? a.opera = c[1] : (c = b.match(/version\/([\d.]+).*safari/)) ? a.safari = c[1] : 0;
            for (e in a) d = {
                browser: e,
                version: a[e]
            };
            return d;
        },
        isIE: function() { //判断是否为ie
            var b = this.browser();
            return b.browser === 'ie' ? true : false;
        },
        isIE6: function() { //判断是否为ie6
            var b = this.browser();
            return b.browser === 'ie' && b.version === '6.0' ? true : false;
        },
        rnums: function(value1, value2) {
            if (value1 < value2) {
                return -1;
            } else if (value1 > value2) {
                return 1;
            } else {
                return 0;
            }
        },
        sort: function(arr, re) { //数组排序默认从大到小 传递false倒序
            if (!this.isArray(arr)) {
                return;
            }
            var nweArr = arr.sort(this.rnums);
            re = typeof re != 'undefined' && re === false ? false : true;
            if (re === true) {
                return nweArr;
            } else {
                return nweArr.reverse(nweArr);
            }
        },
        thousands: function(str) { //给数字加上千分位逗号
            var reg = /(?=(?!\b)(\d{3})+$)/g;
            str = this.isNumber(str) ? new String(str) : str;
            return str = str.replace(reg, ",");
        },
        roundNum: function(start, end) { //返回随机数
            var total = end - start + 1;
            return Math.floor(Math.random() * total + start);
        },
        indexOf: function(arr, elem) { //检测元素是否存在
            var i = 0,
                len = arr.length;
            for (; i < len; i++) {
                if (arr[i] === elem) {
                    return i;
                }
            }
            return -1;
        },
        trim: function(value) { //去除所有空格
            return value = value.replace(/\s/g, "");
        },
        leftTrim: function(value) { //去除左边空格
            return value = value.replace(/(^[\\s]*)/g, "");
        },
        rightTrim: function(value) { //去除右边空格
            return value = value.replace(/([\\s]*$)/g, "");
        },
        lrTrim: function(value) { //去除左右空格
            return value = value.replace(/(^\s*)|(\s*$)/g, "");
        },
        ChineseLength: function(string) { //返回字符串的长度
            return string.replace(/[^\x00-\xff]/g, "**").length;
        },
        imgReady: (function() { //快速获取图片尺寸
            var list = [],
                intervalId = null,
                // 用来执行队列
                tick = function() {
                    var i = 0;
                    for (; i < list.length; i++) {
                        list[i].end ? list.splice(i--, 1) : list[i]();
                    };
                    !list.length && stop();
                },
                // 停止所有定时器队列
                stop = function() {
                    clearInterval(intervalId);
                    intervalId = null;
                };
            return function(url, ready, load, error) {
                var onready, width, height, newWidth, newHeight,
                    img = new Image();
                img.src = url;
                // 如果图片被缓存，则直接返回缓存数据
                if (img.complete) {
                    ready.call(img);
                    load && load.call(img);
                    return;
                };
                width = img.width;
                height = img.height;
                // 加载错误后的事件
                img.onerror = function() {
                    error && error.call(img);
                    onready.end = true;
                    img = img.onload = img.onerror = null;
                };
                // 图片尺寸就绪
                onready = function() {
                    newWidth = img.width;
                    newHeight = img.height;
                    if (newWidth !== width || newHeight !== height ||
                        // 如果图片已经在其他地方加载可使用面积检测
                        newWidth * newHeight > 1024
                    ) {
                        ready.call(img);
                        onready.end = true;
                    };
                };
                onready();
                // 完全加载完毕的事件
                img.onload = function() {
                    // onload在定时器时间差范围内可能比onready快
                    // 这里进行检查并保证onready优先执行
                    !onready.end && onready();
                    load && load.call(img);
                    // IE gif动画会循环执行onload，置空onload即可
                    img = img.onload = img.onerror = null;
                };
                // 加入队列中定期执行
                if (!onready.end) {
                    list.push(onready);
                    // 无论何时只允许出现一个定时器，减少浏览器性能损耗
                    if (intervalId === null) intervalId = setInterval(tick, 40);
                };
            };
        })(),
        docPrevd: function(obj) { //解除/阻止默认事件
            var obj = obj || {},
                type = obj.type || 'click',
                ele = obj.ele,
                set = obj.set || 'set';

            function prevd(e) {
                e.preventDefault();
            }
            switch (set) {
                case 'unset':
                    ele.removeEventListener(type, preventDefault, false);
                    break;
                default:
                    ele.addEventListener(type, preventDefault, false);
                    break;
            }
            return this;
        },
        log: function(result) { //控制台打印结果
            try {
                if (window.console && window.console.log) {
                    console.log(result)
                }
            } catch (e) {
                alert(result);
            }
            return this;
        },
        tchange: function(element, fn) { //文本框改变监听
            if (!element) {
                return false;
            }
            if ("\v" == "v") {
                element.onpropertychange = fn;
            } else {
                element.addEventListener("input", fn, false);
            }
            return this;
        }
    }
});
