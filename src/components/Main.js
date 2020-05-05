import React, { useEffect } from 'react';
import {connect} from 'react-redux'

import Interface from './mainBlocks/ButtonsBlock/Interface.js'
import Sidebars from './mainBlocks/SidebarBlock/Sidebars.js'
import TableComp from './mainBlocks/TableBlock/Table.js'
import Graph from './mainBlocks/GraphBlock/Graph.js'

import SupportFunctions from '../adaptors/supportFuncs.js'
import Fetcher from '../adaptors/dataFetcher.js'
import '../CSS/Main.css'

 
function Main(props) {
    // Loads Data on mount, then never runs
    useEffect(() => {
        loadData(props.setData)
    }, [])

    return (
        <Sidebars loadData={() => {loadData(props.setData)}}>
            <div className={'window'}>
                <div className={props.fullscreenGraph ? 'graph-block fullscreen' : 'graph-block'}>
                    <Graph/>
                    <Interface loadData={() => {loadData(props.setData)}}/>
                </div>
                <div style={{position: 'relative'}} className={props.fullscreenGraph ? 'bordered table-block fullscreen' : 'bordered table-block'}>
                    <TableComp loadData={() => {loadData(props.setData)}}/>
                </div>
            </div>
        </Sidebars>
    );
}

// Fetches packaged data from Fetcher class,
// 'data' key holds full table data for rendering in table-block
// 'line_data' key holds formatted line graph data from backend
// 'line_data' is mapped on front-end for compatability with Chart.js library, then saved to state
function loadData(setData){
    let data = Fetcher.getData()
    data.then((json) => {
        json['line_data'] = json['line_data'].map((dataArr, index) => {
            return {
                label: dataArr['header'],
                data: dataArr['data'],
                hidden: dataArr['header'] === 'Total Income',
                backgroundColor: SupportFunctions.linearOpacity(index),
                pointBackgroundColor: SupportFunctions.linear(index),
                pointHoverBackgroundColor: SupportFunctions.linear(index),
                pointBorderColor: "rgb(0,0,0,0)",
                lineTension: 0,
                pointRadius: "1"
            }
        })
        json['income_pie_data']['data'] = [{
            data: json['income_pie_data']['data'],
            backgroundColor: genIncomeFills(json['income_pie_data']['labels']),
            borderWidth: new Array(json['income_pie_data']['labels'].length).fill(0.2)
        }]
        json['spendings_pie_data']['data'] = [{
            data: json['spendings_pie_data']['data'],
            backgroundColor: genSpendingsFills(json['spendings_pie_data']['labels']),
            borderWidth: new Array(json['income_pie_data']['labels'].length).fill(0.2)
        }]
        setData(json)
    })
}

//Helper for loadData, Sets fill colors for income pie graph
function genIncomeFills(labels){
    let colors = []
    for(let i = 0; i < labels.length; i++){
        if(labels[i] === "INCOME"){
            colors.push('rgb(10,76,26,1)')
        }else{
            colors.push(SupportFunctions.incomePieLinear(i))
        }
    }
    return colors
}

//Helper for loadData, Sets fill colors for spendings pie graph
function genSpendingsFills(labels){
    let colors = []
    for(let i = 0; i < labels.length; i++){
        colors.push(SupportFunctions.spendingsPieLinear(i))
    }
    return colors
}

//################################################################
// Redux Functions Below
function mapStateToProps(state){
    return {
        fullscreenGraph: state.fullscreenGraph
    }
}
function mapDispatchToProps(dispatch){
    return {
        setData: (data) => {
            dispatch({
                type: "SET_DATA",
                value: data
            })
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Main);