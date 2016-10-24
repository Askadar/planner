define('app',['exports'], function (exports) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var App = exports.App = function App() {
		_classCallCheck(this, App);

		this.message = 'Hello World!';
	};
});
define('environment',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    debug: true,
    testing: true
  };
});
define('main',['exports', './environment'], function (exports, _environment) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.configure = configure;

	var _environment2 = _interopRequireDefault(_environment);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	Promise.config({
		warnings: {
			wForgottenReturn: false
		}
	});

	function configure(aurelia) {
		aurelia.use.standardConfiguration().feature('resources').plugin('aurelia-dragula');

		if (_environment2.default.debug) {
			aurelia.use.developmentLogging();
		}

		if (_environment2.default.testing) {
			aurelia.use.plugin('aurelia-testing');
		}

		aurelia.start().then(function () {
			return aurelia.setRoot();
		});
	}
});
define('store',['exports', './todos/todo'], function (exports, _todo) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Storage = undefined;

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var _createClass = function () {
		function defineProperties(target, props) {
			for (var i = 0; i < props.length; i++) {
				var descriptor = props[i];
				descriptor.enumerable = descriptor.enumerable || false;
				descriptor.configurable = true;
				if ("value" in descriptor) descriptor.writable = true;
				Object.defineProperty(target, descriptor.key, descriptor);
			}
		}

		return function (Constructor, protoProps, staticProps) {
			if (protoProps) defineProperties(Constructor.prototype, protoProps);
			if (staticProps) defineProperties(Constructor, staticProps);
			return Constructor;
		};
	}();

	var Storage = exports.Storage = function () {
		function Storage() {
			_classCallCheck(this, Storage);

			this.store = {
				todos: [new _todo.Todo('Zaggu'), new _todo.Todo('zangos')]
			};
		}

		_createClass(Storage, [{
			key: 'todos',
			get: function get() {
				return this.store.todos;
			}
		}]);

		return Storage;
	}();
});
define('boxes/box',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Box = exports.Box = function Box() {
    _classCallCheck(this, Box);

    this.header = 'Testing';
  };
});
define('resources/index',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {}
});
define('todos/todo',['exports', 'node-uuid'], function (exports, _nodeUuid) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Todo = undefined;

	var _nodeUuid2 = _interopRequireDefault(_nodeUuid);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var Todo = exports.Todo = function () {
		function Todo(text) {
			_classCallCheck(this, Todo);

			this.text = text;
			this.done = false;
			this.id = _nodeUuid2.default.v4();
		}

		Todo.prototype.toggleDone = function toggleDone() {
			this.done = !this.done;
		};

		return Todo;
	}();
});
define('todos/todos',['exports', './todo', 'aurelia-dragula', '../store'], function (exports, _todo, _aureliaDragula, _store) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Todos = undefined;

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var _class, _temp;

	var Todos = exports.Todos = (_temp = _class = function () {
		function Todos(store) {
			_classCallCheck(this, Todos);

			this.header = 'stringy';
			this.todos = store.todos;
			this.text = '';
			this.dragula = new _aureliaDragula.Dragula();
		}

		Todos.prototype.addTodo = function addTodo() {
			this.text = this.text.trim();
			if (this.text !== '') {
				this.todos.push(new _todo.Todo(this.text));
				this.text = '';
			}
		};

		Todos.prototype.removeTodo = function removeTodo(todo) {
			this.todos = this.todos.filter(function (td) {
				return td === todo;
			});
		};

		Todos.prototype.toggleTodo = function toggleTodo(todo) {
			var i = this.todos.indexOf(todo);
			this.todos[i].done = !this.todos[i].done;
		};

		Todos.prototype.drop = function drop(item, target, source, sibling, itemVM, siblingVM) {
			var a = item.dataset.id;
			var b = sibling ? sibling.dataset.id : null;
			(0, _aureliaDragula.moveBefore)(this.todos, function (todo) {
				return todo.id === a;
			}, function (todo) {
				return todo.id === b;
			});
		};

		return Todos;
	}(), _class.inject = [_store.Storage], _temp);
});
define('aurelia-dragula/options',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var GLOBAL_OPTIONS = exports.GLOBAL_OPTIONS = 'GlobalOptions';

  var DIRECTION = exports.DIRECTION = {
    VERTICAL: 'vertical',
    HORIZONTAL: 'horizontal'
  };

  var Options = exports.Options = function () {
    function Options() {
      _classCallCheck(this, Options);

      this.moves = Options.always;
      this.accepts = Options.always;
      this.invalid = Options.invalidTarget;
      this.containers = [];
      this.isContainer = Options.never;
      this.copy = false;
      this.copySortSource = false;
      this.revertOnSpill = false;
      this.removeOnSpill = false;
      this.direction = DIRECTION.VERTICAL, this.ignoreInputTextSelection = true;
      this.mirrorContainer = document.body;
    }

    Options.always = function always() {
      return true;
    };

    Options.never = function never() {
      return false;
    };

    Options.invalidTarget = function invalidTarget() {
      return false;
    };

    return Options;
  }();
});
define('aurelia-dragula/dragula',['exports', 'aurelia-dependency-injection', './touchy', './options', './util', './emitter', './classes'], function (exports, _aureliaDependencyInjection, _touchy, _options, _util, _emitter, _classes) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Dragula = undefined;

  var classes = _interopRequireWildcard(_classes);

  function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
      return obj;
    } else {
      var newObj = {};

      if (obj != null) {
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
        }
      }

      newObj.default = obj;
      return newObj;
    }
  }

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
  };

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var MIN_TIME_BETWEEN_REDRAWS_MS = 20;

  var Dragula = exports.Dragula = function () {
    function Dragula(options) {
      _classCallCheck(this, Dragula);

      var len = arguments.length;
      var globalOptions = _aureliaDependencyInjection.Container.instance.get(_options.GLOBAL_OPTIONS);
      this.options = Object.assign({}, globalOptions, options);
      this._emitter = new _emitter.Emitter();
      this.dragging = false;

      if (this.options.removeOnSpill === true) {
        this._emitter.on('over', this.spillOver.bind(this));
        this._emitter.on('out', this.spillOut.bind(this));
      }

      this.boundStart = this._startBecauseMouseMoved.bind(this);
      this.boundGrab = this._grab.bind(this);
      this.boundRelease = this._release.bind(this);
      this.boundPreventGrabbed = this._preventGrabbed.bind(this);
      this.boundDrag = this.drag.bind(this);

      this._events();

      this._mirror;
      this._source;
      this._item;
      this._offsetX;
      this._offsetY;
      this._moveX;
      this._moveY;
      this._initialSibling;
      this._currentSibling;
      this._copy;
      this._lastRenderTime = null;
      this._lastDropTarget = null;
      this._grabbed;
    }

    Dragula.prototype.on = function on(eventName, callback) {
      this._emitter.on(eventName, callback);
    };

    Dragula.prototype.once = function once(eventName, callback) {
      this._emitter.once(eventName, callback);
    };

    Dragula.prototype.off = function off(eventName, fn) {
      this._emitter.off(eventName, fn);
    };

    Dragula.prototype.isContainer = function isContainer(el) {
      return this.options.containers.indexOf(el) !== -1 || this.options.isContainer(el);
    };

    Dragula.prototype._events = function _events(remove) {
      var op = remove ? 'removeEventListener' : 'addEventListener';
      (0, _touchy.touchy)(document.documentElement, op, 'mousedown', this.boundGrab);
      (0, _touchy.touchy)(document.documentElement, op, 'mouseup', this.boundRelease);
    };

    Dragula.prototype._eventualMovements = function _eventualMovements(remove) {
      var op = remove ? 'removeEventListener' : 'addEventListener';
      (0, _touchy.touchy)(document.documentElement, op, 'mousemove', this.boundStart);
    };

    Dragula.prototype._movements = function _movements(remove) {
      var op = remove ? 'removeEventListener' : 'addEventListener';
      (0, _touchy.touchy)(document.documentElement, op, 'click', this.boundPreventGrabbed);
    };

    Dragula.prototype.destroy = function destroy() {
      this._events(true);
      this._release({});
      this._emitter.destroy();
    };

    Dragula.prototype._preventGrabbed = function _preventGrabbed(e) {
      if (this._grabbed) {
        e.preventDefault();
      }
    };

    Dragula.prototype._grab = function _grab(e) {
      this._moveX = e.clientX;
      this._moveY = e.clientY;

      var ignore = _util.Util.whichMouseButton(e) !== 1 || e.metaKey || e.ctrlKey;
      if (ignore) {
        return;
      }
      var item = e.target;
      var context = this._canStart(item);
      if (!context) {
        return;
      }
      this._grabbed = context;
      this._eventualMovements();
      if (_util.Util.isInput(item)) {
        item.focus();
      } else {
          e.preventDefault();
        }
    };

    Dragula.prototype._startBecauseMouseMoved = function _startBecauseMouseMoved(e) {
      if (!this._grabbed || this.dragging) {
        return;
      }
      if (_util.Util.whichMouseButton(e) === 0) {
        this._release({});
        return;
      }

      if (e.clientX !== void 0 && e.clientX === this._moveX && e.clientY !== void 0 && e.clientY === this._moveY) {
        return;
      }
      if (this.options.ignoreInputTextSelection) {
        var clientX = _util.Util.getCoord('clientX', e);
        var clientY = _util.Util.getCoord('clientY', e);
        var elementBehindCursor = document.elementFromPoint(clientX, clientY);
        if (_util.Util.isInput(elementBehindCursor)) {
          return;
        }
      }

      var grabbed = this._grabbed;
      this._eventualMovements(true);
      this._movements();
      this.end();
      this.start(grabbed);

      var offset = _util.Util.getOffset(this._item);
      this._offsetX = _util.Util.getCoord('pageX', e) - offset.left;
      this._offsetY = _util.Util.getCoord('pageY', e) - offset.top;

      classes.add(this._copy || this._item, 'gu-transit');
      this.renderMirrorImage();
      this.drag(e);
    };

    Dragula.prototype._canStart = function _canStart(item) {
      if (this.dragging && this._mirror) {
        return;
      }
      if (this.isContainer(item)) {
        return;
      }
      var handle = item;
      while (_util.Util.getParent(item) && this.isContainer(_util.Util.getParent(item)) === false) {
        if (this.options.invalid(item, handle)) {
          return;
        }
        item = _util.Util.getParent(item);
        if (!item) {
          return;
        }
      }
      var source = _util.Util.getParent(item);
      if (!source) {
        return;
      }
      if (this.options.invalid(item, handle)) {
        return;
      }

      var movable = this.options.moves(item, source, handle, _util.Util.nextEl(item));
      if (!movable) {
        return;
      }

      return {
        item: item,
        source: source
      };
    };

    Dragula.prototype.manualStart = function manualStart(item) {
      var context = this._canStart(item);
      if (context) {
        this.start(context);
      }
    };

    Dragula.prototype.start = function start(context) {
      if (this._isCopy(context.item, context.source)) {
        this._copy = context.item.cloneNode(true);
        this._emitter.emit('cloned', this._copy, context.item, 'copy', _util.Util.getViewModel(context.item));
      }

      this._source = context.source;
      this._item = context.item;
      this._initialSibling = context.item.nextSibling;
      this._currentSibling = _util.Util.nextEl(context.item);

      this.dragging = true;
      this._emitter.emit('drag', this._item, this._source, _util.Util.getViewModel(this._item));
    };

    Dragula.prototype.end = function end() {
      if (!this.dragging) {
        return;
      }
      var item = this._copy || this._item;
      this.drop(item, _util.Util.getParent(item));
    };

    Dragula.prototype._ungrab = function _ungrab() {
      this._grabbed = false;
      this._eventualMovements(true);
      this._movements(true);
    };

    Dragula.prototype._release = function _release(e) {
      this._ungrab();

      if (!this.dragging) {
        return;
      }
      var item = this._copy || this._item;
      var clientX = _util.Util.getCoord('clientX', e);
      var clientY = _util.Util.getCoord('clientY', e);
      var elementBehindCursor = _util.Util.getElementBehindPoint(this._mirror, clientX, clientY);
      var dropTarget = this._findDropTarget(elementBehindCursor, clientX, clientY);
      if (dropTarget && (this._copy && this.options.copySortSource || !this._copy || dropTarget !== this._source)) {
        this.drop(item, dropTarget);
      } else if (this.options.removeOnSpill) {
        this.remove();
      } else {
        this.cancel();
      }
    };

    Dragula.prototype.drop = function drop(item, target) {
      if (this._copy && this.options.copySortSource && target === this._source) {
        var parent = _util.Util.getParent(this._item);
        if (parent) parent.removeChild(this._item);
      }
      if (this._isInitialPlacement(target)) {
        this._emitter.emit('cancel', item, this._source, this._source, _util.Util.getViewModel(this._item));
      } else {
        this._emitter.emit('drop', item, target, this._source, this._currentSibling, _util.Util.getViewModel(this._item), _util.Util.getViewModel(this._currentSibling));
      }
      this._cleanup();
    };

    Dragula.prototype.remove = function remove() {
      if (!this.dragging) {
        return;
      }
      var item = this._copy || this._item;
      var parent = _util.Util.getParent(item);
      if (parent) {
        parent.removeChild(item);
      }
      this._emitter.emit(this._copy ? 'cancel' : 'remove', item, parent, this._source, _util.Util.getViewModel(this._item));
      this._cleanup();
    };

    Dragula.prototype.cancel = function cancel(revert) {
      if (!this.dragging) {
        return;
      }
      var reverts = arguments.length > 0 ? revert : this.options.revertOnSpill;
      var item = this._copy || this._item;
      var parent = _util.Util.getParent(item);
      if (this._copy && parent) {
        parent.removeChild(this._copy);
      }
      var initial = this._isInitialPlacement(parent);
      if (initial === false && !this._copy && reverts) {
        this._source.insertBefore(item, this._initialSibling);
      }
      if (initial || reverts) {
        this._emitter.emit('cancel', item, this._source, this._source, _util.Util.getViewModel(this._item));
      } else {
        this._emitter.emit('drop', item, parent, this._source, this._currentSibling, _util.Util.getViewModel(this._item), _util.Util.getViewModel(this._currentSibling));
      }
      this._cleanup();
    };

    Dragula.prototype._cleanup = function _cleanup() {
      var item = this._copy || this._item;
      this._ungrab();
      this.removeMirrorImage();
      if (item) {
        classes.rm(item, 'gu-transit');
      }
      this.dragging = false;
      if (this._lastDropTarget) {
        this._emitter.emit('out', item, this._lastDropTarget, this._source, _util.Util.getViewModel(item));
      }
      this._emitter.emit('dragend', item, _util.Util.getViewModel(item));
      this._source = this._item = this._copy = this._initialSibling = this._currentSibling = this._lastRenderTime = this._lastDropTarget = null;
    };

    Dragula.prototype._isInitialPlacement = function _isInitialPlacement(target, s) {
      var sibling = void 0;
      if (s !== void 0) {
        sibling = s;
      } else if (this._mirror) {
        sibling = this._currentSibling;
      } else {
        sibling = (this._copy || this._item).nextSibling;
      }
      return target === this._source && sibling === this._initialSibling;
    };

    Dragula.prototype._findDropTarget = function _findDropTarget(elementBehindCursor, clientX, clientY) {
      var _this = this;

      var accepted = function accepted() {
        var droppable = _this.isContainer(target);
        if (droppable === false) {
          return false;
        }

        var immediate = _util.Util.getImmediateChild(target, elementBehindCursor);
        var reference = _this.getReference(target, immediate, clientX, clientY);
        var initial = _this._isInitialPlacement(target, reference);
        if (initial) {
          return true;
        }
        return _this.options.accepts(_this._item, target, _this._source, reference);
      };

      var target = elementBehindCursor;
      while (target && !accepted()) {
        target = _util.Util.getParent(target);
      }
      return target;
    };

    Dragula.prototype.drag = function drag(e) {
      var _this2 = this;

      e.preventDefault();
      if (!this._mirror) {
        return;
      }

      if (this._lastRenderTime !== null && Date.now() - this._lastRenderTime < MIN_TIME_BETWEEN_REDRAWS_MS) {
        return;
      }
      this._lastRenderTime = Date.now();

      var item = this._copy || this._item;

      var moved = function moved(type) {
        _this2._emitter.emit(type, item, _this2._lastDropTarget, _this2._source, _util.Util.getViewModel(item));
      };
      var over = function over() {
        if (changed) {
          moved('over');
        }
      };
      var out = function out() {
        if (_this2._lastDropTarget) {
          moved('out');
        }
      };

      var clientX = _util.Util.getCoord('clientX', e);
      var clientY = _util.Util.getCoord('clientY', e);
      var x = clientX - this._offsetX;
      var y = clientY - this._offsetY;

      this._mirror.style.left = x + 'px';
      this._mirror.style.top = y + 'px';

      var elementBehindCursor = _util.Util.getElementBehindPoint(this._mirror, clientX, clientY);
      var dropTarget = this._findDropTarget(elementBehindCursor, clientX, clientY);
      var changed = dropTarget !== null && dropTarget !== this._lastDropTarget;
      if (changed || dropTarget === null) {
        out();
        this._lastDropTarget = dropTarget;
        over();
      }
      var parent = _util.Util.getParent(item);
      if (dropTarget === this._source && this._copy && !this.options.copySortSource) {
        if (parent) {
          parent.removeChild(item);
        }
        return;
      }
      var reference = void 0;
      var immediate = _util.Util.getImmediateChild(dropTarget, elementBehindCursor);
      if (immediate !== null) {
        reference = this.getReference(dropTarget, immediate, clientX, clientY);
      } else if (this.options.revertOnSpill === true && !this._copy) {
        reference = this._initialSibling;
        dropTarget = this._source;
      } else {
        if (this._copy && parent) {
          parent.removeChild(item);
        }
        return;
      }
      if (reference === null && changed || reference !== item && reference !== _util.Util.nextEl(item)) {
        this._currentSibling = reference;
        dropTarget.insertBefore(item, reference);
        this._emitter.emit('shadow', item, dropTarget, this._source, _util.Util.getViewModel(item));
      }
    };

    Dragula.prototype.spillOver = function spillOver(el) {
      classes.rm(el, 'gu-hide');
    };

    Dragula.prototype.spillOut = function spillOut(el) {
      if (this.dragging) {
        classes.add(el, 'gu-hide');
      }
    };

    Dragula.prototype.renderMirrorImage = function renderMirrorImage() {
      if (this._mirror) {
        return;
      }
      var rect = this._item.getBoundingClientRect();
      this._mirror = this._item.cloneNode(true);
      this._mirror.style.width = _util.Util.getRectWidth(rect) + 'px';
      this._mirror.style.height = _util.Util.getRectHeight(rect) + 'px';
      classes.rm(this._mirror, 'gu-transit');
      classes.add(this._mirror, 'gu-mirror');
      this.options.mirrorContainer.appendChild(this._mirror);
      (0, _touchy.touchy)(document.documentElement, 'addEventListener', 'mousemove', this.boundDrag);
      classes.add(this.options.mirrorContainer, 'gu-unselectable');
      this._emitter.emit('cloned', this._mirror, this._item, 'mirror', _util.Util.getViewModel(this._item));
    };

    Dragula.prototype.removeMirrorImage = function removeMirrorImage() {
      if (this._mirror) {
        classes.rm(this.options.mirrorContainer, 'gu-unselectable');
        (0, _touchy.touchy)(document.documentElement, 'removeEventListener', 'mousemove', this.boundDrag);
        _util.Util.getParent(this._mirror).removeChild(this._mirror);
        this._mirror = null;
      }
    };

    Dragula.prototype.getReference = function getReference(dropTarget, target, x, y) {
      var outside = function outside() {
        var len = dropTarget.children.length;
        var i = void 0;
        var el = void 0;
        var rect = void 0;
        for (i = 0; i < len; i++) {
          el = dropTarget.children[i];
          rect = el.getBoundingClientRect();
          if (horizontal && rect.left + rect.width / 2 > x) {
            return el;
          }
          if (!horizontal && rect.top + rect.height / 2 > y) {
            return el;
          }
        }
        return null;
      };

      var resolve = function resolve(after) {
        return after ? _util.Util.nextEl(target) : target;
      };

      var inside = function inside() {
        var rect = target.getBoundingClientRect();
        if (horizontal) {
          return resolve(x > rect.left + _util.Util.getRectWidth(rect) / 2);
        }
        return resolve(y > rect.top + _util.Util.getRectHeight(rect) / 2);
      };

      var horizontal = this.options.direction === 'horizontal';
      var reference = target !== dropTarget ? inside() : outside();
      return reference;
    };

    Dragula.prototype._isCopy = function _isCopy(item, container) {
      var isBoolean = typeof this.options.copy === 'boolean' || _typeof(this.options.copy) === 'object' && typeof this.options.copy.valueOf() === 'boolean';

      return isBoolean ? this.options.copy : this.options.copy(item, container);
    };

    _createClass(Dragula, [{
      key: 'containers',
      get: function get() {
        return this.options.containers;
      },
      set: function set(value) {
        this.options.containers = value;
      }
    }]);

    return Dragula;
  }();
});
define('aurelia-dragula/touchy',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.touchy = touchy;
  var touch = {
    mouseup: 'touchend',
    mousedown: 'touchstart',
    mousemove: 'touchmove'
  };
  var pointers = {
    mouseup: 'pointerup',
    mousedown: 'pointerdown',
    mousemove: 'pointermove'
  };
  var microsoft = {
    mouseup: 'MSPointerUp',
    mousedown: 'MSPointerDown',
    mousemove: 'MSPointerMove'
  };

  function touchy(el, op, type, fn) {
    if (window.navigator.pointerEnabled) {
      el[op](pointers[type], fn);
    } else if (window.navigator.msPointerEnabled) {
      el[op](microsoft[type], fn);
    } else {
      el[op](touch[type], fn);
      el[op](type, fn);
    }
  }
});
define('aurelia-dragula/util',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _Util = function () {
    function _Util() {
      _classCallCheck(this, _Util);
    }

    _Util.prototype.nextEl = function nextEl(el) {
      return el.nextElementSibling || manually();
      function manually() {
        var sibling = el;
        do {
          sibling = sibling.nextSibling;
        } while (sibling && sibling.nodeType !== 1);
        return sibling;
      }
    };

    _Util.prototype.whichMouseButton = function whichMouseButton(e) {
      if (e.touches !== void 0) {
        return e.touches.length;
      }
      if (e.which !== void 0 && e.which !== 0) {
        return e.which;
      }
      if (e.buttons !== void 0) {
        return e.buttons;
      }
      var button = e.button;
      if (button !== void 0) {
        return button & 1 ? 1 : button & 2 ? 3 : button & 4 ? 2 : 0;
      }
    };

    _Util.prototype.getElementBehindPoint = function getElementBehindPoint(point, x, y) {
      var p = point || {};
      var state = p.className;
      var el = void 0;
      p.className += ' gu-hide';
      el = document.elementFromPoint(x, y);
      p.className = state;
      return el;
    };

    _Util.prototype.getParent = function getParent(el) {
      return el.parentNode === document ? null : el.parentNode;
    };

    _Util.prototype.getRectWidth = function getRectWidth(rect) {
      return rect.width || rect.right - rect.left;
    };

    _Util.prototype.getRectHeight = function getRectHeight(rect) {
      return rect.height || rect.bottom - rect.top;
    };

    _Util.prototype.isInput = function isInput(el) {
      return el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.tagName === 'SELECT' || Util.isEditable(el);
    };

    _Util.prototype.isEditable = function isEditable(el) {
      if (!el) {
        return false;
      }
      if (el.contentEditable === 'false') {
        return false;
      }
      if (el.contentEditable === 'true') {
        return true;
      }
      return this.isEditable(this.getParent(el));
    };

    _Util.prototype.getOffset = function getOffset(el) {
      var rect = el.getBoundingClientRect();
      return {
        left: rect.left + this.getScroll('scrollLeft', 'pageXOffset'),
        top: rect.top + this.getScroll('scrollTop', 'pageYOffset')
      };
    };

    _Util.prototype.getScroll = function getScroll(scrollProp, offsetProp) {
      if (typeof window[offsetProp] !== 'undefined') {
        return window[offsetProp];
      }
      if (document.documentElement.clientHeight) {
        return document.documentElement[scrollProp];
      }
      return document.body[scrollProp];
    };

    _Util.prototype.getElementBehindPoint = function getElementBehindPoint(point, x, y) {
      if (point) point.classList.add('gu-hide');

      var el = document.elementFromPoint(x, y);

      if (point) point.classList.remove('gu-hide');
      return el;
    };

    _Util.prototype.getEventHost = function getEventHost(e) {
      if (e.targetTouches && e.targetTouches.length) {
        return e.targetTouches[0];
      }
      if (e.changedTouches && e.changedTouches.length) {
        return e.changedTouches[0];
      }
      return e;
    };

    _Util.prototype.getCoord = function getCoord(coord, e) {
      var host = this.getEventHost(e);
      return host[coord];
    };

    _Util.prototype.getImmediateChild = function getImmediateChild(dropTarget, target) {
      var immediate = target;
      while (immediate !== dropTarget && this.getParent(immediate) !== dropTarget) {
        immediate = this.getParent(immediate);
      }
      if (immediate === document.documentElement) {
        return null;
      }
      return immediate;
    };

    _Util.prototype.getViewModel = function getViewModel(element) {
      if (element && element.au && element.au.controller) {
        if (element.au.controller.viewModel.currentViewModel) return element.au.controller.viewModel.currentViewModel;else return element.au.controller.viewModel;
      }
      return null;
    };

    return _Util;
  }();

  var Util = new _Util();
  exports.Util = Util;
});
define('aurelia-dragula/emitter',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var EventListener = function EventListener(func) {
    var once = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

    _classCallCheck(this, EventListener);

    this.func = func;
    this.once = once;
  };

  var Emitter = exports.Emitter = function () {
    function Emitter() {
      _classCallCheck(this, Emitter);

      this.events = {};
    }

    Emitter.prototype.on = function on(type, fn) {
      var once = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

      var newEvent = new EventListener(fn, once);
      if (this.events[type] === undefined) {
        this.events[type] = [];
      }
      this.events[type].push(newEvent);
    };

    Emitter.prototype.once = function once(type, fn) {
      this.on(type, fn, true);
    };

    Emitter.prototype.off = function off(type, fn) {
      if (arguments.length === 1) {
        delete this.events[type];
      } else if (arguments.length === 0) {
        this.events = {};
      } else {
        var eventList = this.events[type];
        if (eventList) {
          var index = eventList.findIndex(function (x) {
            return x.func === fn;
          });
          if (index >= 0) eventList.splice(index, 1);
        }
      }
    };

    Emitter.prototype.destroy = function destroy() {
      this.events = {};
    };

    Emitter.prototype.emit = function emit() {
      var _this = this;

      var args = arguments ? [].concat(Array.prototype.slice.call(arguments)) : [];
      var type = args.shift();
      var et = (this.events[type] || []).slice(0);
      if (type === 'error' && !et.length) {
        throw args.length === 1 ? args[0] : args;
      }
      var toDeregister = [];
      et.forEach(function (listener) {
        listener.func.apply(listener, args);
        if (listener.once) {
          toDeregister.push(listener);
        }
      });
      toDeregister.forEach(function (listener) {
        _this.off(type, listener.func);
      });
    };

    return Emitter;
  }();
});
define('aurelia-dragula/classes',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.add = add;
  exports.rm = rm;


  var cache = {};
  var start = '(?:^|\\s)';
  var end = '(?:\\s|$)';

  function lookupClass(className) {
    var cached = cache[className];
    if (cached) {
      cached.lastIndex = 0;
    } else {
      cache[className] = cached = new RegExp(start + className + end, 'g');
    }
    return cached;
  }

  function add(el, className) {
    if (el.classList) {
      el.classList.add(className);
      return;
    }
    var current = el.className;
    if (!current.length) {
      el.className = className;
    } else if (!lookupClass(className).test(current)) {
      el.className += ' ' + className;
    }
  }

  function rm(el, className) {
    if (el.classList) {
      el.classList.remove(className);
      return;
    }
    el.className = el.className.replace(lookupClass(className), ' ').trim();
  }
});
define('aurelia-dragula/move-before',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.moveBefore = moveBefore;
  function moveBefore(array, itemMatcherFn, siblingMatcherFn) {
    var removedItem = remove(array, itemMatcherFn);
    var nextIndex = array.findIndex(siblingMatcherFn);
    array.splice(nextIndex >= 0 ? nextIndex : array.length, 0, removedItem);
  }

  function remove(array, matcherFn) {
    var index = array.findIndex(matcherFn);
    if (index >= 0) {
      return array.splice(index, 1)[0];
    }
  }
});
define('text!app.html', ['module'], function(module) { module.exports = "<template>\n\t<require from=\"./app.css\"></require>\n\t<require from=\"./todos/todos\"></require>\n\n\t<div class=\"A5\">\n\t\t<div class=\"medium-12 columns\">\n\t\t\t<div class=\"medium-4 columns\">\n\t\t\t\t<h2 class=\"caps\">Day Planner</h2>\n\t\t\t</div>\n\t\t</div>\n\t\t<div class=\"medium-12 columns border-down\">\n\t\t\t<div class=\"medium-4 columns\">\n\t\t\t\t<h4>____ /____ /____</h4>\n\t\t\t</div>\n\t\t\t<div class=\"medium-8 columns\">\n\t\t\t\t<span class=\"round day\">Mo</span>\n\t\t\t\t<span class=\"round day\">Tu</span>\n\t\t\t\t<span class=\"round day\">We</span>\n\t\t\t\t<span class=\"round day\">Th</span>\n\t\t\t\t<span class=\"round day\">Fr</span>\n\t\t\t\t<span class=\"round day\">Sa</span>\n\t\t\t\t<span class=\"round day\">Su</span>\n\t\t\t</div>\n\t\t</div>\n\t\t<div>\n\t\t\t<div class=\"medium-4 columns todos left\">\n\t\t\t\t<todos></todos>\n\t\t\t</div>\n\t\t\t<div class=\"medium-8 columns\">\n\t\t\t\t<div class=\"medium-12 columns\">\n\t\t\t\t\t<div class=\"myTab\" style=\"height:8rem;\" data-header=\"today I'm grateful for\"></div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"medium-12 columns\">\n\t\t\t\t\t<div class=\"myTab\" style=\"height:8rem;\" data-header=\"daily goals\"></div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"medium-4 columns\">\n\t\t\t\t\t<div class=\"myTab\" style=\"height:8rem;\" data-header=\"breakfast\"></div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"medium-4 columns\">\n\t\t\t\t\t<div class=\"myTab\" style=\"height:8rem;\" data-header=\"lunch\"></div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"medium-4 columns\">\n\t\t\t\t\t<div class=\"myTab\" style=\"height:8rem;\" data-header=\"dinner\"></div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"medium-12 columns\">\n\t\t\t\t\t<div class=\"water-container\">water: <i class=\"water\"></i> <i class=\"water\"></i> <i class=\"water\"></i> <i class=\"water\"></i> <i class=\"water\"></i>\t\t\t\t\t\t<i class=\"water\"></i> <i class=\"water\"></i></div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"medium-12 columns\">\n\t\t\t\t\t<div class=\"myTab\" style=\"height:6rem;\" data-header=\"snacks\"></div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"medium-6 columns\">\n\t\t\t\t\t<div class=\"myTab\" style=\"height:6rem;\" data-header=\"fitness\"></div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"medium-6 columns\">\n\t\t\t\t\t<div class=\"myTab\" style=\"height:6rem;\" data-header=\"mood\"></div>\n\t\t\t\t</div>\n\n\t\t\t</div>\n\t\t</div>\n\t</div>\n\n\t<script src=\"js/vendor/jquery.js\"></script>\n\t<script src=\"js/vendor/what-input.js\"></script>\n\t<script src=\"js/vendor/foundation.js\"></script>\n\t<script src=\"js/app.js\"></script>\n</template>\n"; });
define('text!app.css', ['module'], function(module) { module.exports = ".A5 {\n  width: 900px;\n  height: 1272px;\n  border: 1px solid #ccc;\n  margin: auto;\n  background-image: url(/img/loli-molang-bottom.jpg);\n  background-position: -25px 620px;\n  background-repeat: repeat-x; }\n\n.caps {\n  text-transform: uppercase; }\n\nh1, h2, h3, h4, h5, h6 {\n  font-family: Futura; }\n\nbody {\n  font-family: Futura;\n  font-size: 20px; }\n  body table {\n    background: none; }\n\n.border-down {\n  padding-bottom: 0.5rem;\n  border-bottom: 2px solid black; }\n\ntable tbody {\n  border: none;\n  background: none; }\n  table tbody tr:nth-child(even) {\n    background: none; }\n\ntable thead {\n  border: none;\n  background: none; }\n\ntable th {\n  font-weight: bold;\n  font-size: 1.4rem;\n  font-family: Futura Light; }\n\ntable td {\n  background: none; }\n\n.left.todos {\n  background-image: url(/img/loli-molang-left.svg);\n  background-repeat: no-repeat;\n  background-size: 100%; }\n  .left.todos ul {\n    list-style: none; }\n    .left.todos ul li.done {\n      text-decoration: line-through; }\n    .left.todos ul li {\n      border-bottom: 1px solid rgba(25, 70, 120, 0.6);\n      padding: 0.25rem;\n      user-select: none;\n      cursor: default;\n      position: relative; }\n      .left.todos ul li .fa {\n        margin-right: 0.5rem;\n        width: 1em; }\n      .left.todos ul li input {\n        background-image: repeating-linear-gradient(45deg, rgba(70, 120, 200, 0.4) 1px, transparent 2px, transparent 10px, rgba(70, 120, 200, 0.4) 11px);\n        width: 75%;\n        display: inline-block;\n        margin: 0; }\n      .left.todos ul li input + button {\n        margin-left: 1rem; }\n      .left.todos ul li .remove {\n        display: none;\n        position: absolute;\n        right: 0.25rem;\n        top: 0.5rem; }\n    .left.todos ul li:hover .remove {\n      display: inline-block; }\n\n.water-container {\n  width: 90%;\n  margin: 0 auto; }\n\n.water {\n  width: 2rem;\n  height: 2rem;\n  margin: 0 0.7rem;\n  display: inline-block;\n  background-image: url(/img/glass-of-water.svg); }\n\n.myTab {\n  margin: 1rem;\n  border: 1px outset black;\n  border-radius: 1px;\n  box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.4); }\n  .myTab:after {\n    content: attr(data-header);\n    text-align: center;\n    display: block;\n    background: #eee; }\n\nspan.round.day {\n  display: inline-block;\n  width: 3rem;\n  height: 3rem;\n  border: 1px outset black;\n  border-radius: 50%;\n  text-align: center;\n  padding: 0.7rem 0;\n  font-size: 0.95rem;\n  margin: 0 0.5rem; }\n  span.round.day:last-child {\n    margin-right: 0; }\n  span.round.day:first-child {\n    margin-left: 0; }\n"; });
define('text!boxes/box.html', ['module'], function(module) { module.exports = "<template>\r\n    \r\n</template>"; });
define('text!todos/todos.html', ['module'], function(module) { module.exports = "<template>\r\n\t<!-- <require from=\"dragula\"></require> -->\r\n\t<div class=\"todos\">\r\n\t\t<dragula-and-drop drop-fn.call=\"drop(item, target, source, sibling, itemVM, siblingVM)\"></dragula-and-drop>\r\n\t\t<ul class=\"drag-source drop-target\" data-list=\"todos\">\r\n\t\t\t<compose view-model.bind=\"todo\" repeat.for=\"todo of todos\" data-id.one-time=\"todo.id\"></compose>\r\n\t\t\t<li>\r\n\t\t\t\t<form submit.trigger=\"addTodo()\">\r\n\t\t\t\t\t<input type=\"text\" value.bind=\"text\">\r\n\t\t\t\t\t<button type=\"submit\"><i class=\"fa fa-check\"></i></button>\r\n\t\t\t\t</form>\r\n\t\t\t</li>\r\n\t\t</ul>\r\n\t</div>\r\n</template>\r\n"; });
define('text!todos/todo.html', ['module'], function(module) { module.exports = "<template>\r\n\t<li class=\"${todo.done ? 'done' : ''}\" click.trigger=\"todo.toggleDone()\">\r\n\t\t<i class=\"fa ${todo.done ? 'fa-check' : 'fa-square-o'}\"></i>\r\n\t\t<span>${todo.text}</span>\r\n\t\t<button class=\"remove\" click.trigger=\"removeTodo(todo)\"><i class=\"fa fa-times\"></i></button>\r\n\t</li>\r\n</template>\r\n"; });
//# sourceMappingURL=app-bundle.js.map