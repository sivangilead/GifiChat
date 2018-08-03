import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import ExitWindow from './exitWindow'



class SideBar extends Component {


    render() {
        return (

            <nav className='sidebar'>

                {(this.props.location.pathname.includes('chat')) ?
                    <div>
                        <ul >
                            <li>Member</li>
                            {this.props.guests.map(guest => {
                                return <li>{guest}</li>
                            }
                            )}
                            <ExitWindow />
                        </ul>
                    </div>
                    : <h1></h1>
                }
            </nav>
        )
    }
}






const mapStateToProps = (state) => {
    return {
        name: state.messages.name,
        guests: state.messages.guests
    }
}



export default withRouter(connect(mapStateToProps)(SideBar));