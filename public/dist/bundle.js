/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 13);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__views_main__ = __webpack_require__(6);


class Router {

    constructor() {
        if (Router.__instance) {
            return Router.__instance;
        }
        this.routes = new Map();

        Router.__instance = this;
    }

    register(path, view) {
        this.routes.set(path, view);

        return this;
    }

    setNotFoundPage(view) {
        this.page404 = view;
    }

    navigate() {
        window.onpopstate = event => {
            this.go(window.location.pathname);
            console.log('reload work');
        };

        document.body.addEventListener('click', event => {

            if (event.target.tagName.toLowerCase() === 'a') {

                event.preventDefault();
                const element = event.target;
                const pathname = element.getAttribute('value');

                console.log(pathname);

                if (pathname !== null) {

                    this.go(pathname);
                    console.log(pathname);
                }
                this.go(window.location.pathname);
            }
        });
        this.go(window.location.pathname);
    }

    go(path) {
        let view = this.routes.get(path);
        console.log(view);

        /* if (!view) {
             document.body.innerHTML = '<h class="notfound"> We didnot do such page )';
             return;
         }*/

        if (window.location.pathname !== path) {
            window.history.pushState({}, '', path);
        }

        view.creation();
        if (path === '/login') {

            Object(__WEBPACK_IMPORTED_MODULE_0__views_main__["signin"])(view);
        } else if (path === '/signup') {
            Object(__WEBPACK_IMPORTED_MODULE_0__views_main__["signup"])(view);
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["default"] = Router;


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Модуль, реализующий общее поведение для каждого блока
 * @module Block
 */
class Block {
    constructor(...args) {
        this._eventsListening = [];
        this._childBlocks = {};

        if (typeof args[0] === 'string') {
            let tagName = args[0];
            let classes = args[1] || [];
            let attrs = args[2] || {};

            this._element = document.createElement(tagName);
            classes.forEach(className => {
                this._element.classList.add(className);
            });
            for (let name in attrs) {
                this._element.setAttribute(name, attrs[name]);
            }
        } else if (args[0] instanceof Node) {
            this._element = args[0];
        }
        this.template = null;
    }

    setText(text) {
        this._element.textContent = text;
        return this;
    }

    appendChildBlock(blockName, block) {
        this._element.appendChild(block._element);
        this._childBlocks[blockName] = block;
        return this;
    }

    removeAllChildren() {
        for (let blockName in this._childBlocks) {
            this._element.removeChild(this._childBlocks[blockName]._element);
            delete this._childBlocks[blockName];
        }
    }

    on(event, callback) {
        console.log('on inside');
        if (this._eventsListening.indexOf(event) === -1) {
            this._element.addEventListener(event, callback);
            console.log('on works');

            this._eventsListening.push(event);
        }
    }

    hasAttribute(attribute) {
        return this._element.hasAttribute(attribute);
    }

    setAttribute(attribute, value) {
        this._element.setAttribute(attribute, value);
    }

    getAttribute(attribute) {
        return +this._element.getAttribute(attribute);
    }

    removeAttribute(attribute) {
        this._element.removeAttribute(attribute);
    }

}

/* harmony default export */ __webpack_exports__["a"] = (Block);

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Utils {
  static resize(gl) {
    let displayWidth = gl.canvas.clientWidth;
    let displayHeight = gl.canvas.clientHeight;
    if (gl.canvas.width !== displayWidth || gl.canvas.height !== displayHeight) {
      gl.canvas.width = displayWidth;
      gl.canvas.height = displayHeight;
    }
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
  }

  static madeRectangle(x0, y0, width, height) {
    return [x0, y0, width, y0, x0, height, x0, height, width, y0, width, height];
  }

  static translationOnMap(i, j) {
    return [-0.6 + j * (1.2 / 16), 0.85 - i * (1.2 / 16) * 16 / 9];
  }

  static translationForUnits(unit) {
    return [-0.6 - 0.08 + unit.xpos * (1.2 / 16), 0.85 - unit.ypos * (1.2 / 16) * 16 / 9 + 1.2 / 12 * 16 / 9];
  }

  static transOnLowbar(i) {
    return [-0.55 + 0.005 + i * 0.1, -0.79 - 0.01];
  }

  static transForHealthbar(unit) {
    return [-0.6 + 0.003 + unit.xpos * (1.2 / 16), 0.85 - unit.ypos * (1.2 / 16) * 16 / 9 + 1.2 / 17 * 16 / 9];
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Utils;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Константы для проверки размеров полей
 */
const MAX_LOGIN_LENGTH = 30;
const MIN_LOGIN_LENGTH = 3;

const MAX_PASSWORD_LENGTH = 30;
const MIN_PASSWORD_LENGTH = 4;

/**
 * Класс для валидации полей
 * методы возвращают true если валидация прошла или строку с текстом ошибки
 * @class Validate
 */
class Validate {

    static userError() {
        let nameForm = 'form.login-form';
        if (document.querySelector('form.login-form') === null) {
            nameForm = 'form.registration-form';
        }
        let form = document.querySelector(nameForm);

        let div = document.createElement('div');
        div.className = "message-error";
        div.innerHTML = "<p> Sorry,user is already exist </p> ";
        if (form.getElementsByTagName('p').length === 0) {
            form.appendChild(div);
        }
    }
    static formError(formName) {
        let form = document.querySelector(formName);
        let div = document.createElement('div');
        div.className = "message-error";
        div.innerHTML = "<p> Hey,not valid data input :) </p> ";
        if (form.getElementsByTagName('p').length === 0) {
            form.appendChild(div);
        }
    }

    static validateLogin(login) {
        if (login.length < MIN_LOGIN_LENGTH || login.length > MAX_LOGIN_LENGTH || !isNaN(login)) {
            return;
        }
        return true;
    }

    static validateEmail(email) {
        if (!email.match(/@/)) {
            return;
        }
        return true;
    }

    static validatePassword(password) {
        if (password.length < MIN_PASSWORD_LENGTH || password.length > MAX_PASSWORD_LENGTH) {
            return;
        }
        return true;
    }
}

/* harmony default export */ __webpack_exports__["a"] = (Validate);

/***/ }),
/* 5 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "signup", function() { return signup; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "signin", function() { return signin; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__baseview__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__blocks_autheficate_registrationAuth__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__blocks_autheficate_loginAuth__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modules_router__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__servises_user_service__ = __webpack_require__(16);









const userService = new __WEBPACK_IMPORTED_MODULE_4__servises_user_service__["a" /* default */]();
const application = new __WEBPACK_IMPORTED_MODULE_0__baseview__["a" /* default */](document.getElementById('application'));

const gameName = new __WEBPACK_IMPORTED_MODULE_0__baseview__["a" /* default */]('div', ['game-name']);
const wrapper = new __WEBPACK_IMPORTED_MODULE_0__baseview__["a" /* default */]('div', ['wrapper']);
const game = new __WEBPACK_IMPORTED_MODULE_0__baseview__["a" /* default */]('div', ['game']);

application.appendChildBlock('game-name', gameName);
gameName.appendChildBlock('game-name', new __WEBPACK_IMPORTED_MODULE_0__baseview__["a" /* default */]('div', ['main']).setText('Lands & Dungeons'));
application.appendChildBlock('wrapper', wrapper);

function signin(login) {
    console.log('submit worker');

    login.onSubmit(formdata => {
        console.log('submit worker');
        const authValidation = Object(__WEBPACK_IMPORTED_MODULE_2__blocks_autheficate_loginAuth__["a" /* default */])(formdata[0], formdata[1]);
        console.log(formdata[0], formdata[1]);
        if (authValidation === false) {
            console.log('vLIDE');
            return;
        }
        userService.signin(formdata[0], formdata[1]).then(() => new __WEBPACK_IMPORTED_MODULE_3__modules_router__["default"]().go('/game')).then(() => game.appendChildBlock('game', new __WEBPACK_IMPORTED_MODULE_0__baseview__["a" /* default */]('a', ['logout']).setText('logout'))).then(() => {
            let logout = document.querySelector('a.logout');
            logout.addEventListener('click', function () {
                userService.logout();
                new __WEBPACK_IMPORTED_MODULE_3__modules_router__["default"]().go('/');
            });
        });
    });
}

function signup(registration) {
    console.log('signup');
    registration.onSubmit(formdata => {
        const authValidation = Object(__WEBPACK_IMPORTED_MODULE_1__blocks_autheficate_registrationAuth__["a" /* default */])(formdata[0], formdata[1], formdata[2], formdata[3]);
        if (authValidation === false) {
            return;
        }
        userService.signup(formdata[0], formdata[1], formdata[2]).then(() => new __WEBPACK_IMPORTED_MODULE_3__modules_router__["default"]().go('/game')).then(() => game.appendChildBlock('game', new __WEBPACK_IMPORTED_MODULE_0__baseview__["a" /* default */]('a', ['logout']).setText('logout'))).then(() => {
            let logout = document.querySelector('a.logout');
            logout.addEventListener('click', function () {
                userService.logout();
                new __WEBPACK_IMPORTED_MODULE_3__modules_router__["default"]().go('/');
            });
        });
    });
}



/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__blocks_forms_validation__ = __webpack_require__(4);


const baseUrl = `${window.location.protocol}//${window.location.host}`;

/**
 * Класс, предоставляющий методы для выполнения HTTP-запросов
 * @class Http
 */
class Http {
    /**
     * Выполняет GET-запрос с использованием fetch (по возможности) или XMLHttpRequest
     * @param {string} address - "ручка"
     * @return {Promise}
     */
    static Get(address) {
        const url = (Http.BaseUrl || baseUrl) + address;
        if (typeof window.fetch !== 'undefined') {
            return this._FetchGet(url);
        }
        return this._GetXMLHttpRequest(url);
    }

    /**
     * Выполняет POST-запрос с использованием fetch (по возможности) или XMLHttpRequest
     * @param {string} address - "ручка"
     * @param {*} body - тело запроса (объект)
     * @return {Promise}
     */
    static Post(address, body) {
        const url = (Http.BaseUrl || baseUrl) + address;
        if (typeof window.fetch !== 'undefined') {
            console.log("function post work");
            return this._FetchPost(body, url);
        }
        return false;
    }

    /**
     * Выполняет GET-запрос по указанному адресу с использованием XMLHttpRequest
     * @param {string} url - адрес запроса
     * @return {Promise}
     */
    static _GetXMLHttpRequest(url) {
        return new Promise(function (resolve, reject) {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);
            xhr.withCredentials = true;

            xhr.onreadystatechange = function () {
                if (xhr.readyState !== 4) return;
                if (+xhr.status >= 400) {
                    alert(xhr.responseText);
                    reject(xhr);
                    return;
                }

                const response = JSON.parse(xhr.responseText);
                resolve(response);
            };

            xhr.send();
        });
    }

    /**
     * Выполняет POST-запрос по указанному адресу с использованием XMLHttpRequest
     * @param {string} url - адрес запроса
     * @param {*} body - тело запроса (объект)
     * @return {Promise}
     */
    static _PostXMLHttpRequest(body, url) {
        return new Promise(function (resolve, reject) {
            const xhr = new XMLHttpRequest();
            xhr.open('POST', url, true);
            xhr.withCredentials = true;
            xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

            xhr.onreadystatechange = function () {
                if (xhr.readyState !== 4) return;
                if (+xhr.status >= 400) {

                    reject(xhr);
                    return;
                }

                const response = JSON.parse(xhr.responseText);
                resolve(response);
            };

            xhr.send(JSON.stringify(body));
        });
    }

    /**
     * Выполняет GET-запрос по указанному адресу с использованием fetch
     * @param {string} url - адрес запроса
     * @return {Promise}
     */
    static _FetchGet(url) {
        return fetch(url, {
            method: 'GET',
            mode: 'cors',
            credentials: 'include'
        }).then(function (response) {
            let json = response.json();
            if (response.status >= 400) {
                return json.then(response => {
                    throw response;
                });
            }
            return json;
        });
    }

    /**
     * Выполняет POST-запрос по указанному адресу с использованием fetch
     * @param {string} url - адрес запроса
     * @param {*} body - тело запроса (объект)
     * @return {Promise}
     */
    static _FetchPost(body, url) {
        console.log(JSON.stringify(body));
        return fetch(url, {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Accept': 'application/json'
            }
        }).then(function (response) {
            console.log("fetch post work\n");
            console.log(response.status);
            if (response.status === 200) {
                return;
            } else if (response.status >= 400) {
                __WEBPACK_IMPORTED_MODULE_0__blocks_forms_validation__["a" /* default */].userError();
                let json = response.json();
                return json.then(response => {
                    throw response;
                });
            }
        });
    }

}

Http.BaseUrl = null;

/* harmony default export */ __webpack_exports__["default"] = (Http);

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Модуль, реализующий общее поведение для каждого блока
 * @module Block
 */
class Generator {
    constructor(...args) {
        this._eventsListening = [];
        this._childBlocks = {};

        if (typeof args[0] === 'string') {
            let tagName = args[0];
            let classes = args[1] || [];
            let attrs = args[2] || {};

            this._element = document.createElement(tagName);
            classes.forEach(className => {
                this._element.classList.add(className);
            });
            for (let name in attrs) {
                this._element.setAttribute(name, attrs[name]);
            }
        } else if (args[0] instanceof Node) {
            this._element = args[0];
        }
    }

    setText(text) {
        this._element.textContent = text;
        return this;
    }

    appendChildBlock(blockName, block) {
        this._element.appendChild(block._element);
        this._childBlocks[blockName] = block;
        return this;
    }

    removeAllChildren() {
        for (let blockName in this._childBlocks) {
            this._element.removeChild(this._childBlocks[blockName]._element);
            delete this._childBlocks[blockName];
        }
    }

    on(event, callback) {
        if (this._eventsListening.indexOf(event) === -1) {
            this._element.addEventListener(event, callback);
            this._eventsListening.push(event);
        }
    }

    hasAttribute(attribute) {
        return this._element.hasAttribute(attribute);
    }

    setAttribute(attribute, value) {
        this._element.setAttribute(attribute, value);
    }

    getAttribute(attribute) {
        return +this._element.getAttribute(attribute);
    }

    removeAttribute(attribute) {
        this._element.removeAttribute(attribute);
    }

}

/* harmony default export */ __webpack_exports__["a"] = (Generator);

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__block_block__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__forms_css__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__forms_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__forms_css__);



class Input extends __WEBPACK_IMPORTED_MODULE_0__block_block__["a" /* default */] {
    constructor(type = 'text', classes = [], attrs = {}) {
        attrs['type'] = type;
        super('input', classes, attrs);
    }
}

