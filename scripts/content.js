setInterval(function () {
    var hours = new Date().getHours()
    var minutes = new Date().getMinutes()
    var seconds = new Date().getSeconds()

    if (hours.toString().length == 1) {
        hours = "0" + hours
    }

    if (minutes.toString().length == 1) {
        minutes = "0" + minutes
    }

    if (seconds.toString().length == 1) {
        seconds = "0" + seconds
    }

    var time = hours + ":" + minutes + ":" + seconds

    console.log(time)

    // 从 hexfuture.net 的名为 userName 的 cookie 中获取用户名
    var userName = document.cookie.split("; ").find(row => row.startsWith("userName=")).split("=")[1]
    // urlencode 解码
    userName = decodeURIComponent(userName)

    var userNameGlobalWhiteList = ['贺长安', '徐建', '余云富', '何燕秋', '唐化兰']

    var autoFinishClassWhiteList = ['唐化兰']

    var timeTable = ['08:30:00', '09:20:00', '10:10:00', '11:20:00', '12:10:00', '15:25:00', '16:15:00', '17:05:00', '17:55:00', '19:30:00', '20:20:00', '21:10:00', '22:00:00']

    var noticeTimeTable = ['08:25:00', '09:15:00', '10:05:00', '11:15:00', '12:05:00', '15:20:00', '16:10:00', '17:00:00', '17:50:00', '19:25:00', '20:15:00', '21:05:00', '21:55:00']

    var finishClassTimeTable = ['08:31:30', '09:21:30', '10:11:30', '11:21:30', '12:11:30', '15:26:30', '16:16:30', '17:06:30', '17:56:30', '19:31:30', '20:21:30', '21:11:30', '22:01:30']

    // TODO: var afterClassTimeTable = 
    // startClass.remove()

    // 如果下课按钮存在 则认为已经上课 执行下列判断
    if (document.querySelector("header > div.finishClass > a")) {


        if (userNameGlobalWhiteList.indexOf(userName) != -1) {
            console.log("全局白名单教师，不执行下课相关逻辑")
        } else {

            if (timeTable.indexOf(time) != -1) {
                if (autoFinishClassWhiteList.indexOf(userName) != -1) {
                    document.querySelector("header > div.courseName > span.finishClass").innerHTML = "<span class='finishClass'>下课了，" + userName + "老师，您辛苦了。</span>"
                } else {
                    document.querySelector("header > div.courseName > span.finishClass").innerHTML = "<span class='finishClass'>下课了，" + userName + "老师，您辛苦了；系统将于 1 分钟 30 秒后自动登出。</span>"

                }

                // alert("下课时间到了，" + userName + "老师，您辛苦了。\n您还有 1 分钟 30 秒收尾时间，在此之后，系统会为您自动登出。")
                // document.querySelector("header > div.fullScreen > a").click()

                // document.querySelector("header > div.finishClass > a").click()
            }

            if (noticeTimeTable.indexOf(time) != -1) {
                // alert("距下课还有 5 分钟，请您合理安排课堂进度。")<
                // $(".courseName").append("<span class='finishClass'>距下课还有 5 分钟，请您合理安排课堂进度。</span>")
                document.querySelector("header > div.courseName").innerHTML = document.querySelector("header > div.courseName").innerHTML + "<span class='finishClass'>距下课还有 5 分钟，请您合理安排课堂进度。</span>"

                // document.querySelector("header > div.fullScreen > a").click()
            }

            if (finishClassTimeTable.indexOf(time) != -1) {
                if (autoFinishClassWhiteList.indexOf
                    (userName) != -1) {
                    console.log("The teacher currently has been allowed to bypass the rule.")
                } else {
                    document.querySelector("header > div.courseName > span.finishClass").innerHTML = "<span class='finishClass'>登出中……</span>"
                    document.querySelector("header > div.finishClass > a").click()
                }
            }
        }

        if (document.querySelector("div.bottomDock > div.selectStudent")) {
            document.querySelector("div.bottomDock > div.selectStudent").remove()
        }

    }



}, 1000

)

// 十六进制的课程表存在 localStorage 里，直接用 JS 改 DOM 应该就能自由发挥周末课程。

