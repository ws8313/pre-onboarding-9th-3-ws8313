import styled from 'styled-components';
import {
  LineChart,
  Path,
  TooltipWrapper,
  TooltipLabel,
  XAxisLineWrapper,
  XAxisItem,
  YAxisItem,
  HintPoint,
  YAxisWrapper,
} from 'styled-chart';
import { useEffect, useState } from 'react';
import getData from '../api/api';
import { ChartKeyType } from '../types/dataType';

const MyTooltip = styled(TooltipWrapper)`
  background: Black;

  ${TooltipLabel} {
    font-style: italic;
  }
`;

const MyXAxisItem = styled(XAxisItem)`
  text-align: center;
  padding: 10px;
  font-size: 14px;
  font-weight: bold;
`;

const MyXAxisLineWrapper = styled(XAxisLineWrapper)`
  border-top: 2px solid gray;
`;

const MyPointer = styled(HintPoint)<{ color: string }>`
  ${({ color }) => `
    background: ${color};
  `}
`;

const MyYAxisWrapper = styled(YAxisWrapper)`
  width: 40px;
  padding: 0 8px;
  text-align: right;
  border-right: 2px solid Gray;
`;

const MyYAxisItem = styled(YAxisItem)`
  font-weight: bold;
`;

const ConversionPath = styled(Path)`
  stroke: HotPink;
`;

const BasicPath = styled(Path)`
  stroke: PaleTurquoise;
  fill: PaleTurquoise;
`;

const Charts = () => {
  // const [data, setData] = useState<ChartType[]>([]);
  const [data, setData] = useState<any>([]);

  const convertData = (data: ChartKeyType) => {
    const convertedData = [];
    const date = Object.keys(data);
    const location = Object.values(data).map((value) => value.id);
    const lineValue = Object.values(data).map((value) => value.value_area);
    const barValue = Object.values(data).map((value) => value.value_bar);

    for (let i = 0; i < date.length; i++) {
      convertedData.push({
        date: date[i],
        id: location[i],
        line_value: lineValue[i],
        bar_value: barValue[i],
      });
    }

    return convertedData;
  };

  useEffect(() => {
    getData().then((res) => {
      const chartData = convertData(res.response);

      setData(chartData);
    });
  }, []);

  console.log(data);

  return (
    <LineChart
      tooltip={{
        isVisible: true,
        component: <MyTooltip />,
        hints: {
          line_value: <MyPointer color='PaleTurquoise' />,
          bar_value: <MyPointer color='HotPink' />,
        },
      }}
      yAxis={{
        maxValue: 20000,
        minValue: 0,
        ticksNum: 5,
        sectionComponent: <MyYAxisWrapper />,
        component: <MyYAxisItem />,
      }}
      xAxis={{
        key: 'date',
        step: 15,
        component: <MyXAxisItem />,
        sectionComponent: <MyXAxisLineWrapper />,
      }}
      config={{
        bar_value: {
          label: 'bar_value',
          component: <ConversionPath />,
          isFilled: false,
        },
        line_value: {
          label: 'line_value',
          isFilled: true,
          flexure: 30,
          component: <BasicPath />,
        },
        id: {
          label: 'id',
        },
      }}
      data={data}
    />
  );
};

export default Charts;
