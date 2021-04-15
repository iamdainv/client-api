import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import axios from 'axios';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Input } from 'antd';
const baseUrl = 'https://localhost:44393/';
const Edit = props => {
	console.log(props);
	const { id } = props.match.params;
	const [customer, setDataSource] = useState({
		id: '',
		name: '',
		adress: '',
		phoneNumber: ''
	});
	useEffect(() => {
		axios.get(baseUrl + `api/customers/${id}`).then(res => {
			const data = {
				id: res.data.Makhach,
				name: res.data.TenKhach,
				adress: res.data.DiaChi,
				phoneNumber: res.data.DienThoai
			};

			setDataSource(data);
		});
	}, []);

	const objectToQueryString = (obj, prefix) => {
		var str = [],
			p;
		for (p in obj) {
			if (obj.hasOwnProperty(p)) {
				var k = prefix ? prefix + '[' + p + ']' : p,
					v = obj[p];
				str.push(
					v !== null && typeof v === 'object'
						? objectToQueryString(v, k)
						: encodeURIComponent(k) + '=' + encodeURIComponent(v)
				);
			}
		}
		return str.join('&');
	};

	const edit = () => {
		console.log();

		axios
			.put(
				baseUrl + `api/customers/?${objectToQueryString(customer)}`,
				customer
			)
			.then(() => console.log('DeleteSuccess : ' + id));
	};

	const handleChange = e => {
		const { name, value } = e.target;
		setDataSource(prev => ({ ...customer, [name]: value }));
	};

	return (
		<div className='w-5/12'>
			{JSON.stringify(customer, null, 2)}
			<Input
				placeholder='Tên Khách'
				value={customer.name}
				width={300}
				className='mt-5'
				name={'name'}
				onChange={handleChange}
			/>
			<Input
				placeholder='Địa chỉ'
				value={customer.adress}
				className='mt-5'
				name={'adress'}
				onChange={handleChange}
			/>
			<Input
				placeholder='Số Điện thoại'
				value={customer.phoneNumber}
				className='mt-5'
				name={'phoneNumber'}
				onChange={handleChange}
			/>
			<div className='flex mt-5'>
				<Button
					type='primary'
					className='flex '
					icon={<PlusOutlined />}
					onClick={edit}>
					Sửa
				</Button>
				<Button
					type='primary'
					className='flex ml-5'
					icon={<PlusOutlined />}
					onClick={() => props.history.push('/add')}>
					Thêm
				</Button>

				<Button
					type='primary'
					className='flex ml-5'
					icon={<PlusOutlined />}
					onClick={() => props.history.push('/table')}>
					Nhà
				</Button>
			</div>
		</div>
	);
};

export default withRouter(Edit);
