using MediatR;
using Persistence;
using Microsoft.EntityFrameworkCore;
using Application.Errors;
using Application.Interfaces;

using System;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace Application.Photos
{
    public class SetMain
    {

        public class Command : IRequest
        {
            public string Id { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _context = context;
                _userAccessor = userAccessor;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {

                var user = await _context.Users.SingleOrDefaultAsync(x => 
                    x.UserName == _userAccessor.GetCurrentUsername());

                var photo = user.Photos.FirstOrDefault(x => x.Id == request.Id);
                if (photo == null)
                    throw new RestException(HttpStatusCode.NotFound, new { Photo = "Not found" });
          
                var currentMain = user.Photos.FirstOrDefault(x => x.IsMain);
                if (currentMain != null)
                    currentMain.IsMain = false;

                photo.IsMain = true;

                var success = await _context.SaveChangesAsync() > 0;
                if (success) return Unit.Value;

                throw new RestException(HttpStatusCode.NotFound, new { Activity = "Problem saving changes" });
            }
        }
    }
}


