import React, { useEffect } from 'react';
import {connect} from 'react-redux'
import * as d3 from 'd3'
import Sidebar from 'react-sidebar'
import { Button, Container, Divider, Header, Form } from 'semantic-ui-react'

import DirectoryList from '../components/DirectoryList.js'
import LineComp from '../components/graphs/LineComp.js'
import PieComp from '../components/graphs/PieComp.js'
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
const incomePieLinear = d3.scaleLinear()
    .domain([0, 13])
    .range(["rgb(153,21,3,1)", "rgb(181,133,56,1)"])
const spendingsPieLinear = d3.scaleLinear()
    .domain([0, 10])
    .range(["rgb(160,207,232,1)", "rgb(34,2,74,1)"])


function Main(props) {
    // Loads Data on mount, then never runs
    useEffect(() => {
        loadData(props)
    }, [])

    return (
        // Reset from Backup File Prompt
        <Sidebar sidebar={
                        <div className={'sidebar-block'}>
                            <Header textAlign={'center'} style={{padding: '0.5em', margin: '0'}}>Reset From Backup</Header>
                            {getResetFromBackupForm(props)}
                        </div>} 
                 open={props.resetFromBackupFormOpen} 
                 pullRight={false}>
        {/* Export Excel File Prompt IN PROGRESS*/}
        <Sidebar sidebar={
                        <div className={'sidebar-block'}>
                            <Header textAlign={'center'} style={{padding: '0.5em', margin: '0'}}>Export File</Header>
                            <Header.Subheader style={{textAlign: 'center', padding:'0.5em', margin:'0'}}>File will export as .xlsx, .csv, or .p ('pickle') based on the file tag you input</Header.Subheader>
                            {getExportExcelForm(props)}
                        </div>} 
                 open={props.exportExcelFormOpen} 
                 pullRight={false}>
        {/* Save Changes Prompt DONE*/}
        <Sidebar sidebar={
                        <div className={'sidebar-block'}>
                            <Header textAlign={'center'} style={{padding: '0.5em', margin: '0'}}>Save Changes to Backup</Header>
                            <Header.Subheader style={{textAlign: 'center', padding:'0.5em', margin:'0'}}>Files with the same name will overwrite on backend</Header.Subheader>
                            {getSaveChangesForm(props)}
                        </div>} 
                 open={props.saveChangesOpen} 
                 pullRight={false}>
        {/* New Table Entry Sidebar DONE*/}
        <Sidebar sidebar={
                        <div className={'sidebar-block'}>
                            <Header textAlign={'center'} style={{padding: '0.5em', margin: '0'}}>Insert Entry</Header>
                            {getNewEntryForm(props)}
                        </div>} 
                 open={props.newEntryFormOpen} 
                 pullRight={true}>
        {/* Update Cell in Type Column Sidebar DONE*/}
        <Sidebar sidebar={
                        <div className={'sidebar-block'}>
                            <Header textAlign={'center'} style={{padding: '0.5em', margin: '0'}}>Select Value</Header>
                            {genSidebarButtons(props)}
                        </div>} 
                 open={props.sidebarOpen} 
                 pullRight={true}>
            <div className={'window'}>
                <div className={props.fullscreenGraph ? 'graph-block fullscreen' : 'graph-block'}>
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
                        {getGraph(props)}
                    </div>
                    <div className={'bordered button-block'}>
                        <Container style={{border: '1px solid black', width:'50%', display:'flex', flexDirection:'column'}}>
                            <Button style={{width: '80%',margin:'auto',marginLeft:'10%',marginRight:'10%'}} onClick={() => {props.setSaveChangesOpen(true)}}>Save Changes to Backup</Button>
                            <Button style={{width: '80%',margin:'auto',marginLeft:'10%',marginRight:'10%'}} onClick={() => {props.setExportExcelFormOpen(true)}}>Export File</Button>
                            <Button style={{width: '80%',margin:'auto',marginLeft:'10%',marginRight:'10%'}} onClick={(e) => {handlePickleReset(e, props)}}>Reset From Backup</Button>
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
                </div>
                <div style={{position: 'relative'}} className={props.fullscreenGraph ? 'bordered table-block fullscreen' : 'bordered table-block'}>
                    <div style={{position: 'absolute', top:'1em', right: '1em'}}>
                        <Button size={'mini'} icon={'refresh'} onClick={() => {loadData(props)}}></Button>
                    </div>
                    <div style={{position: 'absolute', top:'4em', right: '1em'}}>
                        <Button size={'mini'} icon={'plus'} onClick={() => {props.setNewEntryFormOpen(true)}}></Button>
                    </div>
                    <TableComp/>
                </div>
            </div>
        </Sidebar>
        </Sidebar>
        </Sidebar>
        </Sidebar>
        </Sidebar>
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
                backgroundColor: linearOpacity(index),
                pointBackgroundColor: linear(index),
                pointHoverBackgroundColor: linear(index),
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
            colors.push(incomePieLinear(i))
        }
    }
    return colors
}

