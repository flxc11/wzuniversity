<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="shownews.aspx.cs" Inherits="WebSite.wzwap.shownews" %>
<%@ Import Namespace="WebSite.wzwap" %>

<%@ Register Src="~/wzwap/control/left.ascx" TagPrefix="uc1" TagName="left" %>

<!doctype html>
<html lang="en" class="loading">
<head>
	<meta charset="UTF-8">
	<title>温州大学</title>
	<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE10">
	<meta name="viewport" content="width=device-width, initial-scale=0.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">
    <meta name="viewport" content="initial-scale=1, width=device-width, maximum-scale=1, user-scalable=no, minimal-ui">
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
	<div id="container">
	    <div class="swiper-container">
			<div class="swiper-wrapper">
                <asp:Repeater ID="rpt_Column" runat="server">
                    <ItemTemplate>
				        <div class="swiper-slide">
					        <div class="title"><a href="News.aspx?ColumnID=<%#Eval("ColumnID") %>" data-id="<%#Eval("ColumnID") %>" <%# new WapHelper.WapHelp().ClassHover(Eval("ColumnID").ToString(), CurrentColumnId) %>><%#Eval("ColumnName") %></a></div>
				        </div>
                    </ItemTemplate>
                </asp:Repeater>
			</div>
		</div>
		<div class="shownews">
            <div class="cnt-shownews">
                <h1 style="text-align: center; font-size: 16px;"><%=NewsTitle %></h1>
                
                <%=NewsContent %>
            </div>
			<div class="copyright">
			    <span class="c-r">全案策划：<a href="http://www.cnvp.com.cn">捷点科技</a></span>
			    <span class="c-l">Copyright © 2014 <i style="color: #0d3973;font-style: normal;">温州大学</i></span>
		    </div>
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
