using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace vezir.api.Controllers
{
    [Route("api/[controller]")]
    [RequestSizeLimit(737280000)]
    [ApiController]
    public class FileUploaderController : ControllerBase
    {
        [HttpPost]
        public async Task upload()
        {
          
            var files = this.Request.Form.Files;
            foreach (var file in files)
            {
                if (file.Length == 0)
                    continue;

                // Do something with the file.
                var fileName = file.FileName;
                var fileSize = file.Length;
                Console.WriteLine(file.Name);
                // save to server...
                // ...
            }
        }
    }
}