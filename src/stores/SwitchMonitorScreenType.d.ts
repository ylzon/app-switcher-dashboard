/**
 * ==== 2 根据时间窗口查询应用群组情况/异地中心/生产中心/同城中心/切换阶段情况 ====
 */

// 请求参数类型
export interface GetSwitchMonitorCountRequest {
  beginTime: string; // 开始时间
  endTime: string; // 结束时间
}

// 中心数量类型
export interface CenterCountResponse {
  centerOrder: number; // 中心序号
  centerName: string; // 中心名称
  switchTotal: number; // 切换总数
  notSwitchCount: number; // 未切换数量
  switchingCount: number; // 切换中数量
  switchOverCount: number; // 切换完成数量
  underApprovalCount: number; // 审批中数量
  rejectedCount: number; // 已驳回数量
  switchFailCount: number; // 切换失败数量
}

// 应用群组情况类型
export interface SwitchMessageResponse {
  applicationGroupSwitchCount: number; // 应用群组总数
  nnSameSpaceCount: number; // 异地数量
  sameSpaceCount: number; // 同城数量
}

// 切换阶段情况类型
export interface SwitchCountResponse {
  switchTotal: number; // 切换总数
  notSwitchCount: number; // 未切换数量
  switchingCount: number; // 切换中数量
  switchOverCount: number; // 切换完成数量
  underApprovalCount: number; // 审批中数量
  rejectedCount: number; // 已驳回数量
  switchFailCount: number; // 切换失败数量
}

export interface SwitchMonitorCountData { // 数据部分可能存在的集合类型
    switchMessageResponse: SwitchMessageResponse; // 应用群组情况
    unSameSpaceCenter: CenterCountResponse; // 异地中心
    sameSpaceCenter: CenterCountResponse; // 同城中心
    produceSpaceCenter: CenterCountResponse; // 生产中心
    switchCountResponse: SwitchCountResponse; // 切换阶段情况
}

// 返回结果类型
export interface GetSwitchMonitorCountResponse {
  code?: string; // 返回码，可选
  message?: string; // 返回信息，可选
  data?: SwitchMonitorCountData
}

/**
 * ==== 3 详情：点击应用群组情况/异地中心/生产中心/同城中心/切换阶段情况 ====
 */
export interface ApplicationGroupSwitchDto {
  /** id */
  id: string;
  /** 群组id: 关联 */
  applicationGroupId: string;
  /** 群组名称 */
  applicationGroupName: string;
  /** 群组描述 */
  applicationGroupDescription: string;
  /** 管理者id */
  managerId: string;
  /** 管理者名称 */
  managerName: string;
  /** 演练方式（1桌面演练 2真实演练） */
  drillingMethod?: 1 | 2;
  /** 群组状态（0未切换 1审批中 2已驳回 3切换中 4切换完成 5切换失败） */
  applicationGroupStatus?: number;
  /** 审批人id */
  approveId?: string;
  /** 审批人名称 */
  approveName?: string;
  /** 驳回意见 */
  approveResult?: string;
  /** 当前登陆用户id */
  currentUserId?: string;
  /** 关联群组启动任务的id */
  taskId?: number;
  /** 群组启动任务id */
  workId?: string;
  /** 所属中心 */
  belongCenter?: string;
}

export type ClickSwitchMonitorCountRequest = {
  /** 同城中心/广州中心1  异地中心/北京中心2  生产中心/佛山中心3 */
  belongCenterOrder?: 0 | 1 | 2 | 3;
  /** 状态：0未切换 1审批中 2已驳回 3切换中 4切换完成 5切换失败（-1全部） */
  applicationGroupStatus?: -1 | 0 | 1 | 2 | 3 | 4 | 5;
  /** 开始日期字符串 */
  beginTime: string;
  /** 结束日期字符串 */
  endTime: string;
}

export interface ClickSwitchMonitorCountResponse {
  /** 返回码 */
  code: string;
  /** 返回信息 */
  message: string;
  /** 所有应用群组的信息 */
  data: ApplicationGroupSwitchDto[];
}


