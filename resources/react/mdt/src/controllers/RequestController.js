import $ from 'jquery';

/**
 * Request controller
 */
class Request {
   constructor () {
      this._dataType = 'json';
      this._cache = false;
   }

   setUrl (url) {
      this.url = url;
   }

   setCallback (callback) {
      this._callback = callback;
   }

   makeRequest () {
      return $.ajax({
         url: this.url,
         dataType: this._dataType,
         cache: this._cache,
         success: this._callback.bind(this),
         error: this._defErrback.bind(this)
      });
   }

   _defErrback (message) {
      console.log (message);
   }
}

export default Request;
