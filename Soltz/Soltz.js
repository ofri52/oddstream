//@ts-check
'use strict';
/* jshint esversion:6 */

const Constants = {
  GAME_NAME: 'Oddstream Soltz',
  GAME_VERSION: '0.6.21.0',
  SVG_NAMESPACE: 'http://www.w3.org/2000/svg',
  LOCALSTORAGE_GAME: 'Oddstream Soltz Game',
  LOCALSTORAGE_SETTINGS: 'Oddstream Soltz Settings',

  MOBILE:     /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
  CHROME:     navigator.userAgent.indexOf('Chrome/') !== -1,   // also Brave, Opera
  EDGE:       navigator.userAgent.indexOf('Edge/') !== -1,
  FIREFOX:    navigator.userAgent.indexOf('Firefox/') !== -1,

  GRID_SIZE: 4,
  GRID_GAP: 100,  // left and top margin
  CARD_SIZE: 100, // square cards, width == height
  CARD_GAP: 5,
  CARD_RADIUS: 5,     // CARD_SIZE / 20
  BUTTON_WIDTH: 100,  // Constants.CARD_SIZE,
  BUTTON_HEIGHT: 50,  // Constants.CARD_SIZE / 2,
}

const rectColors = new Map([
  [2, '#eee4da'],
  [4, '#ece0c8'],
  [8, '#f2b179'],
  [16, '#f59563'],
  [32, '#f57c5f'],
  [64, '#f65e3b'],
  [128, '#edcf72'],
  [256, '#edcc61'],
  [512, '#edc850'],
  [1024, '#edc53f'],
  [2048, '#edc22e'],
  [4096, '#edc22e'],
]);

const valueColors = new Map([
  [2, '#73695F'],
  [4, '#73695F'],
  [8, '#73695F'],
  [16, '#FDF3F1'],
  [32, '#FDF3F1'],
  [64, '#FDF3F1'],
  [128, '#FDF3F1'],
  [256, '#FDF3F1'],
  [512, '#FDF3F1'],
  [1024, '#FDF3F1'],
  [2048, '#FDF3F1'],
  [4096, '#FDF3F1'],
]);

// https://stackoverflow.com/questions/20368071/touch-through-an-element-in-a-browser-like-pointer-events-none/20387287#20387287
function dummyTouchHandler(/** @type {Event} */e) {e.preventDefault();}

const Util = {
  /**
   * @param {Event} event 
   * @returns {boolean}
   */
  absorbEvent: function(event) {
    var e = event || window.event;
    e.preventDefault && e.preventDefault();
    e.stopPropagation && e.stopPropagation();
    e.cancelBubble = true;
    e.returnValue = false;
    return false;
  },

  /**
   * @param {Element} ele 
   * @param {Object} attribs 
   */
  setAttributesNS: function(ele, attribs) {
    for ( let a in attribs ) {
      ele.setAttributeNS(null, a, attribs[a]);
    }
  },
}

class AssociationTable {
  // https://en.wikipedia.org/wiki/Associative_entity
  constructor() {
    this.mapPlaceCard = new Map();
    this.mapCardPlace = new Map();
  }

  /**
   * @param {Place} place 
   * @param {Card} card 
   */
  putCard(place, card) {
    this.mapPlaceCard.set(place, card);
    this.mapCardPlace.set(card, place);
  }

  /**
   * @param {Place} place 
   */
  getCard(place) {
    return this.mapPlaceCard.get(place);
  }

  /**
   * @param {Card} card 
   */
  getPlace(card) {
    return this.mapCardPlace.get(card);
  }

  /**
   * @param {Place} fromPlace 
   * @param {Place} toPlace 
   */
  moveCard(fromPlace, toPlace) {
    const card = this.mapPlaceCard.get(fromPlace);

    this.mapPlaceCard.delete(fromPlace);
    this.mapCardPlace.delete(card);
    
    this.mapPlaceCard.set(toPlace, card);
    this.mapCardPlace.set(card, toPlace);
  }

  /**
   * @param {Place} place1 
   * @param {Place} place2 
   */
  swapCards(place1, place2) {
    const card1 = this.mapPlaceCard.get(place1);
    const card2 = this.mapPlaceCard.get(place2);

    this.mapPlaceCard.delete(place1);
    this.mapCardPlace.delete(card1);

    this.mapPlaceCard.delete(place2);
    this.mapCardPlace.delete(card2);

    this.mapPlaceCard.set(place1, card2);
    this.mapCardPlace.set(card2, place1);

    this.mapPlaceCard.set(place2, card1);
    this.mapCardPlace.set(card1, place2);
  }

  /**
   * @param {Card} card 
   */
  deleteCard(card) {
    const place = this.mapCardPlace.get(card);

    this.mapPlaceCard.delete(place);
    this.mapCardPlace.delete(card);
  }

