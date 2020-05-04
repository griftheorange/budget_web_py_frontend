import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import '../CSS/TableComp.css'

// Expected headers from received data
const headers = [
    'Transaction History',
    'Date',
    'Type',
    'Cost',
    'Checking',
    'Savings',
    'Total',
    'Total Income'
]
const typeCategories = [
    'BUSINESS',
    'DINING',
    'ENTERTAINMENT',
    'GAS',
    'GROCERY',
    'HEALTHCARE',
    'INCOME',
    'RENT',
    'SCHOOL',
    'SHOPPING',
    'TAX',
    'TRANSFER',
    'TRAVEL',
    'UNTRACKED',
    'UTILITIES',
    'UTILITY'
]


function TableComp(props) {
    return (
        <TableContainer component={Paper}>
            <Table size="small" aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {genHeaders(headers)}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {genRows(props)}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

// Uses the headers array to generate array of bolded header cells
function genHeaders(headers){
    return headers.map((header, index) => {
        return <TableCell style={{fontWeight: "bold"}}
                          key={index} 
                          align={index < 1 ? 'left' : 'right'}>{header == "Date" ? "Date MM/DD/YY" : header}</TableCell>
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
                    {headers.map((header, index) => {
                        switch(header){
                            case "Transaction History":
                                return (
                                    <TableCell data-loc={[keys[i], header]} 
                                               key={index} 
                                               align='left'>
                                        {data[header][keys[i]]}
                                    </TableCell>
                                )
                            case "Type":
                                let cellValue = data[header][keys[i]]
                                return (
                                    <TableCell data-loc={[keys[i], header]} 
                                               key={index} 
                                               align='right' 
                                               onClick={typeCategories.includes(cellValue) ? null : handleOnClick} 
                                               onBlur={typeCategories.includes(cellValue) ? null : handleOnBlur}>
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
function handleOnClick(event){
    event.target.setAttribute('contenteditable', 'true')
    event.target.focus()
}

function handleOnBlur(event){
    event.target.setAttribute('contenteditable', 'false')
    console.log('focus left')
}

//####################################################################
//Redux funcitons below

function mapStateToProps(state){
    return {
        data: state.data
    }
}

function mapDispatchToProps(dispatch){
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(TableComp);