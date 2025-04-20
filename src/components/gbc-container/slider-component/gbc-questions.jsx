import Icon, {
  DownOutlined,
  InfoCircleOutlined,
  MinusOutlined,
  PlusOutlined,
  UpOutlined,
} from '@ant-design/icons';
import {
  Button,
  Col,
  Collapse,
  Divider,
  Input,
  InputNumber,
  Row,
  Select,
  Slider,
  Tooltip,
} from 'antd';
import React, { useCallback, useContext, useEffect } from 'react';
import {
  calculatingData,
  defaultAnswerObj,
  formatCurrency,
  formatNumberWithCommas,
  mockCalculateReturns,
  numberFormat,
  questionsContainers,
} from './utils';
import GBCcontext from '../../GBC/GBCcontext';
import lock from '../../images/lock.svg';
import useMediaQueryCustom from '../../GBC/useMediaQueryCustome';
import { calculateReturnsApi } from '../../GBC/service';
import UserJourney from '../highchart-component/subcomponents/userJourney';
import upArrow from '../../images/upArrow.svg';
import downArrow from '../../images/downArrow.svg';
import useCalculatorBtn from '../../images/useCalculatorBtn.svg';
import useCalcRM from '../../images/useCalcRM.svg';
import { debounce } from 'lodash';

const { Panel } = Collapse;

