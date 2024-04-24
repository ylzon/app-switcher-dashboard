import React from 'react'
import ReactDOM from 'react-dom/client'
import Dashboard from './pages/Dashboard';
import { ConfigProvider } from 'antd';
import antdZhCN from 'antd/es/locale/zh_CN';
import '@/styles/global.less';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';

dayjs.locale('zh-cn')

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConfigProvider locale={antdZhCN} theme={{
      "token": {
        "colorPrimary": "#234fa6",
        "colorInfo": "#234fa6",
        "colorBgBase": "#020d4b",
        "colorTextBase": "#2eb8ff",
        "colorLink": "#2eb8ff",
        "borderRadius": 2,
        // outline
        "colorBorderBase": "#2eb8ff",
      }
    }}>
      <Dashboard />
    </ConfigProvider>
  </React.StrictMode>,
)