/**
 * ==== 4 应用系统切换情况 ====
 */
export interface SystemSwitchResponse {
  /** 正在切换系统id */
  systemId: string;
  /** 系统名称 */
  syetemName: string;
  /** 切换方向名称 */
  switchName: string;
  /** 任务id */
  workId: string;
  /** 切换耗时 */
  timeout: string;
  /** 系统开始时间 */
  startTime: string;
  /** 状态 */
  status: string;
}

export type GetSystemSwitchMessageRequest = {
  /** 开始日期字符串 */
  beginTime: string;
  /** 结束日期字符串 */
  endTime: string;
}

export interface GetSystemSwitchMessageResponse {
  /** 返回码 */
  code: string;
  /** 返回信息 */
  message: string;
  /** 所有应用系统的切换情况 */
  data: SystemSwitchResponse[];
}


/**
 * ==== 5 点击系统切换，查看子步骤执行情况 ====
 */
export interface ClickSystemSwitchMessageRequest {
  systemId: string; // 应用系统id
}

export interface SystemSwitchStepResponse {
  stepId?: string; // 步骤id
  switchName?: string; // 切换方向
  stepOrder?: number; // 步骤标识
  stepState?: number; // 顺序步骤
  dependenceId?: string; // 依赖
  stepName?: string; // 子步骤名称
  stepDescription?: string; // 子步骤描述
  stepType?: number; // 类型
  ireminfo?: string; // 提醒内容
  timeout?: string; // 耗时
  executeStatus?: string; // 执行状态
  executeResult?: string; // 执行结果
}

export interface ClickSystemSwitchMessageResponse {
  code?: string; // 返回码
  message?: string; // 返回信息
  data?: SystemSwitchStepResponse[]; // 数据
}

/**
 * ==== 6. 切换阶段 ====
 */
export interface GetStateSwitchMessageRequest {
  beginTime: string; // 开始时间
  endTime: string; // 结束时间
}

export interface SwitchStateMessageResponse {
  sysyemId?: string; // 系统id
  stepState?: number; // 阶段id
  stateName?: string; // 阶段名称:系统名称+阶段+阶段id
  timeout?: string; // 阶段耗时
  status?: string; // 状态
}

export interface GetStateSwitchMessageResponse {
  code?: string; // 返回码
  message?: string; // 返回信息
  data?: SwitchStateMessageResponse[]; // 数据
}

/**
 * ==== 7 点击阶段情况，查看相关子步骤详情 ====
 */
export interface ClickStateSwitchMessageRequest {
  /** 阶段id */
  stepState: number;
  /** 应用系统id */
  systemId: string;
}

export interface StateSwitchMessageResponse {
  /** 步骤id */
  stepId: string;
  /** 切换方向 */
  switchName: string;
  /** 步骤标识 */
  stepOrder: number;
  /** 顺序步骤 */
  stepState: number;
  /** 依赖 */
  dependenceId: string;
  /** 子步骤名称 */
  stepName: string;
  /** 子步骤描述 */
  stepDescription: string;
  /** 类型 */
  stepType: number;
  /** 提醒内容 */
  ireminfo: string;
  /** 耗时 */
  timeout: string;
  /** 执行状态 */
  executeStatus: string;
  /** 执行结果 */
  executeResult: string;
}

export interface ClickStateSwitchMessageResponse {
  /** 返回码 */
  code?: string;
  /** 返回信息 */
  message?: string;
  /** 数据 */
  data?: StateSwitchMessageResponse[];
}


/**
 * ==== 8 查看总体进度 ====
 */
export interface GetOverProcessMessageRequest {
  /** 开始时间 */
  beginTime: string;
  /** 结束时间 */
  endTime: string;
}

export interface OverProcessMessageResponse {
  /** 进度 */
  processRate?: string;
  /** 耗时 */
  timeout?: string;
}

export interface GetOverProcessMessageResponse {
  /** 返回码 */
  code?: string;
  /** 返回信息 */
  message?: string;
  /** 数据 */
  data?: OverProcessMessageResponse;
}

