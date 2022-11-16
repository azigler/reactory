import React, { FC } from "react"
import Draggable from "react-draggable"

export interface MergeableProps {}

export const Mergeable: FC<MergeableProps> = () => {
  const handleStart = () => {}

  const handleDrag = () => {}

  const handleStop = () => {}

  return (
    <Draggable
      defaultPosition={{ x: 0, y: 0 }}
      grid={[25, 25]}
      scale={1}
      onStart={handleStart}
      onDrag={handleDrag}
      onStop={handleStop}
    >
      <div>BOOP</div>
    </Draggable>
  )
}
