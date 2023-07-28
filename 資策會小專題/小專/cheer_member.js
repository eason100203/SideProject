

function newDialog(title, imgslink, content, okBtn) {

    var okBtnHtml = "";
    // 若cancelBtn或okBtn不為null，則加入button模板，否則維持宣告時的空字串。
    if (okBtn != null) {
        okBtnHtml = `<div class="okBtn">${okBtn}</div>`;
    }

    return `<div class="dialog">
        <div class="title">${title}</div>
        <img class="diaimgs" src="${imgslink}"></img>
        <div class="content">${content}</div>
        <div class="buttons"> ${okBtnHtml}</div>
    </div>`;
}


function centerHandler() {/*設定置中的函式*/
    var scrollDist = $(window).scrollTop();/*取得捲動長度*/
    var myTop = ($(window).height() - $(".dialog").height()) / 2 + scrollDist;
    /*取得垂直中央位置*/
    var myLeft = ($(window).width() - $(".dialog").width()) / 2;
    /*取得水平中央位置*/
    $(".dialog").offset({ top: myTop, left: myLeft });
    /*設定區塊於水平與垂直置中*/
};



centerHandler(); /*呼叫置中函式，使廣告區塊置中*/
$(window).scroll(centerHandler); /*當網頁捲動時呼叫置中函式*/
$(window).resize(centerHandler);
/*當視窗縮放時呼叫置中函式*/

function bindListener() {
    // 注意okBtn跟cancelBtn中間的逗號，這是表示html tag的class只要有okBtn或cancelBtn其中一個，就會被選中。  


    $(".okBtn").click(function () {
        $(".dialog").animate({
            opacity: '0',
            top: '180px' // 需與CSS設定的起始位置相同，以保證下次彈出視窗的效果相同。			   
        }, 350, function () {
            // 此區塊為callback function，會在動畫結束時被呼叫。
            $(".modals").remove(); // 移除modal。
            $(".dialog").remove(); // 移除dialog。
        });
    });

    $(document).keydown(function (e) {
        if (e.keyCode === 13) { // enter 鍵的 keyCode 為 13
            $(".okBtn").trigger("click"); // 觸發 "okBtn" 的 click 事件
        }

    });

}


function show() {
    // 叫出Modal遮住背景。

    showModal();
    // 播放滑動視窗動畫。
    // fadeInAnimation();
    centerHandler();
    // 監聽cancelBtn跟okBtn的click事件。
    bindListener();
}



function showModal() {
    $(".bodyy").prepend(`<div class="modals"></div>`);
    // 在<body>的最前面加入modal，遮住畫面背景。    

}

$(".xiongdione").click(function () {
    // 在<body>加入newDialog html。
    //在body裡面設斷點,讓效果在>992px時成立;
    if (window.innerWidth >= 992) {
        $("body").append(
            newDialog("中信兄弟啦啦隊",
                "./兄弟象啦啦隊去背/希希.png",
                `<div>姓名:希希</div>
        <div>身高:168</div>
        <div>星座:獅子座</div>`,
                "喜翻")
        );
        show();
    }

});

$(".xiongditwo").click(function () {
    // 在<body>加入newDialog html。
    if (window.innerWidth >= 992) {
        $("body").append(
            newDialog("中信兄弟啦啦隊",
                "./兄弟象啦啦隊去背/julie.png",
                `<div>姓名:Julie</div>
             <div>身高:168.5</div>
             <div>星座:巨蟹座</div>`,
                "喜翻")
        );
        show();
    }
});

$(".xiongdithree").click(function () {
    // 在<body>加入newDialog html。
    if (window.innerWidth >= 992) {
        $("body").append(
            newDialog("中信兄弟啦啦隊",
                "./兄弟象啦啦隊去背/沛祺.png",
                `<div>姓名:沛祺</div>
             <div>身高:170</div>
             <div>星座:魔羯座</div>`,
                "喜翻")
        );
        show();
    }
});
$(".xiongdifour").click(function () {
    // 在<body>加入newDialog html。
    if (window.innerWidth >= 992) {
        $("body").append(
            newDialog("中信兄弟啦啦隊",
                "./兄弟象啦啦隊去背/峮峮.png",
                `<div>姓名:<a href="https://www.instagram.com/qun_04/" target="_blank">峮峮</a></div>
             <div>身高:160</div>
             <div>星座:牡羊座</div>`,
                "喜翻")
        );
        show();
    }
});

