using AutoMapper;
using Persistence;
using Microsoft.EntityFrameworkCore;
using Application.Interfaces;
using Domain;

using System.Threading;
using System.Threading.Tasks;
using System.Linq;

namespace Application.Activities
{
    public class FollowingResolver : IValueResolver<UserActivity, AttendeeDto, bool>
    {
        private readonly DataContext _context;
        private readonly IUserAccessor _userAccessor;
        public FollowingResolver(DataContext context, IUserAccessor userAccessor)
        {
            _userAccessor = userAccessor;
            _context = context;

        }

        public bool Resolve(UserActivity source, AttendeeDto destination, bool destMember, ResolutionContext context)
        {
            var currentUser = _context.Users.SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUsername()).Result;
            if (currentUser.Followings.Any(x => x.TargetId == source.AppUserId))
                return true;
            return false;
        }
    }
}