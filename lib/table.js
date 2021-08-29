const Table = require("cli-table");

// Setup the table layout
const table = new Table({
    style: { head: ["green"] },
    head: ["#", "Link", "Status"],
    colWidths: [5, 80, 10],
});

// table.push(["1", "Second value", "third"], ["2", "Second value", "third"]);

// console.log(table.toString());

module.exports = table;
