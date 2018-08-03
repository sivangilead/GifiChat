import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { deleteMessages, removeGuest } from '../store/messages';


class Navbar extends Component {


    render() {
        const name = this.props.name;
        return (

            <nav className='nav'>

                {(this.props.location.pathname.includes('chat')) ?
                    <div className='nav'>
                        <div className="nav-item" className="flexname">
                            <img height="20" src='user2.png' alt="image" />
                            <p className="nav-item">{name}</p>


                        </div>
                        <Link to="/chat" onClick={() => {
                            this.props.deleteMessages('')
                        }} className="nav-item">
                            <img height="20" src='clear.png' alt="image" />
                        </Link>

                        <Link to="/" onClick={() => {
                            this.props.removeGuest(name)
                        }} className="nav-item" >
                            <img height="20" src='exit.png' alt="image" />
                        </Link>
                    </div>
                    : <h1></h1>
                }
            </nav>
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
        deleteMessages: () => dispatch(deleteMessages()),
        removeGuest: (name) => dispatch(removeGuest(name))
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));