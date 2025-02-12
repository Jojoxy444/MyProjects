using System.Security.Claims;

namespace ECommerce.Middlewares
{
    public class AdminRoleMiddleware
    {
        private readonly RequestDelegate _next;

        public AdminRoleMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            if (context.Request.Path.StartsWithSegments("/api/products") &&
                (context.Request.Method == HttpMethods.Post || context.Request.Method == HttpMethods.Put || context.Request.Method == HttpMethods.Delete))
            {
                var user = context.User;
                var role = user.FindFirst(ClaimTypes.Role)?.Value;

                if (role != "Administrateur")
                {
                    context.Response.StatusCode = StatusCodes.Status403Forbidden;
                    await context.Response.WriteAsync("Accès refusé : Vous devez être un administrateur pour effectuer ces changements.");
                    return;
                }
            }

            await _next(context);
        }
    }
}
