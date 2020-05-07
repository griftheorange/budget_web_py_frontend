import React from 'react';
import { Container, Divider, Form, Button } from 'semantic-ui-react'

import DirectoryList from './DirectoryList.js'

import SupportFunctions from '../../../adaptors/supportFuncs.js'
import Handlers from './Handlers.js'


export default class Generators{
    static genResetFromBackupForm(props){
        return (
            <>
                <Container style={{display: 'flex', padding: '0.2em'}} className='sidebar-button-div'>
                    <Button size={'mini'} 
                            inverted={true} 
                            color={'red'}
                            style={{marginLeft: '13em'}}
                            onClick={() => {props.setResetFromBackupFormOpen(false)}}>X</Button>
                </Container>
                <Container>
                    <Divider/>
                </Container>
                <Container style={{border: '1px solid black', height: '45em', paddingLeft: '0.5em', paddingRight: '0.5em', overflowY: 'scroll'}}>
                    <DirectoryList loadData={props.loadData} activeListeners={true}/>
                </Container>
            </>
        )
    }
    
    static genNewCardForm(props){
        return (
            <>
                <Container style={{display: 'flex', padding: '0.2em'}} className='sidebar-button-div'>
                    <Button size={'mini'} 
                            inverted={true} 
                            color={'red'}
                            style={{marginLeft: '13em'}}
                            onClick={() => {props.setNewCardFormOpen(false)}}>X</Button>
                </Container>
                <Container>
                    <Divider/>
                </Container>
                <Container>
                    <Form onSubmit={() => {Handlers.handleNewCardSubmit(props)}} style={{paddingLeft: '0.5em', paddingRight: '0.5em'}}>
                        <Form.Field>
                            <label>Card Name</label>
                            <input id={'Card_Name_Input'} placeholder='Card Name'/>
                        </Form.Field>
                        <Form.Field>
                            <label>Transaction History:</label>
                            <input id={'TH_Source_Input'} placeholder='Card Name'/>
                        </Form.Field>
                        <Form.Field>
                            <label>Date</label>
                            <input id={'Date_Source_Input'} placeholder='Card Name'/>
                        </Form.Field>
                        <Form.Field>
                            <label>Cost</label>
                            <input id={'Cost_Source_Input'} placeholder='Card Name'/>
                        </Form.Field>
                        <Button type='submit'>Submit</Button>
                    </Form>
                </Container> 
            </>
        )
    }

    static genDeleteCardForm(props){
        return (
            <>
                <Container style={{display: 'flex', padding: '0.2em'}} className='sidebar-button-div'>
                    <Button size={'mini'} 
                            inverted={true} 
                            color={'red'}
                            style={{marginLeft: '13em'}}
                            onClick={() => {props.setDeleteCardFormOpen(false)}}>X</Button>
                </Container>
                <Container>
                    <Divider/>
                </Container>
                <Container>
                    <Form onSubmit={() => {Handlers.handleDeleteCardSubmit(props)}} style={{paddingLeft: '0.5em', paddingRight: '0.5em'}}>
                        <Form.Field>
                            <label>Select Card</label>
                            <select id={'Card_Delete_Input'} defaultValue="">
                                <option value="" disabled>Select a Card to Delete</option>
                                {props.data ? SupportFunctions.genOptions(props.data['cards']) : null}
                            </select>
                        </Form.Field>
                        <Button type='submit'>Submit</Button>
                    </Form>
                </Container> 
            </>
        )
    }

    static genExportForm(props){
        return (
            <>
                <Container style={{display: 'flex', padding: '0.2em'}} className='sidebar-button-div'>
                    <Button size={'mini'} 
                            inverted={true} 
                            color={'red'}
                            style={{marginLeft: '13em'}}
                            onClick={() => {props.setExportExcelFormOpen(false)}}>X</Button>
                </Container>
                <Container>
                    <Divider/>
                </Container>
                <Container>
                    <Form onSubmit={() => {Handlers.handleExportRequest(props)}} style={{paddingLeft: '0.5em', paddingRight: '0.5em'}}>
                        <Form.Field>
                            <label>Export Filename</label>
                            <input id={'Export_Filename_Input'} defaultValue={`budget_${SupportFunctions.formattedCurrentDate()}.xlsx`}/>
                        </Form.Field>
                        <Button type='submit'>Submit</Button>
                    </Form>
                </Container> 
            </>
        )
    }

