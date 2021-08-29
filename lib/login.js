/**
 * Login functionality
 *
 * @param {class} page
 * @param {string} domain
 * @param {string} password
 */

const loginToWP = async (page, domain, username, password) => {
    console.log(`Logging in to ${domain}/wp-admin`);
    await page.goto(`${domain}/wp-admin`);
    await page.type("#user_login", username);
    await page.type("#user_pass", password);
    await page.click("#wp-submit");
    await page.waitForNavigation({ waitUntil: "networkidle0" });
    console.log(`Logged in with username: ${username}\n`);
};

module.exports = loginToWP;
