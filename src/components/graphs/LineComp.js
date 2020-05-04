import React from 'react';
import { connect } from 'react-redux';
import { Line } from 'react-chartjs-2'

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
                                return formatDate(date)
                            }
                        }
                    }]
                },
                tooltips: {
                    callbacks: {
                        title: function(t, d){
                            return d['datasets'][t[0]['datasetIndex']]['label']
                        },
                        afterTitle: function(t, d){
                            console.log(t,d)
                            return d['datasets'][t[0]['datasetIndex']]['data'][t[0]['index']]['name']
                        },
                        beforeBody: function(t, d){
                            let date = new Date(parseInt(t[0]['label'])*1000)
                            return formatDate(date)
                        },
                        label: function(t, d){
                            let value = parseInt(t.value)
                            return value >= 0 ? '$'+formatNumber(value) : '-$'+(formatNumber(-1*value))
                        }
                    }
                }
            }}
            />
    );
}

function formatDate(date){
    return date.getFullYear() + '-' + (date.getMonth() < 10 ? '0'+date.getMonth() : date.getMonth()) + '-' + (date.getDate() < 10 ? '0'+date.getDate() : date.getDate())
}

function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }

//#########################################################
// Redux Functions Below
function mapStateToProps(state){
    return {
        processedLineData: state.processedLineData
    }
}

export default connect(mapStateToProps)(LineComp);