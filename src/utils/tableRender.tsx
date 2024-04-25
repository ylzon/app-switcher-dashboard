import {
  ASSEMBLY_TYPE_MAP,
  APP_GROUP_SWITCH_STATUS_DICT,
  SWITCH_MONITOR_STATUS_DICT, DRILL_TYPE_DICT,
} from '@/common/constants';



export const statusTextRender = (value: number) => {
  const currentStatus = APP_GROUP_SWITCH_STATUS_DICT?.[`${value || 0}`];
  return currentStatus ? <span style={{ color: currentStatus.colorHex }}>{currentStatus.label}</span> : '—';
};

export const switchMonitorStatusRender = (value: keyof typeof SWITCH_MONITOR_STATUS_DICT) => {
  const currentStatus = SWITCH_MONITOR_STATUS_DICT[value] || SWITCH_MONITOR_STATUS_DICT['其它'];
  return value && currentStatus ? <span style={{ color: currentStatus.color }}>{value}</span> : '—';
};

/**
 * 组件类型字段
 * @param value
 */
export const assemblyTypeRender = (value: keyof typeof ASSEMBLY_TYPE_MAP) => {
  return ASSEMBLY_TYPE_MAP[value] || '—';
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
export const emptyRender = (value: unknown) => {
  return !value && !(value === 0 || value === false) ? '—' : value;
};


/**
 * 演练方式
 */
export const drillTypeRender = (value: keyof typeof DRILL_TYPE_DICT) => {
  // DRILL_TYPE_DICT
  const result = DRILL_TYPE_DICT[value];
  return result ? <span style={{ color: result.color }}>{result.label}</span> : '—';
};
