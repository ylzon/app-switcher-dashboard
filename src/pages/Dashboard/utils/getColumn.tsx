import {
  assemblyTypeRender,
  drillTypeRender,
  emptyRender,
  statusTextRender,
  switchMonitorDirectionRender,
  switchMonitorStatusRender,
} from '@/utils/tableRender';
export const switchMonitorColumn = {
  system: [
    { width: `${100 / 4}%`, key: 'systemName', dataIndex: 'systemName', title: '应用系统', render: emptyRender },
    { width: `${100 / 4}%`, key: 'switchName', dataIndex: 'switchName', title: '切换方向', render: switchMonitorDirectionRender },
    { width: `${100 / 4}%`, key: 'timeout', dataIndex: 'timeout', title: '切换耗时', render: emptyRender },
    { width: `${100 / 4}%`, key: 'status', dataIndex: 'status', title: '状态', render: switchMonitorStatusRender },
  ],
  state: [
    { width: `${100 / 3}%`, key: 'stateName', dataIndex: 'stateName', title: '阶段名称', render: emptyRender },
    { width: `${100 / 4}%`, key: 'timeout', dataIndex: 'timeout', title: '阶段耗时', render: emptyRender },
    { width: `${100 / 4}%`, key: 'status', dataIndex: 'status', title: '状态', render: switchMonitorStatusRender },
  ],
  assembly: [
    { width: `${100 / 7}%`, key: 'stepName', dataIndex: 'stepName', title: '组件名称', render: emptyRender },
    { width: `${100 / 7}%`, key: 'stepOrder', dataIndex: 'stepOrder', title: '步骤序号', render: emptyRender },
    { width: `${100 / 7}%`, key: 'systemName', dataIndex: 'systemName', title: '所属系统', render: emptyRender },
    { width: `${100 / 7}%`, key: 'stepStateName', dataIndex: 'stepStateName', title: '切换阶段', render: emptyRender },
    { width: `${100 / 7}%`, key: 'switchName', dataIndex: 'switchName', title: '切换方向', render: switchMonitorDirectionRender },
    { width: `${100 / 7}%`, key: 'executeUser', dataIndex: 'executeUser', title: '执行用户', render: emptyRender },
    { width: `${100 / 7}%`, key: 'status', dataIndex: 'status', title: '状态', render: switchMonitorStatusRender },
  ],
  alert: [
    { width: `${100 / 4}%`, key: 'systemName', dataIndex: 'systemName', title: '系统名称', render: emptyRender },
    { width: `${100 / 4}%`, key: 'stepName', dataIndex: 'stepName', title: '组件名称', render: emptyRender },
    { width: `${100 / 2}%`, key: 'alertTime', dataIndex: 'alertTime', title: '告警时间', render: emptyRender },
  ],
};

export const switchMonitorModalColumn = {
  count: [
    { width: `${100 / 10}%`, key: 'applicationGroupName', dataIndex: 'applicationGroupName', title: '群组名称', render: emptyRender },
    { width: `${100 / 10}%`, key: 'applicationGroupStatus', dataIndex: 'applicationGroupStatus', title: '状态', render: statusTextRender },
    { width: `${100 / 10}%`, key: 'managerName', dataIndex: 'managerName', title: '管理者名称', render: emptyRender },
    { width: `${100 / 10}%`, key: 'drillingMethod', dataIndex: 'drillingMethod', title: '演练方式', render: drillTypeRender },
    { width: `${100 / 10}%`, key: 'approveName', dataIndex: 'approveName', title: '审批人名称', render: emptyRender },
    { width: `${100 / 10}%`, key: 'approveResult', dataIndex: 'approveResult', title: '驳回意见', render: emptyRender },
    { width: `${100 / 10}%`, key: 'currentUserId', dataIndex: 'currentUserId', title: '当前登陆用户id', render: emptyRender },
    { width: `${100 / 10}%`, key: 'taskId', dataIndex: 'taskId', title: '关联任务id', render: emptyRender },
    { width: `${100 / 10}%`, key: 'workId', dataIndex: 'workId', title: '群组启动任务id', render: emptyRender },
    { width: `${100 / 10}%`, key: 'belongCenter', dataIndex: 'belongCenter', title: '所属中心', render: emptyRender },
  ],
  assembly: [ // 系统 阶段
    { width: `${100 / 11}%`, key: 'switchName', dataIndex: 'switchName', title: '切换方向', render: switchMonitorDirectionRender },
    { width: `${100 / 11}%`, key: 'stepOrder', dataIndex: 'stepOrder', title: '步骤标识', render: emptyRender },
    { width: `${100 / 11}%`, key: 'stepState', dataIndex: 'stepState', title: '顺序步骤', render: emptyRender },
    { width: `${100 / 11}%`, key: 'dependenceId', dataIndex: 'dependenceId', title: '依赖', render: emptyRender },
    { width: `${100 / 11}%`, key: 'stepName', dataIndex: 'stepName', title: '子步骤名称', render: emptyRender },
    { width: `${100 / 11}%`, key: 'stepDescription', dataIndex: 'stepDescription', title: '子步骤描述', render: emptyRender },
    { width: `${100 / 11}%`, key: 'stepType', dataIndex: 'stepType', title: '类型', render: assemblyTypeRender },
    { width: `${100 / 11}%`, key: 'ireminfo', dataIndex: 'ireminfo', title: '提醒内容', render: emptyRender },
    { width: `${100 / 11}%`, key: 'timeout', dataIndex: 'timeout', title: '耗时', render: emptyRender },
    { width: `${100 / 11}%`, key: 'executeStatus', dataIndex: 'executeStatus', title: '执行状态', render: switchMonitorStatusRender },
    { width: `${100 / 11}%`, key: 'executeResult', dataIndex: 'executeResult', title: '执行结果', render: emptyRender },
  ],
};
