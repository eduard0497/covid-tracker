import React, { Component } from 'react';
import { 
  FormControl,
  Select,
  MenuItem,
  Card,
  CardContent
   } from '@material-ui/core';
import CardBox from './CardBox.js';
import Table from './Table.js';
import './App.css';
import { sortData } from './util';
import CountryFlag from './CountryFlag.js';


class App extends Component {
  constructor() {
    super();

    this.state = {
      countriesAndCodes: [],
      selectedCountry: 'worldwide',
      selectedCountryData: {},
      worldwide: [],
      countryCode: 'worldwide'
    }
  }

  componentDidMount() {
    fetch('https://disease.sh/v3/covid-19/countries')
    .then(response => response.json())
    .then(data => {
      const countries = data.map((country) => (
      {
        name: country.country,
        value: country.countryInfo.iso2
      }
      ));
      this.setState({ countriesAndCodes: countries})

      const sortedData = sortData(data);
      this.setState({ worldwide: sortedData })
    })
  

    fetch('https://disease.sh/v3/covid-19/all')
    .then(response => response.json())
    .then(data => {
      this.setState({ selectedCountryData: data })
    })

  }


  handleCountryChange = async (e) => {
    await this.setState({selectedCountry: e.target.value })

    const url = this.state.selectedCountry === 'worldwide' 
    ? 
    'https://disease.sh/v3/covid-19/all' 
    : 
    `https://disease.sh/v3/covid-19/countries/${this.state.selectedCountry}` 

    await fetch(url)
    .then(response => response.json())
    .then(data => {
      this.setState({ selectedCountryData: data })
    })

    if(this.state.selectedCountry === 'worldwide') {
      await this.setState({ countryCode: 'worldwide' })
    } else {
      await this.setState({ countryCode: this.state.selectedCountryData.countryInfo.iso2 })
    }

    
  }

  render() {
    return(

      <div className='app__container'>

        <div className='app__container__left'>

          <div className='left__title'>
            <h1>COVID-19 Tracker</h1>

            <FormControl>
              <Select 
                variant="outlined" 
                value={this.state.selectedCountry}
                onChange={this.handleCountryChange}
              >
                <MenuItem value='worldwide'>Worldwide</MenuItem>
                {this.state.countriesAndCodes.map((country) => (
                  <MenuItem value={country.value}>{country.name}</MenuItem>
                ))}
              </Select>
            </FormControl>

          </div>

          <div className='left__cards'>
            <CardBox
              onClick={(e) => this.setState({ casesType: "cases" })} 
              title='Cases' 
              cases={this.state.selectedCountryData.todayCases} 
              total={this.state.selectedCountryData.cases}
            />
            <CardBox
              onClick={(e) => this.setState({ casesType: "recovered" })} 
              title='Recovered' 
              cases={this.state.selectedCountryData.todayRecovered} 
              total={this.state.selectedCountryData.recovered} 
            />
            <CardBox
              onClick={(e) => this.setState({ casesType: "deaths" })} 
              title='Deaths' 
              cases={this.state.selectedCountryData.todayDeaths} 
              total={this.state.selectedCountryData.deaths}  
            />
          </div>

          <div className='left__countryFlag'>
            <CountryFlag countryCode={this.state.countryCode} />
          </div>
          
        </div>


        <Card className='app__container__right'>
          <CardContent>
            <h3>Total Cases by Country</h3>
            <Table countries={this.state.worldwide} />
          </CardContent>
        </Card>

      </div>

    )
  }
}

export default App;
