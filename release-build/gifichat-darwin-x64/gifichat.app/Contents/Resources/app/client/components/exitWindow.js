
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { removeGuest } from '../store/messages';

class ExitWindow extends Component {
    constructor(props) {
        super(props);
        this.handleLeavePage = this.handleLeavePage.bind(this); // if you need to bind callback to this
    }

    componentDidMount() {
        window.addEventListener('beforeunload', this.handleLeavePage);
    }

    componentWillUnmount() {
        window.removeEventListener('beforeunload', this.handleLeavePage);
    }

    handleLeavePage(e) {
        const name = this.props.name
        this.props.removeGuest(name)
    }

    render() {
        return (
            <div></div>

        )


    }


}


const mapStateToProps = (state) => {
    return {
        name: state.messages.name
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        removeGuest: (name) => dispatch(removeGuest(name))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ExitWindow)