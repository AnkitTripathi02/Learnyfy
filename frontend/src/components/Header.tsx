import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div  className='bg-green-400 text-center flex justify-between p-4 '>
      
      <div className='ml-1 '><Link to="/">Home</Link></div>
      <Link to="/about">About</Link>
       <div className='mr-4'><Link to="/contact">Contact</Link></div>
    </div>
  )
}

export default Header
