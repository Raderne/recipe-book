using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    [Table("Recipes")]
    public class Recipe
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Thumbnail_url { get; set; } = string.Empty;
        public int Cook_time_minutes { get; set; } = 0;
        public int Num_servings { get; set; } = 0;
        public int TastyApiId { get; set; }
        public string AppUserId { get; set; }
        public AppUser AppUser { get; set; }
        public List<Comment> Comments { get; set; } = new List<Comment>();

    }
}