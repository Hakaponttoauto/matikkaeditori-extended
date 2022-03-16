//browser.storage.sync.clear()

window.addEventListener("blur", (e) => {
    if (e.target.getAttribute("id") != "answer1") {
        e.stopImmediatePropagation();
    }
}, true);

document.body.style.border = "5px solid red";

let answer = document.getElementById("answer1")

window.addEventListener("beforeunload", () => {
    let content = getAnswer()
    browser.storage.sync.set({autosave: content})
})


browser.storage.sync.get("autosave").then((save) => {
    console.log(save)
    if (save.autosave) {
        setAnswer(save.autosave)
    }
})
