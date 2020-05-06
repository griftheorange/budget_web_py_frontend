import { Button, Container, Form } from 'semantic-ui-react'
import React from 'react'

import SupportFunctions from '../../../adaptors/supportFuncs.js'
import Handlers from './Handlers.js'

export default class Generators{
    static genButtonBlock(props){
        return (
            <Container style={{border: '1px solid black', width:'50%', display:'flex', flexDirection:'column'}}>
                <Button style={{width: '80%',margin:'auto',marginLeft:'10%',marginRight:'10%'}} onClick={() => {props.setSaveChangesOpen(true)}}>Save Changes to Backup</Button>
                <Button style={{width: '80%',margin:'auto',marginLeft:'10%',marginRight:'10%'}} onClick={() => {props.setExportExcelFormOpen(true)}}>Export File</Button>
                <Button style={{width: '80%',margin:'auto',marginLeft:'10%',marginRight:'10%'}} onClick={() => {props.setResetFromBackupFormOpen(true)}}>Reset From Backup</Button>
            </Container>
        )
    }
    
    static genCardFileForm(props){
        return (
            <Container style={{border: '1px solid black', width:'50%', display:'flex', flexDirection:'column', position: 'relative'}}>
                <Form style={{margin: '0.5em'}}encType='multipart/form-data' onSubmit={(e)=>{Handlers.handleSendBackFile(e, props)}}>
                    <Form.Field>
                    <Container style={{display: 'flex'}}>
                        <select id={'Card_Type_Select'} style={{marginRight: '0.5em'}}>
                            {props.data ? SupportFunctions.genOptions(props.data['cards']) : null}
                        </select>
                        <Button size={'mini'} icon={'plus'}></Button>
                    </Container>
                    </Form.Field>
                    <Form.Field>
                    <input type="file" 
                        value={props.submittedFile ? props.submittedFile : ""} 
                        accept=".xlsx,.csv,.p" 
                        onChange={(e) => {Handlers.handleFileSubmit(e, props)}}/>
                    </Form.Field>
                    <Button type="submit">Send Back File</Button>
                </Form>
                <Button onClick={() => {props.setInitializeFormOpen(true)}} style={{position: 'absolute', right: '0.5em', bottom: '0.5em'}}>Initialize Graph</Button>
            </Container>
        )
    }
}