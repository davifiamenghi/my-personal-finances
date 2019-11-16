namespace Finance.WebApp.Controllers
{
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.Mvc;

    using Application.IncomeCategories.Queries.GetAll;

    public class IncomeCategoryController : BaseController
    {
        //GET: api/IncomeCategory/GetAll
        [HttpGet]
        public async Task<ActionResult<IncomeCategoriesListViewModel>> GetAll()
        {
            var result = await Mediator.Send(new GetAllIncomeCategoriesListQuery());
           
            return Ok(result);
        }
    }
}
