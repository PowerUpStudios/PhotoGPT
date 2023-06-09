PGPTConversation.onMessage((msg) => {
  if (msg.isGPT) {
    msg.contentChanged(null, (c) => {
      const hw = new PGPTConversation.HTMLWorkspace(c, {unescape: true, unescapeInside: "(power-gpt-html|pgpt-extension-register|photogpt)"})
      let arr = hw.getElementsByTagName("photogpt")
      for (let i = 0; i < arr.length; i++) {
        let el = arr[i]
        let q = el.getAttribute("query")
        let index = el.getAttribute("index")
        if (!q) {
          q = ""
        }
        if (!index) {
          index = 0
        }else{
          index = parseInt(index)
        }
        fetch("https://server.powerupstudio.eu/pgpt/ep?name=PhotoGPT&id=GetPhoto&type=" + el.getAttribute("type") + "&query=" + q).then(res => res.json()).then((res) => {
          if (el.getAttribute("type") == "random") {
            el.innerHTML = "<img title='" + res.alt_description + "' src='" + res.urls.raw + "' style='border-radius:15px;max-width:500px;max-height:500px;'></img><br/><i><span>Photo by <a href='https://unsplash.com/@" + res.user.username + "?utm_source=PhotoGPT&utm_medium=referral'>" + res.user.name + "</a> on <a href='https://unsplash.com?utm_source=PhotoGPT&utm_medium=referral'>Unsplash</a></span></i>"
          }else{
            el.innerHTML = "<img title='" + res.results[index].alt_description + "' src='" + res.results[index].urls.raw + "' style='border-radius:15px;max-width:500px;max-height:500px;'></img><br/><i><span>Photo by <a href='https://unsplash.com/@" + res.results[index].user.username + "?utm_source=PhotoGPT&utm_medium=referral'>" + res.results[index].user.name + "</a> on <a href='https://unsplash.com?utm_source=PhotoGPT&utm_medium=referral'>Unsplash</a></span></i>"
          }
          if (i + 1 == arr.length) {
            msg.modifyContent(hw.innerHTML)
          }
        })
      }
    })
  }
}, window.parent.document)
