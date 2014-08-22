define(function(require){
    var util = require("Public/util.js");
    require("slidesjs");
	require("swiper");
    require("waphelp");
    $(function(){
        //新闻业滚动图片
        $('#slides').slidesjs({
            width: 280,
            height: 80,
            navigation: false,
            play: {
                auto: true
            }
        });

        //新闻栏目滚动
        new Swiper('.swiper-container',{
            paginationClickable: true,
            slidesPerView: 4
        })

        //左边侧栏
        var touchEnd;
        var dd=0;
        $('.menu_open').bind('click',function(e){
            if($('#container').hasClass('pull')==false){
                if(dd==0){
                    $('#container,#menu,#header,#footer').addClass('push');
                    dd=1;
                    $(window).bind('touchmove',function(e){
                        e.preventDefault();
                        e.stopImmediatePropagation();
                    });
                    $('#us_panel').addClass('hide');
                }else{
                    $('#container,#menu,#header,#footer').removeClass('push');dd=0;$(window).unbind('touchmove');
                };
            }
            return false;
        });

        //首页
        $(".logo").animate({
            'margin-bottom': '-25px',
            'opacity': 1
        },
            1000
        );

        //单页加载
        if ($(".about")[0]) {
            GetSingle(CurrentColumnId);
        };

        $(".list_loading").html('<i></i><span>努力加载中...</span>');
        // 新闻加载
        if ($("#news-list")[0]) {
            GetNewsList(CurrentColumnId);
        };

        //搜索加载
        if ($("#search-news")[0]) {
            console.log(SearchKeyword);
            GetSearchList(SearchKeyword);
        };

        //加载内容
        $(".swiper-slide a").on("click", function() {
            var colId = $(this).attr("data-id");
            $(this).addClass('hover')
            .parents(".swiper-slide").siblings().find("a")
            .removeClass('hover');
        });

        $("#aboutus a").on("click", function() {
            var colId = $(this).attr("data-id");
            GetSingle(colId);
        });

        $("#news a").on("click", function() {
            $("#slides").hide();
            var colId = $(this).attr("data-id");
            $(".news-list ul").html('');
            if (colId == '85') {
                $("#slides").show();
            };
            GetNewsList(colId);
        });

        if ($("#news")[0]) {
            $("#slides").hide();
            if (CurrentColumnId == '85') {
                $("#slides").show();
            };
        };
    });
})