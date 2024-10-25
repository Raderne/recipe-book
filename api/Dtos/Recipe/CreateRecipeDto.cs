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
        [MaxLength(100, ErrorMessage = "Name cannot exceed 100 characters")]
        public string Name { get; set; } = string.Empty;
        [Required]
        [MinLength(10, ErrorMessage = "Description must be at least 10 characters")]
        public string Description { get; set; } = string.Empty;
        [Required]
        public string Thumbnail_url { get; set; } = string.Empty;
        [Required]
        [Range(1, 1000, ErrorMessage = "Prep time must be between 1 and 1000 minutes")]
        public int Cook_time_minutes { get; set; } = 0;
        [Required]
        [Range(1, 100, ErrorMessage = "Number of servings must be between 1 and 100")]
        public int Num_servings { get; set; } = 0;
    }
}