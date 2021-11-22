const bps = document.querySelectorAll('.bigProdukt')

for (const bp of bps) {
    swap(bp.childNodes[0], bp.childNodes[bp.childNodes.length-1])

    if(bp.childNodes.length % 2 == 1){
        bp.insertBefore(bp.childNodes[bp.childNodes.length-1], bp.childNodes[1])
    }
}

function swap(node1, node2) {
    const afterNode2 = node2.nextElementSibling;
    const parent = node2.parentNode;
    node1.replaceWith(node2);
    parent.insertBefore(node1, afterNode2);
}