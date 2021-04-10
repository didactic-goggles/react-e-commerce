import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { loginUser, useAuthState, useAuthDispatch } from '../../context';
const Login = (props) => {
  console.log('Rendering => Login');
  let history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useAuthDispatch();
  const { loading, errorMessage } = useAuthState();
  console.log(errorMessage);
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      let response = await loginUser(dispatch, { email, password });
      console.log(response);
      if (!response.user) return;
      history.push('/');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className="form-signin my-5">
      <form>
        <h1 className="h3 mb-3 fw-normal">Giriş Yapın</h1>
        {errorMessage ? (
          <div className="alert alert-danger fade show" role="alert">
            <strong>{errorMessage}</strong>
          </div>
        ) : (
          ''
        )}

        <div className="form-floating">
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
        <div className="form-floating">
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

        {/* <div className="checkbox mb-3">
          <label>
            <input type="checkbox" value="remember-me" /> Beni Hatırla
          </label>
        </div> */}
        <h5 className="text-center my-3">
          Hesabınız yok mu? <NavLink to="/kayit">Kayıt olun</NavLink>
        </h5>

        <button
          className="w-100 btn btn-lg btn-primary"
          type="button"
          onClick={handleLogin}
          disabled={loading}
        >
          Giriş Yap
        </button>
      </form>
    </section>
  );
};

export default Login;
