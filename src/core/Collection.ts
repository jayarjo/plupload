/**
 * Collection.js
 *
 * Copyright 2017, Ephox
 * Released under AGPLv3 License.
 *
 * License: http://www.plupload.com/license
 * Contributing: http://www.plupload.com/contributing
 */

import { each } from './Utils';

/**
Helper collection class - in a way a mix of object and array

@contsructor
@class plupload.core.Collection
@private
*/
export default class Collection {
    private _registry: NameValue = {};
    private _length = 0;
    private _last;

    count() {
        return this._length;
    }

    hasKey(key: string) {
        return this._registry.hasOwnProperty(key)
    }

    get(key: string) {
        return this._registry[key];
    }

    first() {
        for (let key in this._registry) {
            return this._registry[key];
        }
    }

    last() {
        return this._last;
    }

    toObject() {
        return this._registry;
    }

    add(key: string, obj: any = null) {
        let self = this;

        if (self._registry.hasOwnProperty(key)) {
            return self.update.apply(self, arguments);
        }

        self._registry[key] = self._last = obj;
        self._length++;
    }

    addMany(obj: NameValue) {
        const self = this;
        return each(obj, function (obj, key) {
            self.add(key, obj);
        });
    }

    remove(key: string) {
        if (this.hasKey(key)) {
            let last = this._registry[key];

            delete this._registry[key];
            this._length--;

            // renew ref to the last added item if necessary
            if (this._last === last) {
                this._last = this.findLast();
            }
        }
    }

    extract(key: string) {
        let item = this.get(key);
        this.remove(key);
        return item;
    }

    shift() {
        let self = this,
            first, key;

        for (key in this._registry) {
            first = this._registry[key];
            self.remove(key);
            return first;
        }
    }

    update(key: string, obj: any) {
        this._registry[key] = obj;
    }

    each(cb) {
        each(this._registry, cb);
    }

    combineWith() {
        let newCol = new Collection();

        newCol.addMany(this._registry);

        each(arguments, function (col) {
            if (col instanceof Collection) {
                newCol.addMany(col.toObject());
            }
        });
        return newCol;
    }

    clear() {
        this._registry = {};
        this._last = null;
        this._length = 0;
    }

    private findLast() {
        let key;
        for (key in this._registry) {}
        return this._registry[key];
    }

};

