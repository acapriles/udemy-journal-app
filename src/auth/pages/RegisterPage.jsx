import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material";

import { AuthLayout } from '../layouts/AuthLayout';
import { useForm } from '../../hooks';
import { startCreatingUserWithEmailPassword } from '../../store/auth';


const formData = {
	email: '',
	password: '',
	displayName: '',
};

const formValidations = {
	email: [ (value) => value.includes('@'), 'El correo debe de tener una @'],
	password: [ (value) => value.length >= 6, 'El password debe de tener más de 6 letras.'],
	displayName: [ (value) => value.length >= 1, 'El nombre es obligatorio.'],
}

export const RegisterPage = () => {

	const dispatch = useDispatch();
	const [formSubmitted, setFormSubmitted] = useState(false);

	const { status, errorMessage } = useSelector( ( state ) => state.auth );

	const isCheckingAuthentication = useMemo(() => status === 'checking', [status]);
	
	const { 
		formState, displayName, email, password, 
		onInputChange, 
		isFormValid, displayNameValid, emailValid, passwordValid 
	} = useForm( formData, formValidations );
	
	const onSubmit = ( event ) => {
		event.preventDefault();
		setFormSubmitted(true);

    	if ( !isFormValid ) return;

		dispatch( startCreatingUserWithEmailPassword( formState ) );
	}

	return (
		<AuthLayout title="Create an account">

			<form onSubmit={ onSubmit } className="animate__animated animate__fadeIn animate__faster">
				<Grid container>
					
					<Grid item xs={12} sx={{ mt: 2 }}>
						<TextField 
							label="Full name"
							type="text"
							placeholder="Your full name"
							fullWidth
							name='displayName'
							onChange={ onInputChange }
							value={ displayName }
							error={ !!displayNameValid && formSubmitted }
                			helperText={ displayNameValid }
						/>
					</Grid>
					
					<Grid item xs={12} sx={{ mt: 2 }}>
						<TextField 
							label="Email"
							type="email"
							placeholder="your_email@email.com"
							fullWidth
							name='email'
							onChange={ onInputChange }
							value={ email }
							error={ !!emailValid && formSubmitted }
                			helperText={ emailValid }
						/>
					</Grid>

					<Grid item xs={12} sx={{ mt: 2 }}>
						<TextField 
							label="Password"
							type="password"
							placeholder="********"
							fullWidth
							name='password'
							onChange={ onInputChange }
							value={ password }
							error={ !!passwordValid && formSubmitted }
                			helperText={ passwordValid }
						/>
					</Grid>

					<Grid container
						spacing={ 2 }
						sx={{ mb: 2, mt: 1 }}
					>
						<Grid 
							item 
							xs={ 12 }
							display={ !!errorMessage ? '' : 'none' }
						>
							<Alert severity="error">{ errorMessage }</Alert>
						</Grid>

						<Grid item xs={ 12 }>
							<Button 
								variant="contained" 
								fullWidth
								type='submit'
								disabled={ isCheckingAuthentication }
							>
								Create account
							</Button>
						</Grid>

					</Grid>

					<Grid container direction="row" justifyContent="end">
						<Typography sx={{ mr: 1 }}>Do you already have an account?</Typography>
						<Link component={ RouterLink } color="inherit" to="/auth/login">
							Login
						</Link>
					</Grid>

				</Grid>
			</form>

		</AuthLayout>
	)
}
