import moxie from 'moxie';
const { Basic, Events, Dom, Mime, I18n, Url, Env } = moxie;
const { guid, typeOf, each, extend, extendImmutable, parseSizeStr, delay, extendIf, sprintf, isEmptyObj, toArray, inArray, inSeries, inParallel, clone } = Basic;
const { addEvent, removeEvent, removeAllEvents } = Events;
const { mimes2extList } = Mime;
const { get, getStyle, addClass, removeClass, hasClass, getPos, getSize } = Dom
const { translate, addI18n } = I18n;
const { resolveUrl } = Url;
const ua = Env;

/**
 * Cleans the specified name from national characters (diacritics). The result will be a name with only a-z, 0-9 and _.
 *
 * @method cleanName
 * @static
 * @param {String} s String to clean up.
 * @return {String} Cleaned string.
 */
const cleanName = function (name: string): string {
    let i, lookup;

    // Replace diacritics
    lookup = [
        /[\300-\306]/g, 'A', /[\340-\346]/g, 'a',
        /\307/g, 'C', /\347/g, 'c',
        /[\310-\313]/g, 'E', /[\350-\353]/g, 'e',
        /[\314-\317]/g, 'I', /[\354-\357]/g, 'i',
        /\321/g, 'N', /\361/g, 'n',
        /[\322-\330]/g, 'O', /[\362-\370]/g, 'o',
        /[\331-\334]/g, 'U', /[\371-\374]/g, 'u'
    ];

    for (i = 0; i < lookup.length; i += 2) {
        name = name.replace(lookup[i], lookup[i + 1]);
    }

    // Replace whitespace
    name = name.replace(/\s+/g, '_');

    // Remove anything else
    name = name.replace(/[^a-z0-9_\-\.]+/gi, '');

    return name;
}

/**
 * Builds a full url out of a base URL and an object with items to append as query string items.
 *
 * @method buildUrl
 * @static
 * @param {String} url Base URL to append query string items to.
 * @param {Object} items Name/value object to serialize as a querystring.
 * @return {String} String with url + serialized query string items.
 */
const buildUrl = function (url: string, items) {
    let query = '';

    each(items, function (value, name) {
        query += (query ? '&' : '') + encodeURIComponent(name) + '=' + encodeURIComponent(value);
    });

    if (query) {
        url += (url.indexOf('?') > 0 ? '&' : '?') + query;
    }

    return url;
}

/**
 * Formats the specified number as a size string for example 1024 becomes 1 KB.
 *
 * @method formatSize
 * @static
 * @param {Number} size Size to format as string.
 * @return {String} Formatted size string.
 */
const formatSize = function (size) {
    let self = this;

    function round(num, precision) {
        return Math.round(num * Math.pow(10, precision)) / Math.pow(10, precision);
    }

    size = parseInt(size, 10);
    if (isNaN(size)) {
        return self.translate('N/A');
    }

    let boundary = Math.pow(1024, 4);

    // TB
    if (size > boundary) {
        return round(size / boundary, 1) + " " + self.translate('tb');
    }

    // GB
    if (size > (boundary /= 1024)) {
        return round(size / boundary, 1) + " " + self.translate('gb');
    }

    // MB
    if (size > (boundary /= 1024)) {
        return round(size / boundary, 1) + " " + self.translate('mb');
    }

    // KB
    if (size > 1024) {
        return Math.round(size / 1024) + " " + self.translate('kb');
    }

    return size + " " + self.translate('b');
}

/**
 * Get array of DOM Elements by their ids.
 *
 * @method get
 * @param {String} id Identifier of the DOM Element
 * @return {Array}
 */
const getAll = function get(ids) {
    let els = [],
        el;

    if (typeOf(ids) !== 'array') {
        ids = [ids];
    }

    let i = ids.length;
    while (i--) {
        el = get(ids[i]);
        if (el) {
            els.push(el);
        }
    }

    return els.length ? els : null;
}


