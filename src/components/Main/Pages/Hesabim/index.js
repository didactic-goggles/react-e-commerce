import { useState } from 'react';
import Hesap from './Hesap';
import Adres from './Adres';
const Index = () => {
    const [activeTab, setActiveTab] = useState('hesap');
    const handleTabChange = (tab) => {
        setActiveTab(tab);
    }
  return (
    <div className="container py-4">
      <div className="row">
        <div className="col-md-3">
          <div className="d-flex align-items-start">
            <div
              className="nav flex-column nav-pills me-3"
              id="v-pills-tab"
              role="tablist"
              aria-orientation="vertical"
            >
              <button
                className="nav-link active"
                id="v-pills-home-tab"
                data-bs-toggle="pill"
                data-bs-target="#v-pills-home"
                type="button"
                role="tab"
                aria-controls="v-pills-home"
                aria-selected="true"
                onClick={() => handleTabChange('hesap')}
              >
                Hesap
              </button>
              <button
                className="nav-link"
                id="v-pills-profile-tab"
                data-bs-toggle="pill"
                data-bs-target="#v-pills-profile"
                type="button"
                role="tab"
                aria-controls="v-pills-profile"
                aria-selected="false"
                onClick={() => handleTabChange('adres')}
              >
                Adres
              </button>
              <button
                className="nav-link"
                id="v-pills-messages-tab"
                data-bs-toggle="pill"
                data-bs-target="#v-pills-messages"
                type="button"
                role="tab"
                aria-controls="v-pills-messages"
                aria-selected="false"
                onClick={() => handleTabChange('sipariş')}
              >
                Sipariş Geçmişi
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-9">
          <div className="tab-content" id="v-pills-tabContent">
            <div
              className="tab-pane fade show active"
              id="v-pills-home"
              role="tabpanel"
              aria-labelledby="v-pills-home-tab"
            >
              {activeTab === 'hesap' && <Hesap /> }
            </div>
            <div
              className="tab-pane fade"
              id="v-pills-profile"
              role="tabpanel"
              aria-labelledby="v-pills-profile-tab"
            >
              {activeTab === 'adres' && <Adres /> }
            </div>
            <div
              className="tab-pane fade"
              id="v-pills-messages"
              role="tabpanel"
              aria-labelledby="v-pills-messages-tab"
            >
              ...
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
