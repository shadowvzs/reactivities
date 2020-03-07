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
    public class ActivitiesController : BaseController
    {

        // GET api/activities/
        [HttpGet]
        public async Task<ActionResult<List<Activity>>> List()
        {
            return await Mediator.Send(new List.Query());
        }

        // GET /api/activities/6319491A-EBDA-49CE-BA7F-7917D4B3E1A9
        [HttpGet("{id}")]
        public async Task<ActionResult<Activity>> Details(Guid id)
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
        public async Task<ActionResult<Unit>> Edit(Guid id, Edit.Command command)
        {
            command.Id = id;
            return await Mediator.Send(command);
        }

        // DELETE api/activities/6319491A-EBDA-49CE-BA7F-7917D4B3E1A9
        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> Delete(Guid id)
        {
            return await Mediator.Send(new Delete.Command{Id = id});
        }
    }
}