export const userStateActions = {
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',
  CHECK_SESSION: 'CHECK_SESSION',
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
};

export const userStateInit = {
  username: '',
  loggedIn: false,
  loading: 'idle',
};

export const userStateReducer = (state, action) => {
  switch (action.type) {
    case userStateActions.LOGIN: {
      return { ...state, loading: 'login' };
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
    default:
      return state;
  }
};
