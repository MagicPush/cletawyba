window.onload = function () {
    /** @var {Object} chrome */
    chrome.storage.local.get(['background_color', 'wallpaper_background_base64', 'wallpaper_position'], loadTab);
};

/**
 * Loads saved settings from a user storage and applies to the page.
 *
 * @param {Object} tabItems The storage object with saved extension settings:
 * @param {string} tabItems.background_color "background_color" style value
 * @param {string} tabItems.wallpaper_background_base64 base64 encoded background for "background-image" style
 * @param {string} tabItems.wallpaper_position "background-position" style value
 */
function loadTab(tabItems)
{
    let styleValue = '';

    if (undefined !== tabItems.background_color && tabItems.background_color) {
        styleValue += 'background-color: ' + tabItems.background_color + '; ';
    }
    if (undefined !== tabItems.wallpaper_background_base64 && tabItems.wallpaper_background_base64) {
        styleValue += 'background-image: url(\'' + tabItems.wallpaper_background_base64 + '\');';
    }
    if (undefined !== tabItems.wallpaper_position && tabItems.wallpaper_position) {
        styleValue += 'background-position: ' + tabItems.wallpaper_position + '; ';
    }

    if (styleValue) {
        document.getElementById('container_clean_tab').setAttribute('style', styleValue);
    }
}
