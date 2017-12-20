/**
 * General controller for all other controllers
 * Include general methods that can be useful for some classes
 */

class GeneralController {

   /**
    * Find parent DOM element by attribute name
    * @param  startNode
    * @param  {String} attr
    * @param {Int} depth - cycle depth
    */
   findParentElemtByAttribute (startNode, attr, depth) {
      let resultNode;
      let cycleDepth = 0;
      depth = depth || 0;

      const finder = function (target, attr) {
         if (!target.getAttribute(attr) && (cycleDepth < depth)) {
            finder(target.parentNode, attr);
            ++cycleDepth;
         } else {
            resultNode = target;
         }
      }

      finder(startNode, attr);
      return resultNode;
   }

   /**
    * Find parent DOM element by class name
    * @param  startNode
    * @param  {String} cssClass
    * @param {Int} depth - cycle depth
    */
   findParentElemtByClassName (startNode, cssClass, depth) {
      let resultNode;
      let cycleDepth = 0;
      let tempArray = [];
      depth = depth || 0;

      const finder = function (target, cssClass) {
         tempArray = target.className.split(' ');
         if (!tempArray.some((item)=>{ return item === cssClass }) && (cycleDepth < depth)) {
            finder(target.parentNode, cssClass);
            ++cycleDepth;
         } else {
            resultNode = target;
         }
      }

      finder(startNode, cssClass);
      return resultNode;
   }

   /**
    * Format datetime to sql
    * @param  {Datetime} date
    * @return {String}
    */
   toSQL(date) {
      return date.toISOString().slice(0,10);
   }
}

export default GeneralController;
