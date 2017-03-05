var dev = require('./dev');
module.exports={
  'port': process.env.PORT || dev.serverPort,
  'secret':'02saddGGSeemmmy9454542mbdsdfw',
  'database':'localhost:27017/volunteer'
}
