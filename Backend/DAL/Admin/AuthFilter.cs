using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web;
using System.Web.Http;
using System.Web.Http.Controllers;

namespace EmployeeManagement_API.DAL.Admin
{
    public class AuthFilter : AuthorizeAttribute
    {
        protected override bool IsAuthorized(HttpActionContext actionContext)
        {
            var request = actionContext.Request;
            if (!request.Headers.Authorization?.Scheme.Equals("Basic", StringComparison.OrdinalIgnoreCase) ?? true)
            {
                return false;
            }

            string authHeader = request.Headers.Authorization.Parameter;
            if (string.IsNullOrEmpty(authHeader))
            {
                return false;
            }

            string decodedAuth = Encoding.UTF8.GetString(Convert.FromBase64String(authHeader));
            string[] userCredentials = decodedAuth.Split(':');
            if (userCredentials.Length != 2) return false;

            string emailId = userCredentials[0];
            string password = userCredentials[1];

            // Check user authentication in DB (Service call)
            using (var db = new ApplicationDbContext())
            {
                var userExists = db.EmployeeLogins.Any(u => u.Email == emailId && u.Password == password);
                return userExists;
            }
        }

        protected override void HandleUnauthorizedRequest(HttpActionContext actionContext)
        {
            actionContext.Response = actionContext.Request.CreateResponse(HttpStatusCode.Unauthorized, "Unauthorized Access");
        }
    }

}