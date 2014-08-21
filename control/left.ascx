<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="left.ascx.cs" Inherits="WebSite.wzwap.control.left" %>
<div id="menu">
	<div class="search_wrap">
		<form action="search.aspx" name="form1" method="post">
			<input type="text" name="keyWord" id="keyWord" class="search_input" placeholder="Search">
			<i class="reset_input"><i></i></i>
		</form>
	</div>
	<ul>
		<li class="nav_about menu_cur"><a href="AboutUs.aspx"><i></i><span>学校概况</span><b></b><div class="clear"></div></a></li>
		<li class="nav_news"><a href="News.aspx"><i></i><span>新闻中心</span><b></b><div class="clear"></div></a></li>
		<li class="nav_recruit"><a href="AboutUs.aspx?ColumnID=40"><i></i><span>人才培养</span><b></b><div class="clear"></div></a></li>
		<li class="nav_scuebce"><a href="AboutUs.aspx?ColumnID=52"><i></i><span>学科建设</span><b></b><div class="clear"></div></a></li>
		<li class="nav_culture"><a href="AboutUs.aspx?ColumnID=56"><i></i><span>校园文化</span><b></b><div class="clear"></div></a></li>
		<li class="nav_cooper"><a href="AboutUs.aspx?ColumnID=61"><i></i><span>合作交流</span><b></b><div class="clear"></div></a></li>
		<li class="nav_service"><a href="AboutUs.aspx?ColumnID=106"><i></i><span>信息服务</span><b></b><div class="clear"></div></a></li>
	</ul>
</div>