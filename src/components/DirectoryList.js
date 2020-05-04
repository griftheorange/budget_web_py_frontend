import React from 'react';
import { connect } from 'react-redux';
import { Header, Divider, Card } from 'semantic-ui-react'

function DirectoryList(props) {
    let elements = []
    if(props.data){
        for(let key in props.data['resources']){
            elements.push(<Header>{key}</Header>)
            elements.push(<Divider/>)
            for(let i = 0; i < props.data['resources'][key].length; i++){
                elements.push(
                    <Card>
                        <Card.Content>
                            <Card.Description style={{fontSize: '12px', marginRight: '6px'}}>{props.data['resources'][key][i]}</Card.Description>
                        </Card.Content>
                    </Card>
                )
            }
        }
    }
    return elements
}

function mapStateToProps(state){
    return {
        data: state.data
    }
}

export default connect(mapStateToProps)(DirectoryList);