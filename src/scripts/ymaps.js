// import getData from './data.json';
import getData from './getData';

const map_js = () => {
  const ver = '2.1';
  const language = 'ru_Ru';
  const coordorder = 'longlat';
  const mode = 'debug';
  const lat = '37.64';
  const long = '55.76';
  const behaviour = ['typeSelector', 'searchControl', 'fullscreenControl', 'geolocationControl', 'trafficControl', 'rulerControl'];
  const script = document.createElement('script');
  script.src = `https://api-maps.yandex.ru/${ver}/?lang=${language}&coordorder=${coordorder}&mode=${mode}`;
  const children = document.body.children;
  children[0].appendChild(script);
  let myMap; /* eslint no-unused-vars: 1 */
  // ===================================
  let data;
  getData('https://raw.githubusercontent.com/topus009/ets/master/data.json').then((response) => {
    data = response;
  });
  // ===================================
  script.onload = () => {
    /* global ymaps */
    // ================================
    ymaps.ready(() => {
      myMap = new ymaps.Map('map_box', {
        center: [lat, long],
        zoom: 11,
      });
      const ymap_doc = document.getElementsByTagName('ymaps');
      const points = [];
      const select_car = document.querySelector('.select_car');
      const select_city = document.querySelector('.select_city');

      myMap.container.fitToViewport('always');
      myMap.behaviors.disable('scrollZoom');
      // =========== УДАЛЕНИЕ НЕНУЖНЫХ СТИЛЕЙ ========
      for (let b = 0; b < behaviour.length; b++) {
        myMap.controls.remove(behaviour[b]);
      }
      for (let el = 0; el < ymap_doc.length; el++) {
        if (ymap_doc[el].className.indexOf('copyright') > -1) {
          ymap_doc[el].remove();
        }
      }
      // =============================================
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
      const objectManager = new ymaps.ObjectManager({
        clusterize: true,
        gridSize: 32,
        clusterDisableClickZoom: true,
      });
      objectManager.add(geoPoints);
      objectManager.clusters.options.set('preset', 'islands#redClusterIcons');
      myMap.geoObjects.add(objectManager);
      // ===============================================
      const checkState = (e) => {
        let newPoints;
        if (e === 'car') {
          newPoints = geoPoints.features.filter(p => !!p.properties.car);
          geoPoints = {
            type: 'FeatureCollection',
            features: newPoints,
          };
          console.warn(geoPoints.features);
          objectManager.removeAll();
          myMap.geoObjects.removeAll();
          objectManager.add(geoPoints);
          objectManager.clusters.options.set('preset', 'islands#redClusterIcons');
          myMap.geoObjects.add(objectManager);
        }
        if (e === 'cargo') {
          newPoints = geoPoints.features.filter(p => !!p.properties.cargo);
          geoPoints = {
            type: 'FeatureCollection',
            features: newPoints,
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

export default map_js;
