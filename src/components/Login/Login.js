import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
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
    <section className="container my-5">
      <div className="card rounded-3">
        <div className="row g-0">
          <div className="col-md-6">
            <div
              className="h-100 text-center text-white d-flex align-items-center justify-content-center"
              style={{
                backgroundImage:
                  'linear-gradient(to right bottom, #03a9f433, #0dcaf02e), url(https://comfortmedikal.com/img/pexels-pixabay-220201.jpg)',
                backgroundSize: 'cover',
              }}
            >
              <div className="py-4 py-md-0">
                <h3 className="display-5">Hoşgeldiniz</h3>
                <p>Sitede yeniyseniz lütfen</p>
                <Link to="/kayit" className="btn btn-outline-light">
                  kayıt olun
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card-body">
              <form
                className="form-signin py-5 px-2 px-md-5"
                onSubmit={handleLogin}
              >
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
                    required
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
                    required
                  />
                  <label htmlFor="floatingPassword">Şifre</label>
                </div>

                {/* <div className="checkbox mb-3">
                <label>
                  <input type="checkbox" value="remember-me" /> Beni Hatırla
                </label>
              </div> */}

                <button
                  className="w-100 btn btn-lg btn-primary"
                  type="submit"
                  disabled={loading}
                >
                  Giriş Yap
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
