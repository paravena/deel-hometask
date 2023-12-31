import app from './app';

init();

function init() {
  try {
    app.listen(3001, () => {
      console.log('Express Server listening on port 3001');
    });
  } catch (error) {
    console.error(`An error occurred: ${JSON.stringify(error)}`);
    process.exit(1);
  }
}
