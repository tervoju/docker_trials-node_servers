var sqlite3 = require("sqlite3").verbose();
//var md5 = require('md5')

const DBSOURCE = "db.sqlite";

/*
{
    "name": "software-certificate",
    "version": "0.1",
    "attributes": ["software-did", "software-name", "software-version", "developer-did"]
}*/

let db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    // Cannot open database
    console.error(err.message);
    throw err;
  } 
  else {
    console.log("Connected to the SQLite database.");
    db.run(
      `CREATE TABLE package (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name text UNIQUE, 
            url text, 
            digest text, 
            date text,
            CONSTRAINT name_unique UNIQUE (name)
            )`,
      (err) => {
        if (err) {
          // Table already created
          console.log("db already created");
        } 
        else {
            console.log("db created, insert some data");
          // Table just created, creating some rows
          // name, publisher, binary, version, date
          var insert =
            "INSERT INTO package (name, url, digest, date) VALUES (?,?,?,?)";
          db.run(insert, [
            "Acme Package 1",
            "http://acme.com",
            "asdas",
            new Date()
          ]);
          db.run(insert, [
            "Contoso Package 1",
            "http://contoso.com",
            "asdssas",
            new Date()
          ]);
          db.run(insert, [
            "Contoso Package 2",
            "http://contoso.com",
            "asdssas",
            new Date()
          ]);
        }
      }
    );
  }
});

module.exports = db;
