/** Node used for Doubly linked list */
class Node {
    value = null;
    front = null;
    back = null;

    constructor({ value }) {
        this.value = value;
    }
}

module.exports = Node;