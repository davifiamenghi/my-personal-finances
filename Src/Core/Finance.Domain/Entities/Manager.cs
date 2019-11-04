namespace Finance.Domain.Entities
{
    using Common;
    using Enumerations;

    public class Manager : BaseDeletableModel<Manager>
    {
        public string FirstName { get; set; }

        public string LastName { get; set; }

        public WeekDay ReceptionDay { get; set; }
    }
}
