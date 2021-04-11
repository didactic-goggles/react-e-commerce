import React from 'react';
import { Link } from 'react-router-dom';
import {useAuthState } from '../../context';

const WishList = () => {
    const userDetails = useAuthState();
    
    if(!userDetails.user) {
        return <h5>Beğendiğiniz ürünleri görmek için lütfen <Link to="/giris">giriş yapın</Link></h5>
    }
    if(userDetails.wishList.length === 0) {
        return <h5>Listeniz şu an boş.</h5>
    }
    return (
        <div>
            WishList
        </div>
    )
}

export default WishList
