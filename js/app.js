(function(shop) {
	shop = {
		init: function(){
			this.clickAccount();
			this.bottomClick();
			this.initScroll();
			this.main_category();
			this.openProudct();
			this.slider();
			this.showProductList();
			this.showTrash();
			this.hot_product();
			this.new_product();
		},
		clickAccount: function() {
			document.querySelector('.account').onclick = function() {
				var ul = this.getElementsByTagName('ul')[0];
				if(ul.className == 'dropdown-links') {
					ul.classList.add('active');
				} else {
					ul.classList.remove('active');
				}
			}
		},

		bottomClick: function() {
			let lis = document.querySelectorAll('.main-menu>ul>li');
			for(var i = 0; i < lis.length; i++) {
				(function(item) {
					let that = lis[item];
					that.addEventListener("mouseover", function() {
						that.querySelector('.main-page-sub') && (that.querySelector('.main-page-sub').style.transform = 'scaleY(1)');
						that.querySelector('.store-sub') && (that.querySelector('.store-sub').style.transform = 'scaleY(1)');
					})
					that.addEventListener("mouseout", function() {
						that.querySelector('.main-page-sub') && (that.querySelector('.main-page-sub').style.transform = 'scaleY(0)');
						that.querySelector('.store-sub') && (that.querySelector('.store-sub').style.transform = 'scaleY(0)');
					})
				})(i);
			}
		},
		main_category: function() {
			let co = document.querySelector('.categories-menu');
			co.onclick = function() {
				let col = co.querySelector('.category-menu-inner');
				if(col.className == 'category-menu-inner') {
					col.classList.add('open');
				} else {
					col.classList.remove('open');
				}
				clean();
			}
			let lis = document.querySelectorAll('.category-menu-inner>ul>li:nth-child(n+1):nth-child(-n+3)');
			for(var i = 0; i < lis.length; i++) {
				(function(item) {
					let that = lis[item];
					that.onclick = function(event) {
						event.stopPropagation();
						clean();
						let innerSub = that.querySelector('.category-menu-inner-sub');
						if(innerSub.className == 'category-menu-inner-sub') {
							innerSub.classList.add('open');
						} else {
							innerSub.classList.remove('open');
						}
					}
				})(i);
			}
			//clean all
			function clean() {
				for(var i = 0; i < lis.length; i++) {
					(function(item) {
						let that = lis[item];
						let innerSub = that.querySelector('.category-menu-inner-sub');
						innerSub.classList.remove('open');
					})(i);
				}
			}
		},
		initScroll: function() {
			document.addEventListener("scroll", function() {
				var topScroll = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop; //滚动的距离,距离顶部的距离;浏览器兼容问题
				var header_bottom = document.querySelector(".header-area .header-bottom"); //获取bottom元素
				if(topScroll > 176) {
					header_bottom.classList.add('stick');
				} else {
					header_bottom.classList.remove('stick');
				}
			});
		},
		//点击立即购买按钮
		openProudct:function(){
			//弹出层           
			$(".new-product .container .row .new-product-banner .owl-item .new-product-banner-content .buyButton .btnshow").click(function(event) {
			    $('.product-detail').css('left', ($(window).width() - $('.product-detail').outerWidth()) / 2);
			    $('.product-detail').css('top', $(window).scrollTop()+100); //内容居中
			    $('.hideArea')[0].style.top= $(window).scrollTop()+'px'; //内容居中
				$(".product-detail").show(300);
				$(".hideArea")[0].style.display ="block";
			    $('body').css('overflow-y','hidden');//滚动条不能滚动
			});
			//隐藏层          
			$(".out").click(function(event) {
				$(".product-detail").hide(300);
				$(".hideArea")[0].style.display="none";
				$('body').css('overflow-y','visible');
			});
			let small_image = $('.product-detail .small-image ul li img');
		  	 for(var i=0; i<small_image.length; i++){
		  	 	(function(content,k){
		  	 		content[k].onmouseover = function(){
		  	 		    $(".product-detail .large-image img").attr("src",this.src);
		  	 		}
		  	 	})(small_image,i);
		  	 }
		},
		slider:function(){
			var count =1;
			setInterval(function(){
				var slider_one = document.querySelector(".slider-one");
				var slider_two = document.querySelector(".slider-two");
				var dot1 = document.getElementsByClassName("nav-dot")[0];
			    var dot2 = document.getElementsByClassName("nav-dot")[1];
			    if(count%2==0){
			    	slider_one.style.opacity=0;
			    	slider_two.style.opacity=1;
			    	dot1.classList.remove("active");
			    	dot2.classList.add("active");
			    	slider_two.style.left='-66px';
			    	slider_one.style.left='0';
			    }else{
			    	slider_one.style.opacity=1;
			    	slider_two.style.opacity=0;
			    	slider_one.style.left='-66px';
			    	slider_two.style.left='0';
			    	dot1.classList.add("active");
			    	dot2.classList.remove("active");
			    	count=1;
			    }
			    count++;
			},2000);
		},
		showProductList:function(){
			$(".shop-car a").click(function(){
				var display = $(".product-list .container .row").css('display');
				if(display == 'none'){
					$(".product-list .container .row").css('display','block');
				}else{
					$(".product-list .container .row").css('display','none');
				}
			});
		},
		showTrash:function(){
			$(function(){
			let content = $('.product-list .container .row .all .content .operate-area');
			for(var i=0; i<content.length; i++){
				(function(content,k){
					content[k].onmouseover=function(){
						$('.product-list .container .row .all .content .operate-area .fa.fa-trash').eq(k).css('visibility','visible');
					}
					content[k].onmouseout=function(){
						$('.product-list .container .row .all .content .operate-area .fa.fa-trash').eq(k).css('visibility','hidden');
					}
					content[k].onclick=function () {
						$('.product-list .container .row .all .content').eq(k).css("display","none");
					}
					
				})(content,i);
			}
		});
		},
		hot_product:function(){
			$('.hot-product-banner').owlCarousel({
				autoplay:!0,
				loop:!0,
				nav:!0,
				autoplayTimeout:2000,
				items:4,
				dots:!1,
				navText:['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],
				responsiveClass:!0,
				responsive:{
					0:{
						items:1
					},
					576:{
						items:2
					},
					902:{
						items:3
					},
					1200:{
						items:4
					}
				}
			});
			
		},
		new_product:function(){
			$('.new-product-banner').owlCarousel({
				autoplay:!0,
				loop:!0,
				nav:!0,
				autoplayTimeout:2000,
				items:4,
				dots:!1,
				navText:['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],
				responsiveClass:!0,
				responsive:{
					0:{
						items:1
					},
					576:{
						items:2
					},
					902:{
						items:3
					},
					1200:{
						items:4
					}
				}
			});
			
		},
	}
	shop.init();
})(window || {})