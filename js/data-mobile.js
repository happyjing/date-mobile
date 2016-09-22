$.fn.data_mobile=function(options){
	var date = new Date();
	var today = date.getFullYear()+"/"+(date.getMonth()+1)+"/"+date.getTime();
	var defaults = {
		start_year:'2010',
		end_year:date.getFullYear(),
		setDate:"2015-08-20 15:30",
		el:"",
		type :"day"
	};
	defaults = $.extend(true, defaults, options);
	//获取默认时间
	var setYear = new Date(defaults["setDate"]).getFullYear();
	var setMonth = new Date(defaults["setDate"]).getMonth()+1;
	var setDays = new Date(defaults["setDate"]).getDate();
	var setHours = new Date(defaults["setDate"]).getHours(); 
	var setMinutes = new Date(defaults["setDate"]).getMinutes(); 
	//得到默认时间
	var yearVal = setYear;
	var monthVal = setMonth;
	var daysVal = setDays;
	var hoursVal=setHours;
	var minutesVal = setMinutes;
	var $this = $(this);
	var isThis = "";
	/*for(var i = 0; i<25;i++){
		var 
	}*/
	$this.click(function(event){
		if($('body').find("#mobile_date").length>0){
			closePick();
			setTimeout(function(){
				$this.trigger('click')
			},10)
		}else{
		dateTime()		
		}
		/*console.log(defaults["el"] == isThis)
		if($('body').find("#mobile_date").length==0){
			dateTime()	
		}*/
		
		
	})
	function dateTime(){
		
		$('body').append("<div class='mobile_date' id='mobile_date'><div class='mobile_date_header'><div class='mobile_date_title'>选择日期和时间</div><div class='mobile_button' id='mobile_button'>确认</div></div><div class='mobile_model' id='mobile_model'><div class='picker-center-highlight'></div> </div></div>")
		var mobile_pick="<div class='mobile_pick_col'><div class='mobile_item_col' id='mobile_item_col'></div></div>"
		
		for(var i =0; i<6;i++){
			$(".mobile_model").append(mobile_pick)
		}
		for(var i = defaults['start_year']; i<=defaults['end_year']; i++){
			if(i == setYear){
				var yearList = "<div class='mobile_pick_item mobile_pick_item_select'>"+i+"</div>"
			}else{
				var yearList = "<div class='mobile_pick_item'>"+i+"</div>"
			}
			$(".mobile_item_col").eq(0).append(yearList)
		};
		for(var i=1;i<13;i++){
			if(i<=9){
				i="0"+i
			}
			if(i==setMonth){
				var monthList = "<div class='mobile_pick_item mobile_pick_item_select'>"+i+"</div>"
			}else{
				var monthList = "<div class='mobile_pick_item'>"+i+"</div>"
			}
			
			$(".mobile_item_col").eq(1).append(monthList)
		}
		for(var i=1;i<32;i++){
			if(i<=9){
				i="0"+i
			}
			if(i==setDays){
				var monthList = "<div class='mobile_pick_item mobile_pick_item_select'>"+i+"</div>"
			}else{
				var monthList = "<div class='mobile_pick_item'>"+i+"</div>"
			}
			$(".mobile_item_col").eq(2).append(monthList)
		}
		for(var i=1;i<25;i++){
			if(i<=9){
				i="0"+i
			}
			if(i==setHours){
				var hoursList = "<div class='mobile_pick_item mobile_pick_item_select'>"+i+"</div>"
			}else{
				var hoursList = "<div class='mobile_pick_item'>"+i+"</div>"
			}
			$(".mobile_item_col").eq(3).append(hoursList)
		}
		$(".mobile_item_col").eq(4).append("<div class='mobile_pick_item mobile_select_hours'>:</div>")
		
		for(var i=0;i<61;i++){
			if(i<=9){
				i="0"+i
			}
			if(i==minutesVal){
				var minutesList = "<div class='mobile_pick_item mobile_pick_item_select'>"+i+"</div>"
			}else{
				var minutesList = "<div class='mobile_pick_item'>"+i+"</div>"
			}
			$(".mobile_item_col").eq(5).append(minutesList)
		}
		
		$("#mobile_date").slideDown()
		$("#mobile_date").click(function(e){
			e.stopPropagation()
		})
		var mobile_item_col = document.querySelectorAll("#mobile_item_col");
		var startx="";
		var starty="";//开始的Y轴坐标
		var pagex=""
		var pagey="";//鼠标沿Y轴移动的坐标
		var aimElement = "";//目标元素，即：年月日的每一列元素
		var lastMovey = [];//初始为0 ， 每列滑动结束之后记录滑动距离，下次滑动开始的坐标
		var movey = "";//活动的距离
		var heightList=[];//每列的hight
		$.each(mobile_item_col , function(i,o){
			var i = i;
			lastMovey[i]="";
			heightList[i]=$(o).height();
			var itemList = $(o).find(".mobile_pick_item");
			var selectX = $(o).find(".mobile_pick_item_select").index()*36;
			
			lastMovey[i]=90-selectX;
			var traslateX ="translate3d(0px ," + (90-selectX) +"px ,  0px)"
				$(o).css({transform : traslateX})
			o.addEventListener('touchstart' , function(e){
			 startx = e.touches[0].pageX
			 starty = e.touches[0].pageY
			 var lastMovey = [];
			 aimElement = e.target.parentNode
			})
			o.addEventListener('touchmove' , function(e){
				pagex = e.touches[0].pageX;
				pagey = e.touches[0].pageY;
				movey=(pagey - starty)*1 + lastMovey[i]*1
				/*console.log(starty+"======"+pagey+"==========="+movey+"======"+lastMovey)*/
				var traslateX ="translate3d(0px ," + movey +"px ,  0px)"
				$(aimElement).css({transform : traslateX})
			})
			
			o.addEventListener('touchend' , function(e){
				var minHight=-(heightList[i]-90-36)
				if(movey < 90 && movey> minHight){
					var rowNum = Math.round(movey/36)
					if(movey>0){
						movey = rowNum*36+18
					}else{
						movey = rowNum*36-18
					}
					lastMovey[i]=movey;
					var traslateX ="translate3d(0px ," + movey +"px ,  0px)"
					$(aimElement).css({transform : traslateX})
					
				}else{
					if(movey>0){
						lastMovey[i]=90;
						var traslateX ="translate3d(0px , 90px ,  0px)"
						$(aimElement).css({transform : traslateX})
					}else{
						lastMovey[i]=minHight;
						var traslateX ="translate3d(0px ," + minHight +"px ,  0px)"
					$(aimElement).css({transform : traslateX})
					}
				}
				var itemIndex = (90-lastMovey[i])/36
				$(o).find(".mobile_pick_item").removeClass("mobile_pick_item_select").eq(itemIndex).addClass("mobile_pick_item_select");
				/*console.log($(this).find(".mobile_pick_item_select"))*/
				getVal();
			})
			if($(o).find(".mobile_select_hours").length>0){
				var traslateX_hours ="translate3d(0px , 90px ,  0px)"
					$(o).css({transform : traslateX_hours})
			}
			$('.picker-center-highlight').click(function(e){
				e.stopPropagation()
			})
			$("#mobile_button").click(function(){
				closePick()
			})
		})
		return $this.val(yearVal+"-"+monthVal+"-"+daysVal+" "+hoursVal+":"+minutesVal)
		
	}
	
	/*close*/
	function closePick(){
		$("#mobile_date").slideUp(function(){
			$("#mobile_date").remove()
		});
	}
	
	
	$(document).click(function(event){
		closePick()
	})
	$this.click(function(e){
		e.stopPropagation()
	})
	/*获得选中值*/
	function getVal(){
		yearVal = $(".mobile_item_col").eq(0).find(".mobile_pick_item_select").text()
		monthVal = $(".mobile_item_col").eq(1).find(".mobile_pick_item_select").text()
		daysVal = $(".mobile_item_col").eq(2).find(".mobile_pick_item_select").text()
		hoursVal = $(".mobile_item_col").eq(3).find(".mobile_pick_item_select").text()
		minutesVal = $(".mobile_item_col").eq(5).find(".mobile_pick_item_select").text()
		console.log($(".mobile_item_col").eq(8).find(".mobile_pick_item_select").text())
		return $this.val(yearVal+"-"+monthVal+"-"+daysVal+" "+hoursVal+":"+minutesVal)
	}
	
}
