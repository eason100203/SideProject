const dialogOpen = (trigger, target) => {
    trigger.addEventListener('click', e => {
        const absPos = trigger.getBoundingClientRect();
        target.style.marginTop = `${absPos.bottom * 1.1}px`;
        target.showModal()
    });
}
const dialogclose = (close, target) => {
    close.addEventListener('click', e => {
        e.preventDefault();
        e.stopPropagation();
        target.style.marginTop = '';
        target.close();
    });
}
const dialogSelfClose = target => {
    target.addEventListener('click', e => {
        if (e.target.tagName.toLowerCase() === "dialog") {
            e.preventDefault();
            target.style.marginTop = '';
            target.close();
        };
    })
}
const [...sortListItem] = document.querySelectorAll('.sortList__item>a');

dialogOpen(sortBtn, sortList)
sortListItem.forEach(element => dialogclose(element, sortList))
dialogSelfClose(sortList)