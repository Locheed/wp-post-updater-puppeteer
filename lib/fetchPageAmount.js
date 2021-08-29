/**
 * Fetches the amount of pages available
 *
 * @param {class} page
 * @param {int} amountOfPagesAvailableOverride
 * @param {string} domain
 * @param {string} postTypeSlug
 * @returns int amountOfPagesAvailable
 */
const fetchPageAmount = async (
    page,
    amountOfPagesAvailableOverride,
    domain,
    postTypeSlug
) => {
    if (!amountOfPagesAvailableOverride) {
        console.log("Collecting total number of pages...");
        await page.goto(
            `${domain}/wp-admin/edit.php?post_type=${postTypeSlug}`
        );
        const amountOfPagesAvailable = await page.$eval(
            "span.total-pages",
            (el) => el.innerText
        );
        console.log(`Found total of ${amountOfPagesAvailable} pages.`);
        return amountOfPagesAvailable;
    }
};

module.exports = fetchPageAmount;
