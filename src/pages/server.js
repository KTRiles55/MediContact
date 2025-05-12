
process.on('SIGTERM', () => {
    console.log('SIGTERM signal received.');
    server.close(() => {
      console.log('Closed out remaining connections');
      // Additional cleanup tasks go here
    });
  });

  process.on('SIGINT', () => {
    console.log('SIGINT signal received.');
    server.close(() => {
      console.log('Closed out remaining connections');
      // Additional cleanup tasks go here
    });
  });