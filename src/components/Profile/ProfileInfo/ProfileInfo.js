import React, {useState} from "react";
import classes from './ProfileInfo.module.scss'
import ProfileInfoList from "./ProfileInfoList";
import ProfileInfoForm from "./ProfileInfoForm";
import {startSubmit} from "redux-form";
import cn from "classnames";

const ProfileInfo = (props) => {

    const [editMode, setEditMode] = useState(false);

    const onSubmit = (formData, dispatch) => {
        dispatch(startSubmit('profileInfoEdit'));
        if(!formData.lookingForAJob) { formData.lookingForAJob = false; }
        props.saveProfileInfo(formData).then(() => {
            setEditMode(false);
        });
    };

    return (
        <div className={cn(classes.profileInfo, { [classes.editMode]: !!editMode} )}>
            {editMode
                ? <ProfileInfoForm
                    initialValues={props.profile}
                    {...props}
                    onSubmit={onSubmit}
                    cancelEditMode={() => setEditMode(false)}
                />
                : <ProfileInfoList
                    {...props}
                    activateEditMode={() => setEditMode(true)}
                />
            }
        </div>
    );
};

export default ProfileInfo;