import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
// @ts-ignore
import { chinaMapConfig } from './config';
import geoJson from './china.json';
// @ts-ignore
import { resData } from './data';

export interface PieChartDataItem {
  name: string;
  value: number;
}

export interface PieChartProps {
  data?: PieChartDataItem[];
  height?: number;
}

const MapChart = (props: PieChartProps) => {
  const { height } = props;
  const ref = useRef<any>(null);
  let mapInstance: any = null;

  const renderMap = () => {
    const renderedMapInstance = echarts.getInstanceByDom(ref.current);
    if (renderedMapInstance) {
      mapInstance = renderedMapInstance;
    } else {
      mapInstance = echarts.init(ref.current);
    }
    mapInstance.setOption(
      chinaMapConfig(),
    );
  };

  useEffect(() => {
    echarts.registerMap('china', { geoJSON: geoJson });
    renderMap();
  }, []);

  useEffect(() => {
    window.onresize = function () {
      mapInstance.resize();
    };
    return () => {
      mapInstance && mapInstance.dispose();
    };
  }, []);

  return (
    <div style={{ width: '100%', height: (height || 0) - 100 }} ref={ref} />
  );
};

export default MapChart;
