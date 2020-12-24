class Node {
  constructor(value) {
    this.prev = null;
    this.value = value;
    this.next = null;
  }
}

class CircularList {
  constructor() {
    this.length = 0;
    this.first = null;
    this.last = null;
  }

  append(data) {
    if (this.first == null) {
      const node = new Node(data);
      node.prev = node;
      node.next = node;
      this.first = node;
      this.last = node;
    } else {
      const node = new Node(data);
      node.prev = this.last;
      node.next = this.first;
      this.first.prev = node;
      this.last.next = node;
      this.last = node;
    }

    this.length++;
  }

  insert(data, to) {
    let node = this.first;
    while (node.value !== to) {
      node = node.next;
    }

    let inserted = new Node(data);
    inserted.prev = node;
    inserted.next = node.next;
    node.next.prev = inserted;
    node.next = inserted;


    if (inserted.prev === this.last) this.last = inserted
    this.length++;
  }

  remove(node) {
    if (this.length > 1) {
      node.prev.next = node.next
      node.next.prev = node.prev
      if (node === this.first) this.first = node.next
      if (node === this.last) this.last = node.prev
    } else if (this.first === node) {
      this.first = null
      this.last = null
    }
    node.prev = null
    node.next = null

    this.length--;
  }

  appendAll(arr) {
    for (const data of arr) {
      this.append(data);
    }
  }

  findTarget(value) {
    var node = this.first;
    var n = this.length;
    while(node.value !== value && n--) {
      node = node.next;
    }
    if (node.value !== value) {
      return null;
    }
    return node;
  }

  each(cb) {
    let node = this.first;
    let n = this.length;

    while (n--) {
      cb(node.value);
      node = node.next;
    }
  }
}

function mod(x, y) {
  return x - y * Math.floor(x / y)
}

function main(num, count) {
  const arr = [...("" + num)].map(Number);
  const cl = new CircularList();
  cl.appendAll(arr);
  let current = cl.first;
  let next = current.next;

  for (var k=0;k<count;k++) {
    var temp = [];
    cl.each((a) => temp.push(a));
    console.log(temp);
    console.log(current.value);
    var removed = [];
    for (var i=0;i<3;i++) {
      cl.remove(next);
      removed.push(next.value);
      next = current.next;
    }
    console.log(removed);
    removed.reverse();
    var value = current.value;
    var target = cl.findTarget(mod(value - 1, 10));
    while (target == null) {
      value = mod(value - 1, 10);
      target = cl.findTarget(value);
    }
    for (var r of removed) {
      cl.insert(r, target.value);
    }
    current = current.next;
    next = current.next;
  }

  var t = cl.findTarget(1);
  var len = cl.length - 1;
  var result = 0;
  while(len--) {
    t = t.next;
    result = 10 *result + t.value;
  }
  console.log(result);
}
main(389125467, 10);
main(389125467, 100);
main(247819356, 100);
