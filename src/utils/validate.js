// 过滤特殊字符
export function stripscript(str) {
    var pattern = new RegExp(/[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+ ={}|《》？：“”【】、；‘'，。、？]/)
    var rs = ""
    for (let i = 0; i < str.length; i++) {
        rs = rs + str.substr(i, 1).replace(pattern, '');

    }
    return rs;
}
// 邮箱正则
export function validateEmail(value) {
    let reg = /^([a-zA-Z\d])(\w|\-)+@[a-zA-Z\d]+\.[a-zA-Z]{2,4}$/;
    return !reg.test(value) ? true : false
}
// 密码正则(6-20位大小写字母加数字)
export function validatePassword(value) {
    let reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    return !reg.test(value) ? true : false
}
// 验证码正则
export function validateCode(value) {
    let reg = /^[a-z0-9]{6}$/;
    return !reg.test(value) ? true : false
}