/* harmony default export */ __webpack_exports__["a"] = (Input);

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Skill {
	constructor() {
		this.name = "name";
		this.description = "description";
		this.typeOfArea = "point"; //point, circle
		this.area = 1;
		this.damage = [0, 0];
		this.cooldown = 0;
	}

	createSkill(name, description, typeOfArea, area, damage, cooldown) {
		this.name = name;
		this.description = description;
		this.typeOfArea = typeOfArea;
		this.area = area;
		this.damage = damage;
		this.cooldown = cooldown;
	}

	getDesciption() {
		if (damage[1] >= 0) {
			return this.name + "\nDam: " + this.damage[0] + "-" + this.damage[1] + " Type: " + this.typeOfArea + " with area: " + this.area + "\n" + " Cooldown: " + this.cooldown + "\n" + this.description;
		}

		return name + "\nHeal: " + Math.abs(this.damage[0]) + "-" + Math.abs(this.damage[1]) + " Type: " + this.typeOfArea + " with area: " + this.area + "\n" + " Cooldown: " + this.cooldown + "\n" + this.description;
	}

}
/* harmony export (immutable) */ __webpack_exports__["a"] = Skill;


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Shaders__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Program__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Utils__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Sprite__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__global_js__ = __webpack_require__(34);





class GraphicEngine {
  constructor(idCanvas, loop) {
    this.sprites = [];
    this.loop = loop;
    this.gl = document.getElementById(idCanvas).getContext("webgl");
    if (!this.gl) {
      alert('Error in initializate ' + idCanvas + ': Беда, брат! Твой браузер не поддерживает WebGl, но ты держись :D');
      return;
    }
    window.addEventListener('resize', function () {
      this.render(performance.now());
    }.bind(this));
    this.programForSprite = new __WEBPACK_IMPORTED_MODULE_1__Program__["a" /* default */](this.gl, __WEBPACK_IMPORTED_MODULE_0__Shaders__["c" /* vertexShader */], __WEBPACK_IMPORTED_MODULE_0__Shaders__["a" /* fragmentShader */]).create();
    this.programForColorObj = new __WEBPACK_IMPORTED_MODULE_1__Program__["a" /* default */](this.gl, __WEBPACK_IMPORTED_MODULE_0__Shaders__["d" /* vertexShader1 */], __WEBPACK_IMPORTED_MODULE_0__Shaders__["b" /* fragmentShader1 */]).create();
    this.time = performance.now() + 1;
  }

  addSprite(translation, texture, vertexs, blend, texCoord) {
    let attributes = [new __WEBPACK_IMPORTED_MODULE_3__Sprite__["a" /* Attribute */]('a_position', vertexs), new __WEBPACK_IMPORTED_MODULE_3__Sprite__["a" /* Attribute */]('a_texcoord', texCoord ? texCoord : __WEBPACK_IMPORTED_MODULE_2__Utils__["a" /* default */].madeRectangle(0, 0, 1, 1))];
    let uniforms = [new __WEBPACK_IMPORTED_MODULE_3__Sprite__["c" /* Uniform */]('u_translation', translation)];
    let sprite = new __WEBPACK_IMPORTED_MODULE_3__Sprite__["b" /* Sprite */](this.gl, this.programForSprite, attributes, uniforms, blend, texture);
    this.sprites.push(sprite);
    return this.sprites.length - 1;
  }

  addColorSprite(translation, vertexs, color, blend) {
    let attributes = [new __WEBPACK_IMPORTED_MODULE_3__Sprite__["a" /* Attribute */]('a_position', vertexs)];
    let uniforms = [new __WEBPACK_IMPORTED_MODULE_3__Sprite__["c" /* Uniform */]('u_translation', translation), new __WEBPACK_IMPORTED_MODULE_3__Sprite__["c" /* Uniform */]('u_color', color)];
    let sprite = new __WEBPACK_IMPORTED_MODULE_3__Sprite__["b" /* Sprite */](this.gl, this.programForColorObj, attributes, uniforms, blend);
    this.sprites.push(sprite);
    return this.sprites.length - 1;
  }

  render(now) {
    now *= 0.001;
    let deltaTime = now - this.time;
    this.time = now;
    if (deltaTime != 0) {
      document.getElementById('fps').innerHTML = (1 / deltaTime).toFixed(0);
    }

    __WEBPACK_IMPORTED_MODULE_2__Utils__["a" /* default */].resize(this.gl);
    this.gl.clearColor(0, 0, 0, 0);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);

    let lastProgram;
    this.sprites.forEach(sprite => {
      if (lastProgram === undefined) {
        this.gl.useProgram(sprite.program);
        lastProgram = sprite.program;
      } else if (lastProgram !== sprite.program) {
        this.gl.useProgram(sprite.program);
        lastProgram = sprite.program;
      }
      sprite.render();
    });

    if (this.loop) {
      requestAnimationFrame(this.render.bind(this));
    }
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = GraphicEngine;


/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

class Loader {
  constructor(paths, gl) {
    this.gl = gl;
    this.paths = paths;
    this.images = [];
  }

  loadImage(url, callback, i) {
    let image = new Image();
    image.src = url;
    image.onload = callback.bind(this, image, i);
    return image;
  }

  load(callback1, callback2) {
    let imagesToLoad = this.paths.length;
    let onImageLoad = function (image, i) {
      imagesToLoad--;
      let tex = this.gl.createTexture();
      this.gl.bindTexture(this.gl.TEXTURE_2D, tex);
      this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
      this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
      this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.NEAREST);
      this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);
      this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, image);
      this.images[i] = tex;
      if (imagesToLoad === 0) {
        callback1(this.images);
        if (callback2) {
          callback2();
        }
      }
    }.bind(this);
    for (let i = 0; i < imagesToLoad; i++) {
      let image = this.loadImage(this.paths[i], onImageLoad, i);
    }
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Loader;


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__modules_router__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__views_mainpage_mainpage__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__views_login_login__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__views_signup_registration__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__views_info_info__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__views_game_game__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__views_singleplay_web__ = __webpack_require__(25);










//import test from'./views/singleplay/textures/wall.jpg'
function requireAll(r) {
    r.keys().forEach(r);
}

__webpack_require__(6);
__webpack_require__(47);
__webpack_require__(48);

requireAll(__webpack_require__(49));
requireAll(__webpack_require__(50));
//requireAll(require.context('./views/', true, /\.(js)$/));
//requireAll(require.context('./images/', true, /\.(png)$/));
//requireAll(require.context('./views/singleplay/textures', true, /\.(png)$/));
//requireAll(require.context('./views/singleplay/textures', true, /\.(jpg)$/));


const login = new __WEBPACK_IMPORTED_MODULE_2__views_login_login__["a" /* default */]();
const mainMenu = new __WEBPACK_IMPORTED_MODULE_1__views_mainpage_mainpage__["a" /* default */]();
const signup = new __WEBPACK_IMPORTED_MODULE_3__views_signup_registration__["a" /* default */]();
const info = new __WEBPACK_IMPORTED_MODULE_4__views_info_info__["a" /* default */]();
const game = new __WEBPACK_IMPORTED_MODULE_5__views_game_game__["a" /* default */]();
const single = new __WEBPACK_IMPORTED_MODULE_6__views_singleplay_web__["a" /* default */]();

const router = new __WEBPACK_IMPORTED_MODULE_0__modules_router__["default"]();
router.register('/', mainMenu).register('/login', login).register('/signup', signup).register('/info', info).register('/game', game).register('/singleplay', single).navigate();

/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__forms_validation__ = __webpack_require__(4);


/**
 * @function AuthValidate
 * @return {string || null} возвращает null если ошибок нет
 */
let RegistrationValidate = (login, email, password, password_confirm) => {

    if (!__WEBPACK_IMPORTED_MODULE_0__forms_validation__["a" /* default */].validateLogin(login)) {
        __WEBPACK_IMPORTED_MODULE_0__forms_validation__["a" /* default */].formError('form.registration-form');
        return false;
    }
    if (!__WEBPACK_IMPORTED_MODULE_0__forms_validation__["a" /* default */].validateEmail(email)) {
        __WEBPACK_IMPORTED_MODULE_0__forms_validation__["a" /* default */].formError('form.registration-form');
        return false;
    }

    if (!__WEBPACK_IMPORTED_MODULE_0__forms_validation__["a" /* default */].validatePassword(password)) {
        __WEBPACK_IMPORTED_MODULE_0__forms_validation__["a" /* default */].formError('form.registration-form');
        return false;
    }

    if (!__WEBPACK_IMPORTED_MODULE_0__forms_validation__["a" /* default */].validatePassword(password_confirm)) {
        __WEBPACK_IMPORTED_MODULE_0__forms_validation__["a" /* default */].formError('form.registration-form');
        return false;
    }
};

/* harmony default export */ __webpack_exports__["a"] = (RegistrationValidate);

/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__forms_validation__ = __webpack_require__(4);


/**
 * @function AuthValidate
 * @return {string || null} возвращает null если ошибок нет
 */
let LoginValidate = (login, password) => {
    console.log('valide works');
    if (!__WEBPACK_IMPORTED_MODULE_0__forms_validation__["a" /* default */].validateLogin(login)) {
        __WEBPACK_IMPORTED_MODULE_0__forms_validation__["a" /* default */].formError('form.login-form');
        return false;
    }

    if (!__WEBPACK_IMPORTED_MODULE_0__forms_validation__["a" /* default */].validatePassword(password)) {
        __WEBPACK_IMPORTED_MODULE_0__forms_validation__["a" /* default */].formError('form.login-form');
        return false;
    }
};

/* harmony default export */ __webpack_exports__["a"] = (LoginValidate);

/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__modules_http__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__blocks_forms_validation__ = __webpack_require__(4);



/**
 * Сервис для работы с пользователями
 * @class UserService
 */
class UserService {
    constructor() {
        /**
         * Закомментить для обращения к серверу node.js
         */
        __WEBPACK_IMPORTED_MODULE_0__modules_http__["default"].BaseUrl = 'https://kvvartet2017.herokuapp.com';
    }

    /**
     * Регистрирует нового пользователя
     * @param {string} email
     * @param {string} password
     * @param {string} username
     * @return {Promise}
     */
    signup(username, email, password) {
        return __WEBPACK_IMPORTED_MODULE_0__modules_http__["default"].Post('/signup', { username, email, password });
    }

    /**
     * Авторизация пользователя
     * @param {string} username
     * @param {string} password
     * @return {Promise}
     */
    login(username, password) {
        return __WEBPACK_IMPORTED_MODULE_0__modules_http__["default"].Post('/signin', { username, password });
    }

    /**
     * Проверяет, авторизован ли пользователь
     * @return {boolean}
     */
    isLoggedIn() {
        return __WEBPACK_IMPORTED_MODULE_0__modules_http__["default"].Post('/currentUser');
    }

    /**
     * Выход пользователя
     * @return {Promise}
     */
    logout() {
        return __WEBPACK_IMPORTED_MODULE_0__modules_http__["default"].Post('/signout', {});
    }

    /**
     * Загружает данные о текущем пользователе
     * @return {Promise}
     */
    /*getData() {
        return Http.Post('/session')
            .then(userdata => {
                return userdata;
            });
    }*/

}

/* harmony default export */ __webpack_exports__["a"] = (UserService);

/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__baseview__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__main_page_css__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__main_page_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__main_page_css__);



const buttons = [{
    name: 'First',
    text: 'New Game',
    value: '/login'

}, {
    name: 'Second',
    text: 'Registration',
    value: '/signup'

}, {
    name: 'Third',
    text: 'Information',
    value: '/info'

}, {
    name: 'Four',
    text: 'Singleplayer',
    value: '/singleplayer'

}];
/* unused harmony export buttons */


const blockClass = 'button';

class MainPage extends __WEBPACK_IMPORTED_MODULE_0__baseview__["a" /* default */] {
    constructor() {
        super('div', ['main-menu'], {});
        this.createChildren();
        //console.log(document.getElementsByClassName(("buttonFirst")));
        return this;
    }

    createChildren() {
        buttons.forEach(button => {
            this.appendChildBlock(button.name, new __WEBPACK_IMPORTED_MODULE_0__baseview__["a" /* default */]('a', [blockClass + button.name]).setText(button.text));
        });

        //            buttons[0].href.setAttribute('href','/login');
        //          console.log(buttons[0].href);
    }
    creation() {

        let test = document.querySelector('div.wrapper');
        if (test.childNodes[0] !== undefined) {
            test.removeChild(test.childNodes[0]);
        }
        test.appendChild(this._element);
        console.log(this._element);

        let linkFirst = document.querySelector('a.buttonFirst');
        linkFirst.setAttribute('value', '/login');
        let linkSecond = document.querySelector('a.buttonSecond');
        linkSecond.setAttribute('value', '/signup');
        let linkThird = document.querySelector('a.buttonThird');
        linkThird.setAttribute('value', '/info');
        let linkFour = document.querySelector('a.buttonFour');
        linkFour.setAttribute('value', '/singleplay');
    }
}
/* unused harmony export MainPage */

/* harmony default export */ __webpack_exports__["a"] = (MainPage);

/***/ }),
/* 18 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__blocks_block_block__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__blocks_forms_input__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__blocks_forms_forms_css__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__blocks_forms_forms_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__blocks_forms_forms_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modules_router__ = __webpack_require__(0);





const fieldPrototypes = [{
    type: 'text',
    attributes: {
        name: 'username',
        placeholder: 'username'
    }
}, {
    type: 'password',
    attributes: {
        name: 'password',
        placeholder: 'password'
    }
}, {
    type: 'submit',
    attributes: {
        value: 'COMPLEATE'
        //formmethod:'post'
    }
}];

class Login extends __WEBPACK_IMPORTED_MODULE_0__blocks_block_block__["a" /* default */] {
    constructor() {
        super('form', ['login-form']);
        fieldPrototypes.forEach(fieldPrototype => {
            this.appendChildBlock(fieldPrototype.attributes.name, new __WEBPACK_IMPORTED_MODULE_1__blocks_forms_input__["a" /* default */](fieldPrototype.type, ['field'], fieldPrototype.attributes));
        });
        const buttonBack = "buttonBack";
        this.appendChildBlock("buttonBack", new __WEBPACK_IMPORTED_MODULE_0__blocks_block_block__["a" /* default */]('a', [buttonBack]));
    }

    creation() {

        let test = document.querySelector('div.wrapper');
        if (test.childNodes[0] !== undefined) {
            test.removeChild(test.childNodes[0]);
        }
        test.appendChild(this._element);

        let navigator = document.querySelector('a.buttonBack');
        navigator.addEventListener('click', () => {
            new __WEBPACK_IMPORTED_MODULE_3__modules_router__["default"]().go('/');
        });
    }

