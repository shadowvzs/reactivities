using MediatR;
using Domain;
using Persistence;
using Microsoft.EntityFrameworkCore;
using Application.Errors;
using AutoMapper;

using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Activities
{
    public class Details
    {
        public class Query : IRequest<ActivityDto>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, ActivityDto>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<ActivityDto> Handle(Query request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities.FindAsync(request.Id);

                if (activity == null)
                    throw new RestException(HttpStatusCode.NotFound, new { activity = "Could not find activity" } );

                return _mapper.Map<Activity, ActivityDto>(activity);
            }
        }
    }
}