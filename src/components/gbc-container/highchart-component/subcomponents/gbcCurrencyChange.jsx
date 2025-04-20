import { Col, Row } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import GBCcontext from '../../../GBC/GBCcontext';
import useMediaQueryCustom from '../../../GBC/useMediaQueryCustome';
import { LeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { calculateTimeDifference } from '../utils';

const GbcCurrencyChange = ({ analytics }) => {
  const {
    currency,
    viewMoreDeatils,
    setViewMoreDetails,
    plateform,
    setUserJourneyBtnActionName,
    landingTime,
    userDetails,
  } = useContext(GBCcontext);
  const { isMobile, isTablet } = useMediaQueryCustom();
  let navigate = useNavigate();
  const [backShow, setBackShow] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlData = window.location.href;
      const arrayOfUrl = urlData && urlData.split('?');
      const paramData = arrayOfUrl && arrayOfUrl.slice(-1);
      console.log('paramData', paramData);
      if (paramData && paramData[0] === 'value=signup') {
        setBackShow(false);
      }
    }
  }, []);

  const mobileBackHandler = () => {
    const time = calculateTimeDifference(landingTime);
    analytics('GTC_USAGE_TIME', { time_spent: time });
    analytics('GTC_CTA_CLICKED', { time_spent: time, CTA: 'back' });
    if (viewMoreDeatils) {
      console.log('hello12345');
      setViewMoreDetails(false);
    } else {
      if (plateform) {
        console.log('hello123456');
        setUserJourneyBtnActionName('Save Changes');
      } else {
        navigate(-1);
      }
    }
  };

  return (
    <Row
      className={`flex column-center ${
        !viewMoreDeatils && 'padding-left-16 padding-top-16 padding-right-16'
      } `}
    >
      <Col md={16} sm={16} xs={20}>
        {console.log(
          'viewMoreDeatils',
          viewMoreDeatils,
          backShow,
          userDetails,
          Object.keys(userDetails || {})?.length > 0
        )}
        {(backShow || viewMoreDeatils) &&
          Object.keys(userDetails || {})?.length > 0 && (
            <LeftOutlined
              className={`margin-right-10 font-size-${isMobile ? '15' : '20'}`}
              style={{ color: '#ffffff' }}
              onClick={mobileBackHandler}
            />
          )}
        <span className="title">Goal-based Target-return Calculator</span>
      </Col>
      <Col md={8} sm={8} xs={4} className="flex end column-center">
        {!isMobile && !isTablet && (
          <span className="currency-label">Currency :</span>
        )}
        <span className="currency-value">{currency}</span>
      </Col>
    </Row>
  );
};

export default GbcCurrencyChange;
