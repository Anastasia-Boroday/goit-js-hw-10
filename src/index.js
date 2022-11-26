import './css/styles.css';
import fetchCountries from './fetchCountries';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;
const refs = {
    input: document.querySelector('#search-box'),
    countryList: document.querySelector('.country-list'),
    countryInfo:document.querySelector('.country-info'),
}
refs.input.addEventListener('input', onSearch);

function onSearch(e){
    e.preventDefault();
    const inputValue = e.currentTarget.value.trim();


    fetchCountries(inputValue).then(country => {
        console.log(country);
        if (country.length > 10) {
        return Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
        }if(country.length>=2 && country.length<=10){
             return arrayOfCountries(country);
        }if(country.length==1){
            return Notify.failure("Oops, there is no country with that name");
        }

        
    }
    )
    .catch(error => {
        console.log(error);
    });
}

function arrayOfCountries(country) {
const arraOfCountries = country.map(country =>
        `<li class="country-item">
            <img  src="${country.flags.svg}" 
            alt="${country.name.official}" 
            class="country-img"
            width="30"
            height="25">
            
            <p class="country-list-text">${country.name.common}</p>
        </li>` 
        ).join("");
    refs.countryList.innerHTML = arraOfCountries;   
    console.log(country);
}
function cardOfCountry(country) {
    // const {flags,name,capital,population,languages} = country;
    const card = country.map(country =>
        `
      <h2 class="info-name">
        <img class="info-img" 
        src="${country.flags.svg}" 
        alt=" ${country.name.common}">
        ${country.name.common}
      </h2>
      <p class="info-capital"><b>Capital:</b>${country.capital}</p>
      <p class="info-opulation"><b>Population:</b>${country.population}</p>
      <p class="info-languages"><b>Languages:</b>${country.languages}</p>
        `).join('');
    refs.countryInfo.innerHTML = card;

}

