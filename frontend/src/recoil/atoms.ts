import { atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'
import SecureLS from 'secure-ls'

const { persistAtom } = recoilPersist({
  key: 'recoil-persist', // this key is using to store data in local storage
  storage: localStorage, // configurate which stroage will be used to store the data
})

const ls = new SecureLS({
  encodingType: 'aes',
  encryptionSecret: process.env.REACT_APP_SECURE_LS_KEY || 'my-secret-key-1',
})

const { persistAtom: encryptPersistAtom } = recoilPersist({
  key: 'recoil-persist-encrypt', // this key is using to store data in local storage
  storage: {
    getItem: (key: string) => ls.get(key),
    setItem: (key: string, value: string) => ls.set(key, value),
  },
})

const themeState = atom<'light' | 'dark'>({
  key: 'Theme',
  default: 'light',
  effects_UNSTABLE: [persistAtom],
})

const accessTokenState = atom<string>({
  key: 'AccessToken',
  default: '',
  effects_UNSTABLE: [encryptPersistAtom],
})

const refreshTokenState = atom<string>({
  key: 'RefreshToken',
  default: '',
  effects_UNSTABLE: [encryptPersistAtom],
})

export { themeState, accessTokenState, refreshTokenState }
