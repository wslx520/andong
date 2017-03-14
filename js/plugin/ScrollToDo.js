/**
 * @file 添加滚动事件监听。支持上下左右4个方向的滚动事件添加。
 * @author XLee
 * @param {Object} ops。一个对象
 */
(function (factory) {
    if ("function" === typeof define) {
        define(factory);
    }
    else {
        window.ScrollToDo = factory();
    }
})(function () {
    var types = {
        'scrollbottom': 1, 'scrolltop': 1, 'scrollleft': 1, 'scrollright': 1, 'scroll': 1
    };
    function ScrollToDo(ops) {
        var root = this;
        root.scroller = typeof ops.scroller === 'string' ? document.querySelector(ops.scroller) : ops.scroller;
        if (root.scroller.length) {
            root.scroller = root.scroller[0];
        }
        var scroller = root.scroller;
        // var callbackPrefix = '__';
        root.callbacks = {};
        // 支持以下事件监听
        // var events = ['scrollBottom', 'scrollTop', 'scrollLeft', 'scrollRight', 'scroll'];
        root.directionX = root.directionY = 0;
        root.directions = {X: 0, Y: 0};
        root.getDirection = function () {
            var lastScrollTop = scroller.lastScrollTop || 0;
            var lastScrollLeft = scroller.lastScrollLeft || 0;
            // 1为向右，-1为向左
            var X = 0;
            // 1为向下，-1为向上
            var Y = 0;
            if (scroller.scrollTop - lastScrollTop > 0) {
                Y = 1;
            }
            else if (scroller.scrollTop - lastScrollTop < 0) {
                Y = -1;
            }
            if (scroller.scrollLeft - lastScrollLeft > 0) {
                X = 1;
            }
            else if (scroller.scrollLeft - lastScrollLeft < 0) {
                X = -1;
            }
            setTimeout(function () {
                scroller.lastScrollTop = scroller.scrollTop;
                scroller.lastScrollLeft = scroller.scrollLeft;
            }, 0);


            return {
                X: X,
                Y: Y
            };
        };
        scroller.addEventListener('scroll', function () {
            var directions = root.directions = root.getDirection();
            root.directionX = directions.X;
            root.directionY = directions.Y;
            root.scrollTop = scroller.scrollTop;
            root.scrollLeft = scroller.scrollLeft;
            if (root.directionY === -1) {
                root.fire('scrolltop');
            }
            else if (root.directionY === 1) {
                root.fire('scrollbottom');
            }
            if (root.directionX === -1) {
                root.fire('scrollleft');
            }
            else if (root.directionX === 1) {
                root.fire('scrollright');
            }
            root.fire('scroll');
        });
    }
    ScrollToDo.prototype = {
        on: function (eventType, callback) {
            eventType = eventType.toLowerCase();
            if (!types[eventType]) {
                throw new Error('不支持监听此类事件：' + eventType);
            }
            var prefixType = '__' + eventType;
            if (!this.callbacks[prefixType]) {
                this.callbacks[prefixType] = [];
            }
            var callbacksOfEvent = this.callbacks[prefixType];
            callbacksOfEvent.push(callback);
        },
        fire: function (eventType) {
            var root = this;
            var callbacksOfEvent = this.callbacks['__' + eventType];
            if (callbacksOfEvent && callbacksOfEvent.length) {
                // 使用for循环而不用forEach
                for (var i = 0; i < callbacksOfEvent.length; i++) {
                    callbacksOfEvent[i].call(root, root.directions);
                }
            }
        }
    };
    return ScrollToDo;
});


