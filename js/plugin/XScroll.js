/*
	Javascript图片切换类：XScroll
	版本：1.0.0
	作者：脚儿网/jo2.org
	使用说明：欢迎使用，欢迎转载，但请勿据为己有
*/
(function(self, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    self.XScroll = factory();
  }
}(this, function() {
'use strict';
var id=function (id) {
		//this.id=id;
		return "string" == typeof id ? document.getElementById(id) : id;
	},
	Extend=function(defaults, news) {
		for (var property in news) {
			defaults[property] = news[property];
		}
		return defaults;
	},
	Bind=function(object, fun) {
		var args = arguments.length ? Array.prototype.slice.call(arguments,2) : [];
		return function() {
			var temp = args.slice();
			if (arguments.length) {
				for (var i = 0; i < arguments.length; temp.push(arguments[i++]));
			}
			return fun.apply(object, temp);
		}
	},
	On=(function(){
		return (window.addEventListener) ? function(eType,eFunc,eObj) {
			eObj.addEventListener(eType,eFunc,false);
		} : function(eType,eFunc,eObj) {
			eObj.attachEvent("on"+eType,eFunc);
		};
	})(),
	cutover=function(arr,cur,cls){
		for(var i=0,l=arr.length;i<l;i++){
			if(arr[i].className.indexOf(cls) != -1) {
				arr[i].className = arr[i].className.replace(cls,'');
			}
		}
		arr[cur].className = arr[cur].className.replace(/\s$/g,'') + ' ' + cls;
	},
	setAlpha=(function(){
		return (-[1,]) ? function (obj,alpha) {
				obj.style.opacity = alpha * 0.01;
			} : function(obj,alpha){
				obj.style.filter = "alpha(opacity=" + alpha + ")";
			};
	})(),
	setCss=function(elm,css){
		for(var c in css) {
			elm.style[c] = css[c];
		}
	},
	setPos=function(obj,pos){
		for(var p in pos) {
			obj.style[p] = pos[p] + 'px';
		}
	};
//alert(id('idContainer'));

var XScroll = function (elm,option) {
	return new XScroll.main(elm,option);
}
XScroll.main = function(elm,option) {
	var self = this;
	self.wraper = id(elm);
	self.items = self.wraper.children;
	self.count = self.items.length;
	/* 初始化选项 */
	this.defaults = {
		how:0,
		direct:0,
		auto:4000,
		fps:50,
		ing:500,
		pause:true,
		event:'mouseover',
		Tween:QuadOut
	}
	Extend(this.defaults,option);
	//console.log(self.defaults);
	self.how = self.defaults.how;
	//self.
	self.auto = self.defaults.auto;

	//console.log(self.step)
	//console.log(self.fan);
	self.speed = 1000/self.defaults.fps;
	self.ing = self.defaults.ing/self.speed;
	// self.runtimes = self.ing/self.speed;
	self.tween = self.defaults.Tween;
	self.auto = self.defaults.auto;
	/* 页码翻页功能 */
	self.pager = self.defaults.pager;
	self.event = self.defaults.event;
	self.pause = self.defaults.pause;
	self.next = self.now = self.time = 0;
	/* 初始化完毕 */
	self._time = 0;
	self.init();


}
XScroll.prototype = {
	init:function(){
		var self = this,
			len = self.count,
			self = self,
			items = self.items;
		while (len-- > 0){
			items[len].style.cssText = "position:absolute; display:none; z-index:5;top:0;left:0;"
		}

		setCss(items[0],{zIndex:10,display:'block'});

		var drt = self.defaults.direct;
		self.direct = ['left','top'][drt % 2];

		self.fan = (drt > 1) ? -1 : 1;
		self.step = self.defaults.step || (drt % 2 ? self.wraper.offsetHeight : self.wraper.offsetWidth);
		self.step *= self.fan;
		if(self.pause) {
			On('mouseout',function(){
				self.Cont();
			},self.wraper);
			On('mouseover',function(){
				self.Pause();
			},self.wraper);
		}
		if(self.pager) {
			self.pages = id(self.pager).children;
			var evt = self.event,
				pl = self.pages.length,
				self = self,
				to;
			while (pl--){
				(function(i){
					On(evt,
						function(){
							self.Pause();
							to = setTimeout(function(){self.go(i)},150);
						},
						self.pages[i]);
					On('mouseout',
						function(){
							clearTimeout(to);
							if(self.defaults.auto) self.auto = true;
							// self.Cont();
						},
						self.pages[i]);
				})(pl);
			}
		}
		self.Run = self.run();
		self.auto && (self.timer = setTimeout(Bind(self,self.Next),self.auto)) ;
	},
	fix:function(){
		var i = this.count;
		while(i--) {
			if(i == this.now || i == this.next) {
				this.items[i].style.display = 'block';
			} else {
				this.items[i].style.display = 'none';
			}
		}
	},
	go:function (num) {
		var self = this;
		if(num != undefined) { self.next = num	}
		else { self.next=self.now+1; }
		(self.next>= self.count ) && (self.next = 0) || (self.next < 0) && (self.next = (self.count-1));
		//console.log('num='+num +',self.next = '+ self.next);
		//当前项为curS,下一项为nextS,谨记
		if(self.next != self.now) {
			clearTimeout(self.timer);
			// self._time = 0;
			// self.nextS && self.End();
			if(self.moving) self.after();
			self.curS = self.items[self.now];
			self.nextS = self.items[self.next];
			self.fix();
			self.moving = 1;
			// self.curS.style[self.direct] = self.curS.e = self.nextS.style[self.direct] = self.nextS.e = 0;

			setCss(self.curS,{zIndex:5})
			setCss(self.nextS,{zIndex:10})
			self.Run();
			if(self.pager)  { cutover(self.pages,self.next,'on')};
			self.now = self.next;
		}
		//self.how = Math.round(0+Math.random()*3);

	},
	run:function(elm,callback) {
		var self = this,
			step = self.step,
			// How = self.How(),
			tween = self.tween;
		clearTimeout(self.timer);
		/* 根据how初始化动画方式 */
		function var4move (elms) {
			var i = elms.length;
			while(i--) {
				var elm = elms[i];
				elm.b = parseInt(elm.style[self.direct],10);
				elm.c = elm.e - elm.b;
			}
		}
		var effects = [
			function(){
				// self.nextS.c = self.curS.c = 0;
				self.nextS.f = 0;
				self.nextS._f = 100/self.ing;
				self.curS.f = 100;
				self.curS._f = -(100/self.ing);
				self.Timer([self.curS,self.nextS]);
			},
			function(){
				self.curS.e = -step;
				self.nextS.style[self.direct] = step +'px';
				self.nextS.e = 0;
				var4move([self.curS,self.nextS]);
				self.Timer([self.curS,self.nextS]);
			},
			function(){
				self.nextS.style[self.direct] = step+'px';
				self.nextS.e = 0;
				self.nextS.f = 0;
				self.nextS._f = 100/self.ing;
				var4move([self.nextS]);
				self.Timer([self.nextS]);
			},
			function(){
				self.curS.style.zIndex = 10;
				self.nextS.style.zIndex = 5;
				setAlpha(self.nextS,100);
				self.curS.e = -step;
				var4move([self.curS]);
				self.Timer([self.curS]);
			},
			function(){
				var curS = self.curS,
					nextS = self.nextS;
				curS.style.zIndex = 10;
				nextS.style.zIndex = 5;
				curS.e = -step/2;
				nextS.e = step/2;

				var t = 0,
					c = curS.e-0,
					ing = self.ing*2,
					direct = self.direct,
					speed = self.speed,
					//pos = {	},
					yes = 1;

					(function runing(){
						clearTimeout(self.timer);
						if(yes) {
							if(t < ing && Math.floor(curS.e-parseInt(curS.style[direct],10))){
								curS.style[direct] = Math.floor(tween(t++,0,c,ing)) +'px';
								nextS.style[direct] = Math.floor(tween(t++,0,-c,ing))+'px';
								self.timer = setTimeout(runing,speed);

							} else {
								yes = 0;
								t = 0;
								curS.style.zIndex = 5;
								nextS.style.zIndex = 10;
								self.timer = setTimeout(runing,speed);
							}
						} else {
							if(t < ing && Math.floor(0-parseInt(nextS.style[direct],10))){
								curS.style[direct] = Math.floor(tween(t++,curS.e,-c,ing)) +'px';
								nextS.style[direct] = Math.floor(tween(t++,nextS.e,c,ing))+'px';
								self.timer = setTimeout(runing,speed);
							} else {
								yes = 1;
								t = 0;
								nextS.style[direct] = 0;
								curS.style[direct] = 0;
								self.after();
							}
						}

					})(); //runing
			}
		];

		var t = +new Date();
		return effects[self.how];
	},
	after:function(){
		var self = this;
		// if(self.moving == self.fading) {
			//console.log('end')s
			self.moving = self._time = 0;
			setCss(self.curS,{display:'none',zIndex:5});
			self.nextS.style[self.direct] = 0;
			setAlpha(self.nextS,100);
			setAlpha(self.curS,100);
			//self.curS.moving =self.nextS.moving = 0;
			self.Cont();
		// }

	},
	End : function  () {
		this._time = 0;
		this.moving =0;
		setCss(this.nextS,{zIndex:10,display:'block'})
		setAlpha(this.nextS,100);
		this.nextS.style[this.direct] = 0;
	},
	Timer : function  (elms) {
		var self = this;
		console.log(self, elms)
		clearTimeout(self.timer);
		if(self._time++ < self.ing) {
			self.Moving(elms);
			self.timer = setTimeout(Bind(self,self.Timer,elms),self.speed);
		} else {
			// console.log('over');
			self._time = 0;
			self.moving = 0;
			clearTimeout(self.timer);
			self.after();
		}
	},
	Moving : function  (elms) {
		var l=elms.length;
		while(l--) {
			var elm = elms[l];
			if(elm.c) {
				elm.style[this.direct] = Math.floor(this.tween(this._time,elm.b,elm.c,this.ing)) +'px';
			}
			if(elm.f != undefined) {
				setAlpha(elm,elm.f+=elm._f);
			}
		}
	},
	Prev:function(){
		this.go(--this.next);
	},
	Next:function(){
		this.go(++this.next);
	},
	Pause:function(){
		this.auto = false;
		if(!this.moving) clearTimeout(this.timer);
	},
	Cont:function(){
		this.auto = this.defaults.auto;
		if(!this.moving && this.auto) this.timer = setTimeout(Bind(this,this.Next),this.auto);
	}
}

XScroll.main.prototype = XScroll.prototype;

function QuadOut(t,b,c,d){
	return -c *(t/=d)*(t-2) + b;
}

return XScroll;
}));