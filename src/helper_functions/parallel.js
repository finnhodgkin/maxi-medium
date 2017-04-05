module.exports = (tasks, cb) => {
  const result = tasks.map( () => null);
  let n = 0;
  tasks.forEach((task, index) => {
    task((err, res) => {
      if (err) { return cb(err); }
      result[index] = res;
      n++;
      if (n === result.length) { return cb(null, result); }
    });
  });
}
