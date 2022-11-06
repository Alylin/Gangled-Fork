const sanitizeHtml = (html) => {
    const tempElement = document.createElement("DIV");
    tempElement.innerHTML = html;
    const brs = tempElement.getElementsByTagName('br');
    for (let i = brs.length - 1; i >= 0; --i) {
        brs[i].remove();
    }
    // range.extractContents();
    // range.insertNode();
    // tempElement.querySelectorAll
    return tempElement.innerHTML;
}

export default sanitizeHtml; // test108 webkit-backdrop filter stuff