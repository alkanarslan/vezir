namespace vezir.api.Helper;

public interface IUriService
{
    public Uri GetPageUri(PaginationFilter filter, string route);
}