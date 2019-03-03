(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
  buildstoryboard(player, controls, layers, media) {
    // console.log('TCL: builddash -> player, controls, layers, media', player, controls, layers, media);
    // const { options } = player;
    // This allows us to access options and other useful elements already set.
    // Adding variables to the object is a good idea if you plan to reuse
    // those variables in further operations.
    const t = this;
    const frameCounts = parseInt(t.node.getAttribute('data-stb-frame-counts'), 10);
    // console.log('TCL: buildstoryboard -> t.media', t.node);
    const imagesSrc = t.node.getAttribute('data-stb-src');
    // console.log('TCL: buildstoryboard -> imagesSrc', imagesSrc);
    const lastImgRows = Math.ceil((frameCounts % 25) / 5);

    const stb = document.createElement('div');
    stb.setAttribute('id', 'storyboard-created-hover');
    stb.style.position = 'fixed';
    stb.style.zIndex = '999999';
    stb.style.width = '150px';
    stb.style.height = '85px';
    stb.style.background = '#000000';
    stb.style.transform = 'translate(-50%, -100%)';

    stb.style.backgroundImage = `url("${imagesSrc}M0.jpg")`;
    stb.style.backgroundSize = '500% 500%';
    stb.style.backgroundRepeat = 'no-repeat';

    document.getElementsByTagName('body')[0].appendChild(stb);

    const slider = document.querySelector('.mejs__time-total.mejs__time-slider');
    // console.log('TCL: buildstoryboard -> slider', slider);
    slider.addEventListener('mousemove', function(event) {
      const mouseX = event.pageX;
      // const mouseY = event.pageY;
      const { left, top, width } = slider.getBoundingClientRect();
      const mouseXRel = event.pageX - left;
      const mouseXPercent = mouseXRel / width;
      // console.log('TCL: buildstoryboard -> mouseXRel', mouseXRel, top);
      stb.style.left = `${mouseX}px`;
      stb.style.top = `${top - 5}px`;

      const frameN = Math.max(Math.min(Math.ceil(mouseXPercent * frameCounts), frameCounts), 1);
      const res = t.getFramePosition(frameCounts, frameN);
      console.log('TCL: buildstoryboard -> res', frameN, res, lastImgRows);

      stb.style.backgroundImage = `url("${imagesSrc}M${res.fileIndex}.jpg")`;
      stb.style.backgroundSize = `500% ${res.isLastImage ? lastImgRows * 100 : 500}%`;
      stb.style.backgroundPositionX = `${res.col * 25}%`;
      stb.style.backgroundPositionY = `${res.row * (res.isLastImage ? 100 / (lastImgRows - 1) : 25)}%`;
    });

    // const children = t.mediaFiles ? t.mediaFiles : t.node.children;
    // const allSources = [];

    // for (var i = 0, total = children.length; i < total; i++) {
    //   var mediaNode = children[i];
    //   // var quality = mediaNode instanceof HTMLElement ? mediaNode.getAttribute('data-quality') : mediaNode['data-quality'];
    // }
  },

  getFramePosition(frameCounts, _frameN) {
    const frameN = _frameN - 1;
    const totalFiles = Math.ceil(frameCounts / 25);
    const fileIndex = parseInt(frameN / 25, 10);

    const fFrameN = frameN % 25;
    const row = Math.floor(fFrameN / 5);
    const col = fFrameN % 5;
    return { fileIndex, fFrameN, row, col, isLastImage: fileIndex === totalFiles - 1 };
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

},{}]},{},[1]);
