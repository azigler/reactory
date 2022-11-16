import React from "react"
import { createRoot } from "react-dom/client"
import { act } from "react-dom/test-utils"
import { MergeBoard } from ".."

describe("MergeBoard component", () => {
  it("renders", () => {
    const container = document.createElement("main")
    const root = createRoot(container)
    act(() => {
      root.render(<MergeBoard />)
    })
    expect(container).toMatchSnapshot()
  })
})
