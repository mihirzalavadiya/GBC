import React, { useContext, useMemo } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useState } from 'react';
import { EditOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import GBCcontext from '../../../GBC/GBCcontext';
import { colorMapping } from '../utils';
import RateOfReturnModal from './rateOfReturnModal';

const PieChart = ({ analytics }) => {
  const {
    calculateReturns,
    setModalRateofReturn,
    rmEditable,
    userDetails,
    rmLevel,
    plateform,
  } = useContext(GBCcontext);

  const { rateOfReturn, modelPortfolio } = calculateReturns || {};
  const { assetAllocation } = modelPortfolio || {};

  assetAllocation?.sort((a, b) => {
    if (a?.assetClass === 'Equity') {
      return -1; // Move "Equity" to the beginning
    } else if (b?.assetClass === 'Equity') {
      return 1; // Move "Equity" to the end
    } else {
      return 0; // Preserve the relative order of other asset classes
    }
  });

  const transformedData =
    assetAllocation &&
    assetAllocation?.map((item) => [
      item?.assetClass,
      item?.allocationPercent * 100,
    ]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const colorOutput = transformedData
    ? assetAllocation
        ?.map((item) => {
          const { assetClass } = item;
          const colorObj = colorMapping?.find(
            (obj) => obj?.assetClass === assetClass
          );
          return colorObj ? colorObj?.color : null;
        })
        ?.filter((color) => color !== null)
    : ['#777777'];

  const options = useMemo(
    () => ({
      chart: {
        plotBackgroundColor: 'transparent',
        backgroundColor: 'transparent',
      },
      colors: colorOutput,
      legend: {
        align: 'center',
        verticalAlign: 'bottom',
        layout: 'horizontol',
        x: 10,
        y: 100,
        padding: 3,
        backgroundColor: 'transparent',
        itemMarginTop: 0,
        itemMarginBottom: 0,
        marginBottom: 0,
        itemStyle: {
          color: '#fff',
          cursor: 'pointer',
          fontSize: '12px',
          fontWeight: 'bold',
          textOverflow: 'ellipsis',
          opacity: '0.8',
        },
        itemHoverStyle: {
          color: '#fff',
          cursor: 'pointer',
          fontSize: '12px',
          fontWeight: 'bold',
          textOverflow: 'ellipsis',
          opacity: '1',
        },
        labelFormatter: function () {
          return `<div class="d-flex"><div>${
            this.name
          } -</div> <div>${this.percentage.toFixed(2)}%</div></div>`;
        },
      },
      title: {
        text: ``,
        align: 'center',
        verticalAlign: 'middle',
      },
      // You can handle the value displayed on hover over the chart from here
      tooltip: {
        pointFormat: '',
      },
      // --------------------------------------------------------------------
      accessibility: {
        point: {
          valueSuffix: '%',
        },
      },
      plotOptions: {
        series: {
          borderRadius: '6px',
          dataLabels: {
            enabled: true, // enable data labels for all series
          },
          colorByPoint: true,
          shadow: {
            color: '#1F1F1F',
            borderColor: 'transparent',
            width: 5,
            opacity: 1,
            offsetX: 0,
            offsetY: 0,
          },
        },
        pie: {
          showInLegend: true,
          borderWidth: '3px', // set the width of the border
          borderColor: '#1F1F1F',
          dataLabels: {
            enabled: false,

            style: {
              fontWeight: 'bold',
              color: 'white',
            },
          },
          point: {
            events: {
              mouseOver: function () {},
              mouseOut: function () {},
            },
          },
          center: ['50%', '50%'],
          size: '100%',
        },
      },
      series: [
        {
          type: 'pie',
          name: 'Browser share',
          innerSize: '85%',
          data: transformedData || [['Asset Not Available', 100]],
        },
      ],
    }),
    [colorOutput, transformedData]
  );

  return (
    <div className="pie-chart-conatiner">
      {/* <div className="pie-chart-effect"> */}
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        allowChartUpdate
        containerProps={{ style: { height: '100%' } }}
      />
      {/* </div> */}
      <div id="container"></div>
      <div id="legend-container"></div>
      <div
        id="containerData"
        className="containerData"
        style={plateform ? {} : { width: '100%' }}
      >
        <div className="chart-percentage">
          {rateOfReturn ? rateOfReturn?.toFixed(1) : 0.0}
          <span className="chart-percent-sign">%</span>
        </div>
        {plateform ? (
          <div className="chart-text">Annual Target Rate of Return</div>
        ) : (
          <div className="chart-text">Annual Target Rate of Return</div>
        )}
        {(rmLevel || (userDetails && userDetails.kycStatus === 'APPROVED')) && (
          <div className="btn-shadow-eefect">
            <Button
              className="chart-edit-btn"
              disabled={!rmEditable}
              onClick={() => setModalRateofReturn(true)}
            >
              <EditOutlined /> Input Target
            </Button>
          </div>
        )}
      </div>
      <RateOfReturnModal analytics={analytics} />
    </div>
  );
};

export default PieChart;
