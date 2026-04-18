import { alert, success, error, defaultModules } from '@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '@pnotify/mobile/dist/PNotifyMobile.js';
defaultModules.set(PNotifyMobile, {});
import "@pnotify/core/dist/PNotify.css";
import "@pnotify/core/dist/BrightTheme.css";
import  debounce from "../node_modules/lodash.debounce"



const inputRef = document.querySelector(".chekcount")
const listRef = document.querySelector(".list")

inputRef.addEventListener("input", debounce((event) => {
    const value = event.target.value

    accets(value).then(res => {
        listRef.innerHTML = "" 

        if (res.length > 10) {
            error({
                title: 'помилка',
            text: 'зробіть запит більш спіцефічний'
            });
            return;
        }

        if (res.length >= 2 && res.length <= 10) {
            const item = res.map(country => {
                return `<li class="country">${country.name.common}</li>`
            }).join("")
            
            listRef.innerHTML = item 
        }
        
   if (res.length === 1) {
    listRef.innerHTML = "";

    const item = res.map(country => {
        const languages = Object.values(country.languages);

        return `<li class="country">
            <h2>${country.name.common}</h2>
            <p><b>Capital:</b> ${country.capital[0]}</p>
            <p><b>Population:</b> ${country.population}</p>
            <h3>Languages:</h3>
            <ul>
                ${languages.map(lang => `<li>${lang}</li>`).join("")}
            </ul>
            <img src="${country.flags.svg}" alt="Flag" width="200">
        </li>`;
    }).join("");

    listRef.innerHTML = item;
}
    }).catch(() => {
        listRef.innerHTML = ""
    })
}, 500))

function accets(value) {
    return fetch(`https://restcountries.com/v3.1/name/${value}`).then(res => res.json())
}
















































