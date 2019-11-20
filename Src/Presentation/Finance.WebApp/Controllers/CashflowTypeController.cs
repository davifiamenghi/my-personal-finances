namespace Finance.WebApp.Controllers
{
    using Finance.Application.CashflowTypes.Queries.GetAll;
    using Microsoft.AspNetCore.Mvc;
    using System.Threading.Tasks;

    public class CashflowTypeController : BaseController
    {
        //GET: api/CashflowType/GetAll
        [HttpGet]
        public async Task<ActionResult<CashflowTypesListViewModel>> GetAll()
        {
            var result = await Mediator.Send(new GetAllCashflowTypesListQuery());

            return Ok(result);
        }
    }
}
