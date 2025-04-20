import { Button, Col, Row } from "antd";
import React, { useContext, useEffect } from "react";
import userJourneyImage from "../../../images/userjourney.svg";
import { calculateTimeDifference, errorMessageData, userJourneyData } from "../utils";
import useMediaQueryCustom from "../../../GBC/useMediaQueryCustome";
import GBCcontext from "../../../GBC/GBCcontext";
import { getModelGivenRateApi } from "../../../GBC/service";

const UserJourney = ({ upgradeAccreditedRequestHandlerForGBC, sendByOkReq, zendeskHandler, analytics }) => {
  const { viewMoreDeatils, setViewMoreDetails, userDetails, setUserJourneyBtnActionName, answersObj, calculateReturns, apiBaseUrl, plateform, minimumReturnPercentage, maximumReturnPercentage, rmLevel, landingTime } = useContext(GBCcontext);

  const { title, btn1, btn2 } = userJourneyData(userDetails) || {};
  const { modelPortfolio, rateOfReturn } = calculateReturns || {};
  const { modelPortfolioId } = modelPortfolio || {};

  const { isMobile, isTablet } = useMediaQueryCustom();

  const { errorTitle, errorSubTitle } = errorMessageData(rateOfReturn, minimumReturnPercentage, maximumReturnPercentage) || {};

  const btn1Handler = (btn1) => {
    if (btn1 === "Talk to Advisor") {
      if (userDetails && Object.keys(userDetails).length > 0) {
        const time = calculateTimeDifference(landingTime);
        analytics("GTC_USAGE_TIME", { time_spent: time });
        analytics("GTC_CTA_CLICKED", { time_spent: time, CTA: btn1 });
        sendByOkReq().then(() => {
          setUserJourneyBtnActionName(btn1);
        });
      } else {
        if (typeof window != "undefined" && window.dataLayer) {
          window.dataLayer.push({
            event: "Goal Base Calculator",
            CTA: "Talk to Advisor",
            "Time Spent": calculateTimeDifference(landingTime),
          });
        }
        zendeskHandler();
      }
    } else {
      setUserJourneyBtnActionName(btn1);
    }
  };

  const btn2Handler = async (btn2) => {
    if (btn2 === "Upgrade to Private Wealth") {
      setUserJourneyBtnActionName(btn2);
      // await upgradeAccreditedRequestHandlerForGBC().then(() => {
      // });
    } else if (btn2 === "Signup") {
      // const dataObj = {
      //   gtcFilterRequest: answersObj,
      //   rateOfReturn: rateOfReturn,
      //   modelPortfolioId: modelPortfolioId,
      // };

      // const base64Data = btoa(JSON?.stringify(dataObj));
      // localStorage.setItem("gbcData", base64Data);
      if (typeof window != "undefined" && window.dataLayer) {
        window.dataLayer.push({
          event: "Goal Base Calculator",
          CTA: "Signup",
          "Time Spent": calculateTimeDifference(landingTime),
        });
      }
      setUserJourneyBtnActionName(btn2);
    } else if (btn2 === "Complete KYC") {
      // localStorage.setItem("currentDashboardPage", "2");
      // if (typeof window != "undefined") {
      //   window.location.href = "/portfolio/start";
      // }
      setUserJourneyBtnActionName(btn2);
    } else if (btn2 === "Model Asset Allocation") {
      setUserJourneyBtnActionName(btn2);
      // if (!rmLevel && errorTitle && errorSubTitle) {
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

  const btn2HandlerMain = () => {
    const time = calculateTimeDifference(landingTime);
    analytics("GTC_USAGE_TIME", { time_spent: time });
    analytics("GTC_CTA_CLICKED", { time_spent: time, CTA: btn2 });
    btn2Handler(btn2);
  };

  return (
    <>
      <div className={`user-journey-conatiner flex ${isMobile && "text-center"}`}>
        {!isMobile && !isTablet && (
          <Row className={`user-journey-main`}>
            <Col span={24} className="user-journey-title">
              {title}
            </Col>
            <Col span={24} className={isMobile && "flex row-center"}>
              <Row className={isMobile ? "margin-top-16" : "margin-top-23"}>
                {btn1 && (
                  <Col className="margin-right-10">
                    <button className="talk-to-advisor" type="primary" onClick={() => btn1Handler(btn1)}>
                      {btn1}
                    </button>
                  </Col>
                )}
                {btn2 && (
                  <Col>
                    <Button
                      className={userDetails?.kycStatus === "APPROVED" && rateOfReturn > maximumReturnPercentage && btn2 === "Model Asset Allocation" ? "btnCustomDisable" : "btnCustomClick"}
                      type="primary"
                      disabled={userDetails?.kycStatus === "APPROVED" && rateOfReturn > maximumReturnPercentage && btn2 === "Model Asset Allocation"}
                      onClick={() => {
                        btn2HandlerMain(btn2);
                        if (btn2 === "Model Asset Allocation") {
                          sessionStorage?.setItem("gbcflow", "GBC");
                        }
                      }}
                    >
                      {btn2}
                    </Button>
                  </Col>
                )}
              </Row>
            </Col>
          </Row>
        )}
        {(isMobile || isTablet) && btn2 === "Complete KYC" && (
          <Row className={`user-journey-main`}>
            <Col span={24} className="user-journey-title">
              {title}
            </Col>
            <Col span={24} className={isMobile && "flex row-center"}>
              <Row className={isMobile ? "margin-top-16" : "margin-top-23"}>
                {btn1 && (
                  <Col className="margin-left-10">
                    <button className="talk-to-advisor" type="primary" onClick={() => btn1Handler(btn1)}>
                      {btn1}
                    </button>
                  </Col>
                )}
              </Row>
            </Col>
          </Row>
        )}
        {!isMobile && <img src={typeof userJourneyImage === "object" ? userJourneyImage.src : userJourneyImage} />}
      </div>
      {(isMobile || isTablet) && userDetails && userDetails.kycStatus !== "APPROVED" && (
        <div className={`margin-left-16 margin-right-16 text-center text-1F1F1F font-size-12 line-height-18 ${btn2 === "Complete KYC" && "margin-top-16"}`}>
          <span className="bold">Note: </span>
          <span>
            Some of the asset classes are
            <br /> accessible to Private Wealth customers only
          </span>
        </div>
      )}
    </>
  );
};

export default UserJourney;
