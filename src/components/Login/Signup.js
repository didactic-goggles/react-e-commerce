import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { signupUser, useAuthState, useAuthDispatch } from '../../context';

const Signup = () => {
  console.log('Rendering => Signup');
  let history = useHistory();
  const [username, setUsername] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [userType, setUserType] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const dispatch = useAuthDispatch();
  const { loading, errorMessage } = useAuthState();
  console.log(errorMessage);
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      let response = await signupUser(dispatch, {
        username,
        firstname,
        lastname,
        userType,
        email,
        password,
        passwordConfirm,
      });
      console.log(response);
      if (!response.user) return;
      history.push('/');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className="form-signup my-5">
      <form>
        <h1 className="h3 mb-3 fw-normal">Kayıt Olun</h1>

        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="floatingUsername"
            placeholder="kullanıcı adı"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={loading}
          />
          <label htmlFor="floatingUsername">Kullanıcı Adı</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="floatingFirstname"
            placeholder="ad"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            disabled={loading}
          />
          <label htmlFor="floatingFirstname">Ad</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="floatingLastname"
            placeholder="soyad"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            disabled={loading}
          />
          <label htmlFor="floatingLastname">Soyad</label>
        </div>

        <div className="form-floating mb-3">
          <select
            value={userType}
            id="floatingUserType"
            className="form-control"
            onChange={(e) => setUserType(e.target.value)}
            disabled={loading}
          >
            <option value="patient">Hasta</option>
            <option value="relative">Hasta Yakını</option>
            <option value="other">Diğer</option>
          </select>
          {/* <input
            type="text"
            className="form-control"
            id="floatingName"
            placeholder="ad soyad"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading}
          /> */}
          <label htmlFor="floatingUserType">Üye Tipi</label>
        </div>

        <div className="form-floating mb-3">
          <input
            type="email"
            className="form-control"
            id="floatingInput"
            placeholder="isim@mail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
          <label htmlFor="floatingInput">E-posta adresi</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="şifre"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />
          <label htmlFor="floatingPassword">Şifre</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="password"
            className="form-control"
            id="floatingPasswordConfirm"
            placeholder="şifre"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            disabled={loading}
          />
          <label htmlFor="floatingPasswordConfirm">Şifre Tekrarı</label>
        </div>

        {/* <div className="checkbox mb-3">
          <label>
            <input type="checkbox" value="remember-me" /> Beni Hatırla
          </label>
        </div> */}
        <button
          className="w-100 btn btn-lg btn-primary"
          type="button"
          onClick={handleLogin}
          disabled={loading}
        >
          Kayıt Ol
        </button>
      </form>
    </section>
  );
};

export default Signup;
