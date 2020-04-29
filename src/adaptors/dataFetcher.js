const API_DOMAIN = "http://localhost:5000/"

class DataFetcher {

    static getLineGraphData(){
        return fetch(`${API_DOMAIN}/line_data/data`)
        .then((r) => r.json())
    }

    static printCSV(){
        return fetch(`${API_DOMAIN}/print_csv`)
    }
}

export default DataFetcher