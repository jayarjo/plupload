/**
 * Uploader.js
 *
 * Copyright 2017, Ephox
 * Released under AGPLv3 License.
 *
 * License: http://www.plupload.com/license
 * Contributing: http://www.plupload.com/contributing
 */


/**
@class plupload.Uploader
@extends plupload.core.Queue
@constructor
@public
@final

@param {Object} settings For detailed information about each option check documentation.
	@param {String|DOMElement} settings.browse_button id of the DOM element or DOM element itself to use as file dialog trigger.
	@param {Number|String} [settings.chunk_size=0] Chunk size in bytes to slice the file into. Shorcuts with b, kb, mb, gb, tb suffixes also supported. `e.g. 204800 or "204800b" or "200kb"`. By default - disabled.
	@param {Boolean} [settings.send_chunk_number=true] Whether to send chunks and chunk numbers, or total and offset bytes.
	@param {String|DOMElement} [settings.container] id of the DOM element or DOM element itself that will be used to wrap uploader structures. Defaults to immediate parent of the `browse_button` element.
	@param {String|DOMElement} [settings.drop_element] id of the DOM element or DOM element itself to use as a drop zone for Drag-n-Drop.
	@param {String} [settings.file_data_name="file"] Name for the file field in Multipart formated message.
	@param {Object} [settings.filters={}] Set of file type filters.
		@param {Array} [settings.filters.mime_types=[]] List of file types to accept, each one defined by title and list of extensions. `e.g. {title : "Image files", extensions : "jpg,jpeg,gif,png"}`. Dispatches `plupload.FILE_EXTENSION_ERROR`
		@param {String|Number} [settings.filters.max_file_size=0] Maximum file size that the user can pick, in bytes. Optionally supports b, kb, mb, gb, tb suffixes. `e.g. "10mb" or "1gb"`. By default - not set. Dispatches `plupload.FILE_SIZE_ERROR`.
		@param {Boolean} [settings.filters.prevent_duplicates=false] Do not let duplicates into the queue. Dispatches `plupload.FILE_DUPLICATE_ERROR`.
	@param {Object} [settings.headers] Custom headers to send with the upload. Hash of name/value pairs.
	@param {String} [settings.http_method="POST"] HTTP method to use during upload (only PUT or POST allowed).
	@param {Number} [settings.max_retries=0] How many times to retry the chunk or file, before triggering Error event.
	@param {Boolean} [settings.multipart=true] Whether to send file and additional parameters as Multipart formated message.
	@param {Boolean} [settings.multi_selection=true] Enable ability to select multiple files at once in file dialog.
	@param {Object} [settings.params] Hash of key/value pairs to send with every file upload.
	@param {Object} [settings.resize] Enable resizing of images on client-side. Applies to `image/jpeg` and `image/png` only. `e.g. {width : 200, height : 200, quality : 90, crop: true}`
		 @param {Number} settings.resize.width Resulting width
		 @param {Number} [settings.resize.height=width] Resulting height (optional, if not supplied will default to width)
		 @param {String} [settings.resize.type='image/jpeg'] MIME type of the resulting image
		 @param {Number} [settings.resize.quality=90] In the case of JPEG, controls the quality of resulting image
		 @param {Boolean} [settings.resize.crop='cc'] If not falsy, image will be cropped, by default from center
		 @param {Boolean} [settings.resize.fit=true] In case of crop whether to upscale the image to fit the exact dimensions
		 @param {Boolean} [settings.resize.preserveHeaders=true] Whether to preserve meta headers (on JPEGs after resize)
		 @param {String} [settings.resize.resample='default'] Resampling algorithm to use during resize
		 @param {Boolean} [settings.resize.multipass=true] Whether to scale the image in steps (results in better quality)
	@param {Boolean} [settings.send_file_name=true] Whether to send file name as additional argument - 'name' (required for chunked uploads and some other cases where file name cannot be sent via normal ways).
	@param {Boolean} [settings.unique_names=false] If true will generate unique filenames for uploaded files.
	@param {String} settings.url URL of the server-side upload handler.
*/

/**
Fires when the current RunTime has been initialized.

@event Init
@param {plupload.Uploader} uploader Uploader instance sending the event.
 */

/**
Fires after the init event incase you need to perform actions there.

@event PostInit
@param {plupload.Uploader} uploader Uploader instance sending the event.
 */

