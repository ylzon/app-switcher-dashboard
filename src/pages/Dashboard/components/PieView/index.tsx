import React from 'react';
import PieChart from './PieChart';
// @ts-ignore
import styles from './index.module.less';
import classNames from 'classnames';
import { SwitchMessageResponse } from '@/stores/SwitchMonitorScreenType';

export interface IProps {
  data?: SwitchMessageResponse;
  onClick?: (params: any) => void;
}

const PieView: React.FC<IProps> = ({ data, onClick }) => {
  return (
    <div className={styles.pieView}>
      <div className={styles.left}>
        <PieChart data={data} onClick={onClick} />
      </div>
      <div className={styles.right}>
        <div className={styles.total}>
          应用群组总数 {data?.applicationGroupSwitchCount || 0}
        </div>
        <div className={styles.legend}>
          <span className={classNames([styles.item, styles.cyan])}>异地: {data?.nnSameSpaceCount || 0}</span>
          <span className={classNames([styles.item, styles.purple])}>同城: {data?.sameSpaceCount || 0}</span>
        </div>
      </div>
    </div>
  );
};

export default PieView;
