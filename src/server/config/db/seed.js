"use strict";

var seedConfig = function ()
{
    var User = models.User;

    if (User.count() > 0)
        return;

    var usersToSeed = [
        new User({
            Username: "cypherix93",
            Email: "bikram.ghosh93@gmail.com",
            Roles: ["Administrator"]
        })
    ];

    for (let user of usersToSeed)
    {
        user.save();
    }
};

module.exports = seedConfig;