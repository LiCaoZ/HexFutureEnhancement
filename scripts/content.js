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

    var timeTable = ['08:30:00', '09:20:00', '10:10:00', '11:20:00', '12:10:00', '15:25:00', '16:15:00', '17:05:00', '17:55:00', '19:30:00', '20:20:00', '21:10:00', '22:00:00', '12:52:00']

    var noticeTimeTable = ['08:25:00', '09:15:00', '10:05:00', '11:15:00', '12:05:00', '15:20:00', '16:10:00', '17:00:00', '17:50:00', '19:25:00', '20:15:00', '21:05:00', '21:55:00']

    var finishClassTimeTable = ['08:31:30', '09:21:30', '10:11:30', '11:21:30', '12:11:30', '15:26:30', '16:16:30', '17:06:30', '17:56:30', '19:31:30', '20:21:30', '21:11:30', '22:01:30', '12:52:30']

    // 如果下课按钮存在 则认为已经上课 执行下列判断
    if (document.querySelector("header > div.finishClass > a")) {


        if (timeTable.indexOf(time) != -1) {
            alert("下课时间到了，" + userName +"老师，您辛苦了。\n您还有 1 分钟 30 秒收尾时间，在此之后，系统会为您自动登出。")
            document.querySelector("header > div.fullScreen > a").click()

            // document.querySelector("header > div.finishClass > a").click()
        }

        if (noticeTimeTable.indexOf(time) != -1) {
            alert("距下课还有 5 分钟，请您合理安排课堂进度。")
            document.querySelector("header > div.fullScreen > a").click()
        }

        if (finishClassTimeTable.indexOf(time) != -1) {
            document.querySelector("header > div.finishClass > a").click()
        }

    }

    // 如果随机点名元素存在 就送走
    if (document.querySelector("div.bottomDock > div.selectStudent")) {
        document.querySelector("div.bottomDock > div.selectStudent").remove()
    }


}, 1000

)

// 如果开启了替换首页名人名言
chrome.runtime.sendMessage({command: "getLocalStorage", key: "replaceSaying"}, function(response) {
    if ((response) == "true") {
        console.log("已开启替换首页名人名言功能")

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
            //     setInterval(function () {
            //         c()
            //         console.log("更换诗词事件触发")
            //     }, 60000)
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
    } else {
        console.log("未开启替换首页名人名言功能")
    }
});
