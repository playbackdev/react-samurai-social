import React, {ChangeEvent, useEffect, useState} from "react";
import classes from './ProfileStatus.module.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSave, faTimes} from "@fortawesome/free-solid-svg-icons";

type PropsType = {
    status: string
    updateStatus: (status: string) => void
    isOwnProfile: boolean
}

const ProfileStatus: React.FC<PropsType> = (props) => {

    const [editMode, setEditMode] = useState(false);
    const [status, setStatus] = useState(props.status);

    useEffect(() => {
        setStatus(props.status);

    }, [props.status]);

    const activateEditMode = () => {
        if(props.isOwnProfile) {
            setEditMode(true);
        }
    };

    const deactivateEditMode = () => {
        setEditMode(false);
        setStatus(props.status);
    };

    const onChangeUpdateSetLocalStatus = (e: ChangeEvent<HTMLInputElement>) => {
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
                        <p className={props.isOwnProfile?classes.editable:''} onClick={activateEditMode}>
                            {props.status || 'No status'}
                        </p>
                    </div>
            }
        </>
    );
};

export default ProfileStatus;