/**
 * Encodes the specified string.
 *
 * @method xmlEncode
 * @static
 * @param {String} s String to encode.
 * @return {String} Encoded string.
 */
const xmlEncode = function (str) {
    let xmlEncodeChars = {
        '<': 'lt',
        '>': 'gt',
        '&': 'amp',
        '"': 'quot',
        '\'': '#39'
    },
        xmlEncodeRegExp = /[<>&\"\']/g;

    return str ? ('' + str).replace(xmlEncodeRegExp, function (chr) {
        return xmlEncodeChars[chr] ? '&' + xmlEncodeChars[chr] + ';' : chr;
    }) : str;
}

export {

    /**
     * In some cases sniffing is the only way around :(
     */
    ua,

    /**
     * Gets the true type of the built-in object (better version of typeof).
     * @credits Angus Croll (http://javascriptweblog.wordpress.com/)
     *
     * @method typeOf
     * @static
     * @param {Object} o Object to check.
     * @return {String} Object [[Class]]
     */
    typeOf,

    clone,


    /**
     * Extends the specified object with another object.
     *
     * @method extend
     * @static
     * @param {Object} target Object to extend.
     * @param {Object..} obj Multiple objects to extend with.
     * @return {Object} Same as target, the extended object.
     */
    extend,


    extendImmutable,

    /**
    Extends the specified object with another object(s), but only if the property exists in the target.

    @method extendIf
    @static
    @param {Object} target Object to extend.
    @param {Object} [obj]* Multiple objects to extend with.
    @return {Object} Same as target, the extended object.
    */
    extendIf,

    /**
    Recieve an array of functions (usually async) to call in sequence, each  function
    receives a callback as first argument that it should call, when it completes. Finally,
    after everything is complete, main callback is called. Passing truthy value to the
    callback as a first argument will interrupt the sequence and invoke main callback
    immediately.

    @method inSeries
    @static
    @param {Array} queue Array of functions to call in sequence
    @param {Function} cb Main callback that is called in the end, or in case of error
    */
    inSeries,

    /**
    Recieve an array of functions (usually async) to call in parallel, each  function
    receives a callback as first argument that it should call, when it completes. After
    everything is complete, main callback is called. Passing truthy value to the
    callback as a first argument will interrupt the process and invoke main callback
    immediately.

    @method inParallel
    @static
    @param {Array} queue Array of functions to call in sequence
    @param {Function} cb Main callback that is called in the end, or in case of erro
    */
    inParallel,

    /**
     * Generates an unique ID. This is 99.99% unique since it takes the current time and 5 random numbers.
     * The only way a user would be able to get the same ID is if the two persons at the same exact millisecond manages
     * to get 5 the same random numbers between 0-65535 it also uses a counter so each call will be guaranteed to be page unique.
     * It's more probable for the earth to be hit with an asteriod. You can also if you want to be 100% sure set the plupload.guidPrefix property
     * to an user unique key.
     *
     * @method guid
     * @static
     * @return {String} Virtually unique id.
     */
    guid,

    cleanName,
    getAll,
    buildUrl,
    formatSize,

    /**
    Get DOM element by id

    @method get
    @param {String} id Identifier of the DOM Element
    @return {Node}
    */
    get,

    /**
     * Executes the callback function for each item in array/object. If you return false in the
     * callback it will break the loop.
     *
     * @method each
     * @static
     * @param {Object} obj Object to iterate.
     * @param {function} callback Callback function to execute for each item.
     */
    each,

    /**
     * Returns the absolute x, y position of an Element. The position will be returned in a object with x, y fields.
     *
     * @method getPos
     * @static
     * @param {Element} node HTML element or element id to get x, y position from.
     * @param {Element} root Optional root element to stop calculations at.
     * @return {object} Absolute position of the specified element object with x, y fields.
     */
    getPos,

    /**
     * Returns the size of the specified node in pixels.
     *
     * @method getSize
     * @static
     * @param {Node} node Node to get the size of.
     * @return {Object} Object with a w and h property.
     */
    getSize,

    xmlEncode,

    /**
     * Forces anything into an array.
     *
     * @method toArray
     * @static
     * @param {Object} obj Object with length field.
     * @return {Array} Array object containing all items.
     */
    toArray,

    /**
     * Find an element in array and return its index if present, otherwise return -1.
     *
     * @method inArray
     * @static
     * @param {mixed} needle Element to find
     * @param {Array} array
     * @return {Int} Index of the element, or -1 if not found
     */
    inArray,

    /**
     * Extends the language pack object with new items.
     *
     * @method addI18n
     * @static
     * @param {Object} pack Language pack items to add.
     * @return {Object} Extended language pack object.
     */
    addI18n,

    /**
     * Translates the specified string by checking for the english string in the language pack lookup.
     *
     * @method translate
     * @static
     * @param {String} str String to look for.
     * @return {String} Translated string or the input string if it wasn't found.
     */
    translate,

    /**
     * Pseudo sprintf implementation - simple way to replace tokens with specified values.
     *
     * @param {String} str String with tokens
     * @return {String} String with replaced tokens
     */
    sprintf,

    /**
     * Checks if object is empty.
     *
     * @method isEmptyObj
     * @static
     * @param {Object} obj Object to check.
     * @return {Boolean}
     */
    isEmptyObj,

    /**
     * Checks if specified DOM element has specified class.
     *
     * @method hasClass
     * @static
     * @param {Object} obj DOM element like object to add handler to.
     * @param {String} name Class name
     */
    hasClass,

    /**
     * Adds specified className to specified DOM element.
     *
     * @method addClass
     * @static
     * @param {Object} obj DOM element like object to add handler to.
     * @param {String} name Class name
     */
    addClass,

    /**
     * Removes specified className from specified DOM element.
     *
     * @method removeClass
     * @static
     * @param {Object} obj DOM element like object to add handler to.
     * @param {String} name Class name
     */
    removeClass,

    /**
     * Returns a given computed style of a DOM element.
     *
     * @method getStyle
     * @static
     * @param {Object} obj DOM element like object.
     * @param {String} name Style you want to get from the DOM element
     */
    getStyle,

    /**
     * Adds an event handler to the specified object and store reference to the handler
     * in objects internal Plupload registry (@see removeEvent).
     *
     * @method addEvent
     * @static
     * @param {Object} obj DOM element like object to add handler to.
     * @param {String} name Name to add event listener to.
     * @param {Function} callback Function to call when event occurs.
     * @param {String} (optional) key that might be used to add specifity to the event record.
     */
    addEvent,

    /**
     * Remove event handler from the specified object. If third argument (callback)
     * is not specified remove all events with the specified name.
     *
     * @method removeEvent
     * @static
     * @param {Object} obj DOM element to remove event listener(s) from.
     * @param {String} name Name of event listener to remove.
     * @param {Function|String} (optional) might be a callback or unique key to match.
     */
    removeEvent,

    /**
     * Remove all kind of events from the specified object
     *
     * @method removeAllEvents
     * @static
     * @param {Object} obj DOM element to remove event listeners from.
     * @param {String} (optional) unique key to match, when removing events.
     */
    removeAllEvents,

    /**
     * @private
     */
    mimes2extList,

    /**
    Resolve url - among other things will turn relative url to absolute

    @method resolveUrl
    @static
    @param {String|Object} url Either absolute or relative, or a result of parseUrl call
    @return {String} Resolved, absolute url
    */
    resolveUrl,

    /**
     * Parses the specified size string into a byte value. For example 10kb becomes 10240.
     *
     * @method parseSize
     * @static
     * @param {String|Number} size String to parse or number to just pass through.
     * @return {Number} Size in bytes.
     */
    parseSizeStr,

    delay
}