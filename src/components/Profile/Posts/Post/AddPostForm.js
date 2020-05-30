import React from "react";
import {Field, reduxForm} from "redux-form";
import {ValidatedElement} from "../../../UI/FormValidation/ValidatedElement";
import {required} from "../../../../utils/validators/validators";

//const validators = [required, maxLength(10)];

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
            <Field id={'rememberMe'}
                   className={'customCheckBox'}
                   component={ValidatedElement}
                   element={'input'}
                   label={'Remember me'}
                   type={"checkbox"}
                   name={'rememberMe'}
                   validate={[required]}
            />
            <button>Add post</button>
        </form>
    );
};

export default reduxForm({form: 'AddPostProfile'})(AddPostForm);