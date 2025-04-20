import { Button, Col, Input, InputNumber, Modal, Row } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { getModelGivenRateApi } from "../../../GBC/service";
import GBCcontext from "../../../GBC/GBCcontext";
import { calculateTimeDifference } from "../utils";
import useMediaQueryCustom from "../../../GBC/useMediaQueryCustome";

const RateOfReturnModal = ({ analytics }) => {
  const [inputValue, setInputValue] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const {
    setBlurLeftSection,
    calculateReturns,
    setCalculateReturns,
    modalRateofReturn,
    setModalRateofReturn,
    setAnswersObj,
    userDetails,
    apiBaseUrl,
    plateform,
    landingTime,
    rmLevel,
  } = useContext(GBCcontext);

  const { isMobile, isTablet } = useMediaQueryCustom();

  const { rateOfReturn } = calculateReturns || {};

  useEffect(() => {
    if (rateOfReturn) {
      setInputValue(rateOfReturn);
    }
  }, [rateOfReturn]);

  const modalInputHandler = (e) => {
    setInputValue(e);
  };

  const rateOfReturnHandler = () => {
    setIsLoading(true);
    const params = { rateOfReturn: inputValue };
    getModelGivenRateApi(params, userDetails, apiBaseUrl, plateform)
      ?.then((data) => {
        if (data) {
          const time = calculateTimeDifference(landingTime);
          analytics("GTC_SAVE_CHANGES_MANUALLY", {
            time_spent: time,
            type: "manual",
          });
          setCalculateReturns(data?.data);
          // setAnswersObj(data?.data?.gtcFilterRequest == null ? {} : data?.data?.gtcFilterRequest);
          data?.data?.gtcFilterRequest == null
            ? setBlurLeftSection(true)
            : setBlurLeftSection(false);
          setModalRateofReturn(false);
          setIsLoading(false);
        }
      })
      .catch((error) => console.log("rateOfReturnApidataError", error))
      ?.finally(() => setIsLoading(false));
  };

  const handleKeypress = (e) => {
    //it triggers by pressing the enter key
    console.log("e.keyCode", e.keyCode);
    if (e.keyCode === 13) {
      rateOfReturnHandler();
    }
  };

  const modalBody = () => {
    return (
      <>
        <Row>
          <Col className="rate-of-return-title">
            Manually input Target Rate of Returns
          </Col>
          {plateform ? (
            <Col
              span={24}
              className="font-size-14 line-height-20 text-777 margin-top-16"
            >
              Know what you’re aiming for? You can input your preferred target
              rate of
              <br /> returns here, we’ll show you the model portfolio that’ll
              get you there.
            </Col>
          ) : (
            <>
              {!rmLevel && (
                <>
                  {isMobile ? (
                    <Col
                      span={24}
                      className="font-size-14 line-height-20 text-777 margin-top-16"
                    >
                      You can input your client's preferred target rate of
                      returns here and send notification to your client.
                    </Col>
                  ) : (
                    <Col
                      span={24}
                      className="font-size-14 line-height-20 text-777 margin-top-16"
                    >
                      You can input your client's preferred target rate of
                      returns here and
                      <br /> send notification to your client.
                    </Col>
                  )}
                </>
              )}
            </>
          )}
          <Col span={24} className="margin-top-56">
            {/* <Input placeholder="Enter Returns" value={inputValue} className="modal-input" onChange={(e) => modalInputHandler(e)} suffix="%" /> */}
            <InputNumber
              placeholder="Enter Returns"
              value={inputValue}
              className="modal-input"
              min={0}
              onChange={(e) => modalInputHandler(e)}
              formatter={(value) => `${value ? value : 0}${value && "%"}`}
              parser={(value) => value && value.replace("%", "")}
              controls={false}
              onKeyDown={handleKeypress}
            />
          </Col>
          {plateform ? (
            <Col span={24} className="flex row-center margin-top-56">
              <Button
                className="btnLink"
                type="link"
                onClick={() => setModalRateofReturn(false)}
              >
                Cancel
              </Button>
              <Button
                className="btnModalEnable pointer"
                onClick={rateOfReturnHandler}
                loading={isLoading}
              >
                Save
              </Button>
            </Col>
          ) : (
            <Col span={24} className="flex row-center margin-top-56">
              <Button
                className="btnLink"
                type="link"
                onClick={() => setModalRateofReturn(false)}
              >
                Cancel
              </Button>
              <Button
                className="btnModalEnable pointer"
                onClick={rateOfReturnHandler}
                loading={isLoading}
              >
                Save
              </Button>
            </Col>
          )}
        </Row>
      </>
    );
  };

  return (
    <Modal
      // title={
      //   <span className="bold font-size-18 line-height-24 text-1f1f1f">Manually input Target Rate of Returns</span>
      // }
      centered
      visible={modalRateofReturn}
      onOk={() => setModalRateofReturn(false)}
      onCancel={() => setModalRateofReturn(false)}
      footer={false}
      width={609}
      className="edit-returns-modal"
    >
      {modalBody()}
    </Modal>
  );
};

export default RateOfReturnModal;
