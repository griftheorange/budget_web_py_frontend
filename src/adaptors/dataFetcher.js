const API_DOMAIN = "http://localhost:5000/"

class DataFetcher {

    static getData(){
        return fetch(`${API_DOMAIN}/data`)
        .then((r) => r.json())
    }

    static submitFile(formData, cardType){
        return fetch(`${API_DOMAIN}/data?cardType=${cardType}`, {
            method:'POST',
            body:formData
        })
    }

    static initializeTable(formData){
        return fetch(`${API_DOMAIN}/initialize_table`, {
            method:'POST',
            headers: {
                'Accept':'application/json'
            },
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

    static patchNewCardType(json){
        return fetch(`${API_DOMAIN}/new_card`, {
            method:'PATCH',
            headers:{
                'Content-Type':'application/json',
                'Accept':'application/json'
            },
            body: JSON.stringify(json)
        })
    }

    static deleteEntryAtIndex(index){
        return fetch(`${API_DOMAIN}/delete_entry`, {
            method:'DELETE',
            headers:{
                'Content-Type':'application/json',
                'Accept':'application/json'
            },
            body: JSON.stringify({
                index:index
            })
        })
    }

    static deleteCard(card_name){
        return fetch(`${API_DOMAIN}/delete_card`, {
            method:'DELETE',
            headers: {
                'Content-Type':'application/json',
                'Accept':'application/json'
            },
            body: JSON.stringify({
                card_name:card_name
            })
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