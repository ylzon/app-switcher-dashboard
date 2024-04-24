import { useRef } from 'react';
import ReactECharts from 'echarts-for-react';
import { IProps } from '@/pages/Dashboard/components/PieView2/index';
import { APP_GROUP_SWITCH_STATUS_DICT } from '@/common/constants';
import { getLinearGradientLayout } from '@/utils/utils';

function PieChart2(props: IProps) {
  const { data } = props;
  const echartRef = useRef<any>(null);
  const layout = getLinearGradientLayout(Object.keys(APP_GROUP_SWITCH_STATUS_DICT)?.map(key => {
    const item = APP_GROUP_SWITCH_STATUS_DICT[key];
    return { x: item.label, y: data?.[item.field] || 0 };
  }));
  const seriesData: any = Object.keys(APP_GROUP_SWITCH_STATUS_DICT)?.map((key, index) => {
    const item = APP_GROUP_SWITCH_STATUS_DICT[key];
    return {
      value: data?.[item.field] || 0,
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
    series: [
      // 数值
      {
        type: 'pie',
        radius: ['45%', '70%'],
        center: ['30%', '50%'],
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
        radius: ['38%', '38.5%'],
        center: ['30%', '50%'],
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
        radius: ['76%', '76.5%'],
        center: ['30%', '50%'],
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
        click: (params: any) => {
          // 在APP_GROUP_SWITCH_STATUS_DICT中找params.name对应的key
          const key = Object.keys(APP_GROUP_SWITCH_STATUS_DICT)?.find(key => APP_GROUP_SWITCH_STATUS_DICT[key].label === params.name);
          props?.onClick?.({
            applicationGroupStatus: key,
          });
        },
      }}
    />
  );
}

export default PieChart2;
