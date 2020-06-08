import React, {useEffect, useState} from "react";
import classes from './ProfileStatus.module.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSave, faTimes} from "@fortawesome/free-solid-svg-icons";

const ProfileStatus = props => {

    const [editMode, setEditMode] = useState(false);
    const [status, setStatus] = useState(props.status);

    useEffect(() => {
        setStatus(props.status);

    }, [props.status]);

    const activateEditMode = () => {
        setEditMode(true);
    };

    const deactivateEditMode = () => {
        setEditMode(false);
        setStatus(props.status);
    };

    const onChangeUpdateSetLocalStatus = (e) => {
        setStatus(e.currentTarget.value);
    };

    const saveStatus = () => {
        if(status !== props.status) {
            props.updateStatus(status);
            setEditMode(false);
        } else {
            setEditMode(false);
        }
    };

    return (
        <>
            {
                editMode ?
                    <div className={classes.ProfileStatus}>
                        <input autoFocus={editMode}
                               value={status || ''}
                               onChange={onChangeUpdateSetLocalStatus}
                               placeholder={'Change your status'}
                        />
                        <div className={classes.editModeButtons}>
                            <button className={'blue'}
                                    onClick={saveStatus}
                            >
                                <FontAwesomeIcon icon={faSave}/>&nbsp;Save
                            </button>
                            <button className={'red'}
                                    onClick={deactivateEditMode}
                            >
                                <FontAwesomeIcon icon={faTimes}/>&nbsp;Cancel
                            </button>
                        </div>
                    </div>
                    : <div className={classes.ProfileStatus}>
                        <p onClick={activateEditMode}>
                            {props.status || 'No status'}
                        </p>
                    </div>
            }
        </>
    );
};

export default ProfileStatus;