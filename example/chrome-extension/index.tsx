import * as React from "react"
import { createRoot } from "react-dom/client"
import { HelloWorld } from "../../dist"
/*global chrome*/

const App = () => {
  document.addEventListener("DOMContentLoaded", function () {
    // Do something, e.g. send a message to content or background script
    console.log("dom loaded")
    // https://stackoverflow.com/questions/17737263/how-to-tell-when-a-page-action-is-clicked-when-the-page-action-has-a-popup
    chrome.runtime.sendMessage("pageActionClicked")
  })
  document.addEventListener("beforeunload", function () {
    // Do something, e.g. send a message to content or background script
    console.log("dom unloaded")
    // https://stackoverflow.com/questions/17737263/how-to-tell-when-a-page-action-is-clicked-when-the-page-action-has-a-popup
    chrome.runtime.sendMessage("pageActionClicked")
  })

  chrome.runtime.connect({ name: "popup" })
  return (
    <main>
      <HelloWorld />
      <div>
        <span>okgoti</span>
        <input type="text" placeholder="lol" />
      </div>
    </main>
  )
}

const container = document.getElementById("root")
const root = createRoot(container!)
root.render(<App />)
