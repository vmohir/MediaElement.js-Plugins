// try{// let audio;

$('#videoplayer').mediaelementplayer({
  features: ['playpause', 'current', 'progress', 'duration', 'volume', 'vmap', 'ads', 'vast'],
  // adsPrerollMediaUrl: '',
  // adsPrerollAdUrl: '',
  adsPrerollAdEnableSkip: true,
  adsPrerollAdSkipSeconds: 1,
  // indexPreroll: 0,
  // vastAdTagUrl: '/vast.xml',

  success: function(media, video, instance) {
    console.log('TCL: instance', instance);
    // instance.globalClickCallback = function(event) {
    //   console.log('TCL: instance.globalClickCallback -> event', event);
    // };
    // instance.clickToPlayPauseCallback = function(event) {
    //   console.log('TCL: instance.clickToPlayPauseCallback -> event', event);
    // };
    // const b = instance.vastLoaded;
    // instance.vastLoaded = function() {
    //   console.log('TCL: instance.vastLoaded -> event');
    // };

    // instance.adsAdClick = function() {
    //   console.log('TCL: instance.adsAdClick -> function');
    // };

    // const videom = document.querySelector('.mejs__layer.mejs__overlay.mejs__ads');
    // console.log('TCL: interval -> videom', videom);
    // videom.addEventListener('click', function() {
    //   console.log('TCL: 1000');
    //   instance.container.dispatchEvent(new Event('mejsprerolladsclicked'));
    // });

    let ended = false;
    const progressDone = [];

    // const videoad = document.querySelector('#videoplayer_html5');
    instance.node.addEventListener('timeupdate', e => {
      if (ended) return;
      // console.log('TCL: videoad', instance, ended);
      const adTag = instance.vastAdTags[0];
      const currentTime = instance.node.currentTime;
      if (!adTag) return;

      adTag.trackingEvents.progress.forEach(p => {
        const time = parseInt(p.substr(p.lastIndexOf('/') + 1), 10);
        if (currentTime > time && !progressDone.some(p222 => p222 === p)) {
          console.log('TCL: currentTime', currentTime, time);
          progressDone.push(p);
          instance.adsLoadUrl(p);
        }
      });
    });
    instance.node.addEventListener('ended', e => {
      // console.log('TCL: videoad', instance);
      if (ended) return;
      const adTag = instance.vastAdTags[0];
      instance.adsLoadUrl(adTag.trackingEvents.complete[0]);
      ended = true;
    });

    instance.container.addEventListener('mejsprerollended', function() {
      ended = true;
    });

    // instance.container.addEventListener('mejsprerolladsclicked', function() {
    //   instance.
    //   // console.log('TCL: instance.vastAdTags', instance.vastAdTags);
    //   // console.log('TCL: instance.options.indexPreroll', instance.options.indexPreroll);
    //   // var adTag = instance.vastAdTags[instance.options.indexPreroll];
    //   // console.log('TCL: adTag', adTag);

    //   // console.log('TCL: instance.vastAdTags.length', instance.vastAdTags.length);
    //   // console.log('TCL: adTag.clickThrough', adTag.clickThrough);
    //   // console.log('TCL: adTag.clickTracking', adTag.clickTracking);
    //   // if (
    //   //   instance.vastAdTags.length > 0 &&
    //   //   instance.options.indexPreroll < instance.vastAdTags.length &&
    //   //   adTag.clickThrough &&
    //   //   adTag.clickTracking
    //   // ) {
    //   //   console.log('TCL: IIIIIIIIIIIIIIIIIIIIII');
    //   //   instance.adsLoadUrl(adTag.clickTracking);
    //   // }
    // });

    // instance.adsSkipClick LATER
  }
});
