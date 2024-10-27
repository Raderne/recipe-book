using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Recipe;
using api.Extensions;
using api.Helpers;
using api.Interfaces;
using api.Mappers;
using api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [Route("api/recipe")]
    [ApiController]
    public class RecipeController : ControllerBase
    {
        private readonly IRecipeRepository _recipeRepo;
        private readonly UserManager<AppUser> _userManager;
        public RecipeController(IRecipeRepository recipeRepo, UserManager<AppUser> userManager)
        {
            _recipeRepo = recipeRepo;
            _userManager = userManager;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetRecipes([FromQuery] QueryObject query)
        {
            var recipes = await _recipeRepo.GetRecipesAsync(query);
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


            var username = User.GetUserName();
            var user = await _userManager.FindByNameAsync(username);
            if (user == null)
                return NotFound("User not found");

            Console.WriteLine("<>>>>>>>>>>>>>>>>> user id" + user.Id);

            if (await _recipeRepo.RecipeExistsAsync(recipeDto.Name, user.Id))
            {
                return BadRequest("Recipe already exists");
            }

            var recipeModel = recipeDto.ToRecipeFromCreate(user.Id);
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