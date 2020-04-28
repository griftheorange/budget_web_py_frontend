import React, { useEffect } from 'react';
import {Line} from 'react-chartjs-2'
import fetcher from '../adaptors/dataFetcher.js'
import {connect} from 'react-redux'

function Main(props) {
    useEffect(() => {
        loadGraphData(props)
    }, [])

    useEffect(() => {

    }, [props.lineData])

    return (
        <Line data={{
            datasets: null
        }}/>
    );
}

function loadGraphData(props){
    let data = fetcher.getLineGraphData()
    data.then((json) => {
        props.setLineData(json)
    })
}

function mapStateToProps(state){
    return {
        lineData: state.lineData
    }
}

function mapDispatchToProps(dispatch){
    return {
        setLineData: (data) => {
            dispatch({
                type: "SET_LINE_DATA",
                value: data
            })
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Main);