function GetSingle(columnId) {
    $.ajax({
        url: '/wzwap/Ajax.aspx?Time=' + new Date().getTime(),
        type: 'POST',
        dataType: 'html',
        data: {
            ColumnID: columnId,
            Action: "Single"
        },
        beforeSend: function() {
            $(".about").html('<div><img src="images/Loading.gif" /></div>');
        }
    })
    .progress(function(){
        $(".about").html('<div><img src="images/Loading.gif" /></div>');
    })
    .done(function(d) {
        $(".about").html(d.replace('{#InstallDir}', '/'));
    })
    .fail(function() {
        alert("数据获取失败，请刷洗重新获取");
    })
    .always(function() {
        //console.log("complete");
    });
}

function GetNewsList(columnId) {
    loading = false;
    curpage = 0;
    //window.curpage = curpage;
    pagecount = "";
    //window.pagecount = pagecount;
    loadMore(columnId);
    $(".container-news").scroll(function () {
        // 当滚动到最底部以上100像素时， 加载新内容
        if ($(".news-list").height() - $(".container-news").scrollTop()< 500 && curpage != pagecount && !loading) {
            loading = true;
            loadMore(columnId);
        }
    });
}
function loadMore(columnId) {
    $.ajax({
        url: '/wzwap/Ajax.aspx?Time=' + new Date().getTime(),
        Type: 'post',
        dataType: 'html',
        data: {
            PageNo: ++curpage,
            Action: "GetNewsList",
            ColumnID: columnId
        },
        beforeSend: function () {
            //setTimeout($(".news-list ul").append('<li class="loading1">努力加载中</li>'),5000)
            //$(".list_loading").html('<i></i><span>努力加载中...</span>');
        },
        success: function (json) {
            var d = eval("(" + json + ")");
            pagecount = d.Page;
            if (curpage > d.Page) {
                return false;
            } else {
                if (d.GiftList.length > 0) {
                    var Html = "";
                    $.each(d.GiftList, function (idx, item) {
                        //Html += '<li><span><i></i>' + item.PostTime + '</span><a href="wapshow_' + item.NewsID + '.aspx">' + item.NewsTitle + '</a></li>';
                        Html += '<li><div><span><i></i>' + item.PostTime + '</span><a href="shownews.aspx?ID=' + item.NewsID + '">' + item.NewsTitle + '</a></div></li>';
                    })
                }
                var $Html = $(Html).hide();
                //$(".news-list ul li.loading1").remove()
                $(".news-list ul").append($Html);
                $Html.fadeIn();
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.status);
            alert(XMLHttpRequest.readyState);
            alert(textStatus);
        },
        complete: function () {
            loading = false;
        }
    })
}

function GetSearchList(keyWord) {
    loading = false;
    curpage = 0;
    //window.curpage = curpage;
    pagecount = "";
    //window.pagecount = pagecount;
    SearchMore(keyWord);
    $(".container-news").scroll(function () {
        // 当滚动到最底部以上100像素时， 加载新内容
        if ($(".news-list").height() - $(".container-news").scrollTop()< 500 && curpage != pagecount && !loading) {
            loading = true;
            SearchMore(keyWord);
        }
    });
}
function SearchMore(keyWord) {
    $.ajax({
        url: '/wzwap/Ajax.aspx?Time=' + new Date().getTime(),
        Type: 'post',
        dataType: 'html',
        data: {
            PageNo: ++curpage,
            Action: "GetSearchList",
            KeyWord: keyWord
        },
        beforeSend: function () {
            //setTimeout($(".news-list ul").append('<li class="loading1">努力加载中</li>'),5000)
            //$(".list_loading").html('<i></i><span>努力加载中...</span>');
        },
        success: function (json) {
            var d = eval("(" + json + ")");
            pagecount = d.Page;
            if (curpage > d.Page) {
                return false;
            } else {
                if (d.GiftList.length > 0) {
                    var Html = "";
                    $.each(d.GiftList, function (idx, item) {
                        //Html += '<li><span><i></i>' + item.PostTime + '</span><a href="wapshow_' + item.NewsID + '.aspx">' + item.NewsTitle + '</a></li>';
                        Html += '<li><div><span><i></i>' + item.PostTime + '</span><a href="shownews.aspx?ID=' + item.NewsID + '">' + item.NewsTitle + '</a></div></li>';
                    })
                }
                var $Html = $(Html).hide();
                //$(".news-list ul li.loading1").remove()
                $(".news-list ul").append($Html);
                $Html.fadeIn();
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.status);
            alert(XMLHttpRequest.readyState);
            alert(textStatus);
        },
        complete: function () {
            loading = false;
        }
    })
}