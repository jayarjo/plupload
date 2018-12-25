import { Queueable } from './Queueable';
/**
 * ArrCollection.js
 *
 * Copyright 2017, Ephox
 * Released under AGPLv3 License.
 *
 * License: http://www.plupload.com/license
 * Contributing: http://www.plupload.com/contributing
 */

import plupload from 'plupload';
const { typeOf, each } = plupload;

/**
@contsructor
@class plupload.core.ArrCollection
@private
*/
export class ArrCollection {

    private _registry: Queueable[] = [];

    count() {
        return this._registry.length;
    }

    hasKey(key: string) {
        return this.getIdx(key) > -1;
    }

    get(key: string) {
        let idx = this.getIdx(key);
        return idx > -1 ? this._registry[idx] : null;
    }

    getIdx(key: string) {
        for (let i = 0, length = this._registry.length; i < length; i++) {
            if (this._registry[i].uid === key) {
                return i;
            }
        }
        return -1;
    }

    getByIdx(idx: number) {
        return this._registry[idx]
    }

    first() {
        return this._registry[0];
    }

    last() {
        return this._registry[this._registry.length - 1];
    }

    add(obj: Queueable) {
        let idx = this.getIdx(obj.uid);
        if (idx > -1) {
            this._registry[idx] = obj;
            return idx;
        }

        this._registry.push(obj);
        return this._registry.length - 1;
    }

    remove(key: string) {
        return !!this.extract(key);
    }

    splice(start?: number, length?: number) {
        start = typeOf(start) === 'undefined' ? 0 : Math.max(start, 0);
        length = typeOf(length) !== 'undefined' && start + length < this._registry.length ? length : this._registry.length - start;

        return this._registry.splice(start, length);
    }

    extract(key: string) {
        let idx = this.getIdx(key);
        if (idx > -1) {
            return this._registry.splice(idx, 1);
        }
        return null;
    }

    shift() {
        return this._registry.shift();
    }

    update(key: string, obj) {
        let idx = this.getIdx(key);
        if (idx > -1) {
            this._registry[idx] = obj;
            return true;
        }
        return false;
    }

    each(cb) {
        each(this._registry, cb);
    }

    combineWith() {
        return Array.prototype.concat.apply(this.toArray(), arguments);
    }

    sort(cb?: SortFunc) {
        this._registry.sort(cb || ((a, b) => a.priority - b.priority));
    }

    clear() {
        this._registry = [];
    }

    toObject() {
        let obj = {};
        for (let i = 0, length = this._registry.length; i < length; i++) {
            obj[this._registry[i].uid] = this._registry[i];
        }
        return obj;
    }

    toArray() {
        return Array.prototype.slice.call(this._registry);
    }
}