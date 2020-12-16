function main(args, target) {
  const map = new Map();
  for (var i=0;i<args.length-1;i++) {
    map.set(args[i], i+1);
  }

  var prev = args[args.length-1];
  var now;
  for (var i=args.length;i<target;i++) {
    if (!map.has(prev)) {
      now = 0;
    } else {
      var t = map.get(prev);
      now = i - t;
    }

    map.set(prev, i);
    prev = now;
  }
  return now;
}

console.log(main(process.argv[2].split(",").map(Number), +process.argv[3]));
