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

function genHeaders(headers){
    return headers.map((header, index) => {
        return <TableCell style={{fontWeight: "bold"}}
                          key={index} 
                          align={index < 1 ? 'left' : 'right'}>{header == "Date" ? "Date MM/DD/YY" : header}</TableCell>
    })
}

function genRows(props){
    let rows = []
    if(props.data){
        let data = props.data['data']
        let keys = Object.keys(data['Cost']).reverse()
        for (let i = 0; i < keys.length; i++){
            rows.push(
                <TableRow key={i}>
                    {headers.map((header, index) => {
                        switch(header){
                            case "Transaction History":
                                return <TableCell key={index} align='left'>{data[header][keys[i]]}</TableCell>
                            case "Date":
                                let date = new Date(data[header][keys[i]])
                                return <TableCell key={index} align='right'>{formatTableDate(date)}</TableCell>
                            case "Type":
                                return <TableCell key={index} align='right'>{data[header][keys[i]]}</TableCell>
                            default:
                                return <TableCell key={index} align='right'>{'$' + parseFloat(data[header][keys[i]]).toFixed(2)}</TableCell>
                        }
                    })}
                </TableRow>
            )
        }
    }
    return rows
}

function formatTableDate(dateObj){
    let month = (dateObj.getMonth() < 10 ? '0' + dateObj.getMonth() : dateObj.getMonth())
    let date = (dateObj.getDate() < 10 ? '0' + dateObj.getDate() : dateObj.getDate())
    let year = dateObj.getFullYear()
    return month+'/'+date+'/'+year
}

function mapStateToProps(state){
    return {
        data: state.data
    }
}

function mapDispatchToProps(dispatch){
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(TableComp);