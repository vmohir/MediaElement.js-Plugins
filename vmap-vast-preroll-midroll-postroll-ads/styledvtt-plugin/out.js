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
  buildstyledvtt(player, controls, layers, media) {
    // console.log('TCL: builddash -> player, controls, layers, media', player, controls, layers, media);
    // const { options } = player;
    // This allows us to access options and other useful elements already set.
    // Adding variables to the object is a good idea if you plan to reuse
    // those variables in further operations.
    const t = this;
    console.log('TCL: buildstoryboard -> t', t);
    let orgEntries;

    let tut = 0;
    t.node.addEventListener('timeupdate', e => {
      // tut++;
      // if (tut % 2 !== 0) return;
      // console.log('TCL: buildstyledvtt -> e');

      const track = t.tracks[0];
      const currentTime = t.node.currentTime;
      console.log('TCL: buildstyledvtt -> track', currentTime, orgEntries);

      track.entries = orgEntries.map(tr => ({
        ...tr,
        text: (text => {
          const x = t.recursive(text, currentTime);
          // console.log('TCL: buildstyledvtt -> x', x);
          return x;
        })(tr.text)
      }));

      console.log(track.entries.map(tr => ({ start: tr.start, stop: tr.stop, text: tr.text })));
    });

    if (t.tracks.length > 0) {
      const interval = setInterval(() => {
        const track = t.tracks[0];
        if (track.entries.length === 0) return;

        clearInterval(interval);
        track.entries = track.entries.map(tr => ({
          ...tr,
          text: `<p class="align-left"><span class="past">${tr.text}</span></p>`
        }));

        track.entries = track.entries.map(tr => ({
          ...tr,
          text: tr.text
            .replace(/<c\.color(.{6})>/gim, (m, x, y, z, a, b, c) => ``)
            .replace(/<\/c>/gim, (m, x, y, z, a, b, c) => ``)
            .replace(/<c>/gim, (m, x, y, z, a, b, c) => ``)
        }));

        orgEntries = track.entries;
        console.log('TCL: orgEntries', orgEntries);

        // console.log(track.entries.map(t => ({ start: t.start, stop: t.stop, text: t.text })));
      }, 100);
    }

    // const children = t.mediaFiles ? t.mediaFiles : t.node.children;
    // const allSources = [];

    // for (var i = 0, total = children.length; i < total; i++) {
    //   var mediaNode = children[i];
    //   // var quality = mediaNode instanceof HTMLElement ? mediaNode.getAttribute('data-quality') : mediaNode['data-quality'];
    // }
  },

  recursive(text, currentTime) {
    const newText = text.replace(
      /<\d{2}:\d{2}:(\d{2})\.(\d{0,3})>([^<]*)(<\d{2}:\d{2}:(\d{2})\.(\d{0,3})>)/im,
      (a, s, d, theText, g, i, o) => {
        // console.log('TCL: buildstyledvtt -> a, s, d, f, g', a, s, d, theText, g, i, o);
        const startTime = parseFloat(`${s}.${d}`);
        const endTime = parseFloat(`${i}.${o}`);
        // console.log('TCL: buildstyledvtt -> startTime', startTime, endTime, currentTime);
        if (currentTime > startTime && currentTime < endTime) {
          return `</span><span class="future">${theText}`;
        }
        return `${theText}${g}`;
      }
    );
    if (newText === text) {
      return newText.replace(/<\d{2}:\d{2}:(\d{2})\.(\d{0,3})>/im, (a, s, d, theText, g, i, o) => {
        // console.log('TCL: buildstyledvtt -> a, s, d, f, g', a, s, d, theText, g, i, o);
        return ``;
      });
    }
    return this.recursive(newText, currentTime);
  }
});

},{}]},{},[1]);
