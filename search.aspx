<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="search.aspx.cs" Inherits="WebSite.wzwap.search" %>

<%@ Register Src="~/wzwap/control/left.ascx" TagPrefix="uc1" TagName="left" %>

<!doctype html>
<html lang="en" class="loading">
<head>
	<meta charset="UTF-8">
	<title>温州大学</title>
	<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE10">
	<meta name="viewport" content="width=device-width, initial-scale=0.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">
	<link rel="stylesheet" href="style/sass.css">
	<script src="js/jquery/jquery/1.8.3/jquery.js"></script>
	<script src="js/sea.js"></script>
	<script src="js/config.js"></script>
    <script>
        var SearchKeyword = "<%=SearchKeyword%>";
    </script>
</head>
<body>
    <uc1:left runat="server" ID="left" />
	<div id="header">
		<div class="wrap">
			<a href="/wzwap/home.html" class="menu_home"></a>
			<i class="menu_open"></i>
			站内搜索
		</div>
	</div>
	<div id="container" class="container-news">
		<div class="swiper-container">
			<div class="swiper-wrapper">
                <asp:Repeater ID="rpt_Column" runat="server">
                    <ItemTemplate>
				        <div class="swiper-slide" id="news">
					        <div class="title"><a href="News.aspx?ColumnID=<%#Eval("ColumnID") %>"><%#Eval("ColumnName") %></a></div>
				        </div>
                    </ItemTemplate>
                </asp:Repeater>
			</div>
		</div>
		<div class="news-list" id="search-news">
			<ul></ul>
			<div class="list_loading"></div>
		</div>
	</div>
	<div id="loading_mask">
        <div class="loading_mask">
            <ul class="anm">
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
            </ul>
        </div>
    </div>
</body>
</html>
