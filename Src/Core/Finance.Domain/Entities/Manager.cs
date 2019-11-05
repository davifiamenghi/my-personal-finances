namespace Finance.Domain.Entities
{
    using Common;
    using Enumerations;

    public class Manager : BaseDeletableModel
    {
        public string FirstName { get; set; }

        public string LastName { get; set; }

        public WeekDay ReceptionDay { get; set; }
    }
}
