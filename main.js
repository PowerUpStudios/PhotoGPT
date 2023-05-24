PGPTConversation.onMessage((msg) => {
  if (msg.isGPT) {
    msg.contentChanged(null, (c) => {
      const hw = new PGPTConversation.HTMLWorkspace(c, {unescape: true, unescapeInside: "(power-gpt-html|pgpt-extension-register|photogpt)"})
      let arr = hw.getElementsByTagName("photogpt")
      for (let i = 0; i < arr.length; i++) {
        let el = arr[i]
        let q = el.getAttribute("query")
        if (!q) {
          q = ""
        }
        fetch("https://server.powerupstudio.eu/pgpt/ep?name=PhotoGPT&id=GetPhoto&type=" + el.getAttribute("type") + "&query=" + q).then(res => res.json()).then((res) => {
          if (el.getAttribute("type") == "random") {
            el.innerHTML = "<img title='" + res.alt_description + "' src='" + res.urls.raw + "' style='max-width:500px;max-height:500px;'></img><br/><i><span>Photo by <a href='https://unsplash.com/@" + res.user.username + "?utm_source=PhotoGPT&utm_medium=referral'>" + res.user.name + "</a> on <a href='https://unsplash.com?utm_source=PhotoGPT&utm_medium=referral'>Unsplash</a></span></i>"
          }else{
            el.innerHTML = "<img title='" + res.results[0].alt_description + "' src='" + res.results[0].urls.raw + "' style='max-width:500px;max-height:500px;'></img><br/><i><span>Photo by <a href='https://unsplash.com/@" + res.results[0].user.username + "?utm_source=PhotoGPT&utm_medium=referral'>" + res.results[0].user.name + "</a> on <a href='https://unsplash.com?utm_source=PhotoGPT&utm_medium=referral'>Unsplash</a></span></i>"
          }
          if (i + 1 == arr.length) {
            msg.modifyContent(hw.innerHTML)
          }
        })
      }
    })
  }
}, window.parent.document)
