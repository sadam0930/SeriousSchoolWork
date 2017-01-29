// let map = [
// 			["","x"],
// 			["",""],
// 			["x",""]
// 		  ];
var output = [];

class Node {
	constructor(y, x) {
		this.y = y;
		this.x = x;
		this.discovered = false;
	}
}

function isValidMove(map, nodeMap, node){
	// console.log(nodeMap);
	if(node.y > map.length - 1 || node.y < 0){
		return false;
	} else if(node.x > map[0].length - 1 || node.x < 0){
		return false;
	} else if(map[node.y][node.x] === "x"){
		return false;
	} else if(nodeMap[node.y][node.x].discovered === true){
		return false;
	} else {
		return true;
	}
}

function getAdjacentEdges(node){
	return { 
		right : new Node(node.y, node.x + 1),
		down: new Node(node.y + 1, node.x),
		left: new Node(node.y, node.x - 1),
		up: new Node(node.y - 1, node.x)
 	}
}

function recursiveSearch(map, nodeMap, curNode){
	let found = false;
	nodeMap[curNode.y][curNode.x].discovered = true;
	output.push([curNode.y, curNode.x]);

	if(curNode.y === map.length - 1 && curNode.x === map[0].length - 1) {
		return true;
	} else {
		let edges = getAdjacentEdges(curNode);
		for (var key in edges){
			let next = edges[key];
			if(isValidMove(map, nodeMap, next) === true){
				found = recursiveSearch(map, nodeMap, next);
				if(found === false){
					output.pop();
					continue;
				} else {
					break;
				}
			}
		}
		return found;
	}
}

function findPath(map){
	output = [];
	let pathFound = false;
	if(!map){
		return null;
	}
	//recreate the map with each element being a node
	let nodeMap = map.map(function(arr) {
	    return arr.slice();
	});
	nodeMap.forEach(function(firstDimension, y){
		firstDimension.forEach(function(value, x){
			nodeMap[y][x] = new Node(y, x);
		});
	});
	let curNode = nodeMap[0][0];
	//check if there is an opening to the maze
	if(map[curNode.y][curNode.x] === "x"){
		return null;
	}
	pathFound = recursiveSearch(map, nodeMap, curNode);
	if(pathFound === true){
		return output;
	} else {
		return null;
	}
}