$(".xiongdifive").click(function () {
    // 在<body>加入newDialog html。
    if (window.innerWidth >= 992) {
        $("body").append(
            newDialog("中信兄弟啦啦隊",
                "./兄弟象啦啦隊去背/波波.png",
                `<div>姓名:波波/Bobo</div>
             <div>身高:168</div>
             <div>星座:巨蟹座</div>`,
                "喜翻")
        );
        show();
    }
});

$(".xiongdisix").click(function () {
    // 在<body>加入newDialog html。
    if (window.innerWidth >= 992) {
        $("body").append(
            newDialog("中信兄弟啦啦隊",
                "./兄弟象啦啦隊去背/白白.png",
                `<div>姓名:白白</div>
             <div>身高:165</div>
             <div>星座:魔羯座</div>`,
                "喜翻")
        );
        show();
    }
});

$(".xiongdiseven").click(function () {
    // 在<body>加入newDialog html。
    if (window.innerWidth >= 992) {
        $("body").append(
            newDialog("中信兄弟啦啦隊",
                "./兄弟象啦啦隊去背/笑笑.png",
                `<div>姓名:笑笑</div>
             <div>身高:171</div>
             <div>星座:牡羊座</div>`,
                "喜翻")
        );
        show();
    }
});

$(".xiongdieight").click(function () {
    // 在<body>加入newDialog html。
    if (window.innerWidth >= 992) {
        $("body").append(
            newDialog("中信兄弟啦啦隊",
                "./兄弟象啦啦隊去背/貴貴.png",
                `<div>姓名:貴貴/Sammy</div>
             <div>身高:168</div>
             <div>星座:天秤座</div>`,
                "喜翻")
        );
        show();
    }
});

$(".xiongdinine").click(function () {
    if (window.innerWidth >= 992) {
        // 在<body>加入newDialog html。
        $("body").append(
            newDialog("中信兄弟啦啦隊",
                "./兄弟象啦啦隊去背/粿粿.png",
                `<div>姓名:粿粿</div>
             <div>身高:163</div>
             <div>星座:獅子座</div>`,
                "喜翻")
        );
        show();
    }
});

$(".dragron1").click(function () {
    // 在<body>加入newDialog html。
    if (window.innerWidth >= 992) {
        $("body").append(
            newDialog("味全龍啦啦隊",
                "./味全龍啦啦隊去背/口水2.png",
                `<div>姓名:口水</div>
             <div>身高:166</div>
             <div>星座:魔羯座</div>`,
                "喜翻")
        );
        show();
    }
});

$(".dragron2").click(function () {
    // 在<body>加入newDialog html。
    if (window.innerWidth >= 992) {
        $("body").append(
            newDialog("味全龍啦啦隊",
                "./味全龍啦啦隊去背/賴可.png.png",
                `<div>姓名:賴可/LIKE</div>
             <div>身高:161</div>
             <div>星座:天秤座</div>`,
                "喜翻")
        );
        show();
    }
});

$(".dragron3").click(function () {
    // 在<body>加入newDialog html。
    if (window.innerWidth >= 992) {
        $("body").append(
            newDialog("味全龍啦啦隊",
                "./味全龍啦啦隊去背/小映.png.png",
                `<div>姓名:小映</div>
             <div>身高:166</div>
             <div>星座:射手座</div>`,
                "喜翻")
        );
        show();
    }
});

$(".dragron4").click(function () {
    // 在<body>加入newDialog html。
    if (window.innerWidth >= 992) {
        $("body").append(
            newDialog("味全龍啦啦隊",
                "./味全龍啦啦隊去背/小蛙.png.png",
                `<div>姓名:<a href="https://www.instagram.com/cutewa555/" target="_blank">小蛙</a></div>
             <div>身高:155</div>
             <div>星座:金牛座</div>`,
                "喜翻")
        );
        show();
    }
});

