import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Anasayfa from './Pages/Anasayfa/Anasayfa';
import Kurumsal from './Pages/Kurumsal/Kurumsal';
import Diger from './Pages/Diger/Diger';
import Iletisim from './Pages/Iletisim/Iletisim';
import Urun from './Pages/Urun/Urun';
import Login from '../Login/Login';
import Urunler from './Pages/Urunler/Urunler';
import Signup from '../Login/Signup';

const Main = () => {
  return (
    <main>
      <Switch>
        <Route path="/kurumsal">
          <Kurumsal />
        </Route>
        <Route path="/diger">
          <Diger />
        </Route>
        <Route path="/iletisim">
          <Iletisim />
        </Route>
        <Route path="/urunler">
          <Urunler />
        </Route>
        <Route path="/urun/:productId">
          <Urun />
        </Route>
        <Route path="/giris">
          <Login />
        </Route>
        <Route path="/kayit">
          <Signup />
        </Route>
        <Route path="/">
          <Anasayfa />
        </Route>
        {/* <AppRoute
							key={route.path}
							path={route.path}
							component={route.component}
							isPrivate={route.isPrivate}
						/> */}
      </Switch>
    </main>
  );
};

export default Main;
