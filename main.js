PGPTConversation.onMessage((msg) => {
  if (msg.isGPT) {
    msg.contentChanged(null, (c) => {
      const hw = new PGPTConversation.HTMLWorkspace(c, {unescape: true, unescapeInside: "(power-gpt-html|pgpt-extension-register|photogpt)"})
      let arr = hw.getElementsByTagName("photogpt")
      for (let i = 0; i < arr.length; i++) {
        let el = arr[i]
        console.log("https://server.powerupstudio.eu/pgpt/ep?name=PhotoGPT&id=GetPhoto&type=" + el.getAttribute("type") + "&query=" + el.getAttribute("query"))
        fetch("https://server.powerupstudio.eu/pgpt/ep?name=PhotoGPT&id=GetPhoto&type=" + el.getAttribute("type") + "&query=" + el.getAttribute("query")).then(res => res.json()).then((res) => {
          if (el.getAttribute("type") == "random") {
            el.innerHTML = "<img src='" + res.urls.raw + "'></img>"
          }else{
            el.innerHTML = "<img src='" + res[0].urls.raw + "'></img>"
          }
          if (i == arr.length) {
            msg.modifyContent(hw.innerHTML)
          }
        })
      }
    })
  }
}, window.parent.document)
