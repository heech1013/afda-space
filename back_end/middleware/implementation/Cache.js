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

        /** caching */
        if (node) {
            /** update order of doubly linked list */
            /** pass if the node is already tail */
            if (node.back) {
                /** case the node is middle of other nodes */
                if (node.front) {
                    node.front.back = node.back;
                }
                /** case the node is head */
                else {
                    this.head = node.back;
                }
                node.back.front = node.front;

                this.tail.back = node;
                node.front = tail;
                node.back = null;
                tail = node;
            }

            return node.value;
        }

        /** there is no cache */
        return null;
    }

    setItem(key, newData) {
        const newNode = new Node({
            target: this.tail,
            value: newData,
        });

        /** case the first node addition */
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        }
        else {
            /** make link between tail node & new node */
            this.tail.back = newNode;
            newNode.front = this.tail;
            this.tail = newNode;
        }

        this.size++;
        this.HashMap.set(key, newNode);

        /** restrict cache size */
        if (this.size > this.MAX_SIZE) {
            this.head = this.head.back;
            this.head.front = null;

            this.size--;
        }
    }
}

module.exports = Cache;