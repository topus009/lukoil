/* eslint-disabl */
import map_js from './ymaps';

document.addEventListener('DOMContentLoaded', function () {
  // ========================== GLOBAL SCROLL
  (function () {
    const links = document.querySelectorAll('.header .link');

    for (let link = 0; link < links.length; link++) {
      links[link].addEventListener('click', function (h) {
        const target = h.target.getAttribute('data-title');
        document.querySelectorAll('body > .' + target)[0].scrollIntoView({ block: 'start', behavior: 'smooth' });
      });
    }
  }());
  // ========================== MAP
  (function () {
    map_js();
  }());
  // ========================= VIDEO PLAY
  (function () {
    // let play_btn = document.querySelectorAll('.benefits_video_play')[0];
    // let video_title = document.querySelectorAll('.benefits_video_title')[0];
    // let poster = document.querySelectorAll('.poster')[0];
    // let video = document.getElementsByTagName('video')[0];

    // play_btn.addEventListener('click', function () {
    //   play_btn.classList.add('none');
    //   video_title.classList.add('none');
    //   video.setAttribute('controls', 'true');
    //   video.setAttribute('autoplay', 'true');
    //   video.classList.remove('none');
    //   video.play();
    //   poster.style.backgroundImage = 'none';
    //   poster.style.zindex = '-1';
    // });
    // // ============ ПАУЗА
    // video.addEventListener('click', function (e) {
    //   if (!e.target.paused) {
    //     video.pause();
    //   } else {
    //     video.play();
    //   }
    // });
    // ===============
  }());
});
