// import axios from "axios";
console.log('ejecutandose');
function initSW() {
  if (!"serviceWorker" in navigator) {
      //service worker isn't supported
      return;
  }

  //don't use it here if you use service worker
  //for other stuff.
  if (!"PushManager" in window) {
      //push isn't supported
      return;
  }

  //register the service worker
  navigator.serviceWorker.register('/assets/sw.js')
      .then(() => {
          console.log('serviceWorker installed!')
          activateWebpushNotifications(true);
      })
      .catch((err) => {
          console.log(err)
      });
}

function activateWebpushNotifications(firstTime = false) {

  if (!navigator.serviceWorker.ready) {
      return;
  }

  new Promise(function(resolve, reject) {
          const permissionResult = Notification.requestPermission(function(result) {
              resolve(result);
          });

          if (permissionResult) {
              permissionResult.then(resolve, reject);
          }
      })
      .then((permissionResult) => {
          if (permissionResult !== 'granted') {

              console.error('Has bloqueado las notificaciones de navegador, si deseas activarlas desbloquealas primero.');

              //throw new Error('We weren\'t granted permission.');
          }
          subscribeUser();
      });
}



function subscribeUser() {
  navigator.serviceWorker.ready
      .then((registration) => {
          const subscribeOptions = {
              userVisibleOnly: true,
              applicationServerKey: urlBase64ToUint8Array(
                  'BC1jWw641L4t0iRt5GsFA6dhakSBE6DjxAo5QncGwrwPnY5VJ4H3ED6NfyetKls10gzQkZJEIewokdylQfzqZHY'
              )
          };

          return registration.pushManager.subscribe(subscribeOptions);
      })
      .then((pushSubscription) => {
          // console.log('Received PushSubscription: ', JSON.stringify(pushSubscription));
          storePushSubscription(pushSubscription);
      });
}

function urlBase64ToUint8Array(base64String) {
  var padding = '='.repeat((4 - base64String.length % 4) % 4);
  var base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');

  var rawData = window.atob(base64);
  var outputArray = new Uint8Array(rawData.length);

  for (var i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

var headers = {
  'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiZDhiNDdjNzI2OWQyMDZkZWRjODJjZTI5MjYwZTUxMjJjMDQ5ODdhOTA1Y2IwMzVmNGI1ZjJjMmIxNzZlMDQ0MzI5YTczZGEzMDY5MzU2NTkiLCJpYXQiOjE2MzI4NDczMTAuNzk4OTcsIm5iZiI6MTYzMjg0NzMxMC43OTg5NzQsImV4cCI6MTY2NDM4MzMxMC43OTQwNzIsInN1YiI6IjExNiIsInNjb3BlcyI6W119.k4Z-gybaHSOLLl7qw5fFAnvgjkct_saf_ajKD9Q-W-nD_ADdF1tljXUgDUQHSbOw1vvPFU9bdTlqwtZb765IW15MOT9lk7K0SL7ZSpGDEpX99Yjv2aiOgemGBNKsqEHNDjFWxeuXJkg9CzanCJRf_t_FJx-OfYK4wopexzR8Ma0sOcoPfI6Q195DDUTOWkiwE09b9eenjOXnW37XqasRt7RPs3AO24GxxotcVS-wq4Va3nBrGlgiN1NWS2D1b5c9XPEiUKTtdoH4xusTyJDKFo4T5EpIm1XP-Eq6sgifCNfoX2zwQcIUV5G95XL2thH-G_E5nv3Dv9oJTBbETCFj6fbrfiz-yuNSkeOaWQUNZU6kY-qwvm0B0ACYGXuEG4b0k5117b5VavPHTBccQZKi45rK3xTZhMUAopJ83uGnG2UZbMUre2U_TyI2WxQkANYqA7Q09QqNpTKllRzcIqPZh_IW7gWF4WhmSI0cEV2N-WOJTIxbT7qPpAU5PfhALEvrMTOLZAFkzNYCDd4jOxJ0TDiuJ6nGb1nVry7D2GoNGkTjG4HVJ9zrrtGF0hZaCLbu7PgRpBhGLZ9onipkf16OUKiap1y4F0o6pm4CW-YkmZdF6WxeURq5HxQYErO7CZr-kxSNVjXTC9APJi-QQ0rYGSuoWjaVkTyYnCGG-iEPCaE',
  "Accept": "application/json"
}

function storePushSubscription(pushSubscription) {
  axios.post('https://system.novicompu.com/api/notifications/suscribe-webpush', {
          ...JSON.parse(JSON.stringify(pushSubscription))
      },{headers}).then(res => {
          console.log(res);
      })
}

Date.prototype.addHours = function(h) {
  this.setHours(this.getHours() + h);
  return this;
}


function canInitSw() {
  const key = 'canInitSw'
  let storedTime = localStorage.getItem(key)

  if(storedTime && (new Date) < new Date(Number(storedTime)))
      return

  localStorage.setItem(
      key,
      new Date().addHours(4).getTime()
  )
  initSW()
}

canInitSw();
