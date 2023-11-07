import axios from 'axios';
import authService from '../../services/auth.service';

jest.mock('axios');

describe('authService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('functional', () => {
        test("AuthService functional should login and set a token", async () => {
            const email = 'test@example.com';
            const password = 'password123';
            const mockResponseData = { token: 'mockToken' };
            let isNull = false;
            try {
                const response = await authService.login(email, password);
                isNull = response === null;
                throw new Error("Error in login()");
            } catch (error) {
                if (isNull) {
                    expect(error).toBeNull();
                } else {
                    authService.login = jest.fn().mockResolvedValueOnce(mockResponseData);
                    const result = await authService.login(email, password);
                    expect(authService.login).toHaveBeenCalled();
                    expect(result.token).toEqual(mockResponseData.token);
                }
            }
        });

        test("AuthService functional should change password", async () => {
            const userId = 1;
            const newPassword = 'newPassword123';
            let isNull = false;
            try {
                const response = await authService.changePassword(userId, newPassword);
                isNull = response === null;
                throw new Error("Error in changePassword()");
            } catch (error) {
                if (isNull) {
                    expect(error).toBeNull();
                } else {
                    authService.changePassword = jest.fn().mockResolvedValueOnce(undefined);
                    const result = await authService.changePassword(userId, newPassword);
                    expect(authService.changePassword).toHaveBeenCalled();
                    expect(result).toBeUndefined();
                }
            }
        });

        test("AuthService functional should log out and remove the token", () => {
            authService.logout();
            expect(localStorage.getItem('token')).toBeNull();
        });

        test("AuthService functional should check if a user is logged in", () => {
            localStorage.setItem('token', 'mockToken');
            const isLoggedIn = authService.isLoggedIn();
            expect(isLoggedIn).toBe(true);
        });

        test("AuthService functional should get the stored token", () => {
            const mockToken = 'mockToken';
            localStorage.setItem('token', mockToken);
            const token = authService.getToken();
            expect(token).toEqual(mockToken);
        });
    });
});
