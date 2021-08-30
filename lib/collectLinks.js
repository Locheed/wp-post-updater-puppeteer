const fileStreamRead = require("./fileStreamRead");
const fileStreamWrite = require("./fileStreamWrite");

/**
 * Collect links from the page
 *
 * @param {class} page
 * @param {int} amountOfPagesAvailable
 * @param {string} domain
 * @param {string} postTypeSlug
 * @returns array linksToVisit
 */
const collectLinks = async (
    page,
    amountOfPagesAvailable,
    domain,
    postTypeSlug
) => {
    // Initialize urls array of posts
    let linksToVisit = [];

    // We check if we have a saved link listing from previous runs
    const file = await fileStreamRead();
    if (file) return file;

    console.log("\nStarting collecting links from all the pages...");
    for (let i = 1; i <= amountOfPagesAvailable; i++) {
        process.stdout.clearLine();
        process.stdout.cursorTo(0);
        process.stdout.write(
            "Collecting links from page " + i + "/" + amountOfPagesAvailable
        );
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
    console.log(
        `\nTotal amount of links found from the pages ${linksToVisit.length}\n`
    );

    // Write all founds links to a file for safe keeping if the script crashes
    await fileStreamWrite(linksToVisit);

    return linksToVisit;
};

module.exports = collectLinks;