    onSubmit(callback) {
        console.log('this._element');

        this.on('submit', event => {
            console.log('on works');

            event.preventDefault();
            const formdata = {};
            const elements = this._element.elements;
            for (let name in elements) {
                formdata[name] = elements[name].value;
            }

            callback(formdata);
        });
    }
}

/* harmony default export */ __webpack_exports__["a"] = (Login);

/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__baseview__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__blocks_forms_input__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__blocks_forms_forms_css__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__blocks_forms_forms_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__blocks_forms_forms_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modules_router__ = __webpack_require__(0);





const fieldPrototypes = [{
    type: 'text',
    attributes: {
        name: 'username',
        placeholder: 'username'
    }
}, {
    type: 'text',
    attributes: {
        name: 'email',
        placeholder: 'email'
    }
}, {
    type: 'password',
    attributes: {
        name: 'password',
        placeholder: 'password'
    }
}, {
    type: 'password',
    attributes: {
        name: 'passwordConfirm',
        placeholder: 'repeat passoword'
    }
}, {
    type: 'submit',
    attributes: {
        value: 'COMPLEATE'
        //formmethod:'post'

    }
}];

class Registration extends __WEBPACK_IMPORTED_MODULE_0__baseview__["a" /* default */] {
    constructor() {
        super('form', ['registration-form']);

        fieldPrototypes.forEach(fieldPrototype => {
            this.appendChildBlock(fieldPrototype.attributes.name, new __WEBPACK_IMPORTED_MODULE_1__blocks_forms_input__["a" /* default */](fieldPrototype.type, ['field'], fieldPrototype.attributes));
        });
        const buttonBack = "buttonBack";
        this.appendChildBlock("buttonBack", new __WEBPACK_IMPORTED_MODULE_0__baseview__["a" /* default */]('a', [buttonBack]));
    }

    creation() {

        let test = document.querySelector('div.wrapper');
        if (test.childNodes[0] !== undefined) {
            test.removeChild(test.childNodes[0]);
        }
        test.appendChild(this._element);

        let navigator = document.querySelector('a.buttonBack');
        navigator.addEventListener('click', () => {
            new __WEBPACK_IMPORTED_MODULE_3__modules_router__["default"]().go('/');
        });
    }

    onSubmit(callback) {
        this.on('submit', event => {
            event.preventDefault();
            const formdata = {};
            const elements = this._element.elements;
            for (let name in elements) {
                formdata[name] = elements[name].value;
            }
            callback(formdata);
        });
    }
}

/* harmony default export */ __webpack_exports__["a"] = (Registration);

/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__baseview__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__info_css__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__info_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__info_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modules_router__ = __webpack_require__(0);




const infoBlock = "textBlock";
const buttonBack = "buttonBack";

class Info extends __WEBPACK_IMPORTED_MODULE_0__baseview__["a" /* default */] {
    constructor() {
        super('div', ['info'], {});
        this.createChildren();
        return this;
    }

    createChildren() {
        this.appendChildBlock("first", new __WEBPACK_IMPORTED_MODULE_0__baseview__["a" /* default */]('div', [infoBlock]).setText("TextBlock"));

        this.appendChildBlock("buttonBack", new __WEBPACK_IMPORTED_MODULE_0__baseview__["a" /* default */]('a', [buttonBack]));
    }

    creation() {

        let test = document.querySelector('div.wrapper');
        if (test.childNodes[0] !== undefined) {
            test.removeChild(test.childNodes[0]);
        }
        test.appendChild(this._element);

        let navigator = document.querySelector('a.buttonBack');
        navigator.addEventListener('click', () => {
            new __WEBPACK_IMPORTED_MODULE_2__modules_router__["default"]().go('/');
        });
    }

}
/* harmony default export */ __webpack_exports__["a"] = (Info);

/***/ }),
/* 22 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__baseview__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__game_css__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__game_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__game_css__);



const infoBlock = "textBlock";
const buttonBack = "buttonBack";

class Game extends __WEBPACK_IMPORTED_MODULE_0__baseview__["a" /* default */] {
    constructor() {
        super('div', ['game'], {});
        this.createChildren();
        return this;
    }

    createChildren() {
        this.appendChildBlock("first", new __WEBPACK_IMPORTED_MODULE_0__baseview__["a" /* default */]('div', [infoBlock]).setText("Game"));
        this.appendChildBlock('game', new __WEBPACK_IMPORTED_MODULE_0__baseview__["a" /* default */]('a', ['logout']).setText('logout'));
    }

    creation() {

        let test = document.querySelector('div.wrapper');
        if (test.childNodes[0] !== undefined) {
            test.removeChild(test.childNodes[0]);
        }
        test.appendChild(this._element);
    }

}
/* harmony default export */ __webpack_exports__["a"] = (Game);

/***/ }),
/* 24 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__baseview__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__DemoGameModule__ = __webpack_require__(26);



class SinglePlay extends __WEBPACK_IMPORTED_MODULE_0__baseview__["a" /* default */] {
  constructor() {
    super();

    this.template = __webpack_require__(46);
  }

  creation() {
    document.body.innerHTML = this.template;

    let game = new __WEBPACK_IMPORTED_MODULE_1__DemoGameModule__["a" /* default */]();
    game.gamePreRender();
  }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = SinglePlay;


/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__InitiativeLine__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Unit1__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Pathfinding__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Background__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__GameManager__ = __webpack_require__(37);






/*export default */
class DemoGameModule {
    constructor() {
        this.gameManager = new __WEBPACK_IMPORTED_MODULE_4__GameManager__["a" /* default */]();
        this.WIDTH = 16;
        this.HEIGHT = 12;
        this.PARTYSIZE = 4;
        this.ENEMIESSIZE = 2;
        this.kek = 3;
        this.NOTWALL = 0;
        this.WALL = 1;
        this.players = [];
        this.enemies = [];
        this.initiativeLine = new __WEBPACK_IMPORTED_MODULE_0__InitiativeLine__["a" /* default */]();
        this.activeUnit = null;
        this.timer = 30000;
        this.intervalId = 0;
        this.interval = 100;
    }

    gameStart() {
        this.gamePrepare();
        this.startGameLoop();
    }

    gamePreRender() {
        let back = new __WEBPACK_IMPORTED_MODULE_3__Background__["a" /* default */]();
        back.render();
        this.gameManager.startGameRendering(this.gameStart.bind(this));
    }

    gamePrepare() {
        this.players = this.generatePlayers();
        this.enemies = this.generateEnemies();
        this.initiativeLine.PushEveryone(this.players, this.enemies);
        this.setPlayersPositions(this.players);
        this.setEnemiesPositions(this.enemies);
        console.log("Everyone on positions: ");
        //отрисовка персонажей

        for (let i = 0; i < this.PARTYSIZE + this.ENEMIESSIZE; i++) {
            console.log(this.enemies);
            this.gameManager.unitManager.addUnit(this.initiativeLine.queue[i]);
        }

        this.activeUnit = this.initiativeLine.CurrentUnit();
        console.log(this.activeUnit.name + " - let's start with you!");
        this.gameManager.unitManager.activeUnit(this.activeUnit);
        this.sendPossibleMoves();
    }

    gameLoop() {
        if (!this.isPartyDead() && !this.isEnemiesDead()) {
            this.timer -= this.interval;
            document.getElementById('time').innerHTML = "00:" + Math.ceil(this.timer / 1000);
            document.getElementById('time').style.fontSize = "2em";
            //где-то здесь есть работа с АИ
            //отрисовка скилов для каждого персонажа, информация для dropdown и позиций
            if (global.actionDeque.length > 0) {
                console.log("action begin");
                this.activeUnit.actionPoint--;
                let action = global.actionDeque.shift();
                if (action.isMovement() && !action.target.isOccupied()) {
                    this.makeMove(action);
                } else if (action.isAbility()) {
                    console.log("this is ability: " + action.ability.name);
                    if (action.ability.damage[1] < 0) {
                        this.makeHill(action);
                    } else if (action.ability.damage[1] > 0) {
                        this.makeDamage(action);
                    }
                } else if (action.isSkip()) {
                    this.skipAction();
                }

                if (this.activeUnit.actionPoint === 1) {
                    this.sendPossibleMoves();
                }
            }
            console.log("action point: " + this.activeUnit.actionPoint);

            if (this.activeUnit.actionPoint === 0 || Math.ceil(this.timer / 1000) === 0 || this.activeUnit.isDead()) {
                this.skipAction();
            }
        } else {
            if (this.isPartyDead()) {
                this.loseGame();
            }

            if (this.isEnemiesDead()) {
                this.winGame();
            }
        }
    }

    makeMove(action) {
        console.log(action.sender.getInhabitant().name + " make move from [" + action.sender.xpos + "," + action.sender.ypos + "]" + " to [" + action.target.xpos + "," + action.target.ypos + "]");
        let toMove = action.sender.getInhabitant();
        let pathfinding = new __WEBPACK_IMPORTED_MODULE_2__Pathfinding__["a" /* default */](action.sender, global.tiledMap);
        let allMoves = pathfinding.possibleMoves();
        let path = [];
        let currentTile = action.target;
        while (allMoves.get(currentTile) !== null) {
            path.push(currentTile);
            console.log("current tile - [" + currentTile.xpos + "]" + "[" + currentTile.ypos + "]");
            currentTile = allMoves.get(currentTile);
        }
        console.log(path);
        this.gameManager.animtaionManager.movingTo(action.sender, path);
        action.sender.unoccupy();
        action.target.occupy(toMove);
        this.activeUnit.xpos = action.target.xpos;
        this.activeUnit.ypos = action.target.ypos;
        console.log("check on unoccupy: " + action.sender.isOccupied());
        console.log("check on occupy: " + action.target.isOccupied());
    }

    makeHill(action) {
        let healedAllies = [];
        //AOE HILL
        if (action.ability.typeOfArea === "circle") {
            console.log("THIS IS AOE HILL");
            for (let i = action.target.xpos - action.ability.area; i <= action.target.xpos + action.ability.area; i++) {
                for (let j = action.target.ypos - action.ability.area; j <= action.target.ypos + action.ability.area; j++) {
                    if (i >= 0 && j >= 0 && i < this.WIDTH && j < this.HEIGHT) {
                        console.log("WTF is " + i + " " + j);
                        if (global.tiledMap[i][j].isOccupied() && global.tiledMap[i][j].getInhabitant().type === action.sender.getInhabitant().type) {
                            console.log("this is AOE hill on someone: " + i + " " + j);
                            healedAllies.push(global.tiledMap[i][j].getInhabitant());
                            action.sender.getInhabitant().useHealSkill(global.tiledMap[i][j].getInhabitant(), action.ability);
                            console.log("health end: " + global.tiledMap[i][j].getInhabitant().healthpoint);
                        }
                    }
                }
            }
        } else {
            action.sender.getInhabitant().useHealSkill(action.target.getInhabitant(), action.ability);
            healedAllies.push(action.target.getInhabitant());
            console.log("health end: " + action.target.getInhabitant().healthpoint);
        }
        this.gameManager.unitManager.unitAttack(action.ability.name, action.sender, action.target, healedAllies);
    }

    makeDamage(action) {
        let woundedEnemies = [];
        let deadEnemies = [];
        console.log(action.sender.getInhabitant().name + " make damage");
        console.log("this is damage: " + action.ability.name);
        // console.log("health begin: " + action.target.getInhabitant().healthpoint);

        //AOE DAMAGE
        if (action.ability.typeOfArea === "circle") {
            console.log("THIS IS AOE DAMAGE");
            console.log("target on " + action.target.xpos + " " + action.target.ypos);
            for (let i = action.target.xpos - action.ability.area; i <= action.target.xpos + action.ability.area; i++) {
                for (let j = action.target.ypos - action.ability.area; j <= action.target.ypos + action.ability.area; j++) {
                    console.log("i: " + i + " j: " + j);
                    if (i > 0 && j > 0 && i < this.WIDTH && j < this.HEIGHT) {
                        if (global.tiledMap[i][j].isOccupied()) {
                            console.log(global.tiledMap[i][j].getInhabitant().name + " IS WOUNDED");
                            action.sender.getInhabitant().useDamageSkill(global.tiledMap[i][j].getInhabitant(), action.ability);
                            if (global.tiledMap[i][j].getInhabitant().deadMark === false) {
                                if (global.tiledMap[i][j].getInhabitant().isDead()) {
                                    deadEnemies.push(global.tiledMap[i][j].getInhabitant());
                                    global.tiledMap[i][j].getInhabitant().deadMark = true;
                                } else {
                                    woundedEnemies.push(global.tiledMap[i][j].getInhabitant());
                                }
                                //console.log("health end: " + action.target.getInhabitant().healthpoint);
                            }
                        }
                    }
                }
            }
        } else {
            action.sender.getInhabitant().useDamageSkill(action.target.getInhabitant(), action.ability);
            if (action.target.getInhabitant().isDead()) {
                deadEnemies.push(action.target.getInhabitant());
            } else {
                woundedEnemies.push(action.target.getInhabitant());
            }
            console.log("health end: " + action.target.getInhabitant().healthpoint);
        }

        if (deadEnemies.length > 0) {
            // console.log(action.target.getInhabitant().name + " IS DEAD");

            this.gameManager.unitManager.unitAttackAndKill(action.ability.name, action.sender, action.target, deadEnemies, woundedEnemies);
            for (let i = 0; i < deadEnemies.length; i++) {
                this.initiativeLine.RemoveUnit(deadEnemies[i]);
            } //graph.deleteFromLowBar(action.target.getInhabitant().barIndex);
        } else {
            console.log("SOMEONE GET WOUNDED: ", woundedEnemies);
            this.gameManager.unitManager.unitAttack(action.ability.name, action.sender, action.target, woundedEnemies);
        }
    }

    loseGame() {
        this.stopGameLoop();
        //createoverlaylose
    }

    winGame() {
        setTimeout(function () {
            document.getElementsByClassName('container')[0].setAttribute('class', 'blur container');
            document.getElementById('menu').removeAttribute('hidden');
            document.getElementById('menu').innerHTML = 'Вы победили!';
        }, 1000);
        this.stopGameLoop();
        //createoverlaywin
    }

    generatePlayers() {
        let newPlayers = [];
        let Roderick = new __WEBPACK_IMPORTED_MODULE_1__Unit1__["a" /* default */]();
        Roderick.makeWarrior("Roderick");
        let Gendalf = new __WEBPACK_IMPORTED_MODULE_1__Unit1__["a" /* default */]();
        Gendalf.makeMage("Gendalf");
        let Garreth = new __WEBPACK_IMPORTED_MODULE_1__Unit1__["a" /* default */]();
        Garreth.makeThief("Garreth");
        let Ethelstan = new __WEBPACK_IMPORTED_MODULE_1__Unit1__["a" /* default */]();
        Ethelstan.makePriest("Ethelstan");

        newPlayers.push(Roderick);
        newPlayers.push(Gendalf);
        newPlayers.push(Garreth);
        newPlayers.push(Ethelstan);

        return newPlayers;
    }

