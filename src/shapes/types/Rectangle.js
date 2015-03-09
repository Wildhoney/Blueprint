import Shape from './../Shape.js';

/**
 * @module Blueprint
 * @submodule Rectangle
 * @author Adam Timberlake
 * @link https://github.com/Wildhoney/Blueprint
 */
export default class Rectangle extends Shape {

    /**
     * @method getTag
     * @return {String}
     */
    getTag() {
        return 'rect';
    }

    /**
     * @method addAttributes
     * @return {Object}
     */
    addAttributes() {
        return { fill: 'red', width: 100, height: 100, x: 100, y: 20 };
    }

    /**
     * @method addMethods
     * @return {Object}
     */
    addMethods() {

        return {
            fill: function(value) {
                return this.attr('fill', value);
            }
        }

    }

}