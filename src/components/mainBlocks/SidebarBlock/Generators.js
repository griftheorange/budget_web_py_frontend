import React from 'react';
import { Container, Divider, Form, Button, Checkbox } from 'semantic-ui-react'

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

    static genEditCategoriesForm(props, localLabels, localLabelSetters){
        function genCategoryForms(){
            if(props.data){
                let forms = []
                for (let index in localLabels['categories']){
                    let category = localLabels['categories'][index]
                    let form_id = `${category}_Form_Div`
                    forms.push(
                        <Container id={form_id} style={{border: '1px solid black'}}>
                            <Form>
                                <Form.Field style={{margin: 0, padding: '0.5em'}}>
                                    <label>{category}</label>
                                    <Checkbox onChange={(e) =>  {Handlers.handleLabelsChange(e, localLabelSetters.spending, localLabels.spending, category)}} id={`${category}_Spendings_Check`} label='Include in Spendings' checked={localLabels.spending.includes(category)}/>
                                    <Checkbox onChange={(e) =>  {Handlers.handleLabelsChange(e, localLabelSetters.income, localLabels.income, category)}} id={`${category}_Income_Check`} label='Include in Income' checked={localLabels.income.includes(category)}/>
                                    <Checkbox onChange={(e) =>  {Handlers.handleLabelsChange(e, localLabelSetters.pos, localLabels.pos, category)}} id={`${category}_Pos_Check`} label='Is Considered Income' checked={localLabels.pos.includes(category)}/>
                                </Form.Field>
                                <Button onClick={() => {Handlers.handleDeleteCategory(localLabelSetters.categories, localLabels.categories, index)}} size={'mini'} style={{position: 'absolute', right:'0.5em', top: '0.7em'}} icon={'trash alternate'}></Button>
                            </Form>
                        </Container>
                    )
                }
                return forms
            }
        }

        function genSpecialTypeSelections(){
            if(localLabels['categories']){
                let possibleCorrections = [...localLabels['categories']]
                possibleCorrections.splice(possibleCorrections.indexOf(localLabels['transfer']), 1)
                let possibleTransfers = [...localLabels['categories']]
                possibleTransfers.splice(possibleTransfers.indexOf(localLabels['correction']), 1)
                return (
                    <>
                    <label>Transfer Type</label>
                    <select onChange={(e) => {Handlers.handleSpecialSelectChange(e, localLabelSetters['transfer'])}} value={localLabels['transfer']}>
                        <option value=""></option>
                        {SupportFunctions.genOptions(possibleTransfers)}
                    </select>
                    <label>Correction Type</label>
                    <select onChange={(e) => {Handlers.handleSpecialSelectChange(e, localLabelSetters['correction'])}} value={localLabels['correction']}>
                        <option value=""></option>
                        {SupportFunctions.genOptions(possibleCorrections)}
                    </select>
                    </>
                )
            }
        }

        return (
            <>
                <Container style={{display: 'flex', padding: '0.2em'}} className='sidebar-button-div'>
                    <Button size={'mini'} 
                            inverted={true} 
                            color={'red'}
                            style={{marginLeft: '0.5em'}}
                            onClick={() => props.setEditCategoriesFormOpen(false)}>X</Button>
                </Container>
                <Container>
                    <Divider/>
                </Container>
                <Container>
                    <Button onClick={() => {Handlers.handleCheckboxSubmit(props, localLabels)}} style={{width: '90%', margin: '5%'}}>Save Changes</Button>
                </Container>
                <Container>
                    <Divider/>
                </Container>
                <Container>
                    <Container style={{display:'flex'}}>
                        <Button onClick={()=>{localLabelSetters.setNewTypeFormVisible(!localLabels.newTypeFormVisible)}} icon={'plus'} style={{width:'90%', margin:'auto'}}>New Category</Button>
                    </Container>
                    <Container>
                        <Form style={{margin: 0, padding: '0.5em'}} onSubmit={() => {Handlers.handleNewCategorySubmit(localLabels['categories'], localLabelSetters['categories'])}}>
                            <Form.Field>
                                <label style={{display: localLabels.newTypeFormVisible ? 'block' : 'none'}} >New Category Name</label>
                                <input style={{display: localLabels.newTypeFormVisible ? 'block' : 'none'}} id={'New_Category_Name_Input'}></input>
                            </Form.Field>
                            <Button style={{display: localLabels.newTypeFormVisible ? 'block' : 'none', width: '90%', margin: '5%'}} type='submit'>Save New Category</Button>
                        </Form>
                    </Container>
                </Container>
                <Container>
                    <Divider/>
                </Container>
                <Container>
                    <Form>
                        <Form.Field style={{margin: 0, padding: '0.5em'}}>
                            {genSpecialTypeSelections()}
                        </Form.Field>
                    </Form>
                </Container>
                <Container>
                    <Divider/>
                </Container>
                <Container id={'Checkbox_Form_Collection'}>
                    {genCategoryForms()}
                </Container>
            </>
        )
    }
}