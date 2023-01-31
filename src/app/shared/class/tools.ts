export function groupBy(xs: Array<any>, key: string) {
  return xs.reduce(function (rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
}

export function zoomImage(img: HTMLImageElement) {
  // const zoom = document.createElement('div');
  // zoom.classList.add('zoom');
  // zoom.style.backgroundImage = `url(${img.src})`;
  // zoom.style.backgroundSize = `${img.width * 2}px ${img.height * 2}px`;
  // zoom.style.backgroundPosition = `-${img.offsetLeft}px -${img.offsetTop}px`;
  // document.body.appendChild(zoom);
  // zoom.addEventListener('click', () => {
  //   zoom.remove();
  // });
  img.classList.add('img-zoom')
  window.onscroll = ()=> { 
    img.classList.remove('img-zoom')
    console.log('scroll')
  }
}