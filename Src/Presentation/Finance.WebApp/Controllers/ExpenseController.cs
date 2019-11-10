namespace Finance.WebApp.Controllers
{
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.Mvc;
 
    using Application.Expenses.Commands.Create;
    using Application.Expenses.Commands.Delete;
    using Application.Expenses.Commands.Update;
    using Finance.Application.Expenses.Queries.GetAllExpenses;

    public class ExpenseController : BaseController
    {
       //GET: api/Expenses/GetAll
       [HttpGet]
        public async Task<ActionResult<ExpensesListViewModel>> GetAll()
        {
            var result = await Mediator.Send(new GetAllExpensesListQuery());
            return Ok(result);
        }

        // GET: api/Expenses/Get/5
        //[HttpGet("{id}")]
        //public async Task<ActionResult<ExpenseViewModel>> Get(int id)
        //{
        //    var result = await Mediator.Send(new GetExpenseByIdQuery { Id = id });
        //    return Ok(result);
        //}                

        // POST: Expenses/Create
        [HttpPost]
        public async Task<ActionResult> Create([FromForm]CreateExpenseCommand command)
        {
            await Mediator.Send(command);

            return NoContent();
        }


        // PUT: api/Expenses/Update/5
        [HttpPut]
        public async Task<ActionResult> Update([FromForm]UpdateExpenseCommand command)
        {
            await Mediator.Send(command);

            return NoContent();
        }

        // DELETE: api/Expenses/Delete/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(string id)
        {
            await Mediator.Send(new DeleteExpenseCommand { Id = id });

            return NoContent();
        }
    }
}
