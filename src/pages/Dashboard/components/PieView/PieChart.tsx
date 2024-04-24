import React, { useRef } from 'react';
import ReactECharts from 'echarts-for-react';
import { getLinearGradientLayout } from '@/utils/utils';
import { IProps } from '@/pages/Dashboard/components/PieView';

function PieChart2(props: IProps) {
  const { data } = props;
  const echartRef = useRef<any>(null);
  const total = data?.applicationGroupSwitchCount || 0;
  const nnSameSpaceCount = data?.nnSameSpaceCount || 0;
  const sameSpaceCount = data?.sameSpaceCount || 0;
  const dataList = [
    { x: '同城', y: sameSpaceCount, color: '#341cd4', color2: 'rgba(52,28,212,0.6)' },
    { x: '异地', y: nnSameSpaceCount, color: '#04c5fd', color2: 'rgba(4,197,253,0.3)' },
  ];
  const layout = getLinearGradientLayout(dataList);
  const seriesData: any = dataList.map((item, index) => {
    return {
      value: item.y,
      name: item.x,
      itemStyle: {
        borderRadius: [  // 设置每个角的圆角半径
          30, 30, 30, 30,  // 左上角、右上角
          0, 0, 30, 30,   // 右下角、左下角
        ],
        color: {
          type: 'linear',
          // 获取线性渐变的'x', 'x2', 'y', 'y2'的位置
          ...layout[index],
          colorStops: [{
            offset: 1, color: 'rgba(49,27,205,0)',
          }, {
            offset: 0, color: item.color,
          }],
          globalCoord: true, // 缺省为 false
        },
      },
    };
  });

  const seriesPieData: any = dataList.map((item, index) => {
    return {
      value: item.y,
      name: item.x,
      itemStyle: {
        borderRadius: [  // 设置每个角的圆角半径
          30, 30, 30, 30,  // 左上角、右上角
          0, 0, 30, 30,   // 右下角、左下角
        ],
        color: {
          type: 'linear',
          // 获取线性渐变的'x', 'x2', 'y', 'y2'的位置
          ...layout[index],
          colorStops: [{
            offset: 1, color: 'rgba(49,27,205,0)',
          }, {
            offset: 0.09, color: item.color2,
          }, {
            offset: 0.08, color: 'rgba(49,27,205,0)',
          }, {
            offset: 0, color: 'rgba(49,27,205,0)',
          }],
          globalCoord: true, // 缺省为 false
        },
      },
    };
  });
  const option = {
    title: {
      text: total,
      textStyle: {
        color: '#DFE3ED',
        fontSize: 36,
        fontWeight: 'bold',
        lineHeight: 40,
        textShadowColor: 'rgba(32,253,210,0.9)', // 文字阴影颜色
        textShadowBlur: 16, // 文字阴影模糊大小
        textShadowOffsetX: 0, // 文字阴影水平偏移量
        textShadowOffsetY: 0, // 文字阴影垂直偏移量
      },
      subtext: '群组总数',
      subtextStyle: {
        color: '#B7D7EF',
        fontSize: 12,
      },
      itemGap: 0,
      left: 'center',
      top: '23%',
    },
    series: [
      // 数值
      {
        type: 'pie',
        radius: ['60%', '80%'],
        center: ['50%', '50%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center',
        },
        emphasis: {
          label: {
            show: false,
          },
        },
        labelLine: {
          show: false,
        },
        data: seriesData,
      },
      // 装饰用的外圈环线
      {
        type: 'pie',
        radius: ['85%', '87.5%'],
        center: ['50%', '50%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center',
        },
        emphasis: {
          label: {
            show: false,
          },
        },
        labelLine: {
          show: false,
        },
        data: seriesPieData,
      },
    ],
  };
  return (
    <ReactECharts
      option={option}
      ref={echartRef}
      style={{ height: '100%', width: '100%' }}
      onEvents={{
        click: (params: any) => {
          props?.onClick?.({
            belongCenterOrder: params.name === '同城' ? 1 : 2,
          });
        },
      }}
    />
  );
}

export default PieChart2;
