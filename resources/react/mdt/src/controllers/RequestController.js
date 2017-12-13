import GeneralController from './GeneralController'

/**
 * Request controller
 */
class Request  extends GeneralController {
   constructor () {
      super();

      this._xhr = new XMLHttpRequest();
      this._responseType = 'POST';
   }

   url (value) {
      if (value) {
         this._url = value;
      }
      return this._url;
   }

   resopnseType (value) {
      if (value) {
         this._responseType = value;
      }
      return this._responseType;
   }

   makeRequest (data) {
      return new Promise((resolve, reject) => {
         this._xhr.open(this.resopnseType(), this.url(), true);
         this._xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');

         this._xhr.onload = function () {
            if (this.status === 200) {
               resolve(JSON.parse(this.response));
            } else {
               let error = new Error(this.statusText);
               error.code = this.status;
               reject(error);
            }
         }

         this._xhr.onerror = function() {
            reject(new Error("Network Error"));
         };

         if (data) {
            this._xhr.send(JSON.stringify(data));
         } else {
            this._xhr.send();
         }
      });
   }
}

export default Request;
