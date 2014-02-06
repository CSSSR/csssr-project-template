/* @required jQuery */

(function($, undefined) {

	/**
	 * Config presets.
	 * @private
	 */
	var defaults = {
		syntax: {
			namePrefix: '',               // Block prefix, may regexp
			namePattern: '[a-zA-Z0-9-]+', // Pattern prefix
			elemPrefix: '__',             // Element prefix
			modPrefix: '_',               // Modifier prefix
			modDlmtr: '_',                // Delimiter between modifier and value
			defaultModVal: 'yes'          // Default modifier value
		},
		
		config: {}
	};


	/**
	 * BEM version.
	 * @private
	 */
	var version = '1.1.2';


	/**
	 * Syntax sugar.
	 * @private
	 */
	var syntax = {};


	/**
	 * Configuration.
	 * @private
	 */
	var config = {};


	/**
	 * Declarations for blocks.
	 * @private
	 */
	var decls = [];


	/* 
	 * Base BEM object.
	 * @namespace
	 */
	this.bem = {

		/**
		 * Init base class.
		 * @private
		 */
		init: function() {
			this.setConfig();
			return this;
		},


		/**
		 * Extender interface for modules.
		 * @protected
		 *
		 * @param  {String}  moduleName  Module namespace
		 * @param  {Object}  object      Module object
		 */
		extend: function(moduleName, object) {
			this[moduleName] = object;

			if (this[moduleName].init != undefined) {
				this[moduleName].init();
			}
		},


		/**
		 * Declarator for blocks.
		 * @protected
		 *
		 * @param  {String|Object}  $this      Selector
		 * @param  {Object}         props      Declaration
		 * @param  {Object}         scope      Scope
		 * @param  {Bool}           recursive  Recursive call
		 */
		decl: function(selector, props, scope, recursive) {
			var self = this,
				props = props || {},
				scope = props,
				recursive = recursive || false
			;

			if (!recursive) {
				decls.push({
					selector: selector,
					props: props
				});
			}

			var selector = self._buildSelector(selector);

			$.each(props, function(key, fn) {
				if (typeof fn == 'function') {
					
					if (key.indexOf('on') == 0) {
						var event = key.replace(/^on/, '').toLowerCase();
						
						$(selector).on(event, function(e) {
							var args = Array.prototype.slice.call(arguments);
							var $this = $(this); $this.selector = selector;
							
							args.unshift($this);
							e.stopPropagation();
							return fn.apply(scope, args);
						});

					}
					else if (key.indexOf('live') == 0) {
						var event = key.replace(/^live/, '').toLowerCase();
						
						$(document).on(event, selector, function(e) {
							var args = Array.prototype.slice.call(arguments);
							var $this = $(this); $this.selector = selector;
							
							args.unshift($this);
							e.stopPropagation();
							return fn.apply(scope, args);
						});
					}
				}
				else if (typeof fn == 'object') {
					var key = key.replace(/[A-Z]/g, '-$&').toLowerCase();
					var block = self._getBlockClass(selector);
					var elem = self._buildElemClass(block, key);
					
					self.decl(elem, fn, scope, 'recursive');
				}
			});

			$(function() {
				$(selector).trigger('init');
			});
		},


		/**
		 * Reload all declarations.
		 * @protected
		 */
		reload: function() {
			var self = this, _decls = decls;
			decls = [];

			$.each(_decls, function(i, decl) {
				self.decl(decl.selector, decl.props);
			});
		},


		/**
		 * Set base config.
		 * @protected
		 *
		 * @param  {Object}  [updSyntax]  Syntax sugar
		 * @param  {Object}  [updConfig]  Configuration
		 */
		setConfig: function(updSyntax, updConfig) {
			var updSyntax = updSyntax || {},
				updConfig = updConfig || {}
			;

			syntax = $.extend(defaults.syntax, updSyntax);
			config = $.extend(defaults.config, updConfig);
		},


		/**
		 * Get parent block of element or
		 * get siblings of element.
		 * @protected
		 *
		 * @param  {Object}  $this  Element
		 * @param  {String}  elem   Nested element
		 * @return {Object}
		 */
		getBlock: function($this, elem) {
			var elem = elem || null,
				blockClass = this._getBlockClass($this),
				block = $this.closest('.' + blockClass)
				block.selector = blockClass;
			;
			
			if (elem) {
				return block.elem(elem);
			}

			return block;
		},


		/**
		 * Switch block context.
		 *
		 * @param  {Object}  $this   DOM element
		 * @param  {String}  block   Block name
		 * @param  {String}  [elem]  Element name
		 * @return {Object}
		 */
		switchBlock: function($this, block, elem) {
			var elem = elem || null;

			elem?
				$this.selector = bem._buildSelector({ block: block, elem: elem }):
				$this.selector = bem._buildSelector({ block: block })
			;

			return $this;
		},


		/**
		 * Find element in block.
		 * @protected
		 *
		 * @param  {Object}  $this    DOM element
		 * @param  {String}  elemKey  Element name
		 * @return {Object}
		 */
		findElem: function($this, elemKey) {
			var self = this,
				blockClass = self._getBlockClass($this)
			;

			var elemName = self._buildElemClass(blockClass, elemKey);
			var elem = $this.find('.' + elemName);

			return elem;
		},


		/**
		 * Get value of modifier.
		 * @protected
		 *
		 * @param  {Object}  $this   DOM element
		 * @param  {String}  modKey  Modifier key
		 * @return {String}
		 */
		getMod: function($this, modKey) {
			var mods = this._extractMods($this.first());
			
			if (mods[modKey] != undefined) return mods[modKey];
			return null;
		},


		/**
		 * Check modifier of element.
		 * @protected
		 *
		 * @param  {Object}  $this     DOM element
		 * @param  {String}  modKey    Modifier key
		 * @param  {String}  [modVal]  Modifier value
		 * @return {Bool}
		 */
		hasMod: function($this, modKey, modVal) {
			var mods = this._extractMods($this.first()),
				modVal = modVal || null
			;

			if (modVal) {
				if (mods[modKey] == modVal) return true;
			}
			else {
				if (mods[modKey] != undefined) return true;
			}

			return false;
		},


		/**
		 * Set modifier on element.
		 * @protected
		 *
		 * @param  {Object}  $this     DOM element
		 * @param  {String}  modKey    Modifier key
		 * @param  {String}  [modVal]  Modifier value
		 * @param  {Object}
		 */
		setMod: function($this, modKey, modVal) {
			var self = this,
				modVal = modVal || syntax.defaultModVal,
				selector = $this.selector
			;

			$this.each(function() {
				var current = $(this);
				current.selector = selector;

				var	mods = self._extractMods(current),
					baseName = self._getBaseClass(current)
				;

				if (mods[modKey] != undefined) {
					var oldModName = self._buildModClass(baseName, modKey, mods[modKey]);
					current.removeClass(oldModName);
				}

				var newModName = self._buildModClass(baseName, modKey, modVal);
				
				current
					.addClass(newModName)
					.trigger('setmod', [modKey, modVal])
				;
			});
			
			return $this;
		},


		/**
		 * Delete modifier on element.
		 * @protected
		 *
		 * @param  {Object}  $this     DOM element
		 * @param  {String}  modKey    Modifier key
		 * @param  {String}  [modVal]  Modifier value
		 * @param  {Object}
		 */
		delMod: function($this, modKey, modVal) {
			var self = this,
				modVal = modVal || null,
				selector = $this.selector
			;

			$this.each(function() {
				var current = $(this);
				current.selector = selector;

				var mods = self._extractMods(current),
					baseName = self._getBaseClass(current)
				;

				if (modVal) {
					if (mods[modKey] == modVal) {
						var modName = self._buildModClass(baseName, modKey, mods[modKey]);
						
						current
							.removeClass(modName)
							.trigger('delmod', [modKey, modVal])
						;
					}
				}
				else {
					if (mods[modKey] != undefined) {
						var modName = self._buildModClass(baseName, modKey, mods[modKey]);
						
						current
							.removeClass(modName)
							.trigger('delmod', [modKey, modVal])
						;
					}
				}
			});

			return $this;
		},


		/**
		 * Toggle modifier on element.
		 * @protected
		 *
		 * @param  {Object}  $this     DOM element
		 * @param  {String}  modKey    Modifier key
		 * @param  {String}  [modVal]  Modifier value
		 * @param  {Object}
		 */
		toggleMod: function($this, modKey, modVal) {
			var modVal = modVal || null;

			$this.each(function() {
				$this.hasMod(modKey)?
					$this.delMod(modKey, modVal):
					$this.setMod(modKey, modVal)
				;
			});

			return $this;
		},


		/**
		 * Filtering elements by modifier.
		 * @prodtected
		 *
		 * @param  {Object}  $this      DOM element
		 * @param  {String}  modKey     Modifier key
		 * @param  {String}  [modVal]   Modifier value
		 * @param  {Bool}    [inverse]  Use .not() instead .filter()
		 * @param  {Object}
		 */
		byMod: function($this, modKey, modVal, inverse) {
			var self = this,
				modVal = modVal || null,
				inverse = inverse || false,
				selector = $this.selector,
				result = $()
			;

			$this.each(function() {
				var current = $(this);
				current.selector = selector;

				var mods = self._extractMods(current),
					baseName = self._getBaseClass(current)
				;

				if (modVal) {
					if (mods[modKey] == modVal) {
						var modName = self._buildModClass(baseName, modKey, mods[modKey]);
					}
				}
				else {
					if (mods[modKey] != undefined) {
						var modName = self._buildModClass(baseName, modKey, mods[modKey]);
					}
				}

				result = result.add(inverse?
					current.not('.' + modName) :
					current.filter('.' + modName)
				);
			});

			result.selector = selector;
			return result;
		},


		/**
		 * Get block names from element.
		 * @protected
		 *
		 * @param  {Object|String}  $this  DOM element
		 * @return {Object}
		 */
		_extractBlocks: function($this) {
			var self = this, result = [];
			var selectors = this._getClasses($this);
			
			$.each(selectors, function(i, sel) {
				var type = self._getClassType(sel);

				if (type == 'block') {
					result.push(sel);
				}
				else if (type == 'elem') {
					var elem = sel.split(syntax.elemPrefix);
					result.push(elem[0]);
				}
			});

			return result;
		},


		/**
		 * Get element names from element.
		 * @protected
		 *
		 * @param  {Object}  $this  DOM element
		 * @return {Object}
		 */
		_extractElems: function($this) {
			var self = this, result = [];

			$.each(self._getClasses($this), function(i, className) {
				if (self._getClassType(className) == 'elem') {
					var elemName = className.split(syntax.elemPrefix);
					result.push(elemName[1]);
				}
			});

			return result;
		},


		/**
		 * Get modifiers from element.
		 * @protected
		 *
		 * @param  {Object}  $this  DOM element
		 * @return {Object}
		 */
		_extractMods: function($this) {
			var self = this, result = {};

			$this.each(function() {
				var $this = $(this);
				
				$.each(self._getClasses($this), function(i, className) {
					if (self._getClassType(className) == 'mod') {
						var re = self._buildModClassRe().exec(className);
						var modName = re[1].split(syntax.modDlmtr);

						result[ modName[0] ] = modName[1];
					}
				});
			});
			
			return result;
		},


		/**
		 * Get classes names from element.
		 * @protected
		 *
		 * @param  {Object}  $this  DOM element
		 * @return {Object}
		 */
		_getClasses: function($this) {
			var classes, result = [];

			if (typeof $this == 'object') {
				
				if ($this.selector != '') {
					classes = $this.selector.split('.');
				}
				else if ($this.attr('class') != undefined) {
					classes = $this.attr('class').split(' ');
				}
				else {
					return null;
				}

			}
			else {
				classes = $this.split('.');
			}
			
			$.each(classes, function(i, className) {
				if (className != '') result.push(className.trim());
			});
			
			return result;
		},


		/**
		 * Build regexp for blocks.
		 * @protected
		 *
		 * @return {RegExp}
		 */
		_buildBlockClassRe: function() {
			return new RegExp(
				syntax.namePrefix + '(' + syntax.namePattern + ')$'
			);
		},


		/**
		 * Build regexp for elements.
		 * @protected
		 *
		 * @return {RegExp}
		 */
		_buildElemClassRe: function() {
			return new RegExp(
				syntax.namePrefix + syntax.namePattern + syntax.elemPrefix + '(' + syntax.namePattern + ')$'
			);
		},


		/**
		 * Build regexp for modifiers.
		 * @protected
		 *
		 * @return {RegExp}
		 */
		_buildModClassRe: function() {
			return new RegExp(
				syntax.namePrefix + '.*' + syntax.modPrefix + '(' + syntax.namePattern + syntax.modDlmtr + syntax.namePattern + ')$'
			);
		},


		/**
		 * Build class name for block.
		 * @protected
		 *
		 * @param  {String}  blockName  Block name
		 * @return {String}
		 */
		_buildBlockClass: function(blockName) {
			return blockName;
		},


		/**
		 * Build class name for element.
		 * @protected
		 *
		 * @param  {String}  blockName  Block name
		 * @param  {String}  elemKey    Element name
		 * @return {String}
		 */
		_buildElemClass: function(blockName, elemKey) {
			return blockName + syntax.elemPrefix + elemKey;
		},


		/**
		 * Build class name for modifier.
		 * @protected
		 *
		 * @param  {String}  blockName  Block name
		 * @param  {String}  modKey     Modifier key
		 * @param  {String}  modVal     Modifier value
		 * @return {String}
		 */
		_buildModClass: function(baseClass, modKey, modVal) {
			return baseClass + syntax.modPrefix + modKey + syntax.modDlmtr + modVal;
		},


		/**
		 * Build selector from object or string for declarator.
		 * @private
		 *
		 * @param  {String|Object}  Selector name
		 * @param  {String}         Selector prefix
		 * @return {String}
		 */
		_buildSelector: function(selector, prefix) {
			if (prefix !== '') {
				var prefix = prefix || '.';
			}

			if (typeof selector == 'object') {
				if (selector.block != undefined) {
					var buildSelector = this._buildBlockClass(selector.block);
					
					if (selector.elem != undefined) {
						buildSelector = this._buildElemClass(buildSelector, selector.elem);
					}
					
					if (selector.mod != undefined) {
						var mod = selector.mod.split(':');
						buildSelector = this._buildModClass(buildSelector, mod[0], mod[1]);
					}
				}
			}

			return buildSelector != undefined?
				prefix + buildSelector:
				prefix + selector
			;
		},


		/**
		 * Build class name for block.
		 * @protected
		 *
		 * @param  {Object|String}  $this    DOM element or class names
		 * @param  {Integer}        [index]  Main class index 
		 * @return {String}
		 */
		_getBlockClass: function($this, index) {
			var blockClasses = this._extractBlocks($this);
			
			if (index !== 0) {
				var index = index || blockClasses.length - 1;
			}

			return index <= blockClasses.length - 1?
				blockClasses[index] : null
			;
		},


		/**
		 * Get base class from element.
		 * @protected
		 *
		 * @param  {Object}  $this  DOM element
		 * @return {String}
		 */
		_getBaseClass: function($this) {
			var self = this, baseClass = null;
			var selectors = this._getClasses($this);

			$.each(selectors, function(i, sel) {
				var classType = self._getClassType(sel);

				if (classType && classType != 'mod') {
					baseClass = sel;
				}
			});

			return baseClass;
		},


		/**
		 * Get class type.
		 * @protected
		 *
		 * @param  {String}  className  Class name
		 * @return {String}
		 */
		_getClassType: function(className) {

			if (this._buildModClassRe().test(className)) {
				return 'mod';
			}
			
			else if (this._buildElemClassRe().test(className)) {
				return 'elem';
			}
			
			else if (this._buildBlockClassRe().test(className)) {
				return 'block';
			}

			return null;
		}

	};

	bem.init();
	
})(jQuery, undefined);



(function($, undefined) {

	$.fn.extend({
		root: function(elem) {
			return bem.getBlock(this, elem);
		},
		
		elem: function(elemKey) {
			return bem.findElem(this, elemKey);
		},

		switch: function(block, elem) {
			return bem.switchBlock(this, block, elem);
		},
		
		getMod: function(modKey) {
			return bem.getMod(this, modKey);
		},
		
		hasMod: function(modKey, modVal) {
			return bem.hasMod(this, modKey, modVal);
		},
		
		setMod: function(modKey, modVal) {
			return bem.setMod(this, modKey, modVal);
		},
		
		delMod: function(modKey, modVal) {
			return bem.delMod(this, modKey, modVal);
		},
		
		toggleMod: function(modKey, modVal) {
			return bem.toggleMod(this, modKey, modVal);
		},
		
		byMod: function(modKey, modVal) {
			return bem.byMod(this, modKey, modVal);
		},
		
		byNotMod: function(modKey, modVal) {
			return bem.byMod(this, modKey, modVal, 'inverse');
		}
	});

})(jQuery, undefined);
