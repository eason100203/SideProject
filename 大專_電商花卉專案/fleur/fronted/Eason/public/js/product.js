// var selectFor768 = document.querySelector('#selectFor768');
// selectFor768.addEventListener('click', function () {
//     window.alert('你好');
// })
$('#iconDown').attr('style', 'display:block');
$('#iconUp').attr('style', 'display:none');

function change(n) {
    $('#allItems768').slideToggle("");
    if (n == 1) {
        slide = 0;
        $('#iconDown').attr('style', 'display:none');
        $('#iconUp').attr('style', 'display:block');
    } else {
        slide = 1;
        $('#iconDown').attr('style', 'display:block');
        $('#iconUp').attr('style', 'display:none');
    }
}
var slide = 1;
$('#allItems768').attr('style', 'display:none');
$('#selectFor768').on('click', function () {
    change(slide);
});


var items = [{
    name: '玫瑰花束', imgSrc: '../../public/images/flowerExample.jpg', price: '9999'
},
{
    name: '向日葵花束/棉花乾燥花束', imgSrc: '../../public/images/rose.png', price: '300'
},
{
    name: '百合花', imgSrc: '../../public/images/flowerExample.jpg', price: '800'
},
{
    name: '超級無敵霹靂宇宙風火輪', imgSrc: '../../public/images/rose.png', price: '12345'
},
{
    name: '可愛花花', imgSrc: '../../public/images/flowerExample.jpg', price: '700'
},
{
    name: '你是我的花朵', imgSrc: '../../public/images/rose.png', price: '1500'
}
    , {
    name: '臭臭花', imgSrc: '../../public/images/flowerExample.jpg', price: '5020'
},
{
    name: '牽牛花', imgSrc: '../../public/images/rose.png', price: '300'
},
{
    name: '霸王花', imgSrc: '../../public/images/flowerExample.jpg', price: '5600'
},
{
    name: '三八阿花', imgSrc: '../../public/images/rose.png', price: '9800'
},
{
    name: '菊花', imgSrc: '../../public/images/flowerExample.jpg', price: '1500'
},
{
    name: '有錢沒命花', imgSrc: '../../public/images/rose.png', price: '99999'
}]

$.each(items, function (index, item) {
    $('#myProduct').append(
        "<div class='productItems'>" +
        "<a href=''>" +
        `<div class='productImg'><img class='flowerExample' src='${items[index].imgSrc}'></div>` +
        "<div class='productPrice'>" +
        `<p class='flowername'>${items[index].name}</p>` +
        `<p class='prices'>NT.${items[index].price}</p>` +
        "</a>" +
        "<a href=''><img class='shoppingCarIcon' src='../../public/images/shoppingCar-icons.png'></a>" +
        "</div>" +
        "</div>"
    );
});


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
        target.style.display = "none";
        target.close();
        target.style.display = "block";
    });
}
const dialogSelfClose = target => {
    target.addEventListener('click', e => {
        if (e.target.tagName.toLowerCase() === "dialog") {
            e.preventDefault();
            target.style.display = "none";
            target.close();
            target.style.display = "block";
        };
    })
}
const [...sortListItem] = document.querySelectorAll('.sortList__item>a');

dialogOpen(timeDateSelect, sortList)
sortListItem.forEach(element => dialogclose(element, sortList))
dialogSelfClose(sortList)

