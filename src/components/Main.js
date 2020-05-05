import { Button, Container, Form } from 'semantic-ui-react'
import React, { useEffect } from 'react';
import {connect} from 'react-redux'

import Sidebars from './mainBlocks/SideBars/Sidebars.js'
import TableComp from './mainBlocks/TableBlock/TableComp.js'
import LineComp from '../components/graphs/LineComp.js'
import PieComp from '../components/graphs/PieComp.js'

import SupportFunctions from '../adaptors/supportFuncs.js'
import Fetcher from '../adaptors/dataFetcher.js'
import '../CSS/Main.css'

 
function Main(props) {
    // Loads Data on mount, then never runs
    useEffect(() => {
        loadData(props)
    }, [])

    return (
        <Sidebars loadData={() => {loadData(props)}}>
            <div className={'window'}>

                {/* Graph Block */}
                <div className={props.fullscreenGraph ? 'graph-block fullscreen' : 'graph-block'}>

                    {/* Da Graph */}
                    <div className={props.fullscreenGraph ? 'bordered graph fullscreen' : 'bordered graph'} style={{position: 'relative'}}>
                        <div style={{position: 'absolute', top:'1em', right: '1em'}}>
                            <Button size={'mini'} icon={'expand arrows alternate'} onClick={props.toggleFullscreenGraph}></Button>
                        </div>
                        <div style={{position: 'absolute', top:'4em', right: '1em'}}>
                            <Button size={'mini'} icon={'chart line'} onClick={()=>{props.setGraphInView('line_graph')}}></Button>
                        </div>
                        <div style={{position: 'absolute', top:'7em', right: '1em'}}>
                            <Button size={'mini'} icon={'dollar sign'} onClick={()=>{props.setGraphInView('income_pie_graph')}}></Button>
                        </div>
                        <div style={{position: 'absolute', top:'10em', right: '1em'}}>
                            <Button size={'mini'} icon={'arrow alternate circle down'} onClick={()=>{props.setGraphInView('spendings_pie_graph')}}></Button>
                        </div>
                        {genGraph(props)}
                    </div>
                    {/* End Uh Da Graph */}

                    {/* Buttons Below Da Graph */}
                    <div className={'bordered button-block'}>
                        <Container style={{border: '1px solid black', width:'50%', display:'flex', flexDirection:'column'}}>
                            <Button style={{width: '80%',margin:'auto',marginLeft:'10%',marginRight:'10%'}}>New Card</Button>
                            <Button style={{width: '80%',margin:'auto',marginLeft:'10%',marginRight:'10%'}} onClick={() => {props.setSaveChangesOpen(true)}}>Save Changes to Backup</Button>
                            <Button style={{width: '80%',margin:'auto',marginLeft:'10%',marginRight:'10%'}} onClick={() => {props.setExportExcelFormOpen(true)}}>Export File</Button>
                            <Button style={{width: '80%',margin:'auto',marginLeft:'10%',marginRight:'10%'}} onClick={() => {props.setResetFromBackupFormOpen(true)}}>Reset From Backup</Button>
                        </Container>
                        <Container style={{border: '1px solid black', width:'50%', display:'flex', flexDirection:'column'}}>
                            <Form style={{margin: '1em'}}encType='multipart/form-data' onSubmit={(e)=>{handleSendBackFile(e, props)}}>
                                <Form.Field>
                                <select value={props.selectedCardType} onChange={(e) => {handleSelectChange(e, props)}}>
                                    <option value='TD'>TD Visa Card</option>
                                    <option value='Discover'>Discover IT Card</option>
                                </select>
                                </Form.Field>
                                <Form.Field>
                                <input type="file" 
                                    value={props.submittedFile ? props.submittedFile : ""} 
                                    accept=".xls,.xlsx,.csv" 
                                    onChange={(e) => {handleFileSubmit(e, props)}}/>
                                </Form.Field>
                                <Button type="submit">Send Back File</Button>
                            </Form>
                        </Container>
                    </div>
                    {/* Buttons Below Da Graph End Here */}

                </div>
                {/* End of Graph Block Component */}

                {/* Da Table */}
                <div style={{position: 'relative'}} className={props.fullscreenGraph ? 'bordered table-block fullscreen' : 'bordered table-block'}>
                    <div style={{position: 'absolute', top:'1em', right: '1em'}}>
                        <Button size={'mini'} icon={'refresh'} onClick={() => {loadData(props)}}></Button>
                    </div>
                    <div style={{position: 'absolute', top:'4em', right: '1em'}}>
                        <Button size={'mini'} icon={'plus'} onClick={() => {props.setNewEntryFormOpen(true)}}></Button>
                    </div>
                    <TableComp/>
                </div>
                {/* End Uh Da Table */}
            </div>
        </Sidebars>
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
                hidden: dataArr['header'] === 'Total Income',
                backgroundColor: SupportFunctions.linearOpacity(index),
                pointBackgroundColor: SupportFunctions.linear(index),
                pointHoverBackgroundColor: SupportFunctions.linear(index),
                pointBorderColor: "rgb(0,0,0,0)",
                lineTension: 0,
                pointRadius: "1"
            }
        })
        json['income_pie_data']['data'] = [{
            data: json['income_pie_data']['data'],
            backgroundColor: genIncomeFills(json['income_pie_data']['labels']),
            borderWidth: new Array(json['income_pie_data']['labels'].length).fill(0.2)
        }]
        json['spendings_pie_data']['data'] = [{
            data: json['spendings_pie_data']['data'],
            backgroundColor: genSpendingsFills(json['spendings_pie_data']['labels']),
            borderWidth: new Array(json['income_pie_data']['labels'].length).fill(0.2)
        }]
        props.setData(json)
        calcProcessedLineData(props, json)
    })
}

