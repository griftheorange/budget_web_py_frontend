import Fetcher from '../../../adaptors/dataFetcher.js'

export default class Handlers{
    static handleSelectChange(event, props){
        props.setSelectedCardType(event.target.value)
    }
    
    // File input is a controlled form, but might not need to be,
    // since sending data to back end doesn't pull from state due to,
    // C:fakepath issues
    static handleFileSubmit(event, props){
        props.setSubmittedFile(event.target.value)
    }
    
    // If a file is submitted, formats a formData Object and inserts the file and filename,
    // then sends this object to the submit_file fetcher
    // Needed to be formatted this way for compatibility with flask
    // On return of file sendback, re-loads data for graph and table with updated data
    static handleSendBackFile(e, props){
        e.preventDefault()
        if(props.submittedFile){
            let data = new FormData()
            data.append('file', e.target.querySelector("input").files[0])
            data.append('filename', e.target.querySelector("input").files[0].name)
            
            Fetcher.submitFile(data, props.selectedCardType)
            .then(r => {props.loadData()})
        }
    }
}