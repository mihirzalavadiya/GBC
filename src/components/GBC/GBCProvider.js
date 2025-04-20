import React, { useState } from "react";
import GBCcontext from "./GBCcontext";
import { defaultAnswerObj } from "../gbc-container/slider-component/utils";

const GBCProvider = (props) => {
  const [currency, setCurrency] = useState("USD");
  const [answersObj, setAnswersObj] = useState({ ...defaultAnswerObj });
  const [blurLeftSection, setBlurLeftSection] = useState(false);
  const [viewMoreDeatils, setViewMoreDetails] = useState(false);
  const [plateform, setPlateform] = useState(false);
  const [calculateReturns, setCalculateReturns] = useState({});
  const [modalRateofReturn, setModalRateofReturn] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const [userJourneyBtnActionName, setUserJourneyBtnActionName] = useState("");
  const [rmEditable, setRmEditable] = useState(false);
  const [rmLevel, setRmLevel] = useState(false);
  const [apiBaseUrl, setApiBaseUrl] = useState("https://dev.kristal.ai");
  const [showPopup, setShowPopup] = useState(false);
  const [minimumReturnPercentage, setMinimumReturnPercentage] = useState(null);
  const [maximumReturnPercentage, setMaximumReturnPercentage] = useState(null);
  const [landingTime, setLandingTime] = useState(null);

  const gbcContext = {
    currency,
    setCurrency,
    answersObj,
    setAnswersObj,
    blurLeftSection,
    setBlurLeftSection,
    viewMoreDeatils,
    setViewMoreDetails,
    plateform,
    setPlateform,
    calculateReturns,
    setCalculateReturns,
    modalRateofReturn,
    setModalRateofReturn,
    userDetails,
    setUserDetails,
    userJourneyBtnActionName,
    setUserJourneyBtnActionName,
    rmEditable,
    setRmEditable,
    rmLevel,
    setRmLevel,
    apiBaseUrl,
    setApiBaseUrl,
    showPopup,
    setShowPopup,
    minimumReturnPercentage,
    setMinimumReturnPercentage,
    maximumReturnPercentage,
    setMaximumReturnPercentage,
    landingTime,
    setLandingTime,
  };

  return <GBCcontext.Provider value={gbcContext}>{props.children}</GBCcontext.Provider>;
};

export default GBCProvider;
