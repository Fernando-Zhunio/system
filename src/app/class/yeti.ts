import {TweenMax,Expo, Quad} from "gsap";
// import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
// import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";


// import MorphSVGPlugin from "gsap/MorphSVGPlugin";

export class YetiLook {
  email: HTMLInputElement = document.querySelector('#email')!
  password = document.querySelector('#password')
  mySVG: any = document.querySelector('.svgContainer')
  armL = document.querySelector('.armL')
  armR = document.querySelector('.armR')
  eyeL = document.querySelector('.eyeL')
  eyeR = document.querySelector('.eyeR')
  nose = document.querySelector('.nose')
  mouth = document.querySelector('.mouth')
  mouthBG = document.querySelector('.mouthBG')
  mouthSmallBG: any = document.querySelector('.mouthSmallBG')
  mouthMediumBG: any = document.querySelector('.mouthMediumBG')
  mouthLargeBG: any = document.querySelector('.mouthLargeBG')
  mouthMaskPath = document.querySelector('#mouthMaskPath')
  mouthOutline = document.querySelector('.mouthOutline')
  tooth = document.querySelector('.tooth')
  tongue = document.querySelector('.tongue')
  chin = document.querySelector('.chin')
  face = document.querySelector('.face')
  eyebrow = document.querySelector('.eyebrow')
  outerEarL = document.querySelector('.earL .outerEar')
  outerEarR = document.querySelector('.earR .outerEar')
  earHairL = document.querySelector('.earL .earHair')
  earHairR = document.querySelector('.earR .earHair')
  hair = document.querySelector('.hair');
  caretPos
  curEmailIndex
  screenCenter
  svgCoords
  eyeMaxHorizD = 20
  eyeMaxVertD = 10
  noseMaxHorizD = 23
  noseMaxVertD = 10
  dFromC: any
  eyeDistH
  eyeLDistV
  eyeRDistV
  eyeDistR
  mouthStatus = "small";

  initialize() {
    // gsap.registerPlugin(MorphSVGPlugin);
    // this.emaill = document.querySelector('#email'), this.password = document.querySelector('#password'), mySVG = document.querySelector('.svgContainer'), armL = document.querySelector('.armL'), armR = document.querySelector('.armR'), eyeL = document.querySelector('.eyeL'), eyeR = document.querySelector('.eyeR'), nose = document.querySelector('.nose'), mouth = document.querySelector('.mouth'), mouthBG = document.querySelector('.mouthBG'), mouthSmallBG = document.querySelector('.mouthSmallBG'), mouthMediumBG = document.querySelector('.mouthMediumBG'), mouthLargeBG = document.querySelector('.mouthLargeBG'), mouthMaskPath = document.querySelector('#mouthMaskPath'), mouthOutline = document.querySelector('.mouthOutline'), tooth = document.querySelector('.tooth'), tongue = document.querySelector('.tongue'), chin = document.querySelector('.chin'), face = document.querySelector('.face'), eyebrow = document.querySelector('.eyebrow'), outerEarL = document.querySelector('.earL .outerEar'), outerEarR = document.querySelector('.earR .outerEar'), earHairL = document.querySelector('.earL .earHair'), earHairR = document.querySelector('.earR .earHair'), hair = document.querySelector('.hair');
    // caretPos, curEmailIndex, screenCenter, svgCoords, eyeMaxHorizD = 20, eyeMaxVertD = 10, noseMaxHorizD = 23, noseMaxVertD = 10, dFromC, eyeDistH, eyeLDistV, eyeRDistV, eyeDistR, mouthStatus = "small";
  // this.email: HTMLInputElement = document.querySelector('#email')
  // this.password = document.querySelector('#password')
  // this.mySVG: any = document.querySelector('.svgContainer')
  // this.armL = document.querySelector('.armL')
  // this.armR = document.querySelector('.armR')
  // this.eyeL = document.querySelector('.eyeL')
  // this.eyeR = document.querySelector('.eyeR')
  // this.nose = document.querySelector('.nose')
  // mouth = document.querySelector('.mouth')
  // mouthBG = document.querySelector('.mouthBG')
  // mouthSmallBG: any = document.querySelector('.mouthSmallBG')
  // mouthMediumBG: any = document.querySelector('.mouthMediumBG')
  // mouthLargeBG: any = document.querySelector('.mouthLargeBG')
  // mouthMaskPath = document.querySelector('#mouthMaskPath')
  // mouthOutline = document.querySelector('.mouthOutline')
  // tooth = document.querySelector('.tooth')
  // tongue = document.querySelector('.tongue')
  // chin = document.querySelector('.chin')
  // face = document.querySelector('.face')
  // eyebrow = document.querySelector('.eyebrow')
  // outerEarL = document.querySelector('.earL .outerEar')
  // outerEarR = document.querySelector('.earR .outerEar')
  // earHairL = document.querySelector('.earL .earHair')
  // earHairR = document.querySelector('.earR .earHair')
  // hair = document.querySelector('.hair');
  // caretPos
  // curEmailIndex
  // screenCenter
  // svgCoords
  // eyeMaxHorizD = 20
  // eyeMaxVertD = 10
  // noseMaxHorizD = 23
  // noseMaxVertD = 10
  // dFromC: any
  // eyeDistH
  // eyeLDistV
  // eyeRDistV
  // eyeDistR
  // mouthStatus = "small";
    this.email.addEventListener('focus', this.onEmailFocus.bind(this));
    this.email.addEventListener('blur', this.onEmailBlur.bind(this));
    this.email.addEventListener('input', this.onEmailInput.bind(this));
    this.password?.addEventListener('focus', this.onPasswordFocus.bind(this));
    this.password?.addEventListener('blur', this.onPasswordBlur.bind(this));
    TweenMax.set(this.armL, { x: -93, y: 220, rotation: 105, transformOrigin: "top left" });
    TweenMax.set(this.armR, { x: -93, y: 220, rotation: -105, transformOrigin: "top right" });
  }

