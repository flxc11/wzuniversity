using System;
using System.Collections.Generic;

using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace WebSite.wzwap
{
    using System.Collections;
    using System.Data;

    using CNVP.Framework.Helper;
    using CNVP.Framework.Utils;

    public partial class Ajax : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            Response.Buffer = true;
            Response.ExpiresAbsolute = System.DateTime.Now.AddSeconds(-1);
            Response.Expires = 0;
            Response.CacheControl = "no-cache";

            string action = Request.Params["Action"];

            switch (action)
            {
                case "Single":
                    this.GetSingle();
                    break;
                case "GetNewsList":
                    this.GetNewsList();
                    break;
                case "GetSearchList":
                    GetSearchList();
                    break;
                default:
                    break;
            }
        }

        #region  单页信息
        /// <summary>
        /// Get Single Content
        /// </summary>
        private void GetSingle()
        {
            string rslt = string.Empty;
            string columnId = Request.Params["ColumnID"];
            if (!string.IsNullOrEmpty(columnId) && Public.IsNumber(columnId))
            {
                using (DataTable dt = 
                    DbHelper.ExecuteTable(
                    "select NewsContent from CNVP_NewsContent Where NewsID=(select top 1 NewsID from CNVP_NewsInfo where ISShow=1 and ISAuditing=1 and ColumnID = " + columnId + ")"))
                {
                    if (dt != null && dt.Rows.Count > 0)
                    {
                        rslt = dt.Rows[0]["NewsContent"].ToString().Replace("{#InstallDir}", "/");
                    }
                }
            }
            Response.Write(rslt);
            Response.End();
        }
        #endregion

        #region 新闻列表
        /// <summary>
        /// News List
        /// </summary>
        private void GetNewsList()
        {
            string pageNo = Request.Params["PageNo"];
            string columnId = Request.Params["ColumnID"];
            if (string.IsNullOrEmpty(pageNo) || (!Public.IsNumber(pageNo)))
            {
                pageNo = "1";
            }
            int pageSize = 10;
            int recordCount, pageCount;
            string strWhere = " CNVP_NewsInfo Where ISShow=1 and ISAuditing=1 and ColumnID=" + columnId;

            DataTable dt = DbHelper.ExecutePage("*", strWhere, "NewsID", "Order By OrderID Desc", Convert.ToInt32(pageNo), pageSize, out recordCount, out pageCount);
            string str = string.Empty;
            ArrayList list = new ArrayList(0);

            if (dt.Rows.Count > 0)
            {

                str += "{\"Page\":\"" + pageCount + "\",\"GiftList\":[";
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    list.Add("{\"NewsID\":\"" + dt.Rows[i]["NewsID"] + "\",\"NewsTitle\":\"" + dt.Rows[i]["NewsTitle"] + "\",\"PostTime\":\"" + Convert.ToDateTime(dt.Rows[i]["PostTime"].ToString()).ToString("yyyy-MM-dd") + "\"}");
                }
                string temp = string.Join(",", (string[])list.ToArray(typeof(string)));
                str += temp;
                str += "]}";
            }
            else
            {
                str += "{\"Page\":\"0\",\"GiftList\":[]}";
            }
            Response.Write(str);
            Response.End();

        }
        #endregion

        #region 搜索列表
        /// <summary>
        /// Seardh List
        /// </summary>
        private void GetSearchList()
        {
            string pageNo = Request.Params["PageNo"];
            string keyWord = Request.Params["KeyWord"];
            if (string.IsNullOrEmpty(pageNo) || (!Public.IsNumber(pageNo)))
            {
                pageNo = "1";
            }
            int pageSize = 10;
            int recordCount, pageCount;
            string strWhere = " CNVP_NewsInfo Where ISShow=1 and ISAuditing=1 and NewsTitle like '%" + keyWord + "%'";

            DataTable dt = DbHelper.ExecutePage("*", strWhere, "NewsID", "Order By OrderID Desc", Convert.ToInt32(pageNo), pageSize, out recordCount, out pageCount);
            string str = string.Empty;
            ArrayList list = new ArrayList(0);

            if (dt.Rows.Count > 0)
            {

                str += "{\"Page\":\"" + pageCount + "\",\"GiftList\":[";
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    list.Add("{\"NewsID\":\"" + dt.Rows[i]["NewsID"] + "\",\"NewsTitle\":\"" + dt.Rows[i]["NewsTitle"].ToString().Replace(keyWord, "<em style='color:red;font-style:normal;'>" + keyWord + "</em>") + "\",\"PostTime\":\"" + Convert.ToDateTime(dt.Rows[i]["PostTime"].ToString()).ToString("yyyy-MM-dd") + "\"}");
                }
                string temp = string.Join(",", (string[])list.ToArray(typeof(string)));
                str += temp;
                str += "]}";
            }
            else
            {
                str += "{\"Page\":\"0\",\"GiftList\":[]}";
            }
            Response.Write(str);
            Response.End();

        }
        #endregion
    }
}