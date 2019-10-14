import React  from 'react';
import { Field, Formik, withFormik } from "formik";
import Styles from "./styles";

const AuthorizationForm = ({ onSubmit, fields, buttonText, validationSchema, initialValues = {} }) => {
    return (
        <Styles>
            <Formik
                onSubmit={onSubmit}
                initialValues={initialValues}
                validationSchema={validationSchema}
                render={({ handleSubmit, errors, touched, isSubmitting }) => (
                    <form
                        onSubmit={handleSubmit}
                        className={'form'}
                    >
                        {
                            fields.map((field, index) => (
                                <div className={'input-wrapper'} key={index}>
                                    <Field
                                        {...field}
                                    />
                                    {( (errors[`${field.name}`] && touched[`${field.name}`]) || !isSubmitting ) &&
                                    <div className={'error'}>{errors[field.name]}</div>
                                    }
                                </div>
                                ))
                        }
                        <button
                            type="submit"
                            className={'submit-button'}
                        >
                            {buttonText}
                        </button>
                    </form>
                )}
            />
        </Styles>
    )
};

export default withFormik({
    mapPropsToValues: () => ({ password: '', email: '', firstName: '', lastName: '' }),
})(AuthorizationForm);