  onEmailInput(e) {
    this.getCoord(e);
    var value = e.target.value;
    this.curEmailIndex = value.length;

    // very crude email validation for now to trigger effects
    if (this.curEmailIndex > 0) {
      if (this.mouthStatus == "small") {
        this.mouthStatus = "medium";
        TweenMax.to([this.mouthBG, this.mouthOutline, this.mouthMaskPath], 1, { morphSVG: this.mouthMediumBG, shapeIndex: 8, ease: Expo.easeOut });
        TweenMax.to(this.tooth, 1, { x: 0, y: 0, ease: Expo.easeOut });
        TweenMax.to(this.tongue, 1, { x: 0, y: 1, ease: Expo.easeOut });
        TweenMax.to([this.eyeL, this.eyeR], 1, { scaleX: .85, scaleY: .85, ease: Expo.easeOut });
      }
      if (value.includes("@")) {
        this.mouthStatus = "large";
        TweenMax.to([this.mouthBG, this.mouthOutline, this.mouthMaskPath], 1, { morphSVG: this.mouthLargeBG, ease: Expo.easeOut });
        TweenMax.to(this.tooth, 1, { x: 3, y: -2, ease: Expo.easeOut });
        TweenMax.to(this.tongue, 1, { y: 2, ease: Expo.easeOut });
        TweenMax.to([this.eyeL, this.eyeR], 1, { scaleX: .65, scaleY: .65, ease: Expo.easeOut, transformOrigin: "center center" });
      } else {
        this.mouthStatus = "medium";
        TweenMax.to([this.mouthBG, this.mouthOutline, this.mouthMaskPath], 1, { morphSVG: this.mouthMediumBG, ease: Expo.easeOut });
        TweenMax.to(this.tooth, 1, { x: 0, y: 0, ease: Expo.easeOut });
        TweenMax.to(this.tongue, 1, { x: 0, y: 1, ease: Expo.easeOut });
        TweenMax.to([this.eyeL, this.eyeR], 1, { scaleX: .85, scaleY: .85, ease: Expo.easeOut });
      }
    } else {
      this.mouthStatus = "small";
      TweenMax.to([this.mouthBG, this.mouthOutline, this.mouthMaskPath], 1, { morphSVG: this.mouthSmallBG, shapeIndex: 9, ease: Expo.easeOut });
      TweenMax.to(this.tooth, 1, { x: 0, y: 0, ease: Expo.easeOut });
      TweenMax.to(this.tongue, 1, { y: 0, ease: Expo.easeOut });
      TweenMax.to([this.eyeL, this.eyeR], 1, { scaleX: 1, scaleY: 1, ease: Expo.easeOut });
    }
  }

  onEmailFocus(e) {
    e.target.parentElement.classList.add("focusWithText");
    this.getCoord(e);
  }

