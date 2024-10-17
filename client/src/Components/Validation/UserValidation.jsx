import * as yup from 'yup';

//login validation

const LoginValidation = yup.object().shape({
    email : yup.string().email().required("Email is required").trim(),
    password: yup.string()
    .required("Password is required")
    .min(6,"Password must be atleast 6 characters")
    .max(20,"Pasword must be less then 20 characters")
    .matches(/(?=.*[0-9])/,"Password must  contain a number"),
});

// register validation

const RegisterValidation = yup.object().shape({
    email : yup.string().email().required("Email is required").trim(),
    password: yup.string()
    .required("Password is required")
    .min(6,"Password must be atleast 6 characters")
    .max(20,"Pasword must be less than 20 characters")
    .matches(/(?=.*[0-9])/,"Password must  contain a number"),
    fullName: yup.string().required("full name is required")
    .max(20,"Full name must be less than  20 characters")
    .matches(/^[a-zA-Z]*$/,"Full name must contain only letters"),

})

export {LoginValidation,RegisterValidation}