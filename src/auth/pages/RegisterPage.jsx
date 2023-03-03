import { Link as RouterLink } from 'react-router-dom';
import { Google } from "@mui/icons-material";
import { Button, Grid, Link, TextField, Typography } from "@mui/material";
import { AuthLayout } from '../layouts/AuthLayout';

export const RegisterPage = () => {
	return (
		<AuthLayout title="Create an account">

			<form>
				<Grid container>
					
					<Grid item xs={12} sx={{ mt: 2 }}>
						<TextField 
							label="Full name"
							type="text"
							placeholder="Your full name"
							fullWidth
						/>
					</Grid>
					
					<Grid item xs={12} sx={{ mt: 2 }}>
						<TextField 
							label="Email"
							type="email"
							placeholder="your_email@email.com"
							fullWidth
						/>
					</Grid>

					<Grid item xs={12} sx={{ mt: 2 }}>
						<TextField 
							label="Password"
							type="password"
							placeholder="********"
							fullWidth
						/>
					</Grid>

					<Grid container
						spacing={ 2 }
						sx={{ mb: 2, mt: 1 }}
					>
						<Grid item xs={ 12 }>
							<Button variant="contained" fullWidth>
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
