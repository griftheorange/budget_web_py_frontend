import React from 'react';
import { connect } from 'react-redux';
import { Pie } from 'react-chartjs-2'

function PieComp(props) {
    if(props.data){
        return (
            <Pie data={{
                    datasets: props.data[props.pieType]['data'],
                    labels: props.data[props.pieType]['labels'],
                }} options={{
                    responsive:true,
                    maintainAspectRatio:false
                }}/>
        )
    } else {
        return null
    }
}

function mapStateToProps(state){
    return {
        data: state.data
    }
}

export default connect(mapStateToProps)(PieComp);