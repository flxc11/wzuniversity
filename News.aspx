<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="News.aspx.cs" Inherits="WebSite.wzwap.News" %>

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
        var CurrentColumnId = <%=CurrentColumnId%>;
    </script>
</head>
<body>
    <uc1:left runat="server" ID="left" />
	<div id="header">
		<div class="wrap">
			<a href="/wzwap/home.html" class="menu_home"></a>
			<i class="menu_open"></i>
			<%=ParentColumn %>
		</div>
	</div>
	<div id="container" class="container-news">
		<div class="swiper-container">
			<div class="swiper-wrapper">
                <asp:Repeater ID="rpt_Column" runat="server">
                    <ItemTemplate>
				        <div class="swiper-slide" id="news">
					        <div class="title"><a href="javascript:;" data-id="<%#Eval("ColumnID") %>" <%# new WapHelper.WapHelp().ClassHover(Eval("ColumnID").ToString(), CurrentColumnId) %>><%#Eval("ColumnName") %></a></div>
				        </div>
                    </ItemTemplate>
                </asp:Repeater>
			</div>
		</div>
		<div id="slides">
            <asp:Repeater ID="rpt_picnews" runat="server">
                <ItemTemplate>
			        <dl>
				        <dt><i></i><%#Convert.ToDateTime(Eval("PostTime")).ToString("yyyy-MM-dd") %></dt>
				        <dd class="pic"><img src="<%#Eval("NewsImages").ToString().Replace("{#InstallDir}", "/") %>" alt=""></dd>
				        <dd class="txt"><a href="shownews.aspx?ID=<%#Eval("NewsID") %>"><%# GetString(Eval("NewsTitle").ToString(), 25) %></a></dd>
			        </dl>
                </ItemTemplate>
            </asp:Repeater>
		</div>
		<div class="news-list" id="news-list">
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
