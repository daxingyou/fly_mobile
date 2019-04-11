var codes = {
	'10': 0,
	'50': 48,
	'100': 96,
	'500': 144,
	'1000': 192,
	'5000': 240,
	'10000': 288,
}
var chipTargetList = [];
//添加筹码类
export var ImgCreateChip = function(el, img, activeCode, centerX, centerY, radius, maxRadius) {
	this.el = el;
	this.context = el.getContext('2d');
	this.img = img;
	this.centerX = centerX;
	this.centerY = centerY;
	this.radius = radius;
	this.activeCode = activeCode;
	this.maxRadius = maxRadius

}

ImgCreateChip.prototype = {
	draw: function(b) {
		this.context.drawImage(this.img, 0, codes[this.activeCode], 48, 48, this.centerX - (this.radius / 2), this.centerY - (this.radius / 2), this.radius, this.radius);
	},
	animateDraw: function() {
		this.timer = setInterval(() => {
			this.context.clearRect(0, 0, this.el.width, this.el.height);
			if(this.maxRadius <= this.radius) {
				chipTargetList.loopCall(function() {
					this.draw(); //此处this指向chipTargetList遍历出的筹码对象
				});
				this.draw(); //此处this指向当前生成的筹码对象
				clearInterval(this.timer)
				chipTargetList.push(this);
				return
			}
			this.maxRadius -= 5;
			chipTargetList.loopCall(function() {
				this.draw();
			});
			this.context.drawImage(this.img, 0, codes[this.activeCode], 48, 48, this.centerX - (this.maxRadius / 2), this.centerY - (this.maxRadius / 2), this.maxRadius, this.maxRadius);
		}, 16)

	},
	endAnimation: function() {
		clearInterval(this.timer)
		chipTargetList.push(this);
		this.context.clearRect(0, 0, this.el.width, this.el.height);
		chipTargetList.loopCall(function() {
			this.draw(); //此处this指向chipTargetList遍历出的筹码对象
		});
		this.draw();

	},
	clearContext: function() {
		chipTargetList = [];
		this.context.clearRect(0, 0, this.el.width, this.el.height);
	}
}
export var config = {};
//绘制区域线及底层文字类
export var CreateRegionLine = function(el, stageWidth, stageHeight, lineWidth) {
	this.el = el;
	this.context = el.getContext('2d');
	this.stageWidth = stageWidth;
	this.stageHeight = stageHeight;
	this.lineWidth = lineWidth;
	this.createLine()
}
CreateRegionLine.prototype = {
	setParams: function() {
		config.x1 = {
			x: 0,
			y: 0,
			width: this.stageWidth,
			height: this.stageHeight * 6 / 7,
			text: "闲一"
		};
		config.x2 = {
			x: this.stageWidth,
			y: 0,
			width: this.stageWidth,
			height: this.stageHeight * 6 / 7,
			text: "闲二"
		};
		config.x3 = {
			x: 0,
			y: this.stageHeight * 6 / 7,
			width: this.stageWidth * 2 / 3,
			height: this.stageHeight * 8 / 7,
			text: "闲三"
		};
		config.x4 = {
			x: this.stageWidth * 2 / 3,
			y: this.stageHeight * 6 / 7,
			width: this.stageWidth * 2 / 3,
			height: this.stageHeight * 8 / 7,
			text: "闲四"
		};
		config.x5 = {
			x: this.stageWidth * 4 / 3,
			y: this.stageHeight * 6 / 7,
			width: this.stageWidth * 2 / 3,
			height: this.stageHeight * 8 / 7,
			text: "闲五"
		};
	},
	createLine: function() {
		this.setParams()
		this.drawRect()
	},
	drawRect: function() {
		for(var key in config) {
			let item = config[key]
			this.context.strokeStyle = 'rgba(204,204,204,.3)';
			this.context.lineWidth = 1;
			this.context.strokeRect(item.x, item.y, item.width, item.height);
			this.context.font = 'bold 70px Arial';
			this.context.textAlign = 'center';
			this.context.fillStyle = 'rgba(4,186,238,.7)';
			this.context.fillText(item.text, item.x + (item.width / 2), item.y + (item.height / 2) + 12);
		}
	},
}

//遍历且继承
Array.prototype.loopCall = function(callback) {
	for(var i = 0; i < this.length; i++) {
		callback.call(this[i]);
	}
}