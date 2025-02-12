using Microsoft.AspNetCore.Mvc;

namespace NomDuProjet.Controllers
{
    [ApiController]
    [Route("home")]
    public class HomeController : ControllerBase
    {
        [HttpGet("hello")]
        public IActionResult GetHelloWorld()
        {
            var response = new { etna = "Hello World" };
            return Ok(response);
        }
    }
}
