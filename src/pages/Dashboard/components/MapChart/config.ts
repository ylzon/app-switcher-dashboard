export const chinaMapConfig = () => {
  const mockData: any = [
    {
      name: '北京',
      value: [116.24, 39.55, 100],
    },
    {
      name: '广州',
      value: [115.07, 23.81, 100],
    },
    {
      name: '佛山',
      value: [113.12, 23.02, 100],
    },
  ];
  let labelData = [
    {
      name: '异地中心',
      coords: [
        [116.24, 39.55, 100],
        [101.36, 43.71, 100],
      ], // 线条位置[开始位置，结束位置]
      value: [1021, 120],
    },
    {
      name: '同城中心',
      coords: [
        [115.07, 23.81, 100],
        [108.26, 32.14, 100],
      ], // 线条位置[开始位置，结束位置]
      value: [1021, 120],
    },
    {
      name: '生产中心',
      coords: [
        [113.12, 23.02, 100],
        [81.93, 29.46, 100],
      ], // 线条位置[开始位置，结束位置]
      value: [1021, 120],
    },
  ];
  return {
    /*backgroundColor: '#000f1e',*/
    geo: {
      map: 'china',
      aspectScale: 0.85,
      layoutCenter: ['50%', '50%'], //地图位置
      layoutSize: '100%',
      itemStyle: {
        normal: {
          shadowColor: '#000959',
          shadowOffsetX: 4,
          shadowOffsetY: 15,
          opacity: 1,
        },
        emphasis: {
          areaColor: 'red',
        },
      },
      regions: [{
        name: '南海诸岛',
        itemStyle: {
          normal: {
            opacity: 0,
          },
        },
      }],
    },
    series: [
      // 常规地图
      {
        type: 'map',
        mapType: 'china',
        aspectScale: 0.85,
        layoutCenter: ['50%', '50%'], //地图位置
        layoutSize: '100%',
        zoom: 1, //当前视角的缩放比例
        // roam: true, //是否开启平游或缩放
        scaleLimit: { //滚轮缩放的极限控制
          min: 1,
          max: 2,
        },
        itemStyle: {
          normal: {
            areaColor: '#0224AB',
            borderColor: '#59b7ff',
            borderWidth: 1,
            borderCap: 'round',
            shadowColor: 'rgba(74,117,241,0.5)',
            shadowBlur: 20,
            shadowOffsetX: 10,
            shadowOffsetY: -10,
            label: {
              color: '#fff',
            },
          },
          emphasis: {
            areaColor: '#031BAE',
            label: {
              color: '#fff',
            },
          },
        },
      },
      // 区域散点图
      {
        type: 'effectScatter',
        coordinateSystem: 'geo',
        zlevel: 2,
        symbolSize: 10,
        rippleEffect: { //坐标点动画
          period: 3,
          scale: 5,
          brushType: 'fill',
        },
        label: {
          normal: {
            show: false,
            position: 'right',
            formatter: '{b}',
            color: '#b3e2f2',
            fontWeight: 'bold',
            fontSize: 16,
          },
        },

        data: mockData,
        itemStyle: { //坐标点颜色
          normal: {
            show: true,
            color: '#5CF6B8',
            shadowBlur: 20,
            shadowColor: '#fff',
          },
          emphasis: {
            areaColor: '#54E9B6',
          },
        },

      },
      {
        type: 'lines',
        zlevel: 3,
        symbol: 'circle',
        symbolSize: [5, 5],
        color: '#ff8003',
        opacity: 1,
        label: {
          show: true,
          padding: [12, 12],
          color: '#fff',
          backgroundColor: '#011a74',
          borderColor: '#0797E1',
          borderWidth: 1,
          borderRadius: 0,
          fontWeight: 'bold',
          fontSize: 13,
          formatter(params: any) {
            let arr = [
              `[ ${params.name} ]`,
              '切换总数：' + params.value[1] + '   切换总数：' + params.value[1] + '   切换失败：' + params.value[1],
              '　审批中：' + params.value[0] + '  　切换中：' + params.value[1] + '   　已完成：' + params.value[1],
            ];
            return arr.join('\n');
          },
          // formatter: '自定义标签内容',
          // dom: document.getElementById('pointBJ'),
          textStyle: {
            align: 'left',
            lineHeight: 20,
          },
        },
        lineStyle: {
          type: 'dashed',
          color: '#0FE2E6',
          width: 2,
          opacity: 0.8,
        },
        data: labelData,
      },
    ],
  };
};


