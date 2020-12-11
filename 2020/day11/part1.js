const fs = require("fs");

const data = fs.readFileSync("./sample.txt").toString().split("\n").filter(Boolean).map((line) => [...line]); 
console.log(data);

var next = new Array(data.length).fill(0).map(() => new Array(data[0].length).fill(""));
var prev = new Array(data.length).fill(0).map(() => new Array(data[0].length).fill(""));

copy(data, prev); 
occupied(prev, next);

var count = 0;

while(true) {
  occupied(prev, next);
  if (same(prev, next)) {
    break;
  }
  count++;
  copy(next, prev);
}

print(next);
console.log(count);
console.log(countSeat(next, "#"));

function same(a, b) {
  for (var i=0;i<a.length;i++) {
    for (var j=0;j<a[i].length;j++) {
      if (a[i][j] !== b[i][j]) {
        return false;
      }
    }
  }
  return true;
}

function copy(a, b) {
  for (var i=0;i<a.length;i++) {
    for (var j=0;j<a[i].length;j++) {
      b[i][j] = a[i][j];
    }
  }
}

function occupied(prev, next) {
  for (var row=0;row<prev.length;row++) {
    for (var col=0;col<prev[row].length;col++) {
      var n = prev[row-1]?.[col];
      var ne = prev[row-1]?.[col+1];
      var nw = prev[row-1]?.[col-1];
      var e = prev[row][col+1];
      var w = prev[row][col-1];
      var s = prev[row+1]?.[col];
      var se = prev[row+1]?.[col+1];
      var sw = prev[row+1]?.[col-1];
      if (prev[row][col] === "L") {
        if ([n, ne, nw, e, w, s, se, sw].filter((x) => x!=="#").length === 8) {
          next[row][col] = "#"
        }
      } else if (prev[row][col] === "#") {
        if ([n, ne, nw, e, w, s, se, sw].filter((x) => x==="#").length >= 4) {
          next[row][col] = "L"
        }
      } else {
        next[row][col] = prev[row][col];
      }
    }
  }
}

function print(a) {
  for (var i=0;i<a.length;i++) {
    console.log(a[i].join(""));
  }
}

function countSeat(a, symbol) {
  var count = 0;
  for (var i=0;i<a.length;i++) {
    for (var j=0;j<a[i].length;j++) {
      if (a[i][j] === symbol) {
        count++;
      }
    }
  }
  return count;
}
