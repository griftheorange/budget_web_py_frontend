export default class Handlers{
    // Responds to click event for single table cell
    static handleOnClick(event, props){
        props.setElementInEdit(event.target)
        props.setSidebarOpen(true)
    }
}