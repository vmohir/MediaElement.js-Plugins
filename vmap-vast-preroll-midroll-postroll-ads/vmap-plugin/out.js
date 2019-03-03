(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";var classCallCheck=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")},createClass=function(){function e(e,t){for(var a=0;a<t.length;a++){var r=t[a];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,a,r){return a&&e(t.prototype,a),r&&e(t,r),t}}(),toConsumableArray=function(e){if(Array.isArray(e)){for(var t=0,a=Array(e.length);t<e.length;t++)a[t]=e[t];return a}return Array.from(e)},VMAPAdSource=function e(t){for(var a in classCallCheck(this,e),this.id=t.getAttribute("id"),this.allowMultipleAds=t.getAttribute("allowMultipleAds"),this.followRedirects=t.getAttribute("followRedirects"),this.vastAdData=null,this.adTagURI=null,this.customData=null,t.childNodes){var r=t.childNodes[a];switch(r.localName){case"AdTagURI":this.adTagURI={templateType:r.getAttribute("templateType"),uri:(r.textContent||r.text||"").trim()};break;case"VASTAdData":for(this.vastAdData=r.firstChild;this.vastAdData&&1!==this.vastAdData.nodeType;)this.vastAdData=this.vastAdData.nextSibling;break;case"CustomAdData":this.customData=r}}};function childrenByName(e,t){return[].concat(toConsumableArray(e.childNodes)).filter(function(e){return e.nodeName===t||t==="vmap:"+e.nodeName||e.nodeName==="vmap:"+t})}function parseNodeValue(e){var t=e&&e.childNodes&&[].concat(toConsumableArray(e.childNodes));if(!t)return{};var a=t.filter(function(e){return"#cdata-section"===e.nodeName});if(a&&a.length>0)try{return JSON.parse(a[0].data)}catch(e){}return t.reduce(function(e,t){var a="";switch(t.nodeName){case"#text":a=t.textContent.trim();break;case"#cdata-section":a=t.data}return e+a},"")}function parseXMLNode(e){var t={attributes:{},children:{},value:{}};return t.value=parseNodeValue(e),e.attributes&&[].concat(toConsumableArray(e.attributes)).forEach(function(e){e.nodeName&&void 0!==e.nodeValue&&null!==e.nodeValue&&(t.attributes[e.nodeName]=e.nodeValue)}),e.childNodes&&[].concat(toConsumableArray(e.childNodes)).filter(function(e){return"#"!==e.nodeName.substring(0,1)}).forEach(function(e){t.children[e.nodeName]=parseXMLNode(e)}),t}var VMAPAdBreak=function(){function e(t){for(var a in classCallCheck(this,e),this.timeOffset=t.getAttribute("timeOffset"),this.breakType=t.getAttribute("breakType"),this.breakId=t.getAttribute("breakId"),this.repeatAfter=t.getAttribute("repeatAfter"),this.adSource=null,this.trackingEvents=[],this.extensions=[],t.childNodes){var r=t.childNodes[a];switch(r.localName){case"AdSource":this.adSource=new VMAPAdSource(r);break;case"TrackingEvents":for(var n in r.childNodes){var i=r.childNodes[n];"Tracking"===i.localName&&this.trackingEvents.push({event:i.getAttribute("event"),uri:(i.textContent||i.text||"").trim()})}break;case"Extensions":this.extensions=childrenByName(r,"Extension").map(function(e){return parseXMLNode(e)})}}}return createClass(e,[{key:"track",value:function(e,t){for(var a in this.trackingEvents){var r=this.trackingEvents[a];if(r.event===e){var n=r.uri;"error"===r.event&&(n=n.replace("[ERRORCODE]",t)),this.tracker(n)}}}},{key:"tracker",value:function(e){"undefined"!=typeof window&&null!==window&&((new Image).src=e)}}]),e}(),VMAP=function e(t){if(classCallCheck(this,e),!t||!t.documentElement||"VMAP"!==t.documentElement.localName)throw new Error("Not a VMAP document");for(var a in this.version=t.documentElement.getAttribute("version"),this.adBreaks=[],this.extensions=[],t.documentElement.childNodes){var r=t.documentElement.childNodes[a];switch(r.localName){case"AdBreak":this.adBreaks.push(new VMAPAdBreak(r));break;case"Extensions":this.extensions=childrenByName(r,"Extension").map(function(e){return parseXMLNode(e)})}}};module.exports=VMAP;

},{}],2:[function(require,module,exports){
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

},{"vmap":1}]},{},[2]);
