import React from 'react'
import PersonSummery from './PersonSummery'
import {Card ,CardColumns} from 'react-bootstrap'

const PersonList = ({persons}) => {
    return(
        <div className="room-List section">
            {
                persons && persons.map(person => {
                    return(<PersonSummery person={person} key={person._id} />)
                })
            }
        </div>
    )
}



export default PersonList