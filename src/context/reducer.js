let user = localStorage.getItem('currentUser')
	? JSON.parse(localStorage.getItem('currentUser'))
	: '';
let wishList = user && localStorage.getItem('currentUserWishList')
	? JSON.parse(localStorage.getItem('currentUserWishList'))
	: [];
let cart = user && localStorage.getItem('cart')
	? JSON.parse(localStorage.getItem('cart'))
	: [];
let token = localStorage.getItem('currentUserToken');

export const initialState = {
	user: null || user,
	token: '' || token,
	loading: false,
	errorMessage: null,
	error: null,
    categories: null,
	brands: null,
	products: [],
	wishList,
	cart
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
				wishList: [],
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
				token: action.payload.token,
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
		case 'ERROR':
			return {
				...initialState,
				error: action.message,
			};
		case 'SET_WISHLIST':
			return {
				...initialState,
				wishList: action.payload.wishList
			}
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
		case 'ADD_TO_CART':
			const stateObj = {
				...initialState,
				cart: [...initialState.cart.filter(p => p.id !== action.payload.id), action.payload]
			}
			localStorage.setItem('cart', JSON.stringify(stateObj.cart));
			return stateObj
		case 'DELETE_FROM_CART':
			const stateObj1 = {
				...initialState,
				cart: initialState.cart.filter(p => p.id !== action.payload)
			}
			localStorage.setItem('cart', JSON.stringify(stateObj1.cart));
			return stateObj1
		default:
			throw new Error(`Unhandled action type: ${action.type}`);
	}
};