const API_DOMAIN = "http://localhost:5000/"
const DATA_FILENAME = "data"

class DataFetcher {

    static getData(selection){
        return fetch(`${API_DOMAIN}/data/${DATA_FILENAME}`)
        .then((r) => r.json())
    }

    static submitFile(formData){
        console.log(formData)
        return fetch(`${API_DOMAIN}/data`, {
            method:'POST',
            body:formData
        })
    }

    static printCSV(){
        return fetch(`${API_DOMAIN}/print_csv`)
    }

    static resetPickle(){
        return fetch(`${API_DOMAIN}/reset`)
    }
}

export default DataFetcher