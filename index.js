import express from 'express'
const app = express()
import fetch from "node-fetch";


app.set('view engine', 'ejs')
app.set('views', './views')
app.use(express.static('public'))
app.set('port', process.env.PORT || 4000)


app.listen(app.get('port'), function () {
  console.log(`Application started on http://localhost:${app.get('port')}`)
})

const url = ["https://raw.githubusercontent.com/fdnd-agency/ultitv/main/ultitv-api"];
const postUrl = "https://api.ultitv.fdnd.nl/api/v1/players";
const apiUrl = "https://api.ultitv.fdnd.nl/api/v1/questions";


const urls = [
  url + "/game/943.json",
  url + "/game/943/statistics.json",
  url + "/facts/Player/8607.json",
  postUrl,
  apiUrl
];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async function (request, response) {
  const [data1, data2, data3, data4, data5] = await Promise.all(urls.map(fetchJson));
  const data = { data1, data2, data3, data4, data5 };
  response.render("index", data);
});

async function fetchJson(url) {
  return await fetch(url)
    .then((response) => response.json())
    .catch((error) => error)
}