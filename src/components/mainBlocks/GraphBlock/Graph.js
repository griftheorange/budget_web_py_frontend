import { connect } from 'react-redux'
import React from 'react'

import Generators from './Generators.js'


function Graph(props) {
    return (
        <div className={props.fullscreenGraph ? 'bordered graph fullscreen' : 'bordered graph'} style={{position: 'relative'}}>
            {Generators.genButtons(props)}
            {Generators.genGraph(props)}
        </div>
    );
}

function mapStateToProps(state){
    return({
        data: state.data,
        graphInView: state.graphInView,
        fullscreenGraph: state.fullscreenGraph
    })
}

function mapDispatchToProps(dispatch){
    return ({
        toggleFullscreenGraph: (element) => {
            dispatch({
                type: "TOGGLE_FULLSCREEN_GRAPH"
            })
        },
        setGraphInView: (newView) => {
            dispatch({
                type: "SET_GRAPH_IN_VIEW",
                value: newView
            })
        }
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(Graph);