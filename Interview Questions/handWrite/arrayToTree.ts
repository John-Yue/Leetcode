interface Node {
  id: number;
  name: string;
  pid: number;
  children?: Array<Node>;
}

function arrayToTree(data: Array<Node>): Node[] {
  const map = new Map();
  const result: Node[] = [];

  data.forEach((item) => map.set(item.id, { ...item, children: [] }));

  map.forEach((item) => {
    if (map.has(item.pid)) {
      const parentNode = map.get(item.pid);
      parentNode.children.push(item);
    } else {
      result.push(item);
    }
  });

  return result;
}

// 需转换的数据
const data = [
  { id: 1, name: "电脑", pid: 0 },
  { id: 2, name: "mac", pid: 1 },
  { id: 3, name: "mac 笔记本", pid: 2 },
  { id: 4, name: "mac 台式机", pid: 2 },
  { id: 5, name: "mac air", pid: 3 },
  { id: 6, name: "mac pro", pid: 3 },
  { id: 7, name: "win", pid: 1 },
  { id: 8, name: "win 笔记本", pid: 7 },
];

const result = arrayToTree(data);
console.log(result);
