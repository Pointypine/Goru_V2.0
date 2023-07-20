export const userStateActions = {
  CHECK_SESSION: 'CHECK_SESSION',
  LOGIN: 'LOGIN',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGOUT: 'LOGOUT',
  LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',
  NEW_USER: 'NEW_USER',
  USER_COMMENTS_RECEIVED: 'USER_COMMENTS_RECEIVED',
};

export const userStateInit = {
  username: '',
  id: null,
  newUser: false,
  loggedIn: false,
  loading: 'idle',
  comments: [],
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
      const { username, id } = action.payload;
      return { ...state, username, id, loggedIn: true, loading: 'idle' };
    }
    case userStateActions.LOGOUT_SUCCESS: {
      return userStateInit;
    }
    case userStateActions.NEW_USER: {
      return { ...state, newUser: true };
    }
    case userStateActions.USER_COMMENTS_RECEIVED: {
      const newCommentsList = action.payload;
      return { ...state, comments: newCommentsList };
    }
    default:
      return state;
  }
};
