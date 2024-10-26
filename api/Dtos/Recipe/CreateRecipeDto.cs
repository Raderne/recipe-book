using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Recipe
{
    public class CreateRecipeDto
    {
        [Required]
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Thumbnail_url { get; set; } = string.Empty;
        public int Cook_time_minutes { get; set; } = 0;
        public int Num_servings { get; set; } = 0;
        public int TastyApiId { get; set; }
    }
}