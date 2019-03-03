// try{// let audio;
const audio = document.getElementById('audioplayer');
const video = document.getElementById('videoplayer');
// const video = $('#videoplayer')[0];

let updateCounter = 0;

$('#videoplayer').mediaelementplayer({
  features: ['playpause', 'current', 'progress', 'duration', 'volume'],
  defaultQuality: 'auto',
  // dash: {
  //   debug: true,
  //   path: 'http://www.bok.net/dash/tears_of_steel/cleartext/stream.mpd'
  // },
  // renderes: ['native_dash'],

  success: function(media, video, instance) {
    video.addEventListener('timeupdate', e => {
      if (updateCounter === 2000) {
        audio.currentTime = video.currentTime;
      }
      updateCounter++;
      // }
    });
    video.addEventListener('seeked', e => {
      console.log('seeked');
      audio.currentTime = video.currentTime;
      audio.play();
    });
    video.addEventListener('play', e => {
      console.log('play');
      audio.currentTime = video.currentTime;
      audio.play();
    });
    video.addEventListener('pause', e => {
      console.log('pause');
      audio.pause();
    });
    video.addEventListener('stalled', e => {
      console.log('stalled');
      //   audio.currentTime = video.currentTime;
      //   audio.pause();
    });
    video.addEventListener('suspend', e => {
      console.log('suspend');
      //   audio.currentTime = video.currentTime;
      //   audio.pause();
    });
    video.addEventListener('waiting', e => {
      console.log('waiting');
      //   audio.currentTime = video.currentTime;
      audio.pause();
    });
    video.addEventListener('progress', e => {
      console.log('progress');
      //   audio.currentTime = video.currentTime;
      //   audio.pause();
      // }
    });
    video.addEventListener('loadeddata', e => {
      console.log('loadeddata');
      //   audio.currentTime = video.currentTime;
      //   audio.play();
      // }
    });
    video.addEventListener('canplaythrough', e => {
      console.log('canplaythrough');
      // video.play();
      audio.currentTime = video.currentTime;
      audio.play();
    });
  }
});

audio.addEventListener('seeked', e => {
  console.log('seeked audio');
  // video.currentTime = audio.currentTime;
  // video.play();
});
audio.addEventListener('play', e => {
  console.log('play audio');
  // video.currentTime = audio.currentTime;
  // video.play();
});
audio.addEventListener('pause', e => {
  console.log('pause audio');
  // video.pause();
});
audio.addEventListener('stalled', e => {
  console.log('stalled audio');
  //   video.currentTime = audio.currentTime;
  //   video.pause();
});
audio.addEventListener('suspend', e => {
  console.log('suspend audio');
  //   video.currentTime = audio.currentTime;
  //   video.pause();
});
audio.addEventListener('waiting', e => {
  console.log('waiting audio');
  //   video.currentTime = audio.currentTime;
  // video.pause();
});
audio.addEventListener('progress', e => {
  console.log('progress audio');
  // video.currentTime = audio.currentTime;
  // video.play();
});
audio.addEventListener('loadeddata', e => {
  console.log('loadeddata audio');
  //   video.currentTime = audio.currentTime;
  //   video.play();
});
audio.addEventListener('canplaythrough', e => {
  console.log('canplaythrough audio');
  // video.play();
  // video.currentTime = audio.currentTime;
  // video.play();
});

// audio.addEventListener('seeked', e => {
// console.log('seeked audio');
//   if (video) video.currentTime = audio.currentTime;
// });
// audio.addEventListener('play', e => {
// console.log('play audio');
//   if (video) video.play();
// });
// audio.addEventListener('pause', e => {
// console.log('pause audio');
//   if (video) video.pause();
// });
// audio.addEventListener('stalled', e => {
// console.log('stalled audio');
//   if (video) {
//     video.currentTime = audio.currentTime;
//     video.pause();
//   }
// });
// audio.addEventListener('suspend', e => {
// console.log('suspend audio');
//   // if (video) {
//   //   video.currentTime = audio.currentTime;
//   //   video.pause();
//   // }
// });
// audio.addEventListener('waiting', e => {
// console.log('waiting audio');
//   if (video) {
//     // video.currentTime = audio.currentTime;
//     video.pause();
//   }
// });
// audio.addEventListener('canplaythrough', e => {
// console.log('canplaythrough audio');
//   audio.play();
//   if (video) {
//     video.currentTime = audio.currentTime;
//     video.play();
//   }
// });
// audio.addEventListener('progress', e => {
// console.log('progress audio');
//   if (video) {
//     video.currentTime = audio.currentTime;
//     video.pause();
//   }
// });
// audio.addEventListener('loadeddata', e => {
// console.log('loadeddata audio');
//   // if (video) {
//   //   video.currentTime = audio.currentTime;
//   //   video.play();
//   // }
// });

// $('#audioplayer').mediaelementplayer({
//   features: ['playpause', 'current', 'progress', 'duration', 'volume'],
//   defaultQuality: 'auto',
//   // dash: {
//   //   debug: true,
//   //   path: 'http://www.bok.net/dash/tears_of_steel/cleartext/stream.mpd'
//   // },
//   // renderes: ['native_dash'],

//   success: function(media, audio, instance) {
// console.log('TCL: media, node, instance', instance);
//     audio = audio;
//   }
// });
let updateCounterAudio = 0;
audio.addEventListener('timeupdate', e => {
  if (updateCounterAudio === 2000) {
    video.currentTime = audio.currentTime;
  }
  updateCounterAudio++;
  // }
});
