/**
 * @file   index
 * @author yucong02
 */

import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import sua from 'react-mhoc/lib/style-useable'
import c from 'classname'
import style from './component.less'
import _ from 'lodash'
// import PropTypes from 'prop-types'


@sua(style)
export default class extends Component {

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

    static defaultProps = {
        xAxis: [
            {value: 'Band', style: {color: 'black'}}, 'Band4', 'Band5', 'Band6', 'TPU3', 'TPU4',
            '7', '8', '9', '10', '11', '12'
        ],
        data: [
            [
                {
                    label: 'Band3',
                    value: 8,
                    color: 'yellow'
                },
                {
                    label: 'Band4',
                    value: 10,
                    color: 'red'
                }
            ],
            [
                {
                    label: 'Band3',
                    value: 8,
                    color: 'yellow'
                },
                {
                    label: 'Band3',
                    value: 8,
                    color: 'blue'
                },
                {
                    label: 'Band4',
                    value: 10,
                    color: 'red'
                }
            ],
            {
                value: 6,
                style: {
                    color: 'orange'
                }
            }
        ],
        rectProps: {
            style: {
                backgroundColor: 'rgb(255, 143, 77)',
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
    }

    state = {
        isMount: false,
        width: document.body.clientWidth,
        popoverIdx: -1,
        offsetX: 0,
        offsetY: 0
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize)
    }

    handleResize = evt => {
        const dom = ReactDOM.findDOMNode(this)
        if (this.state.width !== dom.clientWidth) {
            this.setState({
                width: dom.clientWidth - 10
            })
        }
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleResize)

        const dom = ReactDOM.findDOMNode(this)
        this.setState({
            width: dom.clientWidth - 10
        });

        if (this.props.animate) {
            setTimeout(() => {
                this.setState({isMount: true})
            }, 400)
        }
    }

    get margeGap() {
        const len = this.props.data.length || 1
        const rectWidth = this.rectContainer ? this.rectContainer.clientWidth : 20
        return Math.floor(
            (this.state.width - (rectWidth * len)) / (len << 1)
        )
    }

    normalizeList(list = []) {
        return list.map((obj, i) => {
            if (!typeof obj === 'object') {
                return {value: obj}
            }
            return obj
        })
    }

    renderRectangleGroup() {
        let {data, max} = this.props
        let isMaxSetted = !!max
        let maxVal = isMaxSetted ? max : Number.MIN_SAFE_INTEGER
        data = data.map((obj, i) => {
            let val = 0
            if (!typeof obj === 'object') {
                val = obj
                obj = {value: obj}
            } else {
                if (Array.isArray(obj)) {
                    val = obj.reduce((a, b) => a + b.value, 0)
                    obj.value = obj
                } else {
                    val = obj.value
                }
            }
            if (!isMaxSetted) {
                maxVal = Math.max(maxVal, val)
            }
            return obj
        })
        if (!isMaxSetted) {
            maxVal = maxVal * 1.3
        }

        return data.map((obj, i) => {
            return (
                this.renderRectangle(obj, i, maxVal)
            )
        })
    }

    renderRectangle(obj, idx, max) {
        let {value, color, ...props} = obj
        let {
            rectProps,
            xAxisProps,
            xAxis,
            labelProps,
            height,
            data,
            animate
        } = this.props
        xAxis = _.cloneDeep(xAxis)
        const isMount = this.state.isMount

        if (!Array.isArray(value)) {
            value = [{
                ...obj,
                label: typeof xAxis[idx] === 'object' ? xAxis[idx].value : xAxis[idx],
            }]
        }
        const sumVal = value.reduce((a, b) => a + b.value, 0)
        const computedProps = _.merge({}, rectProps, props, {
            style: {
                ...(color ? {backgroundColor: color} : {}),
                height: (animate && !isMount) ? 0 : ((sumVal / max) * 100) + '%'
            }
        })
        const margeGap = this.margeGap
        xAxis[idx] = typeof xAxis[idx] === 'object' ? xAxis[idx] : {value: xAxis[idx]}
        const {
            value: xValue,
            ...xProps
        } = xAxis[idx]

        const {
            value: dataVal,
            ...dataProps
        } = data[idx]

        return (
            <div
                className="rectangle-container"
                key={idx}
                style={{
                    marginLeft: margeGap,
                    marginRight: margeGap,
                    width: this.props.rectWidth
                }}
                ref={r => this.rectContainer = r}
            >
                <div className="rectangle" {...computedProps}>
                    <span className="rectangle-text"
                          {..._.merge(
                              {}, labelProps, dataProps
                          )}>
                        {sumVal}
                    </span>
                    {this.renderTileList(value, sumVal, idx)}
                    <span
                        className="x-axis"
                        {..._.merge({}, xAxisProps, xProps)}
                    >
                        {xValue}
                    </span>
                </div>
            </div>
        )
    }

