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
    console.log("\nStarting collecting links from all the pages...");
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
    console.log(
        `Total amount of links found from the pages ${linksToVisit.length}\n`
    );
    return linksToVisit;
};

module.exports = collectLinks;