  getCoord(_e) {
    var carPos = this.email.selectionEnd,
      div = document.createElement('div'),
      span = document.createElement('span'),
      copyStyle = getComputedStyle(this.email),
      emailCoords: any = {}, caretCoords: any = {}, centerCoords: any = {}
      ;
    [].forEach.call(copyStyle, function (prop) {
      div.style[prop] = copyStyle[prop];
    });
    div.style.position = 'absolute';
    document.body.appendChild(div);
    div.textContent = this.email.value.substr(0, carPos!);
    span.textContent = this.email.value.substr(carPos!) || '.';
    div.appendChild(span);

    emailCoords = this.getPosition(this.email);							//console.log("emailCoords.x: " + emailCoords.x + ", emailCoords.y: " + emailCoords.y);
    caretCoords = this.getPosition(span);							//console.log("caretCoords.x " + caretCoords.x + ", caretCoords.y: " + caretCoords.y);
    centerCoords = this.getPosition(this.mySVG);							//console.log("centerCoords.x: " + centerCoords.x);
    this.svgCoords = this.getPosition(this.mySVG);
    this.screenCenter = centerCoords.x + (this.mySVG.offsetWidth / 2);		//console.log("screenCenter: " + screenCenter);
    this.caretPos = caretCoords.x + emailCoords.x;					//console.log("caretPos: " + caretPos);

    this.dFromC = this.screenCenter - this.caretPos; 							//console.log("dFromC: " + dFromC);
    var pFromC = Math.round((this.caretPos / this.screenCenter) * 100) / 100;
    if (pFromC < 1) {

    } else if (pFromC > 1) {
      pFromC -= 2;
      pFromC = Math.abs(pFromC);
    }

    this.eyeDistH = -this.dFromC * .05;
    if (this.eyeDistH > this.eyeMaxHorizD) {
      this.eyeDistH = this.eyeMaxHorizD;
    } else if (this.eyeDistH < -this.eyeMaxHorizD) {
      this.eyeDistH = -this.eyeMaxHorizD;
    }

    var eyeLCoords = { x: this.svgCoords.x + 84, y: this.svgCoords.y + 76 };
    var eyeRCoords = { x: this.svgCoords.x + 113, y: this.svgCoords.y + 76 };
    var noseCoords = { x: this.svgCoords.x + 97, y: this.svgCoords.y + 81 };
    var mouthCoords = { x: this.svgCoords.x + 100, y: this.svgCoords.y + 100 };
    var eyeLAngle = this.getAngle(eyeLCoords.x, eyeLCoords.y, emailCoords.x + caretCoords.x, emailCoords.y + 25);
    var eyeLX = Math.cos(eyeLAngle) * this.eyeMaxHorizD;
    var eyeLY = Math.sin(eyeLAngle) * this.eyeMaxVertD;
    var eyeRAngle = this.getAngle(eyeRCoords.x, eyeRCoords.y, emailCoords.x + caretCoords.x, emailCoords.y + 25);
    var eyeRX = Math.cos(eyeRAngle) * this.eyeMaxHorizD;
    var eyeRY = Math.sin(eyeRAngle) * this.eyeMaxVertD;
    var noseAngle = this.getAngle(noseCoords.x, noseCoords.y, emailCoords.x + caretCoords.x, emailCoords.y + 25);
    var noseX = Math.cos(noseAngle) * this.noseMaxHorizD;
    var noseY = Math.sin(noseAngle) * this.noseMaxVertD;
    var mouthAngle = this.getAngle(mouthCoords.x, mouthCoords.y, emailCoords.x + caretCoords.x, emailCoords.y + 25);
    var mouthX = Math.cos(mouthAngle) * this.noseMaxHorizD;
    var mouthY = Math.sin(mouthAngle) * this.noseMaxVertD;
    var mouthR = Math.cos(mouthAngle) * 6;
    var chinX = mouthX * .8;
    var chinY = mouthY * .5;
    var chinS = 1 - ((this.dFromC * .15) / 100);
    if (chinS > 1) { chinS = 1 - (chinS - 1); }
    var faceX = mouthX * .3;
    var faceY = mouthY * .4;
    var faceSkew = Math.cos(mouthAngle) * 5;
    var eyebrowSkew = Math.cos(mouthAngle) * 25;
    var outerEarX = Math.cos(mouthAngle) * 4;
    var outerEarY = Math.cos(mouthAngle) * 5;
    var hairX = Math.cos(mouthAngle) * 6;
    var hairS = 1.2;

    TweenMax.to(this.eyeL, 1, { x: -eyeLX, y: -eyeLY, ease: Expo.easeOut });
    TweenMax.to(this.eyeR, 1, { x: -eyeRX, y: -eyeRY, ease: Expo.easeOut });
    TweenMax.to(this.nose, 1, { x: -noseX, y: -noseY, rotation: mouthR, transformOrigin: "center center", ease: Expo.easeOut });
    TweenMax.to(this.mouth, 1, { x: -mouthX, y: -mouthY, rotation: mouthR, transformOrigin: "center center", ease: Expo.easeOut });
    TweenMax.to(this.chin, 1, { x: -chinX, y: -chinY, scaleY: chinS, ease: Expo.easeOut });
    TweenMax.to(this.face, 1, { x: -faceX, y: -faceY, skewX: -faceSkew, transformOrigin: "center top", ease: Expo.easeOut });
    TweenMax.to(this.eyebrow, 1, { x: -faceX, y: -faceY, skewX: -eyebrowSkew, transformOrigin: "center top", ease: Expo.easeOut });
    TweenMax.to(this.outerEarL, 1, { x: outerEarX, y: -outerEarY, ease: Expo.easeOut });
    TweenMax.to(this.outerEarR, 1, { x: outerEarX, y: outerEarY, ease: Expo.easeOut });
    TweenMax.to(this.earHairL, 1, { x: -outerEarX, y: -outerEarY, ease: Expo.easeOut });
    TweenMax.to(this.earHairR, 1, { x: -outerEarX, y: outerEarY, ease: Expo.easeOut });
    TweenMax.to(this.hair, 1, { x: hairX, scaleY: hairS, transformOrigin: "center bottom", ease: Expo.easeOut });
    document.body.removeChild(div);
  }




