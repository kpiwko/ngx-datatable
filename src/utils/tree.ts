/**
 * This functions rearrange items by their parents
 * Also sets the level value to each of the items
 *
 * Note: Expecting each item has a property called parentId
 * Note: This algorithm will fail if a list has two or more items with same ID
 * NOTE: This algorithm will fail if there is a deadlock of relationship
 *
 * For example,
 *
 * Input
 *
 * id -> parent
 * 1  -> 0
 * 2  -> 0
 * 3  -> 1
 * 4  -> 1
 * 5  -> 2
 * 7  -> 8
 * 6  -> 3
 *
 *
 * Output
 * id -> level
 * 1      -> 0
 * --3    -> 1
 * ----6  -> 2
 * --4    -> 1
 * 2      -> 0
 * --5    -> 1
 * 7     -> 8
 *
 *
 * @param rows
 *
 */
export function groupRowsByParents(rows: any[], from: string = '', to: string = ''): any[] {
  if (from !== '' && to !== '') {
    const childrenMap = {};
    for (let i = 0; i < rows.length; i++) {
      childrenMap[rows[i][to]] = {
        children: rows.filter(row => row[from] === rows[i][to]),
        checked: false
      };
    }
    const allRootItems = rows.filter(row => row[from] === null ||
                                     typeof(row[from]) === 'undefined');
    let opArray = rearrange(allRootItems, childrenMap, 0, true, to);

    // Now add items to the list whose parent is not present
    // Setting all of their levels as 0
    // TODO: This gets added at the end, need to maintain the order
    opArray = [...opArray, ...rows.filter(row => {
      return !childrenMap[row[to]].checked;
    }).map(item => {
      item.level = 0;
      return item;
    })];
    return opArray;
  } else {
    return rows;
  }

}

function rearrange(items: any[],
                   map: object,
                   level: number,
                   show: boolean = true,
                   to: string = ''): any[] {
  if (!items.length) return [];
  let op: any[] = [];
  items.forEach(item => {
    map[item[to]].checked = true;
    item.level = level;
    if (show) {
      op = [
        ...op,
        item,
        ...rearrange(map[item[to]].children,
                     map,
                     level + 1,
                     item.treeStatus === 'expanded',
                     to)
      ];
    } else {
      op = [...op];
      rearrange(map[item[to]].children, map, level + 1, false, to);
    }
  });
  return op;
}

// export function groupRowsByParents(rows: any[], from: string = '', to: string = ''): any[] {
//   if (from !== '' && to !== '') {
//     const nodeById = {};
//     const l = rows.length;
//     let node: TreeNode | null = null;

//     nodeById[0] = new TreeNode(); // that's the root node

//     const uniqIDs = rows.reduce((arr, item) => {
//       if (arr.indexOf(item[to]) === -1) {
//         arr.push(item[to]);
//       }
//       return arr;
//     }, []);

//     for (let i = 0; i < l; i++) {  // make TreeNode objects for each item
//       nodeById[ rows[i][to] ] = new TreeNode(rows[i]);
//     }

//     for (let i = 0; i < l; i++) {  // link all TreeNode objects
//       node = nodeById[ rows[i][to] ];
//       let parent = 0;
//       if (node.row.hasOwnProperty(from) && !!node.row[from] && (uniqIDs.indexOf(node.row[from]) > -1)) {
//         parent = node.row[from];
//       }
//       node.parent = nodeById[ parent ];
//       node.row['level'] = node.parent.row['level'] + 1;
//       node.parent.children.push(node);
//     }

//     let resolvedRows = [];
//     nodeById[0].flatten(function() {
//       resolvedRows = [...resolvedRows, this.row];
//     }, true);

//     return resolvedRows;
//   } else {
//     return rows;
//   }
// }

// class TreeNode {
//   public row: any;
//   public parent: any;
//   public children: any[];

//   constructor(row: any | null = null) {
//     if (!row) {
//       row = {
//         level: -1,
//         treeStatus: 'expanded'
//       };
//     }
//     this.row      = row;
//     this.parent   = null;
//     this.children = [];
//   }

//   flatten(f, recursive)  {
//     if (this.row['treeStatus'] === 'expanded') {
//       for (let i = 0, l = this.children.length; i < l; i++) {
//         const child = this.children[i];
//         f.apply(child, Array.prototype.slice.call(arguments, 2));
//         if (recursive) child.flatten.apply(child, arguments);
//       }
//     }
//   }
// }
