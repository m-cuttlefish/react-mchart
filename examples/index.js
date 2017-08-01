import React from 'react'
import ReactDOM from 'react-dom'

import NormalHistogram from './Histogram/Normal'
import TileHistogram from './Histogram/Tile'


const data = [
    {
        title: 'Histogram',
        subtitle: 'Normal',
        Comp: NormalHistogram
    },
    {
        title: 'Histogram',
        subtitle: 'Tile',
        Comp: TileHistogram
    }
]


class ExampleApp extends React.Component {

    renderSection(title, subtitle, Comp) {
        const style = {
            border: '1px solid #ddd',
            marginTop: 10,
            marginBottom: 10,
            borderRadius: 10,
            padding: '5 12 12 12',
        }
        const smStyle = {
            fontSize: 15,
            color: 'brown',
            marginLeft: 10,
        }
        return (
            <div style={style}>
                <h3 style={{marginLeft: 10}}>{title} <small style={smStyle}>{subtitle}</small></h3>
                <Comp/>
            </div>
        )
    }

    render() {

        return (
            <div>
            {
                data.map(({title, subtitle, Comp}, idx) =>
                    <div key={idx}>
                        {this.renderSection(title, subtitle, Comp)}
                    </div>
                )
            }
            </div>
        )
    }
}

ReactDOM.render(<ExampleApp/>, document.getElementById('root'))