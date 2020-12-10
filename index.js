const express = require('express')
const app = express()
const port = 5000
//bodyparser --> 클라에서 오는 정보를 서버에서 분석해서 가져올 수 있게 만들어 줌
const bodyParser = require('body-parser');
const { User } = require("./models/User");

const config = require('./config/key')

//application/x-www-form-urlencoded 타입 분석해서 갖고옴
app.use(bodyParser.urlencoded({extended: true}));

//application/json 타입 분석해서 갖고옴
app.use(bodyParser.json());

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI,{
  useNewUrlParser:true, useUnifiedTopology:true, useFindAndModify:false,useCreateIndex:true
}).then(()=>console.log('mongoDB connected'))
  .catch(err => console.log(err))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/',(req,res)=>{
  console.log('fff')
})

app.post('/register',(req, res) =>{
  // {
  //   id:"hi",
  //   password:1234
  // }
  // req.body 에 이런 형태의 정보가 담길 수 있는거는
  // 그건 body-parser 덕분!
  // body-parser 가 클라이언트에서 오는 정보를 분석해줌
  const user = new User(req.body);

  // user.save --> mongo db 의 메소드 : req.body 에 userModel 에 저장될 수 있다
  user.save((err, userInfo)=>{
    if(err) return res.json({success:false, err})
    return res.status(200).json({
      success:true
    })
  })

})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})