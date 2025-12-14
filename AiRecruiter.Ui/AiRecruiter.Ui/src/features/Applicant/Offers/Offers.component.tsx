import React, { useState } from 'react';
import { Layout, Menu, theme, Typography } from 'antd';
import type { MenuProps } from 'antd';
import OffersTable from './OffersTable/OffersTable.component';
import { InboxOutlined, ClockCircleOutlined, CheckCircleOutlined, DeleteOutlined } from '@ant-design/icons';

const { Content, Sider } = Layout;
const { Title } = Typography;

const Offers = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const items = [
    { 
      key: "all", 
      label: "All Offers", 
      icon: <InboxOutlined />,
      filter: () => true 
    },
    { 
      key: "offered", 
      label: "Pending", 
      icon: <ClockCircleOutlined />,
      filter: (status: string) => status === 'Offered'
    },
    { 
      key: "hired", 
      label: "Accepted", 
      icon: <CheckCircleOutlined />,
      filter: (status: string) => status === 'Hired'
    },
    { 
      key: "rejected", 
      label: "Declined", 
      icon: <DeleteOutlined />,
      filter: (status: string) => status === 'Rejected'
    }
  ];

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    setSelectedStatus(e.key);
  };

  return (
    <div>
      <Layout
        style={{ padding: '24px', background: colorBgContainer, borderRadius: borderRadiusLG }}
      >
        <Sider style={{ background: colorBgContainer }} width={200}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['all']}
            style={{ height: '100%' }}
            items={items}
            onClick={handleMenuClick}
          />
        </Sider>
        <Content style={{ padding: '0 24px', minHeight: 280 }}>
          <Title level={2} style={{ marginBottom: '24px' }}>
            {items.find(item => item.key === selectedStatus)?.label || 'All Offers'}
          </Title>
          <OffersTable 
            statusFilter={items.find(item => item.key === selectedStatus)?.filter}
          />
        </Content>
      </Layout>
    </div>
  );
};

export default Offers;
