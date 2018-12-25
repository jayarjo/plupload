/**
 * Queueable.js
 *
 * Copyright 2017, Ephox
 * Released under AGPLv3 License.se.
 *
 * License: http://www.plupload.com/license
 * Contributing: http://www.plupload.com/contributing
 */

import Optionable from './Optionable';
import { guid, inArray } from 'core/Utils';

/**
Every queue item must have properties, implement methods and fire events defined in this class

@contsructor
@class plupload.core.Queueable
@private
@decorator
@extends EventTarget
*/


const dispatches = [
    /**
     * Dispatched every time the state of queue changes
     *
     * @event statechanged
     * @param {Object} event
     * @param {Number} state New state
     * @param {Number} prevState Previous state
     */
    'statechanged',


    /**
     * Dispatched when the item is put on pending list
     *
     * @event queued
     * @param {Object} event
     */
    'queued',


    /**
     * Dispatched as soon as activity starts
     *
     * @event started
     * @param {Object} event
     */
    'started',


    'paused',


    'resumed',


    'stopped',


    /**
     * Dispatched as the activity progresses
     *
     * @event
     * @param {Object} event
     *      @param {Number} event.percent
     *      @param {Number} [event.processed]
     *      @param {Number} [event.total]
     */
    'progress',


    'failed',


    'done',


    'processed',

    'destroy'
];

export class Queueable extends Optionable {

    static readonly IDLE = 1;
    static readonly PROCESSING = 2;
    static readonly PAUSED = 6;
    static readonly RESUMED = 7;
    static readonly DONE = 5;
    static readonly FAILED = 4;
    static readonly DESTROYED = 8;

    /**
    Unique identifier
    @property uid
    @type {String}
    */
    uid = guid();

    state = Queueable.IDLE;

    processed = 0;
    loaded = 0; // deprecated

    total = 0;

    percent = 0;

    retries = 0;

    /**
    * Can be 0-Infinity - item with higher priority will have well... higher priority
    * @property [priority=0]
    * @type {Number}
    */
    priority = 0;

    startedTimestamp = 0;

    /**
    * Set when item becomes Queueable.DONE or Queueable.FAILED.
    * Used to calculate proper processedPerSec for the queue stats.
    * @property processedTimestamp
    * @type {Number}
    */
    processedTimestamp = 0;

    start() {
        let prevState = this.state;

        if (this.state === Queueable.PROCESSING) {
            return false;
        }

        if (!this.startedTimestamp) {
            this.startedTimestamp = +new Date();
        }

        this.state = Queueable.PROCESSING;
        this.trigger('statechanged', this.state, prevState);
        this.trigger('started');

        return true;
    }


    pause() {
        let prevState = this.state;

        if (inArray(this.state, [Queueable.IDLE, Queueable.RESUMED, Queueable.PROCESSING]) === -1) {
            return false;
        }

        this.processed = this.percent = 0; // by default reset all progress
        this.loaded = this.processed; // for backward compatibility

        this.state = Queueable.PAUSED;
        this.trigger('statechanged', this.state, prevState);
        this.trigger('paused');
        return true;
    }

    resume() {
        let prevState = this.state;

        if (this.state !== Queueable.PAUSED && this.state !== Queueable.RESUMED) {
            return false;
        }

        this.state = Queueable.RESUMED;
        this.trigger('statechanged', this.state, prevState);
        this.trigger('resumed');
        return true;
    }

    stop() {
        let prevState = this.state;

        if (this.state === Queueable.IDLE) {
            return false;
        }

        this.processed = this.percent = 0;
        this.loaded = this.processed; // for backward compatibility

        this.startedTimestamp = 0;

        this.state = Queueable.IDLE;
        this.trigger('statechanged', this.state, prevState);
        this.trigger('stopped');
        return true;
    }

    done(result) {
        let prevState = this.state;

        if (this.state === Queueable.DONE) {
            return false;
        }

        this.processed = this.total;
        this.loaded = this.processed; // for backward compatibility
        this.percent = 100;

        this.processedTimestamp = +new Date();

        this.state = Queueable.DONE;
        this.trigger('statechanged', this.state, prevState);
        this.trigger('done', result);
        this.trigger('processed');
        return true;
    }

    failed(result) {
        let prevState = this.state;

        if (this.state === Queueable.FAILED) {
            return false;
        }

        this.processed = this.percent = 0; // reset the progress
        this.loaded = this.processed; // for backward compatibility

        this.processedTimestamp = +new Date();

        this.state = Queueable.FAILED;
        this.trigger('statechanged', this.state, prevState);
        this.trigger('failed', result);
        this.trigger('processed');
        return true;
    }

    progress(processed, total) {
        if (total) {
            this.total = total; // is this even required?
        }

        this.processed = Math.min(processed, this.total);
        this.loaded = this.processed; // for backward compatibility
        this.percent = Math.ceil(this.processed / this.total * 100);

        this.trigger({
            type: 'progress',
            loaded: this.processed,
            total: this.total
        });
    }

    destroy() {
        let prevState = this.state;

        if (this.state === Queueable.DESTROYED) {
            return false; // already destroyed
        }

        this.state = Queueable.DESTROYED;
        this.trigger('statechanged', this.state, prevState);
        this.trigger('destroy');
        this.unbindAll();
        return true;
    }
}