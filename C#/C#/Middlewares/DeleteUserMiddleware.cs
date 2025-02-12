using System.Security.Claims;
using C.Data;

public class DeleteUserMiddleware
{
    private readonly RequestDelegate _next;

    public DeleteUserMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        if (context.Request.Path.StartsWithSegments("/users/delete"))
        {
            var pathValue = context.Request.Path.Value;

            if (!string.IsNullOrEmpty(pathValue))
            {
                var userIdStr = pathValue.Split("/").Last();

                if (int.TryParse(userIdStr, out int userId))
                {
                    var userClaims = context.User;
                    var role = userClaims.FindFirst(ClaimTypes.Role)?.Value;
                    var userEmail = userClaims.FindFirst(ClaimTypes.Email)?.Value;

                    var userFromDb = context.RequestServices.GetRequiredService<ApplicationDbContext>()
                        .Users.SingleOrDefault(u => u.Email == userEmail);

                    if (userFromDb == null || (userFromDb.ID != userId && role != "admin"))
                    {
                        context.Response.StatusCode = StatusCodes.Status403Forbidden;
                        await context.Response.WriteAsync("Accès refusé : Vous devez être l'utilisateur lui-même ou un admin pour supprimer cet utilisateur.");
                        return;
                    }
                }
                else
                {
                    context.Response.StatusCode = StatusCodes.Status400BadRequest;
                    await context.Response.WriteAsync("L'ID utilisateur dans la route est invalide.");
                    return;
                }
            }
            else
            {
                context.Response.StatusCode = StatusCodes.Status400BadRequest;
                await context.Response.WriteAsync("Chemin de la requête invalide.");
                return;
            }
        }

        await _next(context);
    }
}
