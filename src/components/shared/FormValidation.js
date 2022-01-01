import React, {useState} from 'react'

const initialFormValues = {
    username: "",
    email: "",
    password: "",
    r_password: "",
    fname: "",
    lname: "",
}

export const useFormControls = () => {
    // We'll update "values" as the form updates
    const [values, setValues] = useState(initialFormValues);
    // "errors" is used to check the form for errors
    const [errors, setErrors] = useState({})

    const isUsernameAvailable = (username) => {

    }

    const isEmailAvailable = (email) => {

    }

    const validate = (fieldValues = values) => {
        let temp = { ...errors }

        if ("username" in fieldValues) {
            temp.username = fieldValues.username ? "" : "This field is required."
            if(fieldValues.username)
                temp.username = isUsernameAvailable(fieldValues.username) ? "" : "This username is not available."
        }

        if ("password" in fieldValues) {
            temp.password = fieldValues.password ? "" : "This field is required."
            if (fieldValues.password) {
                temp.password = (fieldValues.password.length > 7) ? "" : "Password must be 8 characters long."
            }
        }

        if ("fname" in fieldValues)
            temp.fname = fieldValues.fname ? "" : "This field is required."

        if ("lname" in fieldValues)
            temp.lname = fieldValues.lname ? "" : "This field is required."

        if ("email" in fieldValues) {
            temp.email = fieldValues.email ? "" : "This field is required."
            if (fieldValues.email)
                temp.email = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(fieldValues.email)
                    ? isEmailAvailable(fieldValues) ? "" : "This email is not available."
                    : "Email is not valid."

        }

        if ("r_password" in fieldValues) {
            temp.r_password = fieldValues.r_password ? "" : "This field is required."
            if (fieldValues.r_password) {
                console.log(initialFormValues.password)
                console.log(Object.values(values))
                temp.r_password = (fieldValues.r_password === Object.values(values)[2]) ? "" : "Passwords must coincide."
            }
        }

        setErrors({
            ...temp
        });
    }
    const handleInputValue = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        });
        validate({ [name]: value });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        let url = "http://127.0.0.1:8000/users"

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: Object.values(values)[1],
                username: Object.values(values)[0],
                password: Object.values(values)[2],
                first_name: Object.values(values)[4],
                last_name: Object.values(values)[5],
            })
        }

        fetch(url, requestOptions)
            .then(response => response.json())
            .then( (result) => {
                localStorage.setItem('token', result)
                setTimeout(function() {
                    window.location.href = "/"
                }, 100)
            })
            .catch(error => {
                console.log(error)
            })
    };

    const formIsValid = (fieldValues = values) => {
        return fieldValues.email &&
            fieldValues.username &&
            fieldValues.password &&
            fieldValues.r_password &&
            fieldValues.fname &&
            fieldValues.lname &&
            Object.values(errors).every((x) => x === "");
    };

    return {
        handleInputValue,
        handleFormSubmit,
        formIsValid,
        errors
    };
}