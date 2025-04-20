import React, { useContext, useState } from 'react';
import rightArrow from '../../../images/rightArrow.svg';
import { Col, Radio, Row } from 'antd';
import { errorMessageData, colorMapping } from '../utils';
import useMediaQueryCustom from '../../../GBC/useMediaQueryCustome';
import GBCcontext from '../../../GBC/GBCcontext';
import lock from '../../../images/lock.svg';
import giftCoin from '../../../images/giftCoin.svg';
import defaltSuggestedAsstes from '../../../images/defaltSuggestedAsstes.svg';

const AssetsCollection = () => {
  const {
    calculateReturns,
    userDetails,
    rmLevel,
    plateform,
    minimumReturnPercentage,
    maximumReturnPercentage,
  } = useContext(GBCcontext);
  const { modelPortfolio, rateOfReturn } = calculateReturns || {};
  const { assetAllocation, kristalHoldingsResponse } = modelPortfolio || {};
  const [mode, setMode] = useState('asset_allocation');
  const { isTablet } = useMediaQueryCustom();

  if (userDetails && Object.keys(userDetails).length > 0) {
    assetAllocation?.sort((a, b) => b.allocationPercent - a.allocationPercent);
  } else {
    assetAllocation?.sort((a, b) => {
      if (a.assetClass === 'Equity') {
        return -1; // Move "Equity" to the beginning
      } else if (b.assetClass === 'Equity') {
        return 1; // Move "Equity" to the end
      } else {
        return 0; // Preserve the relative order of other asset classes
      }
    });
  }

  const handleModeChange = (e) => {
    setMode(e.target.value);
  };

  const redirectToDetails = (kristalId, kristalType, kristalSubtype) => {
    const kristalDetailsRoute = `/kristals/${kristalId}/details${
      kristalSubtype === 'STARTUP' ? `?type=startup${''}` : ''
    }`;

    if (typeof window != 'undefined') {
      window.location.href = kristalDetailsRoute;
    }
  };

  const redirectToDetailsForPortal = (
    kristalId,
    kristalType,
    kristalSubtype
  ) => {
    // if (isStructureNotes) {
    //   window.location.href = `/portfolio/kristal/detail/fund/${kristalId}?template=true&subtype=STRUCTURED_NOTES`;
    // }
    const kristalDetailsRoute = `/portfolio/kristal/detail/${kristalType
      .toString()
      .toLowerCase()}/${kristalId}?template=${false}&subtype=${kristalSubtype}`;
    if (typeof window != 'undefined') {
      window.location.href = kristalDetailsRoute;
    }
  };

  const { errorTitle, errorSubTitle } =
    errorMessageData(
      rateOfReturn,
      minimumReturnPercentage,
      maximumReturnPercentage
    ) || {};

  const colorCodeData = (assetClass) => {
    const colorData = colorMapping?.find(
      (obj) => obj?.assetClass === assetClass
    )?.color;
    return colorData;
  };

  return (
    <Row className="width-90">
      <Col span={24}>
        <div className="radio-bg-container">
          <Radio.Group
            onChange={handleModeChange}
            value={mode}
            className="radio-group-assets flex row-center"
          >
            <Radio.Button value="asset_allocation">
              Asset Allocation
            </Radio.Button>
            <Radio.Button value="suggested_assets">
              Suggested Assets
            </Radio.Button>
          </Radio.Group>
        </div>
        <div className={`assets-conatiner`}>
          {mode === 'asset_allocation' && (
            <div
              className={`margin-top-10 asset-acclocation-main ${
                !rmLevel &&
                errorTitle &&
                errorSubTitle &&
                'asset-allocation-blur'
              }`}
            >
              {assetAllocation ? (
                assetAllocation?.map((item, index) => (
                  <Row
                    key={index}
                    className={`asset-allocation-container ${
                      !rmLevel &&
                      Object.keys(userDetails || {}).length === 0 &&
                      item.assetClass !== 'Equity' &&
                      'asset-allocation-blur'
                    } flex column-center`}
                  >
                    <Col span={2}>
                      <div
                        className={`assets-color`}
                        style={{
                          background: `${colorCodeData(item?.assetClass)}`,
                        }}
                      ></div>
                    </Col>
                    <Col
                      span={18}
                      className={`${
                        isTablet
                          ? 'font-size-16 line-height-20'
                          : 'font-size-12 line-height-18'
                      }`}
                    >
                      {item?.assetClass}
                    </Col>
                    <Col
                      span={4}
                      className={`flex end ${
                        isTablet
                          ? 'font-size-16 line-height-20'
                          : 'font-size-12 line-height-18'
                      }`}
                    >
                      {(item?.allocationPercent * 100)?.toFixed(2) + '%'}
                    </Col>
                    {index !== assetAllocation?.length - 1 && (
                      <Col
                        span={24}
                        style={{
                          border: '1px solid #363636',
                          margin: '7px 0px',
                        }}
                      ></Col>
                    )}
                  </Row>
                ))
              ) : (
                <>
                  <img
                    alt=""
                    src={
                      typeof defaltSuggestedAsstes === 'object'
                        ? defaltSuggestedAsstes.src
                        : defaltSuggestedAsstes
                    }
                    width={'100%'}
                  />
                </>
              )}
            </div>
          )}
          {mode === 'suggested_assets' && (
            <div
              className={`asset-suggested ${
                !rmLevel &&
                errorTitle &&
                errorSubTitle &&
                'asset-allocation-blur'
              }`}
            >
              <div className="margin-top-20 asset-suggested-main">
                {kristalHoldingsResponse ? (
                  kristalHoldingsResponse?.map((item, index) => (
                    <Row
                      key={index}
                      className={`asset-suggested-container flex column-center space-around ${
                        ((!rmLevel &&
                          userDetails &&
                          userDetails.kycStatus !== 'APPROVED') ||
                          (!rmLevel &&
                            !errorTitle &&
                            !errorSubTitle &&
                            userDetails &&
                            userDetails.kycStatus === 'APPROVED' &&
                            userDetails.billingType === 'DIGITAL')) &&
                        'asset-allocation-blur'
                      }`}
                    >
                      <Col span={3} className="flex">
                        <div
                          className={`suggested-color`}
                          style={{
                            background: `${colorCodeData(item?.assetClass)}`,
                          }}
                        ></div>
                        <img
                          alt=""
                          src={item?.imageUrl}
                          width={18}
                          height={18}
                          className="margin-left-8 margin-top-2"
                        />
                      </Col>
                      <Col span={14}>{item?.kristalName}</Col>
                      <Col span={6} className="flex end column-center">
                        <span className="margin-right-10">
                          {(item?.weightPercent * 100)?.toFixed(2) + '%'}
                        </span>
                        <img
                          alt=""
                          src={
                            typeof rightArrow === 'object'
                              ? rightArrow.src
                              : rightArrow
                          }
                          height={15}
                          width={10}
                          onClick={() =>
                            plateform
                              ? redirectToDetailsForPortal(
                                  item.kristalId,
                                  item.kristalType,
                                  item.kristalSubtype
                                )
                              : redirectToDetails(
                                  item.kristalId,
                                  item.kristalType,
                                  item.kristalSubtype
                                )
                          }
                        />
                      </Col>
                    </Row>
                  ))
                ) : (
                  <>
                    <img
                      alt=""
                      src={
                        typeof defaltSuggestedAsstes === 'object'
                          ? defaltSuggestedAsstes.src
                          : defaltSuggestedAsstes
                      }
                      width={'100%'}
                    />
                  </>
                )}
              </div>
              {!rmLevel &&
                userDetails &&
                userDetails.kycStatus !== 'APPROVED' && (
                  <div className="asset-suggested-shadow"></div>
                )}
            </div>
          )}
          {!rmLevel &&
            errorTitle &&
            errorSubTitle &&
            userDetails &&
            userDetails.kycStatus !== 'APPROVED' && (
              <Row className="error-messages-conatiner">
                <Col
                  span={24}
                  className="text-center bold font-size-12 line-height-18 text-1f1f1f"
                >
                  {errorTitle}
                </Col>
                <Col
                  span={24}
                  className="text-center margin-top-16 font-size-12 line-height-18 text-1f1f1f"
                >
                  {errorSubTitle}
                </Col>
              </Row>
            )}
          {!rmLevel &&
            errorTitle &&
            errorSubTitle &&
            userDetails &&
            userDetails.kycStatus === 'APPROVED' && (
              <Row className="error-messages-conatiner">
                <Col
                  span={24}
                  className="text-center bold font-size-12 line-height-18 text-1f1f1f"
                >
                  {errorTitle}
                </Col>
                <Col
                  span={24}
                  className="text-center margin-top-16 font-size-12 line-height-18 text-1f1f1f"
                >
                  {errorSubTitle}
                </Col>
              </Row>
            )}
          {!rmLevel &&
            mode === 'suggested_assets' &&
            !errorTitle &&
            !errorSubTitle &&
            userDetails &&
            userDetails.kycStatus !== 'APPROVED' && (
              <Row className="lock-the-feature">
                <Col span={24} className="flex row-center">
                  {userDetails.billingType === 'DIGITAL' ? (
                    <img
                      alt=""
                      src={
                        typeof giftCoin === 'object' ? giftCoin.src : giftCoin
                      }
                      height={118}
                      width={118}
                    />
                  ) : (
                    <img
                      alt=""
                      src={typeof lock === 'object' ? lock.src : lock}
                      height={118}
                      width={118}
                    />
                  )}
                </Col>
                <Col
                  span={24}
                  className="text-center margin-top-16 font-size-12 line-height-18 text-fff bold"
                >
                  Signup and complete KYC to unlock the full features of the
                  goal based returns calculator
                </Col>
              </Row>
            )}
          {!rmLevel &&
            mode === 'suggested_assets' &&
            !errorTitle &&
            !errorSubTitle &&
            userDetails &&
            userDetails.kycStatus === 'APPROVED' &&
            userDetails.billingType === 'DIGITAL' && (
              <Row className="lock-the-feature">
                <Col span={24} className="flex row-center">
                  <img
                    alt=""
                    src={typeof giftCoin === 'object' ? giftCoin.src : giftCoin}
                    height={118}
                    width={118}
                  />
                </Col>
                <Col
                  span={24}
                  className="text-center margin-top-16 font-size-12 line-height-18 text-fff bold"
                >
                  Since some of the asset classes are accessible to Private
                  Wealth customers only. Please upgrade to Private Wealth
                </Col>
              </Row>
            )}
          {rmLevel && errorTitle && errorSubTitle && (
            <Row className="error-messages-conatiner">
              <Col
                span={24}
                className="text-center bold font-size-12 line-height-18 text-1f1f1f"
              >
                {errorTitle}
              </Col>
              <Col
                span={24}
                className="text-center margin-top-16 font-size-12 line-height-18 text-1f1f1f"
              >
                {errorSubTitle}
              </Col>
            </Row>
          )}
        </div>
      </Col>
    </Row>
  );
};

export default AssetsCollection;
