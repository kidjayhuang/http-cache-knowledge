const express = require('express');
const app = express();
const ejs = require('ejs'); 
app.engine('html', ejs.__express);
app.set('view engine', 'html');


app.use(express.static('public',{
  maxAge: '1d',
  expires: '1d',
  Etag: false,
  lastModified: false
}));


// app.get('/',(req,res)=>{
//   res.setHeader('Cache-Control', 'no-store')
//   res.header('Cache-Control', 'max-age=310000')
//   res.header('expires', 'Fri, 09 Mar 2029 07:11:10 GMT')

  
//   res.render('index')
// })



app.listen(3000, () => {
  console.log('Listening on: http://localhost:3000');
});

