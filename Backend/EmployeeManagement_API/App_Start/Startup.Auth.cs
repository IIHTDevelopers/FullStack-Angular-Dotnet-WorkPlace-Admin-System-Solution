using Microsoft.IdentityModel.Tokens;
using Microsoft.Owin;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.Jwt;
using Owin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;

[assembly: OwinStartup(typeof(EmployeeManagement_API.App_Start.Startup))]
namespace EmployeeManagement_API.App_Start
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            var issuer = "techacdemy.com";
            var audience = "https://localhost:44318";
            var secretKey = Encoding.UTF8.GetBytes("YourSuperLongSecretKey_ChangeThis123456789");

            app.UseJwtBearerAuthentication(new JwtBearerAuthenticationOptions
            {
                AuthenticationMode = AuthenticationMode.Active,
                TokenValidationParameters = new TokenValidationParameters
                {
                    ValidIssuer = issuer,
                    ValidAudience = audience,
                    IssuerSigningKey = new SymmetricSecurityKey(secretKey),
                    ValidateIssuerSigningKey = true,
                    ValidateLifetime = true,
                    ValidateIssuer = true,
                    ValidateAudience = true
                }
            });
        }
    }
}