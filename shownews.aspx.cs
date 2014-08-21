using System;
using System.Collections.Generic;

using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace WebSite.wzwap
{
    using System.Data;

    using CNVP.Framework.Helper;
    using CNVP.Framework.Utils;

    using WapHelper;

    /// <summary>
    /// Show News
    /// </summary>
    public partial class shownews : System.Web.UI.Page
    {
        /// <summary>
        /// Parent ColumnName
        /// </summary>
        public string ParentColumn, CurrentColumnId, NewsContent, NewsTitle = string.Empty;

        /// <summary>
        /// Show News
        /// </summary>
        /// <param name="sender">sender s</param>
        /// <param name="e">e e</param>
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!this.IsPostBack)
            {
                WapHelp wapHelp = new WapHelp();
                string newsId = Public.FilterSql(Request.Params["ID"]);
                if (!string.IsNullOrEmpty(newsId) && Public.IsNumber(newsId))
                {
                    this.CurrentColumnId = wapHelp.GetColumnId(newsId);

                    // 获取父级栏目名称
                    this.ParentColumn = wapHelp.GetParentColumn(this.CurrentColumnId);

                    // 当前同级栏目列表
                    this.rpt_Column.DataSource = wapHelp.ColumnList(this.CurrentColumnId);
                    this.rpt_Column.DataBind();

                    // 文章标题
                    using (DataTable dt = DbHelper.ExecuteTable("select NewsTitle from CNVP_NewsInfo where NewsID=" + newsId))
                    {
                        if (dt != null && dt.Rows.Count > 0)
                        {
                            this.NewsTitle = dt.Rows[0]["NewsTitle"].ToString();
                        }
                    }

                    // 文章内容
                    using (DataTable dt = DbHelper.ExecuteTable("select NewsContent from CNVP_NewsContent where NewsID=" + newsId))
                    {
                        if (dt != null && dt.Rows.Count > 0)
                        {
                            this.NewsContent = dt.Rows[0]["NewsContent"].ToString().Replace("{#InstallDir}", "/");
                        }
                    }
                }
            }
        }
    }
}