/**
Fires when the option is changed in via uploader.setOption().

@event OptionChanged
@since 2.1
@param {plupload.Uploader} uploader Uploader instance sending the event.
@param {String} name Name of the option that was changed
@param {Mixed} value New value for the specified option
@param {Mixed} oldValue Previous value of the option
 */

/**
Fires when the silverlight/flash or other shim needs to move.

@event Refresh
@param {plupload.Uploader} uploader Uploader instance sending the event.
 */

/**
Fires when the overall state is being changed for the upload queue.

@event StateChanged
@param {plupload.Uploader} uploader Uploader instance sending the event.
 */

/**
Fires when browse_button is clicked and browse dialog shows.

@event Browse
@since 2.1.2
@param {plupload.Uploader} uploader Uploader instance sending the event.
 */

/**
Fires for every filtered file before it is added to the queue.

@event FileFiltered
@since 2.1
@param {plupload.Uploader} uploader Uploader instance sending the event.
@param {plupload.File} file Another file that has to be added to the queue.
 */

/**
Fires when the file queue is changed. In other words when files are added/removed to the files array of the uploader instance.

@event QueueChanged
@param {plupload.Uploader} uploader Uploader instance sending the event.
 */

/**
Fires after files were filtered and added to the queue.

@event FilesAdded
@param {plupload.Uploader} uploader Uploader instance sending the event.
@param {Array} files Array of FileUploader objects that were added to the queue by user.
 */

/**
Fires when file is removed from the queue.

@event FilesRemoved
@param {plupload.Uploader} uploader Uploader instance sending the event.
@param {Array} files Array of files that got removed.
 */

/**
Fires just before a file is uploaded. Can be used to cancel upload of the current file
by returning false from the handler.

@event BeforeUpload
@param {plupload.Uploader} uploader Uploader instance sending the event.
@param {plupload.File} file File to be uploaded.
 */

/**
Fires when a file is to be uploaded by the runtime.

@event UploadFile
@param {plupload.Uploader} uploader Uploader instance sending the event.
@param {plupload.File} file File to be uploaded.
 */

/**
Fires while a file is being uploaded. Use this event to update the current file upload progress.

@event UploadProgress
@param {plupload.Uploader} uploader Uploader instance sending the event.
@param {plupload.File} file File that is currently being uploaded.
 */

/**
Fires when file chunk is uploaded.

@event ChunkUploaded
@param {plupload.Uploader} uploader Uploader instance sending the event.
@param {plupload.File} file File that the chunk was uploaded for.
@param {Object} result Object with response properties.
	@param {Number} result.offset The amount of bytes the server has received so far, including this chunk.
	@param {Number} result.total The size of the file.
	@param {String} result.response The response body sent by the server.
	@param {Number} result.status The HTTP status code sent by the server.
	@param {String} result.responseHeaders All the response headers as a single string.
 */

/**
Fires when a file is successfully uploaded.

@event FileUploaded
@param {plupload.Uploader} uploader Uploader instance sending the event.
@param {plupload.File} file File that was uploaded.
@param {Object} result Object with response properties.
	@param {String} result.response The response body sent by the server.
	@param {Number} result.status The HTTP status code sent by the server.
	@param {String} result.responseHeaders All the response headers as a single string.
 */

/**
Fires when all files in a queue are uploaded

@event UploadComplete
@param {plupload.Uploader} uploader Uploader instance sending the event.
 */


/**
Fires whenever upload is aborted for some reason

@event CancelUpload
@param {plupload.Uploader} uploader Uploader instance sending the event.
 */

/**
Fires when a error occurs.

@event Error
@param {plupload.Uploader} uploader Uploader instance sending the event.
@param {Object} error Contains code, message and sometimes file and other details.
	@param {Number} error.code The plupload error code.
	@param {String} error.message Description of the error (uses i18n).
 */

/**
Fires when destroy method is called.

@event Destroy
@param {plupload.Uploader} uploader Uploader instance sending the event.
 */
