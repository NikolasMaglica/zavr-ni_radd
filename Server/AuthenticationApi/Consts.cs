namespace AuthenticationApi;

public static class Consts
{
    public const int UsernameMinLength = 5;

    public const string PasswordRegex = @"^(?=.*[A-Z])(?=.*[\W])(?=.*[0-9])(?=.*[a-z]).{6,128}$";

    public const string UsernameLengthValidationError = "Korisničko ime mora imati više od 5 znamenki";
    public const string EmailValidationError = "Email mora biti u ispravnom formatu";

    public const string PasswordValidationError = "Lozinka mora imati više od 6 znamenki, najmanje 1 veliko i 1 malo slovo, najmanje jedan posebni znak</strong";
}