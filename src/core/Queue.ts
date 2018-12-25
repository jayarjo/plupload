/**
 * Queue.js
 *
 * Copyright 2017, Ephox
 * Released under AGPLv3 License.
 *
 * License: http://www.plupload.com/license
 * Contributing: http://www.plupload.com/contributing
 */

import plupload from 'plupload';
import { Stats } from './Stats';
import { ArrCollection } from './ArrCollection';
import { Queueable } from './Queueable';
const { extend, delay } = plupload;


/**
@contsructor
@class plupload.core.Queue
@private
*/
let dispatches = [
    /**
     * Dispatched as soon as activity starts
     *
     * @event started
     * @param {Object} event
     */
    'Started',


    /**
     * Dispatched as activity progresses
     *
     * @event progress
     * @param {Object} event
     * @param {Number} processed
     * @param {Number} total
     * @param {plupload.core.Stats} stats
     */
    'Progress',

    /**
     * Dispatched when activity is paused
     *
     * @event paused
     * @param {Object} event
     */
    'Paused',

    /**
     * Dispatched when there's no more items in processing
     *
     * @event done
     * @param {Object} event
     */
    'Done',

    /**
     * Dispatched as soon as activity ends
     *
     * @event stopped
     * @param {Object} event
     */
    'Stopped',

    /**
     * Dispatched when queue is destroyed
     *
     * @event destroy
     * @param {Object} event
     */
    'Destroy'
];

/**
 * @class Queue
 * @constructor
 * @extends EventTarget
 */
export class Queue extends Queueable {
    /**
     @property stats
    @type {Stats}
    @readOnly
    */
    stats = new Stats();

    /**
     @property _queue
     @type {Collection}
     @private
     */
    protected _queue = new ArrCollection();

    protected _options = {
        max_slots: 1,
        max_retries: 0,
        auto_start: false,
        finish_active: false
    };

    constructor(options) {
        super(options);
    }

    /**
     * Returns number of items in the queue
     *
     * @method count
     * @returns {Number}
     */
    count() {
        return this._queue.count();
    }

    /**
     * Start the queue
     *
     * @method start
     */
    start() {
        if (!super.start.call(this)) {
            return false;
        }
        return this.processNext();
    }


    pause() {
        if (!super.pause.call(this)) {
            return false;
        }
        this.forEachItem((item) => item.stop());
    }

    /**
     * Stop the queue. If `finish_active=true` the queue will wait until active items are done, before
     * stopping.
     *
     * @method stop
     */
    stop() {
        if (!super.stop.call(this) || this.getOption('finish_active')) {
            return false;
        }
        if (this.isActive()) {
            this.forEachItem((item) => item.stop());
        }
    }

    forEachItem(cb) {
        this._queue.each(cb);
    }


    getItem(uid) {
        return this._queue.get(uid);
    }

    /**
     * Add instance of Queueable to the queue. If `auto_start=true` queue will start as well.
     *
     * @method addItem
     * @param {Queueable} item
     */
    addItem(item) {
        item.bind('Started', () => {
            if (this.calcStats()) {
                delay.call(this, this.processNext);
            }
        });

        item.bind('Resumed', () => {
            this.start();
        });

        item.bind('Paused', () => {
            if (this.calcStats()) {
                delay.call(this, () => {
                    if (!this.processNext() && !this.stats.processing) {
                        this.pause();
                    }
                });
            }
        });

        item.bind('Processed Stopped', () => {
            if (this.calcStats()) {
                delay.call(this, () => {
                    if (!this.processNext() && !this.isStopped() && !this.isActive()) {
                        this.stop();
                    }
                });
            }
        });

        item.bind('Progress', () => {
            if (this.calcStats()) {
                this.trigger('Progress', this.stats.processed, this.stats.total, this.stats);
            }
        });

        item.bind('Failed', () => {
            if (this.getOption('max_retries') && this.retries < this.getOption('max_retries')) {
                this.stop();
                this.retries++;
            }
        });

        this._queue.add(item);
        this.calcStats();
        item.trigger('Queued');

        if (this.getOption('auto_start') || this.state === Queueable.PAUSED) {
            delay.call(this, this.start);
        }
    }


    /**
     * Extracts item from the queue by its uid and returns it.
     *
     * @method extractItem
     * @param {String} uid
     * @return {Queueable} Item that was removed
     */
    extractItem(uid) {
        let item = this._queue.get(uid);
        if (item) {
            this.stopItem(item.uid);
            this._queue.remove(uid);
            this.calcStats();
        }
        return item;
    }

