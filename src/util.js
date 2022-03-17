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

function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;")
}

function toJson(child) {
	if (child.nodeName == "IMG" && child.style.display != "none") {
        if (child.getAttribute("src").startsWith("/math.svg") && child.alt.length > 0) {
            return {math: child.alt}
        } else {
            return {pic: child.getAttribute("src")}
        }
    } else if (child.nodeName == "#text") {
        return {text: child.textContent}
    } else if (child.nodeName == "BR") {
        return {}
    }
}

function fromJson(child) {
    if (child.math) {
        return `<img alt="${escapeHtml(child.math)}" src="/math.svg?latex=${encodeURIComponent(child.math)}">`
    } else if (child.pic) {
        return `<img src="${child.pic}">`
    } else if (child.text) {
        return escapeHtml(child.text)
    } else {
        return "<br>"
    }
}

function getAnswer() {
    let res = []
    for (element of document.getElementById("answer1").childNodes) {
        if (element.nodeName == "DIV") {
            let group = []
            for (child of element.childNodes) {
                group.push(toJson(child))
            }
            res.push(group)
        } else {
            res.push(toJson(element))
        }
    }
    return res
}

function setAnswer(answer) {
    let res = ""
    for (group of answer) {
        if (Array.isArray(group)) {
            res += "<div>"
            for (child of group) {
                res += fromJson(child)
            }
            res += "</div>"
        } else {
            res += fromJson(group)
        }
    }
    document.getElementById("answer1").innerHTML = res
}