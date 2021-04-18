// let times
// function douFun(fu, wait) {
//   if (times) clearTimeout(times)
//   times = setTimeout(() => {
//       fu()
//   }, wait);
// }
// /**
//  * params
//  */
// function test() {
//   console.log('dug')
// }

// for(let i = 0; i < 10; i++){
//   douFun(test, 1000)
// }

class MyPromise {
  constructor(fn) {
    this.status = "pending";
    this.value = undefined;
    this.reson = undefined;
    this.resolveCb = [];
    this.rejectCb = [];

    const _this = this;
    const resolve = function() {
      _this.value = arguments;
      _this.status = "resolved";
      _this.resolveCb.forEach((cb) => cb(arguments));
    };
    const reject = function(reson) {
      _this.reson = reson;
      _this.status = "rejected";
      _this.rejectCb.forEach((cb) => cb(reson));
    };

    try {
      fn(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  then(reslove, reject) {
    const isResloveFunc = reslove instanceof Function;
    const isRejectFunc = reject instanceof Function;
    const _this = this;

    if (this.status === "resolved") {
      if (isResloveFunc) {
        return new MyPromise((res, rej) => {
          if (this.value instanceof MyPromise) {
            this.value.then(reslove, reject);
          } else {
            try {
              res(reslove(this.value));
            } catch (error) {
              rej(error);
            }
          }
        });
      }
    }
    if (this.status === "rejected") {
      if (isRejectFunc) {
        reject(this.reson);
        return new MyPromise((res, rej) => {
          try {
            res(reject(this.reson));
          } catch (error) {
            rej(error);
          }
        });
      }
    }
    if (this.status === "pending") {
      return new MyPromise((res, rej) => {
        isResloveFunc &&
          _this.resolveCb.push(() => {
            if (this.value instanceof MyPromise) {
              this.value.then(resolve, reject);
            } else {
              try {
                res(reslove(this.value));
              } catch (error) {
                rej(error);
              }
            }
          });
        isRejectFunc &&
          _this.rejectCb.push(() => {
            try {
              res(reject(this.reson));
            } catch (error) {
              rej(error);
            }
          });
      });
    }
  }
}
MyPromise.reslove = function(...args) {
  return new MyPromise((res) => res(args));
};

const time = function(...args) {
  return new MyPromise((res, rej) => {
    setTimeout(() => {
      res(...args);
    }, 1200);
  });
};
time(2019, "ds", 32).then((a, b, c) => {
  console.log(a, b, c);
});

const auth = {
  '0': "添加",
  '1': "删除",
  '2': "修改",
  '3': "查找",
}

{
  main: {
    b,
    c
  },
  home: {}
}

{
  'main/b',
  'main/c'
}

// 0 1
const authed1 = Math.pow(2, 0) + Math.pow(2, 1);
const authed2 = Math.pow(2, 2);

const baseAuth = Math.pow(2, 2)
console.log((baseAuth & authed1) === baseAuth);
