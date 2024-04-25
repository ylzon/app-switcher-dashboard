import React from 'react';
import { ModalProps } from 'antd';
import { Modal, Spin, Empty } from 'antd';
import TableView from '@/pages/Dashboard/components/TableView';
import styles from './index.module.less';
import _ from 'lodash';

interface IProps extends ModalProps {
  type?: 'log' | 'table';
  data?: unknown;
  title?: string;
  columns?: unknown;
  loading?: boolean;
}

const DetailModal: React.FC<IProps> = (props) => {
  const {
    type = 'table',
    data = [],
    columns = [],
    loading = false,
    ...restProps
  } = props;
  const Table = (
    <TableView
      data={!_.isEmpty(data) && _.isArray(data) ? data : []}
      columns={columns}
      loading={loading}
      tableHeight={600}
    />
  );
  const LogView = (
    <div className={styles.logView}>
      <Spin spinning={loading}>
        {_.isEmpty(data) ? <Empty type="data" /> : <pre>{data}</pre>}
      </Spin>
    </div>
  );
  return (
    <Modal
      width="70%"
      destroyOnClose
      footer={false}
      className={styles.detailModal}
      styles={{
        body: {
          padding: 16,
          minHeight: 'calc(100vh - 450px)'
        }
      }}
      {...restProps}
    >
      {type === 'table' ? Table : LogView}
    </Modal>
  );
};

export default DetailModal;
