import { useRef } from 'react';
import ReactECharts from 'echarts-for-react';
import {IProps, keyType} from '@/components/PieView2/index';
import { APP_GROUP_SWITCH_STATUS_DICT } from '@/common/constants';
import { getLinearGradientLayout } from '@/utils/utils';

function PieChart2(props: IProps) {
  const { data } = props;
  const echartRef = useRef(null);
  const pieStartRadius = 68;
  const layout = getLinearGradientLayout(Object.keys(APP_GROUP_SWITCH_STATUS_DICT)?.map(key => {
    const item = APP_GROUP_SWITCH_STATUS_DICT[key];
    return { x: item.label, y: data?.[item.field as keyType] || 0 };
  }));
  const seriesData = Object.keys(APP_GROUP_SWITCH_STATUS_DICT)?.map((key, index) => {
    const item = APP_GROUP_SWITCH_STATUS_DICT[key];
    return {
      value: data?.[item.field as keyType] || 0,
      name: item.label,
      itemStyle: {
        color: {
          type: 'linear',
          // 获取线性渐变的'x', 'x2', 'y', 'y2'的位置
          ...layout[index],
          colorStops: [{
            offset: 0, color: 'rgba(49,27,205,0.01)', // 0% 处的颜色
          }, {
            offset: 1, color: item.colorHex, // 100% 处的颜色
          }],
          globalCoord: true, // 缺省为 false
        },
      },
    };
  });
  const option = {
    tooltip: {
      trigger: 'item',
    },
    title: {
      text: seriesData.reduce((prev: number, current) => prev + current.value, 0),
      textStyle: {
        color: '#DFE3ED',
        fontSize: 40,
        fontWeight: 'bold',
        lineHeight: 40,
        textShadowColor: 'rgba(32,253,210,0.9)', // 文字阴影颜色
        textShadowBlur: 16, // 文字阴影模糊大小
        textShadowOffsetX: 0, // 文字阴影水平偏移量
        textShadowOffsetY: 0, // 文字阴影垂直偏移量
      },
      subtext: '切换总数',
      subtextStyle: {
        color: '#B7D7EF',
        fontSize: 13,
      },
      itemGap: 0,
      left: 'center',
      top: '40%',
    },
    series: [
      // 数值
      {
        type: 'pie',
        radius: [`${pieStartRadius}%`, `${pieStartRadius + 25}%`],
        center: ['50%', '50%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center',
        },
        emphasis: {
          label: {
            show: false,
            fontSize: 14,
            color: '#fff',
            fontWeight: 'bold',
          },
        },
        labelLine: {
          show: false,
        },
        data: seriesData,
      },
      // 装饰用的内圈环线
      {
        type: 'pie',
        radius: [`${pieStartRadius - 7}%`, `${pieStartRadius - 6.5}%`],
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
        data: [
          {
            value: 300,
            itemStyle: {
              color: '#023DFB',
            },
          },
        ],
      },
      // 装饰用的外圈环线
      {
        type: 'pie',
        radius: [`${pieStartRadius + 31}%`, `${pieStartRadius + 31.5}%`],
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
        data: [
          {
            value: 300,
            itemStyle: {
              color: '#023DFB',
            },
          },
        ],
      },
    ],
  };
  return (
    <ReactECharts
      option={option}
      ref={echartRef}
      style={{ height: '100%', width: '100%' }}
      onEvents={{
        click: (params: Record<string, string>) => {
          // 在APP_GROUP_SWITCH_STATUS_DICT中找params.name对应的key
          const key = Object.keys(APP_GROUP_SWITCH_STATUS_DICT)?.find(key => APP_GROUP_SWITCH_STATUS_DICT[key].label === params.name);
          props?.onClick?.({
            applicationGroupStatus: key as keyType,
          });
        },
      }}
    />
  );
}

export default PieChart2;
