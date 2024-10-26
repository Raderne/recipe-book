using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Comment
{
    public class CreateCommentRequestDto
    {
        [Required]
        [MinLength(1, ErrorMessage = "Title must be at least 1 character")]
        [MaxLength(100, ErrorMessage = "Title must be at most 100 characters")]
        public string Title { get; set; } = string.Empty;
        [Required]
        [MinLength(1, ErrorMessage = "Content must be at least 1 character")]
        [MaxLength(1000, ErrorMessage = "Content must be at most 1000 characters")]
        public string Content { get; set; } = string.Empty;
        [Required]
        public int TastyApiId { get; set; }
    }
}