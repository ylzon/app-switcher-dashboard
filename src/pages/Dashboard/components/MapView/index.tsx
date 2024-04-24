import classNames from 'classnames';
import React from 'react';
// @ts-ignore
import styles from './index.module.less';
import { SwitchMonitorCountData } from '@/stores/SwitchMonitorScreenType';

export interface IProps {
  data?: SwitchMonitorCountData;
  onClick?: (itemParams: any) => void;
}

const MapView: React.FC<IProps> = ({ data, onClick }) => {
  const keyDict = [
    { key: 'unSameSpaceCenter', className: 'pointBJ', type: 2 },
    { key: 'sameSpaceCenter', className: 'pointGZ', type: 1 },
    { key: 'produceSpaceCenter', className: 'pointFS', type: 3 },
  ];
  const onItemClick = (belongCenterOrder: number, status: number) => {
    if (onClick) {
      onClick({
        belongCenterOrder,
        applicationGroupStatus: status,
      });
    }
  };
  return (
    <div className={styles.mapView}>
      <div className={styles.mapBg}/>
      {keyDict.map(({ key, className, type }) => {
        const item = data?.[key];
        return (
          <div className={classNames([styles.point, styles[className]])} key={key}>
            <div className={styles.row}>
              <div
                className={classNames([styles.count, styles.blue])}
                onClick={() => onItemClick(type, -1)}
              >
                <span className={styles.countName}>切换总数</span>
                <span className={styles.countValue}>{item?.switchTotal}</span>
              </div>
              <div
                className={classNames([styles.count, styles.white])}
                onClick={() => onItemClick(type, 0)}
              >
                <span className={styles.countName}>未切换</span>
                <span className={styles.countValue}>{item?.notSwitchCount}</span>
              </div>
              <div
                className={classNames([styles.count, styles.red])}
                onClick={() => onItemClick(type, 5)}
              >
                <span className={styles.countName}>切换失败</span>
                <span className={styles.countValue}>{item?.switchFailCount}</span>
              </div>
            </div>
            <div className={styles.row}>
              <div
                className={classNames([styles.count, styles.yellow])}
                onClick={() => onItemClick(type, 1)}
              >
                <span className={styles.countName}>审批中</span>
                <span className={styles.countValue}>{item?.underApprovalCount}</span>
              </div>
              <div
                className={classNames([styles.count, styles.cyan])}
                onClick={() => onItemClick(type, 3)}
              >
                <span className={styles.countName}>切换中</span>
                <span className={styles.countValue}>{item?.switchingCount}</span>
              </div>
              <div
                className={classNames([styles.count, styles.green])}
                onClick={() => onItemClick(type, 4)}
              >
                <span className={styles.countName}>切换完成</span>
                <span className={styles.countValue}>{item?.switchOverCount}</span>
              </div>

            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MapView;
