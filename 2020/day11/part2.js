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
print(next);
console.log(count);
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
      var n = seeDirection(prev, row, col, "north");
      var ne = seeDirection(prev, row, col, "north-east");
      var nw = seeDirection(prev, row, col, "north-west");
      var e = seeDirection(prev, row, col, "east"); 
      var w = seeDirection(prev, row, col, "west"); 
      var s = seeDirection(prev, row, col, "south"); 
      var se = seeDirection(prev, row, col, "south-east"); 
      var sw = seeDirection(prev, row, col, "south-west"); 
      if (prev[row][col] === "L") {
        if ([n, ne, nw, e, w, s, se, sw].filter((x) => x!=="#").length === 8) {
          next[row][col] = "#"
        }
      } else if (prev[row][col] === "#") {
        if ([n, ne, nw, e, w, s, se, sw].filter((x) => x==="#").length >= 5) {
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

function seeDirection(a, row, col, direction) {
  var r = row;
  var c = col;
  if (direction === "north") {
    r--;
    while(a[r]?.[c] != null) {
      if (a[r]?.[c] !== ".") {
        return a[r][c];
      }
      r--;
    }
    return;
  } else if (direction === "north-east") {
    r--;
    c++;
    while(a[r]?.[c] != null) {
      if (a[r]?.[c] !== ".") {
        return a[r][c];
      }
      r--;
      c++;
    }
    return;
  } else if (direction === "north-west") {
    r--;
    c--;
    while(a[r]?.[c] != null) {
      if (a[r]?.[c] !== ".") {
        return a[r][c];
      }
      r--;
      c--;
    }
    return;
  } else if (direction === "east") {
    c++;
    while(a[r]?.[c] != null) {
      if (a[r]?.[c] !== ".") {
        return a[r][c];
      }
      c++;
    }
    return;
  } else if (direction === "west") {
    c--;
    while(a[r]?.[c] != null) {
      if (a[r]?.[c] !== ".") {
        return a[r][c];
      }
      c--;
    }
    return;
  } else if (direction === "south") {
    r++;
    while(a[r]?.[c] != null) {
      if (a[r]?.[c] !== ".") {
        return a[r][c];
      }
      r++;
    }
    return;
  } else if (direction === "south-east") {
    r++;
    c++;
    while(a[r]?.[c] != null) {
      if (a[r]?.[c] !== ".") {
        return a[r][c];
      }
      r++;
      c++;
    }
    return;
  } else if (direction === "south-west") {
    r++;
    c--;
    while(a[r]?.[c] != null) {
      if (a[r]?.[c] !== ".") {
        return a[r][c];
      }
      r++;
      c--;
    }
    return;
  }
}
