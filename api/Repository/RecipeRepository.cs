using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Recipe;
using api.Helpers;
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

        public async Task<Recipe?> GetRecipeByIdAsync(int id)
        {
            var recipe = await _context.Recipes.Include(c => c.Comments).ThenInclude(u => u.AppUser).FirstOrDefaultAsync(x => x.Id == id);

            if (recipe == null)
            {
                return null;
            }

            return recipe;
        }

        public async Task<List<Recipe>> GetRecipesAsync(QueryObject query)
        {
            var recipes = _context.Recipes.Include(c => c.Comments).ThenInclude(u => u.AppUser).AsQueryable();

            if (query.userId != null)
            {
                recipes = recipes.Where(x => x.AppUserId == query.userId);
            }

            return await recipes.ToListAsync();
        }

        public async Task<bool> RecipeExistsAsync(string title, string userId)
        {
            return await _context.Recipes.AnyAsync(x => x.Name == title && x.AppUserId == userId);
        }

        public async Task<bool> RecipeExistsByIdAsync(int recipeId)
        {
            return await _context.Recipes.AnyAsync(x => x.Id == recipeId);
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