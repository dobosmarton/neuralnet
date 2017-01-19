/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _neuralnet = __webpack_require__(2);

	var sgnFunc = function sgnFunc(output) {
	  return output > 0;
	};

	var attrsAND = {
	  numInputs: 2,
	  initalWeightClamp: 1.0,
	  inputWeights: [1, 1],
	  bias: -1.5,
	  activationFunction: sgnFunc
	};

	var percAND = (0, _neuralnet.perceptron)(attrsAND);

	percAND.computeOutput([0, 0]);

	console.log('perceptron AND [0, 0]', percAND.getOutput() > 0);

	percAND.computeOutput([0, 1]);

	console.log('perceptron AND [0, 1]', percAND.getOutput() > 0);

	percAND.computeOutput([1, 1]);

	console.log('perceptron AND [1, 1]', percAND.getOutput() > 0);

	var attrsNAND = {
	  numInputs: 2,
	  initalWeightClamp: 1.0,
	  inputWeights: [-1, -1],
	  bias: 1.5,
	  activationFunction: sgnFunc
	};

	var percNAND = (0, _neuralnet.perceptron)(attrsNAND);
	percNAND.computeOutput([0, 0]);

	console.log('perceptron NAND [0, 0]', percNAND.getOutput() > 0);

	percNAND.computeOutput([0, 1]);

	console.log('perceptron NAND [0, 1]', percNAND.getOutput() > 0);

	percNAND.computeOutput([1, 1]);

	console.log('perceptron NAND [1, 1]', percNAND.getOutput() > 0);

	var attrsOR = {
	  numInputs: 2,
	  initalWeightClamp: 1.0,
	  inputWeights: [1, 1],
	  bias: -0.5,
	  activationFunction: sgnFunc
	};

	var percOR = (0, _neuralnet.perceptron)(attrsOR);
	percOR.computeOutput([0, 0]);

	console.log('perceptron OR [0, 0]', percOR.getOutput() > 0);

	percOR.computeOutput([0, 1]);

	console.log('perceptron OR [0, 1]', percOR.getOutput() > 0);

	percOR.computeOutput([1, 1]);

	console.log('perceptron OR [1, 1]', percOR.getOutput() > 0);

	var attrsXOR = {
	  numInputNeurons: 2,
	  numHiddenNeurons: 2,
	  learningFactor: 0.3,
	  initalWeightClamp: 1.0,
	  hiddenLayer: [percOR, percNAND],
	  outputLayer: percAND
	};

	var netXOR = (0, _neuralnet.net)(attrsXOR);

	netXOR.computeOutput([0, 0]);

	console.log('perceptron XOR [0, 0]', netXOR.getOutput() > 0);

	netXOR.computeOutput([0, 1]);

	console.log('perceptron XOR [0, 1]', netXOR.getOutput() > 0);

	netXOR.computeOutput([1, 0]);

	console.log('perceptron XOR [1, 0]', netXOR.getOutput() > 0);

	netXOR.computeOutput([1, 1]);

	console.log('perceptron XOR [1, 1]', netXOR.getOutput() > 0);

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.net = exports.perceptron = undefined;

	var _perceptron2 = __webpack_require__(3);

	var _perceptron3 = _interopRequireDefault(_perceptron2);

	var _net2 = __webpack_require__(23);

	var _net3 = _interopRequireDefault(_net2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.perceptron = _perceptron3.default;
	exports.net = _net3.default;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _tanh = __webpack_require__(4);

	var _tanh2 = _interopRequireDefault(_tanh);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Egy perceptron modellje
	 * @param numInputs:          a perceptron bemenetinek száma
	 * @param initalWeightClamp:  súly paraméter (generált súlyok esetén számít)
	 * @param inputWeights:       a perceptron bemenetein lévő súlyokat előre megadhatjuk
	 * @param bias:               a perceptron nulladik bemenetének súlya, azaz a bias
	 * @param activationFunction: definiálhatunk saját aktivációs függvényt
	 */
	var perceptron = function perceptron(_ref) {
	    var numInputs = _ref.numInputs,
	        _ref$initalWeightClam = _ref.initalWeightClamp,
	        initalWeightClamp = _ref$initalWeightClam === undefined ? 0 : _ref$initalWeightClam,
	        _ref$inputWeights = _ref.inputWeights,
	        inputWeights = _ref$inputWeights === undefined ? [] : _ref$inputWeights,
	        _ref$bias = _ref.bias,
	        bias = _ref$bias === undefined ? 2 * (Math.random() - 0.5) * initalWeightClamp : _ref$bias,
	        _ref$activationFuncti = _ref.activationFunction,
	        activationFunction = _ref$activationFuncti === undefined ? function (output) {
	        return (0, _tanh2.default)(output);
	    } : _ref$activationFuncti;


	    /// PRIVATE ///

	    var output = void 0;
	    var gradient = 0.2;

	    /**
	     * Ha nem adtuk meg a súlyokat, akkor random generáljuk őket
	     */
	    if (inputWeights.length === 0) {
	        for (var i = 0; i < numInputs; i++) {
	            inputWeights[i] = 2 * (Math.random() - 0.5) * initalWeightClamp;
	        }
	    }

	    /// PUBLIC ///

	    /**
	     * A bemenet függvényében kiszámoljuk a perceptron kimenetét
	     * @param inputs: bemenet
	     */
	    var computeOutput = function computeOutput(inputs) {
	        var newOutput = bias;
	        for (var _i = 0; _i < inputs.length; _i++) {
	            newOutput += inputWeights[_i] * inputs[_i];
	        }
	        output = activationFunction(newOutput);
	    };

	    var computeGradient = function computeGradient(weight, outputGradient) {
	        gradient = output * (1 - output) * weight * outputGradient;
	    };

	    /**
	     * Visszatér a perceptron kimenetével
	     */
	    var getOutput = function getOutput() {
	        return output;
	    };

	    var getGradient = function getGradient() {
	        return gradient;
	    };

	    /**
	     * Visszatér a biassal
	     */
	    var getBias = function getBias() {
	        return bias;
	    };

	    /**
	     * Visszatér a megadott indexű bemenet súlyával
	     */
	    var getWeight = function getWeight(index) {
	        return inputWeights[index];
	    };

	    /**
	     * A modell visszatér a publikusan elérhető függvényekkel,
	     * kívülről ezeket lehet elérni
	     */
	    var publicAttrs = {
	        computeOutput: computeOutput,
	        getOutput: getOutput,
	        getGradient: getGradient,
	        getBias: getBias,
	        getWeight: getWeight
	    };

	    return publicAttrs;
	};

	exports.default = perceptron;
	module.exports = exports['default'];

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(5), __esModule: true };

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(6);
	module.exports = __webpack_require__(9).Math.tanh;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.33 Math.tanh(x)
	var $export = __webpack_require__(7)
	  , expm1   = __webpack_require__(22)
	  , exp     = Math.exp;

	$export($export.S, 'Math', {
	  tanh: function tanh(x){
	    var a = expm1(x = +x)
	      , b = expm1(-x);
	    return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp(x) + exp(-x));
	  }
	});

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(8)
	  , core      = __webpack_require__(9)
	  , ctx       = __webpack_require__(10)
	  , hide      = __webpack_require__(12)
	  , PROTOTYPE = 'prototype';

	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , IS_WRAP   = type & $export.W
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , expProto  = exports[PROTOTYPE]
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
	    , key, own, out;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function(C){
	      var F = function(a, b, c){
	        if(this instanceof C){
	          switch(arguments.length){
	            case 0: return new C;
	            case 1: return new C(a);
	            case 2: return new C(a, b);
	          } return new C(a, b, c);
	        } return C.apply(this, arguments);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
	    if(IS_PROTO){
	      (exports.virtual || (exports.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
	    }
	  }
	};
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library` 
	module.exports = $export;

/***/ },
/* 8 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 9 */
/***/ function(module, exports) {

	var core = module.exports = {version: '2.4.0'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(11);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var dP         = __webpack_require__(13)
	  , createDesc = __webpack_require__(21);
	module.exports = __webpack_require__(17) ? function(object, key, value){
	  return dP.f(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var anObject       = __webpack_require__(14)
	  , IE8_DOM_DEFINE = __webpack_require__(16)
	  , toPrimitive    = __webpack_require__(20)
	  , dP             = Object.defineProperty;

	exports.f = __webpack_require__(17) ? Object.defineProperty : function defineProperty(O, P, Attributes){
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if(IE8_DOM_DEFINE)try {
	    return dP(O, P, Attributes);
	  } catch(e){ /* empty */ }
	  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
	  if('value' in Attributes)O[P] = Attributes.value;
	  return O;
	};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(15);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(17) && !__webpack_require__(18)(function(){
	  return Object.defineProperty(__webpack_require__(19)('div'), 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(18)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(15)
	  , document = __webpack_require__(8).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(15);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function(it, S){
	  if(!isObject(it))return it;
	  var fn, val;
	  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  throw TypeError("Can't convert object to primitive value");
	};

/***/ },
/* 21 */
/***/ function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ },
/* 22 */
/***/ function(module, exports) {

	// 20.2.2.14 Math.expm1(x)
	var $expm1 = Math.expm1;
	module.exports = (!$expm1
	  // Old FF bug
	  || $expm1(10) > 22025.465794806719 || $expm1(10) < 22025.4657948067165168
	  // Tor Browser bug
	  || $expm1(-2e-17) != -2e-17
	) ? function expm1(x){
	  return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : Math.exp(x) - 1;
	} : $expm1;

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _perceptron = __webpack_require__(3);

	var _perceptron2 = _interopRequireDefault(_perceptron);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Hálózat modellje
	 * @param numInputNeurons:    a hálózat bemenetinek száma
	 * @param numHiddenNeurons:   a rejtett réteg neuronjainak száma
	 * @param learningFactor:     tanulási paraméter
	 * @param initalWeightClamp:  súly paraméter (generált súlyok esetén számít)
	 * @param hiddenLayer:        rejtett réteg neuronjai
	 * @param outputLayer:        kiemeneti réteg neuronja
	 */
	var net = function net(_ref) {
	    var numInputNeurons = _ref.numInputNeurons,
	        numHiddenNeurons = _ref.numHiddenNeurons,
	        _ref$learningFactor = _ref.learningFactor,
	        learningFactor = _ref$learningFactor === undefined ? 0.3 : _ref$learningFactor,
	        _ref$initalWeightClam = _ref.initalWeightClamp,
	        initalWeightClamp = _ref$initalWeightClam === undefined ? 0.5 : _ref$initalWeightClam,
	        _ref$hiddenLayer = _ref.hiddenLayer,
	        hiddenLayer = _ref$hiddenLayer === undefined ? [] : _ref$hiddenLayer,
	        _ref$outputLayer = _ref.outputLayer,
	        outputLayer = _ref$outputLayer === undefined ? (0, _perceptron2.default)(numHiddenNeurons, initalWeightClamp) : _ref$outputLayer;


	    /**
	     * Ha a rejtett réteget nem kaptuk meg paraméterként,
	     * akkor létrehozzuk a perceptronokat véletlen súlyokkal
	     */
	    if (hiddenLayer.length === 0) {
	        for (var i = 0; i < numHiddenNeurons; i++) {
	            hiddenLayer[i] = (0, _perceptron2.default)(numInputNeurons, initalWeightClamp);
	        }
	    }

	    /// PUBLIC ///

	    /**
	     * Kiszámoljuk a hálózat kimenetét a megadott bemenet függvényében
	     * @param inputs: bemenetek
	     */
	    var computeOutput = function computeOutput(inputs) {
	        hiddenLayer.forEach(function (neuron) {
	            return neuron.computeOutput(inputs);
	        });
	        outputLayer.computeOutput(hiddenLayer.map(function (neuron) {
	            return neuron.getOutput();
	        }));
	    };

	    /**
	     * Visszaadjuk a hálózat kimenetét
	     */
	    var getOutput = function getOutput() {
	        return outputLayer.getOutput();
	    };

	    /**
	     * A modell visszatér a publikusan elérhető függvényekkel,
	     * kívülről ezeket lehet elérni
	     */
	    var publicAttrs = {
	        computeOutput: computeOutput,
	        getOutput: getOutput
	    };

	    return publicAttrs;
	};

	exports.default = net;
	module.exports = exports['default'];

/***/ }
/******/ ]);