    generateEnemies() {
        let newEnemies = [];
        for (let i = 0; i < this.ENEMIESSIZE; i++) {
            console.log(i);
            let Skeleton = new __WEBPACK_IMPORTED_MODULE_1__Unit1__["a" /* default */]();
            let texture;
            if (i % 2 === 0) {
                texture = "skeleton1";
            } else {
                texture = "skeleton2";
            }
            Skeleton.makeSkeleton(texture);
            newEnemies.push(Skeleton);
        }
        return newEnemies;
    }

    setPlayersPositions(players) {
        for (let i = 0; i < this.PARTYSIZE; i++) {
            let randRow;
            let randCol;
            while (true) {
                randRow = Math.floor(Math.random() * this.HEIGHT);
                randCol = Math.floor(Math.random() * 3); //первые три столбца поля
                if (global.tiledMap[randCol][randRow].isWall === this.NOTWALL && !global.tiledMap[randCol][randRow].isOccupied()) {
                    break;
                }
            }
            players[i].xpos = randCol;
            players[i].ypos = randRow;
            global.tiledMap[randCol][randRow].occupy(players[i]);
        }
    }

    setEnemiesPositions(enemies) {
        for (let i = 0; i < this.ENEMIESSIZE; i++) {
            let randRow;
            let randCol;
            while (true) {
                randRow = Math.floor(Math.random() * this.HEIGHT);
                randCol = Math.floor(Math.random() * 3) + this.WIDTH - 3; //последние три столбца поля
                if (global.tiledMap[randCol][randRow].isWall === this.NOTWALL && !global.tiledMap[randCol][randRow].isOccupied()) {
                    break;
                }
            }
            enemies[i].xpos = randCol;
            enemies[i].ypos = randRow;
            global.tiledMap[randCol][randRow].occupy(enemies[i]);
        }
    }

    isPartyDead() {
        for (let i = 0; i < this.PARTYSIZE; i++) {
            if (!this.players[i].isDead()) {
                return false;
            }
        }
        return true;
    }

    isEnemiesDead() {
        for (let i = 0; i < this.ENEMIESSIZE; i++) {
            if (!this.enemies[i].isDead()) {
                return false;
            }
        }
        return true;
    }

    startGameLoop() {
        this.intervalId = setInterval(() => this.gameLoop(), this.interval);
    }

    stopGameLoop() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
    }

    skipAction() {
        this.timer = 30000;
        this.beginTurn();
    }

    sendPossibleMoves() {
        let pathfinding = new __WEBPACK_IMPORTED_MODULE_2__Pathfinding__["a" /* default */](global.tiledMap[this.activeUnit.xpos][this.activeUnit.ypos], global.tiledMap);
        let allMoves = pathfinding.possibleMoves();
        let path = [];
        for (let key of allMoves.keys()) {
            path.push(key);
        }
        path.shift();
        this.gameManager.unitManager.showPossibleMoves(path);
    }

    beginTurn() {
        this.activeUnit = this.initiativeLine.NextUnit();
        console.log("This turn: ");
        console.log(this.initiativeLine.ShowEveryoneInLine());
        console.log(this.activeUnit.name + " = now your move! Cause initiative:" + this.activeUnit.initiative);
        this.activeUnit.actionPoint = 2;
        this.gameManager.unitManager.activeUnit(this.activeUnit);
        this.sendPossibleMoves();
        //изменяем LowerBar
        //изменяем activeEntity
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = DemoGameModule;

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(3)))

/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class InitiativeLine {
	constructor() {
		this.queue = [];
	}

	ShowEveryoneInLine() {
		let resultString = "";
		for (let i = 0; i < this.queue.length; i++) {
			resultString += i;
			resultString += ": ";
			resultString += this.queue[i].name;
			resultString += "[";
			resultString += this.queue[i].xpos;
			resultString += ",";
			resultString += this.queue[i].ypos;
			resultString += "]";
			resultString += "  ";
		}
		return resultString;
	}

	NextUnit() {
		let unit = this.queue.shift();
		this.queue.push(unit);
		this.SynchronizeLineId();
		return this.CurrentUnit();
	}

	SynchronizeLineId() {
		for (let i = 0; i < this.queue.length; i++) {
			this.queue[i].lineId = i;
		}
	}

	CurrentUnit() {
		return this.queue[0];
	}

	RemoveUnit(unit) {
		this.queue.splice(unit.lineId, 1);
	}

	PushEveryone(allies, enemies) {

		for (let i = 0; i < allies.length; i++) {
			this.queue.push(allies[i]);
		}

		for (let i = 0; i < enemies.length; i++) {
			this.queue.push(enemies[i]);
		}
		this.queue.sort(InitiativeLine.compareUnitsByInitiative);
		this.SynchronizeLineId();
	}

	static compareUnitsByInitiative(unit1, unit2) {
		if (unit1.initiative < unit2.initiative) {
			return 1;
		}
		if (unit1.initiative > unit2.initiative) {
			return -1;
		}
	}

}
/* harmony export (immutable) */ __webpack_exports__["a"] = InitiativeLine;


/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Skill1__ = __webpack_require__(10);

class Unit {
  constructor() {
    this.name = "noname";
    this.class = "noname";
    this.xpos = 0;
    this.ypos = 0;
    this.healthpoint = [0, 0];
    this.armor = 0;
    this.damage = [0, 0];
    this.initiative = 0;
    this.criticalRate = 0.05;
    this.dodgeRate = 0.05;
    this.blockRate = 0.05;
    this.speed = 4;
    this.skills = [];
    this.type = "enemy"; //enemy player
    this.actionPoint = 2;
    this.lineId = 0;
    this.shooter = false;
    //this.skills[0].createSkill("Move", "Move to this position", "point", 1, [0,0], 0);
    this.deadMark = false;
  }

  makeWarrior(name) {
    this.name = name;
    this.class = "warrior";
    this.healthpoint = [150, 150];
    this.armor = 20;
    this.damage = [35, 40];
    this.initiative = 10;
    let attackSkill = new __WEBPACK_IMPORTED_MODULE_0__Skill1__["a" /* default */]();
    attackSkill.createSkill("Attack", "Deals damage in close combat", "point", 1, this.damage, 0);
    let firstSkill = new __WEBPACK_IMPORTED_MODULE_0__Skill1__["a" /* default */]();
    firstSkill.createSkill("Shield Strike", "Smash enemy with a shield, knocking him down for 1 turn", "point", 1, this.damage, 2);
    let secondSkill = new __WEBPACK_IMPORTED_MODULE_0__Skill1__["a" /* default */]();
    secondSkill.createSkill("Heavy blow", "Attack your enemy with double damage", "point", 1, [this.damage[0] * 2, this.damage[1] * 2], 3);
    this.skills.push(attackSkill, firstSkill, secondSkill);
    this.type = "player";
  }

  makeMage(name) {
    this.name = name;
    this.class = "mage";
    this.healthpoint = [100, 100];
    this.armor = 10;
    this.damage = [30, 40];
    this.initiative = 11;
    let attackSkill = new __WEBPACK_IMPORTED_MODULE_0__Skill1__["a" /* default */]();
    attackSkill.createSkill("Attack", "Deals damage on distance", "point", 1, this.damage, 0);
    let firstSkill = new __WEBPACK_IMPORTED_MODULE_0__Skill1__["a" /* default */]();
    firstSkill.createSkill("Thunderbolt", "An electrical jolt deals air damage to target character, knocking him down for 1 turn", "point", 1, this.damage, 2);
    let secondSkill = new __WEBPACK_IMPORTED_MODULE_0__Skill1__["a" /* default */]();
    secondSkill.createSkill("Fire ball", "Hurl a fiery sphere that will explode", "circle", 2, this.damage, 2);
    this.skills.push(attackSkill, firstSkill, secondSkill);
    this.type = "player";
    this.shooter = true;
  }

  makeThief(name) {
    this.name = name;
    this.class = "thief";
    this.healthpoint = [125, 125];
    this.armor = 15;
    this.damage = [40, 60];
    this.initiative = 12;
    let attackSkill = new __WEBPACK_IMPORTED_MODULE_0__Skill1__["a" /* default */]();
    attackSkill.createSkill("Attack", "Deals damage in close combat", "point", 1, this.damage, 0);
    let firstSkill = new __WEBPACK_IMPORTED_MODULE_0__Skill1__["a" /* default */]();
    firstSkill.createSkill("Sawtooth knife", "Attack enemy with guaranteed critical hit", "point", 1, [this.damage[0] * 2, this.damage[1] * 2], 3);
    let secondSkill = new __WEBPACK_IMPORTED_MODULE_0__Skill1__["a" /* default */]();
    secondSkill.createSkill("Blade flurry", "Attack enemies around and deals 100% damage", "circle", 1, this.damage, 2);
    this.skills.push(attackSkill, firstSkill, secondSkill);
    this.type = "player";
  }

  makePriest(name) {
    this.name = name;
    this.class = "priest";
    this.healthpoint = [100, 100];
    this.armor = 10;
    this.damage = [-20, -30];
    this.initiative = 11;
    let attackSkill = new __WEBPACK_IMPORTED_MODULE_0__Skill1__["a" /* default */]();
    attackSkill.createSkill("Heal", "Heal with healing power on distance", "point", 1, this.damage, 0);
    let firstSkill = new __WEBPACK_IMPORTED_MODULE_0__Skill1__["a" /* default */]();
    firstSkill.createSkill("Massive Heal", "Heal all your units in area with 100% healing power", "circle", 1, this.damage, 3);
    let secondSkill = new __WEBPACK_IMPORTED_MODULE_0__Skill1__["a" /* default */]();
    secondSkill.createSkill("Holly wrath", "Deal 200% healing power to cursed creatures", "point", 1, [this.damage[0] * -2, this.damage[1] * -2], 2);
    this.skills.push(attackSkill, firstSkill, secondSkill);
    this.type = "player";
    this.shooter = true;
  }

  makeSkeleton(textureName) {
    this.name = "Skeleton";
    this.class = textureName;
    this.healthpoint = [150, 150];
    this.armor = 5;
    this.damage = [35, 40];
    this.initiative = 10;

    let attackSkill = new __WEBPACK_IMPORTED_MODULE_0__Skill1__["a" /* default */]();
    attackSkill.createSkill("Attack", "Deals damage", "point", 1, this.damage, 0);
    this.skills.push(attackSkill);
  }

  isDead() {
    if (this.healthpoint[0] <= 0) {
      return true;
    }
  }

  useDamageSkill(unit, skill) {

    let currentSkillDamage = Math.floor(Math.random() * (skill.damage[1] - skill.damage[0])) + skill.damage[0];

    if (Math.random() < this.criticalRate) {
      currentSkillDamage *= 2;
    }

    if (Math.random() < unit.dodgeRate) {
      currentSkillDamage = 0;
    } else if (Math.random() < unit.blockRate) {
      currentSkillDamage *= 0.3;
    }
    console.log("Current Damage: " + Math.floor(currentSkillDamage * ((100 - unit.armor) / 100)));

    unit.healthpoint[0] -= Math.floor(currentSkillDamage * ((100 - unit.armor) / 100));
  }

