function getSiblings(node) {
    let allChildren = node.parentNode.children;
    let array = {length: 0};
    for (let i = 0; i < allChildren.length; i++) {
        if (allChildren[i] !== node) {
            array[array.length] = allChildren[i];
            array.length += 1;
        }
    }
    return array;
}

function addClass(node, classes) {
    for (let key in classes) {
        let value = classes[key];
        let methodName = value ? 'add' : 'remove';
        node.classList[methodName](key);
    }
}

//更改node原型
Node.prototype.getsiblings = function () {
    let allChildren = this.parentNode.children;
    let array = {length: 0};
    for (let i = 0; i < allChildren.length; i++) {
        if (allChildren[i] !== this) {
            array[array.length] = allChildren[i];
            array.length += 1;
        }
    }
    return array;
};

Node.prototype.addClass = function (classes) {
    classes.forEach((value) => this.classList.add(value))
};

// window.Node2

window.Node2 = function (nodeOrselector) {
    let node;
    if (typeof nodeOrselector === 'string') {
        node = document.querySelector(nodeOrselector);
    } else {
        node = nodeOrselector;
    }

    return {
        getSiblings: function () {
            let allChildren = node.parentNode.children;
            let array = {length: 0};
            for (let i = 0; i < allChildren.length; i++) {
                if (allChildren[i] !== node) {
                    array[array.length] = allChildren[i];
                    array.length += 1;
                }
            }
            return array;
        },
        addClass: function (classes) {
            classes.forEach((value) => node.classList.add(value))
        }
    }
};

//jQuery

window.jQuery = function (nodeOrSelector) {
    let nodes;
    if (typeof nodeOrSelector === 'string') {
        let temp = document.querySelectorAll(nodeOrSelector)
        for (let i = 0; i < temp.length; i++) {
            nodes[i] = temp[i];
        }
        nodes.length = temp.length;
    } else if (nodeOrSelector instanceof Node) {
        nodes = {
            0: nodeOrSelector,
            length: 1
        }
    }
    nodes.getSiblings = function () {

    };
    nodes.addClass = function (classes) {
        classes.forEach((value) => {
                for (let i = 0; i < nodes.length; i++) {
                    nodes[i].classList.add(value);
                }
            }
        )
    };
    nodes.getText = function () {
        let texts = [];
        for (let i = 0; i < nodes.length; i++) {
            texts.push(nodes[i].textContent)
        }
        return texts;
    };
    nodes.setText = function (text) {
        for (let i = 0; i < nodes.length; i++) {
            nodes[i].textContent = text;
        }
    };
    nodes.text = function (text) {
        if (text === undefined) {
            let texts = [];
            for (let i = 0; i < nodes.length; i++) {
                texts.push(nodes[i].textContent)
            }
            return texts;
        } else {
            for (let i = 0; i < nodes.length; i++) {
                nodes[i].textContent = text;
            }
        }

    };
    return nodes;
};