$(".dragron5").click(function () {
    // 在<body>加入newDialog html。
    if (window.innerWidth >= 992) {
        $("body").append(
            newDialog("味全龍啦啦隊",
                "./味全龍啦啦隊去背/張晴.png.png",
                `<div>姓名:張晴</div>
             <div>身高:162</div>
             <div>星座:雙魚座</div>`,
                "喜翻")
        );
        show();
    }
});

$(".dragron6").click(function () {
    // 在<body>加入newDialog html。
    if (window.innerWidth >= 992) {
        $("body").append(
            newDialog("味全龍啦啦隊",
                "./味全龍啦啦隊去背/馬妹.png.png",
                `<div>姓名:馬妹</div>
             <div>身高:165</div>
             <div>星座:巨蟹座</div>`,
                "喜翻")
        );
        show();
    }
});

$(".dragron7").click(function () {
    // 在<body>加入newDialog html。
    if (window.innerWidth >= 992) {
        $("body").append(
            newDialog("味全龍啦啦隊",
                "./味全龍啦啦隊去背/軒軒.png.png",
                `<div>姓名:軒軒</div>
             <div>身高:170</div>
             <div>星座:巨蟹座</div>`,
                "喜翻")
        );
        show();
    }
});

$(".dragron8").click(function () {
    // 在<body>加入newDialog html。
    if (window.innerWidth >= 992) {
        $("body").append(
            newDialog("味全龍啦啦隊",
                "./味全龍啦啦隊去背/米奇.png.png",
                `<div>姓名:米奇/Micky</div>
             <div>身高:165</div>
             <div>星座:雙子座</div>`,
                "喜翻")
        );
        show();
    }
});

$(".dragron9").click(function () {
    // 在<body>加入newDialog html。
    if (window.innerWidth >= 992) {
        $("body").append(
            newDialog("味全龍啦啦隊",
                "./味全龍啦啦隊去背/星岑.png.png",
                `<div>姓名:星岑</div>
             <div>身高:165</div>
             <div>星座:射手座</div>`,
                "喜翻")
        );
        show();
    }
});



$(".fubang1").click(function () {
    // 在<body>加入newDialog html。
    if (window.innerWidth >= 992) {
        $("body").append(
            newDialog("富邦悍將啦啦隊",
                "./富邦悍將啦啦隊去背/Cali2.png",
                `<div>姓名:卡卡</div>
        <div>身高:163</div>
        <div>星座:雙魚座</div>`,
                "喜翻")
        );
        show();
    }
});

$(".fubang2").click(function () {
    // 在<body>加入newDialog html。
    if (window.innerWidth >= 992) {
        $("body").append(
            newDialog("富邦悍將啦啦隊",
                "./富邦悍將啦啦隊去背/Kesha2.png",
                `<div>姓名:Kesha</div>
        <div>身高:158</div>
        <div>星座:天秤座</div>`,
                "喜翻")
        );
        show();
    }
});


$(".fubang3").click(function () {
    // 在<body>加入newDialog html。
    if (window.innerWidth >= 992) {
        $("body").append(
            newDialog("富邦悍將啦啦隊",
                "./富邦悍將啦啦隊去背/丹丹2.png",
                `<div>姓名:丹丹</div>
        <div>身高:158</div>
        <div>星座:水瓶座</div>`,
                "喜翻")
        );
        show();
    }
});


$(".fubang4").click(function () {
    // 在<body>加入newDialog html。
    if (window.innerWidth >= 992) {
        $("body").append(
            newDialog("富邦悍將啦啦隊",
                "./富邦悍將啦啦隊去背/慈妹2.png",
                `<div>姓名:<a href="https://www.instagram.com/_joyceee037/reels/" target="_blank">慈妹</a></div>
        <div>身高:156</div>
        <div>星座:雙魚座</div>`,
                "喜翻")
        );
        show();
    }
});

