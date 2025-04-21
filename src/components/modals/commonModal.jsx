import { Button, Col, Modal, Progress, Row } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import savingImage from '../images/savingDetails.png';
import trophyAndTarget from '../images/trophy_and_target.svg';
import GBCcontext from '../GBC/GBCcontext';
import { getModelGivenRateApi, saveParams } from '../GBC/service';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  calculateTimeDifference,
  errorMessageData,
} from '../gbc-container/highchart-component/utils';
import { CheckOutlined } from '@ant-design/icons';
import openNotification from '../GBC/notification';

const CommonModal = ({ analytics, upgradeAccreditedRequestHandlerForGBC }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const {
    userDetails,
    blurLeftSection,
    userJourneyBtnActionName,
    setUserJourneyBtnActionName,
    plateform,
    answersObj,
    calculateReturns,
    setRmEditable,
    apiBaseUrl,
    showPopup,
    landingTime,
    minimumReturnPercentage,
    maximumReturnPercentage,
    rmLevel,
  } = useContext(GBCcontext);

  let navigate = useNavigate();

  const { modelPortfolio, rateOfReturn } = calculateReturns || {};
  const { modelPortfolioId } = modelPortfolio || {};

  const { errorTitle, errorSubTitle } =
    errorMessageData(
      rateOfReturn,
      minimumReturnPercentage,
      maximumReturnPercentage
    ) || {};

  const handleOk = () => {
    setIsModalOpen(false);
    setUserJourneyBtnActionName('');
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setUserJourneyBtnActionName('');

    if (showPopup && userDetails && userDetails.kycStatus === 'APPROVED') {
      saveParams(
        answersObj,
        rateOfReturn,
        modelPortfolioId,
        showPopup,
        userDetails,
        apiBaseUrl,
        plateform
      )
        ?.then(() => {
          setIsModalOpen(false);
          setUserJourneyBtnActionName('');
        })
        .catch((error) => console.log('errorData', error));
    }
  };
  const saveHandler = () => {
    setLoading(true);
    saveParams(
      blurLeftSection ? {} : answersObj,
      rateOfReturn,
      modelPortfolioId,
      showPopup,
      userDetails,
      apiBaseUrl,
      plateform
    )
      .then(() => {
        console.log('userJourneyBtnActionName1', userJourneyBtnActionName);
        if (!plateform) {
          const time = calculateTimeDifference(landingTime);
          analytics('GTC_SAVE_CHANGES', {
            time_spent: time,
            type: blurLeftSection ? 'manual' : 'calculator',
          });
          setRmEditable(false);
        }
        if (plateform) {
          console.log('hello12345GTC');
          console.log('userJourneyBtnActionName2', userJourneyBtnActionName);
          const time = calculateTimeDifference(landingTime);
          analytics('GTC_SAVE_CHANGES', {
            time_spent: time,
            type: blurLeftSection ? 'manual' : 'calculator',
          });
          if (userJourneyBtnActionName === 'Complete KYC') {
            setUserJourneyBtnActionName('');
            localStorage.setItem('currentDashboardPage', '3');
            if (typeof window != 'undefined') {
              window.location.href = '/portfolio/start';
            }
          } else if (userJourneyBtnActionName === 'Model Asset Allocation') {
            console.log('userJourneyBtnActionName3', userJourneyBtnActionName);
            setUserJourneyBtnActionName('');
            if (!rmLevel && errorTitle && errorSubTitle) {
              const params = {
                rateOfReturn:
                  rateOfReturn < minimumReturnPercentage
                    ? minimumReturnPercentage
                    : rateOfReturn > maximumReturnPercentage &&
                      maximumReturnPercentage,
              };
              getModelGivenRateApi(params, userDetails, apiBaseUrl, plateform)
                ?.then((data) => {
                  if (data) {
                    const { modelPortfolioId } = data.data.modelPortfolio || {};
                    if (typeof window != 'undefined') {
                      window.location.href = plateform
                        ? `/portfolio/modelportfolio/details/${modelPortfolioId}`
                        : `kristalmodelportfolio/${modelPortfolioId}/details`;
                    }
                  }
                })
                .catch((error) =>
                  console.log('rateOfReturnApidataError', error)
                );
            } else {
              if (typeof window != 'undefined') {
                window.location.href = plateform
                  ? `/portfolio/modelportfolio/details/${modelPortfolioId}`
                  : `kristalmodelportfolio/${modelPortfolioId}/details`;
              }
            }
          } else if (userJourneyBtnActionName === 'Skip to dashboard') {
            setUserJourneyBtnActionName('');
            if (userDetails && userDetails?.kycStatus === 'APPROVED') {
              if (typeof window != 'undefined') {
                window.location.href = '/portfolio/dashboard';
              }
            } else {
              localStorage?.setItem('currentDashboardPage', 2);
              if (typeof window != 'undefined') {
                window.location.href = '/portfolio/start';
              }
            }
          } else {
            if (localStorage.getItem('pagename') === 'DASHBOARD') {
              localStorage?.setItem('currentDashboardPage', 2);
              if (typeof window != 'undefined') {
                window.location.href = '/portfolio/start';
              }
            } else if (userDetails?.kycStatus === 'APPROVED') {
              window.location.href = '/portfolio/details';
            } else {
              navigate(-1);
            }
          }
        }
        setLoading(false);
        setIsModalOpen(false);
        setUserJourneyBtnActionName('');
      })
      .catch((error) => console.log('errorData', error));
  };

  useEffect(() => {
    if (userJourneyBtnActionName === 'Talk to Advisor') {
      setIsModalOpen(true);
    } else if (userJourneyBtnActionName === 'Upgrade to Private Wealth') {
      setIsModalOpen(true);
    } else if (
      userJourneyBtnActionName === 'Save Changes' ||
      userJourneyBtnActionName === 'Complete KYC' ||
      userJourneyBtnActionName === 'Model Asset Allocation' ||
      userJourneyBtnActionName === 'Skip to dashboard'
    ) {
      setIsModalOpen(true);
    } else if (
      Object.keys(userDetails || {})?.length > 0 &&
      userDetails &&
      userDetails.kycStatus === 'APPROVED' &&
      plateform &&
      showPopup
    ) {
      console.log('hello12234');
      setIsModalOpen(true);
    } else if (
      Object.keys(userDetails || {})?.length === 0 &&
      userJourneyBtnActionName === 'Signup'
    ) {
      console.log('hello1234');
      setIsModalOpen(true);
      beforeAuth();
    } else {
      setIsModalOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userJourneyBtnActionName, showPopup, userDetails, plateform]);

  const beforeAuth = () => {
    const responseData = axios.post(
      `${apiBaseUrl}/kristal-manager-ws/gtc/api/v1/external/saveParams`,
      {
        gtcFilterRequest: answersObj,
        rateOfReturn: rateOfReturn,
        modelPortfolioId: modelPortfolioId,
        showPopup: showPopup,
      },
      {
        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent;
          const percentage = Math.floor((loaded * 100) / total);
          setProgress(percentage);
        },
      }
    );

    responseData
      ?.then((res) => {
        if (res.status === 200) {
          localStorage.setItem('gbcData', res.data);
          setIsModalOpen(false);
          if (typeof window != 'undefined') {
            window.location.href = '/signup';
          }
        }
      })
      .catch((error) => console.log('errorData', error));
  };

  const accredited_investor = [
    {
      title:
        'Annual Income in the preceding year of Singapore Dollars 300,000/- (or the equivalent in foreign currency)',
    },
    {
      title:
        'Total Net Worth of Singapore Dollars 2,000,000/- (or equivalent in foreign currency) with the value of his/her primary residence capped at SGD 1 million',
    },
    {
      title:
        'Whose financial assets (net of any related liabilities) exceed in value SGD 1 million (or it’s equivalent in a foreign currency)',
    },
  ];

  const upgradeAccreditedRequestHandler = () => {
    upgradeAccreditedRequestHandlerForGBC()?.then(() => {
      setIsModalOpen(false);
      setUserJourneyBtnActionName('');
      openNotification('topRight', 'Request sent Successfully');
    });
  };

  const bodyData = (userJourneyBtnActionName) => {
    if (userJourneyBtnActionName === 'Talk to Advisor') {
      return (
        <>
          <Row className="font-size-24 line-height-28 bold modal-title-gbc">
            Request Noted
          </Row>
          <Row className="width-90 font-size-14 line-height-20 text-999 margin-top-8 modal-subtitle-gbc">
            Your RM will contact you shortly to understand your requirement &
            advise you on next steps.
          </Row>
        </>
      );
    } else if (userJourneyBtnActionName === 'Upgrade to Private Wealth') {
      return (
        <>
          <Row className="font-size-24 line-height-28 bold modal-title-gbc">
            Accredited Investor
          </Row>
          <Row className="width-90 font-size-14 line-height-20 text-999 margin-top-8 modal-subtitle-gbc">
            Accredited Investors are our customers that meet the following
            criteria and have opted to be so:
            <p className="font-size-14 line-height-20 text-777 margin-top-30">
              {accredited_investor?.map(({ title }, index) => (
                <Row className="margin-top-24">
                  <Col
                    span={3}
                    className="flex row-center column-center text-1f1f1f text-bold-700"
                  >
                    <CheckOutlined />
                  </Col>
                  <Col span={21}>{title}</Col>
                </Row>
              ))}
            </p>
          </Row>
          <Row className="flex row-center">
            <Button
              type="text"
              className="btnLink"
              onClick={upgradeAccreditedRequestHandler}
            >
              OK
            </Button>
          </Row>
        </>
      );
    } else if (
      userJourneyBtnActionName === 'Save Changes' ||
      userJourneyBtnActionName === 'Complete KYC' ||
      userJourneyBtnActionName === 'Model Asset Allocation' ||
      userJourneyBtnActionName === 'Skip to dashboard'
    ) {
      return (
        <>
          <Row className="font-size-24 line-height-28 bold modal-title-gbc">
            Save Changes?
          </Row>
          <Row className="width-90 font-size-14 line-height-20 text-999 margin-top-8 modal-subtitle-gbc">
            Do you wish to save all the changes to the goal based returns
            caluclator?
          </Row>
          {!plateform && (
            <Row>
              <span className="rm-save-changes-note space-top">
                <b>Note:</b> These changes will be informed to your client via
                notification.
              </span>
            </Row>
          )}
          <Row className="margin-top-20 save-modal-btns">
            <Button
              type="link"
              className="btnLink"
              onClick={() => {
                if (userJourneyBtnActionName === 'Complete KYC') {
                  setUserJourneyBtnActionName('');
                  localStorage.setItem('currentDashboardPage', '2');
                  if (typeof window != 'undefined') {
                    window.location.href = '/portfolio/start';
                  }
                } else if (
                  userJourneyBtnActionName === 'Model Asset Allocation'
                ) {
                  setUserJourneyBtnActionName('');
                  if (!rmLevel && errorTitle && errorSubTitle) {
                    const params = {
                      rateOfReturn:
                        rateOfReturn < minimumReturnPercentage
                          ? minimumReturnPercentage
                          : rateOfReturn > maximumReturnPercentage &&
                            maximumReturnPercentage,
                    };
                    getModelGivenRateApi(
                      params,
                      userDetails,
                      apiBaseUrl,
                      plateform
                    )
                      ?.then((data) => {
                        if (data) {
                          const { modelPortfolioId } =
                            data.data.modelPortfolio || {};
                          if (typeof window != 'undefined') {
                            window.location.href = plateform
                              ? `/portfolio/modelportfolio/details/${modelPortfolioId}`
                              : `kristalmodelportfolio/${modelPortfolioId}/details`;
                          }
                        }
                      })
                      .catch((error) =>
                        console.log('rateOfReturnApidataError', error)
                      );
                  } else {
                    if (typeof window != 'undefined') {
                      window.location.href = plateform
                        ? `/portfolio/modelportfolio/details/${modelPortfolioId}`
                        : `kristalmodelportfolio/${modelPortfolioId}/details`;
                    }
                  }
                } else if (userJourneyBtnActionName === 'Skip to dashboard') {
                  setUserJourneyBtnActionName('');
                  if (userDetails && userDetails?.kycStatus === 'APPROVED') {
                    if (typeof window != 'undefined') {
                      window.location.href = '/portfolio/dashboard';
                    }
                  } else {
                    localStorage?.setItem('currentDashboardPage', 2);
                    if (typeof window != 'undefined') {
                      window.location.href = '/portfolio/start';
                    }
                  }
                } else if (userDetails?.kycStatus === 'APPROVED' && plateform) {
                  window.location.href = '/portfolio/details';
                } else {
                  setUserJourneyBtnActionName('');
                  plateform && navigate(-1);
                  setIsModalOpen(false);
                }
              }}
            >
              {!plateform ? 'No' : 'Cancel'}
            </Button>
            <Button
              className="margin-left-5 btnModalEnable pointer"
              onClick={saveHandler}
              loading={loading}
            >
              {!plateform ? 'Yes' : 'Save Changes'}
            </Button>
          </Row>
        </>
      );
    } else if (
      Object.keys(userDetails || {})?.length > 0 &&
      userDetails &&
      userDetails.kycStatus === 'APPROVED' &&
      plateform &&
      showPopup
    ) {
      return (
        <>
          <Row className="flex row-center text-center font-size-24 line-height-28 bold">
            Congratulations!
          </Row>
          <Row className="flex row-center text-center font-size-14 line-height-20 margin-top-10">
            You have successfully unlocked all the
            <br />
            features of the GBC
          </Row>
        </>
      );
    } else if (
      Object.keys(userDetails || {})?.length === 0 &&
      userJourneyBtnActionName === 'Signup'
    ) {
      return (
        <>
          <Row className="flex row-center text-center font-size-24 line-height-28 bold">
            Please wait while we save
            <br />
            all your inputs
          </Row>
          <Row className="font-size-18 line-height-24 bold margin-top-50">
            Saving all your inputs.
          </Row>
          <Row className="margin-top-16">
            <Progress percent={progress} showInfo={false} />
          </Row>
        </>
      );
    }
  };

  return (
    <Modal
      centered
      visible={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={false}
      maskClosable={
        Object.keys(userDetails || {})?.length === 0 &&
        userJourneyBtnActionName === 'Signup'
          ? false
          : true
      }
      closable={
        Object.keys(userDetails || {})?.length === 0 &&
        userJourneyBtnActionName === 'Signup'
          ? false
          : true
      }
      width={
        userJourneyBtnActionName === 'Upgrade to Private Wealth' ? 610 : 594
      }
      className="common-modal"
      rootClassName="edit-returns-modal-parent"
      // width={btnActionName === "Talk to Advisor" && 594}
    >
      {userJourneyBtnActionName === 'Signup' && (
        <Row className="flex row-center">
          <img
            alt=""
            src={
              typeof savingImage === 'object' ? savingImage.src : savingImage
            }
            height={255.9}
            width={383}
          />
        </Row>
      )}
      {showPopup &&
        userDetails &&
        userDetails.kycStatus === 'APPROVED' &&
        userJourneyBtnActionName !== 'Talk to Advisor' &&
        userJourneyBtnActionName !== 'Save Changes' &&
        userJourneyBtnActionName !== 'Upgrade to Private Wealth' &&
        userJourneyBtnActionName !== 'Complete KYC' &&
        userJourneyBtnActionName !== 'Model Asset Allocation' &&
        userJourneyBtnActionName === 'Skip to dashboard' && (
          <Row className="flex row-center">
            <img
              alt=""
              src={
                typeof trophyAndTarget === 'object'
                  ? trophyAndTarget.src
                  : trophyAndTarget
              }
              height={261}
              width={287.9}
            />
          </Row>
        )}
      {bodyData(userJourneyBtnActionName)}
    </Modal>
  );
};

export default CommonModal;
