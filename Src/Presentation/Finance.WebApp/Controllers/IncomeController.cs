namespace Finance.WebApp.Controllers
{
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.Mvc;
 
    using Application.Incomes.Commands.Create;
    using Application.Incomes.Commands.Delete;
    using Application.Incomes.Commands.Update;

    public class IncomeController : BaseController
    {
        // GET: api/Incomes/GetAll
        //[HttpGet]
        //public async Task<ActionResult<IncomesListViewModel>> GetAll()
        //{
        //    var result = await Mediator.Send(new GetAllIncomesListQuery());
        //    return Ok(result);
        //}

        // GET: api/Incomes/Get/5
        //[HttpGet("{id}")]
        //public async Task<ActionResult<IncomeViewModel>> Get(int id)
        //{
        //    var result = await Mediator.Send(new GetIncomeByIdQuery { Id = id });
        //    return Ok(result);
        //}

        // POST: api/Incomes/Create
        [HttpPost]
        public async Task<ActionResult> Create([FromForm]CreateIncomeCommand command)
        {
            await Mediator.Send(command);

            return NoContent();
        }


        // PUT: api/Incomes/Update/5
        [HttpPut]
        public async Task<ActionResult> Update([FromForm]UpdateIncomeCommand command)
        {
            await Mediator.Send(command);

            return NoContent();
        }

        // DELETE: api/Incomes/Delete/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(string id)
        {
            await Mediator.Send(new DeleteIncomeCommand { Id = id });

            return NoContent();
        }
    }
}
