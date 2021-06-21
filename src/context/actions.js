// const ROOT_URL = 'https://secret-hamlet-03431.herokuapp.com';
import API from '../api';

export async function loginUser(dispatch, loginPayload) {
	// const requestOptions = {
	// 	method: 'POST',
	// 	headers: { 'Content-Type': 'application/json' },
	// 	body: JSON.stringify(loginPayload),
	// };

	try {
		dispatch({ type: 'REQUEST_LOGIN' });
        const loginFormData = new FormData();
        Object.keys(loginPayload).forEach(key => loginFormData.append(key, loginPayload[key]));
		const response = await API.post('/login.php', loginFormData);
        console.log(response);
        if(!response) {
            dispatch({ type: 'LOGIN_ERROR', error: 'Giriş Başarısız' });
            console.log(response);
            return;
            // throw 'Giriş Başarısız';
        }
		// let data = await response.json();

		// if (data.user) {
		// 	dispatch({ type: 'LOGIN_SUCCESS', payload: data });
		// 	localStorage.setItem('currentUser', JSON.stringify(data));
		// 	return data;
		// }
        dispatch({ type: 'LOGIN_SUCCESS', payload: response });
		localStorage.setItem('currentUser', JSON.stringify(response.user));
		localStorage.setItem('currentUserWishList', JSON.stringify(response.wishList || []));
		localStorage.setItem('currentUserToken', response.token);
        return response; 

	} catch (error) {
		dispatch({ type: 'LOGIN_ERROR', error: 'Giriş Başarısız' });
	}
}

export async function signupUser(dispatch, signupPayload) {
	// const requestOptions = {
	// 	method: 'POST',
	// 	headers: { 'Content-Type': 'application/json' },
	// 	body: JSON.stringify(loginPayload),
	// };

	try {
		dispatch({ type: 'REQUEST_SIGNUP' });
        const signupFormData = new FormData();
        Object.keys(signupPayload).forEach(key => signupFormData.append(key, signupPayload[key]));
		const response = await API.post('/signup.php', signupFormData);
        console.log(response);
        if(!response) {
            dispatch({ type: 'SIGNUP_ERROR', error: 'Kayıt Başarısız' });
            console.log(response);
            return;
            // throw 'Giriş Başarısız';
        }
		// let data = await response.json();

		// if (data.user) {
		// 	dispatch({ type: 'LOGIN_SUCCESS', payload: data });
		// 	localStorage.setItem('currentUser', JSON.stringify(data));
		// 	return data;
		// }
        dispatch({ type: 'SIGNUP_SUCCESS', payload: response });
		localStorage.setItem('currentUser', JSON.stringify(response.user));
		localStorage.setItem('currentUserWishList', JSON.stringify(response.wishList || []));
		localStorage.setItem('currentUserToken', response.token);
        return response; 

	} catch (error) {
		dispatch({ type: 'SIGNUP_ERROR', error: 'Kayıt Başarısız' });
	}
}

export function showErrorMessage(dispatch, payload) {
	dispatch({
		type: 'ERROR', message: payload
	})
}

export async function logout(dispatch) {
	dispatch({ type: 'LOGOUT' });
	localStorage.removeItem('currentUser');
	localStorage.removeItem('currentUserWishList');
	localStorage.removeItem('currentUserToken');
}

export async function getWishList(dispatch, userId) {
	const formData = new FormData();
	formData.append('user_id', userId);
    const getWishListResponse = await API.post('/wishList.php', formData);
	if( getWishListResponse ) {
		dispatch({ type: 'SET_WISHLIST', payload: getWishListResponse });
		localStorage.setItem('currentUserWishList', JSON.stringify(getWishListResponse.wishList || []));
		return getWishListResponse;
	} return { wishList: [] };
}

export async function getAllCategories(dispatch) {
    const getAllCategoriesResponse = await API.get('/categories.php');
	if( getAllCategoriesResponse ) {
		dispatch({ type: 'SET_ALL_CATEGORIES', payload: getAllCategoriesResponse });
		return getAllCategoriesResponse;
	} return { categories: [] };
}

export async function getAllBrands(dispatch) {
    const getAllBrandsResponse = await API.get('/brands.php');
	if( getAllBrandsResponse ) {
		dispatch({ type: 'SET_ALL_BRANDS', payload: getAllBrandsResponse });
		return getAllBrandsResponse;
	} return { brand: [] };
}

export async function getAllProducts(dispatch) {
    const getAllProductsResponse = await API.get('/products.php');
	if(getAllProductsResponse) {
		dispatch({ type: 'SET_ALL_PRODUCTS', payload: getAllProductsResponse });
		return getAllProductsResponse;
	} return { products: [] };
}