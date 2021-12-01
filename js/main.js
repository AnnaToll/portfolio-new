function openCloseSidebar() {
    let className = document.body.getAttribute("class");
    if(className == "menyoppen") {
        document.body.className = "menystangd";
    }
    else {
        document.body.className = "menyoppen";
    }
  }