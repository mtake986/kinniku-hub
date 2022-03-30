
import { useState, forwardRef, useImperativeHandle } from 'react'
import { riCheckFill } from '../icons/icons'
import "../styles/snackbar.css"

const Snackbar =  forwardRef((props, ref) => {
  const [showSnackbar, setShowSnackbar] = useState(false)
  useImperativeHandle(ref, () => ({
    show() {
      setShowSnackbar(true);
      setTimeout(() => {
        setShowSnackbar(false);
      }, 3000)
    }
  }))
  return (
    <div className="snackbar" id={showSnackbar ? "show" : "hide"}>
      <div className="icon"> 
        {props.type === "success" && riCheckFill}
      </div>
      <div className="msg">{props.msg}</div>
    </div>
  )
})

export default Snackbar