import React, { forwardRef, useImperativeHandle, useState } from 'react'

const TestStopBtn = forwardRef((ref) => {
  const [clicked, setClicked] = useState(false);
  useImperativeHandle(ref, () => ({
    showResult() {
      setClicked(true)
    }
  }))
  console.log("clicked: ", clicked)
  return (
    <button className='testStopBtn'>
      <span>Stop</span>
    </button>
  )
})

export default TestStopBtn