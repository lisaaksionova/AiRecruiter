import { Card, Col, Progress, Row, Statistic, Tooltip } from "antd"
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons'
import { Bar, BarChart, CartesianGrid, Legend, Pie, PieChart, XAxis, YAxis } from "recharts"
import './DashboardPage.styles.css'
import { useState } from "react"

const data = [
  {
    "name": "React",
    "uv": 4000,
    "Candidates amount": 2400
  },
  {
    "name": "Java",
    "uv": 3000,
    "Candidates amount": 1398
  },
  {
    "name": "C#",
    "uv": 2000,
    "Candidates amount": 9800
  },
  {
    "name": "Embedded",
    "uv": 2780,
    "Candidates amount": 3908
  },
  {
    "name": "JavaScript",
    "uv": 1890,
    "Candidates amount": 4800
  },
  {
    "name": "Support",
    "uv": 2390,
    "Candidates amount": 3800
  },
  {
    "name": "Recruitment",
    "Candidates amount": 4300
  }
]


const DashboardPage = () => {
  
  return <div>
    <h1>Dashboard Page</h1>
    <Row gutter={16}>
    <Col span={12}>
      <Card variant="borderless">
        <Statistic
          title="Hired"
          value={11.28}
          precision={2}
          valueStyle={{ color: '#3f8600' }}
          prefix={<ArrowUpOutlined />}
          suffix="%"
        />
      </Card>
    </Col>
    <Col span={12}>
      <Card variant="borderless">
        <Statistic
          title="Rejected"
          value={9.3}
          precision={2}
          valueStyle={{ color: '#cf1322' }}
          prefix={<ArrowDownOutlined />}
          suffix="%"
        />
      </Card>
    </Col>
  </Row>

  <div className="barchart-container">
  <BarChart width={730} height={250} data={data}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
    <Legend />
    <Bar dataKey="Candidates amount" fill="#1677ff" />
  </BarChart>
  </div>
  
  <div className="piechart-container">
    <div className="piechart">
      <h3>Interns</h3>
      <Progress type="circle" percent={10} />
    </div>
    <div className="piechart">
      <h3>Juniors</h3>
      <Progress type="circle" percent={45} />
    </div>
    <div className="piechart">
      <h3>Midlles</h3>
      <Progress type="circle" percent={20} />
    </div>
    <div className="piechart">
      <h3>Seniors</h3>
      <Progress type="circle" percent={20} />
    </div>
    <div className="piechart">
      <h3>Leads</h3>
      <Progress type="circle" percent={5} />
    </div>
  </div>
  </div>
}

export default DashboardPage