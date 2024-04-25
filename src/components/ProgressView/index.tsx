import classNames from 'classnames';
import React from 'react';
import styles from './index.module.less';
import { OverProcessMessageResponse } from '@/stores/SwitchMonitorScreenType';

interface IProps {
  data?: OverProcessMessageResponse;
}

const ProgressView: React.FC<IProps> = ({ data }) => {
  const progress = data?.processRate
    && !isNaN(parseFloat(data?.processRate))
    && parseFloat(data?.processRate) >= 0
    && parseFloat(data?.processRate) <= 100 ? data?.processRate : '0%';
  const time = data?.timeout || '00:00:00';
  return (
    <div className={styles.progressView}>
      <div className={styles.item}>
        <span className={styles.name}>进度: </span>
        <span className={styles.progressWrapper}>
          <span className={styles.progress}>
            <span className={styles.progressBar} style={{ width: progress }}/>
            <span className={styles.progressText} style={{ left: progress }}>{progress}</span>
          </span>
        </span>
      </div>
      <div className={styles.item}>
        <span className={styles.name}>耗时: </span>
        <span className={styles.time}>
          {time.split('').map((item, index) => {
            if (item === ':') {
              return <span key={index} className={classNames(styles.timeSplit)}>{item}</span>;
            }
            return <span key={index} className={styles.timeItem}>{item}</span>;
          })}
        </span>
      </div>
    </div>
  );
};

export default ProgressView;
