import Feature  from './../Feature.js';
//import utility  from './../../helpers/Utility.js';
import Events   from './../../helpers/Events.js';
import registry from './../../helpers/Registry.js';

/**
 * @module Blueprint
 * @submodule Movable
 * @author Adam Timberlake
 * @link https://github.com/Wildhoney/Blueprint
 */
export default class Movable extends Feature {

    /**
     * @method element
     * @param {Shape} shape
     * @return {Movable}
     * @constructor
     */
    constructor(shape) {

        super(shape);

        /**
         * @property start
         * @type {Object}
         */
        this.start = { x: 0, y: 0 };

        let dragStart = ['dragstart', () => this.dragStart()],
            drag      = ['drag',      () => this.drag()],
            dragEnd   = ['dragend',   () => this.dragEnd()];

        shape.element.call(d3.behavior.drag().on(...dragStart).on(...drag).on(...dragEnd));

    }

    /**
     * @method selected
     * @param {Array} shapes
     * @return {Array|void}
     */
    selected(shapes) {
        return shapes;
    }

    /**
     * @method moveLeft
     * @param {Object} model
     * @return {void}
     */
    moveLeft(model) {
        this.shape.getInterface().x(this.shape.getInterface().x() - model.by);
    }

    /**
     * @method moveRight
     * @param {Object} model
     * @return {void}
     */
    moveRight(model) {
        this.shape.getInterface().x(this.shape.getInterface().x() + model.by);
    }

    /**
     * @method moveUp
     * @param {Object} model
     * @return {void}
     */
    moveUp(model) {
        this.shape.getInterface().y(this.shape.getInterface().y() - model.by);
    }

    /**
     * @method moveDown
     * @param {Object} model
     * @return {void}
     */
    moveDown(model) {
        this.shape.getInterface().y(this.shape.getInterface().y() + model.by);
    }

    /**
     * @method dragStart
     * @param {Number} [x=null]
     * @param {Number} [y=null]
     * @return {void}
     */
    dragStart(x = null, y = null) {

        this.start = {
            x: !_.isNull(x) ? x : d3.event.sourceEvent.clientX - this.shape.getInterface().x(),
            y: !_.isNull(y) ? y : d3.event.sourceEvent.clientY - this.shape.getInterface().y()
        };

        this.dispatcher.send(Events.SELECTED_GET);
        this.shape.group.classed('dragging', true);

    }

    /**
     * @method drag
     * @param {Number} [x=null]
     * @param {Number} [y=null]
     * @param {Number} [multipleOf=registry.snapGrid]
     * @return {void}
     */
    drag(x = null, y = null, multipleOf = registry.snapGrid) {

        x = !_.isNull(x) ? x : d3.event.sourceEvent.clientX;
        y = !_.isNull(y) ? y : d3.event.sourceEvent.clientY;

        let mX = (x - this.start.x),
            mY = (y - this.start.y),
            eX = Math.ceil(mX / multipleOf) * multipleOf,
            eY = Math.ceil(mY / multipleOf) * multipleOf;

        this.shape.getInterface().x(eX);
        this.shape.getInterface().y(eY);

    }

    /**
     * @method dragEnd
     * @return {void}
     */
    dragEnd() {
        this.shape.group.classed('dragging', false);
    }

}