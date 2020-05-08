import React, { useEffect } from 'react';
import {connect} from 'react-redux'

import Interface from './mainBlocks/ButtonsBlock/Interface.js'
import Sidebars from './mainBlocks/SidebarBlock/Sidebars.js'
import TableComp from './mainBlocks/TableBlock/Table.js'
import Graph from './mainBlocks/GraphBlock/Graph.js'

import SupportFunctions from '../adaptors/supportFuncs.js'
import Fetcher from '../adaptors/dataFetcher.js'
import '../CSS/Main.css'

// TEST READY COMMIT
 
function Main(props) {
    // Loads Data on mount, then never runs
    useEffect(() => {
        loadData(props.setData)
    }, [])

    return (
        <Sidebars loadData={() => {loadData(props.setData, props.setSelectedCardType)}}>
            <div className={'window'}>
                <div className={props.fullscreenGraph ? 'graph-block fullscreen' : 'graph-block'}>
                    <Graph/>
                    <Interface loadData={() => {loadData(props.setData, props.setSelectedCardType)}}/>
                </div>
                <div className={props.fullscreenGraph ? 'bordered table-block fullscreen' : 'bordered table-block'}>
                    <TableComp loadData={() => {loadData(props.setData, props.setSelectedCardType)}}/>
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
        let linear = SupportFunctions.getLinear(json['line_data'].length)
        let linearOpacity = SupportFunctions.getLinearOpacity(json['line_data'].length)
        json['line_data'] = json['line_data'].map((dataArr, index) => {
            return {
                label: dataArr['header'],
                data: dataArr['data'],
                hidden: dataArr['header'] === 'Total Income',
                backgroundColor: linearOpacity(index),
                pointBackgroundColor: linear(index),
                pointHoverBackgroundColor: linear(index),
                pointBorderColor: "rgb(0,0,0,0)",
                lineTension: 0,
                pointRadius: "1"
            }
        })
        json['income_pie_data']['data'] = [{
            data: json['income_pie_data']['data'],
            backgroundColor: genIncomeFills(json['income_pie_split_categories']),
            borderWidth: new Array(json['income_pie_data']['labels'].length).fill(0.2)
        }]
        json['spendings_pie_data']['data'] = [{
            data: json['spendings_pie_data']['data'],
            backgroundColor: genSpendingsFills(json['spendings_pie_data']['labels']),
            borderWidth: new Array(json['income_pie_data']['labels'].length).fill(0.2)
        }]
        setData(json)
        if(json['cards'][0]){
            document.getElementById('Card_Type_Select').value = json['cards'][0]
        }
    })
}

//Helper for loadData, Sets fill colors for income pie graph
function genIncomeFills(split_categories){
    let colors = []
    let incomePieLinearPos = SupportFunctions.getIncomePieLinearPos(split_categories['pos'].length)
    let incomePieLinearNeg = SupportFunctions.getIncomePieLinearNeg(split_categories['neg'].length)
    for(let i = 0; i < split_categories['neg'].length; i++){
        colors.push(incomePieLinearNeg(i))
    }
    for(let i = 0; i < split_categories['pos'].length; i++){
        colors.push(incomePieLinearPos(i))
    }
    return colors
}

//Helper for loadData, Sets fill colors for spendings pie graph
function genSpendingsFills(labels){
    let colors = []
    let spendingsPieLinear = SupportFunctions.getSpendingsPieLinear(labels.length)
    for(let i = 0; i < labels.length; i++){
        colors.push(spendingsPieLinear(i))
    }
    return colors
}

//################################################################
// Redux Functions Below
function mapStateToProps(state){
    return {
        fullscreenGraph: state.fullscreenGraph,
        selectedCardType: state.selectedCardType
    }
}
function mapDispatchToProps(dispatch){
    return {
        setData: (data) => {
            dispatch({
                type: "SET_DATA",
                value: data
            })
        },
        setSelectedCardType: (type) => {
            dispatch({
                type: 'SET_SELECTED_CARD_TYPE',
                value: type
            })
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Main);