// Helps with toggleing filters, accesses data state and sets processed data after applying series filters
// This is separate from the buit-in filters in the Chart.js library
function calcProcessedLineData(props, data){
    data = [...data['line_data']]
    props.setProcessedLineData(data)
}

function genIncomeFills(labels){
    let colors = []
    for(let i = 0; i < labels.length; i++){
        if(labels[i] === "INCOME"){
            colors.push('rgb(10,76,26,1)')
        }else{
            colors.push(SupportFunctions.incomePieLinear(i))
        }
    }
    return colors
}

function genSpendingsFills(labels){
    let colors = []
    for(let i = 0; i < labels.length; i++){
        colors.push(SupportFunctions.spendingsPieLinear(i))
    }
    return colors
}

function genGraph(props){
    switch(props.graphInView){
        case "line_graph":
            return <LineComp/>
        case "income_pie_graph":
            return <PieComp pieData={props.data ? props.data['income_pie_data'] : null} pieType={'income_pie_data'}/>
        case "spendings_pie_graph":
            return <PieComp pieData={props.data ? props.data['spendings_pie_data'] : null} pieType={'spendings_pie_data'}/>
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
        selectedCardType: state.selectedCardType,
        fullscreenGraph: state.fullscreenGraph,
        graphInView: state.graphInView
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
        },
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
        },
        setSidebarOpen: (open) => {
            dispatch({
                type: "SET_SIDEBAR_OPEN",
                value: open
            })
        },
        setSaveChangesOpen: (open) => {
            dispatch({
                type: "SET_SAVE_CHANGES_OPEN",
                value: open
            })
        },
        setExportExcelFormOpen: (open) => {
            dispatch({
                type: "SET_EXPORT_EXCEL_FORM_OPEN",
                value: open
            })
        },
        setResetFromBackupFormOpen: (open) => {
            dispatch({
                type: "SET_RESET_FROM_BACKUP_FORM_OPEN",
                value: open
            })
        },
        setNewEntryFormOpen: (open) => {
            dispatch({
                type: "SET_NEW_ENTRY_FORM_OPEN",
                value: open
            })
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Main);