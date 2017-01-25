var map = [[""]];
var output = [];

var curNode = new Object();
curNode.x = 0;
curNode.y = 0;
curNode.value = map[curNode.x][curNode.y]

function findPath(map){
	if(!map) return null;
	if(curNode.value === "x") { 
		return null;
	} else {
		output.push([curNode.x, curNode.y]);
		return output;
	}
}