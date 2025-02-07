using EmployeeManagement_API.DAL.Admin;
using EmployeeManagement_API.DAL.Interfaces;
using EmployeeManagement_API.DAL.Services.Repository;
using EmployeeManagement_API.DAL.Services;
using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Cors;
using Unity.AspNet.WebApi;
using Web_API_with_Angular.DAL.Services.Repository;
using Unity;

namespace EmployeeManagement_API
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services
            // Enable CORS for all origins, methods, and headers
            var cors = new EnableCorsAttribute("*", "*", "*");
            config.EnableCors(cors);
            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
            name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
            var container = new UnityContainer();
            // Register your dependencies, including IPackageService
            container.RegisterType<IDepartmentsServices, DepartmentsService>();
            container.RegisterType<IDepartmentsRepository, DepartmentsRepository>();
            container.RegisterType<IEmployeeService, EmployeeService>();
            container.RegisterType<IEmployeesRepository, EmployeesRepository>();
            container.RegisterType<IEmployeeLoginService, EmployeeLoginService>();

            GlobalConfiguration.Configuration.DependencyResolver = new UnityDependencyResolver(container);

            //By default Web API return XML data
            //We can remove this by clearing the SupportedMediaTypes option as follows
            config.Formatters.XmlFormatter.SupportedMediaTypes.Clear();

            //Now set the serializer setting for JsonFormatter to Indented to get Json Formatted data
            config.Formatters.JsonFormatter.SerializerSettings.Formatting =
                Newtonsoft.Json.Formatting.Indented;

            //For converting data in Camel Case
            config.Formatters.JsonFormatter.SerializerSettings.ContractResolver =
                new CamelCasePropertyNamesContractResolver();
        }
    }
}
