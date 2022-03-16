function recurseFind(obj, test) {
    const stack = [];
    stack.push(obj);
    while (stack.length > 0) {
        const currentObj = stack.shift();
        if (currentObj && test(currentObj)) {
            return currentObj;
        }
        for (const child of currentObj.children) {
            if (child) {
                stack.unshift(child);
            }
        }
    }
    return undefined;
}

function getAnswer() {
    let res = []
    for (element of document.getElementById("answer1").children) {
        let group = []
        for (child of element.childNodes) {
            if (child.nodeName == "IMG" && child.style.display != "none") {
                if (child.getAttribute("src").startsWith("/math.svg") && child.alt.length > 0) {
                    group.push({math: child.alt})
                } else {
                    group.push({pic: child.getAttribute("src")})
                }
            } else if (child.nodeName == "#text") {
                group.push({text: child.textContent})
            } else if (child.nodeName == "BR") {
                group.push({})
            }
        }
        res.push(group)
    }
    console.log(res)
    return res
}

function setAnswer(answer) {
    let res = ""
    for (group of answer) {
        res += "<div>"
        for (child of group) {
            if (child.math) {
                res += `<img alt="${child.math}" src="/math.svg?latex=${encodeURIComponent(child.math)}">`
            } else if (child.pic) {
                res += `<img src="${child.pic}">`
            } else if (child.text) {
                res += child.text
            } else {
                res += "<br>"
            }
        }
        res += "</div>"
    }
    console.log(res)
    document.getElementById("answer1").innerHTML = res
}