<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="AboutUs.aspx.cs" Inherits="WebSite.wzwap.AboutUs" %>

<%@ Register Src="~/wzwap/control/left.ascx" TagPrefix="uc1" TagName="left" %>


<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta charset="UTF-8" />
<title>温州大学</title>
<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE10" />
<meta name="viewport" content="width=device-width, initial-scale=0.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0" />
<link rel="stylesheet" href="style/sass.css" />
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
				        <div class="swiper-slide" id="aboutus">
					        <div class="title"><a href="javascript:;" data-id="<%#Eval("ColumnID") %>" <%# new WapHelper.WapHelp().ClassHover(Eval("ColumnID").ToString(), CurrentColumnId) %>><%#Eval("ColumnName") %></a></div>
				        </div>
                    </ItemTemplate>
                </asp:Repeater>
			</div>
		</div>
		<div class="shownews">
            <div class="about"></div>
			<div class="copyright">
			<span class="c-r">全案策划：<a href="http://www.cnvp.com.cn">捷点科技</a></span>
			<span class="c-l">Copyright © 2014 <i style="color: #0d3973;font-style: normal;">温州大学</i></span>
		</div>
		</div>

	</div>
</body>
</html>
