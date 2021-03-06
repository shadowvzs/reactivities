using Domain;
using Microsoft.EntityFrameworkCore;
using MediatR;
using Application.Activities;
using Microsoft.AspNetCore.Authorization;

using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ActivitiesController : BaseController
    {

        // GET api/activities/
        [HttpGet]
        public async Task<ActionResult<List.ActivitiesEnvelope>> List(int? limit, int? offset, bool isGoing, bool isHost, DateTime? startDate)
        {
            return await Mediator.Send(new List.Query(limit, offset, isGoing, isHost, startDate));
        }

        // GET /api/activities/6319491A-EBDA-49CE-BA7F-7917D4B3E1A9
        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<ActivityDto>> Details(Guid id)
        {
            return await Mediator.Send(new Details.Query{Id = id} );
        }

        // POST api/activities
        [HttpPost]
        public async Task<ActionResult<Unit>> Create(Create.Command command)
        {
            return await Mediator.Send(command);
        }

        // PUT api/activities/6319491A-EBDA-49CE-BA7F-7917D4B3E1A9
        [HttpPut("{id}")]
        [Authorize(Policy = "IsActivityHost")]
        public async Task<ActionResult<Unit>> Edit(Guid id, Edit.Command command)
        {
            command.Id = id;
            return await Mediator.Send(command);
        }

        // DELETE api/activities/6319491A-EBDA-49CE-BA7F-7917D4B3E1A9
        [HttpDelete("{id}")]
        [Authorize(Policy = "IsActivityHost")]
        public async Task<ActionResult<Unit>> Delete(Guid id)
        {
            return await Mediator.Send(new Delete.Command{Id = id});
        }

        // POST api/activities/6319491A-EBDA-49CE-BA7F-7917D4B3E1A9/attend
        [HttpPost("{id}/attend")]
        public async Task<ActionResult<Unit>> Attend(Guid id)
        {
            return await Mediator.Send(new Attend.Command{Id = id});
        }

        // POST api/activities/6319491A-EBDA-49CE-BA7F-7917D4B3E1A9/unattend
        [HttpDelete("{id}/attend")]
        public async Task<ActionResult<Unit>> Unattend(Guid id)
        {
            return await Mediator.Send(new Unattend.Command{Id = id});
        }                  
    }
}