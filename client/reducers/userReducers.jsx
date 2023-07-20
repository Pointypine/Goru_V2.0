export const userStateActions = {
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',
  CHECK_SESSION: 'CHECK_SESSION',
  NEW_USER: 'NEW_USER',
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
};

export const userStateInit = {
  username: '',
  newUser: false,
  loggedIn: false,
  loading: 'idle',
};

export const userStateReducer = (state, action) => {
  switch (action.type) {
    case userStateActions.LOGIN: {
      return { ...state, newUser: false, loading: 'login' };
    }
    case userStateActions.LOGOUT: {
      return { ...state, loading: 'logout' };
    }
    case userStateActions.CHECK_SESSION: {
      return { ...state, loading: 'check_session' };
    }
    case userStateActions.LOGIN_SUCCESS: {
      const { username } = action.payload;
      return { ...state, username, loggedIn: true, loading: 'idle' };
    }
    case userStateActions.LOGOUT_SUCCESS: {
      return userStateInit;
    }
    case userStateActions.NEW_USER: {
      return { ...state, newUser: true };
    }
    default:
      return state;
  }
};
