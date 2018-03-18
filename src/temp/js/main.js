/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__getData__ = __webpack_require__(1);
// import getData from './data.json';


var map_js = function map_js() {
  var ver = '2.1';
  var language = 'ru_Ru';
  var coordorder = 'longlat';
  var mode = 'debug';
  var lat = '37.64';
  var long = '55.76';
  var behaviour = ['typeSelector', 'searchControl', 'fullscreenControl', 'geolocationControl', 'trafficControl', 'rulerControl'];
  var script = document.createElement('script');
  script.src = 'https://api-maps.yandex.ru/' + ver + '/?lang=' + language + '&coordorder=' + coordorder + '&mode=' + mode;
  var children = document.body.children;
  children[0].appendChild(script);
  var myMap = void 0; /* eslint no-unused-vars: 1 */
  // ===================================
  var data = void 0;
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__getData__["a" /* default */])('https://raw.githubusercontent.com/topus009/ets/master/data.json').then(function (response) {
    data = response;
  });
  // ===================================
  script.onload = function () {
    /* global ymaps */
    // ================================
    ymaps.ready(function () {
      myMap = new ymaps.Map('map_box', {
        center: [lat, long],
        zoom: 11
      });
      var ymap_doc = document.getElementsByTagName('ymaps');
      var points = [];
      var select_car = document.querySelector('.select_car');
      var select_city = document.querySelector('.select_city');

      myMap.container.fitToViewport('always');
      myMap.behaviors.disable('scrollZoom');
      // =========== УДАЛЕНИЕ НЕНУЖНЫХ СТИЛЕЙ ========
      for (var b = 0; b < behaviour.length; b++) {
        myMap.controls.remove(behaviour[b]);
      }
      for (var el = 0; el < ymap_doc.length; el++) {
        if (ymap_doc[el].className.indexOf('copyright') > -1) {
          ymap_doc[el].remove();
        }
      }
      // =============================================
      for (var i = 0; i < data.length; i++) {
        points.push({
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [+data[i].lat, +data[i].long]
          },
          options: {
            iconImageHref: '../images/map_icon.png',
            iconImageSize: [30, 43],
            iconLayout: 'default#image'
          },
          properties: {
            city: data[i].city,
            car: data[i].car,
            cargo: data[i].cargo
          }
        });
      }

      var geoPoints = {
        type: 'FeatureCollection',
        features: points
      };
      // ===============================================
      var objectManager = new ymaps.ObjectManager({
        clusterize: true,
        gridSize: 32,
        clusterDisableClickZoom: true
      });
      objectManager.add(geoPoints);
      objectManager.clusters.options.set('preset', 'islands#redClusterIcons');
      myMap.geoObjects.add(objectManager);
      // ===============================================
      var checkState = function checkState(e) {
        var newPoints = void 0;
        if (e === 'car') {
          newPoints = geoPoints.features.filter(function (p) {
            return !!p.properties.car;
          });
          geoPoints = {
            type: 'FeatureCollection',
            features: newPoints
          };
          console.warn(geoPoints.features);
          objectManager.removeAll();
          myMap.geoObjects.removeAll();
          objectManager.add(geoPoints);
          objectManager.clusters.options.set('preset', 'islands#redClusterIcons');
          myMap.geoObjects.add(objectManager);
        }
        if (e === 'cargo') {
          newPoints = geoPoints.features.filter(function (p) {
            return !!p.properties.cargo;
          });
          geoPoints = {
            type: 'FeatureCollection',
            features: newPoints
          };
          objectManager.removeAll();
          myMap.geoObjects.removeAll();
          objectManager.add(geoPoints);
          objectManager.clusters.options.set('preset', 'islands#redClusterIcons');
          myMap.geoObjects.add(objectManager);
        }
      };
      // ===============================================
      // ============= ФИЛЬТР ==========================
      select_car.addEventListener('change', function (e) {
        checkState(e.target.value);
      });
      select_city.addEventListener('change', function (e) {
        objectManager.setFilter(function (object) {
          return object.properties.city === e.target.value;
        });
      });
    });
  };
};

/* harmony default export */ __webpack_exports__["a"] = (map_js);

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = getData;
function request(url) {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();

    xhr.open('GET', url, false);
    xhr.onload = function () {
      if (this.status === 200) {
        resolve(JSON.parse(this.response));
      } else {
        var error = new Error(this.statusText);
        error.code = this.status;
        reject(error);
      }
    };

    xhr.onerror = function () {
      reject(new Error('Network Error'));
    };

    xhr.send();
  });
}

function getData(url) {
  return request(url);
}

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ymaps__ = __webpack_require__(0);
/* eslint-disabl */


document.addEventListener('DOMContentLoaded', function () {
  // ========================== GLOBAL SCROLL
  (function () {
    var links = document.querySelectorAll('.header .link');

    for (var link = 0; link < links.length; link++) {
      links[link].addEventListener('click', function (h) {
        var target = h.target.getAttribute('data-title');
        document.querySelectorAll('body > .' + target)[0].scrollIntoView({ block: 'start', behavior: 'smooth' });
      });
    }
  })();
  // ========================== MAP
  (function () {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__ymaps__["a" /* default */])();
  })();
  // ========================= VIDEO PLAY
  (function () {
    var play_btn = document.querySelectorAll('.benefits_video_play')[0];
    var video_title = document.querySelectorAll('.benefits_video_title')[0];
    var poster = document.querySelectorAll('.poster')[0];
    var video = document.getElementsByTagName('video')[0];

    play_btn.addEventListener('click', function () {
      play_btn.classList.add('none');
      video_title.classList.add('none');
      video.setAttribute('controls', 'true');
      video.setAttribute('autoplay', 'true');
      video.classList.remove('none');
      video.play();
      poster.style.backgroundImage = 'none';
      poster.style.zindex = '-1';
    });
    // ============ ПАУЗА
    video.addEventListener('click', function (e) {
      if (!e.target.paused) {
        video.pause();
      } else {
        video.play();
      }
    });
    // ===============
  })();
});

/***/ })
/******/ ]);