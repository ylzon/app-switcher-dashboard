import { create } from 'zustand';
import produce from 'immer';
import {
  getSwitchMonitorCount,
  getClickSwitchMonitorCount,
  getSystemSwitchMessage,
  getClickSystemSwitchMessage,
  getStateSwitchMessage,
  getClickStateSwitchMessage,
  getOverProcessMessage,
  getAssemblySwitchMessage,
  getClickAssemblySwitchMessage,
  getAlertSwitchMessage,
  getClickAlertSwitchMessage,
} from '@/pages/Dashboard/mock';

import type {
  GetSwitchMonitorCountRequest,
  SwitchMonitorCountData,
  ApplicationGroupSwitchDto,
  ClickSwitchMonitorCountRequest,
  SystemSwitchResponse,
  GetSystemSwitchMessageRequest,
  ClickSystemSwitchMessageRequest,
  SystemSwitchStepResponse,
  GetStateSwitchMessageRequest,
  SwitchStateMessageResponse,
  ClickStateSwitchMessageRequest,
  GetOverProcessMessageRequest,
  OverProcessMessageResponse,
  GetAssemblySwitchMessageRequest,
  SwitchAssemblyMessageResponse,
  ClickAssemblySwitchMessageRequest,
  GetAlertSwitchMessageRequest,
  SwitchAlertMessageResponse,
  ClickAlertSwitchMessageRequest,
} from '@/stores/SwitchMonitorScreenType';
import { StateSwitchMessageResponse } from '@/stores/SwitchMonitorScreenType';

const initSwitchMonitorCountData: SwitchMonitorCountData = {
  switchMessageResponse: {
    applicationGroupSwitchCount: 0,
    nnSameSpaceCount: 0,
    sameSpaceCount: 0,
  },
  unSameSpaceCenter: {
    centerOrder: 0,
    centerName: '',
    switchTotal: 0,
    notSwitchCount: 0,
    switchingCount: 0,
    switchOverCount: 0,
    underApprovalCount: 0,
    rejectedCount: 0,
    switchFailCount: 0,
  },
  sameSpaceCenter: {
    centerOrder: 0,
    centerName: '',
    switchTotal: 0,
    notSwitchCount: 0,
    switchingCount: 0,
    switchOverCount: 0,
    underApprovalCount: 0,
    rejectedCount: 0,
    switchFailCount: 0,
  },
  produceSpaceCenter: {
    centerOrder: 0,
    centerName: '',
    switchTotal: 0,
    notSwitchCount: 0,
    switchingCount: 0,
    switchOverCount: 0,
    underApprovalCount: 0,
    rejectedCount: 0,
    switchFailCount: 0,
  },
  switchCountResponse: {
    switchTotal: 0,
    notSwitchCount: 0,
    switchingCount: 0,
    switchOverCount: 0,
    underApprovalCount: 0,
    rejectedCount: 0,
    switchFailCount: 0,
  },
};

const initOverProcessMessageData: OverProcessMessageResponse = {
  processRate: '',
  timeout: '',
};


export interface SwitchMonitorScreenState {
  switchMonitorCountData: SwitchMonitorCountData;
  clickSwitchMonitorCountData: ApplicationGroupSwitchDto[];
  systemSwitchMessageData: SystemSwitchResponse[];
  clickSystemSwitchMessageData: SystemSwitchStepResponse[];
  stateSwitchMessageData: SwitchStateMessageResponse[];
  clickStateSwitchMessageData: StateSwitchMessageResponse[];
  overProcessMessageData: OverProcessMessageResponse;
  assemblySwitchMessageData: SwitchAssemblyMessageResponse[];
  clickAssemblySwitchMessageData: string;
  alertSwitchMessageData: SwitchAlertMessageResponse[];
  clickAlertSwitchMessageData: string;
  switchMonitorCountLoading: boolean;
  clickSwitchMonitorCountLoading: boolean;
  systemSwitchMessageLoading: boolean;
  clickSystemSwitchMessageLoading: boolean;
  stateSwitchMessageLoading: boolean;
  clickStateSwitchMessageLoading: boolean;
  overProcessMessageLoading: boolean;
  assemblySwitchMessageLoading: boolean;
  clickAssemblySwitchMessageLoading: boolean;
  alertSwitchMessageLoading: boolean;
  clickAlertSwitchMessageLoading: boolean;
  getSwitchMonitorCount: (params: GetSwitchMonitorCountRequest) => Promise<SwitchMonitorCountData>;
  getClickSwitchMonitorCount: (params: ClickSwitchMonitorCountRequest) => Promise<ApplicationGroupSwitchDto[]>;
  getSystemSwitchMessage: (params: GetSystemSwitchMessageRequest) => Promise<SystemSwitchResponse[]>;
  getClickSystemSwitchMessage: (params: ClickSystemSwitchMessageRequest) => Promise<SystemSwitchStepResponse[]>;
  getStateSwitchMessage: (params: GetStateSwitchMessageRequest) => Promise<SwitchStateMessageResponse[]>;
  getClickStateSwitchMessage: (params: ClickStateSwitchMessageRequest) => Promise<StateSwitchMessageResponse[]>;
  getOverProcessMessage: (params: GetOverProcessMessageRequest) => Promise<OverProcessMessageResponse>;
  getAssemblySwitchMessage: (params: GetAssemblySwitchMessageRequest) => Promise<SwitchAssemblyMessageResponse[]>;
  getClickAssemblySwitchMessage: (params: ClickAssemblySwitchMessageRequest) => Promise<string>;
  getAlertSwitchMessage: (params: GetAlertSwitchMessageRequest) => Promise<SwitchAlertMessageResponse[]>;
  getClickAlertSwitchMessage: (params: ClickAlertSwitchMessageRequest) => Promise<string>;
}

