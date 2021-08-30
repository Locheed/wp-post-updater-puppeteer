const fs = require("fs");

const path = "./foundlinks.txt";

/**
 * Write array of links to file
 *
 * @param {array} arr
 */
const fileStreamWrite = async (arr) => {
    fs.writeFileSync(path, JSON.stringify(arr));
};

module.exports = fileStreamWrite;
