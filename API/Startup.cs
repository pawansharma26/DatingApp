using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using API.Data;
using API.Interfaces;
using API.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using API.Extensions;//namespace use for adding api extensions..
using API.Middleware;

namespace API
{
    public class Startup
    {
        private readonly IConfiguration _config;
        public Startup(IConfiguration config)
        {
            _config = config;
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
        services.AddApplicationServices(_config);
            services.AddControllers();
            services.AddCors();
                        //Add Below code for applying authentication
   services.AddIdentityServices(_config);
  //Ends here
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "API", Version = "v1" });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
               // app.UseDeveloperExceptionPage();
                  app.UseMiddleware<ExceptionMiddleware>();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "API v1"));
            }
            else{
   app.UseMiddleware<ExceptionMiddleware>();
            }
         
            app.UseHttpsRedirection();

            app.UseRouting();
            //ordering is very important here , 1)usecors 2) authentication 3)authorization
            // app.UseCors(x=>x.AllowAnyHeader().AllowAnyMethod().WithOrigins("https://localhost:4200"));
         app.UseCors(x=>x.AllowAnyHeader().AllowAnyMethod().WithOrigins("https://avonkhana.in"));
            app.UseAuthentication();
            app.UseAuthorization();
//for publishing
app.UseDefaultFiles();
app.UseStaticFiles();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapFallbackToController("Index","Fallback");
            });
        }
    }
}
