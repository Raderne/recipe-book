using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Interfaces;
using api.Mappers;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/recipe")]
    [ApiController]
    public class RecipeController : ControllerBase
    {
        private readonly IRecipeRepository _recipeRepo;
        public RecipeController(IRecipeRepository recipeRepo)
        {
            _recipeRepo = recipeRepo;
        }

        [HttpGet]
        public async Task<IActionResult> GetRecipes()
        {
            var recipes = await _recipeRepo.GetRecipesAsync();
            var recipesDto = recipes.Select(r => r.ToRecipeDto()).ToList();
            return Ok(recipesDto);
        }
    }
}