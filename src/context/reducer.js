let user = localStorage.getItem('currentUser')
	? JSON.parse(localStorage.getItem('currentUser'))
	: '';
let token = localStorage.getItem('currentUserToken');

export const initialState = {
	user: null || user,
	token: '' || token,
	loading: false,
	errorMessage: null,
    categories: null,
	brands: null,
	products: [],
	wishList: []
};

export const AuthReducer = (initialState, action) => {
	switch (action.type) {
		case 'REQUEST_SIGNUP':
			return {
				...initialState,
				loading: true,
			};
		case 'SIGNUP_SUCCESS':
			return {
				...initialState,
				user: action.payload.user,
				token: action.payload.auth_token,
				errorMessage: null,
				loading: false,
			};
		case 'SIGNUP_ERROR':
			return {
				...initialState,
				loading: false,
				errorMessage: action.error,
			};
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
				wishList: action.payload.wishList,
				errorMessage: null,
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