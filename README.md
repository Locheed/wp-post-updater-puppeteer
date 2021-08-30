# WordPress Post updater with Puppeteer automated Update button click

This is the Puppeteer Node script to update WordPress posts with a real Update button click.
Sometimes You might have a problem with Advanced Custom Fields fieldkeys in a database. These fieldkeys might not be correctly save to database if you import post. The quick edit or bulk edit feature is not enough to save the ACF fields to the database. This requires really a clicking the Update button. If you have a hundreds or a thousands of posts it's not possible to do this by hand.

## Setup

To use this script you need to clone or download this repository. In the index.js file you can edit the website details from the lines 11-24. No other configuration is needed.

## Features

-   Supports post, pages, and Custom Post Types.
-   Automatically finds out how many pages there is to paginate (Selection in the Screen Options doesn't matter).
-   Automatic pagination can be overridden with hard coded page amount.
-   Found links are saved to txt file. This is good if you have hundreds of links. So you dont have to refetch all the links again.

## NOTE:

It's better to run this in local development environment. Live hosted servers will block you. The current version of this script does not have any added delays.

## FAQ:

1. **Update button is greyed out and it's not clicked. End result table shows failed rows.**

    This means that there isn't anything new to save to database. This happens when post does not use Advanced Custom Fields and it's autosaved. This script is really not needed unless you have problems writing Advanced Custom Fields fieldkeys to the database.

2. **Sometimes the script crashes for timeout.**

    Page loading was too slow for some reason. You can continue the script by running it again. Just change the variable **startUpdatingFromPost** to a link number before the crash. Links are saved to foundlinks.txt file so these doesn't have to be refetched.

## Changelog

-   1.0.1 - Support for continuing the script from crashed link number using the saved foundlinks.txt file.
-   1.0.0 - Initial release of the script.
