const appcfg = require('./appcfg');

const express = require('express');
const app = express();
app.use(express.json());

app.use('/', express.static(appcfg.Project_Root));
app.use('/assets', express.static(appcfg.Project_Root + '/client/dist/assets'));
const port = 3001;
app.get('/', (req, res) => {
  res.status(200).sendFile(
    'client/dist/index.html',
    { root: appcfg.Project_Root });
});

    
app.post('/', (req, res) => {
    let info = req.body['info'].split(' ');
    console.log( info )
    res.status(200); //res.end - в нем отправляем полученные данные с сайта(ombdi) на наш сайт

    if (info[1] == '0'){
        let movies = fetch(`https://www.omdbapi.com/?&apikey=db5f16ed&s=${info[0]}}`)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            let mainData = data['Search']
            let result = []
            
            if (mainData !== undefined) {
                mainData.forEach(el => {
                    result.push(el);
                });
            }
            

            //console.log(result)

            res.setHeader(
                'Content-Type',
                'application/json');
            res.end(JSON.stringify(result))
        })
    }
    else {

        let movies = fetch(`https://www.omdbapi.com/?&apikey=db5f16ed&s=${info[0]}&y=${info[1]}`)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            let mainData = data['Search']

            let result = []
            mainData.forEach(el => {
                result.push(el);
            });

            //console.log(result)

            res.setHeader(
                'Content-Type',
                'application/json');
            res.end(JSON.stringify(result))
        })
    }
    console.log('Post')
});


app.listen(port, () => {
  console.log(`http://127.0.0.1:${port}.`)
});