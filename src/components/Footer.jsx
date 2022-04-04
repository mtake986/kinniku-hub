import React from 'react'

const Footer = () => {
  const d = new Date();
  let year = d.getFullYear(); 

  return (
    <footer>
      &copy; Masahiro Takechi {year}
    </footer>
  )
}

export default Footer;