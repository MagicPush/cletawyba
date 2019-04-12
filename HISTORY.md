# HISTORY

This history log references the repository releases which respect [semantic versioning](https://semver.org/)
(at least from **v2.0.0**).

## 1.1.1 (2014-10-07)

Let's call it the initial release (at least it's a definitely initial commit in the repository).
So what we have here...

### Features

- The _new tab_ is definitely clean except an empty div block with few styles. Loads pretty fast.
- The option to set a new tab background color.
- The option to set a path to a .png or .jpg file; if done successfully then a new tab background reflects that image.

### Main problems

- Unable to set a background image by the classic "Browse..." button (JS security restrictions plus my low skills).
- Unable to use "chrome://theme/IDR_THEME_NTP_BACKGROUND" as a background image path (odd Chrome restrictions).
