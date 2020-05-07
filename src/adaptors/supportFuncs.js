import React from 'react'
import * as d3 from 'd3'

export default class SupportFunctions{

    // D3 Functions below set linear scale for line-object styling
    // See 'loadData' function for usage
    static getLinear(range){
        return d3.scaleLinear()
        .domain([0, range])
        .range(["rgb(32,6,162,1)", "rgb(255,171,50,1)"])
    }
    static getLinearOpacity(range){
        return d3.scaleLinear()
        .domain([0, range])
        .range(["rgb(32,6,162,0.05)", "rgb(255,171,50,0.05)"])
    }
    static getIncomePieLinearPos(range){
        return d3.scaleLinear()
        .domain([0, range])
        .range(['rgb(10,76,26,1)', 'rgb(105,168,50,1)'])
    }
    static getIncomePieLinearNeg(range){
        return d3.scaleLinear()
        .domain([0, range])
        .range(["rgb(153,21,3,1)", "rgb(181,133,56,1)"])
    }
    static getSpendingsPieLinear(range){
        return d3.scaleLinear()
        .domain([0, range])
        .range(["rgb(160,207,232,1)", "rgb(34,2,74,1)"])
    }

    static formattedCurrentDate(){
        let date = new Date(Date.now())
        date = date.getFullYear()+'-'+((date.getMonth()+1) < 10 ? '0'+(date.getMonth()+1) : (date.getMonth()+1))+'-'+(date.getDate() < 10 ? '0'+date.getDate() : date.getDate())
        return date
    }

    static  genOptions(cats){
        let options = []
        for(let i = 0; i < cats.length; i++){
            options.push(<option value={cats[i]}>{cats[i]}</option>)
        }
        return options
    }


}