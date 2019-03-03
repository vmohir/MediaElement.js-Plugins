// try{// let audio;
const audio = document.getElementById('audioplayer');
const video = document.getElementById('videoplayer');
// const video = $('#videoplayer')[0];

let updateCounter = 0;

$('#videoplayer').mediaelementplayer({
  features: ['playpause', 'current', 'progress', 'duration', 'volume', 'caption', 'tracks', 'styledvtt'],
  defaultQuality: 'auto',
  // dash: {
  //   debug: true,
  //   path: 'http://www.bok.net/dash/tears_of_steel/cleartext/stream.mpd'
  // },
  // renderes: ['native_dash'],

  success: function(media, video, instance) {}
});
