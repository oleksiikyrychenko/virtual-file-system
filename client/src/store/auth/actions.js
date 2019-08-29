export const SIGN_OUT = 'SIGN_OUT';

export const signOut = () => ({ type: SIGN_OUT });

export const AUTH_LOGIN = 'AUTH_LOGIN';
export const login = data => ({
    type: AUTH_LOGIN,
    request: {
        method: 'POST',
        url: '/login',
        data
    }
});

export const AUTH_REGISTER = 'AUTH_REGISTER';
export const register = data => ({
    type: AUTH_REGISTER,
    request: {
        method: 'POST',
        url: '/register',
        data
    }
});
