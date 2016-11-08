$(function(){
	// var aa=jQuery.noConflict();
	// aa("img").lazyload({
	// 	threshold:500,
	// 	event:"scroll",
	// 	effect:"fadeIn",
	// })
	//banner部分
	// banner图轮播
	function bannerLunBo(){
		var bac=$('#bac')
		var con=$('.con',bac)[0]
		var lt=$('.lt',con)[0]
		var gt=$('.gt',con)[0]
		var banPic=$('.ban-pic',con)
		var conRoll=$('.con-roll',con)
		var roll=$('.roll',conRoll)
		var a=$('.a',bac)
		var n=0;
		var flag=true;
		var t=setInterval(move,3000)
		function move(type){
			type=type||'gt'
			if(!flag){
				return;
			}
			flag=false;
			if(type=='gt'){
				n++
				if(n>=banPic.length){
					n=0
				}
			}else if(type=='lt'){
				n--
				if(n<0){
					n=banPic.length-1
				}
			}
			
			for(var i=0;i<banPic.length;i++){
				animate(banPic[i],{opacity:0},500)
				animate(a[i],{opacity:0},500)
				roll[i].style.background='#211616'
			}
			animate(banPic[n],{opacity:1},500,function(){
				flag=true
			})
			animate(a[n],{opacity:1},500,function(){
					flag=true;
				})
			roll[n].style.background='#e5004f'
		}
		for(var i=0;i<banPic.length;i++){
			hover(banPic[i],function(){
				clearInterval(t)
			},function(){
				t=setInterval(move,3000)
			})
		}		
		gt.onclick=function(){
			move('gt')
		}
		lt.onclick=function(){
			move('lt')
		}		
		for(var i=0;i<roll.length;i++){
			roll[i].index=i;
			roll[i].onmouseover=function(){
				if(!flag){
					return;
				}
				flag=false;
				for(var i=0;i<banPic.length;i++){
					animate(banPic[i],{opacity:0},500)
					animate(a[i],{opacity:0},500)
					roll[i].style.background='#211616'
				}
				animate(banPic[this.index],{opacity:1},500,function(){
				flag=true
			})
				animate(a[this.index],{opacity:1},500,function(){
						flag=true;
					})
				roll[this.index].style.background='#e5004f'
				n=this.index
			}	
		}
	}
	bannerLunBo()	


	//左右箭头消失
	function ltgt(){
		var bac=$('#bac')
		var con=$('.con',bac)[0]
		var lt=$('.lt',con)[0]
		var gt=$('.gt',con)[0]
		hover(con,function(){
			lt.style.opacity=0.7
			gt.style.opacity=0.7
		},function(){
			lt.style.opacity=0
			gt.style.opacity=0
		})
	}
	ltgt()




	// 内容中的轮播
	
	
	//楼层中轮播图左右箭头部分
	function leftRight(obj){
		var obj=obj
		var left=$('.L-left',obj)[0]
		var right=$('.R-right',obj)[0]
		hover(obj,function(){
			animate(left,{left:0},500)
			animate(right,{right:0},500)
		},function(){
			animate(left,{left:-30},500)
			animate(right,{right:-30},500)
		})
	}
	function conLunBo(obj){
		var obj=obj
		var cir=$('.cir',obj)
		var img=$('.img',obj)
		var left=$('.L-left',obj)[0]
		var right=$('.R-right',obj)[0]
		var circle=$('.circle',obj)[0]
		right.onclick=function(){
			animate(img[0],{left:-390},300)
			animate(img[1],{left:0},300)
			cir[0].style.background='#211616'
			cir[1].style.background='#e5004f'
		}
		left.onclick=function(){
			animate(img[1],{left:390},300)
			animate(img[0],{left:0},300)
			cir[1].style.background='#211616'
			cir[0].style.background='#e5004f'
		}
		cir[1].onclick=function(){
			animate(img[0],{left:-390},300)
			animate(img[1],{left:0},300)
			cir[0].style.background='#211616'
			cir[1].style.background='#e5004f'
		}
		cir[0].onclick=function(){
			animate(img[1],{left:390},300)
			animate(img[0],{left:0},300)
			cir[1].style.background='#211616'
			cir[0].style.background='#e5004f'
		}
	}
	var fashion=$('.fashion')[0]
	var shoes=$('.shoes')[0]
	var bag=$('.bag')[0]
	var cosmetology=$('.cosmetology')[0]
	var outdoors=$('.outdoors')[0]
	var underwear=$('.underwear')[0]
	conLunBo($('.con-img',fashion)[0])
	conLunBo($('.con-img',shoes)[0])
	conLunBo($('.con-img',bag)[0])
	conLunBo($('.con-img',cosmetology)[0])
	conLunBo($('.con-img',outdoors)[0])
	conLunBo($('.con-img',underwear)[0])
	leftRight($('.con-img',fashion)[0])
	leftRight($('.con-img',shoes)[0])
	leftRight($('.con-img',bag)[0])
	leftRight($('.con-img',cosmetology)[0])
	leftRight($('.con-img',outdoors)[0])
	leftRight($('.con-img',underwear)[0])


	//楼层中的轮播图片鼠标悬停透明度变化
	function floorOpacity(obj){
		var obj=obj
		var con_img=$('.con-img',obj)[0]
		var img=$('a',con_img)
		for(var i=0;i<img.length;i++){
			hover(img[i],function(){
				this.style.opacity=0.7
			},function(){
				this.style.opacity=1
			})
		}
	}

	//楼层中品牌轮播
	function pinpai(obj){
		var obj=obj;
		var con_nav=$('.con-nav',obj)[0]
		var brand=$('.brand',con_nav)[0]
		var uls=$('.brand-cons',brand)[0]
		var ul=$('ul',uls)
		var left=$('.left',brand)[0]
		var right=$('.right',brand)[0]
		var n=0;
		var next=0
		var flag=true
		var width=parseInt(getStyle(uls,'width'))
		function move(type){
			if(!flag){
				return
			}
			flag=false
			if(type=='r'){
				next=n+1
				if(next>=ul.length){
					next=0
				}
				ul[next].style.left=width+'px'
				animate(ul[n],{left:-width},500)
				animate(ul[next],{left:0},500,function(){
					flag=true
				})
			}else if(type=='l'){
				next=n-1
				if(next<0){
					next=ul.length-1
				}
				ul[next].style.left=-width+'px'
				animate(ul[n],{left:width},500)
				animate(ul[next],{left:0},500,function(){
					flag=true
				})
			}
			n=next
		}
		right.onclick=function(){
			move('r')
		}
		left.onclick=function(){
			move('l')
		}
	}
	var floor=$('.floor')
	for(var i=0;i<floor.length;i++){
		floorOpacity(floor[i])
		pinpai(floor[i])
	}
	



	//左侧导航
	function nav(){
		var bac=$('#bac')
		var con=$('.con',bac)[0]
		var obj=$('.L-nav',con)
		for(var i=0;i<obj.length;i++){
			obj[i].index=i
			hover(obj[i],function(){
				var div=$('div',this)[0]
				this.style.background="#e5004f"
				div.style.display='block'
			},function(){
				var div=$('div',this)[0]
				this.style.background="#333"
				div.style.display='none'
			})
		}			
	} 
	nav()

	//主推部分选项卡
	function recom(){
		var obj=$('.recommend')[0]
		var top=$('.Rec-top',obj)[0]
		var li=$('li',top)
		var a=$('a',top)
		var div=$('div',top)
		var bot=$('.Rec-bot',obj)
		for(var i=0;i<li.length;i++){
			li[i].index=i
			hover(li[i],function(){
				for(var i=0;i<a.length;i++){
					li[i].style.cssText="border-bottom:5px solid #333"
					a[i].style.cssText="font-weight: normal"
					div[i].style.display="none"
				}
				this.style.cssText="border-bottom:5px solid #e5004f"					
				a[this.index].style.cssText="font-weight: bold"
				div[this.index].style.display="block"
				for(var i=0;i<bot.length;i++){
					bot[i].style.display='none'
				}
				bot[this.index].style.display='block'
			},function(){})
		}						
	}
	recom()

	//主推部分图片边框
 	function recBorder(obj){
		var obj=obj	
		var a=$('a',obj)
		for(var i=0;i<a.length;i++){
			hover(a[i],function(){       
				var ah=this.offsetHeight
				var aw=this.offsetWidth
				var bl=$('.bl',this)[0]
				var br=$('.br',this)[0]
				var bt=$('.bt',this)[0]
				var bb=$('.bb',this)[0]
				animate(bt,{width:aw},500)
				animate(bb,{width:aw},500)
				animate(bl,{height:ah},500)
				animate(br,{height:ah},500)
				bt.style.height=1+'px'
				bb.style.height=1+'px'
				bl.style.width=1+'px' 
				br.style.width=1+'px'  
				//边框出现  
			},function(){
				var bl=$('.bl',this)[0]
				var br=$('.br',this)[0]
				var bt=$('.bt',this)[0]
				var bb=$('.bb',this)[0]
				animate(bt,{width:0},500)
				animate(bb,{width:0},500)
				animate(bl,{height:0},500)
				animate(br,{height:0},500)
				//边框消失
			})
		}
	}
	recBorder($('.Rec-1')[0])
	recBorder($('.Rec-2')[0])




	//专柜同款部分选项卡
	function shop(){
		var shoppe=$('.shoppe')[0]
		var s_bot=$('.S-bot',shoppe)[0]
		var s_nav=$('.S-nav',s_bot)[0]
		var a=$('a',s_nav)
		var div=$('div',s_nav)
		var bot=$('.B-R-bot',s_bot)
		for(var i=0;i<a.length;i++){
			a[i].index=i
			hover(a[i],function(){
				for(var i=0;i<a.length;i++){
					a[i].style.cssText="font-weight: normal;border-color: #333"
					div[i].style.display="none"
				}					
				this.style.cssText="font-weight: bold;border-color:#e5004f"
				div[this.index].style.display="block"
				for(var i=0;i<bot.length;i++){
					bot[i].style.display='none'
				}
				bot[this.index].style.display='block'
			},function(){})	
		}		
	}
	shop()

	//专柜同款部分图片边框
	function inBorder(){
		var shoppe=$('.shoppe')[0]
		var S_bot=$('.S-bot',shoppe)[0]
		var two=$('.two',S_bot)[0]
		var con=$('.con',two)
		for(var i=0;i<con.length;i++){
			hover(con[i],function(){       
				var ch=this.offsetHeight
				var cw=this.offsetWidth
				var bl=$('.bl',this)[0]
				var br=$('.br',this)[0]
				var bt=$('.bt',this)[0]
				var bb=$('.bb',this)[0]
				animate(bt,{width:cw},500)
				animate(bb,{width:cw},500)
				animate(bl,{height:ch},500)
				animate(br,{height:ch},500)
				bt.style.height=1+'px'
				bb.style.height=1+'px'
				bl.style.width=1+'px' 
				br.style.width=1+'px'  
				//边框出现  
			},function(){
				var bl=$('.bl',this)[0]
				var br=$('.br',this)[0]
				var bt=$('.bt',this)[0]
				var bb=$('.bb',this)[0]
				animate(bt,{width:0},500)
				animate(bb,{width:0},500)
				animate(bl,{height:0},500)
				animate(br,{height:0},500)
				//边框消失
			})
		}
	}
	inBorder()





	//底部遮罩
	function cover(){
		var spread=$('.spread')[0]
		var a=$('a',spread)
		for(var i=0;i<a.length;i++){
			hover(a[i],function(){
				var cover=$('.cover',this)[0]
				cover.style.opacity=0.3
			},function(){
				var cover=$('.cover',this)[0]
				cover.style.opacity=0;
			})
		}
	}
	cover()

	//楼层跳转
	function fixed_floor(){
		var floor=$('.floor')
		var fixed=$('#fixed')
		var a=$('a',fixed)
		var	img=$('img',fixed)
		var span=$('span',fixed)
		var now;
		var obj=document.body.scrollTop?document.body:document.documentElement;
		for(var i=0;i<floor.length;i++){
			floor[i].h=floor[i].offsetTop
		}
		window.onscroll=function(){
			for(var i=0;i<floor.length;i++){
				var top=obj.scrollTop
				var cWidth=document.documentElement.clientWidth
				var cHeight=document.documentElement.clientHeight
				console.log(cHeight)
				if(top>=floor[i].h-300){
					fixed.style.display='block'
					fixed.style.top=(cHeight-550)/2+'px'
					fixed.style.right=(cWidth-1310)/2+'px'		
				}else if(top<floor[0].h-400){
					fixed.style.display='none'
				}
				if(top>=floor[i].h-400){
					for(var j=0;j<floor.length;j++){
						img[j].style.display='block'
						span[j].style.display='none'
					}
					img[i].style.display='none'
					span[i].style.display='block'
					now=i
				}
			}
		}
		
		for(var i=0;i<a.length;i++){
			a[i].index=i
			if(i<a.length-1){
				a[i].onclick=function(){
					animate(document.body,{scrollTop:floor[this.index].h},300)
					animate(document.documentElement,{scrollTop:floor[this.index].h},300)
					now=this.index;	
				}
			}else if(i==a.length-1){
				a[i].onclick=function(){
					animate(document.body,{scrollTop:0},300)
					animate(document.documentElement,{scrollTop:0},300)
					now=this.index
				}				
			}
			hover(a[i],function(){
				img[this.index].style.display='none'
				span[this.index].style.display='block'
			},function(){
				if(this.index==now){
					return
				}
				img[this.index].style.display='block'
				span[this.index].style.display='none'
			})
		}
	}
	fixed_floor()



	//head
	function headLink(){
		var head=$('.head')[0]
		var right=$('.right',head)[0]
		var my_yintai=$('.my-yintai',right)[0]
		var bot=$('.bot',my_yintai)[0]
		var div=$('div',my_yintai)[0]
		var img=$('img',my_yintai)[0]
		hover(my_yintai,function(){
			my_yintai.style.cssText='box-shadow: 0 0 4px #888;background:#fff'
			bot.style.display='block'
			div.style.display='block'
			img.style.transform='rotate(360deg)'
		},function(){
			my_yintai.style.cssText='box-shadow: none;background:none'
			bot.style.display='none'
			div.style.display='none'
			img.style.transform='rotate(0deg)'
		})
	}
	headLink()

	//head部分左侧鼠标悬停效果
	function weChat(){
		var wechat=$('.wechat')[0]
		var a=$('a',wechat)[0]
		var div=$('div',a)[0]
		var img=$('img',div)[0]	
		var span=$('span',a)[0]	
		var bot=$('.bot',a)[0]
		hover(wechat,function(){
			a.style.width=89+'px'
			div.style.display='block'
			span.style.display='block'
			bot.style.transform='rotate(360deg)'
		},function(){
			a.style.width=52+'px'
			div.style.display='none'
			span.style.display='none'
			bot.style.transform='rotate(0deg)'
		})
	}
	weChat()


	function phone(){
		var phono=$('.phono')[0]
		var a=$('a',phono)[0]
		var div=$('div',phono)[0]
		var span=$('span',a)[0]
		var bot=$('.bot',a)[0]
		hover(phono,function(){
			a.style.width='116px'
			a.style.background='#fff'
			a.style.color="#e5004f"
			span.style.display='block'
			div.style.display='block'
			bot.style.transform='rotate(360deg)'
		},function(){
			a.style.width='107px'
			a.style.background='transparent'
			a.style.color="#666"
			span.style.display='none'
			div.style.display='none'
			bot.style.transform='rotate(0deg)'
		})
	}
	phone()


	//专柜同款部分热门品牌鼠标悬停透明度变化
	function opacity(){
		var shoppe=$('.shoppe')[0]
		var bot=$('.S-bot')[0]
		var one=$('.one',bot)[0]
		var con=$('.con',one)
		for(var i=0;i<con.length;i++){
			hover(con[i],function(){
				var img=$('img',this)[0]
				img.style.opacity=0.7
			},function(){
				var img=$('img',this)[0]
				img.style.opacity=1
			})
		}
		
	}
	opacity()


	//鼠标悬浮效果
	//图片边框
	function border(obj){
		var obj=obj	
		var con_link=$('.con-link',obj)[0]
		var a=$('a',con_link)
		for(var i=0;i<a.length;i++){
			hover(a[i],function(){       
				var ah=this.offsetHeight
				var aw=this.offsetWidth
				var bl=$('.bl',this)[0]
				var br=$('.br',this)[0]
				var bt=$('.bt',this)[0]
				var bb=$('.bb',this)[0]
				animate(bt,{width:aw},500)
				animate(bb,{width:aw},500)
				animate(bl,{height:ah},500)
				animate(br,{height:ah},500)
				bt.style.height=1+'px'
				bb.style.height=1+'px'
				bl.style.width=1+'px' 
				br.style.width=1+'px'  
				//边框出现  
			},function(){
				var bl=$('.bl',this)[0]
				var br=$('.br',this)[0]
				var bt=$('.bt',this)[0]
				var bb=$('.bb',this)[0]
				animate(bt,{width:0},500)
				animate(bb,{width:0},500)
				animate(bl,{height:0},500)
				animate(br,{height:0},500)
				//边框消失
			})
		}
	}
	var floor=$('.floor')
	for(var i=0;i<floor.length;i++){
		border(floor[i])
	}












})