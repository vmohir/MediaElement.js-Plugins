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
  isShowingPrerole: false,
  addddd: false,
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
  jjjjjjjjjjjjjj: '',
  buildvmap(player, controls, layers, media) {
    // console.log('TCL: builddash -> player, controls, layers, media', player, controls, layers, media);
    const t = this;
    console.log('TCL: buildvmap -> t', t);

    const VMAP = require('vmap');
    t.jjjjjjjjjjjjjj = t.media.originalNode.src;

    // Fetch VMAP as XML
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/vmap.xml');
    xhr.send();
    xhr.onreadystatechange = function() {
      if (xhr.readyState === xhr.DONE) {
        if (xhr.status === 200) {
          // Get a parsed VMAP object
          const vmap = new VMAP(xhr.responseXML);
          // console.log('TCL: xhr.onreadystatechange -> vmap', vmap, vmap.adBreaks[0], vmap.adBreaks[0].adSource.adTagURI.uri);
          const vst = vmap.adBreaks.find(v => v.timeOffset === 'start').adSource.adTagURI.uri;
          console.log('TCL: xhr.onreadystatechange -> vst', vst);

          // t.vastSetAdTagUrl(vst);
          // if (t.options.vastAdTagUrl !== '') {
          //   t.vastLoadAdTagInfo();
          // }
          // t.buildads(player, controls, layers, media);
          t.playAd(player, controls, layers, media, vst);

          // t.isShowingPrerole = true;

          const midroles = vmap.adBreaks.filter(v => v.timeOffset !== 'start' && v.timeOffset !== 'end');

          t.displayMidrolls(midroles, player, controls, layers, media);

          // const endrole = vmap.adBreaks.find(v => v.timeOffset === 'end');

          const vstend = vmap.adBreaks.find(v => v.timeOffset === 'end').adSource.adTagURI.uri;

          t.node.addEventListener('ended', event => {
            console.log('TCL: xhr.onreadystatechange -> t.addddd', t.addddd);
            if (!t.addddd) {
              t.playAd(player, controls, layers, media, vstend);
            }
          });
        }
      }
    };
    // console.log('TCL: buildstoryboard -> t', t);

    // const children = t.mediaFiles ? t.mediaFiles : t.node.children;
    // const allSources = [];

    // for (var i = 0, total = children.length; i < total; i++) {
    //   var mediaNode = children[i];
    //   // var quality = mediaNode instanceof HTMLElement ? mediaNode.getAttribute('data-quality') : mediaNode['data-quality'];
    // }
  },
  displayMidrolls(_midroles, player, controls, layers, media) {
    // const midroles = _midroles.
    const allTimes = _midroles.map((m, i) => ({ time: m.timeOffset, i }));
    const distinctTimes = [...new Set(allTimes.map(t => t.time))];
    const midroles = [];
    distinctTimes.forEach(time => {
      const all = _midroles.filter(mid => mid.timeOffset === time);
      var rand = all[Math.floor(Math.random() * all.length)];
      midroles.push(rand);
    });

    midroles.forEach(m => {
      var a = m.timeOffset.split(':'); // split it at the colons

      // minutes are worth 60 seconds. Hours are worth 60 minutes.
      var seconds = +a[0] * 60 * 60 + +a[1] * 60 + +a[2];
      m.displayTime = seconds;
    });
    console.log('TCL: displayMidrolls -> midroles', midroles);
    const t = this;

    let timeOfVIdeoBeforeMid = 0;
    t.node.addEventListener('timeupdate', e => {
      const currentTime = t.node.currentTime;
      if (t.isShowingPrerole) return;
      midroles.reverse().some(m => {
        // console.log('TCL: displayMidrolls -> currentTime', currentTime, m.displayTime);
        if (currentTime > m.displayTime && m.hasShown !== true && currentTime - m.displayTime < 1) {
          m.hasShown = true;
          t.playAd(player, controls, layers, media, m.adSource.adTagURI.uri);
          timeOfVIdeoBeforeMid = currentTime;
          console.log('TCL: displayMidrolls -> t', t);
          return true;
        }
      });
    });

    this.container.addEventListener('mejsprerollended', function() {
      t.addddd = false;
      console.log('TCL: displayMidrolls -> mejsprerollended', timeOfVIdeoBeforeMid);
      if (t.isShowingPrerole) t.isShowingPrerole = false;
      setTimeout(() => {
        t.adRestoreMainMedia();
        t.node.currentTime = timeOfVIdeoBeforeMid;
      }, 100);
    });

    // this.container.addEventListener('mejsprerollskipclicked', function() {
    //   console.log('TCL: displayMidrolls -> mejsprerollskipclicked', timeOfVIdeoBeforeMid);
    //   if (t.isShowingPrerole) t.isShowingPrerole = false;
    //   t.node.currentTime = timeOfVIdeoBeforeMid;
    // });

    // setTimeout(() => {
    //   t.options.vastAdTagUrl = midroles[0].adSource.adTagURI.uri;
    //   // t.vastSetAdTagUrl(vst);
    //   t.buildvast(player, controls, layers, media);
    // }, 3400);
  },
  playAd(player, controls, layers, media, url) {
    const t = this;

    t.adsPrerollAdEnableSkip = true;
    t.adsPrerollAdSkipSeconds = 3;

    t.vastSetAdTagUrl(url);
    // t.buildvast(player, controls, layers, media);

    if (t.options.vastAdTagUrl !== '') {
      t.vastLoadAdTagInfo();
    }

    t.adsLoaded = false;
    // t.adsDataIsLoading = false;
    console.log('TCL: playAd -> t.media.originalNode.src', t.media.originalNode.src, t.adsCurrentMediaUrl);
    t.media.originalNode.src = t.jjjjjjjjjjjjjj;
    t.adsCurrentMediaUrl = t.media.originalNode.src;
    // t.adsCurrentMediaDuration = 0;
    // t.adsPlayerHasStarted = false;
    t.addddd = true;
    t.buildads(player, controls, layers, media);
  }
});
