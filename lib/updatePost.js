/**
 * Click the update button and push status to datatable
 *
 * @param {class} page
 * @param {array} linksToVisit
 * @param {class} table
 * @returns void
 */
const updatePost = async (page, linksToVisit, table) => {
    const publishButtonSelector = "button.editor-post-publish-button__button";
    for (var i = 0; i < linksToVisit.length; i++) {
        await page.goto(linksToVisit[i]);

        await page.waitForSelector(publishButtonSelector);

        await page.evaluate(() => {
            const el = document.querySelector(
                ".components-modal__screen-overlay button.components-button"
            );
            if (el) el.click();
        });

        // Check if the Update button is disabled
        const attr = await page.$$eval(publishButtonSelector, (el) =>
            el.map((x) => x.getAttribute("aria-disabled"))
        );

        // If update button is disabled. Skip the link and log it as FAILED
        if (attr[0] === false) {
            console.log("else ", attr[0]);
            table.push([i + 1, linksToVisit[i], "FAIL"]);
            console.log(
                `Updating post ${i + 1} of ${linksToVisit.length} - Failed`
            );
        } else {
            await page.click(publishButtonSelector);
            table.push([i + 1, linksToVisit[i], "OK"]);
            console.log(`Updating post ${i + 1} of ${linksToVisit.length}`);
        }
    }
};

module.exports = updatePost;
