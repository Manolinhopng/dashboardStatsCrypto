const { exec } = require('child_process');
const fs = require('fs');

exec('npx vite build', (error, stdout, stderr) => {
  const result = `STDOUT:\n${stdout}\n\nSTDERR:\n${stderr}\n\nERROR:\n${error ? error.message : 'none'}`;
  fs.writeFileSync('build_err_utf8.txt', result, 'utf8');
});
