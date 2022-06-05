import { useState } from 'react'

import TabBar from './TabBar'
import Body from './Body'

const Summary = () => {
  const [active, setActive] = useState("Calories")
  const handleSwitchTab = (e) => {
    setActive(e.target.innerText)
    console.log(active)
  }

  return (
    <div className="summary">
      <TabBar active = {active} handleSwitchTab = {handleSwitchTab} />
      <Body />
    </div>
  )
}

export default Summary