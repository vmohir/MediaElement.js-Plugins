'use strict';

/**
 * [Name of feature]
 *
 * [Description]
 */

// If plugin needs translations, put here English one in this format:
// mejs.i18n.en["mejs.id1"] = "String 1";
// mejs.i18n.en["mejs.id2"] = "String 2";

// Feature configuration
Object.assign(mejs.MepDefaults, {
  // Any variable that can be configured by the end user belongs here.
  // Make sure is unique by checking API and Configuration file.
  // Add comments about the nature of each of these variables.
});

Object.assign(MediaElementPlayer.prototype, {
  // Public variables (also documented according to JSDoc specifications)

  /**
   * Feature constructor.
   *
   * Always has to be prefixed with `build` and the name that will be used in MepDefaults.features list
   * @param {MediaElementPlayer} player
   * @param {HTMLElement} controls
   * @param {HTMLElement} layers
   * @param {HTMLElement} media
   */
  builddash(player, controls, layers, media) {
    console.log('TCL: builddash -> player, controls, layers, media', player);
    // const { options } = player;
    // This allows us to access options and other useful elements already set.
    // Adding variables to the object is a good idea if you plan to reuse
    // those variables in further operations.
    const t = this;

    const NetworkSpeed = require('network-speed');
    var testNetworkSpeed = new NetworkSpeed();

    const children = t.mediaFiles ? t.mediaFiles : t.node.children;
    const allSources = [];
    let autoSource;

    for (var i = 0, total = children.length; i < total; i++) {
      var mediaNode = children[i];
      var quality = mediaNode instanceof HTMLElement ? mediaNode.getAttribute('data-quality') : mediaNode['data-quality'];
      if (quality === 'auto') {
        autoSource = mediaNode;
      } else {
        allSources.push({ src: mediaNode.src, quality: quality });
      }
    }
    console.log('TCL: builddash -> allSources', allSources);

    setInterval(() => {
      const p = getNetworkDownloadSpeed();
      p.then(function(kbps) {
        console.log('TCL: getNetworkDownloadSpeed -> mbps', kbps);
        // console.log('TCL: getNetworkDownloadSpeed -> mediaNode', autoSource);
        const qs = [
          { quality: '2160p', speed: 35000 },
          { quality: '1440p', speed: 10000 },
          { quality: '1080p', speed: 8000 },
          { quality: '720p', speed: 5000 },
          { quality: '480p', speed: 2500 },
          { quality: '360p', speed: 0 }
        ];
        const acceptedQs = qs.filter(q => kbps > q.speed).map(q => q.quality);
        console.log('TCL: builddash -> acceptedQs', acceptedQs);
        const foundSrc = acceptedQs.some(q => {
          const found = allSources.find(s => s.quality === q);
          if (found) {
            console.log('TCL: builddash -> found', found);
            autoSource.src = found.src;
            return true;
          }
          return false;
        });
        console.log('TCL: builddash -> foundSrc', foundSrc);
        if (!foundSrc) autoSource.src = allSources[0];
        // if (kbps > 3) autoSource.src = allSources[0];
        // else autoSource.src = allSources[1];
      });
    }, 7000);

    async function getNetworkDownloadSpeed() {
      var baseUrl = 'http://eu.httpbin.org/stream-bytes/5000000';
      var fileSize = 500000;
      var speed = await testNetworkSpeed.checkDownloadSpeed(baseUrl, fileSize);
      const { kbps } = speed;
      return kbps;
    }
  }

  // Optionally, each feature can be destroyed setting a `clean` method

  /**
   * Feature destructor.
   *
   * Always has to be prefixed with `clean` and the name that was used in MepDefaults.features list
   * @param {MediaElementPlayer} player
   * @param {HTMLElement} controls
   * @param {HTMLElement} layers
   * @param {HTMLElement} media
   */
  // clean[feature_name] (player, controls, layers, media) {}

  // Other optional public methods (all documented according to JSDoc specifications)
});