    optimizePopoverPosition() {
        if (this.state.popoverIdx !== -1 && this.refs.chartPopover) {
            const rect = this.refs.chartPopover.getBoundingClientRect()

            if (rect.left + rect.width - document.body.clientWidth > 20) {
                this.setState({
                    offsetX: - 10 - rect.width
                })
                return true
            }
        }
    }

    componentWillUpdate() {

    }

    handleHoverInTileContainer = (idx, evt) => {
        const target = this.refs['titleContainer' + idx]
        const rect = target.getBoundingClientRect()
        // console.log(evt.pageY, evt.clientY, evt.screenY)
        const offsetX = evt.clientX - rect.left
        const offsetY = evt.clientY - rect.top
        const popoverWidth = this.refs['chartPopover' + idx] ? this.refs['chartPopover' + idx].clientWidth || 130 : 130
        this.setState({
            popoverIdx: idx,
            offsetX: offsetX - (popoverWidth / 2),
            offsetY: offsetY + 10
        })
    }

    handleHoverOutTileContainer = (idx, evt) => {
        this.setState({
            popoverIdx: -1,
        })
    }

    renderPopover(valueList, idx) {

        return (
            <div
                className="chart-popover"
                ref={'chartPopover' + idx}
                style={{
                    display: idx === this.state.popoverIdx ? '' : 'none',
                    left: this.state.offsetX,
                    top: this.state.offsetY
                }}
            >
                {valueList.map((a, i) => this.renderPopoverItem(a, idx, i))}
            </div>
        )
    }

    renderPopoverItem({color, label, value}, i, j) {
        const {rectProps, xAxis} = this.props
        let clr = color || rectProps && rectProps.style
                    && rectProps.style.backgroundColor
        label = label || (typeof xAxis[i] === 'object' ? xAxis[i].value : xAxis[i])
        return (
            <div className="chart-popover-item" key={j}>
                <span className="chart-popover-color" style={{backgroundColor: clr}}/>
                <span className="chart-popover-label" >{label}</span>
                <span className="chart-popover-value" >{value}</span>
            </div>
        )
    }

    renderTileList(valueList, sumVal, idx) {
        valueList = valueList.slice();// .reverse()
        return (
            <div
                className="tile-container"
                ref={'titleContainer' + idx}
                onMouseMove={this.handleHoverInTileContainer.bind(this, idx)}
                onMouseLeave={this.handleHoverOutTileContainer.bind(this, idx)}
            >
                {
                    valueList.map((v, i) => {
                        return (
                            this.renderTile(v, i, sumVal)
                        )
                    })
                }
                {this.renderPopover(valueList, idx)}
            </div>
        )
    }

    rmdColor() {
        return '#' + ((1 << 24) * Math.random() | 0).toString(16)
    }

    renderTile({label, value, color, ...props}, idx, sumVal) {
        return (
            <div
                className="rectangle-tile"
                {..._.merge({}, {key: idx}, props,
                    {
                        style: {
                            backgroundColor: color,
                            height: ((value / sumVal) * 100) + '%'
                        }
                    }
                )}
            />
        )
    }

    render() {
        const {height, className} = this.props
        return (
            <div
                className={c('chart-tile-histogram', className)}
                style={{height}}
            >
                <div className="main">
                    {this.renderRectangleGroup()}
                </div>
            </div>
        )
    }
}