import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { Google } from "@mui/icons-material";
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material";

import { AuthLayout } from '../layouts/AuthLayout';
import { useForm } from '../../hooks/useForm';
import { startGoogleSignIn, startLoginWithEmailPassword} from '../../store/auth';

export const LoginPage = () => {

	const { status, errorMessage } = useSelector( ( state ) => state.auth );

	const isAuthentication = useMemo(() => status === 'checking', [status]);

	const { email, password, onInputChange, formState } = useForm({
		email: '',
		password: '',
	});

	const dispatch = useDispatch();

	const onSubmit = ( event ) => {
		event.preventDefault();

		// console.log(formState);
		if (password.length < 1) return;
		
		dispatch( startLoginWithEmailPassword({ email, password }) );

	}

	const onGoogleSignIn = () => {
		// console.log( 'onGoogleSignIn' );
		dispatch( startGoogleSignIn() );
	}


	return (
		<AuthLayout title="Login">

			<form onSubmit={ onSubmit } className="animate__animated animate__fadeIn animate__faster">
				<Grid container>
					
					<Grid item xs={12} sx={{ mt: 2 }}>
						<TextField 
							label="Email"
							type="email"
							placeholder="your_email@email.com"
							fullWidth
							name='email'
							value={ email }
							onChange={ onInputChange }
						/>
					</Grid>

					<Grid item xs={12} sx={{ mt: 2 }}>
						<TextField 
							label="Password"
							type="password"
							placeholder="********"
							fullWidth
							name='password'
							value={ password }
							onChange={ onInputChange }
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

						<Grid item xs={ 12 } sm={ 6 }>
							<Button 
								type='submit' 
								variant="contained" 
								fullWidth
								disabled={ isAuthentication }
							>
								Login
							</Button>
						</Grid>

						<Grid item xs={ 12 } sm={ 6 }>
							<Button 
								variant="contained" 
								fullWidth
								onClick={ onGoogleSignIn }
								disabled={ isAuthentication }
							>
								<Google />
								<Typography sx={{ ml: 1 }}>Google</Typography>
							</Button>
						</Grid>
					</Grid>

					<Grid container direction="row" justifyContent="end">
						<Link component={ RouterLink } color="inherit" to="/auth/register">
							Create an account
						</Link>
					</Grid>

				</Grid>
			</form>

		</AuthLayout>
	)
}
