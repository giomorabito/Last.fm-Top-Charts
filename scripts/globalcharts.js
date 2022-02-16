import FetchWrapper from "./fetch-wrapper.js";

const API = new FetchWrapper('http://ws.audioscrobbler.com');
const AppleAPI = new FetchWrapper('https://itunes.apple.com');

const button = document.querySelector("#generate-button");
const generate = document.querySelector("#generate-criteria-value");
const topTitle = document.querySelector("#top-title");
const topCharts = document.querySelector("#top-charts");

    button.addEventListener("click", event => {
        console.log(generate.value);
        topTitle.textContent = `Top ${generate.value}`;
        topTitle.style.visibility = "visible";
        topCharts.innerHTML = "";

        if(generate.value === "Artists"){
            topCharts.innerHTML = `<tr>
            <th>Rank</th>
            <th>Artist</th>
            </tr>`;
            try{
                API.get("/2.0/?method=chart.gettopartists&api_key=8df116ae24dd2d159bb7750ac642dd75&format=json&limit=50").then(data => {
                    let count = 0;
                    data.artists.artist.forEach(artist => {
                        count++;
                        topCharts.insertAdjacentHTML("beforeend",`
                    <tr>
                        <td>${count}</td>
                        <td style="font-weight:500">${artist.name}</td>
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
            <th>Song</th>
            <th>Artist</th>
            </tr>`;
            try{
                let count = 0;
                const array = [];
                API.get("/2.0/?method=chart.gettoptracks&api_key=8df116ae24dd2d159bb7750ac642dd75&format=json&limit=50").then(data => {
                    data.tracks.track.forEach(track => {
                        const trackName = track.name;
                        const artistName = track.artist.name;
                        const searchTerm = `${artistName.split(' ').join('+')}+${trackName.split(' ').join('+')}`;
    
                            //AppleAPI.get(`/search?term=${searchTerm}&country=us&limit=1`).then(data => {
                                //const artwork = data.results[0].artworkUrl100;
                                //array.push({trackName: trackName,
                                //artistName: artistName, artwork:artwork});
                            //})

                            console.log(array);

                            count++;
                        topCharts.insertAdjacentHTML("beforeend",`
                            <tr>
                                <td>${count}</td>
                                <td style="font-weight:500">${trackName}</td>
                                <td>${artistName}</td>
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