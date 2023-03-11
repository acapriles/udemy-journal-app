import {
	loginUserWithEmailPassword,
	logoutFirebase,
	registerUserWithEmailPassword,
	singInWithGoogle,
} from '../../../src/firebase/providers';
import { checkingCredentials, login, logout } from '../../../src/store/auth';
import {
	checkingAuthentication,
	startCreatingUserWithEmailPassword,
	startGoogleSignIn,
	startLoginWithEmailPassword,
	startLogout,
} from '../../../src/store/auth/thunks';
import { clearNotesLogout } from '../../../src/store/journal/journalSlice';
import { demoUser } from '../../fixtures/authFixtures';

jest.mock('../../../src/firebase/providers');

describe('Tests on AuthThunks', () => {
	const dispatch = jest.fn();

	beforeEach(() => jest.clearAllMocks());

	test('debe de invocar el checkingCredentials', async () => {
		/* Test subject */
		await checkingAuthentication()(dispatch);

		/* The expected */
		expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
	});

	test('startGoogleSignIn debe de llamar checkingCredentials y login - Exito', async () => {
		/* Preparing the data */
		const loginData = { ok: true, ...demoUser };
		await singInWithGoogle.mockResolvedValue(loginData);

		/* Test subject */
		await startGoogleSignIn()(dispatch);

		/* The expected */
		expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
		expect(dispatch).toHaveBeenCalledWith(login(loginData));
	});

	test('startGoogleSignIn debe de llamar checkingCredentials y logout - Error', async () => {
		/* Preparing the data */
		const loginData = { ok: false, errorMessage: 'User not found' };
		await singInWithGoogle.mockResolvedValue(loginData);

		/* Test subject */
		await startGoogleSignIn()(dispatch);

		/* The expected */
		expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
		expect(dispatch).toHaveBeenCalledWith(logout(loginData.errorMessage));
	});

	test('startLoginWithEmailPassword debe de llamar checkingCredentials y login - Exito', async () => {
		/* Preparing the data */
		const formData = {
			email: demoUser.email,
			password: 123456,
			displayName: demoUser.displayName,
		};

		const loginData = { ok: true, ...demoUser };

		await loginUserWithEmailPassword.mockResolvedValue(loginData);

		/* Test subject */
		await startLoginWithEmailPassword(formData)(dispatch);

		/* The expected */
		expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
		expect(dispatch).toHaveBeenCalledWith(login(loginData));
	});

	test('startLogout debe de llamar logoutFirebase, clearNotes y logout', async () => {
		/* Test subject */
		await startLogout()(dispatch);

		/* The expected */
		expect(logoutFirebase).toHaveBeenCalled();
		expect(dispatch).toHaveBeenCalledWith(clearNotesLogout());
		expect(dispatch).toHaveBeenCalledWith(logout());
	});
});
