using Domain;
using Microsoft.AspNetCore.Identity;

using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager)
        {

            if (!userManager.Users.Any())
            {
                var users = new List<AppUser>()
                {
                    new AppUser
                    {
                        DisplayName = "Bob",
                        UserName = "bob",
                        Email = "bob@test.com"
                    },
                    new AppUser
                    {
                        DisplayName = "Tom",
                        UserName = "tom",
                        Email = "tom@test.com"
                    },
                    new AppUser
                    {
                        DisplayName = "Sam",
                        UserName = "sam",
                        Email = "sam@test.com"
                    }                       
                };

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }
            }

            if (!context.Activities.Any())
            {
                var activities = new List<Activity>
                {
                    new Activity
                    {
                        Title = "Past Activity",
                        Date = DateTime.Now.AddMonths(-2),
                        Description = "Activity 2 months ago",
                        Category = "drinks",
                        City = "London",
                        Venue = "Pub"
                    },
                    new Activity
                    {
                        Title = "Past Activity",
                        Date = DateTime.Now.AddMonths(-1),
                        Description = "Activity 1 months ago",
                        Category = "drinks",
                        City = "Frankfurt",
                        Venue = "Cake shop"
                    },
                    new Activity
                    {
                        Title = "Current Activity",
                        Date = DateTime.Now,
                        Description = "Activity now",
                        Category = "foods",
                        City = "Gyor",
                        Venue = "Shop"
                    },
                    new Activity
                    {
                        Title = "Future Activity",
                        Date = DateTime.Now.AddMonths(1),
                        Description = "Activity now",
                        Category = "foods",
                        City = "Duda",
                        Venue = "Museum"
                    }
                };
                context.Activities.AddRange(activities);
                context.SaveChanges();
            }
        }
    }
}