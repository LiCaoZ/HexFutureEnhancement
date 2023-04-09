// 根据 localStorage 中的设置，设置开关的状态
if (localStorage.getItem("replaceSaying") == "true") {
    document.querySelector("div.mdui-container > div.mdui-typo > label#replaceSaying > input#replaceSaying").checked = true
    // 启用定时更换诗词选择框
    document.querySelector("div.mdui-container > div.mdui-typo > label#autoChangePoetry > input#autoChangePoetry").disabled = false
} else {
    document.querySelector("div.mdui-container > div.mdui-typo > label#replaceSaying > input#replaceSaying").checked = false
    // 禁用定时更换诗词选择框
    document.querySelector("div.mdui-container > div.mdui-typo > label#autoChangePoetry > input#autoChangePoetry").disabled = true
}
if (localStorage.getItem("autoChangePoetry") == "true") {
    document.querySelector("div.mdui-container > div.mdui-typo > label#autoChangePoetry > input#autoChangePoetry").checked = true
} else {
    document.querySelector("div.mdui-container > div.mdui-typo > label#autoChangePoetry > input#autoChangePoetry").checked = false
}


// chrome.storage.local.get(['replaceSaying'], function (result) {
//     if (result.replaceSaying == "true") {
//         document.querySelector("div.mdui-container > div.mdui-typo > label#replaceSaying > input#replaceSaying").checked = true
//         // 启用定时更换诗词选择框
//         document.querySelector("div.mdui-container > div.mdui-typo > label#autoChangePoetry > input#autoChangePoetry").disabled = false
//     } else {
//         document.querySelector("div.mdui-container > div.mdui-typo > label#replaceSaying > input#replaceSaying").checked = false
//         // 禁用定时更换诗词选择框
//         document.querySelector("div.mdui-container > div.mdui-typo > label#autoChangePoetry > input#autoChangePoetry").disabled = true
//     }
// });

// chrome.storage.local.get(['autoChangePoetry'], function (result) {
//     if (result.autoChangePoetry == "true") {
//         document.querySelector("div.mdui-container > div.mdui-typo > label#autoChangePoetry > input#autoChangePoetry").checked = true
//     } else {
//         document.querySelector("div.mdui-container > div.mdui-typo > label#autoChangePoetry > input#autoChangePoetry").checked = false
//     }
// });



// 检测是否开启替换名人名言
document.querySelector("div.mdui-container > div.mdui-typo > label#replaceSaying > input#replaceSaying").addEventListener("change", function () {
    if (this.checked) {
        localStorage.setItem("replaceSaying", "true")
        // chrome.storage.local.set(
        //     { replaceSaying: "true" },
        // )
        // 弹出 toast 提示
        mdui.snackbar({
            message: '已开启替换名人名言',
            position: 'right-top'
        });
        // 启用定时更换诗词选择框
        document.querySelector("div.mdui-container > div.mdui-typo > label#autoChangePoetry > input#autoChangePoetry").disabled = false
    } else {
        localStorage.setItem("replaceSaying", "false")
        // chrome.storage.local.set(
        //     { replaceSaying: "false" },
        // )
        // 弹出 toast 提示
        mdui.snackbar({
            message: '已关闭替换名人名言',
            position: 'right-top'
        });
        // 禁用定时更换诗词选择框
        document.querySelector("div.mdui-container > div.mdui-typo > label#autoChangePoetry > input#autoChangePoetry").disabled = true
    }

})

// 检测是否开启定时更换诗词
document.querySelector("div.mdui-container > div.mdui-typo > label#autoChangePoetry > input#autoChangePoetry").addEventListener("change", function () {
    if (this.checked) {
        localStorage.setItem("autoChangePoetry", "true")
        // chrome.storage.local.set(
        //     { autoChangePoetry: "true" },
        // )
        // 弹出 toast 提示
        mdui.snackbar({
            message: '已开启定时更换诗词',
            position: 'right-top'
        });
    } else {
        localStorage.setItem("autoChangePoetry", "false")
        // chrome.storage.lcoal.set(
        //     { autoChangePoetry: "false" },
        // )
        // 弹出 toast 提示
        mdui.snackbar({
            message: '已关闭定时更换诗词',
            position: 'right-top'
        });
    }

})
