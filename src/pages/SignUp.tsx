import React from 'react'
import { gql, useMutation } from '@apollo/client'
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik'
import * as yup from 'yup'
import { useHistory, Link } from 'react-router-dom'
import '../style/login.css'

const SIGN_UP_MUTATION = gql`
    mutation signup($name: String, $email: String!, $password: String!) {
        signup(name: $name, email: $email, password: $password) {
            token
        }
    }
`

const initialValues = {
    name: '',
    email: '',
    password: '',
}

type FormDataType = typeof initialValues
type MutationDataType = {
    signup: {
        token: string
    }
}
type VariablesType = FormDataType
const validationSchema = yup.object({
    email: yup.string().email('Invalid email address').required('Email Required'),
    password: yup.string().max(20, 'Must be 20 characters or less').required('Password Required'),
    name: yup.string().max(15, 'Must be 15 characters or less').required('Name Required'),
})

export const SignUp = () => {
    const history = useHistory()
    const [signUp, { error, loading }] =
        useMutation<MutationDataType, VariablesType>(SIGN_UP_MUTATION)

    const onSubmit = async (
        formData: FormDataType,
        { setSubmitting }: FormikHelpers<FormDataType>,
    ) => {
        setSubmitting(true)
        console.log(formData)
        try {
            const response = await signUp({
                variables: formData,
            })
            const token = (response.data as MutationDataType).signup.token
            localStorage.setItem('auth_token', token)
            history.push('/users')
        } catch (e) {
        } finally {
            setSubmitting(true)
        }
    }

    return (
        <div className="container">
            <h1>Sign Up</h1>
            {error && <h3>{error.message}</h3>}
            {loading && <h3>Loading...</h3>}
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                <Form>
                    {/* ------ */}
                    <Field name="email" type="text" placeholder="Email" onChan />
                    <ErrorMessage name="email" component="div" />
                    {/* ------ */}
                    <Field name="name" type="text" placeholder="Name" />
                    <ErrorMessage name="name" component="div" />
                    {/* ------ */}
                    <Field name="password" type="password" placeholder="Password" />
                    <ErrorMessage name="password" component="div" />
                    {/* ------ */}
                    <button type="submit" className="login-button">
                        <span>Sign up</span>
                    </button>
                </Form>
            </Formik>
            <div className="register">
                <h4>Already have an account?</h4>
                <Link to="/signin">Log in</Link>
            </div>
        </div>
    )
}
