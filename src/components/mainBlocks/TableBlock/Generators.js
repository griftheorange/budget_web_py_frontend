import TableContainer from '@material-ui/core/TableContainer';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Table from '@material-ui/core/Table'
import Paper from '@material-ui/core/Paper';
import { Button } from 'semantic-ui-react'
import React from 'react'

import Handlers from './Handlers.js'

export default class Generators{
    static genButtons(props){
        return (
            <>
                <div style={{display: props.fullscreenGraph ? 'none' : 'block',position: 'fixed', top:'1em', right: '1.5em'}}>
                    <Button size={'mini'} icon={'refresh'} onClick={props.loadData}></Button>
                </div>
                <div style={{display: props.fullscreenGraph ? 'none' : 'block',position: 'fixed', top:'4em', right: '1.5em'}}>
                    <Button size={'mini'} icon={'plus'} onClick={() => {props.setNewEntryFormOpen(true)}}></Button>
                </div>
                <div style={{display: props.fullscreenGraph ? 'none' : 'block',position: 'fixed', top:'7em', right: '1.5em'}}>
                    <Button size={'mini'} icon={'trash alternate'} onClick={() => {props.setDeleteEntryFormOpen(true)}}></Button>
                </div>
                <div style={{display: props.fullscreenGraph ? 'none' : 'block',position: 'fixed', top:'10em', right: '1.5em'}}>
                    <Button size={'mini'} icon={'object ungroup'} onClick={() => {props.setEditCategoriesFormOpen(true)}}></Button>
                </div>
            </>
        )
    }
    
    static genTable(props){
        if(props.data){
            return (
                <TableContainer component={Paper}>
                    <Table size="small" aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {Generators.genHeaders(props.data['columns'])}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Generators.genRows(props)}
                        </TableBody>
                    </Table>
                </TableContainer>
            );
        } else {
            return null
        }
    }
    
    // Uses the headers array to generate array of bolded header cells
    static genHeaders(headers){
        return headers.map((header, index) => {
            return <TableCell style={{fontWeight: "bold"}}
                              key={index} 
                              align={index < 1 ? 'left' : 'right'}>{header === "Date" ? "Date MM/DD/YY" : header}</TableCell>
        })
    }
    
    // Generates Rows based on 'table_data' in data state
    static genRows(props){
        let rows = []
        let data = props.data['table_data']
        let keys = Object.keys(data['Cost']).reverse()
        // Iterate through keys ('length' of object)
        for (let i = 0; i < keys.length; i++){
            // For each row, map through headers returning a TableCell Component
            // appropriate for that column
            rows.push(
                <TableRow key={i} style={{position: 'relative'}}>
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
                                                onClick={props.data['categories'].includes(cellValue) ? null : (e) => {Handlers.handleOnClick(e, props)}}>
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
        return rows
    }
}