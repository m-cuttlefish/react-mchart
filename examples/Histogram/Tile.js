/**
 * @file   Tile
 * @author yucong02
 */
import React from 'react'
import {debug} from 'react-mhoc'
import Histogram from '../../es5/Histogram/'

let CHistogram = debug({infoDown: true})(Histogram)

export default class TileHistogram extends React.Component {
    render() {
        return (
            <CHistogram
                xAxis={[
                    {
                        value: '百度',
                        style: {
                            // color: 'red'
                        }
                    },
                    '谷歌'
                ]}
                animate
                data={[
                    [
                        {
                            value: 12,
                            // color: 'blue',
                            label: '上半年',
                            onClick: () => alert('hello')
                        },
                        {
                            value: 11,
                            color: 'rgb(249, 204, 157)',
                            label: '下半年',
                            onClick: () => alert('world')
                        },
                    ],
                    {
                        value: 14,
                        // color: 'green'
                    }
                ]}
                rectWidth={35}
                height={250}
            />
        )
    }
}