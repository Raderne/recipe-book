using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Interfaces;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class CommentRepository : ICommentRepository
    {
        private readonly ApplicationDbContext _context;
        public CommentRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public Task<List<Comment>> GetCommentsAsync()
        {
            var comments = _context.Comments.ToListAsync();
            if (comments == null)
            {
                throw new Exception("No comments found");
            }

            return comments;
        }
    }
}