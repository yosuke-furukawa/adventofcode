const fs = require("fs");
const data = fs.readFileSync("./sample.txt").toString().trim().split("\n").map((line) => {
  var index = line.indexOf("(contains");
  var ing = line.substring(0, index);
  var all = line.substring(index);
  console.log(ing, all);
  var ingredients = ing.split(" ").filter(Boolean);
  var allergens = all.substring(all.indexOf(" ")+1, all.length-1).split(", ").filter(Boolean);
  return { ingredients, allergens };
});

var obj = new Map();
for (const {ingredients, allergens} of data) {
  for (const allergen of allergens) {
    if (obj.has(allergen)) {
      obj.get(allergen).push(ingredients);
    } else {
      const arr = [];
      arr.push(ingredients);
      obj.set(allergen, arr);
    }
  }
}

var countMap = new Map();
for (const {ingredients, _} of data) {
  for (const ingredient of ingredients) {
    if (countMap.has(ingredient)) {
      countMap.set(ingredient, countMap.get(ingredient) + 1);
    } else {
      countMap.set(ingredient, 1);
    }
  }
}
console.log(obj);

for (var key of obj.keys()) {
  var ingredients = obj.get(key);
  var base = ingredients[0];
  var rest = ingredients.slice(1);
  var common = [];
  for (var i=0;i<base.length;i++) {
    var b = base[i];
    var found = true;
    for (var r of rest) {
      if (r.includes(b)) {
        continue;
      } else {
        found = false;
        break;
      }
    }
    if (found) {
      common.push(b);
    }
  }
  obj.set(key, common);
}
console.log(obj);

for (var ingredients of obj.values()) {
  for (var ingredient of ingredients) {
    if (countMap.has(ingredient)) {
      countMap.delete(ingredient);
    }
  }
}

var result = 0;
for (var val of countMap.values()) {
  console.log(val);
  result += val

}

console.log(countMap);
console.log(result);
