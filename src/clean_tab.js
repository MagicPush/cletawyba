window.onload = function () {
  chrome.storage.local.get(['wallpaper_path', 'wallpaper_position', 'background_color'], function (items) {
    var style_value = '';

    if (items['wallpaper_path']) {
      style_value += "background-image: url('" + items['wallpaper_path'] + "'); ";
    }
    if (items['wallpaper_position']) {
      style_value += 'background-position: ' + items['wallpaper_position'] + '; ';
    }
    if (items['background_color']) {
      style_value += 'background-color: ' + items['background_color'] + '; ';
    }

    if (style_value) {
      document.getElementById('container_clean_tab').setAttribute('style', style_value);
    }
  });
}
