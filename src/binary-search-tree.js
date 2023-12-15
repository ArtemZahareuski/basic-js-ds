const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {

  constructor() {
    this.rootElem = null
  }

  root() {
    return this.rootElem;
  }

  add(data) {
    this.rootElem = addInside(this.rootElem, data);
    function addInside(node, data) {
      if(!node) {
        return new Node(data);
      }

      if(node.data === data) {
        return node;
      }

      if(data < node.data) {
        node.left = addInside(node.left, data);
      } else {
        node.right = addInside(node.right, data);
      }

      return node;
    }
  }

  has(data) {
    return this.searchInside(this.rootElem, data) !== null;
  }

  find(data) {
    return this.searchInside(this.rootElem, data);
  }

  searchInside(node, data) {
    if(!node) {
      return null;
    }

    if(node.data === data) {
      return node;
    }

    if(data < node.data) {
      return this.searchInside(node.left, data);
    } else {
      return this.searchInside(node.right, data);
    }
  }

  remove(data) {
    this.rootElem = removeElem(this.rootElem, data);

    function removeElem(node, data) {
      if(!node) {
        return null;
      }

      if(data < node.data) {
        node.left = removeElem(node.left, data);
      } else if(data > node.data) {
        node.right = removeElem(node.right, data);
      } else {
        if(!node.left && !node.right) {
          return null;
        }
        
        if(!node.left) {
          node = node.right;
          return node;
        }
        if(!node.right) {
          node = node.left;
          return node
        }

        let minimumRight = node.right;
        while (minimumRight.left) {
          minimumRight = minimumRight.left;
        }
        node.data = minimumRight.data;
        node.right = removeElem(node.right, minimumRight.data);
      }
      return node;
    }

  }

  min() {
    if(!this.rootElem) {
      return;
    }

    let searchMin = this.rootElem;

    while(searchMin.left) {
      searchMin = searchMin.left;
    }

    return searchMin.data;

  }

  max() {
    if(!this.rootElem) {
      return;
    }

    let searchMax = this.rootElem;

    while(searchMax.right) {
      searchMax = searchMax.right;
    }

    return searchMax.data;
  }
}

module.exports = {
  BinarySearchTree
};