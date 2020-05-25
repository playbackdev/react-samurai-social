import React from "react";
import classes from './ProfileStatus.module.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSave, faTimes} from "@fortawesome/free-solid-svg-icons";
import Button from "../../UI/Button/Button";

class ProfileStatus extends React.Component {

    state = {
        editMode: false,
        status: this.props.status
    };

    componentDidMount() {
        this.setState({status: this.props.status});
    }

    activateEditMode = () => {
        this.setState({editMode: true});
    };

    deactivateEditMode = () => {
        this.setState({
            editMode: false,
            status: this.props.status
        });
    };

    onChangeUpdateSetLocalStatus = (e) => {
        this.setState({status: e.currentTarget.value});
    };

    saveStatus = () => {
        if(this.state.status !== this.props.status) {
            this.props.updateStatus(this.state.status);
            this.setState({editMode: false});
        } {
            this.setState({
                editMode: false,
            });
        }
    };

    render() {
        return (
            <>
                {
                    this.state.editMode ?
                        <div className={classes.ProfileStatus}>
                            <input autoFocus={this.state.editMode}
                                   value={this.state.status || ''}
                                   onChange={this.onChangeUpdateSetLocalStatus}
                                   placeholder={'Change your status'}
                            />
                            <div className={classes.editModeButtons}>
                                <Button color={'blue'}
                                        onClick={this.saveStatus}
                                >
                                    <FontAwesomeIcon icon={faSave}/>&nbsp;Save
                                </Button>
                                <Button color={'red'}
                                        onClick={this.deactivateEditMode}
                                >
                                    <FontAwesomeIcon icon={faTimes}/>&nbsp;Cancel
                                </Button>
                            </div>
                        </div>
                        : <div className={classes.ProfileStatus}>
                            <p onClick={this.activateEditMode}>
                                {this.props.status || 'Change your status'}
                            </p>
                        </div>
                }
            </>
        );
    }
};

export default ProfileStatus;