export const useSwitchMonitorScreenStore = create<SwitchMonitorScreenState>((set) => ({
  // data
  switchMonitorCountData: initSwitchMonitorCountData,
  clickSwitchMonitorCountData: [],
  systemSwitchMessageData: [],
  clickSystemSwitchMessageData: [],
  stateSwitchMessageData: [],
  clickStateSwitchMessageData: [],
  overProcessMessageData: initOverProcessMessageData,
  assemblySwitchMessageData: [],
  clickAssemblySwitchMessageData: '',
  alertSwitchMessageData: [],
  clickAlertSwitchMessageData: '',
  // loading
  switchMonitorCountLoading: false,
  clickSwitchMonitorCountLoading: false,
  systemSwitchMessageLoading: false,
  clickSystemSwitchMessageLoading: false,
  stateSwitchMessageLoading: false,
  clickStateSwitchMessageLoading: false,
  overProcessMessageLoading: false,
  assemblySwitchMessageLoading: false,
  clickAssemblySwitchMessageLoading: false,
  alertSwitchMessageLoading: false,
  clickAlertSwitchMessageLoading: false,
  // request method
  getSwitchMonitorCount: async (params) => {
    set({ switchMonitorCountLoading: true });
    const res = await getSwitchMonitorCount(params);
    const data = res?.code === '200' ? res?.data || initSwitchMonitorCountData : initSwitchMonitorCountData;
    set(produce((state) => {
      state.switchMonitorCountData = data;
      state.switchMonitorCountLoading = false;
    }));
    return data;
  },
  getClickSwitchMonitorCount: async (params) => {
    set({ clickSwitchMonitorCountLoading: true });
    const res = await getClickSwitchMonitorCount(params);
    const data = res.code === '200' ? res.data : [];
    set(produce((state) => {
      state.clickSwitchMonitorCountData = data;
      state.clickSwitchMonitorCountLoading = false;
    }));
    return data;
  },
  getSystemSwitchMessage: async (params) => {
    set({ systemSwitchMessageLoading: true });
    const res = await getSystemSwitchMessage(params);
    const data = res.code === '200' ? res.data : [];
    set(produce((state) => {
      state.systemSwitchMessageData = data;
      state.systemSwitchMessageLoading = false;
    }));
    return data;
  },
  getClickSystemSwitchMessage: async (params) => {
    set({ clickSystemSwitchMessageLoading: true });
    const res = await getClickSystemSwitchMessage(params);
    const data = res.code === '200' ? res?.data || [] : [];
    set(produce((state) => {
      state.clickSystemSwitchMessageData = data;
      state.clickSystemSwitchMessageLoading = false;
    }));
    return data;
  },
  getStateSwitchMessage: async (params) => {
    set({ stateSwitchMessageLoading: true });
    const res = await getStateSwitchMessage(params);
    const data = res.code === '200' ? res?.data || [] : [];
    set(produce((state) => {
      state.stateSwitchMessageData = data;
      state.stateSwitchMessageLoading = false;
    }));
    return data;
  },
  getClickStateSwitchMessage: async (params) => {
    set({ clickStateSwitchMessageLoading: true });
    const res = await getClickStateSwitchMessage(params);
    const data = res?.code === '200' ? res?.data || [] : [];
    set(produce((state) => {
      state.clickStateSwitchMessageData = data;
      state.clickStateSwitchMessageLoading = false;
    }));
    return data;
  },
  getOverProcessMessage: async (params) => {
    set({ overProcessMessageLoading: true });
    const res = await getOverProcessMessage(params);
    const data = res?.code === '200' ? (res?.data || initOverProcessMessageData) : initOverProcessMessageData;
    set(produce((state) => {
      state.overProcessMessageData = data;
      state.overProcessMessageLoading = false;
    }));
    return data;
  },
  getAssemblySwitchMessage: async (params) => {
    set({ assemblySwitchMessageLoading: true });
    const res = await getAssemblySwitchMessage(params);
    const data = res.code === '200' ? res?.data || [] : [];
    set(produce((state) => {
      state.assemblySwitchMessageData = data;
      state.assemblySwitchMessageLoading = false;
    }));
    return data;
  },
  getClickAssemblySwitchMessage: async (params) => {
    set({ clickAssemblySwitchMessageLoading: true });
    const res = await getClickAssemblySwitchMessage(params);
    const data = res.code === '200' ? res?.data || '' : '';
    set(produce((state) => {
      state.clickAssemblySwitchMessageData = data;
      state.clickAssemblySwitchMessageLoading = false;
    }));
    return data;
  },
  getAlertSwitchMessage: async (params) => {
    set({ alertSwitchMessageLoading: true });
    const res = await getAlertSwitchMessage(params);
    const data = res.code === '200' ? res?.data || [] : [];
    set(produce((state) => {
      state.alertSwitchMessageData = data;
      state.alertSwitchMessageLoading = false;
    }));
    return data;
  },
  getClickAlertSwitchMessage: async (params) => {
    set({ clickAlertSwitchMessageLoading: true });
      const res = await getClickAlertSwitchMessage(params);
    const data = res.code === '200' ? res?.data || '' : '';
    set(produce((state) => {
      state.clickAlertSwitchMessageData = data;
      state.clickAlertSwitchMessageLoading = false;
    }));
    return data;
  },
}));