  useHealSkill(unit, skill) {
    unit.healthpoint[0] += Math.floor(Math.abs(Math.random() * (skill.damage[1] - skill.damage[0])) + Math.abs(skill.damage[0]));
    if (unit.healthpoint[0] > unit.healthpoint[1]) {
      unit.healthpoint[0] = unit.healthpoint[1];
    }
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Unit;


/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Pathfinding {
    constructor(start, tiledMap) {
        this.distance = new Map();
        this.WIDTH = 16;
        this.HEIGHT = 12;
        this.PARTYSIZE = 4;
        this.ENEMIESSIZE = 2;
        this.kek = 3;
        this.NOTWALL = 0;
        this.WALL = 1;
        this.tiledMap = tiledMap;
        this.path = new Map();
        this.sender = start.getInhabitant();
        this.frontier = [];
        this.frontier.push(start);
        this.path.set(start, null);
        this.distance.set(start, 0);
    }

    possibleMoves() {
        while (this.frontier.length > 0) {
            let current = this.frontier.shift();
            if (this.distance.get(current) === this.sender.speed) {
                break;
            }
            let currentNeighbors = this.tileNeighbors(current);
            for (let i = 0; i < currentNeighbors.length; i++) {
                if (!this.distance.has(currentNeighbors[i])) {
                    this.frontier.push(currentNeighbors[i]);
                    this.path.set(currentNeighbors[i], current);
                    this.distance.set(currentNeighbors[i], 1 + this.distance.get(current));
                }
            }
        }
        return this.path;
    }

    tileNeighbors(current) {
        let neighbors = [];
        if (current.xpos + 1 < this.WIDTH && this.tiledMap[current.xpos + 1][current.ypos].isWall === this.NOTWALL && !this.tiledMap[current.xpos + 1][current.ypos].isOccupied()) {
            neighbors.push(this.tiledMap[current.xpos + 1][current.ypos]);
        }

        if (current.ypos + 1 < this.HEIGHT && this.tiledMap[current.xpos][current.ypos + 1].isWall === this.NOTWALL && !this.tiledMap[current.xpos][current.ypos + 1].isOccupied()) {
            neighbors.push(this.tiledMap[current.xpos][current.ypos + 1]);
        }

        if (current.xpos - 1 >= 0 && this.tiledMap[current.xpos - 1][current.ypos].isWall === this.NOTWALL && !this.tiledMap[current.xpos - 1][current.ypos].isOccupied()) {
            neighbors.push(this.tiledMap[current.xpos - 1][current.ypos]);
        }

        if (current.ypos - 1 >= 0 && this.tiledMap[current.xpos][current.ypos - 1].isWall === this.NOTWALL && !this.tiledMap[current.xpos][current.ypos - 1].isOccupied()) {
            neighbors.push(this.tiledMap[current.xpos][current.ypos - 1]);
        }

        return neighbors;
    }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = Pathfinding;


/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__GraphicEngine__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Utils__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Loader__ = __webpack_require__(12);



//import rere from '/views/singleplay/textures/wall.jpg';

class Background {
  constructor() {
    this.ratio = 16 / 9;
    this.engine = new __WEBPACK_IMPORTED_MODULE_0__GraphicEngine__["a" /* default */]('background', false);
  }

  InitMapAndSprites() {
    this.engine.addSprite([0, 0], this.textures[2], __WEBPACK_IMPORTED_MODULE_1__Utils__["a" /* default */].madeRectangle(-1, 1, 1, -1));
    let coord = __WEBPACK_IMPORTED_MODULE_1__Utils__["a" /* default */].madeRectangle(0, 0, 1.2 / 16, -(1.2 / 16) * this.ratio);
    global.tiledMap.forEach(function (item, j) {
      item.forEach(function (value, i) {
        if (value.isWall) {
          this.engine.addSprite(__WEBPACK_IMPORTED_MODULE_1__Utils__["a" /* default */].translationOnMap(i, j), this.textures[0], coord);
        } else {
          this.engine.addSprite(__WEBPACK_IMPORTED_MODULE_1__Utils__["a" /* default */].translationOnMap(i, j), this.textures[1], coord);
        };
      }.bind(this));
    }.bind(this));
    this.engine.addSprite([-0.9, 0.85], this.textures[3], __WEBPACK_IMPORTED_MODULE_1__Utils__["a" /* default */].madeRectangle(0, 0, 0.2, -0.6)); // часы
    this.engine.addSprite([-0.6, 0.85], this.textures[4], __WEBPACK_IMPORTED_MODULE_1__Utils__["a" /* default */].madeRectangle(0, 0, 1.2, -(1.2 / 16) * 12 * this.ratio), true, __WEBPACK_IMPORTED_MODULE_1__Utils__["a" /* default */].madeRectangle(0.008, 0.01, 0.990, 0.992)); // сетка
    this.engine.addSprite([-0.55, -0.79], this.textures[5], __WEBPACK_IMPORTED_MODULE_1__Utils__["a" /* default */].madeRectangle(0, 0, 1.1, -0.1 * this.ratio)); // lowbar
    this.engine.addSprite([-0.63, -0.80], this.textures[6], __WEBPACK_IMPORTED_MODULE_1__Utils__["a" /* default */].madeRectangle(0, 0, 0.1, -0.17), true); // стрелочка
  }

  render() {
    let loader = new __WEBPACK_IMPORTED_MODULE_2__Loader__["a" /* default */](['/views/singleplay/textures/wall.jpg', '/views/singleplay/textures/grass.jpg', '/views/singleplay/textures/background.png', '/views/singleplay/textures/hourglass.png', '/views/singleplay/textures/grid.png', '/views/singleplay/textures/initiativeLine.png', '/views/singleplay/textures/arrow.png'], this.engine.gl);
    loader.load(this.onLoad.bind(this));
  }
  onLoad(textures) {
    console.log('LOAD');
    this.textures = textures;
    this.InitMapAndSprites();
    this.engine.render();
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Background;

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(3)))

/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return vertexShader; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return fragmentShader; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return vertexShader1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return fragmentShader1; });
let vertexShader = `attribute vec2 a_position;
attribute vec2 a_texcoord;
uniform vec2 u_translation;
varying vec2 v_texcoord;
void main() {
  gl_Position = vec4(a_position + u_translation, 0, 1);
  v_texcoord = a_texcoord;
}`;
let fragmentShader = `precision mediump float;
uniform sampler2D u_texture;
varying vec2 v_texcoord;
void main() {
  gl_FragColor = texture2D(u_texture, v_texcoord);
}`;
let vertexShader1 = `attribute vec2 a_position;
uniform vec2 u_translation;
uniform vec4 u_color;
varying vec4 v_color;
void main() {
  gl_Position = vec4(a_position + u_translation, 0, 1);
  v_color = u_color;
}`;
let fragmentShader1 = `precision mediump float;
varying vec4 v_color;
void main() { 
  gl_FragColor = v_color;
}`;



/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Program {
  constructor(gl, vertexShader, fragmentShader) {
    this.gl = gl;
    this.vertexShader = vertexShader;
    this.fragmentShader = fragmentShader;
  }

  createShader(type, source) {
    let shader = this.gl.createShader(type); // создание шейдера
    this.gl.shaderSource(shader, source); // устанавливаем шейдеру его программный код
    this.gl.compileShader(shader); // компилируем шейдер
    let success = this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS);
    if (success) {
      // если компиляция прошла успешно - возвращаем шейдер
      return shader;
    }
    console.log(this.gl.getShaderInfoLog(shader));
    this.gl.deleteShader(shader);
  }

  create() {
    let program = this.gl.createProgram();
    this.gl.attachShader(program, this.createShader(this.gl.VERTEX_SHADER, this.vertexShader));
    this.gl.attachShader(program, this.createShader(this.gl.FRAGMENT_SHADER, this.fragmentShader));
    this.gl.linkProgram(program);
    let success = this.gl.getProgramParameter(program, this.gl.LINK_STATUS);
    if (success) {
      return program;
    }
    console.log(this.gl.getProgramInfoLog(program));
    this.gl.deleteProgram(program);
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Program;


/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Sprite; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Attribute; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return Uniform; });
class Sprite {
  constructor(gl, program, attributes, uniforms, blend, texture) {
    this.gl = gl;
    this.program = program;
    this.attributes = attributes;
    this.uniforms = uniforms;
    this.texture = texture;
    this.blend = blend;
    this.setAttributes();
    this.setUniforms();
    this.needRender = true;
  }

  getLocUnif(uniform) {
    return this.gl.getUniformLocation(this.program, uniform.name);
  }

  setUniforms() {
    this.uniforms.forEach(function (item) {
      item.location = this.getLocUnif(item);
    }.bind(this));
  }

  getLocAttr(attr) {
    return this.gl.getAttribLocation(this.program, attr.name);
  }

  setAttributes(valueAttributes) {
    this.attributes.forEach(function (item) {
      item.location = this.getLocAttr(item);
      item.buffer = this.gl.createBuffer();
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, item.buffer);
      this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(item.data), this.gl.STATIC_DRAW);
    }.bind(this));
  }

  setVertexs(vertexs) {
    this.attributes[0].data = vertexs;
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.attributes[0].buffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.attributes[0].data), this.gl.STATIC_DRAW);
    this.needRender = true;
  }

  setTexCoord(coord) {
    this.attributes[1].data = coord;
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.attributes[1].buffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.attributes[1].data), this.gl.STATIC_DRAW);
    this.needRender = true;
  }

  setTrans(translation) {
    this.uniforms[0].value = translation;
    this.needRender = true;
  }

  getTrans() {
    return this.uniforms[0].value;
  }

  setTexture(texture) {
    this.texture = texture;
    this.needRender = true;
  }

  render() {
    this.attributes.forEach(function (item) {
      this.gl.enableVertexAttribArray(item.location);
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, item.buffer);
      this.gl.vertexAttribPointer(item.location, 2, this.gl.FLOAT, false, 0, 0);
    }.bind(this));

    this.uniforms.forEach(function (item) {
      if (item.value.length == 2) {
        this.gl.uniform2fv(item.location, item.value);
      } else if (item.value.length == 4) {
        this.gl.uniform4fv(item.location, item.value);
      }
    }.bind(this));

    if (this.texture) {
      this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
    }

    if (this.blend) {
      this.gl.enable(this.gl.BLEND);
      this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
    } else {
      this.gl.disable(this.gl.BLEND);
    }

    this.gl.drawArrays(this.gl.TRIANGLES, 0, this.attributes[0].data.length / 2);
    this.needRender = false;
  }
}

class Attribute {
  constructor(name, data) {
    this.name = name;
    this.data = data;
  }
}

class Uniform {
  constructor(name, value) {
    this.name = name;
    this.value = value;
  }
}



/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__DungeonMapMaker__ = __webpack_require__(35);


global.actionDeque = [];
global.tiledMap = new __WEBPACK_IMPORTED_MODULE_0__DungeonMapMaker__["a" /* default */]().dungeonMapMaker(Math.random() * 10 + 25);
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(3)))

/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export WIDTH */
/* unused harmony export HEIGHT */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Tile__ = __webpack_require__(36);



let WIDTH = 16;
let HEIGHT = 12;
//console.log(WIDTH);
class DungeonMapMaker {
    constructor() {
        this.UP = 0;
        this.LEFT = 1;
        this.DOWN = 2;
        this.RIGHT = 3;
        this.counter = WIDTH * HEIGHT;
    }

    isDirectionValid(curX, curY, direction) {

        switch (direction) {
            case this.UP:
                return curY - 1 >= 0;
            case this.DOWN:
                return curY + 1 < HEIGHT;
            case this.LEFT:
                return curX - 1 >= 0;
            case this.RIGHT:
                return curX + 1 < WIDTH;
            default:
                break;
        }
    }

    dungeonMapMaker(tileWalls) {
        let map = [];
        for (let i = 0; i < WIDTH; i++) {
            map[i] = [];
            for (let j = 0; j < HEIGHT; j++) {
                let newTile = new __WEBPACK_IMPORTED_MODULE_0__Tile__["a" /* default */]();
                newTile.xpos = i;
                newTile.ypos = j;
                newTile.isWall = 1;
                map[i][j] = newTile;
            }
        }

        let randY = Math.floor(Math.random() * HEIGHT);
        let randX = Math.floor(Math.random() * WIDTH);
        let pointer = [randX, randY];
        console.log(HEIGHT + ' ' + WIDTH);
        console.log(randY + ' ' + randX);
        map[randX][randY].isWall = 0;
        this.counter--;
        let direction;
        while (this.counter > tileWalls) {
            do {
                direction = Math.floor(Math.random() * 4);
            } while (!this.isDirectionValid(pointer[0], pointer[1], direction));

            switch (direction) {
                case this.UP:
                    pointer[1] = pointer[1] - 1;
                    break;
                case this.DOWN:
                    pointer[1] = pointer[1] + 1;
                    break;
                case this.LEFT:
                    pointer[0] = pointer[0] - 1;
                    break;
                case this.RIGHT:
                    pointer[0] = pointer[0] + 1;
                    break;
            }

            if (map[pointer[0]][pointer[1]].isWall === 1) {
                map[pointer[0]][pointer[1]].isWall = 0;
                this.counter--;
            }
        }

        return map;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = DungeonMapMaker;



/***/ }),
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Tile {
	constructor() {
		this.xpos = null;
		this.ypos = null;
		this.unitOnTile = null;
		this.isWall = null;
	}

	getInhabitant() {
		return this.unitOnTile;
	}

	occupy(unit) {
		this.unitOnTile = unit;
	}

	unoccupy() {
		this.unitOnTile = null;
	}

	isOccupied() {
		return this.unitOnTile !== null;
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Tile;


/***/ }),
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__GraphicEngine__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__SpriteManager__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__State__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Loader__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Utils__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__AnimationManager__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__UnitManager__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Animation__ = __webpack_require__(45);









//import {global.tiledMap,test} from './GameModule'
//import   './GameModule'

class GameManager {
  constructor() {
    this.ratio = 16 / 9;
    this.engine = new __WEBPACK_IMPORTED_MODULE_0__GraphicEngine__["a" /* default */]('canvas', true);
    this.spriteManager = new __WEBPACK_IMPORTED_MODULE_1__SpriteManager__["a" /* default */](this.engine);
    this.state = new __WEBPACK_IMPORTED_MODULE_2__State__["a" /* default */]();
    this.fullScreen = false;
  }

  startGameRendering(callback) {
    console.log("work rendering uints");
    let loaderTextures = new __WEBPACK_IMPORTED_MODULE_3__Loader__["a" /* default */](['/views/singleplay/textures/activeGrass.jpg', '/views/singleplay/textures/activeTile.png', '/views/singleplay/textures/select.png', '/views/singleplay/icons/fullscreen.png'], this.engine.gl);
    let loaderAnimations = new __WEBPACK_IMPORTED_MODULE_3__Loader__["a" /* default */](['/views/singleplay/animations/fireball.png', '/views/singleplay/animations/explosion.png', '/views/singleplay/animations/thunderbolt1.png'], this.engine.gl);
    let loaderConditions = new __WEBPACK_IMPORTED_MODULE_3__Loader__["a" /* default */](['/views/singleplay/conditions/WarriorAngry.png', '/views/singleplay/conditions/WarriorAttack.png', '/views/singleplay/conditions/WarriorDead.png', '/views/singleplay/conditions/MageAngry.png', '/views/singleplay/conditions/MageAttack.png', '/views/singleplay/conditions/MageDead.png', '/views/singleplay/conditions/ThiefAngry.png', '/views/singleplay/conditions/ThiefAttack.png', '/views/singleplay/conditions/ThiefDead.png', '/views/singleplay/conditions/PriestAngry.png', '/views/singleplay/conditions/PriestAttack.png', '/views/singleplay/conditions/PriestDead.png', '/views/singleplay/conditions/Skeleton1Angry.png', '/views/singleplay/conditions/Skeleton1Attack.png', '/views/singleplay/conditions/Skeleton1Dead.png', '/views/singleplay/conditions/Skeleton2Angry.png', '/views/singleplay/conditions/Skeleton2Attack.png', '/views/singleplay/conditions/Skeleton2Dead.png'], this.engine.gl);
    let loaderEntities = new __WEBPACK_IMPORTED_MODULE_3__Loader__["a" /* default */](['/views/singleplay/entity/warrior_portrait.png', '/views/singleplay/entity/mage_portrait.png', '/views/singleplay/entity/thief_portrait.png', '/views/singleplay/entity/priest_portrait.png', '/views/singleplay/entity/skeleton1_portrait.png', '/views/singleplay/entity/skeleton2_portrait.png', '/views/singleplay/entity/warrior.png', '/views/singleplay/entity/mage.png', '/views/singleplay/entity/thief.png', '/views/singleplay/entity/priest.png', '/views/singleplay/entity/skeleton1.png', '/views/singleplay/entity/skeleton2.png'], this.engine.gl);
    loaderTextures.load(textures => {
      loaderAnimations.load(animations => {
        loaderConditions.load(conditions => {
          loaderEntities.load(entities => {
            this.textures = textures;
            this.initGui();
            this.initEvents();
            let animation = new __WEBPACK_IMPORTED_MODULE_7__Animation__["a" /* default */](this);
            this.animtaionManager = new __WEBPACK_IMPORTED_MODULE_5__AnimationManager__["a" /* default */](animation, this.spriteManager, this.activeTile, this.state, animations);
            this.unitManager = new __WEBPACK_IMPORTED_MODULE_6__UnitManager__["a" /* default */](animation, this.animtaionManager, this.spriteManager, this.activeTile, this.state, entities, textures, conditions);
            this.engine.render();
          }, callback);
        });
      });
    });
  }

