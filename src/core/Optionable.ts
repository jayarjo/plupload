/**
 * Optionable.js
 *
 * Copyright 2017, Ephox
 * Released under AGPLv3 License.
 *
 * License: http://www.plupload.com/license
 * Contributing: http://www.plupload.com/contributing
 */

import { typeOf, each, inArray, extend, clone, extendImmutable } from 'core/Utils';
import {  } from './Modules';
/**
@contsructor
@class plupload.core.Optionable
@private
@since 3.0
*/

/**
 * Dispatched when option is being changed.
 *
 * @event OptionChanged
 * @param {Object} event
 * @param {String} name Name of the option being changed
 * @param {Mixed} value
 * @param {Mixed} oldValue
 */

/**
 * @class Optionable
 * @constructor
 * @extends EventTarget
 */
export default class Optionable extends EventTarget {

    protected _options: NameValue = {};

    constructor(options = {}) {
        super();
        extend(this._options, options);
    }

    /**
     * Set the value for the specified option(s).
     *
     * @method setOption
     * @since 2.1
     * @param {String|Object} option Name of the option to change or the set of key/value pairs
     * @param {Mixed} [value] Value for the option (is ignored, if first argument is object)
     * @param {Boolean} [mustBeDefined] if truthy, any option that is not in defaults will be ignored
     */
    setOption(option: string, value: any, mustBeDefined: boolean = false) {
        let self = this;
        let oldValue;

        if (mustBeDefined && !self._options.hasOwnProperty(option)) {
            return;
        }

        oldValue = clone(self._options[option]);

        // basically if an option is of type object extend it rather than replace
        if (typeOf(value) === 'object' && typeOf(self._options[option]) === 'object') {
                // having some options as objects was a bad idea, prefixes is the way
            extend(self._options[option], value);
        } else {
            self._options[option] = value;
        }

        self.trigger('OptionChanged', option, value, oldValue);
    }

    /**
     * Get the value for the specified option or the whole configuration, if not specified.
     *
     * @method getOption
     * @since 2.1
     * @param {String} [option] Name of the option to get
     * @return {Mixed} Value for the option or the whole set
     */
    getOption(option: string): any {
        let value = this._options[option];
        if (inArray(typeOf(value), ['array', 'object']) > -1) {
            return extendImmutable({}, value);
        } else {
            return value;
        }
    }


    /**
     * Set many options as once.
     *
     * @method setOptions
     * @param {Object} options
     * @param {Boolean} [mustBeDefined] if truthy, any option that is not in defaults will be ignored
     */
    setOptions(options: NameValue, mustBeDefined: boolean = false) {
        const self = this;
        each(options, function (value, option) {
            self.setOption(option, value, mustBeDefined);
        });
    }


    /**
    Gets all options.

    @method getOptions
    @return {Object}
    */
    getOptions(): NameValue {
        return this._options;
    }

}