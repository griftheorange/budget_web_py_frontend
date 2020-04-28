let initialState = {
    lineData:null
}

export default function(state=initialState, action){
    switch(action.type){
        case "SET_LINE_DATA":
            return {...state, lineData:action.value}
        default:
            return state
    }
}