const appcfg = require('./appcfg');

const Pool = require('pg').Pool;
const pool = new Pool(appcfg.pg_cfg);

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
    res.status(200);

    if (info[1] == '0'){
        let movies = fetch(`https://www.omdbapi.com/?&apikey=561c6724&s=${info[0]}`)
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

        let movies = fetch(`https://www.omdbapi.com/?&apikey=561c6724&s=${info[0]}&y=${info[1]}`)
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

app.post('/Comment', (req, res) => {
    let movieId = req.body['movieId'], name = req.body['userName'], comment = req.body['com']
    res.status(200)

    console.log('req body: ', req.body)
    console.log('movie: ', movieId, name, comment)
    // pool.query(
    //     'INSERT INTO Comments(movieID, name, commant) values()'
    // )

    pool.query(
            'SELECT movieID, name, comment from comments',
            (error, results) => {
                if (error) {
                    console.log(error)
                }
                console.log(
                  'Пришёл ответ из БД: ',
                  results.rows);
                res.setHeader(
                  'Content-Type',
                  'application/json');
                  res.end(JSON.stringify(
                    {length: results.rows}));
            });
})


app.listen(port, () => {
  console.log(`http://127.0.0.1:${port}.`)
});

// pool.query(
//     'SELECT movieId, name, comment from comments',
//     (error, results) => {
//         if (error) {
//             console.log(error)
//         }
//         console.log(
//           'Пришёл ответ из БД: ',
//           results.rows);
//     });

// pool.query(
//     "INSERT INTO Comments(movieID, name, comment) values('3', 'dsf', 'dsf')",
//     (error, results) => {
//         if (error) {
//             console.log(error)
//         }
//         console.log(
//           'Записанно');
//     });