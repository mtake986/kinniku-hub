import React from 'react'

const Footer = () => {
  const d = new Date();
  let year = d.getFullYear(); 

  return (
    <footer>
      &copy; Masahiro Takechi All Rights Reserved {year}
    </footer>
  )
}

export default Footer;