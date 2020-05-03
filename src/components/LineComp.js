import React from 'react';
import { connect } from 'react-redux';
import {Line} from 'react-chartjs-2'

function LineComp(props) {
    
    return (
        <Line 
            // Line Data pulled from processed data state
            data={{
                datasets: props.processedLineData
            }}
            options={{
                // Fills graph to container size
                responsive: true,
                // Stretches graph to container shape
                maintainAspectRatio: false,
                // Dispays axes and formats labels, and ticks
                scales: {
                    yAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: "Amount"
                        }
                    }],
                    xAxes: [{
                        type: 'linear',
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: "Date"
                        },
                        ticks: {
                            callback: function(value){
                                let date = (new Date(value*1000))
                                return date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate()
                            }
                        }
                    }]
                }
            }}
            />
    );
}

//#########################################################
// Redux Functions Below
function mapStateToProps(state){
    return {
        processedLineData: state.processedLineData
    }
}

export default connect(mapStateToProps)(LineComp);