/**
 * @description tools
 * @author aolongyu
 * @created 2020/11/28 12:25:47
 */



/**
 * 获取对象样式
 * @param {object} obj 获取样式的对象
 * @param {string} name 样式名
 */
function getStyle(obj, name) {
    if (window.getComputedStyle) {
        return getComputedStyle(obj, null)[name]
    } else {
        return obj.currentStyle[name]
    }
}

/**
 * move封装
 * @param {object} obj move对象
 * @param {string} attr 改变的属性
 * @param {number} target 移动到的目标位
 * @param {number} speed 速度
 * @param {function} callback 回调函数
 */
function move(obj, attr, target, speed, callback) {
    clearInterval(obj.timer)
    var current = parseInt(getStyle(obj, attr))
    if (current > target) {
        speed = -speed
    }
    obj.timer = setInterval(function () {
        var oldValue = parseInt(getStyle(obj, attr))
        var newValue = oldValue + speed
        if ((speed < 0 && newValue < target) || (speed > 0 && newValue > target)) {
            newValue = target
        }
        obj.style[attr] = newValue + 'px'
        if (newValue == target) {
            clearInterval(obj.timer)
            callback && callback()
        }
    }, 10)
}
