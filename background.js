chrome.action.onClicked.addListener(async (tab) => {

  // Retrieve the action badge to check if the extension is 'ON' or 'OFF'
  let prevState = await chrome.action.getBadgeText({ tabId: tab.id });
  // Next state will always be the opposite
  let nextState = prevState === 'WORKING' ? '' : 'WORKING'

  // Set the action badge to the next state
  await chrome.action.setBadgeText({
    tabId: tab.id,
    text: nextState,
  });

  if (nextState === "WORKING") {

      await chrome.scripting
      .executeScript({
        files: ["content.js"],
        target: { tabId: tab.id },
      })

      setInterval(async()=>{
        nextState=''

      await chrome.action.setBadgeText({
        tabId: tab.id,
        text: nextState,
      });
      },2000)
  } else if (nextState === "") {
    console.log("not working rn");
  }

})



