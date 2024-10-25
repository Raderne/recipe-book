using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Recipe;
using api.Interfaces;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class RecipeRepository : IRecipeRepository
    {
        private readonly ApplicationDbContext _context;
        public RecipeRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Recipe?> CreateRecipeAsync(Recipe recipeModel)
        {
            await _context.Recipes.AddAsync(recipeModel);
            await _context.SaveChangesAsync();

            return recipeModel;
        }

        public async Task<Recipe?> DeleteRecipeAsync(int id)
        {
            var recipe = await _context.Recipes.FirstOrDefaultAsync(x => x.Id == id);
            if (recipe == null)
            {
                return null;
            }

            var comments = await _context.Comments.Where(x => x.RecipeId == id).ToListAsync();
            foreach (var comment in comments)
            {
                _context.Comments.Remove(comment);
            }

            _context.Recipes.Remove(recipe);
            await _context.SaveChangesAsync();

            return recipe;
        }

        public Task<Recipe?> GetRecipeByIdAsync(int id)
        {
            var recipe = _context.Recipes.Include(c => c.Comments).FirstOrDefaultAsync(x => x.Id == id);

            if (recipe == null)
            {
                return null;
            }

            return recipe;
        }

        public Task<List<Recipe>> GetRecipesAsync()
        {
            return _context.Recipes.Include(c => c.Comments).ToListAsync();
        }

        public async Task<Recipe?> UpdateRecipeAsync(int id, UpdateRecipeRequestDto recipeDto)
        {
            var recipe = await _context.Recipes.FirstOrDefaultAsync(x => x.Id == id);
            if (recipe == null)
            {
                return null;
            }

            recipe.Name = recipeDto.Name;
            recipe.Description = recipeDto.Description;
            recipe.Thumbnail_url = recipeDto.Thumbnail_url;
            recipe.Cook_time_minutes = recipeDto.Cook_time_minutes;
            recipe.Num_servings = recipeDto.Num_servings;

            await _context.SaveChangesAsync();
            return recipe;
        }
    }
}