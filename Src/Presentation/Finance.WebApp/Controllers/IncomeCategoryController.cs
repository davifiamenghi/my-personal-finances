namespace Finance.WebApp.Controllers
{
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.Mvc;

    using Application.IncomeCategories.Queries.GetAll;
    using Application.IncomeCategories.Queries.GetIncomesByCategory;

    public class IncomeCategoryController : BaseController
    {
        //GET: api/IncomeCategory/GetAll
        [HttpGet]
        public async Task<ActionResult<IncomeCategoriesListViewModel>> GetAll()
        {
            var result = await Mediator.Send(new GetAllIncomeCategoriesListQuery());
           
            return Ok(result);
        }

        //GET: api/IncomeCategory/GetIncomesByCategory
        [HttpGet]
        public async Task<ActionResult<IncomesByCategoryListViewModel>> GetIncomesByCategory(int month, int year, string userId)
        {
            var result = await Mediator.Send(new GetIncomesByCategoryListQuery() { Month = month, Year = year, UserId = userId });

            return Ok(result);
        }
    }
}