    static genSaveChangesForm(props){
        return (
            <>
                <Container style={{display: 'flex', padding: '0.2em'}} className='sidebar-button-div'>
                    <Button size={'mini'} 
                            inverted={true} 
                            color={'red'}
                            style={{marginLeft: '13em'}}
                            onClick={() => {props.setSaveChangesOpen(false)}}>X</Button>
                </Container>
                <Container>
                    <Divider/>
                </Container>
                <Container>
                    <Form onSubmit={() => {Handlers.handleBackupSubmit(props)}} style={{paddingLeft: '0.5em', paddingRight: '0.5em'}}>
                        <Form.Field>
                            <label>Filename To be Saved</label>
                            <input id={'Backup_Filename_Input'} defaultValue={`backup_${SupportFunctions.formattedCurrentDate()}.p`}/>
                        </Form.Field>
                        <Button type='submit'>Submit</Button>
                    </Form>
                    <Divider/>
                    <Container style={{border: '1px solid black', height: '32em', paddingLeft: '0.5em', paddingRight: '0.5em', overflowY: 'scroll'}}>
                        <DirectoryList loadData={props.loadData} activeListeners={false}/>
                    </Container>
                </Container>
            </>
        )
    }

    static genNewEntryForm(props){
        let date = SupportFunctions.formattedCurrentDate()
        return (
            <>
                <Container style={{display: 'flex', padding: '0.2em'}} className='sidebar-button-div'>
                    <Button size={'mini'} 
                            inverted={true} 
                            color={'red'}
                            style={{marginLeft: '0.5em'}}
                            onClick={() => {props.setNewEntryFormOpen(false)}}>X</Button>
                </Container>
                <Container>
                    <Divider/>
                </Container>
                <Container>
                    <Form onSubmit={(e)=>{Handlers.handleNewEntrySubmit(props)}}>
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
                                <option value=""></option>
                                {props.data ? SupportFunctions.genOptions(props.data['categories']) : null}
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
            </>
        )
    }

    static genDeleteEntryForm(props){
        return (
            <>
                <Container style={{display: 'flex', padding: '0.2em'}} className='sidebar-button-div'>
                    <Button size={'mini'} 
                            inverted={true} 
                            color={'red'}
                            style={{marginLeft: '0.5em'}}
                            onClick={() => {props.setDeleteEntryFormOpen(false)}}>X</Button>
                </Container>
                <Container>
                    <Divider/>
                </Container>
                <Container>
                    <Form onSubmit={(e)=>{Handlers.handleDeleteEntrySubmit(props)}}>
                        <Form.Field style={{margin: 0, padding: '0.5em'}}>
                            <label>Index To Delete</label>
                            <input type='number' id={'Delete_Index_Input'} placeholder='Index'/>
                        </Form.Field>
                        <Divider/>
                        <Button style={{width: '90%', margin: '5%'}} type='submit'>Submit</Button>
                    </Form>
                </Container>
            </>
        )
    }

    static genCategorySelectionForm(props){
        let buttons = []
        buttons.push(
            <>
                <Container style={{display: 'flex', padding: '0.2em'}} className='sidebar-button-div'>
                    <Button size={'mini'} 
                            inverted={true} 
                            color={'red'}
                            style={{marginLeft: '0.5em'}}
                            onClick={() => {Handlers.handleTypeSelection('CLOSE', props)}}>X</Button>
                </Container>
                <Container>
                    <Divider/>
                </Container>
            </>
        ) 
        if(props.data){
            for(let category in props.data['categories']){
                let catString = props.data['categories'][category]
                buttons.push(
                    <Container style={{display: 'flex', padding: '0.2em'}} className='sidebar-button-div'>
                        <Button onClick={() => {Handlers.handleTypeSelection(catString, props)}}
                                inverted={true}
                                color={'green'}
                                style={{margin: 'auto', width: '90%'}}>{catString}</Button>
                    </Container>
                )
            }
        }
        return buttons
    }

    static genInitializeForm(props){
        return (
            <>
                <Container style={{display: 'flex', padding: '0.2em'}} className='sidebar-button-div'>
                    <Button size={'mini'} 
                            inverted={true} 
                            color={'red'}
                            style={{marginLeft: '13em'}}
                            onClick={() => {props.setInitializeFormOpen(false)}}>X</Button>
                </Container>
                <Container>
                    <Divider/>
                </Container>
                <Container>
                    <Form onSubmit={(e)=>{Handlers.handleInitFileSubmit(props)}}>
                        <Form.Field style={{margin: 0, padding: '0.5em'}}>
                            <label>Seed File</label>
                            <input type='file' accept=".xlsx,.csv,.p" id={'Init_File_Input'} placeholder='Init File'/>
                        </Form.Field>
                        <Divider/>
                        <Button style={{width: '90%', margin: '5%'}} type='submit'>Submit</Button>
                    </Form>
                </Container>
            </>
        )
    }
}