function genSpendingsFills(labels){
    let colors = []
    for(let i = 0; i < labels.length; i++){
        colors.push(spendingsPieLinear(i))
    }
    return colors
}

function getGraph(props){
    switch(props.graphInView){
        case "line_graph":
            return <LineComp/>
        case "income_pie_graph":
            return <PieComp pieType={'income_pie_data'}/>
        case "spendings_pie_graph":
            return <PieComp pieType={'spendings_pie_data'}/>
    }
}

function getNewEntryForm(props){
    let elements = []
    elements.push(
        <Container style={{display: 'flex', padding: '0.2em'}} className='sidebar-button-div'>
            <Button size={'mini'} 
                    inverted={true} 
                    color={'red'}
                    style={{marginLeft: '0.5em'}}
                    onClick={() => {props.setNewEntryFormOpen(false)}}>X</Button>
        </Container>
    )
    elements.push(
        <Container>
            <Divider/>
        </Container>
    )
    let date = formattedCurrentDate()
    elements.push(
        <Container>
            <Form onSubmit={(e)=>{handleNewEntrySubmit(e, props)}}>
                <Form.Field style={{margin: 0, padding: '0.5em'}}>
                    <label>Transaction History</label>
                    <input id={'Transaction_History_Input'} placeholder='Name of Entry'/>
                </Form.Field>
                <Form.Field style={{margin: 0, padding: '0.5em'}}>
                    <label>Date</label>
                    <input id={'Date_Input'} type='date' defaultValue={date}/>
                </Form.Field>
                <Form.Field style={{margin: 0, padding: '0.5em'}}>
                    <label>Type</label>
                    <select defaultValue="" id={'Type_Input'} >
                        {props.data ? genOptions(props.data['categories']) : null}
                    </select>
                </Form.Field>
                <Form.Field style={{margin: 0, padding: '0.5em'}}>
                    <label>Cost</label>
                    <input id={'Cost_Input'} type='number' step='0.01'/>
                </Form.Field>
                <Divider/>
                <Button style={{width: '90%', margin: '5%'}} type='submit'>Submit</Button>
            </Form>
        </Container>
    )
    return elements
}

function getSaveChangesForm(props){
    let elements = []
    elements.push(
        <Container style={{display: 'flex', padding: '0.2em'}} className='sidebar-button-div'>
            <Button size={'mini'} 
                    inverted={true} 
                    color={'red'}
                    style={{marginLeft: '13em'}}
                    onClick={() => {props.setSaveChangesOpen(false)}}>X</Button>
        </Container>
    )
    elements.push(
        <Container>
            <Divider/>
        </Container>
    )
    elements.push(
        <Container>
            <Form onSubmit={() => {handleBackupSubmit(props)}} style={{paddingLeft: '0.5em', paddingRight: '0.5em'}}>
                <Form.Field>
                    <label>Filename To be Saved</label>
                    <input id={'Backup_Filename_Input'} defaultValue={`backup_${formattedCurrentDate()}.p`}/>
                </Form.Field>
                <Button type='submit'>Submit</Button>
            </Form>
            <Divider/>
            <Container style={{border: '1px solid black', height: '32em', paddingLeft: '0.5em', paddingRight: '0.5em', overflowY: 'scroll'}}>
                <DirectoryList/>
            </Container>
        </Container>
    )
    let date = new Date(Date.now())
    return elements
}

function getExportExcelForm(props){
    let elements = []
    elements.push(
        <Container style={{display: 'flex', padding: '0.2em'}} className='sidebar-button-div'>
            <Button size={'mini'} 
                    inverted={true} 
                    color={'red'}
                    style={{marginLeft: '13em'}}
                    onClick={() => {props.setExportExcelFormOpen(false)}}>X</Button>
        </Container>
    )
    elements.push(
        <Container>
            <Divider/>
        </Container>
    )
    elements.push(
        <Container>
            <Form onSubmit={() => {handleExportRequest(props)}} style={{paddingLeft: '0.5em', paddingRight: '0.5em'}}>
                <Form.Field>
                    <label>Export Filename</label>
                    <input id={'Export_Filename_Input'} defaultValue={`budget_${formattedCurrentDate()}.xlsx`}/>
                </Form.Field>
                <Button type='submit'>Submit</Button>
            </Form>
        </Container>
    )
    return elements
}

function getResetFromBackupForm(){
    return null
}

function formattedCurrentDate(){
    let date = new Date(Date.now())
    date = date.getFullYear()+'-'+((date.getMonth()+1) < 10 ? '0'+(date.getMonth()+1) : (date.getMonth()+1))+'-'+(date.getDate() < 10 ? '0'+date.getDate() : date.getDate())
    return date
}

function genOptions(cats){
    let options = []
    options.push(<option value=""></option>)
    for(let i = 0; i < cats.length; i++){
        options.push(<option value={cats[i]}>{cats[i]}</option>)
    }
    return options
}