  reset() {
    this.mapPlaceCard.clear();
    this.mapCardPlace.clear();
  }
}

const asstab = new AssociationTable();

class Baize {
  constructor() {
    /** @type {HTMLElement} */this.ele = document.getElementById('baize');

    this.btnNew = new Button({
      parent: this.ele,
      id: 'new',
      text: 'New',
      x: Constants.GRID_GAP,
      y: (Constants.GRID_GAP - Constants.BUTTON_HEIGHT)/2,
      command: 'newGame'
    });

    this.btnUndo = new Button({
      parent: this.ele,
      id: 'undo',
      text: 'Undo',
      x: Constants.GRID_GAP + ((Constants.GRID_SIZE - 1) * (Constants.CARD_SIZE + Constants.CARD_GAP)),
      y: (Constants.GRID_GAP - Constants.BUTTON_HEIGHT)/2,
      command: 'undoMove'
    });

    this.downHandler = this.onpointerdown.bind(this);
    this.moveHandler = this.onpointermove.bind(this);
    this.upHandler = this.onpointerup.bind(this);
    this.cancelHandler = this.onpointercancel.bind(this);
    this.addListeners_();
  }

  /**
   * @private
   * @param {number} b positive or negative border width
   */
  adjustBorder_(b) {
    const nodes = this.ele.querySelectorAll('.place');
    for ( let n=0; n<nodes.length; n++ ) {
      let r = nodes[n];
      if ( r.hasAttribute('x') ) {
        let x = Number.parseInt(r.getAttribute('x'), 10) || 0;
        r.setAttributeNS(null, 'x', String(x + b));
      }
    }
    grid.places.forEach( c => {
      c.pt.x += b;
    });

    this.btnNew.adjustBorder(b);
    score.adjustBorder(b);
    this.btnUndo.adjustBorder(b);
  }

  /**
   */
  setBox() {
    // console.warn(window.screen.orientation, window.screen.width, window.screen.height);
    this.gutsWidth = Constants.GRID_GAP + (Constants.GRID_SIZE * (Constants.CARD_SIZE + Constants.CARD_GAP)) + Constants.GRID_GAP;
    this.gutsHeight = Constants.GRID_GAP + (Constants.GRID_SIZE * (Constants.CARD_SIZE + Constants.CARD_GAP));
    this.width = this.gutsWidth;
    // this.height = Math.max(1200,window.screen.availHeight);
    this.height = this.gutsHeight;

    if ( window.screen.availWidth > window.screen.availHeight ) {
      // landscape, add a border if guts are narrow
      const thresholdWidth = 1000;
      if ( this.gutsWidth < thresholdWidth ) {
        this.borderWidth = (thresholdWidth - this.gutsWidth) / 2;
        this.adjustBorder_(this.borderWidth);
        this.width = thresholdWidth;
      }
    }
    // set viewport (visible area of SVG)
    Util.setAttributesNS(this.ele, {
      width: String(this.width),
      height: String(this.height),
      viewBox: `0 0 ${this.width} ${this.height}`,
      preserveAspectRatio: 'xMinYMin slice'
    });
  }

  /**
   * @param {Card} c
   */
  addCard(c) {
    this.ele.appendChild(c.g);
  }

  /**
   * @param {Card} c
   */
  deleteCard(c) {
    this.ele.removeChild(c.g);
  }

  /**
   * @param {Place} place 
   * @param {number} value 
   * @return {Card}
   */
  createCard(place, value) {
    const card = new Card(value);
    asstab.putCard(place, card);
    this.ele.appendChild(card.g);
    card.position0();
    return card;
  }

  /**
   * @private
   */
  addListeners_() {
    // put the event handlers on the g, but the event happens on the rect inside
    // http://www.open.ac.uk/blogs/brasherblog/?p=599
    // the ordinal and suit symbols use css pointer-event: none so the events pass through to their parent (the rect)
    this.ele.addEventListener('pointerdown', this.downHandler);

    this.ele.addEventListener('touchstart', dummyTouchHandler);
    this.ele.addEventListener('touchmove', dummyTouchHandler);
    this.ele.addEventListener('touchend', dummyTouchHandler);
  }

  /**
   * @private
   */
  addDragListeners_() {
    window.addEventListener('pointermove', this.moveHandler);
    window.addEventListener('pointerup', this.upHandler);
    window.addEventListener('pointercancel', this.cancelHandler);
  }

  /**
   * @private
   */
  removeDragListeners_() {
    window.removeEventListener('pointermove', this.moveHandler);
    window.removeEventListener('pointerup', this.upHandler);
    window.removeEventListener('pointercancel', this.cancelHandler);
  }

