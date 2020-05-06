import { Header } from 'semantic-ui-react'
import { connect } from 'react-redux'
import Sidebar from 'react-sidebar'
import React from 'react';

//Support Files
import Generators from './Generators.js'

function Sidebars(props) {
    return (
        // Reset from Backup File Prompt IN PROGRESS
        <Sidebar sidebar={
                        <div className={'sidebar-block'}>
                            <Header textAlign={'center'} style={{padding: '0.5em', margin: '0'}}>Reset From Backup</Header>
                            <Header.Subheader style={{textAlign: 'center', padding:'0.5em', margin:'0'}}>Select the Backup File to reset the data from</Header.Subheader>
                            {Generators.genResetFromBackupForm(props)}
                        </div>} 
                 open={props.resetFromBackupFormOpen} 
                 pullRight={false}>
        {/* Export File Prompt DONE*/}
        <Sidebar sidebar={
                        <div className={'sidebar-block'}>
                            <Header textAlign={'center'} style={{padding: '0.5em', margin: '0'}}>Export File</Header>
                            <Header.Subheader style={{textAlign: 'center', padding:'0.5em', margin:'0'}}>File will export as .xlsx, .csv, or .p ('pickle') based on the file tag you input</Header.Subheader>
                            {Generators.genExportForm(props)}
                        </div>} 
                 open={props.exportExcelFormOpen} 
                 pullRight={false}>
        {/* Save Changes Prompt DONE*/}
        <Sidebar sidebar={
                        <div className={'sidebar-block'}>
                            <Header textAlign={'center'} style={{padding: '0.5em', margin: '0'}}>Save Changes to Backup</Header>
                            <Header.Subheader style={{textAlign: 'center', padding:'0.5em', margin:'0'}}>Files with the same name will overwrite on backend</Header.Subheader>
                            {Generators.genSaveChangesForm(props)}
                        </div>} 
                 open={props.saveChangesOpen} 
                 pullRight={false}>
        {/* Initialize Table From */}
        <Sidebar sidebar={
                        <div className={'sidebar-block'}>
                            <Header textAlign={'center'} style={{padding: '0.5em', margin: '0'}}>Upload File</Header>
                            <Header.Subheader style={{textAlign: 'center', padding:'0.5em', margin:'0'}}>Uploaded File will overwrite all current data. Make sure you save if you have stuff you want to keep</Header.Subheader>
                            {Generators.genInitializeForm(props)}
                        </div>} 
                 open={props.initializeFormOpen} 
                 pullRight={false}>
        {/* New Table Entry Sidebar DONE*/}
        <Sidebar sidebar={
                        <div className={'sidebar-block'}>
                            <Header textAlign={'center'} style={{padding: '0.5em', margin: '0'}}>Insert Entry</Header>
                            {Generators.genNewEntryForm(props)}
                        </div>} 
                 open={props.newEntryFormOpen} 
                 pullRight={true}>
        {/* Delete Table Entry Sidebar */}
        <Sidebar sidebar={
                        <div className={'sidebar-block'}>
                            <Header textAlign={'center'} style={{padding: '0.5em', margin: '0'}}>Delete Entry</Header>
                            <Header.Subheader style={{textAlign: 'center', padding:'0.5em', margin:'0'}}>Type the index of the row you wish to delete, entries can always be re-input, but please be careful.</Header.Subheader>
                            {Generators.genDeleteEntryForm(props)}
                        </div>} 
                 open={props.deleteEntryFormOpen} 
                 pullRight={true}>
        {/* Update Cell in Type Column Sidebar DONE*/}
        <Sidebar sidebar={
                        <div className={'sidebar-block'}>
                            <Header textAlign={'center'} style={{padding: '0.5em', margin: '0'}}>Select Value</Header>
                            {Generators.genCategorySelectionForm(props)}
                        </div>} 
                 open={props.sidebarOpen} 
                 pullRight={true}>

            {props.children}

        </Sidebar>
        </Sidebar>
        </Sidebar>
        </Sidebar>
        </Sidebar>
        </Sidebar>
        </Sidebar>
        
    );
}

// Redux Functions
function mapStateToProps(state){
    return ({
        data: state.data,
        sidebarOpen: state.sidebarOpen,
        newEntryFormOpen: state.newEntryFormOpen,
        deleteEntryFormOpen: state.deleteEntryFormOpen,
        saveChangesOpen: state.saveChangesOpen,
        exportExcelFormOpen: state.exportExcelFormOpen,
        initializeFormOpen: state.initializeFormOpen,
        resetFromBackupFormOpen: state.resetFromBackupFormOpen,
        elementInEdit: state.elementInEdit
    })
} 
function mapDispatchToProps(dispatch){
    return ({
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
        },
        setDeleteEntryFormOpen: (open) => {
            dispatch({
                type: "SET_DELETE_ENTRY_FORM_OPEN",
                value: open
            })
        },
        setInitializeFormOpen: (open) => {
            dispatch({
                type: "SET_INITIALIZE_FORM_OPEN",
                value: open
            })
        },
        setElementInEdit: (element) => {
            dispatch({
                type: "SET_ELEMENT_IN_EDIT",
                value: element
            })
        },
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebars);