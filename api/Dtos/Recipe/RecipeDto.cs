using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Comment;

namespace api.Dtos.Recipe
{
    public class RecipeDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Thumbnail_url { get; set; } = string.Empty;
        public int Cook_time_minutes { get; set; } = 0;
        public int Num_servings { get; set; } = 0;
        public List<CommentDto> Comments { get; set; } = new List<CommentDto>();
    }
}