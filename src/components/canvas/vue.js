
export const setData = function(stageWidth,stageHeight){
	let data = [];
	//闲
	let xi = {};
	xi.x = 0;
	xi.y = 0;
	xi.width = stageWidth/5;
	xi.height = stageHeight;
	xi.fill='';
	xi.stroke = '';
	xi.strokeWidth = 0;
	xi.keyId = "xi";
	data.push(xi)
	//庄
	let z = {};
	z.x = stageWidth*4/5;
	z.y = 0;
	z.width = stageWidth/5;
	z.height = stageHeight;
	z.fill='';
	z.stroke = '';
	z.strokeWidth = 0;
	z.keyId = "z";
	data.push(z)
	//闲龙宝
	let xlb = {};
	xlb.x = stageWidth/5;
	xlb.y = 0;
	xlb.width = stageWidth*3/10;
	xlb.height = stageHeight/3;
	xlb.fill='';
	xlb.stroke = '';
	xlb.strokeWidth = 0;
	xlb.keyId = "xlb";
	data.push(xlb)
	//庄龙宝
	let zlb = {};
	zlb.x = stageWidth/5+stageWidth*3/10;
	zlb.y = 0;
	zlb.width = stageWidth*3/10;
	zlb.height = stageHeight/3;
	zlb.fill='';
	zlb.stroke = '';
	zlb.strokeWidth = 0;
	zlb.keyId = "zlb";
	data.push(zlb)
	//大
	let d = {};
	d.x = stageWidth/5;
	d.y = stageHeight/3;
	d.width = stageWidth/5;
	d.height = stageHeight/3;
	d.fill='';
	d.stroke = '';
	d.strokeWidth = 0;
	d.keyId = "d";
	data.push(d)
	//和
	let h = {};
	h.x = stageWidth*2/5;
	h.y = stageHeight/3;
	h.width = stageWidth/5;
	h.height = stageHeight/3;
	h.fill='';
	h.stroke = '';
	h.strokeWidth = 0;
	h.keyId = "h";
	data.push(h)
	//小
	let x = {};
	x.x = stageWidth*3/5;
	x.y = stageHeight/3;
	x.width = stageWidth/5;
	x.height = stageHeight/3;
	x.fill='';
	x.stroke = '';
	x.strokeWidth = 0;
	x.keyId = "x";
	data.push(x)
	//闲对
	let xd = {};
	xd.x = stageWidth/5;
	xd.y = stageHeight*2/3;
	xd.width = stageWidth*3/10;
	xd.height = stageHeight/3;
	xd.fill='';
	xd.stroke = '';
	xd.strokeWidth = 0;
	xd.keyId = "xd";
	data.push(xd)
	//庄对
	let zd = {};
	zd.x = stageWidth/5+stageWidth*3/10;
	zd.y = stageHeight*2/3;
	zd.width = stageWidth*3/10;
	zd.height = stageHeight/3;
	zd.fill='';
	zd.stroke = '';
	zd.strokeWidth = 0;
	zd.keyId = "zd";
	data.push(zd)
	return data
}
