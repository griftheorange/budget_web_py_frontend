let initialState = {
    data:null,
    lineDataColumns: "ALL",
    processedLineData:null,
    submittedFile:null,
    selectedCardType: "TD",
    sidebarOpen: false,
    newEntryFormOpen: false,
    saveChangesOpen: false,
    exportExcelFormOpen: false,
    resetFromBackupFormOpen: false,
    elementInEdit:null,
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
        case "SET_SELECTED_CARD_TYPE":
            return {...state, selectedCardType:action.value}
        case "SET_SIDEBAR_OPEN":
            return {...state, sidebarOpen:action.value}
        case "SET_NEW_ENTRY_FORM_OPEN":
            return {...state, newEntryFormOpen:action.value}
        case "SET_SAVE_CHANGES_OPEN":
            return {...state, saveChangesOpen:action.value}
        case "SET_EXPORT_EXCEL_FORM_OPEN":
            return {...state, exportExcelFormOpen:action.value}
        case "SET_RESET_FROM_BACKUP_FORM_OPEN":
            return {...state, resetFromBackupFormOpen:action.value}
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