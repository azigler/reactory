/*global chrome*/

// https://stackoverflow.com/questions/17737263/how-to-tell-when-a-page-action-is-clicked-when-the-page-action-has-a-popup
// https://stackoverflow.com/questions/15798516/is-there-an-event-for-when-a-chrome-extension-popup-is-closed

chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setBadgeText({
    text: "OFF",
  })
})

chrome.runtime.onConnect.addListener(async function (port) {
  if (port.name === "popup") {
    port.onDisconnect.addListener(async function () {
      console.log("popup has been closed")

      let tab

      // Inside the DOMContentLoaded or onMessage event listener:
      chrome.tabs.query(
        {
          active: true,
          lastFocusedWindow: true,
        },
        async function (tabs) {
          tab = tabs[0]
          // Do something with tab

          // Retrieve the action badge to check if the extension is 'ON' or 'OFF'
          const prevState = await chrome.action.getBadgeText({ tabId: tab.id })
          // Next state will always be the opposite
          const nextState = prevState === "ON" ? "OFF" : "ON"

          // Set the action badge to the next state
          await chrome.action.setBadgeText({
            tabId: tab.id,
            text: nextState,
          })

          if (nextState === "ON") {
            // Insert the CSS file when the user turns the extension on
            await chrome.scripting.insertCSS({
              files: ["styles/focus-mode.css"],
              target: { tabId: tab.id },
            })
          } else if (nextState === "OFF") {
            // Remove the CSS file when the user turns the extension off
            await chrome.scripting.removeCSS({
              files: ["styles/focus-mode.css"],
              target: { tabId: tab.id },
            })
          }
        }
      )
    })
  }
})

const extensions = "https://developer.chrome.com/docs/extensions"
const webstore = "https://developer.chrome.com/docs/webstore"

chrome.action.onClicked.addListener(async (tab) => {
  if (tab.url!.startsWith(extensions) || tab.url!.startsWith(webstore)) {
    console.log("boop")
    // Retrieve the action badge to check if the extension is 'ON' or 'OFF'
    const prevState = await chrome.action.getBadgeText({ tabId: tab.id })
    // Next state will always be the opposite
    const nextState = prevState === "ON" ? "OFF" : "ON"

    // Set the action badge to the next state
    await chrome.action.setBadgeText({
      tabId: tab.id,
      text: nextState,
    })

    if (nextState === "ON") {
      // Insert the CSS file when the user turns the extension on
      chrome.scripting.insertCSS({
        files: ["../styles/focus-mode.css"],
        target: { tabId: tab.id! },
      })
    } else if (nextState === "OFF") {
      // Remove the CSS file when the user turns the extension off
      await chrome.scripting.removeCSS({
        files: ["../styles/focus-mode.css"],
        target: { tabId: tab.id! },
      })
    }
  }
})

chrome.runtime.onMessage.addListener(async function (
  message,
  sender,
  sendResponse
) {
  if (message === "pageActionClicked") {
    chrome.tabs.query(
      {
        active: true,
        lastFocusedWindow: true,
      },
      async function (tabs) {
        var tab = tabs[0]
        if (tab.url!.startsWith(extensions) || tab.url!.startsWith(webstore)) {
          console.log("boop")
          // Retrieve the action badge to check if the extension is 'ON' or 'OFF'
          const prevState = await chrome.action.getBadgeText({ tabId: tab.id })
          // Next state will always be the opposite
          const nextState = prevState === "ON" ? "OFF" : "ON"

          // Set the action badge to the next state
          await chrome.action.setBadgeText({
            tabId: tab.id,
            text: nextState,
          })

          if (nextState === "ON") {
            // Insert the CSS file when the user turns the extension on
            await chrome.scripting.insertCSS({
              files: ["styles/focus-mode.css"],
              target: { tabId: tab.id! },
            })
          } else if (nextState === "OFF") {
            // Remove the CSS file when the user turns the extension off
            await chrome.scripting.removeCSS({
              files: ["styles/focus-mode.css"],
              target: { tabId: tab.id! },
            })
          }
        }
      }
    )
  }
})
