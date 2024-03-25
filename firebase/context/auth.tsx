import { createContext } from 'vm'

//create context
export const AuthContext = createContext({
	user: null,
	isLoading: false
})

//create provider
export const AuthProvider = ({}) => {
	return
}
