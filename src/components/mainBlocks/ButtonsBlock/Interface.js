import { connect } from 'react-redux'
import React from 'react';

import Generators from './Generators.js'

function Interface(props) {

    return (
        <div className={'bordered button-block'}>
            {Generators.genButtonBlock(props)}
            {Generators.genCardFileForm(props)}
        </div>
    );
}

function mapStateToProps(state){
    return ({
        submittedFile: state.submittedFile,
        data: state.data
    })
}

function mapDispatchToProps(dispatch){
    return ({
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
        setSubmittedFile: (file) => {
            dispatch({
                type: "SET_SUBMITTED_FILE",
                value: file
            })
        },
        setResetFromBackupFormOpen: (open) => {
            dispatch({
                type: "SET_RESET_FROM_BACKUP_FORM_OPEN",
                value: open
            })
        },
        setInitializeFormOpen: (open) => {
            dispatch({
                type: "SET_INITIALIZE_FORM_OPEN",
                value: open
            })
        }
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(Interface);