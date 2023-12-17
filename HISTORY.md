# HISTORY

This history log references the repository releases which respect [semantic versioning](https://semver.org/).

## 3.0.0 (2023-12-17)

### Main changes

- Migrated to the new Manifest version
according to Google's [Migrate to Manifest V3](https://developer.chrome.com/docs/extensions/develop/migrate?hl=en)
(so the extension could continue to exist in Chrome Web Store).

There are no changes made for the extension's functionality.

## 2.1.0 (2019-09-23)

### Features

- New option available: `background-size` (default value: `cover`). 

## 2.0.0 (2019-04-13)

### Features

- Setting a wallpaper works again (after Google broke reading from "file://").
- Finally, you can pick an image by "Choose File" button! And there is no image type restrictions!
    - Unfortunately from now on the wallpaper size is limited (4 MB max after encoding into base64).

## 1.1.1 (2014-10-07)

Let's call it the initial release (at least it's a definitely initial commit in the repository).
So what we have here...

### Features

- The _new tab_ is definitely clean except an empty div block with few styles. Loads pretty fast.
- The option to set a new tab background color.
- The option to set a path to a .png or .jpg file; if done successfully then a new tab background reflects that image.

### Main problems

- Unable to set a background image by the classic "Choose File" button (JS security restrictions plus my low skills).
- Unable to use "chrome://theme/IDR_THEME_NTP_BACKGROUND" as a background image path (odd Chrome restrictions).
