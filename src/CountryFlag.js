import React from 'react';
import './CountryFlag.css';

//link = `https://www.countryflags.io/${countryCode.toLowerCase()}/flat/64.png`

function CountryFlag({ countryCode }) {

	let link;

	countryCode === 'worldwide' 
	? 
	link = 'https://www.nicepng.com/png/detail/39-395355_clip-art-globe-colorful-icon-png.png'
	:
	link = `https://flagcdn.com/256x192/${countryCode.toLowerCase()}.png`

	
	return(
		<div className='image__container'>
			<img src={link} />
		</div>
	)
}


export default CountryFlag;