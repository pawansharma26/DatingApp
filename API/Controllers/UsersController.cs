using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class UsersController : BaseApiController
    {
        private readonly DataContext _context;
        public UsersController(DataContext context)
        {
            _context = context;

        }
        // [HttpGet]
        // public ActionResult<IEnumerable<AppUser>> GetUser()
        // {
        //     var users = _context.users.ToList();
        //     return users;
        // }
        //    [HttpGet("{id}")]
        // public ActionResult<AppUser> GetUser(int id)
        // {
        //     var users = _context.users.Find(id);
        //     return users;
        // }
        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AppUser>>> GetUser()
        {
            var users = await _context.users.ToListAsync();
            return users;
        }

        [Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult<AppUser>> GetUser(int id)
        {
            var users = await _context.users.FindAsync(id);
            return users;
        }
    }
}