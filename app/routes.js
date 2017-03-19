var sql = require("mssql");

async = require("async");

var path = require('path'),
    fs = require('fs');

module.exports = function(app, server) {
    app.get('/', function(request, response) {
        response.render('index.html');
    });

    app.post('/subscribe', function(request, response) {
        var dbConfig = {
            server: "mssql2.gear.host",
            database: "themedatabase",
            user: 'themedatabase',
            password: "Hv2E?~76E34t",
            port: 1433
        };

        var conn = new sql.Connection(dbConfig);
        var req = new sql.Request(conn);

        conn.connect(function(err) {
            if (err) {
                console.log(err);
                return;
            };

            req.query("insert into subscriber (name, email) values ('" + request.body.name + "','" + request.body.email + "')", function(err, recordset) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(recordset);
                }
                conn.close();
            });
        });
        response.redirect('/');
    });
}