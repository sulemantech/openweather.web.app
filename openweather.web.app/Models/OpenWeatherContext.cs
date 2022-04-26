using Microsoft.EntityFrameworkCore;

namespace openweather.web.app.Models
{
    public class OpenWeatherContext : DbContext

    {
        protected OpenWeatherContext()
        {
        }
        public DbSet<Weather> Weathers { get; set; }
        public DbSet<WeatherForecast> Forecasts { get; set; }
        public DbSet<Product> Products { get; set; }
    }
}
