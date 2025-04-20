import { Button, Col, Divider, Image, Row } from "antd";
import React, { useContext, useEffect, useState } from "react";
import backBtn from "../../images/backbtn.svg";
import GBCcontext from "../../GBC/GBCcontext";
import CommonModal from "../../modals/commonModal";
import { useNavigate } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { calculateTimeDifference } from "../highchart-component/utils";

const BackHeader = ({ analytics, upgradeAccreditedRequestHandlerForGBC }) => {
  const { userDetails, plateform, rmEditable, setRmEditable, setUserJourneyBtnActionName, rmLevel, landingTime } = useContext(GBCcontext);
  const [backShow, setBackShow] = useState(true);

  let navigate = useNavigate();

  useEffect(() => {
    if (typeof window !== undefined) {
      const urlData = window.location.href;
      const arrayOfUrl = urlData && urlData.split("?");
      const paramData = arrayOfUrl && arrayOfUrl.slice(-1);

      if (paramData && paramData[0] === "value=signup") {
        setBackShow(false);
      }
    }
  }, [window]);

  const editHandler = () => {
    const time = calculateTimeDifference(landingTime);
    analytics("GTC_EDIT_CLICKED", { time_spent: time });
    setRmEditable(true);
  };

  const saveChangesHandler = () => {
    setUserJourneyBtnActionName("Save Changes");
    // setRmEditable(false);
  };

  const backHandler = () => {
    if (!backShow) {
      window.location.href = "https://kristal.ai/";
    } else {
      const time = calculateTimeDifference(landingTime);
      analytics("GTC_USAGE_TIME", { time_spent: time });
      analytics("GTC_CTA_CLICKED", { time_spent: time, CTA: "back" });
      if (plateform) {
        setUserJourneyBtnActionName("Save Changes");
      } else {
        // redirect to back
        navigate(-1);
      }
    }
  };

  const dashboardHandler = () => {
    if (plateform) {
      const time = calculateTimeDifference(landingTime);
      analytics("GTC_USAGE_TIME", { time_spent: time });
      analytics("GTC_CTA_CLICKED", {
        time_spent: time,
        CTA: "Skip to dashboard",
      });
    }
    setUserJourneyBtnActionName("Skip to dashboard");
    // if (userDetails && userDetails?.kycStatus === 'APPROVED') {
    //   if (typeof window != 'undefined') {
    //     window.location.href = '/portfolio/dashboard';
    //   }
    // } else {
    //   localStorage?.setItem('currentDashboardPage', 2);
    //   if (typeof window != 'undefined') {
    //     window.location.href = '/portfolio/start';
    //   }
    // }
  };

  return (
    <div>
      {plateform ? (
        <Row className={`flex space-between`}>
          <Col className="flex column-center pointer" onClick={backHandler}>
            <img src={typeof backBtn === "object" ? backBtn.src : backBtn} />
            <span className="margin-left-20 bold font-size-16 line-height-22 text-3761C8">Back</span>
          </Col>

          {plateform && userDetails?.kycStatus === "DRAFT" && (
            <Col className="flex end">
              <button className="transparent-btn-header pointer" onClick={dashboardHandler}>
                Skip to Dashboard
              </button>
            </Col>
          )}
          {/* {!plateform && !rmEditable && !rmLevel && (
          <Col className="flex end">
            <Button type="primary" className="fill-btn-header" onClick={editHandler}>
              Edit
            </Button>
          </Col>
        )}
        {!plateform && rmEditable && !rmLevel && (
          <Col className="flex end">
            <Button type="primary" className="transparent-btn-header-rm" onClick={saveChangesHandler}>
              Save Changes
            </Button>
          </Col>
        )} */}
        </Row>
      ) : (
        <>
          <Row className="rm-header flex  column-center">
            <Col span={12} className="flex column-center">
              <div>
                <ArrowLeftOutlined style={{ fontSize: "20px", color: "#777777" }} className="pointer" onClick={backHandler} />
              </div>
              <Divider type="vertical" className="space-left long" style={{ height: "24px", borderColor: "#CCCCCC" }} />
              <span className="header-title space-left long">Goal-based Target-return Calculator</span>
            </Col>
            {!rmEditable && !rmLevel && (
              <Col span={12} style={{ textAlign: "right" }}>
                <Button type="primary" shape="round" onClick={editHandler} className="default-btn">
                  Edit
                </Button>
              </Col>
            )}
            {rmEditable && !rmLevel && (
              <Col span={12} style={{ textAlign: "right" }}>
                <Button shape="round" onClick={saveChangesHandler} className="primary-btn">
                  Save Changes
                </Button>
              </Col>
            )}
          </Row>
        </>
      )}
      <CommonModal analytics={analytics} upgradeAccreditedRequestHandlerForGBC={upgradeAccreditedRequestHandlerForGBC} />
    </div>
  );
};

export default BackHeader;
