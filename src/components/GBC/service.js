import axios from "axios";
import { getHeadersRM } from "../gbc-container/highchart-component/utils";
import { getHeadersPortal } from "../gbc-container/highchart-component/utils";

function getRequest(data) {
  return axios.get(data.url, {
    headers: data.headers,
    params: data.params,
  });
}
function postRequest(data) {
  return axios.post(data.url, data.payload, {
    headers: data.headers,
    params: data.params,
  });
}

export const calculateReturnsApi = (payloadData, apiBaseUrl, userDetails, plateform) => {
  const requestParam = {
    method: "post",
    url: `${apiBaseUrl}/kristal-manager-ws/gtc/api/v1/calculateReturns`,
    headers: Object.keys(userDetails || {}).length > 0 ? (plateform ? getHeadersPortal() : getHeadersRM()) : {},

    payload: payloadData,
    // params,
  };

  return postRequest(requestParam);
};

export const getModelGivenRateApi = (params, userDetails, apiBaseUrl, plateform) => {
  const { userId } = userDetails || {};
  const requestParam = {
    method: "get",
    url: `${apiBaseUrl}/kristal-manager-ws/gtc/api/v1/getModelGivenRate`,
    headers: plateform ? getHeadersPortal() : getHeadersRM(),
    params,
  };
  return getRequest(requestParam);
};

export const getModelForAUser = (userDetails, apiBaseUrl, plateform) => {
  const { userId } = userDetails || {};
  const requestParam = {
    method: "get",
    url: `${apiBaseUrl}/kristal-manager-ws/gtc/api/v1/getModelForAUser`,
    headers: plateform ? getHeadersPortal() : getHeadersRM(),
  };
  return getRequest(requestParam);
};

export const saveParams = (answersObj, rateOfReturn, modelPortfolioId, showPopup, userDetails, apiBaseUrl, plateform) => {
  const { userId } = userDetails || {};
  const payloadData = {
    gtcFilterRequest: Object.keys(answersObj || {}).length > 0 ? answersObj : null,
    rateOfReturn: rateOfReturn,
    modelPortfolioId: modelPortfolioId,
    showPopup: showPopup === true ? false : false,
  };
  const requestParam = {
    method: "post",
    url: `${apiBaseUrl}/kristal-manager-ws/gtc/api/v1/saveParams`,
    headers: plateform ? getHeadersPortal() : getHeadersRM(),
    payload: payloadData,
  };
  return postRequest(requestParam);
};
