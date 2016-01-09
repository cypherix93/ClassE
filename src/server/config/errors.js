var errors = function (app)
{
    // Handle 404
    app.use(function (req, res)
    {
        res.status(404).redirect("/#/error/404");
    });

    // Handle 500
    app.use(function (req, res)
    {
        res.status(500).send("500: Internal Server Error");
    });
};

module.exports = errors;