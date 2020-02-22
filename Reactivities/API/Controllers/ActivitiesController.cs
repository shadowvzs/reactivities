using Domain;
using Microsoft.EntityFrameworkCore;
using MediatR;
using Application.Activities;

using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ActivitiesController : ControllerBase
    {
        private readonly IMediator _mediator;
        public ActivitiesController(IMediator mediator)
        {
            _mediator = mediator;
        }

        // GET api/activities/
        [HttpGet]
        public async Task<ActionResult<List<Activity>>> List()
        {
            return await _mediator.Send(new List.Query());
        }

        // GET /api/activities/6319491A-EBDA-49CE-BA7F-7917D4B3E1A9
        [HttpGet("{id}")]
        public async Task<ActionResult<Activity>> Details(Guid id)
        {
            return await _mediator.Send(new Details.Query{Id = id} );
        }

        // POST api/activities
        [HttpPost]
        public async Task<ActionResult<Unit>> Create(Create.Command command)
        {
            return await _mediator.Send(command);
        }

        // PUT api/activities/6319491A-EBDA-49CE-BA7F-7917D4B3E1A9
        [HttpPut("{id}")]
        public async Task<ActionResult<Unit>> Edit(Guid id, Edit.Command command)
        {
            command.Id = id;
            return await _mediator.Send(command);
        }

        // DELETE api/activities/6319491A-EBDA-49CE-BA7F-7917D4B3E1A9
        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> Delete(Guid id)
        {
            return await _mediator.Send(new Delete.Command{Id = id});
        }
    }
}