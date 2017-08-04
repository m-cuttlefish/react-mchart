'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp2; /**
                     * @file   index
                     * @author yucong02
                     */

// import sua from 'react-mhoc/lib/style-useable'

// import style from './component.less'


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _classname = require('classname');

var _classname2 = _interopRequireDefault(_classname);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// import PropTypes from 'prop-types'


// @sua(style)
var Histogram = (_temp2 = _class = function (_Component) {
    _inherits(Histogram, _Component);

    function Histogram() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Histogram);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Histogram.__proto__ || Object.getPrototypeOf(Histogram)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            isMount: false,
            width: document.body.clientWidth,
            popoverIdx: -1,
            offsetX: 0,
            offsetY: 0
        }, _this.handleResize = function (evt) {
            var dom = _reactDom2.default.findDOMNode(_this);
            if (_this.state.width !== dom.clientWidth) {
                _this.setState({
                    width: dom.clientWidth - 10
                });
            }
        }, _this.handleHoverInTileContainer = function (idx, evt) {
            var target = _this.refs['titleContainer' + idx];
            var rect = target.getBoundingClientRect();
            // console.log(evt.pageY, evt.clientY, evt.screenY)
            var offsetX = evt.clientX - rect.left;
            var offsetY = evt.clientY - rect.top;
            var popoverWidth = _this.refs['chartPopover' + idx] ? _this.refs['chartPopover' + idx].clientWidth || 130 : 130;
            _this.setState({
                popoverIdx: idx,
                offsetX: offsetX - popoverWidth / 2,
                offsetY: offsetY + 10
            });
        }, _this.handleHoverOutTileContainer = function (idx, evt) {
            _this.setState({
                popoverIdx: -1
            });
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    /*static propsTypes = {
        xAxis: PropTypes.arrayOf(
            PropTypes.oneOfType([
                PropTypes.shape({
                    value: PropTypes.number
                }),
                PropTypes.string,
            ])
        ),
        data: PropTypes.arrayOf(
            PropTypes.oneOfType([
                PropTypes.shape({
                    value: PropTypes.number,
                    label: PropTypes.string,
                    color: PropTypes.string
                }),
                PropTypes.number
            ])
        ),
        rectProps: PropTypes.object,
        xAxisProps: PropTypes.object,
        labelProps: PropTypes.object,
        height: PropTypes.oneOfType([
            PropTypes.string, PropTypes.number
        ]),
        max: PropTypes.number,
        rectWidth: PropTypes.number,
        animate: PropTypes.bool
    }*/

    _createClass(Histogram, [{
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            window.removeEventListener('resize', this.handleResize);
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            window.addEventListener('resize', this.handleResize);

            var dom = _reactDom2.default.findDOMNode(this);
            this.setState({
                width: dom.clientWidth - 10
            });

            if (this.props.animate) {
                setTimeout(function () {
                    _this2.setState({ isMount: true });
                }, 400);
            }
        }
    }, {
        key: 'normalizeList',
        value: function normalizeList() {
            var list = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

            return list.map(function (obj, i) {
                if (!(typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object') {
                    return { value: obj };
                }
                return obj;
            });
        }
    }, {
        key: 'renderRectangleGroup',
        value: function renderRectangleGroup() {
            var _this3 = this;

            var _props = this.props,
                data = _props.data,
                max = _props.max;

            var isMaxSetted = !!max;
            var maxVal = isMaxSetted ? max : Number.MIN_SAFE_INTEGER;
            data = data.map(function (obj, i) {
                var val = 0;
                if (!(typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object') {
                    val = obj;
                    obj = { value: obj };
                } else {
                    if (Array.isArray(obj)) {
                        val = obj.reduce(function (a, b) {
                            return a + b.value;
                        }, 0);
                        obj = {
                            value: obj
                        };
                    } else {
                        val = obj.value;
                    }
                }
                if (!isMaxSetted) {
                    maxVal = Math.max(maxVal, val);
                }
                return obj;
            });
            if (!isMaxSetted) {
                maxVal = maxVal * 1.3;
            }

            return data.map(function (obj, i) {
                return _this3.renderRectangle(obj, i, maxVal);
            });
        }
    }, {
        key: 'renderRectangle',
        value: function renderRectangle(obj, idx, max) {
            var _this4 = this;

            var value = obj.value,
                color = obj.color,
                props = _objectWithoutProperties(obj, ['value', 'color']);

            var _props2 = this.props,
                rectProps = _props2.rectProps,
                xAxisProps = _props2.xAxisProps,
                xAxis = _props2.xAxis,
                labelProps = _props2.labelProps,
                height = _props2.height,
                data = _props2.data,
                animate = _props2.animate;

            xAxis = _lodash2.default.cloneDeep(xAxis);
            var isMount = this.state.isMount;

            if (!Array.isArray(value)) {
                value = [_extends({}, obj, {
                    label: _typeof(xAxis[idx]) === 'object' ? xAxis[idx].value : xAxis[idx]
                })];
            }
            var sumVal = value.reduce(function (a, b) {
                return a + b.value;
            }, 0);

            var computedProps = _lodash2.default.merge({}, rectProps, props, {
                style: _extends({}, color ? { backgroundColor: color } : {}, {
                    height: animate && !isMount ? 0 : sumVal / max * 100 + '%'
                })
            });

            var margeGap = this.margeGap;
            xAxis[idx] = _typeof(xAxis[idx]) === 'object' ? xAxis[idx] : { value: xAxis[idx] };

            var _xAxis$idx = xAxis[idx],
                xValue = _xAxis$idx.value,
                xProps = _objectWithoutProperties(_xAxis$idx, ['value']);

            var _data$idx = data[idx],
                dataVal = _data$idx.value,
                dataProps = _objectWithoutProperties(_data$idx, ['value']);

            dataProps = !_lodash2.default.isArray(data[idx]) ? dataProps : null;
            return _react2.default.createElement(
                'div',
                {
                    className: 'rectangle-container',
                    key: idx,
                    style: {
                        marginLeft: margeGap,
                        marginRight: margeGap,
                        width: this.props.rectWidth
                    },
                    ref: function ref(r) {
                        return _this4.rectContainer = r;
                    }
                },
                _react2.default.createElement(
                    'div',
                    _extends({ className: 'rectangle' }, computedProps),
                    _react2.default.createElement(
                        'span',
                        _extends({ className: 'rectangle-text'
                        }, _lodash2.default.merge({}, labelProps, !_lodash2.default.isArray(dataProps) && dataProps)),
                        sumVal
                    ),
                    this.renderTileList(value, sumVal, idx),
                    _react2.default.createElement(
                        'span',
                        _extends({
                            className: 'x-axis'
                        }, _lodash2.default.merge({}, xAxisProps, xProps)),
                        xValue
                    )
                )
            );
        }
    }, {
        key: 'optimizePopoverPosition',
        value: function optimizePopoverPosition() {
            if (this.state.popoverIdx !== -1 && this.refs.chartPopover) {
                var rect = this.refs.chartPopover.getBoundingClientRect();

                if (rect.left + rect.width - document.body.clientWidth > 20) {
                    this.setState({
                        offsetX: -10 - rect.width
                    });
                    return true;
                }
            }
        }
    }, {
        key: 'componentWillUpdate',
        value: function componentWillUpdate() {}
    }, {
        key: 'renderPopover',
        value: function renderPopover(valueList, idx) {
            var _this5 = this;

            return _react2.default.createElement(
                'div',
                {
                    className: 'chart-popover',
                    ref: 'chartPopover' + idx,
                    style: {
                        display: idx === this.state.popoverIdx ? '' : 'none',
                        left: this.state.offsetX,
                        top: this.state.offsetY
                    }
                },
                valueList.map(function (a, i) {
                    return _this5.renderPopoverItem(a, idx, i);
                })
            );
        }
    }, {
        key: 'renderPopoverItem',
        value: function renderPopoverItem(_ref2, i, j) {
            var color = _ref2.color,
                label = _ref2.label,
                value = _ref2.value;
            var _props3 = this.props,
                rectProps = _props3.rectProps,
                xAxis = _props3.xAxis;

            var clr = color || rectProps && rectProps.style && rectProps.style.backgroundColor;
            label = label || (_typeof(xAxis[i]) === 'object' ? xAxis[i].value : xAxis[i]);
            return _react2.default.createElement(
                'div',
                { className: 'chart-popover-item', key: j },
                _react2.default.createElement('span', { className: 'chart-popover-color', style: { backgroundColor: clr } }),
                _react2.default.createElement(
                    'span',
                    { className: 'chart-popover-label' },
                    label
                ),
                _react2.default.createElement(
                    'span',
                    { className: 'chart-popover-value' },
                    value
                )
            );
        }
    }, {
        key: 'renderTileList',
        value: function renderTileList(valueList, sumVal, idx) {
            var _this6 = this;

            valueList = valueList.slice(); // .reverse()
            return _react2.default.createElement(
                'div',
                {
                    className: 'tile-container',
                    ref: 'titleContainer' + idx,
                    onMouseMove: this.handleHoverInTileContainer.bind(this, idx),
                    onMouseLeave: this.handleHoverOutTileContainer.bind(this, idx)
                },
                valueList.map(function (v, i) {
                    return _this6.renderTile(v, i, sumVal);
                }),
                this.renderPopover(valueList, idx)
            );
        }
    }, {
        key: 'rmdColor',
        value: function rmdColor() {
            return '#' + ((1 << 24) * Math.random() | 0).toString(16);
        }
    }, {
        key: 'renderTile',
        value: function renderTile(_ref3, idx, sumVal) {
            var label = _ref3.label,
                value = _ref3.value,
                color = _ref3.color,
                props = _objectWithoutProperties(_ref3, ['label', 'value', 'color']);

            return _react2.default.createElement('div', _extends({
                className: 'rectangle-tile'
            }, _lodash2.default.merge({}, { key: idx }, props, {
                style: {
                    backgroundColor: color,
                    height: value / sumVal * 100 + '%'
                }
            })));
        }
    }, {
        key: 'render',
        value: function render() {
            var _props4 = this.props,
                height = _props4.height,
                className = _props4.className;

            return _react2.default.createElement(
                'div',
                {
                    className: (0, _classname2.default)('chart-tile-histogram', className),
                    style: { height: height }
                },
                _react2.default.createElement(
                    'div',
                    { className: 'main' },
                    this.renderRectangleGroup()
                )
            );
        }
    }, {
        key: 'margeGap',
        get: function get() {
            var len = this.props.data.length || 1;
            var rectWidth = this.rectContainer ? this.rectContainer.clientWidth : 20;
            return Math.floor((this.state.width - rectWidth * len) / (len << 1));
        }
    }]);

    return Histogram;
}(_react.Component), _class.defaultProps = {
    xAxis: [{ value: 'Band', style: { color: 'black' } }, 'Band4', 'Band5', 'Band6', 'TPU3', 'TPU4', '7', '8', '9', '10', '11', '12'],
    data: [[{
        label: 'Band3',
        value: 8,
        color: 'yellow'
    }, {
        label: 'Band4',
        value: 10,
        color: 'red'
    }], [{
        label: 'Band3',
        value: 8,
        color: 'yellow'
    }, {
        label: 'Band3',
        value: 8,
        color: 'blue'
    }, {
        label: 'Band4',
        value: 10,
        color: 'red'
    }], {
        value: 6,
        style: {
            color: 'orange'
        }
    }],
    rectProps: {
        style: {
            backgroundColor: 'rgb(255, 143, 77)'
        }
    },
    xAxisProps: {
        style: {
            color: 'rgb(62, 62, 62)'
        }
    },
    labelProps: {
        style: {
            color: 'rgb(133, 139, 159)'
        }
    },
    height: 300,
    rectWidth: 30,
    max: void 0,
    animate: true
}, _temp2);
exports.default = Histogram;