$(".fubang5").click(function () {
    // 在<body>加入newDialog html。
    if (window.innerWidth >= 992) {
        $("body").append(
            newDialog("富邦悍將啦啦隊",
                "./富邦悍將啦啦隊去背/奶昔2.png",
                `<div>姓名:奶昔</div>
        <div>身高:156</div>
        <div>星座:巨蟹座</div>`,
                "喜翻")
        );
        show();
    }
});

$(".fubang6").click(function () {
    // 在<body>加入newDialog html。
    if (window.innerWidth >= 992) {
        $("body").append(
            newDialog("富邦悍將啦啦隊",
                "./富邦悍將啦啦隊去背/檸檬2.png",
                `<div>姓名:檸檬</div>
        <div>身高:168</div>
        <div>星座:雙子座</div>`,
                "喜翻")
        );
        show();
    }
});

$(".fubang7").click(function () {
    // 在<body>加入newDialog html。
    if (window.innerWidth >= 992) {
        $("body").append(
            newDialog("富邦悍將啦啦隊",
                "./富邦悍將啦啦隊去背/沁沁2.png",
                `<div>姓名:沁沁</div>
        <div>身高:162</div>
        <div>星座:魔羯座</div>`,
                "喜翻")
        );
        show();
    }
});

$(".fubang8").click(function () {
    // 在<body>加入newDialog html。
    if (window.innerWidth >= 992) {
        $("body").append(
            newDialog("富邦悍將啦啦隊",
                "./富邦悍將啦啦隊去背/秀秀子2.png",
                `<div>姓名:秀秀子</div>
        <div>身高:165</div>
        <div>星座:天蠍座</div>`,
                "喜翻")
        );
        show();
    }
});

$(".fubang9").click(function () {
    // 在<body>加入newDialog html。
    if (window.innerWidth >= 992) {
        $("body").append(
            newDialog("富邦悍將啦啦隊",
                "./富邦悍將啦啦隊去背/維心2.png",
                `<div>姓名:維心</div>
        <div>身高:160</div>
        <div>星座:天秤座</div>`,
                "喜翻")
        );
        show();
    }
});



$(".lottam1").click(function () {
    // 在<body>加入newDialog html。
    if (window.innerWidth >= 992) {
        $("body").append(
            newDialog("樂天桃猿啦啦隊",
                "./樂天啦啦隊去背/凱莉絲.png",
                `<div>姓名:凱莉絲</div>
        <div>身高:167</div>
        <div>星座:牡羊座</div>`,
                "喜翻")
        );
        show();
    }
});

$(".lottam2").click(function () {
    // 在<body>加入newDialog html。
    if (window.innerWidth >= 992) {
        $("body").append(
            newDialog("樂天桃猿啦啦隊",
                "./樂天啦啦隊去背/nina.png",
                `<div>姓名:林穎樂</div>
        <div>身高:161</div>
        <div>星座:魔羯座</div>`,
                "喜翻")
        );
        show();
    }
});

$(".lottam3").click(function () {
    // 在<body>加入newDialog html。
    if (window.innerWidth >= 992) {
        $("body").append(
            newDialog("樂天桃猿啦啦隊",
                "./樂天啦啦隊去背/妮萱.png",
                `<div>姓名:倪暄</div>
        <div>身高:167</div>
        <div>星座:獅子座</div>`,
                "喜翻")
        );
        show();
    }
});

$(".lottam4").click(function () {
    // 在<body>加入newDialog html。
    if (window.innerWidth >= 992) {
        $("body").append(
            newDialog("樂天桃猿啦啦隊",
                "./樂天啦啦隊去背/林襄.png",
                `<div>姓名:<a href="https://www.instagram.com/95_mizuki/?hl=zh-tw" target="_blank">林襄</a></div>
        <div>身高:160</div>
        <div>星座:處女座</div>`,
                "喜翻")
        );
        show();
    }
});


