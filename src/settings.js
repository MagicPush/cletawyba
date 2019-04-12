window.onload = function () {
  chrome.storage.local.get(['wallpaper_path', 'wallpaper_position'], function (items) {
    if (items['wallpaper_path']) {
      document.getElementById('wallpaper_path').setAttribute('value', items['wallpaper_path']);
    }
    if (items['wallpaper_position']) {
      document.getElementById('wallpaper_position').setAttribute('value', items['wallpaper_position']);
    }
    if (items['background_color']) {
      document.getElementById('background_color').setAttribute('value', $items['background_color']);
    }
  });

  document.getElementById('settings_save').onclick = function () {
    saveWallpaperPath();
  }


  function saveWallpaperPath() {
    var save_result_obj = document.getElementById('settings_save_result');
    save_result_obj.innerHTML = '';

    try {
      var wallpaper_path = document.getElementById('wallpaper_path').value;
      if (wallpaper_path) {
        wallpaper_path = wallpaper_path.replace(/\\/g, '/');
        wallpaper_path = 'file:///' + wallpaper_path.replace(/file:(\/)*/g, '');

        chrome.permissions.request(
          {'origins': [wallpaper_path]},
          function (granted) {
            if (!granted && false) { // will be done in v1.2
              // In fact this piece of Google shit catches ANY exceptions (so don't bother to create an own exception). All exceptions messages are sent to console. And you can't get anything from this function to the upper code area.
              var exception_message = 'Unable to save your background location. Ensure that "Allow access to file URLs" option is checked in extension settings.';
              // For now it's the only way to tell the user what has happened.
              setMessage(save_result_obj, exception_message, true);
              // For now this line is almost useless;
              throw new Error(exception_message);
            }
          }
        );
        // This shit doesn't work and there is no logic why.
        // alert('a'); // uncomment this to see genius javascript developers logic
        if (save_result_obj.innerHTML) {
          throw new Error(save_result_obj.innerHTML);
        }
      }

      var wallpaper_position = document.getElementById('wallpaper_position').value;
      
      var background_color = document.getElementById('background_color').value;

      chrome.storage.local.set(
        {
          'wallpaper_path':     wallpaper_path,
          'wallpaper_position': wallpaper_position,
          'background_color':   background_color
        },
        function () {
          if (chrome.runtime.lastError) {
            // In fact this piece of Google shit catches ANY exceptions (so don't bother to create an own exception). All exceptions messages are sent to console. And you can't get anything from this function to the upper code area.
            // For now it's the only way to tell the user what has happened.
            setMessage(save_result_obj, chrome.runtime.lastError, true);
            // For now this line is almost useless;
            throw new Error(chrome.runtime.lastError);
          }
          setMessage(save_result_obj, 'Your settings are saved successfully.', false);
        }
      );
    }
    // For now this is useless;
    catch (exception_main) {
      setMessage(save_result_obj, exception_main.message, true);
    }
  }

  /**
   * Places "message" between open and close tags of "tag_obj".
   * Marks by red color if "is_error" is true.
   *
   * @param {Object} tag_obj Document element object needed to show a message
   * @param {String} message Message text
   * @param {Boolean} is_error If "message" must be shown as an error
   */
  function setMessage(tag_obj, message, is_error)
  {
    tag_obj.setAttribute('style', 'color: ' + (is_error ? 'red' : 'green') + ';');
    tag_obj.innerHTML = message;
  }
}
