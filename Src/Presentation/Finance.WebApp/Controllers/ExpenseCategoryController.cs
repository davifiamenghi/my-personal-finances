namespace Finance.WebApp.Controllers
{
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.Mvc;

    using Application.ExpenseCategories.Queries.GetAll;

    public class ExpenseCategoryController : BaseController
    {
        //GET: api/ExpenseCategory/GetAll
        [HttpGet]
        public async Task<ActionResult<ExpenseCategoriesListViewModel>> GetAll()
        {
            var result = await Mediator.Send(new GetAllExpenseCategoriesListQuery());
           
            return Ok(result);
        }
    }
}
