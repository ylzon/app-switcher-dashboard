import React from 'react';
import PieChart2 from './PieChart';
import styles from './index.module.less';
import classNames from 'classnames';
import { APP_GROUP_SWITCH_STATUS_DICT } from '@/common/constants';
import { SwitchCountResponse } from '@/stores/SwitchMonitorScreenType';

export interface IProps {
  data?: SwitchCountResponse;
  onClick?: (params: any) => void;
}

const PieView2: React.FC<IProps> = ({ data, onClick }) => {
  return (
    <div className={styles.pieView}>
      <div className={styles.pie}>
        <PieChart2 data={data} onClick={onClick}/>
      </div>
      <div className={styles.legend}>
        {Object.keys(APP_GROUP_SWITCH_STATUS_DICT).map(key => {
          const item = APP_GROUP_SWITCH_STATUS_DICT[key];
          return (
            <div
              className={styles.legendItem}
              onClick={() => onClick?.({ applicationGroupStatus: key })}
            >
              <div
                className={classNames([styles.legendIcon])}
                style={{ background: `linear-gradient(90deg, rgba(2, 137, 251, 0) 0%, ${item.colorHex} 100%)` }}
              />
              <div className={styles.legendText}>{item.label}</div>
              <div className={styles.legendCount}>{data?.[item.field] || 0}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PieView2;