$(".lottam5").click(function () {
    // 在<body>加入newDialog html。
    if (window.innerWidth >= 992) {
        $("body").append(
            newDialog("樂天桃猿啦啦隊",
                "./樂天啦啦隊去背/李多慧.png",
                `<div>姓名:李多慧</div>
        <div>身高:165</div>
        <div>星座:獅子座</div>`,
                "喜翻")
        );
        show();
    }
});

$(".lottam6").click(function () {
    if (window.innerWidth >= 992) {
        // 在<body>加入newDialog html。
        $("body").append(
            newDialog("樂天桃猿啦啦隊",
                "./樂天啦啦隊去背/籃籃.png",
                `<div>姓名:籃籃</div>
        <div>身高:162</div>
        <div>星座:巨蟹座</div>`,
                "喜翻")
        );
        show();
    }
});

$(".lottam7").click(function () {
    if (window.innerWidth >= 992) {
        // 在<body>加入newDialog html。
        $("body").append(
            newDialog("樂天桃猿啦啦隊",
                "./樂天啦啦隊去背/陳伊.png",
                `<div>姓名:陳伊</div>
        <div>身高:165</div>
        <div>星座:天秤座</div>`,
                "喜翻")
        );
        show();
    }
});

$(".lottam8").click(function () {
    if (window.innerWidth >= 992) {
        // 在<body>加入newDialog html。
        $("body").append(
            newDialog("樂天桃猿啦啦隊",
                "./樂天啦啦隊去背/玲但.png",
                `<div>姓名:琳妲</div>
        <div>身高:160</div>
        <div>星座:射手座</div>`,
                "喜翻")
        );
        show();
    }
});

$(".lottam9").click(function () {
    // 在<body>加入newDialog html。
    if (window.innerWidth >= 992) {
        $("body").append(
            newDialog("樂天桃猿啦啦隊",
                "./樂天啦啦隊去背/曲藝.png",
                `<div>姓名:曲曲</div>
        <div>身高:166</div>
        <div>星座:獅子座</div>`,
                "喜翻")
        );
        show();
    }
});


$(".lion1").click(function () {
    // 在<body>加入newDialog html。
    if (window.innerWidth >= 992) {
        $("body").append(
            newDialog("統一獅啦啦隊",
                "./統一獅啦啦隊/Yovia.jpg@2x.png",
                `<div>姓名:Yovia</div>
        <div>身高:160</div>
        <div>星座:牡羊座</div>`,
                "喜翻")
        );
        show();
    }
});

$(".lion2").click(function () {
    // 在<body>加入newDialog html。
    if (window.innerWidth >= 992) {
        $("body").append(
            newDialog("統一獅啦啦隊",
                "./統一獅啦啦隊/賴賴.jpg@2x.png",
                `<div>姓名:賴賴</div>
        <div>身高:155</div>
        <div>星座:天蠍座</div>`,
                "喜翻")
        );
        show();
    }
});

$(".lion3").click(function () {
    if (window.innerWidth >= 992) {
        // 在<body>加入newDialog html。
        $("body").append(
            newDialog("統一獅啦啦隊",
                "./統一獅啦啦隊/YUKI@2x.png",
                `<div>姓名:YUKI</div>
        <div>身高:165</div>
        <div>星座:牡羊座</div>`,
                "喜翻")
        );
        show();
    }
});

$(".lion4").click(function () {
    // 在<body>加入newDialog html。
    if (window.innerWidth >= 992) {
        $("body").append(
            newDialog("統一獅啦啦隊",
                "./統一獅啦啦隊/艾璐Airu.jpg@2x.png",
                `<div>姓名:<a href="https://www.instagram.com/airu_0307/" target="_blank">艾璐Airu</a></div>
        <div>身高:166.5</div>
        <div>星座:雙魚座</div>`,
                "喜翻")
        );
        show();
    }
});

$(".lion5").click(function () {
    // 在<body>加入newDialog html。
    if (window.innerWidth >= 992) {
        $("body").append(
            newDialog("統一獅啦啦隊",
                "./統一獅啦啦隊/妮妮@2x.png",
                `<div>姓名:妮妮</div>
        <div>身高:165</div>
        <div>星座:天蠍座</div>`,
                "喜翻")
        );
        show();
    }
});

