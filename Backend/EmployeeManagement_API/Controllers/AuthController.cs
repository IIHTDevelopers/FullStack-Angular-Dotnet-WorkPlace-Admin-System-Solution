using EmployeeManagement_API.DAL.Admin;
using EmployeeManagement_API.Models;
using System;
using System.Linq;
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
            {
                return BadRequest("UserId and Password are required.");
            }

            var user = await _loginService.ValidateUser(model.Email, model.Password);
            if (user == null)
            {
                return Unauthorized();
            }

            // Generate a simple token (In production, use JWT)
            string token = Convert.ToBase64String(Encoding.UTF8.GetBytes($"{model.Email}:{model.Password}"));

            return Ok(new { Token = token, Message = "Login successful" });
        }
    }
}