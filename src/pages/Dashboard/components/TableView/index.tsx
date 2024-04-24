import React from 'react';
import { Table } from 'antd';
import styles from './index.module.less';

interface IProps {
  title?: string;
  columns?: unknown[];
  data?: unknown[];
  rowKey?: string;
  loading?: boolean;
  tableHeight?: number;
  onRowClick?: (itemParams: unknown) => void;
}

const TableView: React.FC<IProps> = (props) => {
  const { title = '', columns = [], data = [], rowKey = 'id', loading = false, onRowClick } = props;
  const getRowClassName = (record: Record<string, unknown>, index: number) => {
    let className = styles.lightRow;
    // record 中有status字段 或者 executeStatus字段 或者 applicationGroupStatus字段，而且值有可能为0，需要用_.isEmpty判断
    const status = record?.status || record?.status === 0
      ? record.status
      : record?.executeStatus || record?.executeStatus === 0
        ? record.executeStatus
        : record?.applicationGroupStatus || record?.applicationGroupStatus === 0
          ? record.applicationGroupStatus
          : undefined;
    if ((title && ['切换阶段'].includes(title)) && (status || status === 0)) {
      const dict: Record<string, string> = {
        '未开始': styles.greyRow + ' greyRow',
        '运行中': styles.cyanRow + ' cyanRow',
        '已完成': styles.greenRow + ' greenRow',
        '已超时': styles.yellowRow + ' yellowRow',
        '错误': styles.redRow + ' redRow',
        '0': styles.greyRow + ' greyRow',
        '1': styles.cyanRow + ' cyanRow',
        '2': styles.redRow + ' redRow',
        '3': styles.blueRow + ' blueRow',
        '4': styles.greenRow + ' greenRow',
        '5': styles.redRow + ' redRow',
        // 状态：0未切换 1审批中 2已驳回 3切换中 4切换完成 5切换失败（-1全部）
      };
      className = status && dict[status as string] ? dict[status as string] : styles.greyRow + ' greyRow';
    } else if (title && ['告警信息'].includes(title)) {
      className = styles.redRow + ' redRow';
    } else if (index % 2 === 1) {
      className = styles.darkRow;
    }
    return className;
  };
  return (
    <div className={styles.tableView}>
      <Table
        size="small"
        rowKey={rowKey}
        pagination={false}
        rowClassName={getRowClassName}
        columns={columns}
        dataSource={data}
        loading={loading}
        scroll={{ y: props?.tableHeight || 300 }}
        onRow={(record) => {
          return {
            onClick: () => {
              onRowClick && onRowClick({
                systemId: record?.systemId,
                stepState: record?.stepState,
                stepId: record?.stepId,
              });
            }
          };
        }}
      />
    </div>
  );
};

export default TableView;
