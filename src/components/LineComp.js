import React from 'react';
import { connect } from 'react-redux';
import {Line} from 'react-chartjs-2'

function LineComp(props) {
    
    return (
        <Line 
            data={{
                datasets: props.processedLineData
            }}
            options={{
                responsive: true,
                maintainAspectRatio: false,
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
                        ticks: {
                            callback: function(value){
                                let date = (new Date(value*1000))
                                return date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate()
                            }
                        },
                        scaleLabel: {
                            display: true,
                            labelString: "Date"
                        }
                    }]
                }
            }}
            />
    );
}

function mapStateToProps(state){
    return {
        processedLineData: state.processedLineData
    }
}

export default connect(mapStateToProps)(LineComp);