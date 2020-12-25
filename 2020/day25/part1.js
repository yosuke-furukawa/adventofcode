function arcmod(x) {
  let loops = 0;
  let current = 1;
  while (current !== x) {
    loops++;
    current = (current * 7) % 20201227;
  }
  return loops;
}

function transform(key, loops) {
  let current = 1;
  for (var i=0;i<loops;i++) {
    current = (current * key) % 20201227;
  }
  return current;
}

function main(cardKey, doorKey) {
  var cardLoops = arcmod(cardKey);
  var doorLoops = arcmod(doorKey);
  return transform(cardKey, doorLoops);
}

var ans = main(8987316, 14681524);
console.log(ans);
