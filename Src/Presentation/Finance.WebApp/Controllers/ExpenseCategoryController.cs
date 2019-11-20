namespace Finance.WebApp.Controllers
{
    using Application.ExpenseCategories.Queries.GetAll;
    using Application.ExpenseCategories.Queries.GetExpensesByCategory;
    using Application.Expenses.Commands.Delete;
    using Microsoft.AspNetCore.Mvc;
    using System.Threading.Tasks;

    public class ExpenseCategoryController : BaseController
    {
        //GET: api/ExpenseCategory/GetAll
        [HttpGet]
        public async Task<ActionResult<ExpenseCategoriesListViewModel>> GetAll(string userId)
        {
            var result = await Mediator.Send(new GetAllExpenseCategoriesListQuery() { UserId = userId });
           
            return Ok(result);
        }

        //GET: api/ExpenseCategory/GetExpensesByCategory
        [HttpGet]
        public async Task<ActionResult<ExpensesByCategoryListViewModel>> GetExpensesByCategory(int month, int year, string userId)
        {
            var result = await Mediator.Send(new GetExpensesByCategoryListQuery() { Month = month, Year = year, UserId = userId });

            return Ok(result);
        }

        // DELETE: api/ExpenseCategory/Delete/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(string id)
        {
            await Mediator.Send(new DeleteExpenseCategoryCommand { Id = id });

            return NoContent();
        }
    }
}
