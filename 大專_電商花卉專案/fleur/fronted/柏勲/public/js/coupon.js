const [...howToUseTrigger] = document.getElementsByClassName('coupon__howToUseTrigger');
const [...howToUse] = document.getElementsByClassName('howToUse');
const [...closeBtn] = document.getElementsByClassName('howToUse__closeBtn');
const dialog = (trigger, close, target) => {
    trigger.addEventListener('click', e => target.showModal());
    close.addEventListener('click', e => target.close());
}

howToUseTrigger.forEach((element, index) =>
    dialog(element, closeBtn[index], howToUse[index])
)


$(`#historyItems a`).each(function (index, item) {
    $(item).on('click', function (e) {
        e.preventDefault();
        $(`#historyItems a`).removeClass('borderLink')
        $(this).addClass('borderLink')
    })
})