  /**
   * @param {PointerEvent} event 
   * @returns {boolean}
   */
  onpointerdown(event) {
    Util.absorbEvent(event);
    this.touchStartX = event.clientX;
    this.touchStartY = event.clientY;
    // console.log('down', this.touchStartX, this.touchStartY);
    this.addDragListeners_();
    return false;
  }

  /**
   * @param {PointerEvent} event 
   * @returns {boolean}
   */
  onpointermove(event) {
    Util.absorbEvent(event);
    // console.log('move');
    return false;
  }

  /**
   * @param {PointerEvent} event 
   * @returns {boolean}
   */
  onpointerup(event) {
    Util.absorbEvent(event);
    const diffX = event.clientX - this.touchStartX;
    const diffY = event.clientY - this.touchStartY;
    // console.log('up', diffX, diffY);

    if ( this.touchStartY < Constants.GRID_GAP ) {
      console.log('ignoring high click');
    } else if ( Math.abs(diffX) < Constants.CARD_SIZE/2 && Math.abs(diffY) < Constants.CARD_SIZE/2 ) {
      console.log('ignoring small swipe');
    } else {
      if ( Math.abs(diffX) > Math.abs(diffY) ) {
        if ( diffX < 0 ) {
          document.dispatchEvent(new CustomEvent('moveCards', { detail: { dir: 'w' } }));
        } else {
          document.dispatchEvent(new CustomEvent('moveCards', { detail: { dir: 'e' } }));
        }
      } else {
        if ( diffY < 0 ) {
          document.dispatchEvent(new CustomEvent('moveCards', { detail: { dir: 'n' } }));
        } else {
          document.dispatchEvent(new CustomEvent('moveCards', { detail: { dir: 's' } }));
        }
      }
    }
    this.removeDragListeners_();
    return false;
  }

  /**
   * @param {PointerEvent} event 
   */
  onpointercancel(event) {
    console.log('cancel');
  }

  /**
   * Move card to end of baize so it appears on top of other cards
   * Should be using SVG z-index to do this, but it's not implemented
   * @param {Card} c
   */
  elevateCard(c) {
    if ( c.g !== this.ele.lastChild )
      this.ele.appendChild(c.g);
  }
}

class Score {
  /**
   * @param {number} x 
   * @param {number} y 
   */
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.score_ = 0;
    this.text = document.createElementNS(Constants.SVG_NAMESPACE, 'text');
    this.text.classList.add('score');
    Util.setAttributesNS(this.text, {
      'id': 'score',
      'x': x,
      'y': y + 10,
      // https://www.w3.org/TR/SVG11/text.html#DominantBaselineProperty
      'dominant-baseline': 'central',
      'text-anchor': 'middle',
    });

    this.settings = {}
    try {
      this.settings = JSON.parse(localStorage.getItem(Constants.LOCALSTORAGE_SETTINGS)) || {};
    } catch(e) {
      console.error(e);
    }
    if ( typeof(this.settings.highScore) !== 'number' ) {
      this.settings.highScore = 0;
    }

    this.textHS = document.createElementNS(Constants.SVG_NAMESPACE, 'text');
    this.textHS.classList.add('highscore');
    this.textHS.innerHTML = this.settings.highScore> 0 ? String(this.settings.highScore) : '';
    Util.setAttributesNS(this.textHS, {
      'id': 'highscore',
      'x': x,
      'y': y - 20,
      // https://www.w3.org/TR/SVG11/text.html#DominantBaselineProperty
      'dominant-baseline': 'central',
      'text-anchor': 'middle',
    });
    this.updateText_();
    document.getElementById('baize').appendChild(this.text);
    document.getElementById('baize').appendChild(this.textHS);
  }

  /**
   * @param {number} b positive or negative border width
   */
  adjustBorder(b) {
    this.x += b;
    Util.setAttributesNS(this.text, {
      'x': this.x
    });
    Util.setAttributesNS(this.textHS, {
      'x': this.x
    });
  }

  updateText_() {
    this.text.innerHTML = String(this.score_);
  }

  /**
   * @param {number} amt 
   */
  inc(amt) {
    // TODO create bling text, animate to score.g position, delete bling text
    this.score_ += amt;
    this.updateText_();

    if ( this.score_ > this.settings.highScore ) {
      this.settings.highScore = this.score_;
      this.textHS.innerHTML = String(this.settings.highScore);
      try {
        localStorage.setItem(Constants.LOCALSTORAGE_SETTINGS, JSON.stringify(this.settings));
      } catch(e) {
        console.error(e);
      }
    }
  }

  /**
   * @param {number} amt 
   */
  set(amt) {
    this.score_ = amt;
    this.updateText_();
  }

  /**
   * @returns {number}
   */
  get() {
    return this.score_;
  }
}

class Button {
  /**
   * @param {object} options 
   */