  initEvents() {
    document.addEventListener('mousemove', function (event) {
      let x = event.clientX / this.engine.gl.canvas.clientWidth;
      let y = event.clientY / this.engine.gl.canvas.clientHeight;
      if (x >= 0.2 && x <= 0.8 && y >= 0.065 && y <= 0.865 && document.getElementById('menu').hidden && !this.state.AnimationOnMap) {
        let i = Math.floor((x - 0.2) / 0.6 / (1 / 16));
        let j = Math.floor((y - 0.065) / 0.8 / (1 / 12));
        if (global.tiledMap[i][j].active) {
          this.spriteManager.getSprite(this.activeElem).setTrans(__WEBPACK_IMPORTED_MODULE_4__Utils__["a" /* default */].translationOnMap(j, i));
        } else {
          this.spriteManager.getSprite(this.activeElem).setTrans([-2, -2]);
        }
      };
    }.bind(this));
    document.addEventListener('click', event => {
      let x = event.clientX / this.engine.gl.canvas.clientWidth;
      let y = event.clientY / this.engine.gl.canvas.clientHeight;
      if (x >= 0.95 && y >= 0.95) {
        console.log(event.clientX + " " + event.clientY);
        if (!this.fullScreen) {
          document.documentElement.mozRequestFullScreen();
          this.fullScreen = true;
        } else {
          document.mozCancelFullScreen();
          this.fullScreen = false;
        }
      }
    });
  }

  initGui() {
    this.activeTile = this.spriteManager.addSprite(-0.9, [-2, 3], this.textures[1], __WEBPACK_IMPORTED_MODULE_4__Utils__["a" /* default */].madeRectangle(0, 0, 1.2 / 16, -(1.2 / 16) * this.ratio));
    this.activeElem = this.spriteManager.addSprite(-1, [-2, 3], this.textures[2], __WEBPACK_IMPORTED_MODULE_4__Utils__["a" /* default */].madeRectangle(0, 0, 1.2 / 16, -(1.2 / 16) * this.ratio));
    this.spriteManager.addSprite(1, [0.95, -1 + 0.05 * this.ratio], this.textures[3], __WEBPACK_IMPORTED_MODULE_4__Utils__["a" /* default */].madeRectangle(0, 0, 0.05, -0.05 * this.ratio), true);
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = GameManager;

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(3)))

/***/ }),
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class SpriteManager {
  constructor(engine) {
    this.indexes = [];
    this.count = 0;
    this.engine = engine;
  }

  setIndexAndOrder(spriteIndex, order) {
    this.engine.sprites[spriteIndex].index = this.count;
    this.engine.sprites[spriteIndex].order = order;
    this.indexes[this.count] = spriteIndex;
    return this.count++;
  }

  addSprite(order, translation, texture, vertexs, blend, texCoord) {
    let spriteIndex = this.engine.addSprite(translation, texture, vertexs, blend, texCoord);
    return this.setIndexAndOrder(spriteIndex, order);
  }

  addColorSprite(order, translation, vertexs, color, blend) {
    let spriteIndex = this.engine.addColorSprite(translation, vertexs, color, blend);
    return this.setIndexAndOrder(spriteIndex, order);
  }

  getSprite(index) {
    return this.engine.sprites[this.indexes[index]];
  }

  deleteSprite(index) {
    delete this.engine.sprites[this.indexes[index]];
  }

  sortSprites() {
    this.engine.sprites.sort((a, b) => {
      if (a.order > b.order) return 1;
      return -1;
    });
    for (let i = 0; i < this.engine.sprites.length; i++) {
      if (this.engine.sprites[i] != undefined) {
        this.indexes[this.engine.sprites[i].index] = i;
      }
    }
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = SpriteManager;


/***/ }),
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class State {
  constructor() {
    this.AnimationOnMap = false;
    this.AnimationOnLowbar = false;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = State;


/***/ }),
/* 40 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Utils__ = __webpack_require__(2);

class AnimationManager {
  constructor(Animation, spriteManager, activeTile, state, animations) {
    this.Animation = Animation;
    this.state = state;
    this.spriteManager = spriteManager;
    this.activeTile = activeTile;
    this.animations = animations;
  }

  stateCheck(callback) {
    if (this.state.AnimationOnMap) {
      setTimeout(function () {
        requestAnimationFrame(callback);
      }, 50);
      return true;
    }
    this.state.AnimationOnMap = true;
  }

  movingTo(TileStart, path) {
    if (this.stateCheck(this.movingTo.bind(this, TileStart, path))) {
      return;
    }
    let unit = TileStart.unitOnTile;
    for (let i = path.length - 1; i >= 0; i--) {
      if (i == path.length - 1) {
        this.Animation.MoveAnimation(__WEBPACK_IMPORTED_MODULE_0__Utils__["a" /* default */].translationForUnits(unit), __WEBPACK_IMPORTED_MODULE_0__Utils__["a" /* default */].translationForUnits(path[i]), 0.2, unit.entity.mapId);
        this.Animation.MoveAnimation(__WEBPACK_IMPORTED_MODULE_0__Utils__["a" /* default */].transForHealthbar(unit), __WEBPACK_IMPORTED_MODULE_0__Utils__["a" /* default */].transForHealthbar(path[i]), 0.2, unit.entity.healthbarId);
      } else {
        setTimeout(function () {
          this.Animation.MoveAnimation(__WEBPACK_IMPORTED_MODULE_0__Utils__["a" /* default */].translationForUnits(path[i + 1]), __WEBPACK_IMPORTED_MODULE_0__Utils__["a" /* default */].translationForUnits(path[i]), 0.2, unit.entity.mapId);
          this.Animation.MoveAnimation(__WEBPACK_IMPORTED_MODULE_0__Utils__["a" /* default */].transForHealthbar(path[i + 1]), __WEBPACK_IMPORTED_MODULE_0__Utils__["a" /* default */].transForHealthbar(path[i]), 0.2, unit.entity.healthbarId);
        }.bind(this), 200 * (path.length - 1 - i));
      }
    }
    let transActiveTile = this.spriteManager.getSprite(this.activeTile).getTrans();
    setTimeout(function () {
      if (transActiveTile == this.spriteManager.getSprite(this.activeTile).getTrans()) {
        this.spriteManager.getSprite(this.activeTile).setTrans(__WEBPACK_IMPORTED_MODULE_0__Utils__["a" /* default */].translationOnMap(unit.ypos, unit.xpos));
      }
      this.state.AnimationOnMap = false;
    }.bind(this), 200 * path.length);
  }

  thunderbolt(TileStart, TileDest) {
    let DestT = __WEBPACK_IMPORTED_MODULE_0__Utils__["a" /* default */].translationForUnits(TileDest.unitOnTile);
    let thunderboltId = this.spriteManager.addSprite(12, __WEBPACK_IMPORTED_MODULE_0__Utils__["a" /* default */].translationOnMap(TileDest.ypos, TileDest.xpos), this.animations[2], __WEBPACK_IMPORTED_MODULE_0__Utils__["a" /* default */].madeRectangle(0, 0, 1.2 / 16, 1.2 - DestT[1]), true, __WEBPACK_IMPORTED_MODULE_0__Utils__["a" /* default */].madeRectangle(0, 0, 1 / 9, -1 / 8));
    this.Animation.FrameAnimation(thunderboltId, 2, 64, 9, 8, true);
  }

  fireball(TileStart, TileDest) {
    let fireballId = this.spriteManager.addSprite(12, __WEBPACK_IMPORTED_MODULE_0__Utils__["a" /* default */].translationOnMap(TileStart.ypos, TileDest.xpos), this.animations[0], __WEBPACK_IMPORTED_MODULE_0__Utils__["a" /* default */].madeRectangle(0, 0, 0.06, -0.06 * 16 / 9), true, __WEBPACK_IMPORTED_MODULE_0__Utils__["a" /* default */].madeRectangle(0, 0, 1 / 6, -1 / 6));
    this.Animation.FrameAnimation(fireballId, 2, 32, 6, 6, true);
    this.Animation.MoveAnimation(__WEBPACK_IMPORTED_MODULE_0__Utils__["a" /* default */].translationForUnits(TileStart), __WEBPACK_IMPORTED_MODULE_0__Utils__["a" /* default */].translationOnMap(TileDest.ypos, TileDest.xpos), 2, fireballId);
    setTimeout(function () {
      for (let ii = TileDest.xpos - 2; ii < TileDest.xpos + 3; ii++) {
        for (let jj = TileDest.ypos - 2; jj < TileDest.ypos + 3; jj++) {
          if (ii >= 0 && ii < 16 && jj >= 0 && jj < 12) {
            this.Animation.FrameAnimation(this.spriteManager.addSprite(12, __WEBPACK_IMPORTED_MODULE_0__Utils__["a" /* default */].translationOnMap(jj, ii), this.animations[1], __WEBPACK_IMPORTED_MODULE_0__Utils__["a" /* default */].madeRectangle(0, 0, 1 / 16, -(1 / 16) * 16 / 9), true), 1.2, 44, 6, 8, true);
          }
        }
      }
    }.bind(this), 2000);
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = AnimationManager;


/***/ }),
/* 41 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Entity__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Utils__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Action__ = __webpack_require__(43);




class UnitManager {
  constructor(Animation, animationManager, spriteManager, activeTile, state, entities, textures, conditions) {
    this.Animation = Animation;
    this.units = [];
    this.ratio = 16 / 9;
    this.spriteManager = spriteManager;
    this.animationManager = animationManager;
    this.entities = entities;
    this.textures = textures;
    this.conditions = conditions;
    this.firstActiveUnit = true;
    this.activeTile = activeTile;
    this.possibleMoves = [];
    this.dropMenu = 0;
    this.state = state;
    this.indexUnit = {
      warrior: 0,
      mage: 1,
      thief: 2,
      priest: 3,
      skeleton1: 4,
      skeleton2: 5
    };
  }

  stateCheck(callback) {
    if (this.state.AnimationOnLowbar) {
      setTimeout(function () {
        requestAnimationFrame(callback);
      }, 50);
      return true;
    }
    this.state.AnimationOnLowbar = true;
  }

  timeAndRunSkill(nameSkill, sender, target, runAnimation) {
    switch (nameSkill) {
      case 'Fire ball':
        if (runAnimation) {
          this.animationManager.fireball(sender, target);
        }
        return 2000;
      case 'Thunderbolt':
        if (runAnimation) {
          this.animationManager.thunderbolt(sender, target);
        }
        return 2000;
    }
    return 500;
  }

  updateHealth(wounded) {
    wounded.forEach(function (item) {
      if (item.healthpoint[0] > 0) {
        this.spriteManager.getSprite(item.entity.healthbarId).setVertexs(__WEBPACK_IMPORTED_MODULE_1__Utils__["a" /* default */].madeRectangle(0, 0, 1.2 / 16 * (item.healthpoint[0] / item.healthpoint[1]) - 0.006, -0.015));
      } else {
        this.spriteManager.getSprite(item.entity.healthbarId).setVertexs(__WEBPACK_IMPORTED_MODULE_1__Utils__["a" /* default */].madeRectangle(0, 0, 0, 0));
      }
    }.bind(this));
  }

  addUnit(unit) {
    unit.entity = new __WEBPACK_IMPORTED_MODULE_0__Entity__["a" /* default */]();
    unit.entity.lowbarId = this.spriteManager.addSprite(0, __WEBPACK_IMPORTED_MODULE_1__Utils__["a" /* default */].transOnLowbar(this.units.length), this.entities[this.indexUnit[unit.class]], __WEBPACK_IMPORTED_MODULE_1__Utils__["a" /* default */].madeRectangle(0, 0, 0.09, -0.09 * this.ratio), true);
    unit.entity.mapId = this.spriteManager.addSprite(unit.ypos, __WEBPACK_IMPORTED_MODULE_1__Utils__["a" /* default */].translationForUnits(unit), this.entities[6 + this.indexUnit[unit.class]], __WEBPACK_IMPORTED_MODULE_1__Utils__["a" /* default */].madeRectangle(0, 0, 1.2 / 9 * 1.7, -(1.2 / 9) * 1.7 * this.ratio), true);
    unit.entity.healthbarId = this.spriteManager.addColorSprite(unit.ypos, __WEBPACK_IMPORTED_MODULE_1__Utils__["a" /* default */].transForHealthbar(unit), __WEBPACK_IMPORTED_MODULE_1__Utils__["a" /* default */].madeRectangle(0, 0, 1.2 / 16 - 0.006, -0.015), [250 / 255, 44 / 255, 31 / 255, 1.0]);
    this.units.push(unit);
  }

  changeActiveUnit() {
    if (this.stateCheck(this.changeActiveUnit.bind(this))) {
      return;
    }
    let x = this.units[0];
    this.units.splice(0, 1);
    this.units.push(x);
    let t = __WEBPACK_IMPORTED_MODULE_1__Utils__["a" /* default */].transOnLowbar(0);
    this.Animation.MoveAnimation(t, [t[0], t[1] + 0.17], 0.5, this.units[this.units.length - 1].entity.lowbarId);
    for (let i = 0; i < this.units.length - 1; i++) {
      this.Animation.MoveAnimation(__WEBPACK_IMPORTED_MODULE_1__Utils__["a" /* default */].transOnLowbar(i + 1), __WEBPACK_IMPORTED_MODULE_1__Utils__["a" /* default */].transOnLowbar(i), 0.8, this.units[i].entity.lowbarId);
    }
    setTimeout(function () {
      let t = __WEBPACK_IMPORTED_MODULE_1__Utils__["a" /* default */].transOnLowbar(0);
      this.Animation.MoveAnimation([t[0], t[1] + 0.17], [t[0] + (this.units.length - 1) * 0.1, t[1] + 0.17], 0.5, this.units[this.units.length - 1].entity.lowbarId);
    }.bind(this), 600);
    setTimeout(function () {
      let t = __WEBPACK_IMPORTED_MODULE_1__Utils__["a" /* default */].transOnLowbar(this.units.length - 1);
      this.Animation.MoveAnimation([t[0], t[1] + 0.17], t, 0.5, this.units[this.units.length - 1].entity.lowbarId);
    }.bind(this), 1120);
    setTimeout(function () {
      this.state.AnimationOnLowbar = false;
    }.bind(this), 1650);
  }

  removeUnitsInInitiativeLine(units) {
    if (this.stateCheck(this.removeUnitsInInitiativeLine.bind(this, units))) {
      return;
    }
    units.forEach(function (unit) {
      this.units.splice(this.units.indexOf(unit), 1);
      this.spriteManager.deleteSprite(unit.entity.lowbarId);
    }.bind(this));
    this.units.forEach(function (unit, i) {
      this.Animation.MoveAnimation(this.spriteManager.getSprite(unit.entity.lowbarId).getTrans(), __WEBPACK_IMPORTED_MODULE_1__Utils__["a" /* default */].transOnLowbar(i), 0.5, unit.entity.lowbarId);
    }.bind(this));
    setTimeout(function () {
      this.state.AnimationOnLowbar = false;
    }.bind(this), 510);
  }

  activeUnit(unit) {
    if (this.firstActiveUnit) {
      this.firstActiveUnit = false;
    } else {
      this.changeActiveUnit(unit);
    }
    this.spriteManager.getSprite(this.activeTile).setTrans(__WEBPACK_IMPORTED_MODULE_1__Utils__["a" /* default */].translationOnMap(unit.ypos, unit.xpos));
    document.onmousedown = function (event) {
      let x = event.clientX / document.getElementById('canvas').clientWidth;
      let y = event.clientY / document.getElementById('canvas').clientHeight;
      if (event.which == 1 && x >= 0.2 && x <= 0.8 && y >= 0.065 && y <= 0.865 && document.getElementById('menu').hidden && this.dropMenu == 0 && !this.state.AnimationOnMap) {
        let i = Math.floor((x - 0.2) / 0.6 / (1 / 16));
        let j = Math.floor((y - 0.065) / 0.8 / (1 / 12));
        let div = document.createElement('div');
        this.dropMenu = div;
        let ul = document.createElement('ul');
        div.className = 'drop-menu';
        div.style.left = event.clientX - 40 + 'px';
        div.style.top = event.clientY - 15 + 'px';
        div.appendChild(ul);
        let elem = global.tiledMap[i][j];
        let func = function (item) {
          let li = document.createElement('li');
          li.innerHTML = item.name;
          li.onclick = function () {
            let action = new __WEBPACK_IMPORTED_MODULE_2__Action__["a" /* default */]();
            action.sender = global.tiledMap[unit.xpos][unit.ypos];
            action.target = global.tiledMap[i][j];
            action.ability = item;
            global.actionDeque.push(action);
            this.dropMenu.remove();
            this.dropMenu = 0;
          }.bind(this);
          ul.appendChild(li);
        }.bind(this);
        if (elem.isOccupied() && elem.unitOnTile.type === unit.type) {
          console.log("Союзник");
          unit.skills.forEach(function (item, i) {
            if (item.name !== 'Move' && item.typeOfArea == "circle" && item.damage[0] < 0) {
              func(item);
            }
          });
        } else if (elem.isOccupied() && elem.unitOnTile.type != unit.type) {
          console.log("Противник");
          unit.skills.forEach(function (item, i) {
            if (item.name !== 'Move' && item.damage[0] > 0) {
              func(item);
            }
          });
        } else {
          console.log("Карта");
          unit.skills.forEach(function (item, i) {
            if (item.typeOfArea === "circle" || item.name === 'Move' && elem.active) {
              func(item);
            }
          });
        }
        document.getElementsByClassName('container')[0].appendChild(div);
      } else if (event.which === 1 && this.dropMenu !== 0 && event.target.tagName !== 'LI') {
        this.dropMenu.remove();
        this.dropMenu = 0;
      }
    }.bind(this);
  }

  unitAttack(nameSkill, sender, target, wounded) {
    let index = this.indexUnit[sender.unitOnTile.class];
    this.spriteManager.getSprite(sender.unitOnTile.entity.mapId).setTexture(this.conditions[3 * index]);
    setTimeout(function (nameSkill, sender, target) {
      this.spriteManager.getSprite(sender.unitOnTile.entity.mapId).setTexture(this.conditions[1 + 3 * index]);
      let timer = this.timeAndRunSkill(nameSkill, sender, target, true);
      setTimeout(function (sender, target) {
        // gameManager.spriteManager.getSprite(target.unitOnTile.entity.mapId).setTexture(images[92]);
        this.spriteManager.getSprite(sender.unitOnTile.entity.mapId).setTexture(this.entities[6 + index]);
        this.updateHealth(wounded);
      }.bind(this, sender, target), timer + 300);
    }.bind(this, nameSkill, sender, target), 500);
  }

  unitAttackAndKill(nameSkill, sender, target, DeadUnits, wounded) {
    this.unitAttack(nameSkill, sender, target, wounded);
    let timer = this.timeAndRunSkill(nameSkill);
    setTimeout(() => {
      this.removeUnitsInInitiativeLine(DeadUnits);
      DeadUnits.forEach(unit => {
        this.spriteManager.getSprite(unit.entity.mapId).setTexture(this.conditions[2 + 3 * this.indexUnit[target.unitOnTile.class]]);
        this.spriteManager.getSprite(unit.entity.healthbarId).setVertexs(__WEBPACK_IMPORTED_MODULE_1__Utils__["a" /* default */].madeRectangle(0, 0, 0, 0));
      });
    }, timer + 800);
  }

  showPossibleMoves(path) {
    for (let i = 0; i < this.possibleMoves.length; i++) {
      global.tiledMap[this.possibleMoves[i].xpos][this.possibleMoves[i].ypos].active = false;
      this.spriteManager.deleteSprite(this.possibleMoves[i].id);
    }
    this.possibleMoves = [];
    for (let i = 0; i < path.length; i++) {
      this.possibleMoves.push({
        id: this.spriteManager.addSprite(-2, __WEBPACK_IMPORTED_MODULE_1__Utils__["a" /* default */].translationOnMap(path[i].ypos, path[i].xpos), this.textures[0], __WEBPACK_IMPORTED_MODULE_1__Utils__["a" /* default */].madeRectangle(0, 0, 1.2 / 16, -(1.2 / 16) * this.ratio)),
        xpos: path[i].xpos,
        ypos: path[i].ypos
      });
      global.tiledMap[path[i].xpos][path[i].ypos].active = true;
    }
    this.units.forEach(unit => {
      this.spriteManager.getSprite(unit.entity.mapId).order = unit.ypos;
      this.spriteManager.getSprite(unit.entity.healthbarId).order = unit.ypos;
    });
    this.spriteManager.sortSprites();
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = UnitManager;

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(3)))

