namespace Finance.WebApp.Controllers
{
    using System.Threading.Tasks;

    using Microsoft.AspNetCore.Mvc;

    using Application.IncomeCategories.Queries.GetAll;
    using Application.IncomeCategories.Queries.GetIncomesByCategory;
    using Application.Incomes.Commands.Delete;
    using Finance.Application.Incomes.Commands.Create;

    public class IncomeCategoryController : BaseController
    {
        //GET: api/IncomeCategory/GetAll
        [HttpGet]
        public async Task<ActionResult<IncomeCategoriesListViewModel>> GetAll(string userId)
        {
            var result = await Mediator.Send(new GetAllIncomeCategoriesListQuery() { UserId = userId });
           
            return Ok(result);
        }

        //GET: api/IncomeCategory/GetIncomesByCategory
        [HttpGet]
        public async Task<ActionResult<IncomesByCategoryListViewModel>> GetIncomesByCategory(int month, int year, string userId)
        {
            var result = await Mediator.Send(new GetIncomesByCategoryListQuery() { Month = month, Year = year, UserId = userId });

            return Ok(result);
        }

        // POST: api/IncomeCategory/Create
        [HttpPost]
        public async Task<ActionResult> Create(CreateIncomeCategoryCommand command)
        {
            await Mediator.Send(command);

            return NoContent();
        }

        // DELETE: api/IncomeCategory/Delete/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(string id)
        {
            await Mediator.Send(new DeleteIncomeCategoryCommand { Id = id });

            return NoContent();
        }
    }
}
