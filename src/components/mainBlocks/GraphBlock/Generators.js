import { Button } from 'semantic-ui-react'
import React from 'react';

import LineComp from './Graphs/LineComp.js'
import PieComp from './Graphs/PieComp.js'

export default class Generators{    
    static genButtons(props){
        return (
            <>
            <div style={{position: 'absolute', top:'1em', right: '1em'}}>
                <Button size={'mini'} icon={'expand arrows alternate'} onClick={props.toggleFullscreenGraph}></Button>
            </div>
            <div style={{position: 'absolute', top:'4em', right: '1em'}}>
                <Button size={'mini'} icon={'chart line'} onClick={()=>{props.setGraphInView('line_graph')}}></Button>
            </div>
            <div style={{position: 'absolute', top:'7em', right: '1em'}}>
                <Button size={'mini'} icon={'dollar sign'} onClick={()=>{props.setGraphInView('income_pie_graph')}}></Button>
            </div>
            <div style={{position: 'absolute', top:'10em', right: '1em'}}>
                <Button size={'mini'} icon={'arrow alternate circle down'} onClick={()=>{props.setGraphInView('spendings_pie_graph')}}></Button>
            </div>
            </>
        )
    }
    
    static genGraph(props){
        if(props.data){
            switch(props.graphInView){
                case "line_graph":
                    return <LineComp/>
                case "income_pie_graph":
                    return <PieComp pieType={'income_pie_data'}/>
                case "spendings_pie_graph":
                    return <PieComp pieType={'spendings_pie_data'}/>
            }
        }
    }
}