  // <g class="button" id="new" transform="translate(10,25)">
  //   <rect width="100" height="50" rx="10"/>
  //   <svg width="100" height="50">
  //     <text class="buttontext" x="50%" y="50%" dominant-baseline="central" text-anchor="middle">New</text>
  //   </svg>
  // </g>
  constructor(options={}) {
    this.id = options.id || 'button';
    this.width = options.width || Constants.BUTTON_WIDTH;
    this.height = options.height || Constants.BUTTON_HEIGHT;
    this.x = options.x;
    this.y = options.y;
    this.command = options.command;

    this.g = document.createElementNS(Constants.SVG_NAMESPACE, 'g');
    this.g.classList.add('button');
    Util.setAttributesNS(this.g, {
      'id': this.id,
      'transform': `translate(${this.x}, ${this.y})`,
    });

    this.rect = document.createElementNS(Constants.SVG_NAMESPACE, 'rect');
    Util.setAttributesNS(this.rect, {
      'width': this.width,
      'height': this.height,
      'rx': String(this.width/20)
    });
    this.g.appendChild(this.rect);

    this.svg = document.createElementNS(Constants.SVG_NAMESPACE, 'svg');
    Util.setAttributesNS(this.svg, {
      'width': String(Constants.BUTTON_WIDTH),
      'height': String(Constants.BUTTON_HEIGHT)
    });
    this.g.appendChild(this.svg);

    this.text = document.createElementNS(Constants.SVG_NAMESPACE, 'text');
    this.text.classList.add('buttontext');
    Util.setAttributesNS(this.text, {
      'x': '50%',
      'y': '50%',
      'dominant-baseline': 'central',
      'text-anchor': 'middle'
    });
    this.text.innerHTML = options.text;
    this.svg.appendChild(this.text);

    options.parent.appendChild(this.g);

    this.downHandler = this.onpointerdown.bind(this);
    this.upHandler = this.onpointerup.bind(this);
    this.cancelHandler = this.onpointercancel.bind(this);

    this.g.addEventListener('pointerdown', this.downHandler);
    this.g.addEventListener('touchstart', dummyTouchHandler);
    this.g.addEventListener('touchmove', dummyTouchHandler);
    this.g.addEventListener('touchend', dummyTouchHandler);
  }

  /**
   * @param {number} b positive or negative border width
   */
  adjustBorder(b) {
    this.x += b;
    Util.setAttributesNS(this.g, {
      'transform': `translate(${this.x}, ${this.y})`,
    });
  }

  /**
   * @param {PointerEvent} event 
   * @returns {boolean}
   */
  onpointerdown(event) {
    Util.absorbEvent(event);
    window.addEventListener('pointerup', this.upHandler);
    window.addEventListener('pointercancel', this.cancelHandler);
    return false;
  }

  /**
   * @param {PointerEvent} event 
   * @returns {boolean}
   */
  onpointerup(event) {
    Util.absorbEvent(event);
    window.removeEventListener('pointerup', this.upHandler);
    window.removeEventListener('pointercancel', this.cancelHandler);

    const r = this.g.getBoundingClientRect();
    // console.log('rect', r);
    // console.log('event client', event.clientX, event.clientY);
    if ( event.clientX > r.left && event.clientX < r.right ) {
      if ( event.clientY > r.top && event.clientY < r.bottom ) {
        document.dispatchEvent(new Event(this.command));
      }
    }
    return false;
  }

  /**
   * @param {PointerEvent} event 
   */
  onpointercancel(event) {
    console.log('cancel');
  }

}

class BigButton {
  /**
   * @param {object} options 
   */
  constructor(options={}) {
    this.id = options.id || 'bigbutton';
    this.width = options.width || 400;
    this.height = options.height || this.width / 2;
    this.x = options.x || (baize.width / 2) - (this.width / 2);
    this.y = options.y || (baize.height / 2) - (this.height / 2);
    this.command = options.command;

    this.g = document.createElementNS(Constants.SVG_NAMESPACE, 'g');
    this.g.classList.add('button', 'big');
    Util.setAttributesNS(this.g, {
      'id': this.id,
      'transform': `translate(${this.x}, ${this.y})`,
    });

    this.rect = document.createElementNS(Constants.SVG_NAMESPACE, 'rect');
    Util.setAttributesNS(this.rect, {
      'width': this.width,
      'height': this.height,
      'rx': String(this.width / 20)
    });
    this.g.appendChild(this.rect);

    this.svg = document.createElementNS(Constants.SVG_NAMESPACE, 'svg');
    Util.setAttributesNS(this.svg, {
      'width': this.width,
      'height': this.height
    });
    this.g.appendChild(this.svg);

    this.text = document.createElementNS(Constants.SVG_NAMESPACE, 'text');
    this.text.classList.add('buttontext', 'big');
    Util.setAttributesNS(this.text, {
      'x': '50%',
      'y': '50%',
      'dominant-baseline': 'central',
      'text-anchor': 'middle'
    });
    this.text.innerHTML = options.text;
    this.svg.appendChild(this.text);

    options.parent.appendChild(this.g);

    this.downHandler = this.onpointerdown.bind(this);
    this.upHandler = this.onpointerup.bind(this);
    this.cancelHandler = this.onpointercancel.bind(this);

    this.g.addEventListener('pointerdown', this.downHandler);
    this.g.addEventListener('touchstart', dummyTouchHandler);
    this.g.addEventListener('touchmove', dummyTouchHandler);
    this.g.addEventListener('touchend', dummyTouchHandler);
  }
  /**
   * @param {PointerEvent} event 
   * @returns {boolean}
   */
  onpointerdown(event) {
    Util.absorbEvent(event);
    window.addEventListener('pointerup', this.upHandler);
    window.addEventListener('pointercancel', this.cancelHandler);
    return false;
  }

