// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.


export const environment = {
  production: false,
  appVersion: require('../../package.json').version,
  server: 'https://staging-front-api-system.novicompu.com/api/',
  server_img: 'https://staging-front-api-system.novicompu.com/',
  keySocket: 'XLuoRgESQWL3lgvbnJh11R9vmfxT1Gz8xQ2m0PXJl1hASyIEOe',
  portSocket: 8443,
  // domain_serve: 'staging-front-api-system.novicompu.com',
  // portSocket: 8443,
  domain_serve: 'ws-system.novicompu.com',
  portSocket_chat: 8443,
  domain_serve_chat: 'chat-system.novicompu.com',
  VAPID_PUBLIC_KEY: 'BERzQbYAFmTV6wVKcm5vXp8GC0tx-XRjXzki54EbVUJNERkMduFQIVMwYL7Kx01vvTuVupswuRUUFfPFut-sSo8',
  mapbox_key: 'pk.eyJ1IjoiZmVybmFuZG8xOTkxIiwiYSI6ImNrOGRlcHF2czBxd28zbW5wa3hsaTZnaWcifQ.g1IjAr-9rd65D5W93ftlew',
  weather_key: '49a2c8b7cceb6f9a5b4f67b25975bb49',
  img_not_default: 'https://mec-s1-p.mlstatic.com/935743-MEC44870123773_022021-O.jpg',
  server_vtex_file: 'https://novicompu.vteximg.com.br/arquivos/',
  user_photo_default: 'assets/img/profile-user.svg',

  staging_order: 'https://staging-orders-service-api.novisolutions.com',
  password_staging: 'BV1tz4Qao5SvjC0IK7gPftgPlDZ7Wg6psXGWTlytnxjzPtwRESj9EUkPagCI8E02Po0fPgYIQe5KL7st',
  ERROR_403_REDIRECT_URL: 'system-error/403'

};

