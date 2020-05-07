import { connect } from 'react-redux'
import React from 'react';

import Generators from './Generators.js'

function TableComp(props) {
    return (
        <>
        {Generators.genButtons(props)}
        {Generators.genTable(props)}
        </>
    );
}

function mapStateToProps(state){
    return ({
        data: state.data,
        fullscreenGraph: state.fullscreenGraph
    })
}

function mapDispatchToProps(dispatch){
    return ({
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
        setSidebarOpen: (open) => {
            dispatch({
                type: "SET_SIDEBAR_OPEN",
                value: open
            })
        },
        setEditCategoriesFormOpen: (open) => {
            dispatch({
                type: "SET_EDIT_CATEGORIES_FORM_OPEN",
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
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(TableComp);