  /**
   * @param {PointerEvent} event 
   * @returns {boolean}
   */
  onpointerup(event) {
    Util.absorbEvent(event);
    window.removeEventListener('pointerup', this.upHandler);
    window.removeEventListener('pointercancel', this.cancelHandler);

    const r = this.g.getBoundingClientRect();
    // console.log('rect', r);
    // console.log('event client', event.clientX, event.clientY);
    if ( event.clientX > r.left && event.clientX < r.right ) {
      if ( event.clientY > r.top && event.clientY < r.bottom ) {
        document.dispatchEvent(new Event(this.command));
      }
    }
    return false;
  }

  /**
   * @param {PointerEvent} event 
   */
  onpointercancel(event) {
    console.log('cancel');
  }
}

class Card {
  /**
   * g>rect>text
   * @param {!number} value 
   */
  constructor(value) {
    this.value = value;
    this.g = /** @type {SVGGElement} */(document.createElementNS(Constants.SVG_NAMESPACE, 'g'));
    this.createRect_();
    this.createText_();

    /** @type {number[]} */this.animationIds = [];
  }

  destroy() {
    baize.deleteCard(this);
  }

  /**
   * @private
   * @returns Element
   */
  createRect_() {
    this.rect = document.createElementNS(Constants.SVG_NAMESPACE, 'rect');
    this.rect.classList.add('spielkarte');
    Util.setAttributesNS(this.rect, {
      width: String(Constants.CARD_SIZE),
      height: String(Constants.CARD_SIZE),
      rx: String(Constants.CARD_RADIUS),
      ry: String(Constants.CARD_RADIUS),
    });
    this.updateRect_();
    this.g.appendChild(this.rect);
  }

  updateRect_() {
    Util.setAttributesNS(this.rect, {
      fill: rectColors.get(this.value)
    });
  }

  /**
   * @private
   */
  createText_() {
    console.assert(typeof(this.value) === 'number');
    console.assert(this.value > 0);
    this.text = document.createElementNS(Constants.SVG_NAMESPACE, 'text');
    this.text.classList.add('spielkartevalue');
    Util.setAttributesNS(this.text, {
      'x': String(Constants.CARD_SIZE/2), // '50%' didn't work
      'y': String(Constants.CARD_SIZE/2), // '50%' didn't work
      'text-anchor': 'middle',
      // https://www.w3.org/TR/SVG11/text.html#DominantBaselineProperty
      'dominant-baseline': 'central',
    });
    this.updateText_();
    this.g.appendChild(this.text);
  }

  /**
   * private
   */
  updateText_() {
    let fontSize = undefined;
    const txtValue = String(this.value);
    switch ( txtValue.length ) {
      case 1: fontSize = '56'; break;
      case 2: fontSize = '48'; break;
      case 3: fontSize = '48'; break;
      case 4: fontSize = '36'; break;
      case 5: fontSize = '24'; break;
    }
    Util.setAttributesNS(this.text, {
      'font-size': fontSize,
      'fill': valueColors.get(this.value)
    });
    this.text.innerHTML = txtValue;
  }

  fadeIn() {
    this.g.classList.add('new');
  }

  fadeOut() {
    this.g.classList.remove('new');
    this.g.classList.add('old');
  }

  /**
   * Use SVG transform to position this card on the baize
   * @param {number} x
   * @param {number} y
   */
  positionXY(x, y) {
    this.g.setAttributeNS(null, 'transform', `translate(${x} ${y})`);
  }

  /**
   * Use SVG transform to position this card on the baize
   * at the place where it's supposed to be
   */
  position0() {
    const place = asstab.getPlace(this);
    this.positionXY(place.pt.x, place.pt.y);
  }

  /**
   * @param {number} x 
   * @returns {!number}
   * @private
   */
  smootherstep_(x) {
    return ((x) * (x) * (x) * ((x) * ((x) * 6 - 15) + 10));
  }

