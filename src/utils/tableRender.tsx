import dayjs from 'dayjs';
import _ from 'lodash';
import { Tag, Switch, Tooltip } from 'antd';
import { Tag as AntdTag } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import {
  ASSEMBLY_TYPE_MAP,
  METHOD_DICT,
  ASSEMBLY_STATUS_MAP,
  APP_GROUP_SWITCH_STATUS_DICT,
  ASSEMBLY_SYSTEM_TYPE_MAP,
  SWITCH_MONITOR_STATUS_DICT, DRILL_TYPE_DICT,
} from '@/common/constants';

/**
 * 表格 index 列渲染函数
 * @param index
 * @param currentPage
 * @param pageSize
 */
export const indexRender = (index: number, currentPage: number, pageSize: number) => {
  return (currentPage - 1) * pageSize + index + 1;
};

/**
 * 表格时间列渲染函数
 * @param date
 */
export const dateTimeRender = (date: string) => {
  return date ? dayjs(date).format('YYYY-MM-DD HH:mm') : '—';
};


/**
 * 表格 Tag 列渲染函数
 * @param tags
 */
export const tagRender = (tags: string[] | string) => {
  if (_.isEmpty(tags)) return '—';
  const tagColors = [
    'blue',
    'cyan',
    'lime',
    'gold',
    'volcano',
    'magenta',
    'geekblue',
    'red',
    'orange',
    'yellow',
    'green',
    'purple',
  ];
  const tagList = typeof tags === 'string' ? tags.split(',') : tags;
  return tagList.map((tag, index) => (
    <Tag key={tag} color={tagColors[index % tagColors.length]}>{tag.trim()}</Tag>
  ));
};

/**
 * 请求方法渲染
 * @param value
 */
export const methodRender = (value: string) => {
  return <Tag color={METHOD_DICT[value].color}>{METHOD_DICT[value].label}</Tag>;
};

/**
 * 状态列渲染
 */
export const statusAntdTagRender = (value: number) => {
  const statusDict = {
    '1': { color: 'red', label: '异常' },
    '0': { color: 'green', label: '正常' },
  };
  const currentStatus = statusDict?.[`${value}`];
  return currentStatus ? <AntdTag color={currentStatus.color}>{currentStatus.label}</AntdTag> : '—';
};

export const statusTagRender = (value: number) => {
  const statusDict = {
    '0': { color: 'grey', label: '未发布' },
    '1': { color: 'green', label: '已发布' },
  };
  const currentStatus = statusDict?.[`${value || 0}`];
  return currentStatus ? <Tag color={currentStatus.color}>{currentStatus.label}</Tag> : '—';
};

export const statusRender = (value: number) => {
  const currentStatus = APP_GROUP_SWITCH_STATUS_DICT?.[`${value || 0}`];
  return currentStatus ? <Tag color={currentStatus.color}>{currentStatus.label}</Tag> : '—';
};

export const statusTextRender = (value: number) => {
  const currentStatus = APP_GROUP_SWITCH_STATUS_DICT?.[`${value || 0}`];
  return currentStatus ? <span style={{ color: currentStatus.colorHex }}>{currentStatus.label}</span> : '—';
};

export const switchMonitorStatusRender = (value: number) => {
  const currentStatus = SWITCH_MONITOR_STATUS_DICT[value] || SWITCH_MONITOR_STATUS_DICT['其它'];
  return value && currentStatus ? <span style={{ color: currentStatus.color }}>{value}</span> : '—';
};


/**
 * 切换开关
 * @param value
 * @param callback
 */
export const switchRender = (value: number, callback: (checked?: boolean) => void) => {
  return <Switch checked={value === 1} onChange={callback}/>;
};


/**
 * 遍历列表，如果没有render属性则判空显示“—”
 * @param columns
 */
export const convertColumns = (columns: ColumnProps<any>[]) => {
  return _.cloneDeep(columns).map(column => {
    if (!column.render) {
      column.render = (text) => {
        return text || text === 0 ? text : '—';
      };
    }
    return column;
  });
};

/**
 * 溯源详情字段渲染
 * @param value
 */
export const traceFieldRender = (value: string | boolean | number) => {
  if (typeof value === 'boolean') {
    return value ? '是' : '否';
  }
  if (typeof value === 'number') {
    return statusAntdTagRender(value);
  }
  return value ? value : '—';
};

export const ellipsisRender = (value: string, length = 20) => value && value.length >= length ? (
  <Tooltip title={value}>{value.slice(0, length)}...</Tooltip>
) : value || '—';

/**
 * 组件类型字段
 * @param value
 */
export const assemblyTypeRender = (value: string) => {
  return ASSEMBLY_TYPE_MAP[value] || '—';
};

/**
 * 系统类型字段
 * @param value
 */
export const systemTypeRender = (value: string) => {
  return ASSEMBLY_SYSTEM_TYPE_MAP[value] || '—';
};

// ASSEMBLY_STATUS_MAP
export const assemblyStatusRender = (value: string) => {
  return ASSEMBLY_STATUS_MAP[value] || '—';
};

/**
 * 方向切换
 */
export const switchMonitorDirectionRender = (value: number) => {
  // value中如果包含=>或者->，则将其拆分并为：XXXX图片组件XXXX
  if (value && (value?.toString()?.includes('=>') || value?.toString()?.includes('->'))) {
    const arr = value?.toString()?.includes('=>')
      ? value?.toString()?.split('=>')
      : value?.toString()?.split('->');
    return (
      <span>
        {arr[0]}
        <img
          src='/static/screen/icon_arrow.png'
          style={{ width: '36px', height: '20px', margin: '0 5px 0 0', transform: 'translateY(6px)' }}
          alt="=>"
        />
        {arr[1]}
      </span>
    );
  } else {
    return value || '—';
  }
};

/**
 * 空值判断
 * @param value
 */
export const emptyRender = (value: any) => {
  return !value && !(value === 0 || value === false) ? '—' : value;
};


/**
 * 演练方式
 */
export const drillTypeRender = (value: number) => {
  // DRILL_TYPE_DICT
  const result = DRILL_TYPE_DICT[value];
  return result ? <span style={{ color: result.color }}>{result.label}</span> : '—';
};
