// 배포시
if(process.env.NODE_ENV === 'production') module.exports=require('./prod');
// 개발환경에서
else module.exports=require('./dev');