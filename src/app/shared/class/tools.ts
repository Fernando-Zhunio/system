import { formatDate } from "@angular/common";

export function groupBy(xs: Array<any>, key: string) {
  return xs.reduce(function (rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
}

export function zoomImage(img: HTMLImageElement, selector: any = null, className= 'img-zoom') {
  img.classList.add(className)
  if (!selector) selector = document as Document;
  const callbackInScroll = (): void => {
    console.log('scroll');
    img.classList.remove(className)
    selector.removeEventListener('scroll', callbackInScroll, true)
  }

  selector.addEventListener('scroll', callbackInScroll, true)
}

export function convertFormatDate(date, format='yyyy/MM/dd', lang = 'en'): any {
  return formatDate(
    new Date(date),
    format,
    lang
  );
}