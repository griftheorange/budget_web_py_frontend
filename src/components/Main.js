import React, { useEffect } from 'react';
import {Line} from 'react-chartjs-2'
import {Resizable} from 're-resizable'
import Fetcher from '../adaptors/dataFetcher.js'
import {connect} from 'react-redux'
import * as d3 from 'd3'

const linear = d3.scaleLinear()
    .domain([0, 4])
    .range(["rgb(32,6,162,1)", "	rgb(255,171,50,1)"])

const linearOpacity = d3.scaleLinear()
    .domain([0, 4])
    .range(["rgb(32,6,162,0.05)", "	rgb(255,171,50,0.05)"])

function Main(props) {
    useEffect(() => {
        loadGraphData(props)
    }, [])

    useEffect(() => {
        if(props.lineData){
            calcProcessedLineData(props, props.lineData)
        }
    }, [props.lineDataColumns])

    return (
        <div style={{width: "100%", height: "50em"}}>
            <div style={{borderStyle: "solid", 
                        borderColor: "black", 
                        borderWidth:"thin", 
                        width: "80%",
                        height: "80%"}}>
            <Line 
            data={{
                datasets: props.processedLineData
            }}
            options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    yAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: "Amount"
                        }
                    }],
                    xAxes: [{
                        type: 'linear',
                        display: true,
                        ticks: {
                            callback: function(value){
                                let date = (new Date(value*1000))
                                return date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate()
                            }
                        },
                        scaleLabel: {
                            display: true,
                            labelString: "Date"
                        }
                    }]
                }
            }}
            />
            </div>
            <button onClick={handleCSVPrint}>Print Test CSV Bakcend</button>
            <button onClick={() => {handleToggleTotal(props)}}>Toggle Total</button>
            <form encType='multipart/form-data' onSubmit={(e)=>{handleSendBackFile(e, props)}}>
                <input type="file" 
                       value={props.submittedFile ? props.submittedFile : ""} 
                       accept=".xls,.xlsx,.csv" 
                       onChange={(e) => {handleFileSubmit(e, props)}}/>
                <button type="submit">Send Back File</button>
            </form>
        </div>
    );
}

function loadGraphData(props){
    let data = Fetcher.getLineGraphData(props.lineDataColumns)
    data.then((json) => {
        json = json.map((dataArr, index) => {
            return {
                label: dataArr['header'],
                data: dataArr['data'],
                backgroundColor: linearOpacity(index),
                pointBackgroundColor: linear(index),
                pointHoverBackgroundColor: linear(index),
                pointBorderColor: "rgb(0,0,0,0)",
                lineTension: 0,
                pointRadius: "2"
            }
        })
        props.setLineData(json)
        calcProcessedLineData(props, json)
    })
}

function calcProcessedLineData(props, data){
    data = [...data]
    if(props.lineDataColumns == "STD"){
        let totalIndex = data.indexOf((element) => {
            return element['label'] == "Total Income"
        })
        data.splice(totalIndex, 1)
    }
    props.setProcessedLineData(data)
}

function handleCSVPrint(event){
    Fetcher.printCSV()
    .then(console.log)
}

function handleToggleTotal(props){
    if(props.lineDataColumns === "STD"){
        props.setLineDataColumns("ALL")
    } else {
        props.setLineDataColumns("STD")
    }
}

function handleFileSubmit(event, props){
    props.setSubmittedFile(event.target.value)
}

function handleSendBackFile(e, props){
    e.preventDefault()
    if(props.submittedFile){
        let data = new FormData()
        data.append('file', e.target.querySelector("input").files[0])
        data.append('filename', e.target.querySelector("input").files[0].name)
        
        Fetcher.submitFile(data)
        .then(console.log)
    }
}

function mapStateToProps(state){
    return {
        lineData: state.lineData,
        lineDataColumns: state.lineDataColumns,
        processedLineData: state.processedLineData,
        submittedFile: state.submittedFile
    }
}

function mapDispatchToProps(dispatch){
    return {
        setLineData: (data) => {
            dispatch({
                type: "SET_LINE_DATA",
                value: data
            })
        },
        setSubmittedFile: (file) => {
            dispatch({
                type: "SET_SUBMITTED_FILE",
                value: file
            })
        },
        setLineDataColumns: (columns) => {
            dispatch({
                type: "SET_LINE_DATA_COLUMNS",
                value: columns
            })
        },
        setProcessedLineData: (data) => {
            dispatch({
                type: "SET_PROCESSED_LINE_DATA",
                value: data
            })
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Main);