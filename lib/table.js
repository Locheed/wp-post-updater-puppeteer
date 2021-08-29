const Table = require("cli-table");

// Setup the table layout
const table = new Table({
    style: { head: ["green"] },
    head: ["#", "Link", "Status"],
    colWidths: [5, 80, 10],
});

module.exports = table;
