function getDays(date){//获取某月天数
	var nStart = date.getTime();//先获取起始日期的毫秒数

	date.setMonth(date.getMonth()+1);//设置下个月

	var nEnd = date.getTime();//获取下个月今天的毫秒数

	return (nEnd - nStart)/1000/60/60/24;//根据相差毫秒计算天数
}

function getDayss(date){//获取某月天数
	return -(date.getTime()-(date.setMonth(date.getMonth()+1)))/1000/60/60/24;
}

function parseDay(num){//格式化星期
	switch(num){
		case 0:
			return "星期日";
			break;
		case 1:
			return "星期一";
			break;
		case 2:
			return "星期二";
			break;
		case 3:
			return "星期三";
			break;
		case 4:
			return "星期四";
			break;
		case 5:
			return "星期五";
			break;
		case 6:
			return "星期六";
			break;
		default:
			return null;
	}
}
function parseNum(num){
	if(num<10){
		num = "0"+num;
	}
	return num;
}

function randNum(start,end){/*生成从start到end的数字，包括end*/
	return Math.floor(Math.random()*(end-start+1))+start;
}

//获取样式表

function getStyle(ele){
	return window.getComputedStyle ? window.getComputedStyle(ele, false) : ele.currentStyle;
}

//通过类名获取元素,兼容IE.
function getEleByClass(ele,classname){
	var eles = ele.getElementsByTagName("*");
	var aEle = [];
	for(i=0;i<eles.length;i++){
		if(eles[i].classname = classname){
			aEle.puse(eles[i]);
		} 
	}
	return aEle;
}
//单属性
function move(json){
	var times = json.duration;//总时间
	var start = parseInt(getStyle(json.ele)[json.prop]);//开始距离

	var totaldistance = json.target - start;//总距离
	var date = new Date();
	var timer = setInterval(function(){
	var passedtimes = new Date() - date;//已耗时间
	var passedscale = passedtimes/times//移动距离

	passedscale = Math.min(1,passedscale);

	if(json.timing == "slow"){//慢
		passedscale = Math.sqrt(passedscale);//返回数的平方根
	}else if(json.timing == "spend"){//快
		passedscale = Math.pow(passedscale,2);//返回x的y次幂
	}

	json.ele.style[json.prop] = start+(totaldistance*passedscale)+"px";

	if(eBox.offsetLeft == 1){
		clearInterval(timer);
		}
	},json.delay)
}
//多属性js
function move(json){
	clearInterval(json.ele.timer)
	var date = new Date();
	var info = {};//储存每个属性的起始位置

	for(var attr in json.props){
		info[attr] = parseInt(getStyle(json.ele)[attr]);
	}

	json.ele.timer = setInterval(function(){

		var timeScale = (new Date() - date) / json.duration;
		timeScale = Math.min(1,timeScale);

		if(json.timing = "slow"){
			timeScale = Math.sqrt(timeScale);
		}else if(json.timing = "speed"){
			timeScale = Math.pow(timeScale,2);
		}

		for(var attr in json.props){
			json.ele.style[attr] = info[attr]+(json.props[attr]-info[attr])*timeScale+"px";
		}
		if(timeScale == 1){
			clearInterval(json.ele.timer);

		}

	},json.delay)
}