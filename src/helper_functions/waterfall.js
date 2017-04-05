module.exports = (arg, tasks, cb) => {
  const waterfallcb = (error, res) => {
    if (error) { return cb(error); }
    n += 1;
    if (n === tasks.length) {
      tasks[n - 1](res, cb);
    } else {
      tasks[n - 1](res, waterfallcb);
    }
  };
  let n = 0;
  waterfallcb(null, arg);
};
