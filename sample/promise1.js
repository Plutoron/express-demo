const list = [];
for (let i = 0; i < 10; ++i) {
  list.push(i);
}
let PromiseForEach = (arr, cb) => {
  let realResult = []
  let result = Promise.resolve()
  arr.forEach((a, index) => {
    result = result.then(() => {
      return cb(a).then((res) => {
        realResult.push(res)
      })
    })
  })

  return result.then(() => {
    return realResult
  })
}

PromiseForEach(list, (number) => {

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(number);
      return resolve(number);
    }, 100);
  })

}).then((data) => {
  console.log("成功");
  console.log(data);
}).catch((err) => {
  console.log("失败");
  console.log(err)
}); 