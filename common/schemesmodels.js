let mongoose = require('mongoose');
let models = mongoose.models;
let MicroblogSchema = new mongoose.Schema({
  connect: String,
  createDate: String,
  userid: Number
})

//保存方法：save
MicroblogSchema.pre('save', (next) => {
  if (this.isNew) {
  }
  console.log('每次mongodb的save操作数据库都会经过这里!');
  next();
})

MicroblogSchema.statics = {
  //链表查询
  fetch: () => {
    return models.Microblog.find({}).sort({ createDate: -1 }).limit(100).exec();
  }
}
let Microblog = mongoose.model('Microblog', MicroblogSchema);

module.exports = Microblog;