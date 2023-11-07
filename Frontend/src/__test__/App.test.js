import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from '../App';

describe("appComponent", () => {
    describe('boundary', () => {
        afterEach(() => {
            localStorage.removeItem('token');
            localStorage.removeItem('isStudent');
        });

        test("AppComponent boundary renders Homepage component for / route", () => {
            render(
                <Router initialEntries={['/']}>
                    <App />
                </Router>
            );
            expect(screen.getByText('Homepage')).toBeInTheDocument();
        });

        test("AppComponent boundary renders Courses component from Homepage for /courses route", () => {
            render(
                <Router initialEntries={['/courses']}>
                    <App />
                </Router>
            );
            expect(screen.getByText('Courses')).toBeInTheDocument();
        });

        test("AppComponent boundary renders Login component from Homepage for /login route", () => {
            render(
                <Router initialEntries={['/login']}>
                    <App />
                </Router>
            );
            expect(screen.getByText('Login')).toBeInTheDocument();
        });

        test("AppComponent boundary renders Create Account component from Homepage for /create-account route", () => {
            render(
                <Router initialEntries={['/create-account']}>
                    <App />
                </Router>
            );
            expect(screen.getByText('Create Account')).toBeInTheDocument();
        });

        test("AppComponent boundary renders Create Account component from Homepage for /assignment route", () => {
            localStorage.setItem('token', 'your_token_value');
            localStorage.setItem('isStudent', 'true');
            render(
                <Router>
                    <App />
                </Router>
            );
            expect(screen.getByText('Assignment')).toBeInTheDocument();
        });

        test("AppComponent boundary renders Create Account component from Homepage for /students route", () => {
            localStorage.setItem('token', 'your_token_value');
            localStorage.setItem('isStudent', 'true');
            render(
                <Router>
                    <App />
                </Router>
            );
            expect(screen.getByText('Students')).toBeInTheDocument();
        });

        test("AppComponent boundary renders Create Account component from Homepage for /grade route", () => {
            localStorage.setItem('token', 'your_token_value');
            localStorage.setItem('isStudent', 'true');
            render(
                <Router>
                    <App />
                </Router>
            );
            expect(screen.getByText('Grade')).toBeInTheDocument();
        });

        test("AppComponent boundary renders Create Account component from Homepage for logout route", () => {
            localStorage.setItem('token', 'your_token_value');
            localStorage.setItem('isStudent', 'true');
            render(
                <Router>
                    <App />
                </Router>
            );
            expect(screen.getByText('Logout')).toBeInTheDocument();
        });
    });
});
