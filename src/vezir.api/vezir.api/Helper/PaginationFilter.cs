namespace vezir.api.Helper;

public class PaginationFilter
{
    public int PageNumber { get; set; }
    public int PageSize { get; set; }
    public PaginationFilter()
    {
        this.PageNumber = 1;
        this.PageSize = 15;
    }
    public PaginationFilter(int pageNumber,int pageSize)
    {
        
        // this.PageNumber = pageNumber < 1 ? 1 : pageNumber;
        // this.PageSize = pageSize > 10 ? 10 : pageSize;
        this.PageNumber = pageNumber;
        this.PageSize = pageSize;
    }
}