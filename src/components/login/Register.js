import React from 'react';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {useFormControls} from "../shared/FormValidation";

function Register() {


    const { handleInputValue, handleFormSubmit, formIsValid, errors } = useFormControls();


    return(
        <div>
            <p>HEADER</p>
            <p>HEADER</p>
            <div>
                <h1 className="title">Please Log In</h1>
            </div>
            <div className="register-box">
                <form onSubmit={handleFormSubmit}>
                    <div>
                        <TextField required name="email" label="Email" type="text" variant="standard"
                                   onChange={handleInputValue} onBlur={handleInputValue}
                                   error={errors["email"]}
                                   {...(errors["email"] && {
                                       error: true,
                                       helperText: errors["email"]
                                   })}
                        />
                    </div>
                    <div>
                        <TextField required name="username" label="Username" type="text"
                                   onChange={handleInputValue} onBlur={handleInputValue}
                                   error={errors["username"]}
                                   {...(errors["username"] && {
                                       error: true,
                                       helperText: errors["username"]
                                   })}
                        />
                    </div>
                    <div>
                        <TextField required name="fname" label="First name" type="text"
                                   onChange={handleInputValue} onBlur={handleInputValue}
                                   error={errors["fname"]}
                                   {...(errors["fname"] && {
                                        error: true,
                                        helperText: errors["fname"]
                                   })}
                        />
                    </div>
                    <div>
                        <TextField required name="lname" label="Last name" type="text"
                                   onChange={handleInputValue} onBlur={handleInputValue}
                                   error={errors["lname"]}
                                   {...(errors["lname"] && {
                                       error: true,
                                       helperText: errors["lname"]
                                   })}
                        />
                    </div>
                    <div>
                        <TextField required name="password" label="Password" type="password"
                                   onChange={handleInputValue} onBlur={handleInputValue}
                                   error={errors["password"]}
                                   {...(errors["password"] && {
                                       error: true,
                                       helperText: errors["password"]
                                   })}
                        />
                    </div>
                    <div>
                        <TextField required name="r_password" label="Repeat password" type="password"
                                   onChange={handleInputValue} onBlur={handleInputValue}
                                   error={errors["r_password"]}
                                   {...(errors["r_password"] && {
                                       error: true,
                                       helperText: errors["r_password"]
                                   })}
                        />
                    </div>
                    <div>
                        <Button variant="contained" type="submit" color="primary" disabled={!formIsValid()}>
                            Register</Button><br/>
                    </div>
                </form>
            </div>
        </div>
    );
}


export default Register;