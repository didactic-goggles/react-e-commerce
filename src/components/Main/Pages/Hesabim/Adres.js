import { useEffect, useState } from 'react';
import IlIlce from '../../../../data/il-ilce';
import { useAuthState, useAuthDispatch, updateUser } from '../../../../context';

const Adres = () => {
  const store = useAuthState();
  const dispatch = useAuthDispatch();
  const userData = store.user;
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [stateCollection, setStateCollection] = useState([]);
  const [addressData, setAddressData] = useState({
    address: userData.address || '',
    city: userData.city || '',
    province: userData.province || '',
    zip: userData.zip || '',
  });

  const handleFormChange = (key, value) => {
    const tempFormData = { ...addressData };
    tempFormData[key] = value;
    setAddressData(tempFormData);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      setFormSubmitting(true);
      await updateUser(dispatch, addressData);
    } catch (error) {
      console.log(error);
    }
    setFormSubmitting(false);
  };

  useEffect(() => {
    console.log(addressData.city);
    if (addressData.city)
      setStateCollection(IlIlce.find((i) => i.i === addressData.city)?.ic);
  }, [addressData.city]);

  return (
    <div>
      <form
        className="needs-validation"
        noValidate
        onSubmit={(e) => handleFormSubmit(e)}
      >
        <div className="row g-3">
          <div className="col-md-5">
            <label htmlFor="city" className="form-label">
              İl
            </label>
            <select
              className="form-select"
              id="city"
              required
              value={addressData.city}
              onChange={(e) => handleFormChange('city', e.target.value)}
            >
              <option value="">Seçin...</option>
              {IlIlce.map((il) => (
                <option value={il.i} key={il.i}>
                  {il.i}
                </option>
              ))}
            </select>
            <div className="invalid-feedback">Lütfen geçerli bir il seçin</div>
          </div>

          <div className="col-md-4">
            <label htmlFor="province" className="form-label">
              İlçe
            </label>
            <select
              className="form-select"
              id="province"
              required
              value={addressData.province}
              onChange={(e) => handleFormChange('province', e.target.value)}
            >
              <option value="">Seçin...</option>
              {stateCollection.sort().map((ilce) => (
                <option value={ilce} key={ilce}>
                  {ilce}
                </option>
              ))}
            </select>
            <div className="invalid-feedback">Lütfen geçerli bir il seçin</div>
          </div>

          <div className="col-md-3">
            <label htmlFor="zip" className="form-label">
              Posta Kodu
            </label>
            <input
              type="text"
              className="form-control"
              id="zip"
              placeholder=""
              value={addressData.zip}
              onInput={(e) => handleFormChange('zip', e.target.value)}
              required
            />
            <div className="invalid-feedback">
              Lütfen geçerli bir posta kodu girin
            </div>
          </div>

          <div className="col-12">
            <label htmlFor="address" className="form-label">
              Adres Bilgileri
            </label>
            <input
              type="text"
              className="form-control"
              id="address"
              placeholder="Açık adres"
              value={addressData.address}
              onInput={(e) => handleFormChange('address', e.target.value)}
              required
            />
            <div className="invalid-feedback">
              Lütfen geçerli bir adres girin
            </div>
          </div>
        </div>

        {/* <hr className="my-4" />
  
          <div className="form-check">
            <input type="checkbox" className="form-check-input" id="same-address" />
            <label className="form-check-label" htmlFor="same-address">
              Shipping address is the same as my billing address
            </label>
          </div>
  
          <div className="form-check">
            <input type="checkbox" className="form-check-input" id="save-info" />
            <label className="form-check-label" htmlFor="save-info">
              Save this information htmlFor next time
            </label>
          </div> */}

        <hr className="my-4" />

        <button
          className="w-100 btn btn-primary btn-lg"
          type="submit"
          disabled={formSubmitting}
        >
          Güncelle
        </button>
      </form>
    </div>
  );
};

export default Adres;
