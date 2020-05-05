import SupportFunctions from  '../../../adaptors/supportFuncs.js'
import Fetcher from '../../../adaptors/dataFetcher.js'

export default class Handlers{
    static handleExportRequest(props){
        // Helper for handleExport Request
        // Uses hidden a tag to properly name URL downloaded blob file
        let saveFile = (blob, filename) => {
            let a = document.createElement('a')
            document.body.appendChild(a)
            a.style = "display: none"
            let url = window.URL.createObjectURL(blob)
            a.href = url
            a.download = filename
            a.click()
            window.URL.revokeObjectURL(url)
        }

        let filenameInput = document.getElementById('Export_Filename_Input')
        let filenameArr = filenameInput.value.split('.')
        let fileTag = filenameArr[filenameArr.length-1]
        if(['p', 'csv', 'xlsx'].includes(fileTag)){
            Fetcher.requestExportFile(fileTag, filenameInput.value)
            .then(r => r.blob())
            .then((blob) => {
                saveFile(blob, filenameInput.value)
                filenameInput.value = 'budget_'+SupportFunctions.formattedCurrentDate()+'.xlsx'
                props.setExportExcelFormOpen(false)
                props.loadData()
            })
        }
    }

    static handleBackupSubmit(props){
        let filenameInput = document.getElementById('Backup_Filename_Input')
        let filenameArr = filenameInput.value.split('.')
        let fileTag = filenameArr[filenameArr.length-1]
        if(['p', 'csv', 'xlsx'].includes(fileTag)){
            Fetcher.saveBackupAs(fileTag, filenameInput.value)
            .then(r => r.json())
            .then((response) => {
                if(response['status'] === 'Success'){
                    filenameInput.value = 'backup_'+SupportFunctions.formattedCurrentDate()+'.p'
                    props.setSaveChangesOpen(false)
                    props.loadData()
                }
            })
        }
    }

    static handleNewEntrySubmit(props){
        let th = document.getElementById("Transaction_History_Input")
        let date = document.getElementById("Date_Input")
        let type = document.getElementById("Type_Input")
        let cost = document.getElementById("Cost_Input")
        if(th.value && date.value && cost.value){
            let json = {
                th:th.value,
                date:date.value,
                type:type.value,
                cost:cost.value
            }
            Fetcher.patchNewEntry(json)
            .then(r => r.json())
            .then((response) => {
                if(response.status === 'Success'){
                    th.value = null
                    date.value = SupportFunctions.formattedCurrentDate()
                    type.value = ""
                    cost.value = null
                    props.setNewEntryFormOpen(false)
                    props.loadData()
                }
            })
        }
    }

    static handleTypeSelection(category, props){
        if(category === 'CLOSE'){
            props.setElementInEdit(null)
            props.setSidebarOpen(false)
        } else {
            Fetcher.updateCell(category, props.elementInEdit.dataset.loc)
            .then(r => r.json())
            .then((response) => {
                if(response['status'] === 'Success'){
                    let category = response['body']['category']
                    props.elementInEdit.innerHTML = category
                    props.setElementInEdit(null)
                    props.setSidebarOpen(false)
                } else {
                    props.setElementInEdit(null)
                    props.setSidebarOpen(false)
                }
            })
        }
    }
}