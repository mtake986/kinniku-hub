import { useState } from 'react'

import TabBar from './TabBar'
import Header from './Header'
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
      <Header txt={active} />
      <Body />
    </div>
  )
}

export default Summary