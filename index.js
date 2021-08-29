const puppeteer = require("puppeteer");

// Library files
const table = require("./lib/table");
const fetchPageAmount = require("./lib/fetchPageAmount");
const collectLinks = require("./lib/collectLinks");
const updatePost = require("./lib/updatePost");
const loginToWP = require("./lib/login");

// Setup details of the website
const domain = "http://scrapingdev.local";
const username = "mika";
const password = "mika";
const postTypeSlug = "post";

// Amount of pages is automatically fetched. You can override it here.
let amountOfPagesAvailableOverride = null;

// Disable this if you really wanna see what the script really does.
const runTheBrowserHeadless = false;

// =============================================================================
// Scripting starts here. No need to edit beyond this point.
// =============================================================================
(async () => {
    let amountOfPagesAvailable = null;
    const browser = await puppeteer.launch({ headless: runTheBrowserHeadless });
    const page = await browser.newPage();

    // We first need to login to WordPress admin with Puppeteer
    await loginToWP(page, domain, username, password);

    // Fetch the total number of pages available for looping
    amountOfPagesAvailable = await fetchPageAmount(
        page,
        amountOfPagesAvailableOverride,
        domain,
        postTypeSlug
    );

    // Loop throught all the pages available from current post type
    const linksToVisit = await collectLinks(
        page,
        amountOfPagesAvailable,
        domain,
        postTypeSlug
    );

    // Loop throught all the fetched post urls and click 'Update'
    await updatePost(page, linksToVisit, table);

    // Output data table
    console.log(table.toString());

    await page.waitForTimeout(3000);
    await browser.close();
})();
