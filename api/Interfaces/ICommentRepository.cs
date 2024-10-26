using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Comment;
using api.Models;

namespace api.Interfaces
{
    public interface ICommentRepository
    {
        Task<List<Comment>> GetCommentsAsync(int postId);
        Task<Comment?> GetCommentByIdAsync(int id);
        Task<Comment?> CreateCommentAsync(Comment comment);
        Task<Comment?> UpdateCommentAsync(int id, UpdateCommentRequestDto updateCommentDto);
        Task<bool> DeleteCommentAsync(int id);
    }
}