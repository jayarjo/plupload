export default {
    /**
     * The state of the queue before it has started and after it has finished
     *
     * @property STOPPED
     * @static
     * @final
     */
    STOPPED: 1,

    /**
     * Upload process is running
     *
     * @property STARTED
     * @static
     * @final
     */
    STARTED: 2,

    /**
    File is queued for upload

    @property QUEUED
    @static
    @final
    */
    QUEUED: 1,

    /**
    File is being uploaded

    @property UPLOADING
    @static
    @final
        */
    UPLOADING: 2,

    /**
    File has failed to be uploaded

    @property FAILED
    @static
    @final
        */
    FAILED: 4,

    /**
    File has been uploaded successfully

    @property DONE
    @static
    @final
        */
    DONE: 5,

    // Error constants used by the Error event

    /**
     * Generic error for example if an exception is thrown inside Silverlight.
     *
     * @property GENERIC_ERROR
     * @static
     * @final
     */
    GENERIC_ERROR: -100,

    /**
     * HTTP transport error. For example if the server produces a HTTP status other than 200.
     *
     * @property HTTP_ERROR
     * @static
     * @final
     */
    HTTP_ERROR: -200,

    /**
     * Generic I/O error. For example if it wasn't possible to open the file stream on local machine.
     *
     * @property IO_ERROR
     * @static
     * @final
     */
    IO_ERROR: -300,

    /**
     * @property SECURITY_ERROR
     * @static
     * @final
     */
    SECURITY_ERROR: -400,

    /**
     * Initialization error. Will be triggered if no runtime was initialized.
     *
     * @property INIT_ERROR
     * @static
     * @final
     */
    INIT_ERROR: -500,

    /**
     * File size error. If the user selects a file that is too large it will be blocked and an error of this type will be triggered.
     *
     * @property FILE_SIZE_ERROR
     * @static
     * @final
     */
    FILE_SIZE_ERROR: -600,

    /**
     * File extension error. If the user selects a file that isn't valid according to the filters setting.
     *
     * @property FILE_EXTENSION_ERROR
     * @static
     * @final
     */
    FILE_EXTENSION_ERROR: -601,

    /**
     * Duplicate file error. If prevent_duplicates is set to true and user selects the same file again.
     *
     * @property FILE_DUPLICATE_ERROR
     * @static
     * @final
     */
    FILE_DUPLICATE_ERROR: -602,

    /**
     * Runtime will try to detect if image is proper one. Otherwise will throw this error.
     *
     * @property IMAGE_FORMAT_ERROR
     * @static
     * @final
     */
    IMAGE_FORMAT_ERROR: -700,

    /**
     * While working on files runtime may run out of memory and will throw this error.
     *
     * @since 2.1.2
     * @property MEMORY_ERROR
     * @static
     * @final
     */
    MEMORY_ERROR: -701,

    /**
     * Each runtime has an upper limit on a dimension of the image it can handle. If bigger, will throw this error.
     *
     * @property IMAGE_DIMENSIONS_ERROR
     * @static
     * @final
     */
    IMAGE_DIMENSIONS_ERROR: -702,


    /**
    Invalid option error. Will be thrown if user tries to alter the option that cannot be changed without
    uploader reinitialisation.

    @property OPTION_ERROR
    @static
    @final
    */
    OPTION_ERROR: -800
}