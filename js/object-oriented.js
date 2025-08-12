

class ListNode {
  val = 0;
  next = null;
  constructor(val) {
    this.val = val
  }
}
class LinkList{
  head = null
  tail = null
  _size = 0

  append(val){
    var node = new ListNode(val)
    if(this.head == null) {
      this.head = this.tail = node
    } else {
      this.tail.next = node
      this.tail = node
    }
    this._size++
  }
  prepend(val) {
    var node = new ListNode(val)
    if(this.head == null) {
      this.head = this.tail = node
    } else {
      node.next = this.head
      this.head = node
    }
    this._size++
  }

  toString() {
    var result = ""
    var p = this.head
    while(p) {
      result += p.val + "->"
      p = p.next
    }
    return result.slice(0,-2)
  }
}

class TreeNode {
  val = 0
  left = null
  right = null
  constructor(val) {
    this.val = val
  }
}

class binurySearchTree {
  root = null;

  insert(val) {
    this.root = ins(val, this.root)
    function ins(val, root) {
      if(!root) {
        return new TreeNode(val)
      } else {
        if(val < root.val)
          root.left = ins(val, root.left)
        else
          root.right = ins(val, root.right)
      }
      return root
    }
  }

  traverse(action) {
    trav(this.root , action)
    function trav(root, action) {
      if(root) {
        trav(root.left, action)
        action(root.val)
        trav(root.right, action)
      }
    }
  }
}
