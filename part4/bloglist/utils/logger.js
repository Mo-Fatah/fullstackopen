const info = (message) => {
  if (process.env.NODE_ENV === 'test') return;

  console.log(message);
};

const error = (message) => {
  if (process.env.NODE_ENV === 'test') return;

  console.error(message);
};

module.exports = {
  info,
  error,
};
