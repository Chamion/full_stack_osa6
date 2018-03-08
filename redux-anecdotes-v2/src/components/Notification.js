import React from 'react'
import { connect } from 'react-redux'

class Notification extends React.Component {
    
    render() {
        const style = {
            border: 'solid',
            padding: 10,
            borderWidth: 1,
            display: this.props.display
        }
        return (
            <div style={style}>
                { this.props.content }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        display: state.notification.display,
        content: state.notification.content
    }
}

const connectedNotification = connect(
    mapStateToProps
)(Notification)

export default connectedNotification
