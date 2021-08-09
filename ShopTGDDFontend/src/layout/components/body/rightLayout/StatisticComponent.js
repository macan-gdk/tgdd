import React from 'react';
import { Layout, Card, Row, Col, Button, Select } from 'antd';
import urlConfig from '../../../../route/urlConfig';
import { Redirect } from 'react-router-dom';
import { BarChart } from 'react-easy-chart';
const { Option } = Select;
const url = `${urlConfig}/api`;
const { Meta } = Card;
const { Content } = Layout;

const colCard = {
    width: '16%',
    display: 'inline-block',
    marginBottom: '10px',
    verticalAlign: 'top',
    padding: '5px'
};

const Top12 = (top12, cats, category, onChange) => {
    return (
        <React.Fragment>
            <div style={{ fontWeight: 'bold', margin: '1% 0 2% 40%', fontSize: '20pt' }}>Best seller</div>
            <div style={{ fontWeight: 'bold', margin: '0 0 2% 37%', fontSize: '20pt' }}>
                <Select defaultValue={'' + category}
                    onChange={(value) => onChange(value)} style={{ width: '200px' }}>
                    <Option value="0" key="0">All</Option>
                    {cats.map(cat => (
                        <Option value={cat.maloai} key={cat.maloai}>{cat.tenloai}</Option>
                    ))}
                </Select>
            </div>
            <Row>
                {top12.map(t => (
                    <Col key={t.masanpham} style={colCard}>
                        <Card
                            hoverable
                            cover={<img alt={t.tensanpham} src={t.hinhanh} width="100%" height="200px" />}
                        >
                            <Meta
                                title={t.tensanpham}
                                description={'Sold: ' + t.daban}
                            />
                        </Card>
                    </Col>
                ))}
            </Row>
        </React.Fragment>
    );
}

const Chart = (data, orderBy, click) => {
    let results = [];
    results = data.map(d => {
        return {
            x: d.date,
            y: d.total
        }
    })

    return (
        <React.Fragment>
            <div style={{ fontWeight: 'bold', margin: '1% 0 3% 40%', fontSize: '20pt' }}>Chart of revenue</div>
            <div id="currentValue" style={{ fontWeight: 'bold', margin: '1% 0 3% 40%', fontSize: '20pt' }}>Value: </div>
            <BarChart
                axes
                grid
                axisLabels={{ x: -10, y: 10 }}
                colorBars
                height={400}
                width={1000}
                data={results}
                mouseOverHandler={(e) => { document.getElementById('currentValue').innerHTML = 'Value: ' + e.y }}
                mouseOutHandler={() => document.getElementById('currentValue').innerHTML = 'Value: '}
            />
            <Button disabled={orderBy === '7 days'}
                style={{ marginLeft: '38%' }}
                onClick={() => click('7 days')}>7 days</Button>{' '}
            <Button disabled={orderBy === 'Month'}
                onClick={() => click('Month')}>Month</Button>{' '}
            <Button disabled={orderBy === 'Year'}
                onClick={() => click('Year')}>Year</Button>
        </React.Fragment>
    );
}

const tabList = [{
    key: 'top12',
    tab: 'Top12'
}, {
    key: 'chart',
    tab: 'Chart'
}]

export default class Statistic extends React.Component {
    constructor() {
        super()
        this.state = {
            top12: [],
            cats: [],
            category: 0,
            tab: 'top12',
            orderBy: '7 days',
            data: []
        }
    }

    componentWillMount() {
        fetch(`${url}/donhang/thongke/ngay`, { headers: { Authorization: `Bearer ${localStorage.token}` } })
            .then(data => data.json())
            .then(data => this.setState({ data }))
            .catch(err => console.log(err));
        fetch(`${url}/sanpham/top12`).then(data => data.json())
            .then(top12 => this.setState({ top12 }))
            .catch(err => console.log(err));
        fetch(`${url}/loaisanpham`).then(data => data.json())
            .then(cats => this.setState({ cats }))
            .catch(err => console.log(err));
    }
    onTabChange = (number) => {
        this.setState({ tab: number });
    }
    onChangeOrderBy = (orderBy) => {
        if (orderBy === '7 days') {
            fetch(`${url}/donhang/thongke/ngay`, { headers: { Authorization: `Bearer ${localStorage.token}` } })
                .then(data => data.json())
                .then(data => this.setState({ data, orderBy }))
                .catch(err => console.log(err));
        }
        else if (orderBy === 'Month') {
            fetch(`${url}/donhang/thongke/thang`, { headers: { Authorization: `Bearer ${localStorage.token}` } })
                .then(data => data.json())
                .then(data => this.setState({ data, orderBy }))
                .catch(err => console.log(err));
        }
        else {
            fetch(`${url}/donhang/thongke/nam`, { headers: { Authorization: `Bearer ${localStorage.token}` } })
                .then(data => data.json())
                .then(data => this.setState({ data, orderBy }))
                .catch(err => console.log(err));
        }
    }
    onChangeCategory = (category) => {

        fetch(`${url}/sanpham/top12/${category.toString() !== '0' ? category : ''}`, { headers: { Authorization: `Bearer ${localStorage.token}` } })
            .then(data => data.json())
            .then(top12 => this.setState({ top12, category }))
            .catch(err => console.log(err));
    }
    render() {
        const token = localStorage.token;
        if (!token) {
            return <Redirect to="/" />
        }
        const contentTabList = {
            top12: Top12(this.state.top12, this.state.cats, this.state.category, this.onChangeCategory),
            chart: Chart(this.state.data, this.state.orderBy, this.onChangeOrderBy)
        }
        return (
            <Content style={{ background: '#fff', padding: 12, minHeight: 300 }}>
                <Card
                    style={{ width: '100%' }}
                    tabList={tabList}
                    activeTabKey={this.state.tab}
                    onTabChange={(key) => { this.onTabChange(key) }}
                >
                    {contentTabList[this.state.tab]}
                </Card>
            </Content>
        )
    }
}