define('plupload/Uploader', [
	'plupload',
	'plupload/core/Collection',
	'plupload/core/Queue',
	'plupload/QueueUpload',
	'plupload/QueueResize',
	'plupload/File'
], function(plupload, Collection, Queue, QueueUpload, QueueResize, PluploadFile) {
	var FileInput = plupload.FileInput;
	var FileDrop = plupload.FileDrop;
	var BlobRef = plupload.BlobRef;
	var FileRef = plupload.FileRef;

	var fileFilters = {};
	var undef;


	function Uploader(options) {
		var _fileInputs = [];
		var _fileDrops = [];
		var _queueUpload, _queueResize;
		var _initialized = false;
		var _disabled = false;

		var _options = normalizeOptions(plupload.extend({
			backward_compatibility: true,
			chunk_size: 0,
			file_data_name: 'file',
			filters: {
				mime_types: '*',
				prevent_duplicates: false,
				max_file_size: 0
			},
			// @since 2.3
			http_method: 'POST',
			// headers: false, // Plupload had a required feature with the same name, comment it to avoid confusion
			max_resize_slots: 1,
			max_retries: 0,
			max_upload_slots: 1,
			multipart: true,
			multipart_params: {}, // deprecated, use - params,
			multi_selection: true,
			// @since 3
			params: {},
			resize: false,
			send_chunk_number: true, // whether to send chunks and chunk numbers, instead of total and offset bytes
			send_file_name: true
		}, options));

		Queue.call(this);


		// Add public methods
		plupload.extend(this, {

			_options: _options,

			/**
			 * Unique id for the Uploader instance.
			 *
			 * @property id
			 * @type String
			 */
			id: this.uid,

			/**
			 * Current state of the total uploading progress. This one can either be plupload.STARTED or plupload.STOPPED.
			 * These states are controlled by the stop/start methods. The default value is STOPPED.
			 *
			 * @property state
			 * @type Number
			 */
			state: plupload.STOPPED,

			/**
			 * Object with name/value settings.
			 *
			 * @property settings
			 * @type Object
			 * @deprecated Use `getOption()/setOption()`
			 */
			settings : _options,


			/**
			 * Current upload queue, an array of File instances
			 *
			 * @property files
			 * @deprecated use forEachItem(callback) to cycle over the items in the queue
			 * @type Array
			 */
			files: [],

			/**
			 * Total progess information. How many files has been uploaded, total percent etc.
			 *
			 * @property total
			 * @deprecated use stats
			 */
			total: this.stats,

			/**
			 * Initializes the Uploader instance and adds internal event listeners.
			 *
			 * @method init
			 */
			init: function() {
				var self = this, preinitOpt, err;

				preinitOpt = self.getOption('preinit');
				if (typeof(preinitOpt) == "function") {
					preinitOpt(self);
				} else {
					plupload.each(preinitOpt, function(func, name) {
						self.bind(name, func);
					});
				}

				bindEventListeners.call(self);

				// Check for required options
				plupload.each(['container', 'browse_button', 'drop_element'], function(el) {
					if (self.getOption(el) === null) {
						err = {
							code: plupload.INIT_ERROR,
							message: plupload.sprintf(plupload.translate("%s specified, but cannot be found."), el)
						}
						return false;
					}
				});

				if (err) {
					return self.trigger('Error', err);
				}


				if (!self.getOption('browse_button') && !self.getOption('drop_element')) {
					return self.trigger('Error', {
						code: plupload.INIT_ERROR,
						message: plupload.translate("You must specify either browse_button or drop_element.")
					});
				}


				initControls.call(self, function(initialized) {
					var initOpt = self.getOption('init');
					var queueOpts = plupload.extendImmutable({}, self.getOption(), { auto_start: true });

					if (typeof(initOpt) == "function") {
						initOpt(self);
					} else {
						plupload.each(initOpt, function(func, name) {
							self.bind(name, func);
						});
					}

					if (initialized) {
						_initialized = true;

						_queueUpload = new QueueUpload(queueOpts);
						_queueResize = new QueueResize(queueOpts);

						self.trigger('Init');
						self.trigger('PostInit');
					} else {
						self.trigger('Error', {
							code: plupload.INIT_ERROR,
							message: plupload.translate('Init error.')
						});
					}
				});
			},

			/**
			 * Set the value for the specified option(s).
			 *
			 * @method setOption
			 * @since 2.1
			 * @param {String|Object} option Name of the option to change or the set of key/value pairs
			 * @param {Mixed} [value] Value for the option (is ignored, if first argument is object)
			 */
			setOption: function(option, value) {
				if (_initialized) {
					// following options cannot be changed after initialization
					if (plupload.inArray(option, [
						'container',
						'browse_button',
						'drop_element',
						'multi_selection'
					]) > -1) {
						return this.trigger('Error', {
							code: plupload.OPTION_ERROR,
							message: plupload.sprintf(plupload.translate("%s option cannot be changed.")),
							option: option
						});
					}
				}

				if (typeof(option) !== 'object') {
					value = normalizeOption(option, value, this._options);

					// queues will take in only appropriate options
					if (_queueUpload) {
						_queueUpload.setOption(option, value);
					}
					if (_queueResize) {
						_queueResize.setOption(option, value);
					}
				}

				Uploader.prototype.setOption.call(this, option, value);
			},

			/**
			 * Refreshes the upload instance by dispatching out a refresh event to all runtimes.
			 * This would for example reposition flash/silverlight shims on the page.
			 *
			 * @method refresh
			 */
			refresh: function() {
				plupload.each(_fileInputs, function(fileInput) {
					fileInput.trigger('Refresh');
				});

				this.trigger('Refresh');
			},

			/**
			 * Stops the upload of the queued files.
			 *
			 * @method stop
			 */
			stop: function() {
				if (Uploader.prototype.stop.call(this) && this.state != plupload.STOPPED) {
					this.trigger('CancelUpload');
				}
			},


			/**
			 * Disables/enables browse button on request.
			 *
			 * @method disableBrowse
			 * @param {Boolean} disable Whether to disable or enable (default: true)
			 */
			disableBrowse: function() {
				_disabled = arguments[0] !== undef ? arguments[0] : true;

				plupload.each(_fileInputs, function(fileInput) {
					fileInput.disable(_disabled);
				});

				this.trigger('DisableBrowse', _disabled);
			},

			/**
			 * Returns the specified FileUploader object by id
			 *
			 * @method getFile
			 * @deprecated use getItem()
			 * @param {String} id FileUploader id to look for
			 * @return {plupload.FileUploader}
			 */
			getFile: function(id) {
				return this.getItem(id);
			},

			/**
			 * Adds file to the queue programmatically. Can be native file, instance of Plupload.File,
			 * instance of mOxie.File, input[type="file"] element, or array of these. Fires FilesAdded,
			 * if any files were added to the queue. Otherwise nothing happens.
			 *
			 * @method addFile
			 * @since 2.0
			 * @param {plupload.File|mOxie.File|File|Node|Array} file File or files to add to the queue.
			 * @param {String} [fileName] If specified, will be used as a name for the file
			 */
			addFile: function(file, fileName) {
				var self = this;
				var queue = [];
				var filesAdded = []; // here we track the files that got filtered and are added to the queue


				function bindListeners(fileUp) {
					fileUp.bind('beforestart', function(e) {
						return self.trigger('BeforeUpload', e.target);
					});

					fileUp.bind('startupload', function() {
						self.trigger('UploadFile', this);
					});

					fileUp.bind('progress', function() {
						self.trigger('UploadProgress', this);
					});

					fileUp.bind('done', function(e, args) {
						self.trigger('FileUploaded', this, args);
					});

					fileUp.bind('failed', function(e, err) {
						self.trigger('Error', plupload.extend({
							code: plupload.HTTP_ERROR,
							message: plupload.translate('HTTP Error.'),
							file: this
						}, err));
					});
				}


				function filterFile(file, cb) {
					var queue = [];
					plupload.each(self.getOption('filters'), function(rule, name) {
						if (fileFilters[name]) {
							queue.push(function(cb) {
								fileFilters[name].call(self, rule, file, function(res) {
									cb(!res);
								});
							});
						}
					});
					plupload.inParallel(queue, cb);
				}

				/**
				 * @method resolveFile
				 * @private
				 * @param {mxiFile|mxiBlob|FileUploader|File|Blob|input[type="file"]} file
				 */
				function resolveFile(file) {
					var type = plupload.typeOf(file);

					// mxiFile (final step for other conditional branches)
					if (file instanceof FileRef) {
						queue.push(function(cb) {
							// run through the internal and user-defined filters, if any
							filterFile(file, function(err) {
								var fileUp;

								if (!err) {
									fileUp = new PluploadFile(file, _queueUpload, _queueResize);

									if (fileName) {
										fileUp.name = fileName;
									}

									bindListeners(fileUp);

									self.addItem(fileUp); // make files available for the filters by updating the main queue directly
									filesAdded.push(fileUp);
									self.trigger("FileFiltered", fileUp);
								}

								plupload.delay(cb); // do not build up recursions or eventually we might hit the limits
							});
						});
					}
					// mxiBlob
					else if (file instanceof BlobRef) {
						resolveFile(file.getSource());
						file.destroy();
					}
					// native File or blob
					else if (plupload.inArray(type, ['file', 'blob']) !== -1) {
						resolveFile(new FileRef(null, file));
					}
					// input[type="file"]
					else if (type === 'node' && plupload.typeOf(file.files) === 'filelist') {
						// if we are dealing with input[type="file"]
						plupload.each(file.files, resolveFile);
					}
					// mixed array of any supported types (see above)
					else if (type === 'array') {
						fileName = null; // should never happen, but unset anyway to avoid funny situations
						plupload.each(file, resolveFile);
					}
				}

				resolveFile(file);

				if (queue.length) {
					plupload.inParallel(queue, function() {
						// if any files left after filtration, trigger FilesAdded
						if (filesAdded.length) {
							self.trigger("FilesAdded", filesAdded);
						}
					});
				}
			},

			/**
			 * Removes a specific item from the queue
			 *
			 * @method removeFile
			 * @param {plupload.FileUploader|String} file
			 */
			removeFile: function(file) {
				var item = this.extractItem(typeof(file) === 'string' ? file : file.uid);
				if (item) {
					this.trigger("FilesRemoved", [item]);
					item.destroy();
				}
			},

			/**
			 * Removes part of the queue and returns removed files.
			 * Triggers FilesRemoved and consequently QueueChanged events.
			 *
			 * @method splice
			 * @param {Number} [start=0] Start index to remove from
			 * @param {Number} [length] Length of items to remove
			 */
			splice: function() {
				var i = 0;
				var shouldRestart = plupload.STARTED == this.state;

				var removed = Queue.prototype.splice.apply(this, arguments);
				if (removed.length) {
					this.trigger("FilesRemoved", removed);

					if (shouldRestart) {
						this.stop();
					}

					for (i = 0; i < removed.length; i++) {
						removed[i].destroy();
					}

					if (shouldRestart) {
						this.start();
					}
				}
			},

			/**
			Dispatches the specified event name and its arguments to all listeners.

			@method trigger
			@param {String} name Event name to fire.
			@param {Object..} Multiple arguments to pass along to the listener functions.
			*/

			// override the parent method to match Plupload-like event logic
			dispatchEvent: function(type) {
				var list, args, result;

				type = type.toLowerCase();

				list = this.hasEventListener(type);

				if (list) {
					// sort event list by priority
					list.sort(function(a, b) {
						return b.priority - a.priority;
					});

					// first argument should be current plupload.Uploader instance
					args = [].slice.call(arguments);
					args.shift();
					args.unshift(this);

					for (var i = 0; i < list.length; i++) {
						// Fire event, break chain if false is returned
						if (list[i].fn.apply(list[i].scope, args) === false) {
							return false;
						}
					}
				}
				return true;
			},

			/**
			Check whether uploader has any listeners to the specified event.

			@method hasEventListener
			@param {String} name Event name to check for.
			*/


			/**
			Adds an event listener by name.

			@method bind
			@param {String} name Event name to listen for.
			@param {function} fn Function to call ones the event gets fired.
			@param {Object} [scope] Optional scope to execute the specified function in.
			@param {Number} [priority=0] Priority of the event handler - handlers with higher priorities will be called first
			*/
			bind: function(name, fn, scope, priority) {
				// adapt moxie EventTarget style to Plupload-like
				plupload.Uploader.prototype.bind.call(this, name, fn, priority, scope);
			}

			/**
			Removes the specified event listener.

			@method unbind
			@param {String} name Name of event to remove.
			@param {function} fn Function to remove from listener.
			*/

			/**
			Removes all event listeners.

			@method unbindAll
			*/
		});


		// keep alive deprecated properties
		if (_options.backward_compatibility) {
			this.bind('FilesAdded FilesRemoved', function (up) {
				up.files = up.toArray();
			}, this, 999);

			this.bind('OptionChanged', function (up, name, value) {
				up.settings[name] = typeof(value) == 'object' ? plupload.extend({}, value) : value;
			}, this, 999);
		}


		function bindEventListeners() {
			this.bind('FilesAdded FilesRemoved', function(up) {
				up.trigger('QueueChanged');
				up.refresh();
			}, this, 999);

			this.bind('BeforeUpload', onBeforeUpload);

			this.bind('Stopped', function(up) {
				up.trigger('UploadComplete');
			});

			this.bind('Error', onError);

			this.bind('Destroy', onDestroy);
		}


		function initControls(cb) {
			var self = this;
			var initialized = 0;
			var queue = [];

			// initialize file pickers - there can be many
			if (self.getOption('browse_button')) {
				plupload.each(self.getOption('browse_button'), function(el) {
					queue.push(function(cb) {
						var fileInput = new FileInput({
							accept: self.getOption('filters').mime_types,
							name: self.getOption('file_data_name'),
							multiple: self.getOption('multi_selection'),
							container: self.getOption('container'),
							browse_button: el
						});

						fileInput.onready = function() {
							initialized++;
							_fileInputs.push(this);
							cb();
						};

						fileInput.onchange = function() {
							self.addFile(this.files);
						};

						fileInput.bind('mouseenter mouseleave mousedown mouseup', function(e) {
							if (!_disabled) {
								if (self.getOption('browse_button_hover')) {
									if ('mouseenter' === e.type) {
										plupload.addClass(el, self.getOption('browse_button_hover'));
									} else if ('mouseleave' === e.type) {
										plupload.removeClass(el, self.getOption('browse_button_hover'));
									}
								}

								if (self.getOption('browse_button_active')) {
									if ('mousedown' === e.type) {
										plupload.addClass(el, self.getOption('browse_button_active'));
									} else if ('mouseup' === e.type) {
										plupload.removeClass(el, self.getOption('browse_button_active'));
									}
								}
							}
						});

						fileInput.bind('mousedown', function() {
							self.trigger('Browse');
						});

						fileInput.bind('error', function() {
							fileInput = null;
							cb();
						});

						fileInput.init();
					});
				});
			}

			// initialize drop zones
			if (self.getOption('drop_element')) {
				plupload.each(self.getOption('drop_element'), function(el) {
					queue.push(function(cb) {
						var fileDrop = new FileDrop({
							drop_zone: el
						});

						fileDrop.onready = function() {
							initialized++;
							_fileDrops.push(this);
							cb();
						};

						fileDrop.ondrop = function() {
							self.addFile(this.files);
						};

						fileDrop.bind('error', function() {
							fileDrop = null;
							cb();
						});

						fileDrop.init();
					});
				});
			}


			plupload.inParallel(queue, function() {
				if (typeof(cb) === 'function') {
					cb(initialized);
				}
			});
		}


		// Internal event handlers
		function onBeforeUpload(up, file) {
			// Generate unique target filenames
			if (up.getOption('unique_names')) {
				var matches = file.name.match(/\.([^.]+)$/),
					ext = "part";
				if (matches) {
					ext = matches[1];
				}
				file.target_name = file.id + '.' + ext;
			}
		}


		function onError(up, err) {
			if (err.code === plupload.INIT_ERROR) {
				up.destroy();
			}
			else if (err.code === plupload.HTTP_ERROR && up.state == plupload.STARTED) {
				up.trigger('CancelUpload');
			}
		}


		function onDestroy(up) {
			up.forEachItem(function(file) {
				file.destroy();
			});

			plupload.each(_fileInputs, function(fileInput) {
				fileInput.destroy();
			});

			plupload.each(_fileDrops, function(fileDrop) {
				fileDrop.destroy();
			});

			_fileInputs = [];
			_fileDrops = [];
			_initialized = false;

			if (_queueUpload) {
				_queueUpload.destroy();
			}

			if (_queueResize) {
				_queueResize.destroy();
			}

			_options = _queueUpload = _queueResize = null; // purge these exclusively

		}

	}

	function normalizeOptions(options) {
		plupload.each(options, function(value, option) {
			options[option] = normalizeOption(option, value, options);
		});
		return options;
	}

	/**
	Normalize an option.

	@method normalizeOption
	@private

	@param {String} option Name of the option to normalize
	@param {Mixed} value
	@param {Object} options The whole set of options, that might be modified during normalization (see max_file_size or unique_names)!
	*/
	function normalizeOption(option, value, options) {
		switch (option) {

			case 'chunk_size':
				if (value = plupload.parseSize(value)) {
					options.send_file_name = true;
				}
				break;

			case 'headers':
				var headers = {};
				if (typeof(value) === 'object') {
					plupload.each(value, function(value, key) {
						headers[key.toLowerCase()] = value;
					});
				}
				return headers;

			case 'http_method':
				return value.toUpperCase() === 'PUT' ? 'PUT' : 'POST';


			case 'filters':
				if (plupload.typeOf(value) === 'array') { // for backward compatibility
					value = {
						mime_types: value
					};
				}

				// if file format filters are being updated, regenerate the matching expressions
				if (value.mime_types) {
					if (plupload.typeOf(value.mime_types) === 'string') {
						value.mime_types = plupload.mimes2extList(value.mime_types);
					}

					// generate and cache regular expression for filtering file extensions
					options.re_ext_filter = (function(filters) {
						var extensionsRegExp = [];

						plupload.each(filters, function(filter) {
							plupload.each(filter.extensions.split(/,/), function(ext) {
								if (/^\s*\*\s*$/.test(ext)) {
									extensionsRegExp.push('\\.*');
								} else {
									extensionsRegExp.push('\\.' + ext.replace(new RegExp('[' + ('/^$.*+?|()[]{}\\'.replace(/./g, '\\$&')) + ']', 'g'), '\\$&'));
								}
							});
						});

						return new RegExp('(' + extensionsRegExp.join('|') + ')$', 'i');
					}(value.mime_types));
				}

				return value;

			case 'max_file_size':
				if (options && !options.filters) {
					options.filters = {};
				}
				options.filters.max_file_size = value;
				break;

			case 'multipart':
				if (!value) {
					options.send_file_name = true;
				}
				break;

			case 'multipart_params':
				options.params = options.multipart_params = value;
				break;

			case 'resize':
				if (value) {
					return plupload.extend({
						preserve_headers: true,
						crop: false
					}, value);
				}
				return false;

			case 'prevent_duplicates':
				if (options && !options.filters) {
					options.filters = {};
				}
				options.filters.prevent_duplicates = !!value;
				break;

			case 'unique_names':
				if (value) {
					options.send_file_name = true;
				}
				break;

				// options that require reinitialisation
			case 'container':
			case 'browse_button':
			case 'drop_element':
				return 'container' === option ? plupload.get(value) : plupload.getAll(value);
		}

		return value;
	}


	/**
	 * Registers a filter that will be executed for each file added to the queue.
	 * If callback returns false, file will not be added.
	 *
	 * Callback receives two arguments: a value for the filter as it was specified in settings.filters
	 * and a file to be filtered. Callback is executed in the context of uploader instance.
	 *
	 * @method addFileFilter
	 * @static
	 * @param {String} name Name of the filter by which it can be referenced in settings.filters
	 * @param {String} cb Callback - the actual routine that every added file must pass
	 */
	function addFileFilter(name, cb) {
		fileFilters[name] = cb;
	}


	addFileFilter('mime_types', function(filters, file, cb) {
		if (filters.length && !this.getOption('re_ext_filter').test(file.name)) {
			this.trigger('Error', {
				code: plupload.FILE_EXTENSION_ERROR,
				message: plupload.translate('File extension error.'),
				file: file
			});
			cb(false);
		} else {
			cb(true);
		}
	});


	addFileFilter('max_file_size', function(maxSize, file, cb) {
		var undef;

		maxSize = plupload.parseSize(maxSize);

		// Invalid file size
		if (file.size !== undef && maxSize && file.size > maxSize) {
			this.trigger('Error', {
				code: plupload.FILE_SIZE_ERROR,
				message: plupload.translate('File size error.'),
				file: file
			});
			cb(false);
		} else {
			cb(true);
		}
	});


	addFileFilter('prevent_duplicates', function(value, file, cb) {
		var self = this;
		if (value) {
			this.forEachItem(function(item) {
				// Compare by name and size (size might be 0 or undefined, but still equivalent for both)
				if (file.name === item.name && file.size === item.size) {
					self.trigger('Error', {
						code: plupload.FILE_DUPLICATE_ERROR,
						message: plupload.translate('Duplicate file error.'),
						file: file
					});
					cb(false);
					return;
				}
			});
		}
		cb(true);
	});


	addFileFilter('prevent_empty', function(value, file, cb) {
		if (value && !file.size && file.size !== undef) {
			this.trigger('Error', {
				code : plupload.FILE_SIZE_ERROR,
				message : plupload.translate('File size error.'),
				file : file
			});
			cb(false);
		} else {
			cb(true);
		}
	});


	Uploader.addFileFilter = addFileFilter;

	plupload.inherit(Uploader, Queue);

	// for backward compatibility
	plupload.addFileFilter = addFileFilter;

	return Uploader;
});