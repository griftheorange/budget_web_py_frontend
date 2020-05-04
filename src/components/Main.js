import React, { useEffect } from 'react';
import {connect} from 'react-redux'
import * as d3 from 'd3'

import LineComp from '../components/LineComp.js'
import TableComp from '../components/TableComp.js'
import Fetcher from '../adaptors/dataFetcher.js'
import '../CSS/Main.css'

// D3 Functions below set linear scale for line-object styling
// See 'loadData' function for usage
const linear = d3.scaleLinear()
    .domain([0, 4])
    .range(["rgb(32,6,162,1)", "rgb(255,171,50,1)"])
const linearOpacity = d3.scaleLinear()
    .domain([0, 4])
    .range(["rgb(32,6,162,0.05)", "rgb(255,171,50,0.05)"])


function Main(props) {
    // Loads Data on mount, then never runs
    useEffect(() => {
        loadData(props)
    }, [])

    // When state lineDataColumns changes, recalcs processed line data for graphing based on data state
    useEffect(() => {
        if(props.data){
            calcProcessedLineData(props, props.data)
        }
    }, [props.lineDataColumns])

    return (
        <div className={'window'}>
            <div className={'graph-block'}>
                <div className={'bordered line-graph'}>
                    <LineComp/>
                </div>
                <div className={'bordered button-block'}>
                    <button onClick={handleCSVPrint}>Print Test CSV Backend</button>
                    <button onClick={() => {handleToggleTotal(props)}}>Toggle Total</button>
                    <form encType='multipart/form-data' onSubmit={(e)=>{handleSendBackFile(e, props)}}>
                        <select value={props.selectedCardType} onChange={(e) => {handleSelectChange(e, props)}}>
                            <option value='TD'>TD Visa Card</option>
                            <option value='Discover'>Discover IT Card</option>
                        </select>
                        <input type="file" 
                            value={props.submittedFile ? props.submittedFile : ""} 
                            accept=".xls,.xlsx,.csv" 
                            onChange={(e) => {handleFileSubmit(e, props)}}/>
                        <button type="submit">Send Back File</button>
                    </form>
                    <button onClick={(e) => {handlePickleReset(e, props)}}>Reset Pickle</button>
                </div>
            </div>
            <div className={'bordered table-block'}>
                <TableComp/>
            </div>
        </div>
    );
}

// Fetches packaged data from Fetcher class,
// 'data' key holds full table data for rendering in table-block
// 'line_data' key holds formatted line graph data from backend
// 'line_data' is mapped on front-end for compatability with Chart.js library, then saved to state
// 'line_data is passed to calcProcessed Data for final filters
function loadData(props){
    let data = Fetcher.getData(props.lineDataColumns)
    data.then((json) => {
        json['line_data'] = json['line_data'].map((dataArr, index) => {
            return {
                label: dataArr['header'],
                data: dataArr['data'],
                backgroundColor: linearOpacity(index),
                pointBackgroundColor: linear(index),
                pointHoverBackgroundColor: linear(index),
                pointBorderColor: "rgb(0,0,0,0)",
                lineTension: 0,
                pointRadius: "1"
            }
        })
        props.setData(json)
        calcProcessedLineData(props, json)
    })
}

// Helps with toggleing filters, accesses data state and sets processed data after applying series filters
// This is separate from the buit-in filters in the Chart.js library
function calcProcessedLineData(props, data){
    data = [...data['line_data']]
    if(props.lineDataColumns == "STD"){
        let totalIndex = data.indexOf((element) => {
            return element['label'] == "Total Income"
        })
        data.splice(totalIndex, 1)
    }
    props.setProcessedLineData(data)
}

// Toggles the columns visible by Chart.js
function handleToggleTotal(props){
    if(props.lineDataColumns === "STD"){
        props.setLineDataColumns("ALL")
    } else {
        props.setLineDataColumns("STD")
    }
}

function handleSelectChange(event, props){
    props.setSelectedCardType(event.target.value)
}

// File input is a controlled form, but might not need to be,
// since sending data to back end doesn't pull from state due to,
// C:fakepath issues
function handleFileSubmit(event, props){
    props.setSubmittedFile(event.target.value)
}

// If a file is submitted, formats a formData Object and inserts the file and filename,
// then sends this object to the submit_file fetcher
// Needed to be formatted this way for compatibility with flask
// On return of file sendback, re-loads data for graph and table with updated data
function handleSendBackFile(e, props){
    e.preventDefault()
    if(props.submittedFile){
        let data = new FormData()
        data.append('file', e.target.querySelector("input").files[0])
        data.append('filename', e.target.querySelector("input").files[0].name)
        
        Fetcher.submitFile(data, props.selectedCardType)
        .then(r => {loadData(props)})
    }
}

//################################################################
// Redux Functions Below
function mapStateToProps(state){
    return {
        data: state.data,
        lineDataColumns: state.lineDataColumns,
        processedLineData: state.processedLineData,
        submittedFile: state.submittedFile,
        selectedCardType: state.selectedCardType
    }
}
function mapDispatchToProps(dispatch){
    return {
        setData: (data) => {
            dispatch({
                type: "SET_DATA",
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
        },
        setSelectedCardType: (type) => {
            dispatch({
                type: "SET_SELECTED_CARD_TYPE",
                value: type
            })
        }
    }
}

//##############################################################
// Testing functions below

// Sends request to re-load data from backup for testing
function handlePickleReset(e, props){
    Fetcher.resetPickle()
    .then((r) => {
        loadData(props)
    })
}

// Prints CSV on backend for testing
function handleCSVPrint(event){
    Fetcher.printCSV()
    .then(console.log)
}


export default connect(mapStateToProps, mapDispatchToProps)(Main);