import { Checkbox, Col, Image, Modal, Row } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import BackHeader from '../gbc-container/back-header/backHeader';
import GBCQuestions from '../gbc-container/slider-component/gbc-questions';
import HighChartComponent from '../gbc-container/highchart-component/highChart';
import useMediaQueryCustom from './useMediaQueryCustome';
import MobilePieChart from '../gbc-container/highchart-component/subcomponents/mobilePieChart';
import GBCcontext from './GBCcontext';
import MobileUserJourney from '../gbc-container/highchart-component/subcomponents/mobileUserJourney';
import { getModelForAUser } from './service';
import { error } from 'highcharts';
import UserJourney from '../gbc-container/highchart-component/subcomponents/userJourney';
import { defaultAnswerObj } from '../gbc-container/slider-component/utils';
import { CloseOutlined } from '@ant-design/icons';
import mobileImageGBC from '../images/gbc-banner-mobile-img.png';
import videoBtnImage from '../images/videoBtnImg.svg';

const Layout = ({ userDetailsData, isPortal = false, isRmLevel = false, baseUrl, upgradeAccreditedRequestHandlerForGBC, sendByOkReq, analytics, zendeskHandler }) => {
  const { isMobile, isTablet } = useMediaQueryCustom();
  const [checkStateCount, setCheckStateCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [videoStart, setVideoStart] = useState(false);
  const {
    viewMoreDeatils,
    setCalculateReturns,
    setAnswersObj,
    setUserDetails,
    setPlateform,
    setRmEditable,
    rmLevel,
    setRmLevel,
    platform,
    userDetails,
    apiBaseUrl,
    setApiBaseUrl,
    showPopup,
    setShowPopup,
    setMinimumReturnPercentage,
    setMaximumReturnPercentage,
    plateform,
    setBlurLeftSection,
    landingTime,
    setLandingTime,
  } = useContext(GBCcontext);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const agreementCheckboxHandler = (e) => {
    setCheckStateCount(e.target.checked);
  };

  useEffect(() => {
    const root = document.documentElement;
    root?.style.setProperty('--kristal-blue-80', !isPortal ? '#0070ff' : '#3761c8');
  }, [isPortal]);

  useEffect(() => {
    setLandingTime(new Date());
    analytics('GTC_PAGE_LANDED');
  }, []);

  useEffect(() => {
    if (userDetailsData && !isRmLevel) {
      getModelForAUser(userDetailsData, baseUrl, plateform)
        ?.then((data) => {
          if (data) {
            setCalculateReturns(data?.data);
            setShowPopup(data?.data?.showPopup);
            setMinimumReturnPercentage(data?.data?.modelPortfolio?.minimumReturnPercentage);
            setMaximumReturnPercentage(data?.data?.modelPortfolio?.maximumReturnPercentage);
            const { gtcFilterRequest, rateOfReturn } = data?.data || {};

            if (gtcFilterRequest) {
              const { child1Age, child2Age, child3Age } = gtcFilterRequest || {};
              if (child3Age > 0) {
                gtcFilterRequest['numberOfChildren'] = 3;
              } else if (child2Age > 0) {
                gtcFilterRequest['numberOfChildren'] = 2;
              } else if (child1Age > 0) {
                gtcFilterRequest['numberOfChildren'] = 1;
              } else {
                gtcFilterRequest['numberOfChildren'] = 0;
              }
            } else {
              if (rateOfReturn) {
                setBlurLeftSection(true);
              }
            }
            if (rateOfReturn) {
              if (data?.data?.gtcFilterRequest?.currentAge) {
                setAnswersObj(data?.data?.gtcFilterRequest);
              }
            } else {
              setAnswersObj(defaultAnswerObj);
            }
          }
        })
        ?.catch((error) => console.log('getModalForAUserError', error));
    }
    sessionStorage?.removeItem('gbcflow');
  }, []);

  useEffect(() => {
    setApiBaseUrl(baseUrl);
  }, [baseUrl]);

  useEffect(() => {
    if (isRmLevel) {
      setRmLevel(isRmLevel);
    }
  }, [isRmLevel]);

  useEffect(() => {
    if (isModalOpen == false) {
      setVideoStart(false);
    }
  }, [isModalOpen]);

  useEffect(() => {
    setPlateform(isPortal);
    setUserDetails(userDetailsData ? userDetailsData : {});
    if (isPortal) {
      setRmEditable(true);
    } else {
      if (rmLevel) {
        setRmEditable(true);
      } else {
        setRmEditable(false);
      }
    }
  }, [isPortal, userDetailsData, rmLevel]);

  return (
    <>
      <Row className={isMobile || isTablet ? (plateform && userDetailsData && Object.keys(userDetailsData)?.length > 0 ? 'fixed-the-width-mobile' : '') : 'fixed-the-width'}>
        {!isMobile && !isTablet && userDetailsData && Object.keys(userDetailsData)?.length > 0 && (
          <Col span={24} className="margin-top-28">
            <BackHeader analytics={analytics} upgradeAccreditedRequestHandlerForGBC={upgradeAccreditedRequestHandlerForGBC} />
          </Col>
        )}
        <Col span={24} className={!isMobile && !isTablet && 'margin-top-28'}>
          <Row gutter={[12]}>
            {!viewMoreDeatils && (
              <Col lg={{ span: 10, order: 1 }} md={{ span: 24, order: 2 }} sm={{ span: 24, order: 2 }} xs={{ span: 24, order: 2 }} className={(isMobile || isTablet) && 'margin-top-16'}>
                <GBCQuestions upgradeAccreditedRequestHandlerForGBC={upgradeAccreditedRequestHandlerForGBC} sendByOkReq={sendByOkReq} analytics={analytics} baseUrl={baseUrl} />
              </Col>
            )}
            <Col lg={{ span: 14, order: 2 }} md={{ span: 24, order: 1 }} sm={{ span: 24, order: 1 }} xs={{ span: 24, order: 1 }}>
              {(isMobile || isTablet) && !viewMoreDeatils ? (
                <MobilePieChart analytics={analytics} upgradeAccreditedRequestHandlerForGBC={upgradeAccreditedRequestHandlerForGBC} setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} />
              ) : (isMobile || isTablet) && viewMoreDeatils ? (
                <HighChartComponent upgradeAccreditedRequestHandlerForGBC={upgradeAccreditedRequestHandlerForGBC} sendByOkReq={sendByOkReq} zendeskHandler={zendeskHandler} analytics={analytics} setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} />
              ) : (
                <>
                  <HighChartComponent upgradeAccreditedRequestHandlerForGBC={upgradeAccreditedRequestHandlerForGBC} sendByOkReq={sendByOkReq} zendeskHandler={zendeskHandler} analytics={analytics} setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} />
                  {!plateform && !rmLevel && (
                    <>
                      <div className="rm-client-note space-top">
                        <span>
                          <b> Note: </b> Please view the corresponding customised portfolio on the user explore page
                        </span>
                      </div>
                    </>
                  )}
                </>
              )}
            </Col>
          </Row>
          {(isMobile || isTablet) && !rmLevel && (
            <Row>
              <MobileUserJourney upgradeAccreditedRequestHandlerForGBC={upgradeAccreditedRequestHandlerForGBC} sendByOkReq={sendByOkReq} zendeskHandler={zendeskHandler} analytics={analytics} />
            </Row>
          )}
        </Col>
      </Row>
      {isModalOpen && (
        <Modal className={`video-modal ${isRmLevel && 'video-modal-rm'}`} visible={true} onOk={handleOk} onCancel={handleCancel} footer={false} width={611} closable={false}>
          <div className="flex space-between">
            <div className="bold font-size-24 line-height-28">Goal-based Target-Return Calculator</div>
            <div onClick={handleCancel} className="pointer">
              <CloseOutlined style={{ fontSize: '25px', color: '#777777' }} />
            </div>
          </div>
          <div className="margin-top-8 text-999 font-size-14 line-height-20" style={{ maxWidth: isMobile ? '100%' : '414px' }}>
            Discover the significance of the Goal-based Target-return Calculator, a pivotal tool in your investment journey.
          </div>
          {!videoStart ? (
            <div className="video-container">
              <div style={{ maxWidth: isMobile ? '100%' : '291px' }}>
                <div className="bold font-size-18 line-height-24 text-fff">
                  Goal-based
                  <br />
                  Target-Returns Calculator
                </div>
                <div className="margin-top-4 text-777 font-size12 line-height-18">
                  Wondering what would be the ideal return for portfolio?Maximise your returns with a personalised investment plan and achieve ideal allocation. Use our Goal-Based Target Return Tool to calculate ideal returns for your portfolio.
                </div>
                <div className="margin-top-24 video-btn" onClick={() => setVideoStart(true)}>
                  <img src={typeof videoBtnImage === 'object' ? videoBtnImage.src : videoBtnImage} />
                </div>
              </div>
              <div style={{ position: 'absolute', bottom: 0, right: 0 }}>
                <img src={typeof mobileImageGBC === 'object' ? mobileImageGBC.src : mobileImageGBC} height={235} />
              </div>
            </div>
          ) : (
            <div className="video-container">
              <iframe width="100%" height="286px" src="https://www.youtube.com/embed/VX6grAMbZmQ?autoplay=1" frameborder="0" allowfullscreen allow="autoplay"></iframe>
            </div>
          )}
          <div className="margin-top-22 flex space-between column-center">
            <div>
              {' '}
              {/* <Checkbox className="bold font-size-14 line-height-20 text-777" onChange={agreementCheckboxHandler}>
                Skip for future reference
              </Checkbox> */}
            </div>
            <div>
              <button className="video-btn-footer pointer" onClick={handleCancel}>
                Proceed to skip
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default Layout;
