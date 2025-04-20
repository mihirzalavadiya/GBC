import { Button, Col, Row, Select } from "antd";
import React, { useContext } from "react";
import useMediaQueryCustom from "../../../GBC/useMediaQueryCustome";
import GBCcontext from "../../../GBC/GBCcontext";
import { assetAllocationMobile, colorMap, colorMapText, colorMapping } from "../utils";
import GbcCurrencyChange from "./gbcCurrencyChange";
import { EditOutlined } from "@ant-design/icons";
import RateOfReturnModal from "./rateOfReturnModal";
import CommonModal from "../../../modals/commonModal";
import videoBtnImage from "../../../images/videoBtnImg.svg";

const MobilePieChart = ({ analytics, upgradeAccreditedRequestHandlerForGBC, setIsModalOpen, isModalOpen }) => {
  const { isMobile, isTablet } = useMediaQueryCustom();
  const { setViewMoreDetails, calculateReturns, setModalRateofReturn, userDetails, rmEditable, rmLevel } = useContext(GBCcontext);

  const { rateOfReturn, modelPortfolio } = calculateReturns || {};
  const { assetAllocation } = modelPortfolio || {};

  assetAllocation?.sort((a, b) => {
    if (a.assetClass === "Equity") {
      return -1; // Move "Equity" to the beginning
    } else if (b.assetClass === "Equity") {
      return 1; // Move "Equity" to the end
    } else {
      return 0; // Preserve the relative order of other asset classes
    }
  });

  const viewMoreHandler = () => {
    setViewMoreDetails(true);
  };

  const colorCodeData = (assetClass) => {
    const colorData = colorMapping?.find((obj) => obj?.assetClass === assetClass)?.color;
    return colorData;
  };

  return (
    <div className="mobile-pie-chart-container">
      <GbcCurrencyChange analytics={analytics} />
      <Row className="linear-chart-percentage margin-top-16">
        <Col span={24} id="containerData" className="containerData">
          <Row className="chart-percentage flex row-center column-end">
            {rateOfReturn ? rateOfReturn?.toFixed(1) : 0.0}
            <span className="chart-percent-sign">%</span>
          </Row>
          <div className="chart-text flex row-center column-end">Annual Target Rate of Return</div>
        </Col>
      </Row>
      <Row className="linear-chart-conatiner margin-top-24">
        <Col span={24} className="chart-text">
          Recommended ASSET ALLOCATION
        </Col>
        <Col span={24} className="flex margin-top-10 padding-left-16 padding-right-16 no-wrap">
          {assetAllocation &&
            assetAllocation?.map((val, index) => (
              <Row
                style={{
                  width: val?.allocationPercent * 100 + "%",
                  height: isTablet ? "16px" : "12px",
                  margin: "0px 1px",
                  borderRadius: isTablet ? "8px" : "6px",
                  background: `${colorCodeData(val?.assetClass)}`,
                }}
                key={index}
              ></Row>
            ))}
        </Col>
        <Col span={24} className="flex space-around padding-left-16 padding-right-16">
          {assetAllocation &&
            assetAllocation?.map((val, index) => (
              <Row>
                {/* Blur Effect Class */}
                <Col className={!rmLevel && Object.keys(userDetails || {}).length === 0 && val?.assetClass !== "Equity" && "asset-allocation-blur"}>
                  <Row className={`margin-top-20 font-size-10 line-height-12 margin-left-3 ${isTablet && "font-size-14 line-height-18"}`} style={{ color: `${colorCodeData(val.assetClass)}` }}>
                    {val?.assetClass}
                  </Row>
                  <Row className={`font-size-12 line-height-18 bold text-fff margin-top-6 margin-left-3 ${isTablet && "font-size-16 line-heigth20"}`}>{(val?.allocationPercent * 100)?.toFixed(2) + "%"}</Row>
                </Col>
              </Row>
            ))}
        </Col>
      </Row>
      <Row className="flex row-center margin-top-40 margin-bottom-20">
        <div className="btn-shadow-eefect">
          <Button className="chart-edit-btn" onClick={viewMoreHandler}>
            View more details
          </Button>
        </div>
        {(rmLevel || (userDetails && userDetails.kycStatus === "APPROVED")) && (
          <div className="btn-shadow-eefect margin-left-16">
            <Button className="chart-edit-btn" disabled={!rmEditable} onClick={() => setModalRateofReturn(true)}>
              <EditOutlined /> Input Target
            </Button>
          </div>
        )}
      </Row>
      <Row className="margin-bottom-16 flex row-center">
        <Col span={23}>
          <div className="vedio-tutorial-section">
            <div className="flex space-between column-center width-100">
              <div className="vedio-text">View Tutorial</div>
              <div className="video-btn-view" onClick={() => setIsModalOpen(true)}>
                <img src={typeof videoBtnImage === "object" ? videoBtnImage.src : videoBtnImage} height={20} />
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <RateOfReturnModal analytics={analytics} />
      <CommonModal analytics={analytics} upgradeAccreditedRequestHandlerForGBC={upgradeAccreditedRequestHandlerForGBC} />
    </div>
  );
};

export default MobilePieChart;
