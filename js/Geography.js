class Geography {

  travel = [
    { from: 'Chicago',	to: 'Dallas', drive: 14.5, flight: 2.25, ticket:	287},
    { from: 'Chicago',	to: 'Houston', drive: 16.5, flight:	2.5, ticket:	212},
    { from: 'Chicago',	to: 'Los Angeles', drive: 29, flight:	4.25, ticket:	379},
    { from: 'Chicago',	to: 'New York', drive: 12.25, flight:	2, ticket:	317},
    { from: 'Chicago',	to: 'Philadelphia', drive: 12, flight:	1.75, ticket:	292},
    { from: 'Chicago',	to: 'Phoenix', drive: 26, flight:	3.75, ticket:	397},
    { from: 'Chicago',	to: 'San Antonio', drive: 19, flight:	2.75, ticket:	423},
    { from: 'Chicago',	to: 'San Diego', drive: 30, flight:	4.25, ticket:	432},
    { from: 'Chicago',	to: 'San Jose', drive: 32, flight:	4.5, ticket:	781},
    { from: 'Dallas',	to: 'Houston', drive: 3.5, flight:	1, ticket:	205},
    { from: 'Dallas',	to: 'Los Angeles', drive: 20.75, flight:	3.25, ticket:	298},
    { from: 'Dallas',	to: 'New York', drive:	23.25, flight:	3.25, ticket:	259},
    { from: 'Dallas',	to: 'Philadelphia', drive:	21.75, flight:	3.25, ticket:	234},
    { from: 'Dallas',	to: 'Phoenix', drive:	15.75, flight:	2.5, ticket:	294},
    { from: 'Dallas',	to: 'San Antonio', drive:	4.25, flight:	1, ticket:	250},
    { from: 'Dallas',	to: 'San Diego', drive:	19.5, flight:	3, ticket:	342},
    { from: 'Dallas',	to: 'San Jose', drive: 25, flight:	3.5, ticket:	665},
    { from: 'Houston',	to: 'Los Angeles', drive: 22.75, flight:	3.5, ticket:	258},
    { from: 'Houston',	to: 'New York', drive:	25, flight:	3.25, ticket:	292},
    { from: 'Houston',	to: 'Philadelphia', drive:	23.5, flight:	3.25, ticket:	242},
    { from: 'Houston',	to: 'Phoenix', drive:	17, flight:	2.5, ticket:	251},
    { from: 'Houston',	to: 'San Antonio', drive:	3, flight:	1, ticket:	240},
    { from: 'Houston',	to: 'San Diego', drive:	21, flight:	3.5, ticket:	378},
    { from: 'Houston',	to: 'San Jose', drive: 28, flight:	4, ticket:	523},
    { from: 'Los Angeles',	to: 'New York', drive:	41, flight:	5, ticket:	490},
    { from: 'Los Angeles',	to: 'Philadelphia', drive:	40, flight:	5, ticket:	501},
    { from: 'Los Angeles',	to: 'Phoenix', drive:	6, flight:	1.5, ticket:	248},
    { from: 'Los Angeles',	to: 'San Antonio', drive:	19.75, flight:	2.75, ticket:	503},
    { from: 'Los Angeles',	to: 'San Diego', drive:	1.75, flight:	0.25, ticket:	200},
    { from: 'Los Angeles',	to: 'San Jose', drive: 6, flight:	1, ticket:	258},
    { from: 'New York',	to: 'Philadelphia', drive:	1.75, flight:	0.25, ticket:	200},
    { from: 'New York',	to: 'Phoenix', drive:	36, flight:	5.25, ticket:	509},
    { from: 'New York',	to: 'San Antonio', drive:	27, flight:	4, ticket:	397},
    { from: 'New York',	to: 'San Diego', drive:	42, flight:	6, ticket:	531},
    { from: 'New York',	to: 'San Jose', drive: 44, flight:	6.75, ticket:	861},
    { from: 'Philadelphia',	to: 'Phoenix', drive:	35, flight:	5, ticket:	492},
    { from: 'Philadelphia',	to: 'San Antonio', drive:	26, flight:	5.25, ticket:	499},
    { from: 'Philadelphia',	to: 'San Diego', drive:	40, flight:	6, ticket:	477},
    { from: 'Philadelphia',	to: 'San Jose', drive: 43, flight:	7.5, ticket:	942},
    { from: 'Phoenix',	to: 'San Antonio', drive:	14, flight:	2, ticket:	490},
    { from: 'Phoenix',	to: 'San Diego', drive:	5.5, flight:	1, ticket:	198},
    { from: 'Phoenix',	to: 'San Jose', drive: 11, flight:	2, ticket:	482},
    { from: 'San Antonio',	to: 'San Diego', drive:	18.25, flight:	2.5, ticket: 418},
    { from: 'San Antonio',	to: 'San Jose', drive: 25, flight:	5, ticket:	676},
    { from: 'San Diego',	to: 'San Jose', drive: 7.5, flight:	1.5, ticket:	258},
  ]
  cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Philadelphia', 'Phoenix', 'San Antonio', 'San Diego', 'Dallas', 'San Jose', 'Austin', 'Indianapolis', 'Jacksonville', 'San Francisco', 'Columbus', 'Charlotte', 'Fort Worth', 'Detroit', 'El Paso', 'Memphis', 'Seattle', 'Denver', 'Washington', 'Boston', 'Nashville-Davidson', 'Baltimore', 'Oklahoma City', 'Louisville/Jefferson County', 'Portland', 'Las Vegas', 'Milwaukee', 'Albuquerque', 'Tucson', 'Fresno', 'Sacramento', 'Long Beach', 'Kansas City', 'Mesa', 'Virginia Beach', 'Atlanta', 'Colorado Springs', 'Omaha', 'Raleigh', 'Miami', 'Oakland', 'Minneapolis', 'Tulsa', 'Cleveland', 'Wichita', 'Arlington', 'New Orleans', 'Bakersfield', 'Tampa', 'Honolulu', 'Aurora', 'Anaheim', 'Santa Ana', 'St. Louis', 'Riverside', 'Corpus Christi', 'Lexington-Fayette', 'Pittsburgh', 'Anchorage', 'Stockton', 'Cincinnati', 'St. Paul', 'Toledo', 'Greensboro', 'Newark', 'Plano', 'Henderson', 'Lincoln', 'Buffalo', 'Jersey City', 'Chula Vista', 'Fort Wayne', 'Orlando', 'St. Petersburg', 'Chandler', 'Laredo', 'Norfolk', 'Durham', 'Madison', 'Lubbock', 'Irvine', 'Winston-Salem', 'Glendale', 'Garland', 'Hialeah', 'Reno', 'Chesapeake', 'Gilbert', 'Baton Rouge', 'Irving', 'Scottsdale', 'North Las Vegas', 'Fremont', 'Boise City', 'Richmond', 'San Bernardino', 'Birmingham', 'Spokane', 'Rochester', 'Des Moines', 'Modesto', 'Fayetteville', 'Tacoma', 'Oxnard', 'Fontana', 'Columbus', 'Montgomery', 'Moreno Valley', 'Shreveport', 'Aurora', 'Yonkers', 'Akron', 'Huntington Beach', 'Little Rock', 'Augusta-Richmond County', 'Amarillo', 'Glendale', 'Mobile', 'Grand Rapids', 'Salt Lake City', 'Tallahassee', 'Huntsville', 'Grand Prairie', 'Knoxville', 'Worcester', 'Newport News', 'Brownsville', 'Overland Park', 'Santa Clarita', 'Providence', 'Garden Grove', 'Chattanooga', 'Oceanside', 'Jackson', 'Fort Lauderdale', 'Santa Rosa', 'Rancho Cucamonga', 'Port St. Lucie', 'Tempe', 'Ontario', 'Vancouver', 'Cape Coral', 'Sioux Falls', 'Springfield', 'Peoria', 'Pembroke Pines', 'Elk Grove', 'Salem', 'Lancaster', 'Corona', 'Eugene', 'Palmdale', 'Salinas', 'Springfield', 'Pasadena', 'Fort Collins', 'Hayward', 'Pomona', 'Cary', 'Rockford', 'Alexandria', 'Escondido', 'McKinney', 'Kansas City', 'Joliet', 'Sunnyvale', 'Torrance', 'Bridgeport', 'Lakewood', 'Hollywood', 'Paterson', 'Naperville', 'Syracuse', 'Mesquite', 'Dayton', 'Savannah', 'Clarksville', 'Orange', 'Pasadena', 'Fullerton', 'Killeen', 'Frisco', 'Hampton', 'McAllen', 'Warren', 'Bellevue', 'West Valley City', 'Columbia', 'Olathe', 'Sterling Heights', 'New Haven', 'Miramar', 'Waco', 'Thousand Oaks', 'Cedar Rapids', 'Charleston']

  states = ['New York', 'California', 'Illinois', 'Texas', 'Pennsylvania', 'Arizona', 'Texas', 'California', 'Texas', 'California', 'Texas', 'Indiana', 'Florida', 'California', 'Ohio', 'North Carolina', 'Texas', 'Michigan', 'Texas', 'Tennessee', 'Washington', 'Colorado', 'District of Columbia', 'Massachusetts', 'Tennessee', 'Maryland', 'Oklahoma', 'Kentucky', 'Oregon', 'Nevada', 'Wisconsin', 'New Mexico', 'Arizona', 'California', 'California', 'California', 'Missouri', 'Arizona', 'Virginia', 'Georgia', 'Colorado', 'Nebraska', 'North Carolina', 'Florida', 'California', 'Minnesota', 'Oklahoma', 'Ohio', 'Kansas', 'Texas', 'Louisiana', 'California', 'Florida', 'Hawaii', 'Colorado', 'California', 'California', 'Missouri', 'California', 'Texas', 'Kentucky', 'Pennsylvania', 'Alaska', 'California', 'Ohio', 'Minnesota', 'Ohio', 'North Carolina', 'New Jersey', 'Texas', 'Nevada', 'Nebraska', 'New York', 'New Jersey', 'California', 'Indiana', 'Florida', 'Florida', 'Arizona', 'Texas', 'Virginia', 'North Carolina', 'Wisconsin', 'Texas', 'California', 'North Carolina', 'Arizona', 'Texas', 'Florida', 'Nevada', 'Virginia', 'Arizona', 'Louisiana', 'Texas', 'Arizona', 'Nevada', 'California', 'Idaho', 'Virginia', 'California', 'Alabama', 'Washington', 'New York', 'Iowa', 'California', 'North Carolina', 'Washington', 'California', 'California', 'Georgia', 'Alabama', 'California', 'Louisiana', 'Illinois', 'New York', 'Ohio', 'California', 'Arkansas', 'Georgia', 'Texas', 'California', 'Alabama', 'Michigan', 'Utah', 'Florida', 'Alabama', 'Texas', 'Tennessee', 'Massachusetts', 'Virginia', 'Texas', 'Kansas', 'California', 'Rhode Island', 'California', 'Tennessee', 'California', 'Mississippi', 'Florida', 'California', 'California', 'Florida', 'Arizona', 'California', 'Washington', 'Florida', 'South Dakota', 'Missouri', 'Arizona', 'Florida', 'California', 'Oregon', 'California', 'California', 'Oregon', 'California', 'California', 'Massachusetts', 'Texas', 'Colorado', 'California', 'California', 'North Carolina', 'Illinois', 'Virginia', 'California', 'Texas', 'Kansas', 'Illinois', 'California', 'California', 'Connecticut', 'Colorado', 'Florida', 'New Jersey', 'Illinois', 'New York', 'Texas', 'Ohio', 'Georgia', 'Tennessee', 'California', 'California', 'California', 'Texas', 'Texas', 'Virginia', 'Texas', 'Michigan', 'Washington', 'Utah', 'South Carolina', 'Kansas', 'Michigan', 'Connecticut', 'Florida', 'Texas', 'California', 'Iowa', 'South Carolina']

  constructor(){

  }

  fetchCities(){
    let relevantCities = []
    for (let i = 0; i < 10; i++){
      relevantCities.push(this.cities[i])
    }
    relevantCities.sort()
    return relevantCities
  }
  fetchRandom(){
    let rand = Math.floor(Math.random() * (9 - 0 + 1) + 0)
    return {city: this.cities[rand], state: this.states[rand]}
  }

  fetchTravel(from, to){
    for (let i in this.travel){
      if ((this.travel[i].from == from && this.travel[i].to == to)
        || (this.travel[i].from == to && this.travel[i].to == from)){
        return this.travel[i]
      }
    }
  }

  fetchSections(){
    return ['east', 'north', 'south', 'west']
  }

}
