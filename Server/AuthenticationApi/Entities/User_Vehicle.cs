namespace AuthenticationApi.Entities
{
    public class User_Vehicle
    {
        public string userid { get; set; }=String.Empty;
        public User? user { get; set; }
        public int vehicleid { get; set; }
        public Vehicle? vehicle { get; set; }

        public string description { get; set; }
    }
}
