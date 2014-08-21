using System;
using System.Collections.Generic;

using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace WebSite.wzwap
{
    using CNVP.Framework.Helper;
    using CNVP.Framework.Utils;

    using WapHelper;

    /// <summary>
    /// News List
    /// </summary>
    public partial class News : System.Web.UI.Page
    {
        /// <summary>
        /// Parent Column
        /// </summary>
        public string ParentColumn, CurrentColumnId = string.Empty;

        /// <summary>
        /// News List
        /// </summary>
        /// <param name="sender">sender s</param>
        /// <param name="e">e e</param>
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!this.IsPostBack)
            {
                WapHelp wapHelp = new WapHelp();
                string columnId = Public.FilterSql(Request.Params["ColumnID"]);
                if (string.IsNullOrEmpty(columnId) || !Public.IsNumber(columnId))
                {
                    columnId = "85";
                }
                this.CurrentColumnId = columnId;

                // 获取父级栏目名称
                this.ParentColumn = wapHelp.GetParentColumn(columnId);

                // 当前同级栏目列表
                this.rpt_Column.DataSource = wapHelp.ColumnList(columnId);
                this.rpt_Column.DataBind();

                // 图片新闻
                this.rpt_picnews.DataSource =
                    DbHelper.ExecuteTable(
                        "select top 5 * from CNVP_NewsInfo where ColumnID=85 and  ISShow=1 and ISAuditing=1 and ISImages=1 order by OrderID Desc");
                this.rpt_picnews.DataBind();
            }
        }
    }
}