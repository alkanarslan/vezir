using vezir.api.Model;

namespace vezir.api.Interface;

public interface ICurrentAccount
{
    Task<CurrentAccount> GetCurrentAccount(int id);
    Task<CurrentAccount> SetCurrentAccount(CurrentAccount currentAccount);

}