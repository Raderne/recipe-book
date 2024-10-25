using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Recipe;
using api.Models;

namespace api.Mappers
{
    public static class RecipeMapper
    {
        public static RecipeDto ToRecipeDto(this Recipe recipe)
        {
            return new RecipeDto
            {
                Id = recipe.Id,
                Name = recipe.Name,
                Description = recipe.Description,
                Thumbnail_url = recipe.Thumbnail_url,
                Cook_time_minutes = recipe.Cook_time_minutes,
                Num_servings = recipe.Num_servings,
                Comments = recipe.Comments.Select(c => c.ToCommentDto()).ToList()
            };
        }
    }
}