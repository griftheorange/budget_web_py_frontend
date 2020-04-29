class DataFetcher {
    static getLineGraphData(){
        return fetch("http://localhost:5000/line_data/data")
        .then((r) => r.json())
    }
}

export default DataFetcher