import classNames from 'classnames';
import React, {useEffect, useRef} from 'react';
import styles from './index.module.less';
import {DatePicker} from 'antd';
// Icon
import {useFullscreen, useRafInterval} from 'ahooks';
import {SwitchMonitorScreenState, useSwitchMonitorScreenStore} from '@/stores/SwitchMonitorScreen';
import MapView from './components/MapView';
import PieView from '@/pages/Dashboard/components/PieView';
import TableView from '@/pages/Dashboard/components/TableView';
import ProgressView from '@/pages/Dashboard/components/ProgressView';
import PieView2 from '@/pages/Dashboard/components/PieView2';
import dayjs, { Dayjs } from 'dayjs';
import Clock from '@/components/Clock';
import { ClockCircleOutlined } from '@ant-design/icons';
import {switchMonitorColumn, switchMonitorModalColumn} from '@/pages/Dashboard/utils/getColumn';
import {
  ClickAlertSwitchMessageRequest, ClickAssemblySwitchMessageRequest, ClickStateSwitchMessageRequest,
  ClickSwitchMonitorCountRequest, ClickSystemSwitchMessageRequest,
} from '@/stores/SwitchMonitorScreenType';
import DetailModal from '@/pages/Dashboard/components/DetailModal';
import {useWindowSize} from '@/hooks/useWindowSize.ts';

const {RangePicker} = DatePicker;