/***/ }),
/* 42 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Entity {
  constructor() {
    this.mapId = 0;
    this.healthbarId = 0;
    this.lowbarId = 0;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Entity;


/***/ }),
/* 43 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Tile1_js__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Skill1_js__ = __webpack_require__(10);


class Action {
	constructor() {
		this.target = new __WEBPACK_IMPORTED_MODULE_0__Tile1_js__["a" /* default */]();
		this.sender = new __WEBPACK_IMPORTED_MODULE_0__Tile1_js__["a" /* default */]();
		this.ability = new __WEBPACK_IMPORTED_MODULE_1__Skill1_js__["a" /* default */]();
	}

	isMovement() {
		// console.log(this.target + " - target and this.ability - " + this.ability);
		return this.target !== null && this.ability === null;
	}

	isSkip() {
		return this.target === null && this.ability === null;
	}

	isAbility() {
		return this.ability !== null;
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Action;


/***/ }),
/* 44 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Tile {
	constructor() {
		this.xpos = null;
		this.ypos = null;
		this.unitOnTile = null;
		this.isWall = null;
	}

	getInhabitant() {
		return this.unitOnTile;
	}

	occupy(unit) {
		this.unitOnTile = unit;
	}

	unoccupy() {
		this.unitOnTile = null;
	}

	isOccupied() {
		return this.unitOnTile !== null;
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Tile;


/***/ }),
/* 45 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Utils__ = __webpack_require__(2);

class Animation {
  constructor(gameManager) {
    this.gameManager = gameManager;
  }
  static deltaTrans(start, deltaT, deltaTime, timeA) {
    return [start[0] + deltaT[0] * (deltaTime / timeA), start[1] + deltaT[1] * (deltaTime / timeA)];
  }

  MoveAnimation(start, dest, timeA, id) {
    let currentTime = performance.now() * 0.001;
    let deltaT = [dest[0] - start[0], dest[1] - start[1]];
    requestAnimationFrame(Moving.bind(this));
    function Moving(now) {
      now *= 0.001;
      let deltaTime = now - currentTime;
      if (deltaTime >= timeA) {
        this.gameManager.unitManager.units.forEach(function (unit) {
          this.gameManager.spriteManager.getSprite(unit.entity.mapId).order = unit.ypos;
          this.gameManager.spriteManager.getSprite(unit.entity.healthbarId).order = unit.ypos;
        }.bind(this));
        this.gameManager.spriteManager.sortSprites();
      } else {
        this.gameManager.spriteManager.getSprite(id).setTrans(Animation.deltaTrans(start, deltaT, deltaTime, timeA));
        this.gameManager.unitManager.units.forEach(function (unit) {
          this.gameManager.spriteManager.getSprite(unit.entity.mapId).order = unit.ypos;
          this.gameManager.spriteManager.getSprite(unit.entity.healthbarId).order = unit.ypos;
        }.bind(this));
        this.gameManager.spriteManager.sortSprites();
        requestAnimationFrame(Moving.bind(this));
      }
    }
  }

  FrameAnimation(id, timeA, countFrames, colls, rows, deleteInEnd) {
    let currentTime = performance.now() * 0.001;
    requestAnimationFrame(FrameAnim.bind(this));
    function FrameAnim(now) {
      now *= 0.001;
      let deltaTime = now - currentTime;
      if (deltaTime >= timeA) {
        if (deleteInEnd) {
          this.gameManager.spriteManager.deleteSprite(id);
        }
      } else {
        let frame = Math.floor(deltaTime % timeA / timeA * countFrames);
        this.gameManager.spriteManager.getSprite(id).setTexCoord(__WEBPACK_IMPORTED_MODULE_0__Utils__["a" /* default */].madeRectangle(frame % colls / colls, Math.floor(frame / colls) / rows, (frame % colls + 1) / colls, (Math.floor(frame / colls) + 1) / rows));
        requestAnimationFrame(FrameAnim.bind(this));
      }
    }
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Animation;


