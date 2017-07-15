//REM
function myFontSize() {
    var desW = 640,
        winW = document.documentElement.clientWidth,
        radio = winW / desW,
        one = document.querySelector(".one");
    if (winW > desW) {
        one.style.margin = "0 auto";
        one.style.width = desW + "px";
        return;
    } else {
        document.documentElement.style.fontSize = radio * 100 + "px";
    }
};
myFontSize();
window.onresize = function () {
    myFontSize();
};


//音乐旋转
~function () {
    var musicBtn = document.getElementById("musicBtn"),
        musicMove = document.getElementById("musicMove");
    musicBtn.addEventListener("click", function () {
        if (musicMove.paused) {
            musicMove.play();
            musicBtn.className = "music move";
            return;
        } else {
            musicMove.pause();
            musicBtn.className = "music";
        }
    }, false);
    function controlMusic() {
        // musicMove.volume = .5;
        musicMove.play();
        musicMove.addEventListener("canplay", function () {
            musicBtn.style.display = "block";
            musicBtn.className = "music move";
        })
    }

    window.setTimeout(controlMusic, 1000)
}();

//卷帘
var oLis = document.querySelectorAll('.myPage1 li');
var delay = 0;
for (var i = 0; i < oLis.length; i++) {
    var cur = oLis[i];
    delay += 200;
    cur.style.webkitAnimationDelay = delay + 'ms';
}

//打印文字

function print(str, container) {
    var frg = document.createDocumentFragment();
    for (var i = 0; i < str.length; i++) {
        var oSpan = document.createElement('span');
        oSpan.innerHTML = str[i];
        oSpan.style.webkitAnimationDelay = i * 0.2 + 's';
        frg.appendChild(oSpan);
    }
    container.appendChild(frg);
}

var txt1 = '为人踏实、勤奋，工作积极，对新事物有较强的接受能力。敢于创新，精益求精，能够妥善的处理周围的人际关系，团结同事，并具有极强的团队合作精神.';
var box1 = document.getElementsByClassName("box1")[0];
print(txt1, box1);

var txt2 = '熟练计算机IT技术，对IT周边科技发展有浓厚兴趣;团队意识及适应能力强,抗压能力好,喜欢面对挑战迎难而上;希望能得到贵公司面试机会.';
var box2 = document.getElementsByClassName("box2")[0];
print(txt2, box2);

//魔方滑动
var mySwiper = null;
var mfRender = (function () {
    var $mf = $("#mf"),
        $box = $mf.children('.box'),
        $boxLi = $box.children('li');

    //滑动

    //判断手滑失误
    function slide(changeX, changeY) {
        return Math.abs(changeX) > 30 || Math.abs(changeY) > 0;
    }

    function start(e) {
        var point = e.touches[0];
        $(this).attr({
            strX: point.clientX,
            strY: point.clientY,
            changeX: 0,
            changeY: 0
        })
    }

    function move(e) {
        var point = e.touches[0];
        var changeX = point.clientX - $(this).attr('strX'),
            changeY = point.clientY - $(this).attr('strY');
        $(this).attr({
            changeX: changeX,
            changeY: changeY
        });
    }

    function end(e) {
        var changeX = parseFloat($(this).attr('changeX')),
            changeY = parseFloat($(this).attr('changeY'));
        var rotateX = parseFloat($(this).attr('rotateX')),
            rotateY = parseFloat($(this).attr('rotateY'));
        if (slide(changeX, changeY) === false) return;
        rotateX = rotateX - rotateY / 1.2;
        rotateY = rotateY + rotateX / 1.2;
        $(this).attr({
            rotateX: rotateX,
            rotateY: rotateY
        }).css('transform', 'scale(0.5) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg)');

    }

    return {
        init: function () {
            $mf.css('display', 'block');

            //魔方区域滑动
            if (lx === 100) {
                $box.attr({
                    rotateX: -30,
                    rotateY: 45
                });
                $box.on('mousedown', dragDown);
            } else {
                $box.attr({
                    rotateX: -30,
                    rotateY: 45
                }).on('touchstart', start).on('touchmove', move).on('touchend', end);
            }

            $boxLi.singleTap(function () {
                var index = $(this).index();
                $mf.css('display', 'none');
                swiperRender.init(index);

            });
        }
    }
})();


mfRender.init();

~function (pro) {
    function queryURLParameter() {
        var reg = /([^?=&#]+)=([^?=&#]+)/g,
            obj = {};
        this.replace(reg, function () {
            obj[arguments[1]] = arguments[2];
        });
        return obj;
    }

    pro.queryURLParameter = queryURLParameter;
}(String.prototype);


var urlObj = window.location.href.queryURLParameter(),
    page = parseFloat(urlObj['page']),
    lx = parseFloat(urlObj['lx']);
if (lx === 100) {
    $('body').css('cursor', 'pointer');
    FastClick.attach(document.body);
}


var swiperRender = (function () {
    var $swiper = $('#mySwiper'),
        $return = $swiper.children('.home');

    //->change:实现每一屏幕滑动切换后控制页面的动画
    function change(example) {
        var slidesAry = example.slides,
            activeIndex = example.activeIndex;

        $.each(slidesAry, function (index, item) {
            if (index === activeIndex) {
                item.id = 'page0' + (activeIndex + 1);
                return;
            }
            item.id = null;
        });
    }

    return {
        init: function (index) {
            $swiper.css('display', 'block');

            //->初始化SWIPER实现六个页面之间的切换
            var mySwiper = new Swiper('.swiper-container', {
                effect: 'coverflow',
                onTransitionEnd: change,
                onInit: change
            });
            index = index || 0;
            mySwiper.slideTo(index, 0);

            //->给返回按钮绑定单击事件
            if (lx === 100) {
                $return.on('click', function () {
                    $swiper.css('display', 'none');
                    $('#mf').css('display', 'block');
                });
            } else {
                $return.singleTap(function () {
                    $swiper.css('display', 'none');
                    $('#mf').css('display', 'block');
                });
            }
        }
    }
})();


















