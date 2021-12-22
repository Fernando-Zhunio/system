// declare var require: any;

export const environment = {
  production: true,
  appVersion: require('../../package.json').version,
  // server: 'https://system.novicompu.com/api/',
  // server_img: 'https://system.novicompu.com/',
  server: 'https://front-api-system.novicompu.com/api/',
  server_img: 'https://front-api-system.novicompu.com/',

  keySocket: 'XLuoRgESQWL3lgvbnJh11R9vmfxT1Gz8xQ2m0PXJl1hASyIEOe',
  portSocket: 8443,
  portSocket_chat: 8443,
  // domain_serve: 'ws.system.novicompu.com',
  domain_serve: 'ws-system.novicompu.com',
  domain_serve_chat: 'chat-system.novicompu.com',
  VAPID_PUBLIC_KEY: 'BC1jWw641L4t0iRt5GsFA6dhakSBE6DjxAo5QncGwrwPnY5VJ4H3ED6NfyetKls10gzQkZJEIewokdylQfzqZHY',
  mapbox_key: 'pk.eyJ1IjoiZmVybmFuZG8xOTkxIiwiYSI6ImNrOGRlcHF2czBxd28zbW5wa3hsaTZnaWcifQ.g1IjAr-9rd65D5W93ftlew',
  weather_key: '49a2c8b7cceb6f9a5b4f67b25975bb49',
  img_not_default: 'https://mec-s1-p.mlstatic.com/935743-MEC44870123773_022021-O.jpg',
  server_vtex_file: 'https://novicompu.vteximg.com.br/arquivos/',
  user_photo_default: 'assets/img/profile-user.svg'
};

