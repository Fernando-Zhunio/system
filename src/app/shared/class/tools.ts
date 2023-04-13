import { formatDate } from "@angular/common"

export function groupBy(xs: Array<any>, key: string) {
  return xs.reduce(function (rv, x) {
    ;(rv[x[key]] = rv[x[key]] || []).push(x)
    return rv
  }, {})
}

export function zoomImage(img: HTMLImageElement, selector: any = null, className = "img-zoom") {
  img.classList.add(className)
  if (!selector) selector = document as Document
  const callbackInScroll = (): void => {
    img.classList.remove(className)
    selector.removeEventListener("scroll", callbackInScroll, true)
  }

  selector.addEventListener("scroll", callbackInScroll, true)
}

export function convertFormatDate(date, format = "yyyy/MM/dd", lang = "en"): any {
  return formatDate(new Date(date), format, lang)
}

export function convertFileToUrl(file: any): Promise<any> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      resolve(reader.result)
    }
    reader.onerror = (error) => {
      reject(error)
    }
  })
}

export function checkInView(container, element, partial = false): boolean {
  //Get container properties
  let cTop = container.scrollTop
  let cBottom = cTop + container.clientHeight

  //Get element properties
  let eTop = element.offsetTop
  let eBottom = eTop + element.clientHeight

  //Check if in view
  let isTotal = eTop >= cTop && eBottom <= cBottom
  let isPartial = partial && ((eTop < cTop && eBottom > cTop) || (eBottom > cBottom && eTop < cBottom))

  //Return outcome
  return isTotal || isPartial
}


// function init() {
//   getContentDropdown().addEventListener('blur', () => {
//     getDropdown().classList.remove('open');
//   });
//   getContentDropdown().addEventListener('click', () => {
//     getDropdown().classList.add('open');
//     calcPositionDropdown(getTriggerDropdown(), getDropdown());
//   });
// }

export function calcPositionDropdown(
  element: HTMLElement,
  dropdown: HTMLElement,
  offset = 5
) {
  const triggerRect = element.getBoundingClientRect();
  let dropdownLeft = triggerRect.left;
  let dropdownTop = triggerRect.top;
  const sizeDropdown = getSizeDropdown(dropdown);
  if (dropdownLeft + sizeDropdown.width > window.innerWidth) {
    dropdownLeft -= (sizeDropdown.width - triggerRect.width);
  } else {
    dropdownLeft = 0
  }
  if (dropdownTop + sizeDropdown.height > window.innerHeight) {
    dropdownTop = -(sizeDropdown.height + offset);
    console.log({ dropdownTop });
  } else {
    dropdownTop = element.clientHeight + offset;
  }
  setPositionDropdown(dropdown, dropdownLeft, dropdownTop);
}

function getSizeDropdown(dropdown: HTMLElement) {
  return {
    width: dropdown.offsetWidth,
    height: dropdown.offsetHeight,
  };
}

function setPositionDropdown(dropdown: HTMLElement, left: number, top: number) {
  dropdown.style.left = `${left}px`;
  dropdown.style.top = `${top}px`;
}

