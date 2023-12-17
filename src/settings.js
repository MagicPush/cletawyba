window.onload = function () {
    /** @var {Object} chrome */
    chrome.storage.local.get(
        ['wallpaper_background_base64', 'wallpaper_position', 'wallpaper_size', 'background_color'],
        settingsLoadFromStorage
    );

    document.getElementById('wallpaper_browser').onchange = wallpaperLoadFromInput;
    document.getElementById('wallpaper_clear').onclick = wallpaperContainerClear;
    document.getElementById('settings_save').onclick = settingsSave;
};


const domIdWallpaperProcessedMessage = 'wallpaper_processed_message';
const domIdWallpaperProcessedImg = 'wallpaper_processed_img';

const imageEncodedSizeMax = 4194304;


/**
 * Places "message" in "domMessage" inner HTML as a plain text.
 * Marks "domMessage" with red color if "is_error" is true or green otherwise.
 *
 * @param {Object} domMessage Document element object needed to show a message
 * @param {String} message Message text
 * @param {Boolean} is_error If "message" must be shown as an error
 */
function domSetMessage(domMessage, message, is_error = false) {
    domMessage.style = 'color: ' + (is_error ? 'red' : 'green') + ';';
    domMessage.textContent = message;
}

/**
 * Loads saved settings from a user storage and applies to the settings form.
 *
 * @see wallpaperContainerPut()
 * @param {Object} storageItems The storage object with saved extension settings:
 * @param {string} storageItems.background_color "background_color" style value
 * @param {string} storageItems.wallpaper_background_base64 base64 encoded background for "background-image" style
 * @param {string} storageItems.wallpaper_position "background-position" style value
 * @param {string} storageItems.wallpaper_size "background-size" style value
 */
function settingsLoadFromStorage(storageItems) {
    if (undefined !== storageItems.background_color && storageItems.background_color) {
        document.getElementById('background_color').setAttribute('value', storageItems.background_color);
    }
    if (undefined !== storageItems.wallpaper_background_base64 && storageItems.wallpaper_background_base64) {
        wallpaperContainerPut(storageItems.wallpaper_background_base64);
    }
    if (undefined !== storageItems.wallpaper_position && storageItems.wallpaper_position) {
        document.getElementById('wallpaper_position').setAttribute('value', storageItems.wallpaper_position);
    }
    if (undefined !== storageItems.wallpaper_size && storageItems.wallpaper_size) {
        document.getElementById('wallpaper_size').setAttribute('value', storageItems.wallpaper_size);
    }
}

/**
 * Saves settings from the form fields to the storage.
 */
function settingsSave() {
    let domSaveResult;

    domSaveResult = document.getElementById('settings_save_result');
    domSetMessage(domSaveResult, '');

    try {
        /** @var {Object} chrome.runtime */
        chrome.storage.local.set(
            {
                'wallpaper_background_base64': document.getElementById(domIdWallpaperProcessedImg).src,
                'wallpaper_position': document.getElementById('wallpaper_position').value,
                'wallpaper_size': document.getElementById('wallpaper_size').value,
                'background_color': document.getElementById('background_color').value
            },
            function () {
                if (chrome.runtime.lastError) {
                    // In fact this piece of Google shit catches ANY exceptions
                    // (so don't bother to create an own exception).
                    // All exceptions messages are sent to console.
                    // And you can't get anything from this function to the upper code area.

                    // For now it's the only way to tell the user what has happened.
                    domSetMessage(domSaveResult, chrome.runtime.lastError, true);
                    // For now this line is almost useless;
                    throw new Error(chrome.runtime.lastError);
                }
                domSetMessage(domSaveResult, 'Your settings are saved successfully.');
            }
        );
    }
        // For now this is useless;
    catch (exception_main) {
        domSetMessage(domSaveResult, exception_main.message, true);
    }
}

/**
 * Clears the wallpaper img container. Also removes wallpaper load message.
 */
function wallpaperContainerClear() {
    let domImage;

    domSetMessage(document.getElementById(domIdWallpaperProcessedMessage), '');

    domImage = document.getElementById(domIdWallpaperProcessedImg);
    domImage.style.display = 'none';
    domImage.removeAttribute('src');
}

/**
 * Puts wallpaper encoded in base64 into img container.
 *
 * @param wallpaperBase64 Input wallpaper base64
 */
function wallpaperContainerPut(wallpaperBase64) {
    let domImage;

    domSetMessage(document.getElementById(domIdWallpaperProcessedMessage), '');

    domImage = document.getElementById(domIdWallpaperProcessedImg);
    domImage.src = wallpaperBase64;
    domImage.style.display = 'block';
}

/**
 * Encodes input image from blob to base64 and puts it into img container.
 *
 * @see FileReader
 * @see FileReader.readAsDataURL()
 * @see wallpaperContainerPut()
 * @param fileLoadedEvent FileReader object created by readAsDataURL
 */
function wallpaperEncodeAndPlace(fileLoadedEvent) {
    let imageEncoded;
    let imageEncodedSize;

    imageEncoded = fileLoadedEvent.target.result;
    imageEncodedSize = imageEncoded.length;
    if (imageEncodedSize > imageEncodedSizeMax) {
        domSetMessage(document.getElementById(domIdWallpaperProcessedMessage),
            'The image (while encoded - ' + imageEncodedSize + ' bytes) is larger than the maximum allowed: '
            + imageEncodedSizeMax + ' bytes', true);

        return;
    }

    wallpaperContainerPut(imageEncoded);
}

/**
 * Loads input image from blob ("Choose File" button) and sends to further processing.
 *
 * @see FileReader
 * @see FileReader.readAsDataURL()
 * @see wallpaperEncodeAndPlace()
 */
function wallpaperLoadFromInput() {
    let fileList;
    let fileReader;

    fileList = this.files;
    if (fileList.length < 1) {
        return;
    }

    fileReader = new FileReader();
    fileReader.onload = wallpaperEncodeAndPlace;
    fileReader.readAsDataURL(fileList[0]);
}
