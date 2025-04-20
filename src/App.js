import Layout from './components/GBC/layout';
import './styles/common.scss';
import './styles/components/highcharts.scss';
import './styles/components/asset-collection.scss';
import './styles/components/user-journey.scss';
import './styles/components/questions.scss';
import './styles/components/modal-collection.scss';
import './styles/components/mobile-highcharts.scss';
import './styles/imports.scss';
import GBCProvider from './components/GBC/GBCProvider';
import { BrowserRouter } from 'react-router-dom';

function App({
  userDetailsData,
  isPortal = true,
  isRmLevel = false,
  baseUrl,
  upgradeAccreditedRequestHandlerForGBC = () => {},
  sendByOkReq = () => {},
  analytics = () => {},
  zendeskHandler = () => {},
}) {
  if (typeof window == 'undefined') {
    return null;
  }

  return (
    <GBCProvider>
      <BrowserRouter>
        <div className="App">
          <Layout
            userDetailsData={userDetailsData}
            isPortal={isPortal}
            isRmLevel={isRmLevel}
            baseUrl={baseUrl}
            upgradeAccreditedRequestHandlerForGBC={
              upgradeAccreditedRequestHandlerForGBC
            }
            sendByOkReq={sendByOkReq}
            analytics={analytics}
            zendeskHandler={zendeskHandler}
          />
        </div>
      </BrowserRouter>
    </GBCProvider>
  );
}

export default App;
