import React, {useState} from 'react'

const Sonuc = (props) => {
    console.log('Rendering => Sonuç');
    const {filters} = props;
    return (
        <div>
            {filters.ratings.length}
        </div>
    )
}

export default Sonuc