  /**
   * animate this card to it's place
   * @param {SVGPoint} ptFrom
   */
  animate(ptFrom) {
    const step_ = (timestamp) => {
      const v = this.smootherstep_(i / N);
      const x = Math.round((ptFrom.x * v) + (ptTo.x * (1 - v)));
      const y = Math.round((ptFrom.y * v) + (ptTo.y * (1 - v)));
      this.positionXY(x, y);

      i -= N/20;
      if ( i > 0 ) {
        this.animationIds.push(window.requestAnimationFrame(step_));
      } else {
        this.position0();
        this.animationIds.length = 0;
      }
    };

    // stop the card flickering/animating again when it moves
    this.g.classList.remove('new');

    baize.elevateCard(this);

    const place = asstab.getPlace(this);
    const ptTo = {x: place.pt.x, y: place.pt.y};
    const N = Math.hypot(ptTo.x - ptFrom.x, ptTo.y - ptFrom.y);  // see 30 seconds of code
    let i = N;
    if ( N ) {
      window.requestAnimationFrame(step_);
    }
  }
}

class Place {
  /**
   * @param {number} x 
   * @param {number} y 
   */
  constructor(x,y) {
    this.x = x
    this.y = y
    this.n = this.e = this.s = this.w = null;
    this.pt = {
      x: Constants.GRID_GAP + (x * (Constants.CARD_SIZE + Constants.CARD_GAP)),
      y: Constants.GRID_GAP + (y * (Constants.CARD_SIZE + Constants.CARD_GAP))
    };

    this.rect = document.createElementNS(Constants.SVG_NAMESPACE, 'rect');
    this.rect.classList.add('place');
    Util.setAttributesNS(this.rect, {
      x: this.pt.x.toString(),
      y: this.pt.y.toString(),
      height: String(Constants.CARD_SIZE),
      width: String(Constants.CARD_SIZE),
      rx: String(Constants.CARD_RADIUS),
      ry: String(Constants.CARD_RADIUS)
    });
    document.getElementById('baize').appendChild(this.rect);
  }

  /**
   * @returns {Object}
   */
  getSaveable() {
    const card = asstab.getCard(this);
    if ( card )
      return {'x':this.x, 'y':this.y, 'v':card.value};
    else
      return null;
  }
}

class Grid {
  constructor() {
    /** @type {Place[]} */this.places = [];

    for ( let y=0; y<Constants.GRID_SIZE; y++ ) {
      for ( let x=0; x<Constants.GRID_SIZE; x++ ) {
        let c = new Place(x, y)
        this.places.push(c)
      }
    }
    this.places.forEach( c => {
      c.n = this.findPlace(c.x, c.y - 1);
      c.e = this.findPlace(c.x + 1, c.y);
      c.s = this.findPlace(c.x, c.y + 1);
      c.w = this.findPlace(c.x - 1, c.y);
    });
    this.lastState = null;
  }

  /**
   * @param {Number} x 
   * @param {Number} y 
   * @return {Place}
   */
  findPlace(x,y) {
    return this.places.find(c => {return c.x == x && c.y == y});
  }

  /**
   */
  randomEmptyPlace() {
    let emptyPlaces = this.places.filter( pl => !asstab.getCard(pl) );
    if ( !emptyPlaces.length ) {
      return null;
    }
    return emptyPlaces[Math.floor(Math.random()*emptyPlaces.length)];
  }

  /**
   * @returns {boolean}
   */
  newRandomCard() {
    const place = this.randomEmptyPlace();
    if ( place ) {
      baize.createCard(place, Math.random() > 0.5 ? 4 : 2).fadeIn();
    }
    return !!place;
  }

  // countCards() {
  //   let n = 0;
  //   for ( const place of this.places ) {
  //     if ( asstab.getCard(place) ) {
  //       n++;
  //     }
  //   }
  //   return n;
  // }

  /**
   * @returns {boolean}
   */
  gameOver() {
    // console.log(this.countCards(), 'cards');

    /**
     * @param {Place} place 
     * @param {Card} card 
     * @param {string} dir 
     */
    function checkNeighbours(place, card, dir) {
      const neighbourPlace = place[dir];
      if ( neighbourPlace ) {
        const neighbourCard = asstab.getCard(neighbourPlace);
        if ( !neighbourCard ) {
          // console.log('gameOver: empty neighbour place', dir);
          return false;
        }
        if ( neighbourCard.value === card.value ) {
          // console.log('gameOver: values match');
          return false;
        }
      }
      return true;
    }

    for ( const place of this.places ) {
      const card = asstab.getCard(place);
      if ( !card ) {
        // console.log('gameOver: empty place');
        return false;
      }
      // can't do ['n','e','s','w'].forEach( dir => {
      // because the return false would be from the forEach function
      if ( !checkNeighbours(place, card, 'n') )  return false;
      if ( !checkNeighbours(place, card, 'e') )  return false;
      if ( !checkNeighbours(place, card, 's') )  return false;
      if ( !checkNeighbours(place, card, 'w') )  return false;
    }
    return true;
  }

