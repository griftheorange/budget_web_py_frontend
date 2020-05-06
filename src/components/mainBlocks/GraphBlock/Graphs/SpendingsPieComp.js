import { connect } from 'react-redux'
import { Pie } from 'react-chartjs-2'
import React from 'react'

function PieComp(props) {
    return (
        <Pie data={{
                datasets: props.data['spendings_pie_data']['data'],
                labels: props.data['spendings_pie_data']['labels'],
            }} options={{
                title:{
                    display:true,
                    text:getTitleText(props)
                },
                responsive:true,
                maintainAspectRatio:false
        }}/>
    )
}

function getTitleText(props){
    switch(props.pieType){
        case 'income_pie_data':
            return "Income vs Spendings"
        case 'spendings_pie_data':
            return "Spendings"
        default:
            return ""
    }
}

function mapStateToProps(state){
    return {
        data: state.data
    }
}

export default connect(mapStateToProps)(PieComp);