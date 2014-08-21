using System;
using System.Collections.Generic;

using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using CNVP.Framework.Utils;

using WapHelper;

namespace WebSite.wzwap
{
    

    /// <summary>
    /// About Us
    /// </summary>
    public partial class AboutUs : System.Web.UI.Page
    {
        /// <summary>
        /// Parent ColumnName
        /// </summary>
        public string ParentColumn, CurrentColumnId = string.Empty;

        /// <summary>
        /// About Us
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
                    columnId = "24";
                }
                this.CurrentColumnId = columnId;

                // 获取父级栏目名称
                this.ParentColumn = wapHelp.GetParentColumn(columnId);  

                // 当前同级栏目列表
                this.rpt_Column.DataSource = wapHelp.ColumnList(columnId);
                this.rpt_Column.DataBind();
            }
        }
    }
}