  someCardsInTransit() {
    for ( const place of this.places ) {
      const card = asstab.getCard(place);
      if ( card && card.animationIds.length > 0 ) {
        // console.log(card.animationIds.length);
        return true;
      }
    }
    return false;
  }

  waitForCards() {
    return new Promise((resolve, reject) => {
      const tStart = performance.now();
      const tBored = tStart + 10000;
      const check = () => {
        if ( !this.someCardsInTransit() ) {
          resolve(performance.now() - tStart);
        } else if ( performance.now() > tBored ) {
          reject('timed out waiting for cards to finish moving');
        } else {
          window.setTimeout(check, 100);
        }
      }
      window.setTimeout(check, 100);
    });
  }

  /**
   * @param {Card} card 
   */
  waitForCard(card) {
    return new Promise((resolve, reject) => {
      const tStart = performance.now();
      const tBored = tStart + 10000;
      const check = () => {
        if ( card.animationIds.length === 0 ) {
          resolve(performance.now() - tStart);
        } else if ( performance.now() > tBored ) {
          reject('timed out waiting for card to finish moving');
        } else {
          window.setTimeout(check, 100);
        }
      }
      window.setTimeout(check, 100);
    });
  }

  *sweepNorth() {
    for ( let x=0; x<Constants.GRID_SIZE; x++ ) {
      for ( let y=1; y<Constants.GRID_SIZE; y++ ) {
        yield this.findPlace(x,y);
      }
    }
  }

  *sweepEast() {
    for ( let y=0; y<Constants.GRID_SIZE; y++ ) {
      for ( let x=Constants.GRID_SIZE-2; x>=0; x-- ) {
        yield this.findPlace(x,y);
      }
    }
  }

  *sweepSouth() {
    for ( let x=0; x<Constants.GRID_SIZE; x++ ) {
      for ( let y=Constants.GRID_SIZE-2; y>=0; y-- ) {
        yield this.findPlace(x,y);
      }
    }
  }

  *sweepWest() {
    for ( let y=0; y<Constants.GRID_SIZE; y++ ) {
      for ( let x=1; x<Constants.GRID_SIZE; x++ ) {
        yield this.findPlace(x,y);
      }
    }
  }

  /**
   * @param {function} sweepFn 
   * @param {string} dir 
   * @return {number}
   */
  mergeCards(sweepFn, dir) {
    let merged = 0;
    for ( const oldPlace of sweepFn() ) {
      const oldCard = asstab.getCard(oldPlace);
      if ( !oldCard )
        continue;
      let newPlace = oldPlace[dir];
      if ( !newPlace )
        continue;
      let newCard = asstab.getCard(newPlace);
      if ( !newCard )
        continue;
      if ( oldCard.value !== newCard.value )
        continue;


      newCard.fadeOut();

      asstab.moveCard(oldPlace, newPlace);
      oldCard.animate(oldPlace.pt);

      oldCard.value *= 2;
      oldCard.updateText_();
      oldCard.updateRect_();
      score.inc(oldCard.value);

      this.waitForCard(oldCard)
      .then( () => {
        newCard.destroy();
      });

      merged += 1;
    }
    return merged;
  }

  /**
   * @param {function} sweepFn 
   * @param {string} dir 
   * @return {number}
   */
  packCards(sweepFn, dir) {
    let packed = 0;
    for ( const oldPlace of sweepFn() ) {
      const oldCard = asstab.getCard(oldPlace);
      if ( !oldCard )
        continue;
      let newPlace = oldPlace;
      while ( newPlace[dir] ) {
        if ( asstab.getCard(newPlace[dir]) )
          break;
        newPlace = newPlace[dir];
      }
      if ( oldPlace !== newPlace ) {
        asstab.moveCard(oldPlace, newPlace);
        oldCard.animate(oldPlace.pt);
        packed += 1;
      }
    }
    return packed;
  }

  /**
   * @param {function} sweepFn 
   * @param {string} dir 
   */
  moveCards(sweepFn, dir) {
    const possibleLastState = new Saved();
    let cardsPacked = this.packCards(sweepFn, dir);
    let cardsMerged = this.mergeCards(sweepFn, dir);
    if ( cardsMerged > 0 ) {
      cardsPacked += this.packCards(sweepFn, dir);
    }
    if ( cardsPacked > 0 || cardsMerged > 0 ) {
      this.lastState = possibleLastState;
      this.waitForCards()
      .then ( () => { 
        this.newRandomCard();
      });
    }
  }

