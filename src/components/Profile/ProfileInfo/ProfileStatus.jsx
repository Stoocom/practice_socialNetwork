import React from 'react'
// import s from './ProfileInfo.module.css';
// import Loader from '../../common/Preloader/Loader';

class ProfileStatus extends React.Component {
    state = {
        isWatchingInput: false,
        status: this.props.status
    }

    activateInput = () => {
        this.setState({
            isWatchingInput: true
        })
        //this.forceUpdate()
    }

    deActivateInput = () => {
        this.setState({
            isWatchingInput: false
        })
        this.props.updateStatus(this.state.status)
    }


    onPostChange = (event) => {
        this.setState({
            status: event.target.value
        })
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status
            })
        }
    }


    render() {
        return (
            <span>
                {!this.state.isWatchingInput
                    ?
                    <div onDoubleClick={this.activateInput}>
                        Статус: {this.props.status}
                    </div>
                    :
                    <div>
                        <input
                            autoFocus={true}
                            onBlur={this.deActivateInput}
                            value={this.state.status}
                            onChange={this.onPostChange}
                        ></input>
                    </div>
                }
            </span>
        )
    }
}
export default ProfileStatus 