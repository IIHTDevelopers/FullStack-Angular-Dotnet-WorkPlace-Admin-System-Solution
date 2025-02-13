using EmployeeManagement_API.DAL.Admin;
using EmployeeManagement_API.Models;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

namespace EmployeeManagement_API.Controllers
{
    [RoutePrefix("api/auth")]
    public class AuthController : ApiController
    {
        private readonly IEmployeeLoginService _loginService;

        public AuthController(IEmployeeLoginService loginService)
        {
            _loginService = loginService;
        }

        [HttpPost]
        [Route("login")]
        public async Task<IHttpActionResult> Login([FromBody] EmployeeLogin model)
        {
            if (model == null || string.IsNullOrEmpty(model.Email) || string.IsNullOrEmpty(model.Password))
                return BadRequest("Email and Password are required.");

            // Verify user from database
            var user = await _loginService.ValidateUser(model.Email, model.Password);
            if (user == null)
                return Unauthorized(); // 401 Unauthorized

            // Generate JWT Token
            var token = _loginService.GenerateJwtToken(user.Email);
            return Ok(new { Token = token, Message = "Login successful" });

        }
    }
}