  /**
   * returns {Array}
   */
  getSaveableCards() {
    const arr = [];
    for ( const place of this.places ) {
      const o = place.getSaveable();
      if ( o )
        arr.push(o);
    }
    return arr;
  }

  /**
   * @param {Saved} sv 
   */
  load(sv) {
    if ( !sv.isValid() )
      return;
    score.set(sv.score);
    for ( let i=0; i<sv.cards.length; i++ ) {
      const c = sv.cards[i];
      const place = this.findPlace(c.x, c.y);
      baize.createCard(place, c.v);
    }
  }

  save() {
    const sv = new Saved();
    try {
      localStorage.setItem(Constants.LOCALSTORAGE_GAME, JSON.stringify(sv));
    } catch (err) {
      console.error(err);
    }
  }

  undo() {
    if ( !this.lastState )
      return;
    for ( const place of this.places ) {
      const card = asstab.getCard(place);
      if ( card ) {
        card.destroy();
      }
    }
    asstab.reset();
    this.load(this.lastState);
    this.lastState = null;
  }
}

class Saved {
  /**
   * @param {Object=} obj 
   */
  constructor(obj=undefined) {
    if ( obj ) {
      for ( let prop in obj ) this[prop] = obj[prop];
    } else {
      this.size = Constants.GRID_SIZE;
      this.score = score.get();
      this.cards = grid.getSaveableCards();
    }
  }

  /**
   * @returns {boolean}
   */
  isValid() {
    return typeof(this.size) === 'number'
      && this.size === Constants.GRID_SIZE
      && typeof(this.score) === 'number'
      && typeof(this.cards) === 'object'
      && this.cards.length > 0
  }
}

document.documentElement.style.setProperty('--bg-color', 'Moccasin');
document.documentElement.style.setProperty('--hi-color', 'PeachPuff');
document.documentElement.style.setProperty('--ffont', 'Acme');

document.addEventListener('keydown', function(/** @type {KeyboardEvent} */kev) {
  // console.log(kev,kev.key,kev.keyCode,kev.ctrlKey);
  const cmds = new Map([
    ['ArrowUp', 'n'],
    ['ArrowRight', 'e'],
    ['ArrowDown', 's'],
    ['ArrowLeft', 'w']
  ]);

  if ( kev.key.startsWith('Arrow') ) {
    const dir = cmds.get(kev.key);
    if ( typeof(dir) === 'string' ) {
      kev.preventDefault();
      document.dispatchEvent(new CustomEvent('moveCards', { detail: { dir: dir } }));
    }
  }
});

window.onbeforeunload = function(e) {
  grid.save();
// setting e.returnValue makes Chrome display a dialog
}

const baize = new Baize();
const score = new Score(
  Constants.GRID_GAP + ((Constants.GRID_SIZE * (Constants.CARD_SIZE + Constants.CARD_GAP))/2),
  Constants.GRID_GAP / 2
);
const grid = new Grid();
baize.setBox();

document.addEventListener('moveCards', function(/** @type {CustomEvent} */event) {
  const dirs = new Map([
    ['n', function() {grid.moveCards(grid.sweepNorth.bind(grid), 'n')}],
    ['e', function() {grid.moveCards(grid.sweepEast.bind(grid), 'e')}],
    ['s', function() {grid.moveCards(grid.sweepSouth.bind(grid), 's')}],
    ['w', function() {grid.moveCards(grid.sweepWest.bind(grid), 'w')}],
  ]);
  console.assert(typeof(event.detail.dir)==='string');
  const fn = dirs.get(event.detail.dir);
  if ( fn ) fn();
  window.setTimeout( () => {
    if ( grid.gameOver() ) {
      new BigButton({
        parent: baize.ele,
        id: 'gameover',
        text: 'Game Over',
        command: 'newGame'
      });
    }
  }, 1000);
});

document.addEventListener('newGame', function(/** {Event} */event) {
  try {
    localStorage.removeItem(Constants.LOCALSTORAGE_GAME);
  } catch(e) {
    console.error(e);
  }
  window.onbeforeunload = null;
  window.location.reload();
});

document.addEventListener('undoMove', function(/** {Event} */event) {
  grid.undo();
});

{
  let savedGame = /** @type {Saved} */null;
  try {
    // localStorage.getItem() can return null if key does not exist
    // JSON.parse(null) returns null
    savedGame = new Saved(JSON.parse(localStorage.getItem(Constants.LOCALSTORAGE_GAME)) || {});
  } catch(e) {
    savedGame = /** @type {Saved} */null;
    console.error(e);
  }
  if ( savedGame && savedGame.isValid() ) {
    grid.load(savedGame);
  } else {
    grid.newRandomCard();
    grid.newRandomCard();
    grid.lastState = new Saved();
  }
}
