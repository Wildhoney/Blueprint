import Events  from './../helpers/Events.js';
import utility from './../helpers/Utility.js';

/**
 * @module object
 * @submodule Interface
 * @author Adam Timberlake
 * @link https://github.com/Wildhoney/object
 */
export default class Interface {

    /**
     * @method constructor
     * @param {String} [label='']
     * @return {Interface}
     */
    constructor(label = '') {
        this.label = label;
    }

    /**
     * @method remove
     * @return {void}
     */
    remove() {

        this.dispatcher.send(Events.REMOVE, {
            'interface': this
        });

    }

    /**
     * @method x
     * @param {Number} [value=undefined]
     * @return {Interface}
     */
    x(value) {
        return this.attr('x', value);
    }

    /**
     * @method y
     * @param {Number} [value=undefined]
     * @return {Interface}
     */
    y(value) {
        return this.attr('y', value);
    }

    /**
     * @method z
     * @param {Number} [value=undefined]
     * @return {Interface}
     */
    z(value) {
        return this.attr('z', value);
    }

    /**
     * @method bringToFront
     * @return {*}
     */
    bringToFront() {
        return this.attr('z', Infinity);
    }

    /**
     * @method sendToBack
     * @return {*}
     */
    sendToBack() {
        return this.attr('z', -Infinity);
    }

    /**
     * @method sendBackwards
     * @return {*}
     */
    sendBackwards() {
        return this.attr('z', (this.getAttr().z - 1));
    }

    /**
     * @method bringForwards
     * @return {*}
     */
    bringForwards() {
        return this.attr('z', (this.getAttr().z + 1));
    }

    /**
     * @method width
     * @param {Number} [value=undefined]
     * @return {Interface}
     */
    width(value) {
        return this.attr('width', value);
    }

    /**
     * @method height
     * @param {Number} [value=undefined]
     * @return {Interface}
     */
    height(value) {
        return this.attr('height', value);
    }

    /**
     * @property attr
     * @param {String} property
     * @param {*} value
     * @return {*|void}
     */
    attr(property, value) {

        if (_.isUndefined(value)) {
            return this.getAttr()[property];
        }

        var model       = {};
        model[property] = value;
        return this.setAttr(model);

    }

    /**
     * @method setAttr
     * @param {Object} attributes
     * @return {Interface}
     */
    setAttr(attributes = {}) {

        this.dispatcher.send(Events.ATTRIBUTE_SET, {
            attributes: utility.kebabifyKeys(attributes)
        });

        return this;

    }

    /**
     * @method getAttr
     * @return {Object}
     */
    getAttr() {

        var result = {};

        this.dispatcher.send(Events.ATTRIBUTE_GET_ALL, {}, (response) => {
            result = response;
        });

        return result;

    }

    /**
     * @method setDispatcher
     * @param {Dispatcher} dispatcher
     * @return {void}
     */
    setDispatcher(dispatcher) {
        this.dispatcher = dispatcher;
    }

    /**
     * @method toString
     * @return {String}
     */
    toString() {

        if (this.label) {
            return `[object Interface: ${this.label}]`;
        }

        return `[object Interface]`;

    }

}