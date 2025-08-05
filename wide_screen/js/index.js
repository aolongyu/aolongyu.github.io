/**
 * @description index.js
 * @author aolongyu
 * @created 2020/11/27 09:48:21
 */

//解决IE8之类不支持getElementsByClassName
if (!document.getElementsByClassName) {
    document.getElementsByClassName = function (className, element) {
        var children = (element || document).getElementsByTagName('*');
        var elements = new Array();
        for (var i = 0; i < children.length; i++) {
            var child = children[i];
            var classNames = child.className.split(' ');
            for (var j = 0; j < classNames.length; j++) {
                if (classNames[j] == className) {
                    elements.push(child);
                    break;
                }
            }
        }
        return elements;
    };
}

var spanArr = [
    '[活动]游拍代言人，我们再这里等着你~[活动]游拍代言人，我们再这里等着你~[活动]游拍代言人，我们再这里等着你~[活动]游拍代言人，我们再这里等着你~',
    '保卫萝卜3',
    '球球大作战',
    '星宠小P：星海传奇'
]

var target = -540
var speed = 10

// var nav = document.getElementsByClassName('nav')[0]

var range = document.getElementsByClassName('range')[0]

var imgList = document.getElementById('imgList')
var imgArr = document.getElementsByClassName('elementImg')
var allA = document.getElementsByClassName('elementA')
var span = document.getElementsByClassName('carousel-activity')[0]

// 音乐调节
function getVal(val) {
    range.style.backgroundSize = val + "% 100%"
}

// 适应不同张数图片
imgList.style.width = 540 * imgArr.length + 'px'

var index = 0
setA()
autoChange()

// 设置点击切换
for (var i = 0; i < allA.length; i++) {
    allA[i].num = i
    allA[i].onclick = function () {
        // console.log(this.num);
        clearInterval(timer)
        index = this.num
        move(imgList, 'left', target * index, speed, function () {
            setA()
            autoChange()
        })
    }
}

function setA() {
    if (index >= imgArr.length - 1) {
        index = 0
        imgList.style.left = 0 + 'px'
    }
    for (var i = 0; i < allA.length; i++) {
        allA[i].style.width = ''
        allA[i].style.backgroundColor = ''
    }
    allA[index].style.width = '32px'
    allA[index].style.backgroundColor = 'rgb(255, 156, 0)'
    span.innerHTML = spanArr[index]
}

// 轮播
var timer

function autoChange() {
    timer = setInterval(function () {
        index = (index + 1) % imgArr.length
        move(imgList, 'left', target * index, speed, function () {
            setA()
            // console.log(index);
        })
    }, 4000)
}

// 轮播图翻页
function changePage(msg) {
    if (msg === 'next') {
        index = (index + 1) % imgArr.length
    } else {
        if (index == 0) {
            index = imgArr.length - 2
            imgList.style.left = -540 * (imgArr.length - 1) + 'px'
        } else {
            index = index - 1
        }
    }
    // console.log('this: ', index);
    clearInterval(timer)
    move(imgList, 'left', target * index, speed, function () {
        setA()
        autoChange()
    })
}

// 处理ie多行省略
// 是否ie
if (window.ActiveXObject || "ActiveXObject" in window) {
    var reg = new RegExp("[\\u4E00-\\u9FFF]+","g");
    var vlistMessage = document.getElementsByClassName('vlist-message')
    for (var i = 0; i < vlistMessage.length; i++) {
        var message = vlistMessage[i].innerText

        // 此处判断是否中文
        // for(var j = 0; j < message.length; j++) {
        //     if(reg.test(message[j])) {

        //     }
        // }
        
        // console.log(message);
        if (message.length >= 31) {
            message = message.substring(0, 31)
            vlistMessage[i].innerText = message + '...'
        }
        console.log(message);
    }

    var channelText = document.getElementsByClassName('channel-text')
    for (var i = 0; i < channelText.length; i++) {
        var message = channelText[i].innerText
        // console.log(message);
        if (message.length >= 27) {
            message = message.substring(0, 27)
            channelText[i].innerText = message + '...'
        }
        // console.log(message);
    }
}