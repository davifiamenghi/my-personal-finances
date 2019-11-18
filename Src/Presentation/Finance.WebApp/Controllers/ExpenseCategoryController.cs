namespace Finance.WebApp.Controllers
{
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.Mvc;

    using Application.ExpenseCategories.Queries.GetAll;
    using Application.ExpenseCategories.Queries.GetExpensesByCategory;
    using Finance.Application.Expenses.Queries.GetTotalExpensesByYear;

    public class ExpenseCategoryController : BaseController
    {
        //GET: api/ExpenseCategory/GetAll
        [HttpGet]
        public async Task<ActionResult<ExpenseCategoriesListViewModel>> GetAll()
        {
            var result = await Mediator.Send(new GetAllExpenseCategoriesListQuery());
           
            return Ok(result);
        }

        //GET: api/ExpenseCategory/GetExpensesByCategory
        [HttpGet]
        public async Task<ActionResult<ExpensesByCategoryListViewModel>> GetExpensesByCategory(int month, int year, string userId)
        {
            var result = await Mediator.Send(new GetExpensesByCategoryListQuery() { Month = month, Year = year, UserId = userId });

            return Ok(result);
        }
    }
}
