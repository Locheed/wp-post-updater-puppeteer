const fs = require("fs");

const path = "./foundlinks.txt";

/**
 * Read the saved txt file
 *
 * @returns array data
 */
const fileStreamRead = async () => {
    try {
        if (fs.existsSync(path)) {
            const data = fs.readFileSync(path, "utf8");
            return JSON.parse(data);
        }
    } catch (err) {
        console.error(err);
    }
};

module.exports = fileStreamRead;
