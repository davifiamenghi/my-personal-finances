namespace Finance.WebApp.Controllers
{
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.Mvc;
 
    using Application.Expenses.Commands.Create;
    using Application.Expenses.Commands.Delete;
    using Application.Expenses.Commands.Update;
    using Finance.Application.Expenses.Queries.GetAllExpenses;
    using Finance.Application.Expenses.Queries.GetExpenseById;

    public class ExpenseController : BaseController
    {
       //GET: api/Expenses/GetAll
       [HttpGet]
        public async Task<ActionResult<ExpensesListViewModel>> GetAll(int month, int year)
        {
            var result = await Mediator.Send(new GetAllExpensesListQuery { Month = month, Year = year });
            return Ok(result);
        }

        //GET: api/Expense/Get/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ExpenseViewModel>> Get(string id)
        {
            var result = await Mediator.Send(new GetExpenseByIdQuery { Id = id });
            return Ok(result);
        }


        // POST: api/Expense/Create
        [HttpPost]
        public async Task<ActionResult> Create(CreateExpenseCommand command)
        {
            await Mediator.Send(command);

            return NoContent();
        }


        // PUT: api/Expense/Update
        [HttpPut]
        public async Task<ActionResult> Update(UpdateExpenseCommand command)
        {
            await Mediator.Send(command);

            return NoContent();
        }

        // DELETE: api/Expense/Delete/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(string id)
        {
            await Mediator.Send(new DeleteExpenseCommand { Id = id });

            return NoContent();
        }
    }
}
