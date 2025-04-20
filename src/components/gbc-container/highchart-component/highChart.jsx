import React, { useContext } from 'react';
import { Col, Row } from 'antd';
import PieChart from './subcomponents/pieChart';
import AssetsCollection from './subcomponents/assetsCollection';
import UserJourney from './subcomponents/userJourney';
import useMediaQueryCustom from '../../GBC/useMediaQueryCustome';
import GbcCurrencyChange from './subcomponents/gbcCurrencyChange';
import GBCcontext from '../../GBC/GBCcontext';
import videoBtnImage from '../../images/videoBtnImg.svg';

function HighChartComponent({
  upgradeAccreditedRequestHandlerForGBC,
  sendByOkReq,
  zendeskHandler,
  analytics,
  setIsModalOpen,
  isModalOpen,
}) {
  // const [btnActionName, setBtnActionName] = useState("");
  const { isMobile, isTablet } = useMediaQueryCustom();
  const { viewMoreDeatils, setViewMoreDetails, userDetails, plateform } =
    useContext(GBCcontext);

  return (
    <Row
      className={`high-chart-section flex ${
        !isMobile && !isTablet && 'column-center '
      } ${(isMobile || isTablet) && 'high-chart-section-mobile'}`}
    >
      {(isMobile || isTablet) && viewMoreDeatils && (
        <Col span={24}>
          <GbcCurrencyChange
            viewMoreDeatils={viewMoreDeatils}
            setViewMoreDetails={setViewMoreDetails}
            analytics={analytics}
          />
        </Col>
      )}
      <Col xl={12} lg={24} md={24} sm={24} xs={24}>
        <PieChart analytics={analytics} />
      </Col>
      <Col xl={12} lg={24} md={24} sm={24} xs={24} className="flex row-center">
        <AssetsCollection />
      </Col>
      {!isMobile && !isTablet && plateform && (
        <Col span={24} className="margin-top-30">
          <UserJourney
            upgradeAccreditedRequestHandlerForGBC={
              upgradeAccreditedRequestHandlerForGBC
            }
            sendByOkReq={sendByOkReq}
            zendeskHandler={zendeskHandler}
            analytics={analytics}
          />
        </Col>
      )}
      {!isMobile &&
        !isTablet &&
        userDetails &&
        userDetails.kycStatus !== 'APPROVED' && (
          <Col
            span={24}
            className="margin-top-30 font-size-16 line-height-22 text-F0EDE4 flex row-center"
          >
            <span className="bold margin-right-5">Note:</span> Some of the asset
            classes are accessible to Private Wealth customers only
          </Col>
        )}
      {/* {!isMobile && !isTablet && <CommonModal analytics={analytics} upgradeAccreditedRequestHandlerForGBC={upgradeAccreditedRequestHandlerForGBC} />} */}
      <Col span={24} className="margin-top-24">
        <div className="vedio-tutorial-section">
          <div className="flex space-between column-center width-100">
            <div className="vedio-text">View Tutorial</div>
            <div
              className="video-btn-view"
              onClick={() => setIsModalOpen(true)}
            >
              <img
                alt=""
                src={
                  typeof videoBtnImage === 'object'
                    ? videoBtnImage.src
                    : videoBtnImage
                }
                height={20}
              />
            </div>
          </div>
        </div>
      </Col>
    </Row>
  );
}

export default HighChartComponent;
