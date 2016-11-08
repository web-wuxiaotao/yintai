function getClass(classname,obj){
	obj=obj||document;
	if(obj.getElementsByClassName){
		return obj.getElementsByClassName(classname)
	}else{
		var arr=[];
		var objs=document.getElementsByTagName('*')
		for(var i=0;i<objs.length;i++){
			if(checkClass(objs[i],classname)){
                  arr.push(objs[i])
                 
			}
		} 
		return arr;
	}

	function checkClass(obj,val){
		var classStr=obj.className
		var classArr=classStr.split(' ')
		for(var i=0;i<classArr.length;i++){
			if(val==classArr[i]){
				return true;
			}else{
	    return false;
	  }
		}
		
	}
}



//获取内容
function getText(obj,val){
	if(val==undefined){
		if(obj.innerText){
			return obj.innerText;
		}else{
			return obj.textContent;
		}
	}else{
		if(obj.innerText){
			return obj.innerText;
		}else{
			return obj.textContent;
		}
	}
}

//获取样式
function getStyle(obj, style){
	if(obj.currentStyle){
		return obj.currentStyle[style]
	}else if(getComputedStyle(obj,null)){
		return getComputedStyle(obj,null)[style]
	}
}


// $函数
function $(val,obj){
	if(typeof val=='string'){
		var obj=obj||document
		val=val.replace(/^\s*|\s*$/g,"")                          //消除空格
		if(val.charAt(0)=='#'){									  //检测到第一个字符是#
			return document.getElementById(val.slice(1))		  //返回id名代表的标签
		}else if(val.charAt(0)=="."){ 							  //检测到第一个字符为'，'
			return getClass(val.slice(1),obj)					  //返回类名代表的标签
		}else if(/^[a-zA-Z][a-zA-Z0-9]{0,10}$/.test(val)){		  //检测前两个字符的类型以及字符串长度
			return obj.getElementsByTagName(val)			  //输出标签名代表的标签
		}
	}else if(typeof val=='function'){
		window.onload=function(){
			val()
		}	
	}
		
}



//拿到子节点（元素和非空文本）集合
function getChilds(obj,type){        //obj指对象
	var type=type||"no"
	var kids=obj.childNodes;
	var arr=[];
	for(var i=0;i<kids.length;i++){
		if(type=="no"){
			if(kids[i].nodeType=='1'){
				arr.push(kids[i])
			}
		}else if(type=="yes"){
			if(kids[i].nodeType=='1'||kids[i].nodeType=='3'&&kids[i].nodeValue.replace(/^\s*|\s*$/g,"")){
				arr.push(kids[i])
			}
		}
	}	
	return arr;
}     

//拿到第一个子节点
function getFirst(obj,type){
	var type=type||"no"
	return kids=getChilds(obj,type)[0];
}
//拿到最后一个子节点
function getLast(obj,type){
	var type=type||"no"
	var childs=getChilds(obj,type);
	return childs[childs.length-1]
} 
//拿到第n个子节点
function getN(obj,n,type){
	var type=type||"no"
	var childs=getChilds(obj,type);
	if(n>childs.length||n<1){
		return false
	}
	return childs[n-1]
}

//取下一个兄弟节点
function getNext(obj,type){
	var type=type||'no';
	var next=obj.nextSibling;
	if(next===null){
		return false;
	}
	if(type=='no'){
		while(next.nodeType=='3'||next.nodeType=='8'){
			next=next.nextSibling;
			if(next==null){
				return false;
			}
		}		
		return next;
	}
	if(type=='yes'){
		while(next.nodeType=='3'&&!next.nodeValue.replace(/^\s*|\s*$/g,"")||next.nodeType=='8'){
			next=next.nextSibling;
			if(next==null){
				return false;
			}
		}		
		return next;
	}
}

//取上一个兄弟节点
function getPrevious(obj,type){
	var type=type||'no';
	var previous=obj.previousSibling;
	if(previous===null){
		return false;
	}
	if(type=='no'){
		while(evious.nodeType=='3'||previous.nodeType=='8'){
			previous=previous.previousSibling;
			if(previous==null){
				return false;
			}
		}		
		return previous;
	}
	if(type=='yes'){
		while(previous.nodeType=='3'&&!previous.nodeValue.replace(/^\s*|\s*$/g,"")||previous.nodeType=='8'){
			previous=previous.previousSibling;
			if(previous==null){
				return false;
			}
		}		
		return previous;
	}
}


//插入对象之前
function insertBefore(obj,beforeObj){
	var parent=beforeObj.parentNode
	parent.insertBefore(obj,beforeObj)
}
//插入对象之后
function insertAfter(obj,afterObj){
	var parent=afterObj.parentNode
	var next=getNext(afterObj,"yes")
	if(!next){
		parent.appendChild(obj)
	}else{
		parent.insertBefore(obj,next)
	}
}





//15.hover
//判断某个元素是否包含有另外一个元素
function contains (parent,child) {
	if(parent.contains){
		return parent.contains(child) && parent!=child;
	}else{
		return (parent.compareDocumentPosition(child)===20);
	}
}

//判断鼠标是否真正的从外部移入，或者是真正的移出到外部；
function checkHover (e,target) {
	if(getEvent(e).type=="mouseover"){
		return !contains(target,getEvent(e).relatedTarget || getEvent(e).fromElement)&&
			!((getEvent(e).relatedTarget || getEvent(e).fromElement)===target)
	}else{
		return !contains(target,getEvent(e).relatedTarget || getEvent(e).toElement)&&
			!((getEvent(e).relatedTarget || getEvent(e).toElement)===target)
	}
}
//鼠标移入移出事件
/*
 obj   要操作的对象
 overfun   鼠标移入需要处理的函数
 outfun     鼠标移除需要处理的函数
 */
function hover (obj,overfun,outfun) {
	if(overfun){
		obj.onmouseover=function  (e) {
			if(checkHover(e,obj)){
				overfun.call(obj,[e]);
			}
		}
	}
	if(outfun){
		obj.onmouseout=function  (e) {
			if(checkHover(e,obj)){
				outfun.call(obj,[e]);
			}
		}
	}
}
function getEvent (e) {
	return e||window.event;
}
