const Node = require('./Node');

class Cache {
    MAX_SIZE = null;
    size = null;
    HashMap = null;
    head = null;
    tail = null;

    constructor({ MAX_SIZE }) {
        this.MAX_SIZE = MAX_SIZE;
        this.size = 0;
        this.HashMap = new Map();
    }

    getItem(key) {
        const node = this.HashMap.get(key);

        // case: there is no cached data
        if (!node) return null

        // update LRU order of the node
        // case: the node is tail
        if (!node.back) return node.value

        // case: the node is head
        if (!node.front) this.head = node.back;
        // case: the node is in middle among others
        else node.front.back = node.back; 
        
        node.back.front = node.front;
        this.tail.back = node;
        node.front = tail;
        node.back = null;
        tail = node;

        return node.value;
    }

    setItem(key, newData) {
        const newNode = new Node({
            target: this.tail,
            value: newData,
        });

        // case: the first node
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        }
        // case: the node is in middle among others
        else {
            this.tail.back = newNode;
            newNode.front = this.tail;
            this.tail = newNode;
        }

        this.size++;
        this.HashMap.set(key, newNode);

        // delete LRU node if the size is over
        if (this.size > this.MAX_SIZE) {
            this.head = this.head.back;
            this.head.front = null;

            this.size--;
        }
    }
}

module.exports = Cache;