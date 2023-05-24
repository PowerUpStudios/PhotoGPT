console.log(window.parent.document)
PGPTConversation.onMessage((msg) => {
  console.log(msg.content)
}, window.parent.document)
