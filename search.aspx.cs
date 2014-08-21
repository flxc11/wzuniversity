using System;
using System.Collections.Generic;

using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace WebSite.wzwap
{
    using CNVP.Framework.Utils;

    using WapHelper;

    public partial class search : System.Web.UI.Page
    {
        /// <summary>
        /// Parent Column
        /// </summary>
        public string CurrentColumnId, SearchKeyword = string.Empty;

        /// <summary>
        /// Search List
        /// </summary>
        /// <param name="sender">sender s</param>
        /// <param name="e">e e</param>
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!this.IsPostBack)
            {
                this.SearchKeyword = Request.Params["keyWord"];
                WapHelp wapHelp = new WapHelp();

                // 当前同级栏目列表
                this.rpt_Column.DataSource = wapHelp.ColumnList("85");
                this.rpt_Column.DataBind();
            }
        }
    }
}