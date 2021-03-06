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

    static handleNewCardSubmit(props){
        let card_name = document.getElementById('Card_Name_Input')
        let th = document.getElementById('TH_Source_Input')
        let date = document.getElementById('Date_Source_Input')
        let cost = document.getElementById('Cost_Source_Input')
        if(card_name.value && th.value && date.value && cost.value){
            let json = {
                card_name:card_name.value,
                th:th.value,
                date:date.value,
                cost:cost.value
            }
            Fetcher.patchNewCardType(json)
            .then(r => r.json())
            .then((response) => {
                if(response['status'] === 'Success'){
                    card_name.value = null
                    th.value = null
                    date.value = null
                    cost.value = null
                    props.setNewCardFormOpen(false)
                    props.loadData()
                }
            })
        }
    }

    static handleDeleteCardSubmit(props){
        let card_delete = document.getElementById('Card_Delete_Input')
        if(card_delete.value != ""){
            Fetcher.deleteCard(card_delete.value)
            .then(r => r.json())
            .then((response) => {
                if(response['status'] === 'Success'){
                    card_delete.value = ""
                    props.setDeleteCardFormOpen(false)
                    props.loadData()
                }
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

    static handleDeleteEntrySubmit(props){
        let indexInput = document.getElementById('Delete_Index_Input')
        if(indexInput.value){
            Fetcher.deleteEntryAtIndex(indexInput.value)
            .then(r => r.json())
            .then((response) => {
                if(response.status === 'Success'){
                    indexInput.value = null
                    props.setDeleteEntryFormOpen(false)
                    props.loadData()
                }
            })
        }
    }

    static handleInitFileSubmit(props){
        let fileInput = document.getElementById('Init_File_Input')

        if(fileInput.files[0]){
            let data = new FormData()
            data.append('file', fileInput.files[0])
            data.append('filename', fileInput.files[0].name)
                
            Fetcher.initializeTable(data)
            .then(r => r.json())
            .then((response) => {
                if(response['status'] === 'Success'){
                    props.setInitializeFormOpen(false)
                    fileInput.value=null
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

    static handleLabelsChange(event, setter, data, category){
        if(event.target.checked){
            setter([...data, category])
        } else {
            for(let index in data){
                if(category === data[index]){
                    data.splice(index, 1)
                    setter([...data])
                }
            }
        }
    }

    static handleDeleteCategory(setter, data, index){
        data.splice(index,1)
        setter([...data])
    }

    static handleCheckboxSubmit(props, localLabels){
        Fetcher.patchCategories(localLabels)
        .then(r => r.json())
        .then((response) => {
            if(response['status'] === 'Success'){
                props.setEditCategoriesFormOpen(false)
                props.loadData()
            }
        })
    }

    static handleSpecialSelectChange(e, setter){
        setter(e.target.value)
    }

    static handleNewCategorySubmit(categories, setter){
        let name_input = document.getElementById('New_Category_Name_Input')
        if(name_input.value){
            console.log('has value')
            if(!categories.includes(name_input.value)){
                console.log('is unique')
                setter([...categories, name_input.value])
                name_input.value = null
            }
        }
    }

}