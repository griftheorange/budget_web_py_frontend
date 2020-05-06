import { Button, Container, Form } from 'semantic-ui-react'
import React from 'react'

import Handlers from './Handlers.js'

export default class Generators{
    static genButtonBlock(props){
        return (
            <Container style={{border: '1px solid black', width:'50%', display:'flex', flexDirection:'column'}}>
                <Button style={{width: '80%',margin:'auto',marginLeft:'10%',marginRight:'10%'}}>New Card</Button>
                <Button style={{width: '80%',margin:'auto',marginLeft:'10%',marginRight:'10%'}} onClick={() => {props.setSaveChangesOpen(true)}}>Save Changes to Backup</Button>
                <Button style={{width: '80%',margin:'auto',marginLeft:'10%',marginRight:'10%'}} onClick={() => {props.setExportExcelFormOpen(true)}}>Export File</Button>
                <Button style={{width: '80%',margin:'auto',marginLeft:'10%',marginRight:'10%'}} onClick={() => {props.setResetFromBackupFormOpen(true)}}>Reset From Backup</Button>
            </Container>
        )
    }
    
    static genCardFileForm(props){
        return (
            <Container style={{border: '1px solid black', width:'50%', display:'flex', flexDirection:'column', position: 'relative'}}>
                <Form style={{margin: '1em'}}encType='multipart/form-data' onSubmit={(e)=>{Handlers.handleSendBackFile(e, props)}}>
                    <Form.Field>
                    <select value={props.selectedCardType} onChange={(e) => {Handlers.handleSelectChange(e, props)}}>
                        <option value='TD'>TD Visa Card</option>
                        <option value='Discover'>Discover IT Card</option>
                    </select>
                    </Form.Field>
                    <Form.Field>
                    <input type="file" 
                        value={props.submittedFile ? props.submittedFile : ""} 
                        accept=".xlsx,.csv,.p" 
                        onChange={(e) => {Handlers.handleFileSubmit(e, props)}}/>
                    </Form.Field>
                    <Button type="submit">Send Back File</Button>
                </Form>
                <Button onClick={() => {props.setInitializeFormOpen(true)}} style={{position: 'absolute', right: '1em', bottom: '0.5em'}}>Initialize Graph</Button>
            </Container>
        )
    }
}