function genSidebarButtons(props){
    let buttons = []
    buttons.push(
        <Container style={{display: 'flex', padding: '0.2em'}} className='sidebar-button-div'>
            <Button size={'mini'} 
                    inverted={true} 
                    color={'red'}
                    style={{marginLeft: '0.5em'}}
                    onClick={() => {handleSidebarClose('CLOSE', props)}}>X</Button>
        </Container>
    )
    buttons.push(
        <Container>
            <Divider/>
        </Container>
    ) 
    if(props.data){
        for(let category in props.data['categories']){
            let catString = props.data['categories'][category]
            buttons.push(
                <Container style={{display: 'flex', padding: '0.2em'}} className='sidebar-button-div'>
                    <Button onClick={() => {handleSidebarClose(catString, props)}}
                            inverted={true}
                            color={'green'}
                            style={{margin: 'auto', width: '90%'}}>{catString}</Button>
                </Container>
            )
        }
    }
    return buttons
}

function handleNewEntrySubmit(event, props){
    let th = document.getElementById("Transaction_History_Input")
    let date = document.getElementById("Date_Input")
    let type = document.getElementById("Type_Input")
    let cost = document.getElementById("Cost_Input")
    if(th.value && date.value && cost.value){
        let json = {
            th:th.value,
            date:date.value,
            type:type.value,
            cost:cost.value
        }
        Fetcher.patchNewEntry(json)
        .then(r => r.json())
        .then((response) => {
            if(response.status === 'Success'){
                th.value = null
                date.value = formattedCurrentDate()
                type.value = ""
                cost.value = null
                props.setNewEntryFormOpen(false)
                loadData(props)
            }
        })
    }
}

function handleSidebarClose(category, props){
    if(category === 'CLOSE'){
        props.setElementInEdit(null)
        props.setSidebarOpen(false)
    } else {
        Fetcher.updateCell(category, props.elementInEdit.dataset.loc)
        .then(r => r.json())
        .then((response) => {
            if(response['status'] === 'Success'){
                // let index = parseInt(response['body']['index'])
                // let column = response['body']['column']
                let category = response['body']['category']
                // Below is 'proper' way to update the cell by modifying state
                // But it ends up being MUCH slower and effectively the same. Will make note in
                // case it becomes necessary later, but for now I won't use it
                //#############################
                // let newData = {...props.data}
                // newData['table_data'][column][index] = category
                // props.setData(newData)
                props.elementInEdit.innerHTML = category
                props.setElementInEdit(null)
                props.setSidebarOpen(false)
            } else {
                props.setElementInEdit(null)
                props.setSidebarOpen(false)
            }
        })
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

function handleBackupSubmit(props){
    let filenameInput = document.getElementById('Backup_Filename_Input')
    let filenameArr = filenameInput.value.split('.')
    let fileTag = filenameArr[filenameArr.length-1]
    if(['p', 'csv', 'xlsx'].includes(fileTag)){
        Fetcher.saveBackupAs(fileTag, filenameInput.value)
        .then(r => r.json())
        .then((response) => {
            if(response['status'] === 'Success'){
                filenameInput.value = 'backup_'+formattedCurrentDate()+'.p'
                props.setSaveChangesOpen(false)
                loadData(props)
            }
        })
    }
}

function handleExportRequest(props){
    let filenameInput = document.getElementById('Export_Filename_Input')
    let filenameArr = filenameInput.value.split('.')
    let fileTag = filenameArr[filenameArr.length-1]
    if(['p', 'csv', 'xlsx'].includes(fileTag)){
        Fetcher.requestExportFile(fileTag, filenameInput.value)
        .then(r => r.blob())
        .then((blob) => {
            saveFile(blob, filenameInput.value)
            filenameInput.value = 'budget_'+formattedCurrentDate()+'.xlsx'
            props.setExportExcelFormOpen(false)
            loadData(props)
        })
    }
}

// Uses hidden a tag to properly name URL downloaded blob file
function saveFile(blob, filename){
    let a = document.createElement('a')
    document.body.appendChild(a)
    a.style = "display: none"
    let url = window.URL.createObjectURL(blob)
    a.href = url
    a.download = filename
    a.click()
    window.URL.revokeObjectURL(url)
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
        sidebarOpen: state.sidebarOpen,
        newEntryFormOpen: state.newEntryFormOpen,
        saveChangesOpen: state.saveChangesOpen,
        exportExcelFormOpen: state.exportExcelFormOpen,
        resetFromBackupFormOpen: state.resetFromBackupFormOpen,
        elementInEdit: state.elementInEdit,
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
        setSidebarOpen: (open) => {
            dispatch({
                type: "SET_SIDEBAR_OPEN",
                value: open
            })
        },
        setElementInEdit: (element) => {
            dispatch({
                type: "SET_ELEMENT_IN_EDIT",
                value: element
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
        setNewEntryFormOpen: (open) => {
            dispatch({
                type: "SET_NEW_ENTRY_FORM_OPEN",
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