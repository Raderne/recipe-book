using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Recipe;
using api.Helpers;
using api.Models;

namespace api.Interfaces
{
    public interface IRecipeRepository
    {
        Task<List<Recipe>> GetRecipesAsync(QueryObject query);
        Task<Recipe?> GetRecipeByIdAsync(int id);
        Task<Recipe?> CreateRecipeAsync(Recipe recipeModel);
        Task<Recipe?> UpdateRecipeAsync(int id, UpdateRecipeRequestDto recipeDto);
        Task<Recipe?> DeleteRecipeAsync(int id);
        Task<bool> RecipeExistsAsync(string title);
    }
}