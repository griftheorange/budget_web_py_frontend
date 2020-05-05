import { Header, Divider, List, Button, Container, Form } from 'semantic-ui-react'
import React, { useState } from 'react'
import { connect } from 'react-redux'

import Fetcher from '../../../adaptors/dataFetcher.js'

function DirectoryList(props) {

    const [selectedListItem, setSelectedListItem] = useState('default.p')

    let elements = []
    elements.push(
        <Container style={props.activeListeners ? {} : {display: 'none'}}>
            <Form onSubmit={(e) => {handleSubmit(props, selectedListItem, setSelectedListItem)}} style={{paddingTop: '0.5em'}}>
                <Form.Field>
                    <Header>{"Selected: "+selectedListItem}</Header>
                </Form.Field>
                <Button type='submit'>Submit</Button>
            </Form>
            <Divider/>
        </Container>
    )
    if(props.data){
        for(let key in props.data['resources']){
            elements.push(<Header style={{marginTop: '0.5em'}}>{key.slice(0,1).toUpperCase()+key.slice(1).toLowerCase()}</Header>)
            elements.push(<Divider/>)
            for(let i = 0; i < props.data['resources'][key].length; i++){
                elements.push(
                    <List onClick={props.activeListeners ? (e) => {handleClickedItem(e, setSelectedListItem)} : null}>
                        <List.Item>{props.data['resources'][key][i]}</List.Item>
                    </List>
                )
                elements.push(<Divider></Divider>)
            }
        }
    }
    return elements
}

function handleClickedItem(event, setter){
    setter(event.target.innerText)
}

function handleSubmit(props, state, setter){
    let filename = state
    let filenameArr = state.split('.')
    let fileTag = filenameArr[filenameArr.length-1]
    Fetcher.resetFromFile(fileTag, filename)
    .then(r => r.json())
    .then((response) => {
        if(response['status'] === 'Success'){
            setter('default.p')
            props.setResetFromBackupFormOpen(false)
            props.loadData()
        }
    })
}

function mapStateToProps(state){
    return {
        data: state.data
    }
}

function mapDispatchToProps(dispatch){
    return {
        setResetFromBackupFormOpen: (open) => {
            dispatch({
                type: "SET_RESET_FROM_BACKUP_FORM_OPEN",
                value: open
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DirectoryList);