const puppeteer = require("puppeteer");
const table = require("./lib/table");

// Setup details of the website
const domain = "http://domain.local";
const username = "Username here";
const password = "Password here";
const postTypeSlug = "post";

// Amount of pages is automatically fetched. You can override it here.
let amountOfPagesAvailable = null;

// =============================================================================
// Scripting starts here. No need to edit beyond this point.
// =============================================================================
(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    // We first need to login to WordPress admin with Puppeteer
    await page.goto(`${domain}/wp-admin`);
    await page.type("#user_login", username);
    await page.type("#user_pass", password);
    await page.click("#wp-submit");
    await page.waitForNavigation({ waitUntil: "networkidle0" });

    // Fetch the total number of pages available for looping
    if (!amountOfPagesAvailable) {
        console.log("Collecting total number of pages...");
        await page.goto(
            `${domain}/wp-admin/edit.php?post_type=${postTypeSlug}`
        );
        amountOfPagesAvailable = await page.$eval(
            "span.total-pages",
            (el) => el.innerText
        );
        console.log(`Found total of ${amountOfPagesAvailable} pages.`);
    }

    // Initialize urls array of posts
    let linksToVisit = [];

    // Loop throught all the pages available from current post type
    for (let i = 1; i <= amountOfPagesAvailable; i++) {
        await page.goto(
            `${domain}/wp-admin/edit.php?post_type=${postTypeSlug}&paged=${i}`
        );
        await page.waitForSelector("a.row-title");
        const linksFromPage = await page.$$eval("a.row-title", (link) =>
            link.map((a) => a.href)
        );
        // Combine currently looped page links with last ones
        linksToVisit = [...linksToVisit, ...linksFromPage];
    }

    // Loop throught all the fetched post urls and click 'Update'
    const publishButtonSelector = "button.editor-post-publish-button__button";
    for (var i = 0; i < linksToVisit.length; i++) {
        await page.goto(linksToVisit[i]);
        await page.waitForSelector(publishButtonSelector);

        console.log(`Updating post ${i + 1} of ${linksToVisit.length}`);
        // Sometimes the update button is disabled. This hapens when post does
        // not have ACF fields or it does not have anything new to save. So we skip these.
        const attr = await page.$$eval(publishButtonSelector, (el) =>
            el.map((x) => x.getAttribute("aria-disabled"))
        );

        if (!attr[0]) {
            await page.click(publishButtonSelector);
            table.push([i + 1, linksToVisit[i], "OK"]);
        } else {
            table.push([i + 1, linksToVisit[i], "FAIL"]);
        }
    }

    // Output data table
    console.log(table.toString());

    await page.waitForTimeout(3000);
    await browser.close();
})();
