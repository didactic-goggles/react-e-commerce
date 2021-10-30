import { useState } from 'react';
import { useAuthState, useAuthDispatch, updateUser } from '../../../../context';

const Hesap = () => {
  const store = useAuthState();
  const dispatch = useAuthDispatch();
  const userData = store.user;
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [userFormData, setUserFormData] = useState({
    firstname: userData.firstname || '',
    lastname: userData.lastname || '',
    phone: userData.phone || '',
    email: userData.email || '',
  });

  const handleFormChange = (key, value) => {
    const tempFormData = { ...userFormData };
    tempFormData[key] = value;
    setUserFormData(tempFormData);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      setFormSubmitting(true);
      await updateUser(dispatch, userFormData);
    } catch (error) {
      console.log(error);
    }
    setFormSubmitting(false);
  };
  return (
    <div>
      <form
        className="needs-validation"
        noValidate
        onSubmit={(e) => handleFormSubmit(e)}
      >
        <div className="row g-3">
          <div className="col-sm-6">
            <label htmlFor="firstName" className="form-label">
              İsim
            </label>
            <input
              type="text"
              className="form-control"
              id="firstName"
              placeholder=""
              value={userFormData.firstname}
              onInput={(e) => handleFormChange('firstname', e.target.value)}
              required
            />
            <div className="invalid-feedback">
              Lütfen geçerli bir isim girin
            </div>
          </div>

          <div className="col-sm-6">
            <label htmlFor="lastName" className="form-label">
              Soyisim
            </label>
            <input
              type="text"
              className="form-control"
              id="lastName"
              placeholder=""
              value={userFormData.lastname}
              onInput={(e) => handleFormChange('lastname', e.target.value)}
              required
            />
            <div className="invalid-feedback">
              Lütfen geçerli bir soyisim girin
            </div>
          </div>

          <div className="col-sm-6">
            <label htmlFor="phone" className="form-label">
              Telefon
            </label>
            <input
              type="tel"
              className="form-control"
              id="phone"
              placeholder="0555 444 3322"
              value={userFormData.phone}
              onInput={(e) => handleFormChange('phone', e.target.value)}
              required
            />
            <div className="invalid-feedback">
              Lütfen geçerli bir telefon girin
            </div>
          </div>

          <div className="col-sm-6">
            <label htmlFor="email" className="form-label">
              E-posta
              {/* <span className="text-muted">(Optional)</span> */}
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="isim@posta.com"
              value={userFormData.email}
              onInput={(e) => handleFormChange('email', e.target.value)}
              required
            />
            <div className="invalid-feedback">
              Lütfen geçerli bir e-posta girin.
            </div>
          </div>
        </div>
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

export default Hesap;
