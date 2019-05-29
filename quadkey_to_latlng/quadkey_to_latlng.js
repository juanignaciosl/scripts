#!/usr/bin/env node

// Example usage: tail -n +2 file.csv | awk -F "|" '{print $3}' | ./quadkey_to_latlng.js

var readline = require('readline');
var Quadkey = require('quadkeytools');

console.log('quadkey,min_lat,min_lng,max_lat,max_lng');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on('line', function(line){
  const quadkey = line.trim();
  try {
    bbox = Quadkey.bbox(line);
  } catch(e) {
    console.error(`Error parsing ${line}: ${e.message}`);
    process.exit(1);
  }
  console.log(`${quadkey},${bbox.min.lat},${bbox.min.lng},${bbox.max.lat},${bbox.max.lng}`);
});

