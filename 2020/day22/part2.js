const fs = require("fs");
const [player1, player2] = fs.readFileSync("./sample.txt").toString().trim().split("\n\n").map((p) => p.split("\n").slice(1).map(Number));
console.log(player1, player2);

function game(player1, player2) {
  var set = new Set();
  while (player1.length > 0 && player2.length > 0) {
    var key = `${player1.join(",")}:${player2.join(",")}`;
    if (set.has(key)) {
      return ({ winner: "player1" });
    }
    set.add(key);
    var p1 = player1.shift();
    var p2 = player2.shift();
    if (p1 <= player1.length && p2 <= player2.length) {
      let { winner } = game(player1.slice(0, p1), player2.slice(0, p2));
      console.log(winner);
      if (winner === "player1") {
        player1.push(p1, p2);
      } else {
        player2.push(p2, p1);
      }
    } else {
      if (p1 < p2) {
        player2.push(p2, p1);
      } else {
        player1.push(p1, p2);
      }
    }
  }
  return player1.length > 0 ? ({ winner: "player1", cards: player1}) : ({ winner: "player2", cards: player2 });
}

const { cards } = game(player1, player2);
console.log(cards)

var sum = 0;

for (var i=0;i<cards.length;i++) {
  sum += (cards[i] * (cards.length-i));
}
console.log(sum);
