using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Comment;
using api.Extensions;
using api.Interfaces;
using api.Mappers;
using api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/comment")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly ICommentRepository _commentRepo;
        private readonly UserManager<AppUser> _userManager;
        private readonly IRecipeRepository _recipeRepo;
        public CommentController(ICommentRepository commentRepo, UserManager<AppUser> userManager, IRecipeRepository recipeRepo)
        {
            _commentRepo = commentRepo;
            _userManager = userManager;
            _recipeRepo = recipeRepo;
        }

        [HttpGet("{postId:int}")]
        public async Task<IActionResult> GetComments([FromRoute] int postId)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var comments = await _commentRepo.GetCommentsAsync(postId);
            var commentsDto = comments.Select(c => c.ToCommentDto()).ToList();

            return Ok(commentsDto);
        }

        [HttpGet("{id}")]
        [Authorize]
        public async Task<IActionResult> GetCommentById(int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var comment = await _commentRepo.GetCommentByIdAsync(id);
            if (comment == null)
            {
                return NotFound();
            }

            return Ok(comment.ToCommentDto());
        }

        [HttpPost("{id:int}")]
        [Authorize]
        public async Task<IActionResult> CreateComment([FromRoute] int id, [FromBody] CreateCommentRequestDto createCommentDto)
        {
            if (!ModelState.IsValid)
                BadRequest(ModelState);

            var username = User.GetUserName();
            var user = await _userManager.FindByNameAsync(username);
            if (user == null)
            {
                return NotFound("User not found");
            }

            var isRecipeExists = await _recipeRepo.RecipeExistsByIdAsync(id);
            if (!isRecipeExists)
            {
                id = 4;
            }

            var comment = createCommentDto.ToCommentFromCreate(id);
            comment.AppUserId = user.Id;

            await _commentRepo.CreateCommentAsync(comment);

            return CreatedAtAction(nameof(GetCommentById), new { id = comment.Id }, comment.ToCommentDto());
        }

        [HttpPut("{id:int}")]
        [Authorize]
        public async Task<IActionResult> UpdateComment([FromRoute] int id, [FromBody] UpdateCommentRequestDto updateCommentDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var updatedComment = await _commentRepo.UpdateCommentAsync(id, updateCommentDto);
            if (updatedComment == null)
            {
                return NotFound();
            }

            return Ok(updatedComment.ToCommentDto());
        }

        [HttpDelete("{id:int}")]
        [Authorize]
        public async Task<IActionResult> DeleteComment([FromRoute] int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var deleted = await _commentRepo.DeleteCommentAsync(id);
            if (!deleted)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}