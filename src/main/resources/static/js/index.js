var totalRecord, currentPage;

//????????????Ajax?????????
 $(function() {
 	// ???
  to_page(1);
});

// ??????
function to_page(pn) {
  $.ajax({
    url: "${APP_PATH}/articles",
    data: "pn="+pn,
    type: "GET",
    success: function(result) {
        // ??????
     	build_article_table(result);
        // ??????
     	build_page_info(result);
        // ?????
     	build_page_nav(result);  	
    }
  });
}

function build_article_table(result) {
    // ????
        $("#articlelist").empty();
   
        var articles = result.extend.pageInfo.list;
    // ???????????????
        $.each(articles, function(index, item) {
         /*    var articleId = $("<td></td>").append(item.id);
	            var categoryName = $("<td></td>").append(item.category.name);
	            var articleTitle = $("<td></td>").append(item.title);
	            var articleTitleIntro = $("<td></td>").append(item.titleintro);
	            var articleDate = $("<td></td>").append(item.createdtime); */
			
			 /*  <li class="list-group-item">New <span class="badge">12</span></li>
			  <li class="list-group-item">Deleted <span class="badge">5</span></li> 
			  <li class="list-group-item">Warnings <span class="badge">3</span></li>    */
			  var aEle = $("<a></a>");
			  var li = $("<li></li>").addClass("list-group-item")
			  .css("word-wrap","break-word").css("word-break","break-all").css("overflow","hidden");
			  li.append(item.titleintro);
			
			  aEle.addClass("list-group-item active");
			  $("<h2></h2>").addClass("list-group-item-heading").append(item.title).appendTo(aEle);
			  
			  $("<span></span>").addClass("badge").append(parseDateNormal(item.createdtime)).appendTo(li);
			  $("<span></span>").addClass("badge").append(item.category.name).appendTo(li);
			  aEle.attr("href", "${APP_PATH}/showarticle?id="+item.id);
			  aEle.appendTo("#articlelist");
			  li.appendTo("#articlelist");
			  $("#articlelist").append($("<br>"));  
		});
}

//??????
function build_page_info(result) {
    //????
	$("#page_info_area").empty();
	//alert("hello");
	$("#page_info_area").append("当前 " + 
			result.extend.pageInfo.pageNum + " ??? " +
			result.extend.pageInfo.pages + " ??? " +
			result.extend.pageInfo.total + " ???");
	totalRecord = result.extend.pageInfo.total;
	currentPage = result.extend.pageInfo.pageNum;
}

//?????
function build_page_nav(result) {
	//清空数据
	$("#page_nav_area").empty();
	//page_nav_area
	var ul = $("<ul></ul>").addClass("pagination");
	var firstPageLi = $("<li></li>").append($("<a></a>").append("首页").attr("href","#"));
	var prePageLi = $("<li></li>").append($("<a></a>").append("&laquo;"));
	if(result.extend.pageInfo.hasPreviousPage == false) {
		firstPageLi.addClass("disabled");
		prePageLi.addClass("disabled");
	} else {
		//添加首页、前一页的点击
		firstPageLi.click(function() {
			to_page(1);
		});
		
		prePageLi.click(function() {
			to_page(result.extend.pageInfo.pageNum - 1);
		});
	}
	
	var nextPageLi = $("<li></li>").append($("<a></a>").append("&raquo;"));
	var lastPageLi = $("<li></li>").append($("<a></a>").append("末页").attr("href","#"));
	
	if(result.extend.pageInfo.hasNextPage == false) {
		nextPageLi.addClass("disabled");
		lastPageLi.addClass("disabled");
	} else {
		//添加末页、下一页的点击
		nextPageLi.click(function() {
			to_page(result.extend.pageInfo.pageNum + 1);
		});
		
		lastPageLi.click(function() {
			to_page(result.extend.pageInfo.pages);
		});
	}
	
		
		ul.append(firstPageLi).append(prePageLi);
		
		$.each(result.extend.pageInfo.navigatepageNums,function(index, item){
			var numLi = $("<li></li>").append($("<a></a>").append(item));
			if(result.extend.pageInfo.pageNum == item) {
				numLi.addClass("active");
			}
			
			numLi.click(function(){
				to_page(item);	
			});
			
			ul.append(numLi);
		});
		ul.append(nextPageLi).append(lastPageLi);
		
		var navEle = $("<nav></nav>").append(ul);
		navEle.appendTo("#page_nav_area");
}
	
function parseDateNormal(dateStr) {
	// 比如需要这样的格式 yyyy-MM-dd hh:mm:ss
	var date = new Date(dateStr);
	Y = date.getFullYear() + '-';
	M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
	D = date.getDate() + ' ';
	//h = date.getHours() + ':';
	//m = date.getMinutes() + ':';
	//s = date.getSeconds(); 
	return (Y+M+D); 
}