    /**
     * Removes item from the queue and destroys it
     *
     * @method removeItem
     * @param {String} uid
     * @returns {Boolean} Result of the operation
     */
    removeItem(uid) {
        let item = this.extractItem(uid);
        if (item) {
            item.destroy();
            return true;
        }
        return false;
    }


    stopItem(uid) {
        let item = this._queue.get(uid);
        if (item) {
            return item.stop();
        } else {
            return false;
        }
    }


    pauseItem(uid) {
        let item = this._queue.get(uid);
        if (item) {
            return item.pause();
        } else {
            return false;
        }
    }


    resumeItem(uid) {
        let item = this._queue.get(uid);
        if (item) {
            delay.call(this, function () {
                this.start(); // start() will know if it needs to restart the queue
            });
            return item.resume();
        } else {
            return false;
        }
    }


    splice(start, length) {
        return this._queue.splice(start, length);
    }


    isActive() {
        return this.stats && (this.stats.processing || this.stats.paused);
    }

    isStopped() {
        return this.state !== Queueable.IDLE && this.state !== Queueable.DESTROYED;
    }


    countSpareSlots() {
        return Math.max(this.getOption('max_slots') - this.stats.processing, 0);
    }


    toArray() {
        return this._queue.toArray();
    }


    clear() {
        if (this.state !== Queueable.IDLE) {
            // stop the active queue first
            this.bindOnce('Stopped', () => this.clear());
            return this.stop();
        } else {
            this._queue.clear();
            this.stats.reset();
        }
    }


    calcStats() {
        let self = this;
        let stats = self.stats;
        let processed = 0;
        let processedDuringThisSession = 0;

        if (!stats) {
            return false; // maybe queue is destroyed
        }

        stats.reset();

        self.forEachItem((item) => {
            switch (item.state) {
                case Queueable.DONE:
                    stats.done++;
                    stats.uploaded = stats.done; // for backward compatibility
                    break;

                case Queueable.FAILED:
                    stats.failed++;
                    break;

                case Queueable.PROCESSING:
                    stats.processing++;
                    break;

                case Queueable.PAUSED:
                    stats.paused++;
                    break;

                default:
                    stats.queued++;
            }

            processed += item.processed;

            if (!item.processedTimestamp || item.processedTimestamp > self.startedTimestamp) {
                processedDuringThisSession += processed;
            }

            stats.processedPerSec = Math.ceil(processedDuringThisSession / ((+new Date() - self.startedTimestamp || 1) / 1000.0));

            stats.processed = processed;
            stats.total += item.total;
            if (stats.total) {
                stats.percent = Math.ceil(stats.processed / stats.total * 100);
            }
        });

        // enable properties inherited from Queueable

        /* TODO: this is good but it currently conflicts with deprecated total property in Uploader
        self.processed = stats.processed;
        self.total = stats.total;
        */
        self.percent = stats.percent;

        // for backward compatibility
        stats.loaded = stats.processed;
        stats.size = stats.total;
        stats.bytesPerSec = stats.processedPerSec;

        return true;
    }


    destroy() {
        if (this.state === Queueable.DESTROYED) {
            return false; // already destroyed
        }

        if (this.state !== Queueable.IDLE) {
            // stop the active queue first
            this.bindOnce('Stopped', () => delay.call(this, this.destroy));
            return this.stop();
        } else {
            this.clear();
            super.destroy.call(this);
            this._queue = this.stats = null;
        }
        return true;
    }

    /**
     * Returns another Queueable.IDLE or Queueable.RESUMED item, or null.
     */
    private getNextIdleItem() {
        let nextItem;
        this.forEachItem((item) => {
            if (item.state === Queueable.IDLE || item.state === Queueable.RESUMED) {
                nextItem = item;
                return false;
            }
        });
        return nextItem ? nextItem : null;
    }


    private processNext() {
        let item;

        if (this.state !== Queueable.PROCESSING && this.state !== Queueable.PAUSED) {
            return false;
        }

        if (this.stats.processing < this.getOption('max_slots')) {
            item = this.getNextIdleItem.call(this);
            if (item) {
                if (item.trigger('beforestart')) {
                    item.setOptions(this.getOptions());
                    return item.start();
                } else {
                    item.pause();
                    // we need to call it sync, otherwise another thread may pick up the same file, while it is processed in beforestart handler
                    this.processNext();
                }
            }
        }
        return false;
    }
}