/**
 * ==== 9 查看组件/子步骤执行情况 ====
 */
export interface GetAssemblySwitchMessageRequest {
  /** 开始时间 */
  beginTime?: string;
  /** 结束时间 */
  endTime?: string;
}

export interface SwitchAssemblyMessageResponse {
  /** 子步骤id */
  stepId: string;
  /** 执行id */
  flowId: string;
  /** 组件名称/子步骤名称 */
  stepName: string;
  /** 步骤序号 */
  stepOrder: number;
  /** 所属系统 */
  systemName: string;
  /** 切换阶段 */
  stepStateName: string;
  /** 切换方向 */
  switchName: string;
  /** 执行用户 */
  executeUser: string;
  /** 到达时间 */
  arriveTime: Date | null;
  /** 状态 */
  status: string;
}

export interface GetAssemblySwitchMessageResponse {
  /** 返回码 */
  code?: string;
  /** 返回信息 */
  message?: string;
  /** 数据 */
  data?: SwitchAssemblyMessageResponse[];
}

/**
 * ==== 10 点击组件/子步骤执行情况 ====
 */
export interface ClickAssemblySwitchMessageRequest {
  /** 子步骤id */
  stepId: string;
}

export interface ClickAssemblySwitchMessageResponse {
  /** 返回码 */
  code?: string;
  /** 返回信息 */
  message?: string;
  /** 数据 */
  data?: string;
}

/**
 * ==== 11 查看告警信息 ====
 */
export interface GetAlertSwitchMessageRequest {
  /** 开始时间 */
  beginTime: string;
  /** 结束时间 */
  endTime: string;
}

export interface SwitchAlertMessageResponse {
  /** 子步骤id */
  stepId: string;
  /** 组件名称/子步骤名称 */
  stepName: string;
  /** 所属系统 */
  systemName: string;
  /** 告警时间 */
  alertTime: Date | null;
}

export interface GetAlertSwitchMessageResponse {
  /** 返回码 */
  code?: string;
  /** 返回信息 */
  message?: string;
  /** 数据 */
  data?: SwitchAlertMessageResponse[];
}


/**
 * ==== 12 点击告警信息 ====
 */
export interface ClickAlertSwitchMessageRequest {
  /** 子步骤id */
  stepId: string;
}

export interface ClickAlertSwitchMessageResponse {
  /** 返回码 */
  code?: string;
  /** 返回信息 */
  message?: string;
  /** 数据 */
  data?: string;
}


export default {
  GetSwitchMonitorCountRequest,
  CenterCountResponse,
  SwitchMessageResponse,
  SwitchCountResponse,
  SwitchMonitorCountData,
  GetSwitchMonitorCountResponse,
  ApplicationGroupSwitchDto,
  ClickSwitchMonitorCountRequest,
  ClickSwitchMonitorCountResponse,
  SystemSwitchResponse,
  GetSystemSwitchMessageRequest,
  GetSystemSwitchMessageResponse,
  ClickSystemSwitchMessageRequest,
  SystemSwitchStepResponse,
  ClickSystemSwitchMessageResponse,
  GetStateSwitchMessageRequest,
  SwitchStateMessageResponse,
  GetStateSwitchMessageResponse,
  ClickStateSwitchMessageRequest,
  StateSwitchMessageResponse,
  ClickStateSwitchMessageResponse,
  GetOverProcessMessageRequest,
  OverProcessMessageResponse,
  GetOverProcessMessageResponse,
  GetAssemblySwitchMessageRequest,
  SwitchAssemblyMessageResponse,
  GetAssemblySwitchMessageResponse,
  ClickAssemblySwitchMessageRequest,
  ClickAssemblySwitchMessageResponse,
  GetAlertSwitchMessageRequest,
  SwitchAlertMessageResponse,
  GetAlertSwitchMessageResponse,
  ClickAlertSwitchMessageRequest,
  ClickAlertSwitchMessageResponse,
}
