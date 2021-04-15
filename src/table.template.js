import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import { Table, Tag, Space } from 'antd';
import axios from 'axios';
import { PlusOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router';

const baseUrl = 'https://localhost:44393/';

const TableCustomer = props => {
	console.log(props);

	const [dateSource, setDataSource] = useState([]);
	useEffect(() => {
		axios.get(baseUrl + 'api/customers').then(res => {
			setDataSource(
				res.data.map(d => ({
					...d,
					tags: ['cool', 'teacher']
				}))
			);
		});
	}, []);

	const columns = [
		{
			title: 'Mã khách',
			dataIndex: 'Makhach',
			key: 'Makhach',
			align: 'center',
			render: text => <a>{text}</a>
		},
		{
			title: 'Họ và tên',
			dataIndex: 'TenKhach',
			key: 'TenKhach',
			align: 'center'
		},
		{
			title: 'Địa chỉ',
			dataIndex: 'DiaChi',
			key: 'DiaChi',
			align: 'center'
		},
		{
			title: 'Tags',
			key: 'tags',
			dataIndex: 'tags',
			align: 'center',
			render: tags => (
				<>
					{tags.map(tag => {
						let color = tag.length > 5 ? 'geekblue' : 'green';
						if (tag === 'loser') {
							color = 'volcano';
						}
						return (
							<Tag color={color} key={tag}>
								{tag.toUpperCase()}
							</Tag>
						);
					})}
				</>
			)
		},
		{
			title: 'Action',
			key: 'action',
			align: 'center',
			render: (text, record) => (
				<Space size='middle'>
					<Button type='primary'>Thêm</Button>
					<Button onClick={() => props.history.push(`/edit/${record.Makhach}`)}>
						Sửa
					</Button>
					<Button danger onClick={() => onDelete(record.Makhach)}>
						Xóa
					</Button>
				</Space>
			)
		}
	];

	const onDelete = id => {
		axios.delete(baseUrl + `api/customers/${id}`).then(() => {
			console.log('DeleteSuccess : ' + id);
			setDataSource(prev => prev.filter(x => x.Makhach !== id));
		});
	};

	return (
		<div className='mt-10'>
			<Button
				type='primary'
				className='flex'
				icon={<PlusOutlined />}
				onClick={() => props.history.push('/add')}>
				Thêm
			</Button>
			<div className='mb-10'></div>

			<Table columns={columns} dataSource={dateSource} />
		</div>
	);
};

export default withRouter(TableCustomer);
