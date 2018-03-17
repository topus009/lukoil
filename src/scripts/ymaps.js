// import getData from './data.json';
import getData from './getData';

export default function map_js() {
  const ver = '2.1';
  const language = 'ru_Ru';
  const coordorder = 'longlat';
  const mode = 'debug';
  const lat = '37.64';
  const long = '55.76';
  const behaviour = ['zoomControl', 'typeSelector', 'searchControl', 'fullscreenControl', 'geolocationControl', 'trafficControl', 'rulerControl'];
  const script = document.createElement('script');
  script.src = `https://api-maps.yandex.ru/${ver}/?lang=${language}&coordorder=${coordorder}&mode=${mode}`;
  document.body.appendChild(script);
  let myMap; /* eslint no-unused-vars: 1 */
  // ===================================
  const target_car = 'cargo';
  const target_city = 'Москва';
  let data;
  getData('https://raw.githubusercontent.com/topus009/ets/master/data.json').then((response) => {
    data = response;
  });
  // ===================================
  script.onload = function () {
    /* global ymaps */
    // ================================
    ymaps.ready(function () {
      console.warn(data);
      myMap = new ymaps.Map('map_box', {
        center: [lat, long],
        zoom: 11,
      });
      myMap.container.fitToViewport('always');
      // =========== УДАЛЕНИЕ НЕНУЖНЫХ СТИЛЕЙ ========
      for (let b = 0; b < behaviour.length; b++) {
        myMap.controls.remove(behaviour[b]);
      }
      const ymap_doc = document.getElementsByTagName('ymaps');
      for (let el = 0; el < ymap_doc.length; el++) {
        if (ymap_doc[el].className.indexOf('copyright') > -1) {
          ymap_doc[el].remove();
        }
      }
      // ==========================================================================
      // ==========================================================================
      // ==========================================================================
      // ==========================================================================
      const points = [];
      for (let i = 0; i < data.length; i++) {
        points.push(
          {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [+data[i].lat, +data[i].long],
            },
            options: {
              iconImageHref: '../images/map_icon.png',
              iconImageSize: [30, 43],
              iconLayout: 'default#image',
            },
            properties: {
              city: data[i].city,
              car: data[i].car,
              cargo: data[i].cargo,
            },
          }
        );
      }

      let geoPoints = {
        type: 'FeatureCollection',
        features: points,
      };
      // ===============================================
      // ===============================================
      // ===============================================
      // ===============================================
      const objectManager = new ymaps.ObjectManager({
        clusterize: true,
        gridSize: 32,
        clusterDisableClickZoom: true,
      });
      objectManager.add(geoPoints);
      objectManager.clusters.options.set('preset', 'islands#greenClusterIcons');
      myMap.geoObjects.add(objectManager);
      // ===============================================
      // ===============================================
      function checkState(e) {
        let newPoints;
        if (e === 'car') {
          // objectManager.setFilter(function (object) {
          //   return object.properties.car !== undefined;
          // });
          newPoints = geoPoints.features.filter(function (p) {
            return !!p.properties.car;
          });
          geoPoints = {
            type: 'FeatureCollection',
            features: newPoints,
          };
          console.warn(geoPoints.features);
          objectManager.removeAll();
          myMap.geoObjects.removeAll();
          objectManager.add(geoPoints);
          objectManager.clusters.options.set('preset', 'islands#greenClusterIcons');
          myMap.geoObjects.add(objectManager);
        }
        if (e === 'cargo') {
          // objectManager.setFilter(function (object) {
          //   return object.properties.cargo !== undefined;
          // });
          newPoints = geoPoints.features.filter(function (p) {
            return !!p.properties.cargo;
          });
          geoPoints = {
            type: 'FeatureCollection',
            features: newPoints,
          };
          console.warn(geoPoints.features);
          objectManager.removeAll();
          myMap.geoObjects.removeAll();
          objectManager.add(geoPoints);
          objectManager.clusters.options.set('preset', 'islands#greenClusterIcons');
          myMap.geoObjects.add(objectManager);
        }
      }
      // ===============================================
      // ============= ФИЛЬТР ==========================
      const select_car = document.querySelector('.select_car');
      const select_city = document.querySelector('.select_city');

      select_car.addEventListener('change', function (e) {
        checkState(e.target.value);
      });
      select_city.addEventListener('change', function (e) {
        objectManager.setFilter(function (object) {
          return object.properties.city === e.target.value;
        });
      });


      //     // ===========================
    });
  };
}