const Dashboard = () => {
  const ref = useRef(null);
  const [isFullscreen, {toggleFullscreen}] = useFullscreen(ref);
  /* eslint-disable @typescript-eslint/no-unused-vars */
  const [_, height] = useWindowSize();
  const now = new Date().getTime();
  // 默认开始时间是当前时间-12小时，结束时间：当前时间+12 小时
  const [timeRange, setTimeRange] = React.useState<number[]>([now - 12 * 60 * 60 * 1000, now + 12 * 60 * 60 * 1000]);
  const [modalVisible, setModalVisible] = React.useState<boolean>(false);
  const [modalData, setModalData] = React.useState<Record<string, unknown> | null>(null);
  const [modalTitle, setModalTitle] = React.useState<string>('');
  const [modalColumns, setModalColumns] = React.useState<[]>([]);
  const modalType = modalTitle === '组件切换详情' || modalTitle === '告警详情' ? 'log' : 'table';
  const tableHeight = (isFullscreen ? height + 64 : height) / 8 * 3 - 162;
  const {
    // state
    switchMonitorCountData,
    systemSwitchMessageData,
    stateSwitchMessageData,
    overProcessMessageData,
    assemblySwitchMessageData,
    alertSwitchMessageData,
    // loading
    clickSwitchMonitorCountLoading,
    clickSystemSwitchMessageLoading,
    clickStateSwitchMessageLoading,
    clickAssemblySwitchMessageLoading,
    clickAlertSwitchMessageLoading,
    // method
    getSwitchMonitorCount,
    getClickSwitchMonitorCount,
    getSystemSwitchMessage,
    getClickSystemSwitchMessage,
    getStateSwitchMessage,
    getClickStateSwitchMessage,
    getOverProcessMessage,
    getAssemblySwitchMessage,
    getClickAssemblySwitchMessage,
    getAlertSwitchMessage,
    getClickAlertSwitchMessage,
  } = useSwitchMonitorScreenStore((state: SwitchMonitorScreenState) => state);

  useEffect(() => {
    loadData();
  }, [timeRange[0], timeRange[1]]);

  useRafInterval(() => {
    if (modalVisible) return;
    loadData();
  }, 3000);

  const loadData = () => {
    const params = {
      beginTime: `${timeRange[0]}`,
      endTime: `${timeRange[1]}`,
    };
    getSwitchMonitorCount(params);
    getSystemSwitchMessage(params);
    getStateSwitchMessage(params);
    getOverProcessMessage(params);
    getAssemblySwitchMessage(params);
    getAlertSwitchMessage(params);
  };

  const onOk = (dates: unknown) => {
    setTimeRange(dates.map((date: Dayjs) => parseInt(date.format('x'))));
  };

  const onItemClick = async (type: 'count' | 'system' | 'state' | 'assembly' | 'alert', itemParams) => {
    let params = {};
    let data: any = null;
    setModalVisible(true);
    switch (type) {
      case 'count':
        params = {
          beginTime: `${timeRange[0]}`,
          endTime: `${timeRange[1]}`,
          ...itemParams,
        };
        data = await getClickSwitchMonitorCount(params as ClickSwitchMonitorCountRequest);
        await setModalData(data);
        await setModalTitle('应用切换详情');
        await setModalColumns(switchMonitorModalColumn.count);
        break;
      case 'system':
        params = {...itemParams};
        data = await getClickSystemSwitchMessage(params as ClickSystemSwitchMessageRequest);
        await setModalData(data);
        await setModalTitle('应用系统切换详情');
        await setModalColumns(switchMonitorModalColumn.assembly);
        break;
      case 'state':
        params = {...itemParams};
        data = await getClickStateSwitchMessage(params as ClickStateSwitchMessageRequest);
        await setModalData(data);
        await setModalTitle('状态阶段详情');
        await setModalColumns(switchMonitorModalColumn.assembly);
        break;
      case 'assembly':
        params = {...itemParams};
        data = await getClickAssemblySwitchMessage(params as ClickAssemblySwitchMessageRequest);
        await setModalData(data);
        await setModalTitle('组件切换详情');
        await setModalColumns(switchMonitorModalColumn.assembly);
        break;
      case 'alert':
        params = {...itemParams};
        data = await getClickAlertSwitchMessage(params as ClickAlertSwitchMessageRequest);
        await setModalData(data);
        await setModalTitle('告警详情');
        await setModalColumns(switchMonitorModalColumn.count);
        break;
      default:
        break;
    }
  };

  return (
    <div
      ref={ref}
      style={{
        height: isFullscreen ? height + 64 : height,
        // minHeight: window.screen.height,
      }}
      className={styles.dashboard}
    >
      <div className={styles.header}>
        <h1 className={styles.title}>应用切换大屏展示</h1>
        <div className={styles.left}>
          <span
            className={classNames(styles.fullscreen, {[styles.active]: isFullscreen})}
            onClick={toggleFullscreen}
          />
          <span className={styles.time}>
            <ClockCircleOutlined /> <Clock/>
          </span>
        </div>
        <div className={styles.right}>
          <span className={styles.rangePicker}>
            <RangePicker
              defaultValue={[
                dayjs(timeRange[0]),
                dayjs(timeRange[1]),
              ]}
              format="YYYY-MM-DD"
              placeholder={['开始时间', '结束时间']}
              onChange={onOk}
              needConfirm={false}
              allowClear={false}
              getPopupContainer={() => ref?.current}
            />
          </span>
        </div>
      </div>
      <div className={styles.container}>
        <div className={classNames([styles.block, styles.map])}>
          <MapView
            data={switchMonitorCountData}
            onClick={data => onItemClick('count', data)}
          />
        </div>
        <div className={classNames([styles.block, styles.block1])}>
          <h2 className={styles.title}>应用群组情况</h2>
          <div className={styles.content}>
            <PieView
              data={switchMonitorCountData?.switchMessageResponse}
              onClick={data => onItemClick('count', data)}
            />
          </div>
        </div>
        <div className={classNames([styles.block, styles.block2])}>
          <h2 className={styles.title}>应用系统切换情况</h2>
          <div className={styles.content}>
            <TableView
              title="应用系统切换情况"
              columns={switchMonitorColumn.system}
              data={systemSwitchMessageData}
              rowKey="systemId"
              onRowClick={data => onItemClick('system', data)}
              tableHeight={tableHeight}
            />
          </div>
        </div>
        <div className={classNames([styles.block, styles.block3])}>
          <h2 className={styles.title}>切换阶段</h2>
          <div className={styles.content}>
            <TableView
              title="切换阶段"
              columns={switchMonitorColumn.state}
              data={stateSwitchMessageData}
              rowKey="systemId"
              onRowClick={data => onItemClick('state', data)}
              tableHeight={tableHeight}
            />
          </div>
        </div>
        <div className={classNames([styles.block, styles.block4])}>
          <h2 className={styles.title}>组件切换详情</h2>
          <div className={styles.content}>
            <TableView
              title="组件切换详情"
              columns={switchMonitorColumn.assembly}
              data={assemblySwitchMessageData}
              rowKey="stepId"
              onRowClick={data => onItemClick('assembly', data)}
              tableHeight={tableHeight}
            />
          </div>
        </div>
        <div className={classNames([styles.block, styles.block5])}>
          <h2 className={styles.title}>告警信息</h2>
          <div className={styles.content}>
            <TableView
              title="告警信息"
              columns={switchMonitorColumn.alert}
              data={alertSwitchMessageData}
              rowKey="stepId"
              onRowClick={data => onItemClick('alert', data)}
              tableHeight={tableHeight}
            />
          </div>
        </div>
        <div className={classNames([styles.block, styles.block6])}>
          <h2 className={styles.title}>切换阶段情况</h2>
          <div className={styles.content}>
            <PieView2
              data={switchMonitorCountData?.switchCountResponse}
              onClick={data => onItemClick('count', data)}
            />
          </div>
        </div>
        <div className={classNames([styles.block, styles.block7])}>
          <h2 className={styles.title}>总体进度</h2>
          <div className={styles.content}>
            <ProgressView
              data={overProcessMessageData}
            />
          </div>
        </div>
      </div>
      <DetailModal
        data={modalData || []}
        type={modalType}
        title={modalTitle || '详情'}
        open={modalVisible}
        columns={modalColumns}
        getContainer={() => ref?.current as any}
        onCancel={() => {
          setModalVisible(false);
          setModalData([]);
          setModalColumns([]);
          setModalTitle('');
        }}
        loading={
          clickSwitchMonitorCountLoading ||
          clickSystemSwitchMessageLoading ||
          clickStateSwitchMessageLoading ||
          clickAssemblySwitchMessageLoading ||
          clickAlertSwitchMessageLoading
        }
      />
    </div>
  );
};

export default Dashboard;
