let initialState = {
    data:null,
    lineDataColumns:"STD",
    processedLineData:null,
    submittedFile:null,
    selectedCardType: "TD"
}

export default function(state=initialState, action){
    switch(action.type){
        case "SET_DATA":
            return {...state, data:action.value}
        case "SET_SUBMITTED_FILE":
            return {...state, submittedFile:action.value}
        case "SET_LINE_DATA_COLUMNS":
            return {...state, lineDataColumns:action.value}
        case "SET_PROCESSED_LINE_DATA":
            return {...state, processedLineData:action.value}
        case "SET_SELECTED_CARD_TYPE":
            return {...state, selectedCardType:action.value}
        default:
            return state
    }
}