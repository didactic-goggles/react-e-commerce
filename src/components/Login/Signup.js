import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';

const Signup = () => {
    let history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    // const dispatch = useAuthDispatch();
    // const { loading, errorMessage } = useAuthState();
  
    // const handleLogin = async (e) => {
    //   e.preventDefault();
  
    //   try {
    //     let response = await loginUser(dispatch, { email, password });
    //     if (!response.user) return;
    //     history.push('/');
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };

    const handleSignup = async (event) => {
        event.preventDefault();
    }
    return (
        <section className="form-signin">
      <form>
        <h1 className="h3 mb-3 fw-normal">Giriş Yapın</h1>

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
    )
}

export default Signup
