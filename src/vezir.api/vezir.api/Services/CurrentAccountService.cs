using Microsoft.EntityFrameworkCore;
using vezir.api.Interface;
using vezir.api.Model;

namespace vezir.api.Services;

public class CurrentAccountService : ICurrentAccount
{
    private readonly VezirApiContext _vezirApiContext;

    public CurrentAccountService(VezirApiContext vezirApiContext)
    {
        _vezirApiContext = vezirApiContext;
    }

    public async Task<CurrentAccount> GetCurrentAccount(int id)
    {
        return await _vezirApiContext.CurrentAccount.FirstOrDefaultAsync(p => p.Id == id);
    }

    public async Task<CurrentAccount> SetCurrentAccount(CurrentAccount currentAccount)
    {
        await _vezirApiContext.CurrentAccount.AddAsync(currentAccount);
        await _vezirApiContext.SaveChangesAsync();
        return currentAccount;
    }
}