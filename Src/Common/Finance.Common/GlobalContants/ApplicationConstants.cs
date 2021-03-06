﻿namespace Finance.Common.GlobalContants
{
    public class ApplicationConstants
    {
        public const int MerchatMaxLength = 50;
        public const int NoteMaxLength = 200;
        public const int NameMaxLength = 20;
        public const int MinMonth = 0;
        public const int MaxMonth = 12;
        public const int MinYear = 0;
        public const int MaxYear = 9999;
        public const decimal MinimumTotal = 0.00M;
        public const string BaseExceptionMessage = "One or more validation failures have occurred.";
        public const string Merchant = "Merchant";
        public const string Note = "Note";
        public const string Date = "Date";
        public const string Total = "Total";
        public const string Category = "Category";
        public const string User = "User";
        public const string Year = "Year!";
        public const string Month = "Month";
        public const string CategoryName = "Cateogry Name";
        public const string Type = "Cashflow Type";
        public const string EmptyErrorMessage = "{0} cannot be empty!";
        public const string LengthErrorMessage = "{0} must be no longer than {1} characters length!";
        public const string ValueErrorMessage = "{0} must be no less than 0.01!";
        public const string InvalidErrorMessage = "Invalid {0}!";
        public const string Id = "Id of the entity ";
    }
}
