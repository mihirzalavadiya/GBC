import { Button, Col, Row } from 'antd';
import React, { useContext } from 'react';
import {
  calculateTimeDifference,
  errorMessageData,
  userJourneyData,
} from '../utils';
import GBCcontext from '../../../GBC/GBCcontext';

const MobileUserJourney = ({
  upgradeAccreditedRequestHandlerForGBC,
  sendByOkReq,
  zendeskHandler,
  analytics,
}) => {
  const {
    userDetails,
    setUserJourneyBtnActionName,
    answersObj,
    calculateReturns,
    plateform,
    rmLevel,
    rmEditable,
    setRmEditable,
    minimumReturnPercentage,
    maximumReturnPercentage,
    rmlevel,
    apiBaseUrl,
    landingTime,
  } = useContext(GBCcontext);
  const { modelPortfolio, rateOfReturn } = calculateReturns || {};
  const { modelPortfolioId } = modelPortfolio || {};
  const { btn1, btn2 } = userJourneyData(userDetails) || {};

  const { errorTitle, errorSubTitle } =
    errorMessageData(
      rateOfReturn,
      minimumReturnPercentage,
      maximumReturnPercentage
    ) || {};

  const btn1Handler = async (btn1) => {
    if (btn1 === 'Talk to Advisor') {
      if (Object.keys(userDetails).length > 0) {
        const time = calculateTimeDifference(landingTime);
        analytics('GTC_USAGE_TIME', { time_spent: time });
        analytics('GTC_CTA_CLICKED', { time_spent: time, CTA: btn1 });
        await sendByOkReq().then(() => {
          setUserJourneyBtnActionName(btn1);
        });
      } else {
        if (typeof window != 'undefined' && window.dataLayer) {
          window.dataLayer.push({
            event: 'Goal Base Calculator',
            CTA: 'Talk to Advisor',
            'Time Spent': calculateTimeDifference(landingTime),
          });
        }
        zendeskHandler();
      }
    } else if (btn1 === 'skip-to-dashboard') {
      const time = calculateTimeDifference(landingTime);
      analytics('GTC_USAGE_TIME', { time_spent: time });
      analytics('GTC_CTA_CLICKED', {
        time_spent: time,
        CTA: 'Skip to dashboard',
      });
      setUserJourneyBtnActionName('Skip to dashboard');
      // localStorage.setItem("currentDashboardPage", "2");
      // if (typeof window != "undefined") {
      //   window.location.href = "/portfolio/start";
      // }
    } else {
      setUserJourneyBtnActionName(btn1);
    }
  };

  const btn2Handler = async (btn2) => {
    const time = calculateTimeDifference(landingTime);
    analytics('GTC_USAGE_TIME', { time_spent: time });
    analytics('GTC_CTA_CLICKED', { time_spent: time, CTA: btn2 });
    if (btn2 === 'Upgrade to Private Wealth') {
      await upgradeAccreditedRequestHandlerForGBC().then(() => {
        setUserJourneyBtnActionName(btn2);
      });
    } else if (btn2 === 'Signup') {
      if (typeof window != 'undefined' && window.dataLayer) {
        window.dataLayer.push({
          event: 'Goal Base Calculator',
          CTA: 'Signup',
          'Time Spent': calculateTimeDifference(landingTime),
        });
      }
      const dataObj = {
        gtcFilterRequest: answersObj,
        rateOfReturn: rateOfReturn,
        modelPortfolioId: modelPortfolioId,
      };

      const base64Data = btoa(JSON?.stringify(dataObj));
      localStorage.setItem('gbcData', base64Data);

      setUserJourneyBtnActionName(btn2);
    } else if (btn2 === 'Complete KYC') {
      localStorage.setItem('currentDashboardPage', '3');
      // if (typeof window != "undefined") {
      //   window.location.href = "/portfolio/start";
      // }
      setUserJourneyBtnActionName(btn2);
    } else if (btn2 === 'Model Asset Allocation') {
      setUserJourneyBtnActionName(btn2);
      // if (!rmlevel && errorTitle && errorSubTitle) {
      //   const params = {
      //     rateOfReturn: rateOfReturn < minimumReturnPercentage ? minimumReturnPercentage : rateOfReturn > maximumReturnPercentage && maximumReturnPercentage,
      //   };
      //   getModelGivenRateApi(params, userDetails, apiBaseUrl, plateform)
      //     ?.then((data) => {
      //       if (data) {
      //         const { modelPortfolioId } = data.data.modelPortfolio || {};
      //         if (typeof window != "undefined") {
      //           window.location.href = plateform ? `/portfolio/modelportfolio/details/${modelPortfolioId}` : `kristalmodelportfolio/${modelPortfolioId}/details`;
      //         }
      //       }
      //     })
      //     .catch((error) => console.log("rateOfReturnApidataError", error));
      // } else {
      //   if (typeof window != "undefined") {
      //     window.location.href = plateform ? `/portfolio/modelportfolio/details/${modelPortfolioId}` : `kristalmodelportfolio/${modelPortfolioId}/details`;
      //   }
      // }
    } else {
      setUserJourneyBtnActionName(btn2);
    }
  };

  const editableHandler = () => {
    const time = calculateTimeDifference(landingTime);
    analytics('GTC_EDIT_CLICKED', { time_spent: time });
    setRmEditable(true);
  };

  const saveChanges = () => {
    setUserJourneyBtnActionName('Save Changes');
  };

  return (
    <>
      {plateform && (
        <Row className="mobile-user-journey-container">
          {btn2 && (
            <Col span={24} className="flex row-center">
              <Button
                className={
                  userDetails?.kycStatus === 'APPROVED' &&
                  rateOfReturn > maximumReturnPercentage &&
                  btn2 === 'Model Asset Allocation'
                    ? 'mobile-user-btn-disable'
                    : 'mobile-user-btn-enable'
                }
                disabled={
                  userDetails?.kycStatus === 'APPROVED' &&
                  rateOfReturn > maximumReturnPercentage &&
                  btn2 === 'Model Asset Allocation'
                }
                onClick={() => {
                  btn2Handler(btn2);
                  if (btn2 === 'Model Asset Allocation') {
                    sessionStorage?.setItem('gbcflow', 'GBC');
                  }
                }}
              >
                {btn2}
              </Button>
            </Col>
          )}
          {btn2 !== 'Complete KYC' && btn1 && (
            <Col span={24} className="flex row-center">
              <Button
                type="link"
                className="mobile-user-btn-link"
                onClick={() => btn1Handler(btn1)}
              >
                {btn1}
              </Button>
            </Col>
          )}
          {btn2 === 'Complete KYC' && (
            <Col span={24} className="flex row-center">
              <Button
                type="link"
                className="mobile-user-btn-link"
                onClick={() => btn1Handler('skip-to-dashboard')}
              >
                Skip to Dashboard
              </Button>
            </Col>
          )}
        </Row>
      )}
      {!plateform && (
        <Row className="mobile-user-journey-container">
          {!rmEditable && (
            <Col span={24} className="flex row-center">
              <Button
                className="mobile-user-btn-enable"
                onClick={() => editableHandler()}
              >
                Edit
              </Button>
            </Col>
          )}
          {rmEditable && (
            <Col span={24} className="flex row-center">
              <Button
                className="mobile-user-btn-enable"
                onClick={() => saveChanges()}
              >
                Save Changes
              </Button>
            </Col>
          )}
        </Row>
      )}
    </>
  );
};

export default MobileUserJourney;
