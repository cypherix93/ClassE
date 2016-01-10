"use strict";

var seedConfig = async(function ()
{
    var User = models.User;

    var usersCount = await(User.count().execute());

    // If database has users, do nothing
    if (usersCount > 0)
        return;

    var usersToSeed = [
        new User({
            username: "cypherix93",
            email: "bikram.ghosh93@gmail.com",
            roles: ["Administrator"]
        })
    ];

    for (let user of usersToSeed)
    {
        user.save();
    }
});

module.exports = seedConfig;