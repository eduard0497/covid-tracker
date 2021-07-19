import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';

function CardBox({ title, cases, total, ...props }) {
	return (
		<Card 
			className='cardBox'
			onClick={props.onClick}
			>
			<CardContent>
				<Typography color='textSecondary'>
					{title}
				</Typography>

				<h2>{cases}</h2>

				<Typography color='textSecondary'>
					{total} in Total
				</Typography>
			</CardContent>
		</Card>
	)
}


export default CardBox;