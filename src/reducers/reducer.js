let initialState = {
    lineDataColumns:"STD",
    lineData:null,
    submittedFile:null
}

export default function(state=initialState, action){
    switch(action.type){
        case "SET_LINE_DATA":
            return {...state, lineData:action.value}
        case "SET_SUBMITTED_FILE":
            return {...state, submittedFile:action.value}
        case "SET_LINE_DATA_COLUMNS":
            return {...state, lineDataColumns:action.value}
        default:
            return state
    }
}