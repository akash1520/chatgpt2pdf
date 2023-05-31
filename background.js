// chrome.runtime.onInstalled.addListener(() => {
//     chrome.action.setBadgeText({
//         text: "OFF",
//     });
// });

// bd=chrome.dom.getElementsByTagName("body")[0]


chrome.action.onClicked.addListener(async (tab) => {

  // Retrieve the action badge to check if the extension is 'ON' or 'OFF'
  const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
  // Next state will always be the opposite
  const nextState = prevState === 'ON' ? 'OFF' : 'ON'

  // Set the action badge to the next state
  await chrome.action.setBadgeText({
    tabId: tab.id,
    text: nextState,
  });

  

  // console.log(cssFile);

  if (nextState === "ON") {
    // bd.style.backgroundColor="black";
    // Insert the CSS file when the user turns the extension on

      await chrome.scripting
      .executeScript({
        files: ["scriptNew.js"],
        target: { tabId: tab.id },
      })

  } else if (nextState === "OFF") {
    // Remove the CSS file when the user turns the extension off
    await chrome.scripting.removeCSS({
      files: ['styles.css'],
      target: { tabId: tab.id },
    });
  }



})

