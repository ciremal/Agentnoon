export const buildTree = (people) => {
  const peopleMap = Object.fromEntries(
    people.map((p) => [p.id, { ...p, children: [] }])
  );

  let treeRoot = null;
  people.forEach((p) => {
    if (p.manager && peopleMap[p.manager]) {
      peopleMap[p.manager].children.push(p.id);
    } else {
      treeRoot = p.id;
    }
  });

  let memo = {};
  computeSalaryValues(treeRoot, memo, peopleMap);
  console.log(memo);
  people.forEach((p) => {
    const id = p.id;
    const obj = memo[id];
    delete obj.IC;
    delete obj.salary;
    peopleMap[id]["metrics"] = obj;
  });

  return {
    root: treeRoot,
    map: peopleMap,
  };
};

const computeSalaryValues = (root, memo, peopleMap) => {
  const node = peopleMap[root];

  if (memo[node.id]) {
    return memo[node.id];
  }

  if (node.children.length === 0) {
    memo[node.id] = {
      salary: node.salary,
      reportingLayers: 0,
      totalCost: 0,
      managerCount: 0,
      managementCost: 0,
      IC: true,
      ICCount: 0,
      ICCost: 0,
      managerCostRatio: 0,
      managerICRatio: 0,
    };
    return memo[node.id];
  }

  let managerCount = 0;
  let managementCost = 0;
  let ICCount = 0;
  let ICCost = 0;
  let reportingLayers = 0;

  for (const child of node.children) {
    const childNode = computeSalaryValues(child, memo, peopleMap);

    reportingLayers = Math.max(reportingLayers, childNode.reportingLayers);
    managerCount += childNode.IC ? 0 : childNode.managerCount + 1;
    managementCost += childNode.IC
      ? 0
      : childNode.managementCost + childNode.salary;
    ICCount += childNode.IC ? 1 : childNode.ICCount;
    ICCost += childNode.IC ? childNode.salary : childNode.ICCost;
  }

  memo[node.id] = {
    salary: node.salary,
    reportingLayers: reportingLayers + 1,
    totalCost: managementCost + ICCost,
    managerCount: managerCount,
    managementCost: managementCost,
    IC: false,
    ICCount: ICCount,
    ICCost: ICCost,
    managerCostRatio:
      managementCost === 0 ? 0 : (ICCost / managementCost).toFixed(2),
    managerICRatio:
      managerCount === 0 || ICCount === 0
        ? 0
        : (ICCount / managerCount).toFixed(2),
  };

  return memo[node.id];
};
