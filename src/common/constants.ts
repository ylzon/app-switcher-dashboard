/**
 * 登录配置常量
 */
export const CONNECT_TYPES: string[] = ['FTP', 'SSH', 'Oracle'];
export const CONNECTS_TYPES_COLORS: Record<string, string> = {
  ssh: '#1890ff',
  ftp: '#2f54eb',
  oracle: '#f5222d',
};
export const METHOD_DICT = {
  'GET': { color: 'green', label: 'GET' },
  'POST': { color: 'blue', label: 'POST' },
  'PUT': { color: 'orange', label: 'PUT' },
  'DELETE': { color: 'red', label: 'DELETE' },
  // 'PATCH': { color: 'cyan', label: 'PATCH' },
  'HEAD': { color: 'magenta', label: 'HEAD' },
  'OPTIONS': { color: 'geekblue', label: 'OPTIONS' },
};

/**
 * 请求响应体Code类型字典
 */
export const STATUS_DICT = {
  200: { color: '#67C23A', text: 'OK' },
  400: { color: '#F56C6C', text: 'Bad Request' },
  401: { color: '#F56C6C', text: 'unauthorized' },
  403: { color: '#F56C6C', text: 'Forbidden' },
  404: { color: '#F56C6C', text: 'Not Found' },
  500: { color: '#F56C6C', text: 'Internal Server Error' },
  501: { color: '#F56C6C', text: 'Not Implemented' },
  502: { color: '#F56C6C', text: 'Bad Gateway' },
};

/**
 * 请求体类型字典
 */
export const BODY_TYPE_MAP = [
  '索引从1开始',
  'none',
  'form-data',
  'x-www-form-urlencoded',
  'raw',
  'binary',
];

/**
 * 请求体类型为Raw时的内容类型字典
 */
export const RAW_TYPE_MAP = [
  'Text',
  'JavaScript',
  'JSON',
  'HTML',
  'XML',
];

/**
 * 请求头预置字段
 */
export const REQUEST_HEADER_DICT = [
  'Cookie',
  'Accept',
  'Accept-Charset',
  'Accept-Language',
  'Accept-Datetime',
  'Authorization',
  'Cache-Control',
  'Connection',
  'Content-Length',
  'Content-MD',
  'Content-Type',
  'Date',
  'Exped',
  'From',
  'Host',
  'If-Match',
  'If-Modified-Since',
  'If-None-Match',
  'If-Range',
  'If-Unmodified-Since',
  'Max-Forwards',
  'Origin',
  'Progma',
  'Proxy-Authorization',
  'Range',
  'Referer',
  'TE',
  'User-Agent',
  'Upgrade',
  'Via',
  'Warning',
];

// export const REQUEST_BODY_TYPE_HEADER: any = {
//   'none':　'',
//   'form-data': 'multipart/form-data;',
//   'x-www-form-urlencoded': 'application/x-www-form-urlencoded',
//   'raw': {
//     'Text': 'text/plain',
//     'JavaScript': 'application/javascript',
//     'JSON': 'application/json',
//     'HTML': 'text/html',
//     'XML': 'application/xml',``
//   },
//   'binary': '',
// };

/**
 * 组件类型，传值为对应索引
 */
export const ASSEMBLY_TYPE_MAP = [
  '脚本',
  '接口',
  '人工',
];
export const ASSEMBLY_TYPE_CODE_MAP = ['shell', 'api', 'manual'];

/**
 * 组件状态
 */
export const ASSEMBLY_STATUS_MAP = [
  '待提交',
  '待审批',
  '待发布',
  '已驳回',
  '已发布',
];

/**
 * 组件系统类型，0 windows  1 unix/linux
 */
export const ASSEMBLY_SYSTEM_TYPE_MAP = [
  'Windows',
  'Unix/Linux',
];

/**
 * 群组切换列表状态
 */
export const APP_GROUP_SWITCH_STATUS_DICT: Record<string, Record<string, string>> = {
  '0': { color: 'grey', label: '未切换', colorHex: '#7ea6ea', field: 'notSwitchCount' },
  '1': { color: 'orange', label: '审批中', colorHex: '#f8d41f', field: 'underApprovalCount' },
  '2': { color: 'black', label: '已驳回', colorHex: '#cb7107', field: 'rejectedCount' },
  '3': { color: 'blue', label: '切换中', colorHex: '#025afc', field: 'switchingCount' },
  '4': { color: 'green', label: '切换完成', colorHex: '#06eb72', field: 'switchOverCount' },
  '5': { color: 'red', label: '切换失败', colorHex: '#b40205', field: 'switchFailCount' },
};

/**
 * 切换监控状态
 */
export const SWITCH_MONITOR_STATUS_DICT = {
  '未开始': { color: '#7ea6ea' },
  '运行中': { color: '#1F88DD' },
  '已完成': { color: '#06eb72' },
  '已超时': { color: '#f8d41f' },
  '错误': { color: '#b40205' },
  '其它': { color: 'grey' },

  '未切换': { color: '#7ea6ea' },
  '审批中': { color: '#f8d41f' },
  '已驳回': { color: '#cb7107' },
  '切换中': { color: '#1F88DD' },
  '切换完成': { color: '#06eb72' },
  '切换失败': { color: '#b40205' },

  'success': { color: '#06eb72' },
  'SUCCESS': { color: '#06eb72' },
  'fail': { color: '#b40205' },
  'failed': { color: '#B40405' },
  'FAILED': { color: '#b40205' },
  'processing': { color: '#1F88DD' },
};

/**
 * 演练方式
 */
export const DRILL_TYPE_DICT = {
  '1': { color: '#1F88DD', label: '桌面演练' },
  '2': { color: '#06eb72', label: '真实演练' },
};
