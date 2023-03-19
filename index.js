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

const urls = [
  'https://raw.githubusercontent.com/fdnd-agency/ultitv/main/api/game/943.json',
  'https://raw.githubusercontent.com/fdnd-agency/ultitv/main/api/game/943/statistics.json'
];

app.get('/', async function (request, response) {
  const [data1, data2] = await Promise.all(urls.map(fetchJson));
  const data = {data1, data2};
  response.render('index', data);
  console.log(data)
});

async function fetchJson(url) {
  return await fetch(url)
    .then((response) => response.json())
    .catch((error) => error)
}