// 如果在主页
if (document.querySelector("header > div.startClass > a")) {
    // 获取今天是周几
    var day = new Date().getDay()
    var syllabus_parameter = localStorage.getItem("inclass-syllabus-parameter")
    // response data sample: '{"dayCount":7,"classCount":9}'
    var syllabus_parameter_json = JSON.parse(syllabus_parameter)
    var dayCount = syllabus_parameter_json.dayCount
    if (dayCount == 5) {
        // 拼接 dayCount = 7 的 JSON
        var syllabus_parameter_json_7 = {
            "dayCount": 7,
            "classCount": syllabus_parameter_json.classCount
        }
        // 转换成字符串
        var syllabus_parameter_7 = JSON.stringify(syllabus_parameter_json_7)
        // 存入 localStorage
        localStorage.setItem("inclass-syllabus-parameter", syllabus_parameter_7)
    }

    setTimeout(function () {
        // 如果今天是周末
        if (day == 6 || day == 0) {
            if (day == 0) {
                day = 7
            }
            if (day == 6) {
                day = 6
            }
            // 在当周课表中找到对应列的 a 标签
            var syllabus = document.querySelectorAll("main > div.syllabus > div.week > div#syllabus > div.oneDay")
            var syllabusWeekToday = syllabus[day]
            var syllabusWeekToday_a = syllabusWeekToday.querySelectorAll("a")
            // 将除第一个和最后一个之外的的 a 都替换到首页 id="cellToday0" 到 id="cellToday8"，并添加 id="cellToday0" 至 id="cellToday(classCount - 1)" 属性
            for (var i = 1; i < syllabusWeekToday_a.length; i++) {
                var cellWeekToday = document.querySelector("main > div.syllabus > div#syllabusToday > a#cellToday" + (i - 1))
                var cellWeekToday_html = syllabusWeekToday_a[i].outerHTML
                cellWeekToday.outerHTML = cellWeekToday_html

            }

            var syllabusToday = document.querySelector("main > div.syllabus > div.today")
            var syllabusTodayHTML = syllabusToday.innerHTML
            var syllabusTodayHTMLNew = syllabusTodayHTML.replace(/0\|/g, day + "|")
            syllabusToday.innerHTML = syllabusTodayHTMLNew

            setInterval(function () {
                // 如果今天的 syllabus 没有 today 类
                if (!document.querySelector("main > div.syllabus > div.week > div#syllabus > div.oneDay:nth-child(" + (day + 2) + ")").classList.contains("today")) {
                    // 把错误安放在星期一标签上的 today 移除，并添加到对应标签上
                    var syllabusWrong = document.querySelector("main > div.syllabus > div.week > div#syllabus > div.today")
                    syllabusWrong.classList.remove("today")
                    var syllabusRight = document.querySelector("main > div.syllabus > div.week > div#syllabus > div.oneDay:nth-child(" + (day + 2) + ")")
                    syllabusRight.classList.add("today")
                }
                // 如果除今天的 syllabus 外还有别的 syllabus 有 today 类，则移除
                var syllabusWrong = document.querySelectorAll("main > div.syllabus > div.week > div#syllabus > div.oneDay")
                for (var i = 0; i < syllabusWrong.length; i++) {
                    if (syllabusWrong[i].classList.contains("today") && i != day) {
                        syllabusWrong[i].classList.remove("today")
                    }
                }
            }, 500)
        }
    }, 2000)

}

// 如果开启了替换首页名人名言
// chrome.runtime.sendMessage({ command: "getLocalStorage", key: "replaceSaying" }, function (response) {
// if ((response) == "true") {
// console.log("已开启替换首页名人名言功能")

/**
 * Modified from 今日诗词 V2 JS-SDK 1.2.2
 * 今日诗词 API 是一个可以免费调用的诗词接口：https://www.jinrishici.com
 */
!function (e) {
    var n, t = {}, o = "jinrishici-token";
    function i() {
        return document.querySelector("main > div.saying > h1")
            || 0 != document.querySelector("main > div.saying > h1")
                .length
    }
    function c() {
        t.load(function (e) {
            var n = document.querySelector("main > div.saying > h1")
                , t = document.querySelector("main > div.saying > h1");
            if (n && (n.innerHTML = e.data.content + "<span>——" + e.data.origin.author + " 《" + e.data.origin.title + "》</span>"
            ),
                0 !== t.length)
                for (var o = 0; o < t.length; o++)
                    t[o].innerHTML = e.data.content + "<span>——" + e.data.origin.author + " 《" + e.data.origin.title + "》</span>"

        })
    }

    // 定时更换诗词
    // 检测配置项
    // if (localStorage.getItem("autoChangePoetry") == "true") {
    //     console.log("已开启定时更换诗词功能")
    setInterval(function () {
        if (document.querySelector("header > div.finishClass > a")) {
            console.log("非主页，不执行更换诗词相关逻辑")
        } else {
            c()
            console.log("更换诗词事件触发")
        }
    }, 60000)
    // } else {
    //     console.log("未开启定时更换诗词功能")
    // }

    // 从插件 local storage 中获取配置项

    function r(e, n) {
        var t = new XMLHttpRequest;
        t.open("get", n),
            t.withCredentials = !0,
            t.send(),
            t.onreadystatechange = function (n) {
                if (4 === t.readyState) {
                    var o = JSON.parse(t.responseText);
                    "success" === o.status ? e(o) : console.error("今日诗词API加载失败，错误原因：" + o.errMessage)
                }
            }
    }
    t.load = function (n) {
        return e.localStorage && e.localStorage.getItem(o) ? function (e, n) {
            return r(e, "https://v2.jinrishici.com/one.json?client=browser-sdk/1.2&X-User-Token=" + encodeURIComponent(n))
        }(n, e.localStorage.getItem(o)) : function (n) {
            return r(function (t) {
                e.localStorage.setItem(o, t.token),
                    n(t)
            }, "https://v2.jinrishici.com/one.json?client=browser-sdk/1.2")
        }(n)
    }
        ,
        e.jinrishici = t,
        i() ? c() : (n = function () {
            i() && c()
        }
            ,
            "loading" != document.readyState ? n() : document.addEventListener ? document.addEventListener("DOMContentLoaded", n) : document.attachEvent("onreadystatechange", function () {
                "complete" == document.readyState && n()
            }))
}(window);
    // } else {
        // console.log("未开启替换首页名人名言功能")
    // }
// });
