
import gsap from 'gsap'
import { ScrollTrigger, SplitText } from 'gsap/all'

gsap.registerPlugin(ScrollTrigger, SplitText)

const App = () => {
  return (
    <div className='flex-center'>
      <h1 className='text-xl text-white'>App</h1>
    </div>
  )
}

export default App