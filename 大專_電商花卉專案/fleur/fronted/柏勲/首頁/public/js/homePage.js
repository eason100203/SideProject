const getRandom = (min, max, point = 0) => {
    if (!Number.isNaN(min) && !Number.isNaN(max))
        return point == 0 ? Math.floor(Math.random() * (max - min + 1)) + min
            : Number(Math.floor(Math.random() * (max - min)) + min + Math.random().toFixed(point).slice(1));
};
const shuffle = arr => {
    for (let i = arr.length - 1; i > 0; i--) {
        let j = getRandom(0, i);
        [arr[i], arr[j]] = [arr[j], arr[i]];
    };
    return arr;
};
const fontSizeRandom = (min, max) => {
    const x = Math.floor(min);
    const y = Math.ceil(max);
    let i = getRandom(x, y, 2);
    while (min > i || i > max)
        i = getRandom(x, y, 2);
    return i
};
const addOption = (optionArr, amount) => {
    const fz = fontSizeRandom(1, 1.2) * 1.5;
    for (let i = 0; i < amount; i++) {
        feeling__options.innerHTML += `
        <p class="feeling__option" style="--bubbleDelay: ${getRandom(0, 3, 2)}s; --fz: ${fz}rem;">
            ${optionArr[i]}
        </p>`;
    };
};

const feelingList = [  // 喜怒哀樂
    "綠帽的感覺", "想要平靜", "尋求刺激", "踢到桌腳", "中大獎",
    "小人退散", "想去旅遊", "失眠的夜晚", "想躺平", "浪漫時刻",
    "開心", "有一點開心", "下午茶時光", "安靜離職中", "遇到豬隊友",
    "燭光晚餐", "憂鬱星期一", "久違的聚會", "滿足", "氣氣氣",
    "被上司罵", "有苦難言", "遇到神隊友", "加薪", "一點小害羞"
];

addOption(shuffle(feelingList), 13);

if (document.getElementsByClassName('feeling__option')) {
    const option = document.getElementsByClassName('feeling__option');
    for (const item of option) {
        item.addEventListener('click', e => {
            feeling__title.innerText = item.innerText;
            feeling__options.style.left = "-100%";
            feeling__selected.style.left = innerWidth > 390 ? "10%" : "0%";
            feeling__title.setAttribute("data-text", "←");
        });
    };
};

feeling__title.addEventListener('click', e => {
    feeling__title.innerText = "想知道，你今天過得好嗎？";
    feeling__options.style.left = innerWidth > 390 ? "10%" : "0%";
    feeling__selected.style.left = "100%";
    feeling__title.setAttribute("data-text", "");
});