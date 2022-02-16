import FetchWrapper from "./fetch-wrapper.js";
const API = new FetchWrapper('http://ws.audioscrobbler.com');

const button = document.querySelector("#generate-button");
const username = document.querySelector("#username");
const generate = document.querySelector("#generate-criteria-value");
const timeframe = document.querySelector("#generate-timeframe-value");
const topTitle = document.querySelector("#top-title");
const topCharts = document.querySelector("#top-charts");

button.addEventListener("click", event => {
    topTitle.textContent = `Top ${generate.value}`;
    topTitle.style.visibility = "visible";
    topCharts.innerHTML = "";

    if(generate.value === "Artists"){
        topCharts.innerHTML = `<tr>
        <th>Rank</th>
        <th>Artist</th>
        <th>Play Count</th>
        </tr>`;

        try{
            API.get(`/2.0/?method=user.gettopartists&user=${username.value}&api_key=8df116ae24dd2d159bb7750ac642dd75&format=json&limit=1000&period=${timeframe.value}`).then(data => {
                let count = 0;
                data.topartists.artist.forEach(artist => {
                    count++;
                    topCharts.insertAdjacentHTML("beforeend",`
                    <tr>
                        <td>${count}</td>
                        <td style="font-weight:500">${artist.name}</td>
                        <td>${artist.playcount}</td>
                    </tr>
                    `)
                })
            })
        }
        catch(err){
            console.log(err);
            alert("Unable to retrieve data.");
            return;
        }
    }
    if(generate.value === "Tracks"){
        topCharts.innerHTML = `<tr>
        <th>Rank</th>
        <th>Track</th>
        <th>Artist</th>
        <th>Play Count</th>
        </tr>`;

        try{
            const array = [];
            API.get(`/2.0/?method=user.gettoptracks&user=${username.value}&api_key=8df116ae24dd2d159bb7750ac642dd75&format=json&limit=1000&period=${timeframe.value}`).then(data => {
                let count = 0;
                data.toptracks.track.forEach(track => {
                count++;
                topCharts.insertAdjacentHTML("beforeend",`
                <tr>
                    <td>${count}</td>
                    <td style="font-weight:500">${track.name}</td>
                    <td>${track.artist.name}</td>
                    <td>${track.playcount}</td>
                </tr>
                `)
                })
            })
        }
        catch(err){
            console.log(err);
            alert("Unable to retrieve data.");
            return;
        }
    }     
})