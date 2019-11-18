namespace Finance.WebApp.Controllers
{
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.Mvc;

    using Application.Incomes.Commands.Create;
    using Application.Incomes.Commands.Delete;
    using Application.Incomes.Commands.Update;
    using Application.Incomes.Queries.GetAllIncomes;
    using Application.Incomes.Queries.GetIncomeById;
    using Finance.Application.Incomes.Queries.GetTotalIncomesByYear;

    public class IncomeController : BaseController
    {
        //GET: api/Income/GetAll
        [HttpGet]
        public async Task<ActionResult<IncomesListViewModel>> GetAll(int month, int year, string userId)
        {
            var result = await Mediator.Send(new GetAllIncomesListQuery { Month = month, Year = year, UserId = userId });
            return Ok(result);
        }

        //GET: api/Income/Get/5
        [HttpGet("{id}")]
        public async Task<ActionResult<IncomeViewModel>> Get(string id)
        {
            var result = await Mediator.Send(new GetIncomeByIdQuery { Id = id });
            return Ok(result);
        }

        //GET: api/Expense/GetByYear
        [HttpGet]
        public async Task<ActionResult<IncomesByYearListViewModel>> GetByYear(int year, string userId)
        {
            var result = await Mediator.Send(new GetIncomesByYearListQuery { Year = year, UserId = userId });
            return Ok(result);
        }

        // POST: api/Income/Create
        [HttpPost]
        public async Task<ActionResult> Create(CreateIncomeCommand command)
        {
            await Mediator.Send(command);

            return NoContent();
        }


        // PUT: api/Income/Update
        [HttpPut]
        public async Task<ActionResult> Update(UpdateIncomeCommand command)
        {
            await Mediator.Send(command);

            return NoContent();
        }

        // DELETE: api/Income/Delete/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(string id)
        {
            await Mediator.Send(new DeleteIncomeCommand { Id = id });

            return NoContent();
        }
    }
}
