import { Observable, Observer } from "rxjs";

export function empty(mixedVar) {
  let undef
  let key
  let i
  let len
  const emptyValues = [undef, null, false, 0, '', '0']
  for (i = 0, len = emptyValues.length; i < len; i++) {
    if (mixedVar === emptyValues[i]) {
      return true
    }
  }
  if (typeof mixedVar === 'object') {
    for (key in mixedVar) {
      if (mixedVar.hasOwnProperty(key)) {
        return false
      }
    }
    return true
  }
  return false
}

let base64Image: string | null = null
export function downloadImage(imageUrl) {
  getBase64ImageFromURL(imageUrl).subscribe(base64data => {
  base64Image = "data:image/jpg;base64," + base64data;
  // save image to disk
  var link = document.createElement("a");

  document.body.appendChild(link); // for Firefox

  link.setAttribute("href", base64Image);
  link.setAttribute("download", "file_novisolutions.jpg");
  link.click();
});
}



function getBase64ImageFromURL(url: string) {
  return Observable.create((observer: Observer<string>) => {
    const img: HTMLImageElement = new Image();
    img.crossOrigin = "Anonymous";
    img.src = url;
    if (!img.complete) {
      img.onload = () => {
        observer.next(getBase64Image(img));
        observer.complete();
      };
      img.onerror = err => {
        observer.error(err);
      };
    } else {
      observer.next(getBase64Image(img));
      observer.complete();
    }
  });
}

function getBase64Image(img: HTMLImageElement) {
  const canvas: HTMLCanvasElement = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;
  const ctx: CanvasRenderingContext2D = canvas.getContext("2d")!;
  ctx.drawImage(img, 0, 0);
  const dataURL: string = canvas.toDataURL("image/png");

  return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}

export function convertArrayOfObjectToMap<T = any>(array: Array<T> | null | undefined, key) {
  if(!array || array?.length < 1) return new Map();
  const map = new Map();
  array.forEach(item => {
    map.set(item[key], item);
  });
  return map;
}

