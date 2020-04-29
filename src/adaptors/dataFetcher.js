const API_DOMAIN = "http://localhost:5000/"

class DataFetcher {

    static getLineGraphData(){
        return fetch(`${API_DOMAIN}/line_data/data`)
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
}

export default DataFetcher