/***/ }),
/* 46 */
/***/ (function(module, exports) {

module.exports = "<!DOCTYPE html>\n<html lang=\"en\">\n\n<head>\n  <meta charset=\"UTF-8\">\n  <title>Document</title>\n  <link rel=\"stylesheet\" href=\"/views/singleplay/style.css\">\n</head>\n\n<body>\n  <div class=\"container\">\n    <canvas id=\"background\"></canvas>\n    <canvas id=\"canvas\"></canvas>\n    <div class=\"fps\">\n      FPS: <span id=\"fps\"></span>\n    </div>\n    <div style=\"position: relative;\">\n      <span style=\"position:absolute; left:6.3vw; top:31vh;\" id=\"time\"></span>\n    </div>\n  </div>\n  <div hidden id=\"menu\" style=\"background: yellow; padding: 5px;position:absolute;top:45vh;left:45vw;\">\n  </div>\n  <script src=\"/views/singleplay/Utils.js\" charset=\"utf-8\"></script>\n  <script src=\"/views/singleplay/Shaders.js\" charset=\"utf-8\"></script>\n  <script src=\"/views/singleplay/State.js\" charset=\"utf-8\"></script>\n  <script src=\"/views/singleplay/GraphicEngine.js\" charset=\"utf-8\"></script>\n  <script src=\"/views/singleplay/GameManager.js\" charset=\"utf-8\"></script>\n  <script src=\"/views/singleplay/UnitManager.js\" charset=\"utf-8\"></script>\n  <script src=\"/views/singleplay/AnimationManager.js\" charset=\"utf-8\"></script>\n  <script src=\"/views/singleplay/SpriteManager.js\" charset=\"utf-8\"></script>\n  <script src=\"/views/singleplay/Animation.js\" charset=\"utf-8\"></script>\n  <script src=\"/views/singleplay/Entity.js\" charset=\"utf-8\"></script>\n  <script src=\"/views/singleplay/Program.js\" charset=\"utf-8\"></script>\n  <script src=\"/views/singleplay/Loader.js\" charset=\"utf-8\"></script>\n  <script src=\"/views/singleplay/Background.js\" charset=\"utf-8\"></script>\n  <script src=\"/views/singleplay/Sprite.js\" charset=\"utf-8\"></script>\n  <script src=\"/views/singleplay/Pathfinding.js\" charset=\"utf-8\"></script>\n  <script src=\"/views/singleplay/Skill.js\" charset=\"utf-8\"></script>\n  <script src=\"/views/singleplay/Unit.js\" charset=\"utf-8\"></script>\n  <script src=\"/views/singleplay/Tile.js\" charset=\"utf-8\"></script>\n  <script src=\"/views/singleplay/DungeonMapMaker.js\" charset=\"utf-8\"></script>\n  <script src=\"/views/singleplay/GameModule.js\" charset=\"utf-8\"></script>\n  <script src=\"/views/singleplay/DemoGameModule.js\" charset=\"utf-8\"></script>\n  <script src=\"/views/singleplay/InitiativeLine.js\" charset=\"utf-8\"></script>\n  <script src=\"/views/singleplay/Action.js\" charset=\"utf-8\"></script>\n  <script src=\"/views/singleplay/start.js\" charset=\"utf-8\"></script>\n</body>\n\n</html>\n";

/***/ }),
/* 47 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 48 */
/***/ (function(module, exports) {

module.exports = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/4iOISUNDX1BST0ZJTEUAAQEAACN4bGNtcwIQAABtbnRyUkdCIFhZWiAH3wAIABMADwAcACphY3NwKm5peAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA9tYAAQAAAADTLWxjbXMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAtkZXNjAAABCAAAALBjcHJ0AAABuAAAARJ3dHB0AAACzAAAABRjaGFkAAAC4AAAACxyWFlaAAADDAAAABRiWFlaAAADIAAAABRnWFlaAAADNAAAABRyVFJDAAADSAAAIAxnVFJDAAADSAAAIAxiVFJDAAADSAAAIAxjaHJtAAAjVAAAACRkZXNjAAAAAAAAABxzUkdCLWVsbGUtVjItc3JnYnRyYy5pY2MAAAAAAAAAAAAAAB0AcwBSAEcAQgAtAGUAbABsAGUALQBWADIALQBzAHIAZwBiAHQAcgBjAC4AaQBjAGMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHRleHQAAAAAQ29weXJpZ2h0IDIwMTUsIEVsbGUgU3RvbmUgKHdlYnNpdGU6IGh0dHA6Ly9uaW5lZGVncmVlc2JlbG93LmNvbS87IGVtYWlsOiBlbGxlc3RvbmVAbmluZWRlZ3JlZXNiZWxvdy5jb20pLiBUaGlzIElDQyBwcm9maWxlIGlzIGxpY2Vuc2VkIHVuZGVyIGEgQ3JlYXRpdmUgQ29tbW9ucyBBdHRyaWJ1dGlvbi1TaGFyZUFsaWtlIDMuMCBVbnBvcnRlZCBMaWNlbnNlIChodHRwczovL2NyZWF0aXZlY29tbW9ucy5vcmcvbGljZW5zZXMvYnktc2EvMy4wL2xlZ2FsY29kZSkuAAAAAFhZWiAAAAAAAAD21gABAAAAANMtc2YzMgAAAAAAAQxCAAAF3v//8yUAAAeTAAD9kP//+6H///2iAAAD3AAAwG5YWVogAAAAAAAAb6AAADj1AAADkFhZWiAAAAAAAAAknwAAD4QAALbEWFlaIAAAAAAAAGKXAAC3hwAAGNljdXJ2AAAAAAAAEAAAAAABAAIABAAFAAYABwAJAAoACwAMAA4ADwAQABEAEwAUABUAFgAYABkAGgAbABwAHgAfACAAIQAjACQAJQAmACgAKQAqACsALQAuAC8AMAAyADMANAA1ADcAOAA5ADoAOwA9AD4APwBAAEIAQwBEAEUARwBIAEkASgBMAE0ATgBPAFEAUgBTAFQAVQBXAFgAWQBaAFwAXQBeAF8AYQBiAGMAZABmAGcAaABpAGsAbABtAG4AbwBxAHIAcwB0AHYAdwB4AHkAewB8AH0AfgCAAIEAggCDAIUAhgCHAIgAiQCLAIwAjQCOAJAAkQCSAJMAlQCWAJcAmACaAJsAnACdAJ8AoAChAKIApAClAKYApwCoAKoAqwCsAK0ArwCwALEAsgC0ALUAtgC3ALkAugC7ALwAvgC/AMAAwQDCAMQAxQDGAMcAyQDKAMsAzADOAM8A0ADRANMA1ADVANcA2ADZANoA3ADdAN4A4ADhAOIA5ADlAOYA6ADpAOoA7ADtAO8A8ADxAPMA9AD2APcA+AD6APsA/QD+AP8BAQECAQQBBQEHAQgBCgELAQ0BDgEPAREBEgEUARUBFwEYARoBGwEdAR8BIAEiASMBJQEmASgBKQErAS0BLgEwATEBMwE0ATYBOAE5ATsBPAE+AUABQQFDAUUBRgFIAUoBSwFNAU8BUAFSAVQBVQFXAVkBWgFcAV4BYAFhAWMBZQFnAWgBagFsAW4BbwFxAXMBdQF2AXgBegF8AX4BfwGBAYMBhQGHAYkBigGMAY4BkAGSAZQBlgGXAZkBmwGdAZ8BoQGjAaUBpwGpAasBrAGuAbABsgG0AbYBuAG6AbwBvgHAAcIBxAHGAcgBygHMAc4B0AHSAdQB1gHYAdoB3AHeAeEB4wHlAecB6QHrAe0B7wHxAfMB9QH4AfoB/AH+AgACAgIEAgcCCQILAg0CDwISAhQCFgIYAhoCHQIfAiECIwIlAigCKgIsAi4CMQIzAjUCOAI6AjwCPgJBAkMCRQJIAkoCTAJPAlECUwJWAlgCWgJdAl8CYQJkAmYCaQJrAm0CcAJyAnUCdwJ5AnwCfgKBAoMChgKIAosCjQKQApIClQKXApoCnAKfAqECpAKmAqkCqwKuArACswK1ArgCuwK9AsACwgLFAsgCygLNAs8C0gLVAtcC2gLdAt8C4gLkAucC6gLsAu8C8gL1AvcC+gL9Av8DAgMFAwgDCgMNAxADEwMVAxgDGwMeAyADIwMmAykDLAMuAzEDNAM3AzoDPQM/A0IDRQNIA0sDTgNRA1QDVgNZA1wDXwNiA2UDaANrA24DcQN0A3cDegN9A4ADggOFA4gDiwOOA5EDlAOYA5sDngOhA6QDpwOqA60DsAOzA7YDuQO8A78DwgPFA8kDzAPPA9ID1QPYA9sD3wPiA+UD6APrA+4D8gP1A/gD+wP+BAIEBQQIBAsEDwQSBBUEGAQcBB8EIgQlBCkELAQvBDMENgQ5BD0EQARDBEcESgRNBFEEVARXBFsEXgRiBGUEaARsBG8EcwR2BHkEfQSABIQEhwSLBI4EkgSVBJkEnASgBKMEpwSqBK4EsQS1BLgEvAS/BMMExgTKBM4E0QTVBNgE3ATgBOME5wTqBO4E8gT1BPkE/QUABQQFCAULBQ8FEwUWBRoFHgUiBSUFKQUtBTEFNAU4BTwFQAVDBUcFSwVPBVIFVgVaBV4FYgVmBWkFbQVxBXUFeQV9BYEFhAWIBYwFkAWUBZgFnAWgBaQFqAWsBa8FswW3BbsFvwXDBccFywXPBdMF1wXbBd8F4wXnBesF7wX0BfgF/AYABgQGCAYMBhAGFAYYBhwGIQYlBikGLQYxBjUGOQY+BkIGRgZKBk4GUwZXBlsGXwZjBmgGbAZwBnQGeQZ9BoEGhQaKBo4GkgaXBpsGnwakBqgGrAaxBrUGuQa+BsIGxgbLBs8G1AbYBtwG4QblBuoG7gbyBvcG+wcABwQHCQcNBxIHFgcbBx8HJAcoBy0HMQc2BzoHPwdDB0gHTQdRB1YHWgdfB2MHaAdtB3EHdgd7B38HhAeJB40HkgeXB5sHoAelB6kHrgezB7cHvAfBB8YHygfPB9QH2QfdB+IH5wfsB/EH9Qf6B/8IBAgJCA0IEggXCBwIIQgmCCsILwg0CDkIPghDCEgITQhSCFcIXAhhCGYIawhwCHUIegh/CIQIiQiOCJMImAidCKIIpwisCLEItgi7CMAIxQjKCM8I1AjZCN8I5AjpCO4I8wj4CP0JAwkICQ0JEgkXCR0JIgknCSwJMQk3CTwJQQlGCUwJUQlWCVsJYQlmCWsJcQl2CXsJgQmGCYsJkQmWCZsJoQmmCasJsQm2CbwJwQnGCcwJ0QnXCdwJ4gnnCe0J8gn4Cf0KAgoICg0KEwoZCh4KJAopCi8KNAo6Cj8KRQpKClAKVgpbCmEKZgpsCnIKdwp9CoMKiAqOCpQKmQqfCqUKqgqwCrYKvArBCscKzQrTCtgK3grkCuoK7wr1CvsLAQsHCwwLEgsYCx4LJAsqCy8LNQs7C0ELRwtNC1MLWQtfC2QLagtwC3YLfAuCC4gLjguUC5oLoAumC6wLsgu4C74LxAvKC9AL1gvcC+IL6QvvC/UL+wwBDAcMDQwTDBkMIAwmDCwMMgw4DD4MRQxLDFEMVwxdDGQMagxwDHYMfQyDDIkMjwyWDJwMogyoDK8MtQy7DMIMyAzODNUM2wzhDOgM7gz1DPsNAQ0IDQ4NFQ0bDSENKA0uDTUNOw1CDUgNTw1VDVwNYg1pDW8Ndg18DYMNiQ2QDZYNnQ2kDaoNsQ23Db4NxQ3LDdIN2Q3fDeYN7A3zDfoOAQ4HDg4OFQ4bDiIOKQ4vDjYOPQ5EDkoOUQ5YDl8OZg5sDnMOeg6BDogOjg6VDpwOow6qDrEOuA6+DsUOzA7TDtoO4Q7oDu8O9g79DwQPCw8SDxkPIA8nDy4PNQ88D0MPSg9RD1gPXw9mD20PdA97D4IPiQ+QD5gPnw+mD60PtA+7D8IPyg/RD9gP3w/mD+0P9Q/8EAMQChASEBkQIBAnEC8QNhA9EEQQTBBTEFoQYhBpEHAQeBB/EIYQjhCVEJ0QpBCrELMQuhDCEMkQ0BDYEN8Q5xDuEPYQ/REFEQwRFBEbESMRKhEyETkRQRFIEVARVxFfEWcRbhF2EX0RhRGNEZQRnBGkEasRsxG7EcIRyhHSEdkR4RHpEfAR+BIAEggSDxIXEh8SJxIuEjYSPhJGEk4SVRJdEmUSbRJ1En0ShBKMEpQSnBKkEqwStBK8EsQSzBLUEtsS4xLrEvMS+xMDEwsTExMbEyMTKxMzEzsTRBNME1QTXBNkE2wTdBN8E4QTjBOUE50TpROtE7UTvRPFE80T1hPeE+YT7hP2E/8UBxQPFBcUIBQoFDAUOBRBFEkUURRaFGIUahRzFHsUgxSMFJQUnBSlFK0UthS+FMYUzxTXFOAU6BTxFPkVARUKFRIVGxUjFSwVNBU9FUUVThVXFV8VaBVwFXkVgRWKFZMVmxWkFawVtRW+FcYVzxXYFeAV6RXyFfoWAxYMFhQWHRYmFi8WNxZAFkkWUhZaFmMWbBZ1Fn4WhhaPFpgWoRaqFrMWuxbEFs0W1hbfFugW8Rb6FwMXDBcUFx0XJhcvFzgXQRdKF1MXXBdlF24XdxeAF4kXkhecF6UXrhe3F8AXyRfSF9sX5BftF/cYABgJGBIYGxgkGC4YNxhAGEkYUhhcGGUYbhh3GIEYihiTGJwYphivGLgYwhjLGNQY3hjnGPAY+hkDGQwZFhkfGSkZMhk7GUUZThlYGWEZaxl0GX4ZhxmRGZoZpBmtGbcZwBnKGdMZ3RnmGfAZ+hoDGg0aFhogGioaMxo9GkYaUBpaGmMabRp3GoEaihqUGp4apxqxGrsaxRrOGtga4hrsGvUa/xsJGxMbHRsnGzAbOhtEG04bWBtiG2wbdRt/G4kbkxudG6cbsRu7G8UbzxvZG+Mb7Rv3HAEcCxwVHB8cKRwzHD0cRxxRHFscZRxwHHochByOHJgcohysHLYcwRzLHNUc3xzpHPQc/h0IHRIdHB0nHTEdOx1FHVAdWh1kHW8deR2DHY4dmB2iHa0dtx3BHcwd1h3hHesd9R4AHgoeFR4fHioeNB4+HkkeUx5eHmgecx59Hogekx6dHqgesh69Hsce0h7cHuce8h78HwcfEh8cHycfMh88H0cfUh9cH2cfch98H4cfkh+dH6cfsh+9H8gf0h/dH+gf8x/+IAggEyAeICkgNCA/IEogVCBfIGogdSCAIIsgliChIKwgtyDCIM0g2CDjIO4g+SEEIQ8hGiElITAhOyFGIVEhXCFnIXIhfiGJIZQhnyGqIbUhwCHMIdch4iHtIfgiBCIPIhoiJSIwIjwiRyJSIl4iaSJ0In8iiyKWIqEirSK4IsMizyLaIuYi8SL8IwgjEyMfIyojNSNBI0wjWCNjI28jeiOGI5EjnSOoI7QjvyPLI9Yj4iPuI/kkBSQQJBwkKCQzJD8kSyRWJGIkbiR5JIUkkSScJKgktCS/JMsk1yTjJO4k+iUGJRIlHiUpJTUlQSVNJVklZSVwJXwliCWUJaAlrCW4JcQl0CXcJecl8yX/JgsmFyYjJi8mOyZHJlMmXyZrJncmhCaQJpwmqCa0JsAmzCbYJuQm8Cb9JwknFSchJy0nOSdGJ1InXidqJ3YngyePJ5snpye0J8AnzCfZJ+Un8Sf9KAooFigjKC8oOyhIKFQoYChtKHkohiiSKJ4oqyi3KMQo0CjdKOko9ikCKQ8pGykoKTQpQSlNKVopZylzKYApjCmZKaYpsim/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ZNRk6WT+ZRNlKWU+ZVNlaGV9ZZNlqGW9ZdJl6GX9ZhJmJ2Y9ZlJmZ2Z9ZpJmp2a9ZtJm6Gb9ZxJnKGc9Z1NnaGd+Z5NnqWe+Z9Rn6Wf/aBRoKmg/aFVoamiAaJZoq2jBaNZo7GkCaRdpLWlDaVhpbmmEaZlpr2nFadtp8GoGahxqMmpIal1qc2qJap9qtWrKauBq9msMayJrOGtOa2RremuQa6ZrvGvSa+hr/mwUbCpsQGxWbGxsgmyYbK5sxGzabPBtBm0cbTNtSW1fbXVti22hbbhtzm3kbfpuEW4nbj1uU25qboBulm6tbsNu2W7wbwZvHG8zb0lvYG92b4xvo2+5b9Bv5m/9cBNwKnBAcFdwbXCEcJpwsXDHcN5w9HELcSJxOHFPcWZxfHGTcapxwHHXce5yBHIbcjJySHJfcnZyjXKkcrpy0XLocv9zFnMsc0NzWnNxc4hzn3O2c81z5HP6dBF0KHQ/dFZ0bXSEdJt0snTJdOB093UOdSZ1PXVUdWt1gnWZdbB1x3XedfZ2DXYkdjt2UnZqdoF2mHavdsd23nb1dwx3JHc7d1J3aneBd5h3sHfHd9539ngNeCV4PHhUeGt4gniaeLF4yXjgePh5D3kneT55VnlueYV5nXm0ecx543n7ehN6KnpCelp6cXqJeqF6uHrQeuh7AHsXey97R3tfe3Z7jnume7571nvufAV8HXw1fE18ZXx9fJV8rXzFfNx89H0MfSR9PH1UfWx9hH2cfbR9zX3lff1+FX4tfkV+XX51fo1+pX6+ftZ+7n8Gfx5/N39Pf2d/f3+Xf7B/yH/gf/mAEYApgEGAWoBygIqAo4C7gNSA7IEEgR2BNYFOgWaBf4GXgbCByIHhgfmCEoIqgkOCW4J0goyCpYK+gtaC74MHgyCDOYNRg2qDg4Obg7SDzYPlg/6EF4QwhEiEYYR6hJOErITEhN2E9oUPhSiFQYVahXKFi4Wkhb2F1oXvhgiGIYY6hlOGbIaFhp6Gt4bQhumHAocbhzSHTYdnh4CHmYeyh8uH5If9iBeIMIhJiGKIe4iViK6Ix4jgiPqJE4ksiUaJX4l4iZGJq4nEid6J94oQiiqKQ4pdinaKj4qpisKK3Ir1iw+LKItCi1uLdYuOi6iLwovbi/WMDowojEKMW4x1jI+MqIzCjNyM9Y0PjSmNQo1cjXaNkI2pjcON3Y33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"

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./forms/forms.css": 5
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 49;

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./event-bus.js": 51,
	"./http.js": 7,
	"./router.js": 0
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 50;

/***/ }),
/* 51 */
/***/ (function(module, exports) {



/***/ })
/******/ ]);