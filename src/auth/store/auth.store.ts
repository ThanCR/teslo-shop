import { create } from 'zustand'
import type { User } from '../../interfaces/user.interface'
import { loginAction } from '../actions/login.action'
import { checkAuthAction } from '../actions/check-auth.action';

type AuthStatus = 'authenticated' | 'not-authenticated' | 'checking';

type AuthState = {
  //properties
  user: User | null,
  token: string | null,
  login: (email: string, password: string) => Promise<boolean>,
  authStatus: AuthStatus,

  //getters
  isAdmin: () => boolean,

  //functions
  logout: () => void,
  checkAuthStatus: () => Promise<boolean>
}

// ? Ese doble ()() es como para que el resultado del primer parentesis se envia como parametro del que sigue.
// ? Se hace una vez y no se vuelve a hacer, es algo situacional

export const useAuthStore = create<AuthState>()((set, get) => ({
  user: null,
  token: null,
  authStatus: 'checking',
  login: async (email: string, password: string) => {
    try {
      console.log(email, password);
      const data = await loginAction({ email, password })
      localStorage.setItem('token', data.token)
      set({user: data.user, token: data.token, authStatus: 'authenticated'})
      return true;
    } catch (error) {
      set({user: null, token: null})
      return false;
    }
  },
  logout: () => {
    localStorage.removeItem('token');
    set({user: null, token: null, authStatus: 'not-authenticated'})
  },
  checkAuthStatus: async() => {
    try {
      const { user, token } = await checkAuthAction();
      set({
        user,
        token,
        authStatus: 'authenticated'
      })
      return true;
    } catch (error) {
        console.log({error});
        set({
          user: undefined,
          token: undefined,
          authStatus: 'not-authenticated'
        })
        return false;
    }
  },
  isAdmin: () => {
    const roles = get().user?.roles ?? []
    return roles.includes('admin')
  },
}))