$(".lion6").click(function () {
    // 在<body>加入newDialog html。
    if (window.innerWidth >= 992) {
        $("body").append(
            newDialog("統一獅啦啦隊",
                "./統一獅啦啦隊/SEUL7瑟七.jpg@2x.png",
                `<div>姓名:SEUL7瑟七</div>
        <div>身高:161</div>
        <div>星座:雙魚座</div>`,
                "喜翻")
        );
        show();
    }
});

$(".lion7").click(function () {
    // 在<body>加入newDialog html。
    if (window.innerWidth >= 992) {
        $("body").append(
            newDialog("統一獅啦啦隊",
                "./統一獅啦啦隊/小旻 拷貝@2x.png",
                `<div>姓名:小旻</div>
        <div>身高:156</div>
        <div>星座:處女座</div>`,
                "喜翻")
        );
        show();
    }
});

$(".lion8").click(function () {
    // 在<body>加入newDialog html。
    if (window.innerWidth >= 992) {
        $("body").append(
            newDialog("統一獅啦啦隊",
                "./統一獅啦啦隊/Albee愛比 拷貝@2x.png",
                `<div>姓名:Albee愛比</div>
        <div>身高:158</div>
        <div>星座:處女座</div>`,
                "喜翻")
        );
        show();
    }
});

$(".lion9").click(function () {
    // 在<body>加入newDialog html。
    if (window.innerWidth >= 992) {
        $("body").append(
            newDialog("統一獅啦啦隊",
                "./統一獅啦啦隊/草莓.jpg@2x.png",
                `<div>姓名:草莓</div>
        <div>身高:155</div>
        <div>星座:金牛座</div>`,
                "喜翻")
        );
        show();
    }
});

var leader = document.querySelectorAll(".leader");
var leaderResult = (Array.from(leader));

var ballLogo = document.querySelectorAll(".balllogo");
var ballLogoResult = (Array.from(ballLogo));

// console.log(ballLogoResult);

var i = 0;
ballLogoResult[0].addEventListener("click", function () {
    if (window.innerWidth < 992) {
        if (i === 0) {
            leaderResult[0].style.display = "flex";
            i++;
        } else {
            leaderResult[0].style.display = "none";
            i--;
        }
    }
});

//一定要再設一個resize監聽畫面寬度才有辦法.
window.addEventListener("resize", function () {
    console.log(window.innerWidth);
    if (window.innerWidth > 992) {
        leaderResult[0].style.display = "";
    }
})

ballLogoResult[1].addEventListener("click", function () {
    if (i === 0) {
        leaderResult[1].style = "display:flex";
        i++;
    } else {
        leaderResult[1].style = "display:none";
        i--;
    }
})

window.addEventListener("resize", function () {
    console.log(window.innerWidth);
    if (window.innerWidth > 992) {
        leaderResult[1].style.display = "";
    }
})



ballLogoResult[2].addEventListener("click", function () {
    if (window.innerWidth <= 992) {
        if (i === 0) {
            leaderResult[2].style = "display:flex";
            i++;
        } else {
            leaderResult[2].style = "display:none";
            i--;
        }
    }
})

window.addEventListener("resize", function () {
    console.log(window.innerWidth);
    if (window.innerWidth > 992) {
        leaderResult[2].style.display = "";
    }
})


ballLogoResult[3].addEventListener("click", function () {
    if (i === 0) {
        leaderResult[3].style = "display:flex";
        i++;
    } else {
        leaderResult[3].style = "display:none";
        i--;
    }
})

window.addEventListener("resize", function () {
    console.log(window.innerWidth);
    if (window.innerWidth > 992) {
        leaderResult[3].style.display = "";
    }
})


ballLogoResult[4].addEventListener("click", function () {
    if (i === 0) {
        leaderResult[4].style = "display:flex";
        i++;
    } else {
        leaderResult[4].style = "display:none";
        i--;
    }
})

window.addEventListener("resize", function () {
    console.log(window.innerWidth);
    if (window.innerWidth > 992) {
        leaderResult[4].style.display = "";
    }
})
