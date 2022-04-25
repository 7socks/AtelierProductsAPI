const fs = require('fs');
const path = require('path');

const stream = fs.createReadStream(path.join(__dirname, '../raw/photos.csv'), { encoding: 'utf8'});
const file = fs.createWriteStream(path.join(__dirname, '../raw/photos_2.csv'));

let log = 0;

let line = '';
const collectLine = async (chunk) => {
  var remainder = '';
  if (chunk.includes('\n')) {
    line += chunk.slice(0, chunk.indexOf('\n') + 1);
    remainder += chunk.slice(chunk.indexOf('\n') + 1);
  } else {
    line += chunk;
  }

  if (line.includes("\n")) {
    var newlines = [];
    var lines = line.split('\n');
    for (var i = 0; i < lines.length; i++) {
      var cols = lines[i].split(',');
      for (var j = 0; j < cols.length; j++) {
        if (cols[j][0] === "\"" && cols[j][cols[j].length - 1] !== "\"") {
          cols[j] += "\"";
          console.log('Fixed a line');
        }
      }
      newlines.push(cols.join(','));
    }
    line = newlines.join('\n');
  }

  if (line.includes("\n")) {
    file.write(line, 'utf8');
    return remainder;
  } else {
    return line;
  }
};

stream
  .on('data', async (chunk) => {
    line = await collectLine(chunk);

    log ++;
    if (log % 500 === 0) {
      console.log('Formatted', log, 'chunks');
    }
  })
  .on('end', () => {
    file.close();
  });