  onEmailBlur(e) {
    if (e.target.value == "") {
      e.target.parentElement.classList.remove("focusWithText");
    }
    this.resetFace();
  }

  onPasswordFocus(_e) {
    this.coverEyes();
  }

  onPasswordBlur(_e) {
    this.uncoverEyes();
  }
  coverEyes() {

    TweenMax.to(this.armL, .45, { x: -93, y: 2, rotation: 0, ease: Quad.easeOut });
    TweenMax.to(this.armR, .45, { x: -93, y: 2, rotation: 0, ease: Quad.easeOut, delay: .1 });
  }

  uncoverEyes() {
    TweenMax.to(this.armL, 1.35, { y: 220, ease: Quad.easeOut });
    TweenMax.to(this.armL, 1.35, { rotation: 105, ease: Quad.easeOut, delay: .1 });
    TweenMax.to(this.armR, 1.35, { y: 220, ease: Quad.easeOut });
    TweenMax.to(this.armR, 1.35, { rotation: -105, ease: Quad.easeOut, delay: .1 });
  }
  resetFace() {
    TweenMax.to([this.eyeL, this.eyeR], 1, { x: 0, y: 0, ease: Expo.easeOut });
    TweenMax.to(this.nose, 1, { x: 0, y: 0, scaleX: 1, scaleY: 1, ease: Expo.easeOut });
    TweenMax.to(this.mouth, 1, { x: 0, y: 0, rotation: 0, ease: Expo.easeOut });
    TweenMax.to(this.chin, 1, { x: 0, y: 0, scaleY: 1, ease: Expo.easeOut });
    TweenMax.to([this.face, this.eyebrow], 1, { x: 0, y: 0, skewX: 0, ease: Expo.easeOut });
    TweenMax.to([this.outerEarL, this.outerEarR, this.earHairL, this.earHairR, this.hair], 1, { x: 0, y: 0, scaleY: 1, ease: Expo.easeOut });
  }
  getAngle(x1, y1, x2, y2) {
    var angle = Math.atan2(y1 - y2, x1 - x2);
    return angle;
  }

  getPosition(el) {
    var xPos = 0;
    var yPos = 0;

    while (el) {
      if (el.tagName == "BODY") {
        // deal with browser quirks with body/window/document and page scroll
        var xScroll = el.scrollLeft || document.documentElement.scrollLeft;
        var yScroll = el.scrollTop || document.documentElement.scrollTop;

        xPos += (el.offsetLeft - xScroll + el.clientLeft);
        yPos += (el.offsetTop - yScroll + el.clientTop);
      } else {
        // for all other non-BODY elements
        xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);
        yPos += (el.offsetTop - el.scrollTop + el.clientTop);
      }

      el = el.offsetParent;
    }
    return {
      x: xPos,
      y: yPos
    };
  }


  // window.initialize = initialize;
}







