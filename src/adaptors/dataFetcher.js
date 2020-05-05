const API_DOMAIN = "http://localhost:5000/"
const DATA_FILENAME = "data"

class DataFetcher {

    static getData(){
        return fetch(`${API_DOMAIN}/data/${DATA_FILENAME}`)
        .then((r) => r.json())
    }

    static submitFile(formData, cardType){
        return fetch(`${API_DOMAIN}/data?cardType=${cardType}`, {
            method:'POST',
            body:formData
        })
    }

    static updateCell(category, loc){
        let locArr = loc.split(',')
        return fetch(`${API_DOMAIN}/update_cell`, {
            method:'PATCH',
            headers:{
                'Content-Type':'application/json',
                'Accept':'application/json'
            },
            body: JSON.stringify({
                index: locArr[0],
                column: locArr[1],
                category: category
            })
        })
    }

    static patchNewEntry(json){
        return fetch(`${API_DOMAIN}/new_entry`, {
            method:'PATCH',
            headers:{
                'Content-Type':'application/json',
                'Accept':'application/json'
            },
            body: JSON.stringify(json)
        })
    }

    static saveBackupAs(fileTag, filename){
        return fetch(`${API_DOMAIN}/save_backup`, {
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'Accept':'application/json'
            },
            body: JSON.stringify({
                filetag:fileTag,
                filename:filename
            })
        })
    }

    static requestExportFile(fileTag, filename){
        return fetch(`${API_DOMAIN}/export_file`, {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                filetag:fileTag,
                filename:filename
            })
        })
    }

    static resetFromFile(fileTag, filename){
        return fetch(`${API_DOMAIN}/reset`, {
            method:'PATCH',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                filetag:fileTag,
                filename:filename
            })
        })
    }
}

export default DataFetcher