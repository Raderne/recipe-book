using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Recipe;
using api.Interfaces;
using api.Mappers;
using Microsoft.AspNetCore.Authorization;
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

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetRecipeById(int id)
        {
            var recipe = await _recipeRepo.GetRecipeByIdAsync(id);
            if (recipe == null)
            {
                return NotFound("Recipe not found");
            }

            return Ok(recipe.ToRecipeDto());
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> CreateRecipe([FromBody] CreateRecipeDto recipeDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var recipeModel = recipeDto.ToRecipeFromCreate();
            await _recipeRepo.CreateRecipeAsync(recipeModel);

            return CreatedAtAction(nameof(GetRecipeById), new { id = recipeModel.Id }, recipeModel.ToRecipeDto());
        }

        [HttpPut("{id:int}")]
        [Authorize]
        public async Task<IActionResult> UpdateRecipe([FromRoute] int id, [FromBody] UpdateRecipeRequestDto recipeDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var updateRecipe = await _recipeRepo.UpdateRecipeAsync(id, recipeDto);

            if (updateRecipe == null)
            {
                return NotFound("Recipe not found");
            }

            return Ok(updateRecipe.ToRecipeDto());
        }

        [HttpDelete("{id:int}")]
        [Authorize]
        public async Task<IActionResult> DeleteRecipe(int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var recipe = await _recipeRepo.DeleteRecipeAsync(id);
            if (recipe == null)
            {
                return NotFound("Recipe not found");
            }

            return NoContent();
        }
    }
}