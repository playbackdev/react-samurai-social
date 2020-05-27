import React from "react";
import classes from './ProfileStatus.module.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSave, faTimes} from "@fortawesome/free-solid-svg-icons";

class ProfileStatus extends React.Component {

    state = {
        editMode: false,
        status: this.props.status
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        //если вдруг профайл загрузится быстрее статуса
        //то в локальном стейте не будет записан актуальный статус
        //а будет инициализирован изначальным пустым пропсом
        //поэтому когда в компонент придут новый пропс статуса после загрузки
        //вызовется этот метод и тут мы обновляем локальный стейт
        if(prevProps.status !== this.props.status) {
            this.setState({status: this.props.status})
        }
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
        } else {
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
                                <button className={'blue'}
                                        onClick={this.saveStatus}
                                >
                                    <FontAwesomeIcon icon={faSave}/>&nbsp;Save
                                </button>
                                <button className={'red'}
                                        onClick={this.deactivateEditMode}
                                >
                                    <FontAwesomeIcon icon={faTimes}/>&nbsp;Cancel
                                </button>
                            </div>
                        </div>
                        : <div className={classes.ProfileStatus}>
                            <p onClick={this.activateEditMode}>
                                {this.props.status || 'No status'}
                            </p>
                        </div>
                }
            </>
        );
    }
};

export default ProfileStatus;