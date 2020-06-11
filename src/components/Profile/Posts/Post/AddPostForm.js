import React from "react";
import {Field, reduxForm} from "redux-form";
import {ValidatedElement} from "../../../UI/FormValidation/ValidatedElement";

const AddPostForm = (props) => {

    return (
        <form onSubmit={props.handleSubmit}>
            <Field
                component={ValidatedElement}
                element={'textarea'}
                name={'newPostText'}
                type={'text'}
                placeholder="Write your new post..."
            />
            <button>Add post</button>
        </form>
    );
};

export default reduxForm({form: 'AddPostProfile'})(AddPostForm);