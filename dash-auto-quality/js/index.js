$('#videoplayer').mediaelementplayer({
  // pluginPath: '/path/to/shims/',
  // When using jQuery's `mediaelementplayer`, an `instance` argument
  // is available in the `success` callback
  features: ['playpause', 'current', 'progress', 'duration', 'volume', 'dash', 'quality'],
  defaultQuality: 'auto',
  // dash: {
  //   debug: true,
  //   path: 'http://www.bok.net/dash/tears_of_steel/cleartext/stream.mpd'
  // },
  // renderes: ['native_dash'],

  success: function(media, node, instance) {
    // console.log('TCL: instance', instance);
    // console.log('TCL: originalNode', originalNode);
    // console.log('TCL: mediaElement', mediaElement);
    // do things
    // if (Hls !== undefined) {
    //   media.addEventListener(Hls.Events.MEDIA_ATTACHED, function() {
    //     // All the code when this event is reached...
    //     console.log('Media attached!');
    //   });
    //   // Manifest file was parsed, invoke loading method
    //   media.addEventListener(Hls.Events.MANIFEST_PARSED, function() {
    //     // All the code when this event is reached...
    //     console.log('Manifest parsed!');
    //   });
    //   media.addEventListener(Hls.Events.FRAG_PARSING_METADATA, function(event, data) {
    //     // All the code when this event is reached...
    //     console.log(data);
    //   });
    // }
  }
});

// const player = new MediaElementPlayer('videoplayer', {
//   defaultSpeed: 5
//   // other configuration elements
// });