const PlusIcon = () => {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 1V9"
        stroke="#363636"
        stroke-width="1.53846"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M1 5H9"
        stroke="#363636"
        stroke-width="1.53846"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

const MinusIcon = () => {
  return (
    <svg
      width="10"
      height="2"
      viewBox="0 0 10 2"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 1H9"
        stroke="#363636"
        stroke-width="1.53846"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

const GBCQuestions = ({
  upgradeAccreditedRequestHandlerForGBC,
  sendByOkReq,
  analytics,
  baseUrl,
}) => {
  const {
    currency,
    setCurrency,
    blurLeftSection,
    setBlurLeftSection,
    answersObj,
    setAnswersObj,
    plateform,
    setCalculateReturns,
    userDetails,
    rmEditable,
    apiBaseUrl,
    setMinimumReturnPercentage,
    setMaximumReturnPercentage,
    rmLevel,
  } = useContext(GBCcontext);
  const { isMobile, isTablet } = useMediaQueryCustom();

  useEffect(() => {
    if (answersObj && answersObj.numberOfChildren === 0) {
      setAnswersObj({
        ...answersObj,
        child1Age: 0,
        child2Age: 0,
        child3Age: 0,
        univCost: 0,
      });
    } else if (answersObj && answersObj.numberOfChildren === 1) {
      setAnswersObj({
        ...answersObj,
        child2Age: 0,
        child3Age: 0,
      });
    } else if (answersObj && answersObj.numberOfChildren === 2) {
      setAnswersObj({
        ...answersObj,
        child3Age: 0,
      });
    } else if (answersObj && answersObj.numberOfChildren > 3) {
      setAnswersObj({
        ...answersObj,
        child1Age: 0,
        child2Age: 0,
        child3Age: 0,
        univCost: 0,
      });
    }
  }, [answersObj?.numberOfChildren]);

  const debouncedCalculate = useCallback(
    debounce((answers) => {
      const response = mockCalculateReturns(answers);
      console.log('answersObj1', response);

      setCalculateReturns(response);
      setMinimumReturnPercentage(
        response?.modelPortfolio?.minimumReturnPercentage
      );
      setMaximumReturnPercentage(
        response?.modelPortfolio?.maximumReturnPercentage
      );
    }, 500),
    []
  );

  useEffect(() => {
    const getData = setTimeout(() => {
      if (answersObj && !blurLeftSection) {
        if (answersObj) {
          debouncedCalculate(answersObj);
          // const response = mockCalculateReturns(answersObj);
          // setCalculateReturns(response);
          // setMinimumReturnPercentage(
          //   response?.modelPortfolio?.minimumReturnPercentage
          // );
          // setMaximumReturnPercentage(
          //   response?.modelPortfolio?.maximumReturnPercentage
          // );
        } else {
          setCalculateReturns(calculatingData);
          setMinimumReturnPercentage(
            calculatingData?.modelPortfolio?.minimumReturnPercentage
          );
          setMaximumReturnPercentage(
            calculatingData?.modelPortfolio?.maximumReturnPercentage
          );
        }
        // calculateReturnsApi(answersObj, baseUrl, userDetails, plateform)
        //   ?.then((data) => {
        //     setCalculateReturns(data?.data);
        //     setMinimumReturnPercentage(data?.data?.modelPortfolio?.minimumReturnPercentage);
        //     setMaximumReturnPercentage(data?.data?.modelPortfolio?.maximumReturnPercentage);
        //   })
        //   .catch((error) => {
        //     console.log("errorData", error);
        //   });
      }
    }, 1000);
    return () => clearTimeout(getData);
  }, [answersObj, blurLeftSection]);

  const collapseHeader = (title) => {
    return (
      <>
        <div className="flex column-center">
          <span className="panel-title">{title}</span>
          <div
            style={{
              border: '1px solid black',
              flexGrow: '1',
              marginTop: '3px',
            }}
            className="space-left  space-right"
          ></div>
        </div>
      </>
    );
  };

  return (
    <Row
      className={
        isMobile
          ? 'questions-container flex column-center'
          : 'questions-container flex column-center'
      }
    >
      <Col
        span={24}
        style={isMobile ? { padding: '0px 16px' } : { padding: '32px' }}
      >
        {!isMobile && !isTablet && (
          <Row gutter={[24]} className="flex column-center">
            <Col md={15} sm={16} xs={20}>
              <span className="title">Goal-based Target-return Calculator</span>
            </Col>
            <Col md={9} sm={8} xs={4} className="flex end column-center">
              {!isMobile && <span className="currency-label">Currency :</span>}
              <span className="currency-value">{currency}</span>
            </Col>
          </Row>
        )}
        <Row
          className={!isMobile && !isTablet ? 'space-top' : ''}
          style={{ position: 'relative' }}
        >
          <Col span={24}>
            <Collapse
              className={`questions-collapse-panel ${
                plateform && 'questions-portal-panel'
              } ${userDetails && !plateform && 'padding-bottom-20'}`}
              style={{ borderColor: 'transparent' }}
              expandIconPosition={'end'}
              defaultActiveKey={[0]}
              expandIcon={(panelProp) => {
                const { isActive } = panelProp || {};
                if (isActive) {
                  return (
                    <img
                      src={typeof upArrow === 'object' ? upArrow.src : upArrow}
                    />
                  );
                } else {
                  return (
                    <img
                      src={
                        typeof downArrow === 'object'
                          ? downArrow.src
                          : downArrow
                      }
                    />
                  );
                }
              }}
            >
              {(questionsContainers || []).map(
                ({ title, questions }, index) => {
                  return (
                    <Panel
                      header={collapseHeader(title)}
                      key={index}
                      className={index == 0 ? '' : 'margin-top-16'}
                    >
                      {(questions || []).map(
                        (
                          {
                            question,
                            type,
                            addonBefore,
                            marks,
                            min,
                            max,
                            postfix,
                            key,
                            toolTipData,
                          },
                          idx
                        ) => {
                          if (
                            key === 'child1Age' &&
                            ((answersObj &&
                              answersObj['numberOfChildren'] <= 0) ||
                              (answersObj &&
                                answersObj['numberOfChildren'] > 3))
                          ) {
                            return null;
                          }
                          if (
                            key === 'child2Age' &&
                            ((answersObj &&
                              answersObj['numberOfChildren'] <= 1) ||
                              (answersObj &&
                                answersObj['numberOfChildren'] > 3))
                          ) {
                            return null;
                          }
                          if (
                            key === 'child3Age' &&
                            ((answersObj &&
                              answersObj['numberOfChildren'] <= 2) ||
                              (answersObj &&
                                answersObj['numberOfChildren'] > 3))
                          ) {
                            return null;
                          }
                          if (type === 'number') {
                            return (
                              <Row
                                className={
                                  idx == 0
                                    ? 'flex column-center'
                                    : 'flex column-center space-top'
                                }
                              >
                                <Col md={15} sm={15} xs={14}>
                                  <div className="flex column-center">
                                    <span className="question">
                                      {question}
                                      {toolTipData && (
                                        <Tooltip
                                          placement="top"
                                          title={toolTipData}
                                        >
                                          <InfoCircleOutlined className="margin-left-6 question-info-icon" />
                                        </Tooltip>
                                      )}
                                    </span>
                                  </div>
                                </Col>
                                <Col md={9} sm={9} xs={10} className="flex end">
                                  <div
                                    className="flex column-center space-around no-wrap"
                                    style={{ width: '100%' }}
                                  >
                                    <Button
                                      className="inc-dnc-btn"
                                      onClick={() => {
                                        setAnswersObj({
                                          ...answersObj,
                                          [key]:
                                            answersObj && answersObj[key] == 0
                                              ? 0
                                              : answersObj &&
                                                answersObj[key] - 1,
                                        });
                                      }}
                                      disabled={!rmEditable}
                                    >
                                      <span className="inc-btn">
                                        <Icon component={MinusIcon} />
                                      </span>
                                    </Button>
                                    <InputNumber
                                      className="space-left space-right short"
                                      style={{ textAlign: 'center' }}
                                      value={answersObj && answersObj[key]}
                                      controls={false}
                                      type="number"
                                      disabled={!rmEditable}
                                      min={0}
                                      max={max}
                                      onChange={(val) =>
                                        setAnswersObj({
                                          ...answersObj,
                                          [key]:
                                            key === 'currentAge' ||
                                            key === 'retirementAge'
                                              ? Math.floor(val)
                                              : val,
                                        })
                                      }
                                      onWheel={() => {
                                        document?.activeElement?.blur();
                                      }}
                                    />
                                    <Button
                                      className="inc-dnc-btn"
                                      onClick={() => {
                                        if (
                                          answersObj &&
                                          answersObj[key] >= max
                                        ) {
                                          return null;
                                        }
                                        setAnswersObj({
                                          ...answersObj,
                                          [key]:
                                            answersObj && answersObj[key] + 1,
                                        });
                                      }}
                                      disabled={!rmEditable}
                                    >
                                      <span className="inc-btn">
                                        <Icon component={PlusIcon} />
                                      </span>
                                    </Button>
                                  </div>
                                </Col>
                              </Row>
                            );
                          }
                          if (type === 'slider') {
                            const dif = max - min;
                            return (
                              <Row
                                className={
                                  idx == 0
                                    ? 'flex column-center'
                                    : 'flex column-center space-top'
                                }
                              >
                                <Col md={16} sm={15} xs={12}>
                                  <div className="flex column-center">
                                    <span className="question">
                                      {question}
                                      <Tooltip
                                        placement="top"
                                        title={toolTipData}
                                      >
                                        <InfoCircleOutlined className="margin-left-6 question-info-icon" />
                                      </Tooltip>
                                    </span>
                                  </div>
                                </Col>
                                <Col md={8} sm={9} xs={12}>
                                  <div
                                    className={`flex column-center slider-input ${
                                      addonBefore
                                        ? 'input-number-container'
                                        : ''
                                    }`}
                                  >
                                    <InputNumber
                                      className="space-left space-right short"
                                      addonBefore={
                                        addonBefore ? currency : null
                                      }
                                      disabled={
                                        !rmEditable ||
                                        (title ===
                                          'Children’s University Expenses' &&
                                          ((answersObj &&
                                            answersObj['numberOfChildren'] ===
                                              0) ||
                                            (answersObj &&
                                              answersObj['numberOfChildren'] >
                                                3)))
                                      }
                                      style={{
                                        textAlign: 'center',
                                        width: '100%',
                                      }}
                                      value={answersObj && answersObj[key]}
                                      controls={false}
                                      // type="number"34
                                      min={0}
                                      max={max}
                                      formatter={(value) =>
                                        key === 'inflationRate' ||
                                        key === 'perIncInSavings'
                                          ? `${value ? value : 0}${
                                              value && '%'
                                            }`
                                          : formatNumberWithCommas(value)
                                      }
                                      parser={(value) =>
                                        key === 'inflationRate' ||
                                        key === 'perIncInSavings'
                                          ? value && value.replace('%', '')
                                          : value.replace(/[^0-9]/g, '')
                                      }
                                      onChange={(val) => {
                                        console.log('eData', val);
                                        setAnswersObj({
                                          ...answersObj,
                                          [key]:
                                            key === 'loanTenure'
                                              ? Math.floor(val)
                                              : val,
                                        });
                                      }}
                                      onWheel={() => {
                                        document?.activeElement?.blur();
                                      }}
                                    />
                                    {/* {(key === "inflationRate" || key === "perIncInSavings") && <div className="add-percentage">%</div>} */}
                                  </div>
                                </Col>
                                <Col
                                  span={24}
                                  className={
                                    plateform
                                      ? 'slider-portal-conatiner'
                                      : 'slider-rm-conatiner'
                                  }
                                >
                                  {console.log(
                                    '1hello12345',
                                    (answersObj && answersObj[key] * 100) / dif,
                                    key,
                                    dif
                                  )}
                                  {plateform ? (
                                    <Slider
                                      className="slider"
                                      marks={marks}
                                      disabled={
                                        !rmEditable ||
                                        (title ===
                                          'Children’s University Expenses' &&
                                          ((answersObj &&
                                            answersObj['numberOfChildren'] ===
                                              0) ||
                                            (answersObj &&
                                              answersObj['numberOfChildren'] >
                                                3)))
                                      }
                                      value={
                                        (answersObj && answersObj[key] * 100) /
                                        dif
                                      }
                                      onChange={(val) => {
                                        setAnswersObj({
                                          ...answersObj,
                                          [key]:
                                            key === 'loanTenure'
                                              ? Math.floor((val * dif) / 100)
                                              : ((val * dif) / 100)?.toFixed(2),
                                        });
                                      }}
                                      tipFormatter={(val) => {
                                        if (postfix) {
                                          return `${(
                                            (val * dif) /
                                            100
                                          )?.toFixed(2)}${postfix}`;
                                        }
                                        return `${
                                          key === 'loanTenure'
                                            ? Math.floor((val * dif) / 100)
                                            : numberFormat(
                                                (val * dif) / 100,
                                                null,
                                                true
                                              )
                                        }`;
                                      }}
                                      style={{ width: '97%' }}
                                      included={true}
                                      step={postfix ? 0.1 : 100 / max}
                                    />
                                  ) : (
                                    <Slider
                                      className="slider"
                                      marks={marks}
                                      disabled={
                                        !rmEditable ||
                                        (title ===
                                          'Children’s University Expenses' &&
                                          ((answersObj &&
                                            answersObj['numberOfChildren'] ===
                                              0) ||
                                            (answersObj &&
                                              answersObj['numberOfChildren'] >
                                                3)))
                                      }
                                      value={
                                        (answersObj && answersObj[key] * 100) /
                                        dif
                                      }
                                      onChange={(val) => {
                                        setAnswersObj({
                                          ...answersObj,
                                          [key]:
                                            key === 'loanTenure'
                                              ? Math.floor((val * dif) / 100)
                                              : ((val * dif) / 100)?.toFixed(2),
                                        });
                                      }}
                                      tooltip={{
                                        placement: 'bottom',
                                        formatter: (val) => {
                                          if (postfix) {
                                            return `${(
                                              (val * dif) /
                                              100
                                            )?.toFixed(2)}${postfix}`;
                                          }
                                          return `${
                                            key === 'loanTenure'
                                              ? Math.floor((val * dif) / 100)
                                              : numberFormat(
                                                  (val * dif) / 100,
                                                  null,
                                                  true
                                                )
                                          }`;
                                        },
                                      }}
                                      style={{ width: '97%' }}
                                      included={true}
                                      step={postfix ? 0.1 : 100 / max}
                                    />
                                  )}
                                </Col>
                              </Row>
                            );
                          }
                        }
                      )}
                    </Panel>
                  );
                }
              )}
            </Collapse>
          </Col>
          {blurLeftSection && (
            <Col span={24} className="question-blur-effect">
              <Row className="quetion-blur-content-main">
                <Col span={24}>
                  <img src={typeof lock === 'object' ? lock.src : lock} />
                </Col>
                <Col
                  span={24}
                  className="margin-top-12 font-size-12 line-height-18 bold text-1f1f1f"
                >
                  The calculator is locked when using a manual Target rate of
                  Returns
                </Col>
                <Col span={24} className="margin-top-14">
                  {plateform ? (
                    <img
                      src={
                        typeof useCalculatorBtn === 'object'
                          ? useCalculatorBtn.src
                          : useCalculatorBtn
                      }
                      onClick={() => {
                        // setAnswersObj(defaultAnswerObj);
                        setBlurLeftSection(false);
                      }}
                      className="pointer"
                    />
                  ) : (
                    <img
                      src={
                        typeof useCalcRM === 'object'
                          ? useCalcRM.src
                          : useCalcRM
                      }
                      onClick={() => {
                        // setAnswersObj(defaultAnswerObj);
                        setBlurLeftSection(false);
                      }}
                      className="pointer"
                    />
                  )}
                </Col>
              </Row>
            </Col>
          )}
        </Row>
      </Col>
      {(isMobile || isTablet) && plateform && (
        <Col span={24} className="margin-bottom-150 margin-top-16">
          <UserJourney
            upgradeAccreditedRequestHandlerForGBC={
              upgradeAccreditedRequestHandlerForGBC
            }
            sendByOkReq={sendByOkReq}
            analytics={analytics}
          />
        </Col>
      )}
      {(isMobile || isTablet) && !plateform && !rmLevel && (
        <>
          <div
            className="full-width flex row-center"
            style={{ padding: '0px 16px' }}
          >
            <div className="rm-client-note-mobile space-top full-width">
              <span>
                <b> Note: </b> Please view the corresponding customised
                portfolio on the user explore page
              </span>
            </div>
          </div>
        </>
      )}
    </Row>
  );
};

export default GBCQuestions;
