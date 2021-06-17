import React from 'react'
import {gql, useMutation} from '@apollo/client'
import {ErrorMessage, Field, Form, Formik, FormikHelpers} from 'formik'
import * as yup from 'yup'
import {useHistory} from 'react-router-dom'

const LOGIN_MUTATION = gql`
    mutation signup($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
        }
    }
`

const initialValues = {
    email: '',
    password: '',
}

type FormDataType = typeof initialValues
type MutationDataType = {
    login: {
        token: string
    }
}
type VariablesType = FormDataType
const validationSchema = yup.object({
    email: yup.string().email('Invalid email address').required('Email Required'),
    password: yup.string().max(20, 'Must be 20 characters or less').required('Password Required'),
})

export const SignIn = () => {
    const history = useHistory()
    const [signUp, {error, loading}] = useMutation<MutationDataType, VariablesType>(
        LOGIN_MUTATION,
    )

    const onSubmit = async (
        formData: FormDataType,
        {setSubmitting}: FormikHelpers<FormDataType>,
    ) => {
        setSubmitting(true)
        try {
            const response = await signUp({
                variables: formData,
            })
            const token = (response.data as MutationDataType).login.token
            localStorage.setItem('auth_token', token)
            history.push('/users')
        } catch (e) {
        } finally {
            setSubmitting(true)
        }
    }

    return (
        <div className="container">
            <h1>Sign In</h1>
            {error && <h3>{error.message}</h3>}
            {loading && <h3>Loading...</h3>}
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                <Form>
                    {/* ------ */}
                    <Field name="email" type="text" placeholder="Email" onChan/>
                    <ErrorMessage name="email" component="div"/>
                    {/* ------ */}
                    <Field name="password" type="password" placeholder="Password"/>
                    <ErrorMessage name="password" component="div"/>
                    {/* ------ */}
                    <button type="submit">Sign In</button>
                </Form>
            </Formik>
        </div>
    )
}
