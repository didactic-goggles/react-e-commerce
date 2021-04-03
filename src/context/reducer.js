let user = localStorage.getItem('currentUser')
	? JSON.parse(localStorage.getItem('currentUser')).user
	: '';
let token = localStorage.getItem('currentUser')
	? JSON.parse(localStorage.getItem('currentUser')).auth_token
	: '';

export const initialState = {
	user: null || user,
	token: '' || token,
	loading: false,
	errorMessage: null,
    categories: null,
	brands: null,
	products: []
};

export const AuthReducer = (initialState, action) => {
	switch (action.type) {
		case 'REQUEST_LOGIN':
			return {
				...initialState,
				loading: true,
			};
		case 'LOGIN_SUCCESS':
			return {
				...initialState,
				user: action.payload.user,
				token: action.payload.auth_token,
				loading: false,
			};
		case 'LOGOUT':
			return {
				...initialState,
				user: '',
				token: '',
			};

		case 'LOGIN_ERROR':
			return {
				...initialState,
				loading: false,
				errorMessage: action.error,
			};
        case 'SET_ALL_CATEGORIES':
            return {
                ...initialState,
                categories: action.payload.categories
            }
		case 'SET_ALL_BRANDS':
			return {
				...initialState,
				brands: action.payload.brands
			}
		case 'SET_ALL_PRODUCTS':
			return {
				...initialState,
				products: action.payload.products
			}
		default:
			throw new Error(`Unhandled action type: ${action.type}`);
	}
};