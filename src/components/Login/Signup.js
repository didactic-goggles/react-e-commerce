import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { signupUser, useAuthState, useAuthDispatch } from '../../context';

const Signup = () => {
  console.log('Rendering => Signup');
  let history = useHistory();
  const [username, setUsername] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  // const [userType, setUserType] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const dispatch = useAuthDispatch();
  const { loading, errorMessage } = useAuthState();
  console.log(errorMessage);
  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      let response = await signupUser(dispatch, {
        username,
        firstname,
        lastname,
        // userType,
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
                <p>Hesabınız var ise</p>
                <Link to="/giris" className="btn btn-outline-light">
                  giriş yapın
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card-body">
              <form
                className="form-signup py-5 px-2 px-md-5"
                onSubmit={handleSignup}
              >
                <h1 className="h3 mb-3 fw-normal">Kayıt Olun</h1>
                {errorMessage ? (
                  <div className="alert alert-danger fade show" role="alert">
                    <strong>{errorMessage}</strong>
                  </div>
                ) : (
                  ''
                )}

                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingUsername"
                    placeholder="kullanıcı adı"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    disabled={loading}
                    required
                  />
                  <label htmlFor="floatingUsername">Kullanıcı Adı</label>
                </div>
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingFirstname"
                    placeholder="ad"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                    disabled={loading}
                    required
                  />
                  <label htmlFor="floatingFirstname">Ad</label>
                </div>
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingLastname"
                    placeholder="soyad"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                    disabled={loading}
                    required
                  />
                  <label htmlFor="floatingLastname">Soyad</label>
                </div>
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
                <div className="form-floating mb-3">
                  <input
                    type="password"
                    className="form-control"
                    id="floatingPasswordConfirm"
                    placeholder="şifre"
                    value={passwordConfirm}
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                    disabled={loading}
                    required
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
                  type="submit"
                  disabled={loading}
                >
                  Kayıt Ol
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
