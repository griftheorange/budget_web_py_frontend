import React from 'react';

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { connect } from 'react-redux';

import '../CSS/TableComp.css'

function TableComp(props) {
    if(props.data){
        return (
            <TableContainer component={Paper}>
                <Table size="small" aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {genHeaders(props.data['columns'])}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {genRows(props)}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    } else {
        return null
    }
}

// Uses the headers array to generate array of bolded header cells
function genHeaders(headers){
    return headers.map((header, index) => {
        return <TableCell style={{fontWeight: "bold"}}
                          key={index} 
                          align={index < 1 ? 'left' : 'right'}>{header === "Date" ? "Date MM/DD/YY" : header}</TableCell>
    })
}

// Generates Rows based on 'table_data' in data state
function genRows(props){
    let rows = []
    if(props.data){
        let data = props.data['table_data']
        let keys = Object.keys(data['Cost']).reverse()
        // Iterate through keys ('length' of object)
        for (let i = 0; i < keys.length; i++){
            // For each row, map through headers returning a TableCell Component
            // appropriate for that column
            rows.push(
                <TableRow key={i}>
                    {props.data['columns'].map((header, index) => {
                        switch(header){
                            case "Transaction History":
                                return (
                                    <TableCell data-loc={[keys[i], header]} 
                                               key={index} 
                                               align='left'>
                                        {keys[i]+': '+data[header][keys[i]]}
                                    </TableCell>
                                )
                            case "Type":
                                let cellValue = data[header][keys[i]]
                                return (
                                    <TableCell data-loc={[keys[i], header]} 
                                               key={index} 
                                               align='right' 
                                               onClick={props.data['categories'].includes(cellValue) ? null : (e) => {handleOnClick(e, props)}}>
                                        {cellValue}
                                    </TableCell>
                                )
                            default:
                                return (
                                    <TableCell data-loc={[keys[i], header]} 
                                               key={index} 
                                               align='right'>
                                        {data[header][keys[i]]}
                                    </TableCell>
                                )
                        }
                    })}
                </TableRow>
            )
        }
    }
    return rows
}

// Responds to click event for single table cell
function handleOnClick(event, props){
    props.setElementInEdit(event.target)
    props.setSidebarOpen(true)
}

//####################################################################
//Redux funcitons below

function mapStateToProps(state){
    return {
        data: state.data
    }
}

function mapDispatchToProps(dispatch){
    return {
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
        setListenerInEdit: (listener) => {
            dispatch({
                type: "SET_LISTENER_IN_EDIT",
                value: listener
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TableComp);