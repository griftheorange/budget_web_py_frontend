let initialState = {
    data:null,
    lineDataColumns: "ALL",

    submittedFile:null,
    elementInEdit:null,

    sidebarOpen: false,
    newEntryFormOpen: false,
    deleteEntryFormOpen: false,
    saveChangesOpen: false,
    exportExcelFormOpen: false,
    resetFromBackupFormOpen: false,
    newCardFormOpen: false,
    deleteCardFormOpen: false,
    initializeFormOpen: false,
    editCategoriesFormOpen: false,
    
    fullscreenGraph:false,
    graphInView: "line_graph"
}

export default function(state=initialState, action){
    switch(action.type){
        case "SET_DATA":
            return {...state, data:action.value}
        case "SET_SUBMITTED_FILE":
            return {...state, submittedFile:action.value}
        case "SET_PROCESSED_LINE_DATA":
            return {...state, processedLineData:action.value}
        case "SET_SIDEBAR_OPEN":
            return {...state, sidebarOpen:action.value}
        case "SET_NEW_ENTRY_FORM_OPEN":
            return {...state, newEntryFormOpen:action.value}
        case "SET_DELETE_ENTRY_FORM_OPEN":
            return {...state, deleteEntryFormOpen:action.value}
        case "SET_SAVE_CHANGES_OPEN":
            return {...state, saveChangesOpen:action.value}
        case "SET_EXPORT_EXCEL_FORM_OPEN":
            return {...state, exportExcelFormOpen:action.value}
        case "SET_RESET_FROM_BACKUP_FORM_OPEN":
            return {...state, resetFromBackupFormOpen:action.value}
        case "SET_INITIALIZE_FORM_OPEN":
            return {...state, initializeFormOpen:action.value}
        case "SET_NEW_CARD_FORM_OPEN":
            return {...state, newCardFormOpen:action.value}
        case "SET_DELETE_CARD_FORM_OPEN":
            return {...state, deleteCardFormOpen:action.value}
        case "SET_EDIT_CATEGORIES_FORM_OPEN":
            return {...state, editCategoriesFormOpen:action.value}
        case "SET_ELEMENT_IN_EDIT":
            return {...state, elementInEdit:action.value}
        case "TOGGLE_FULLSCREEN_GRAPH":
            return {...state, fullscreenGraph:!state.fullscreenGraph}
        case "SET_GRAPH_IN_VIEW":
            return {...state, graphInView:action.value}
        default:
            return state
    }
}