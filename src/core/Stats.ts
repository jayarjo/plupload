/**
@class plupload.core.Stats
@constructor
@private
*/

export class Stats {
	/**
	 * Total queue file size.
	 *
	 * @property size
	 * @deprecated use total
	 * @type Number
	 */
	size = 0;

	/**
	 * Total size of the queue in units.
	 *
	 * @property total
	 * @since 3.0
	 * @type Number
	 */
	total = 0;

	/**
	 * Total units processed.
	 *
	 * @property processed
	 * @type Number
	 */
	processed = 0;
	loaded = 0; // deprecated


	/**
	 * Number of files uploaded successfully.
	 *
	 * @property uploaded
	 * @deprecated use done
	 * @type Number
	 */
	uploaded = 0;

	/**
	 * Number of items processed successfully.
	 *
	 * @property done
	 * @since 3.0
	 * @type Number
	 */
	done = 0;

	/**
	 * Number of failed items.
	 *
	 * @property failed
	 * @type Number
	 */
	failed = 0;

	/**
	 * Number of items yet to be processed.
	 *
	 * @property queued
	 * @type Number
	 */
	queued = 0;

	/**
	 * Number of items currently paused.
	 *
	 * @property paused
	 * @type Number
	 */
	paused = 0;

	/**
	 * Number of items being processed.
	 *
	 * @property processing
	 * @type Number
	 */
	processing = 0;


	/**
	 * Percent of processed units.
	 *
	 * @property percent
	 * @type Number
	 */
	percent = 0;

	/**
	 * Bytes processed per second.
	 *
	 * @property bytesPerSec
	 * @deprecated use processedPerSec
	 * @type Number
	 */
	bytesPerSec = 0;

	/**
	 * Units processed per second.
	 *
	 * @property processedPerSec
	 * @since 3.0
	 * @type Number
	 */
	processedPerSec = 0;

	/**
	 * Resets the progress to its initial values.
	 *
	 * @method reset
	 */
	reset() {
		this.size = // deprecated
		this.total =
		this.loaded = // deprecated
		this.processed =
		this.uploaded = // deprecated
		this.done =
		this.failed =
		this.queued =
		this.processing =
		this.paused =
		this.percent =
		this.bytesPerSec = // deprecated
		this.processedPerSec = 0;
	}
}