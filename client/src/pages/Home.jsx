import React from 'react'
import Header from '../compomemts/Header'
import Steps from '../compomemts/Steps'
import BgSlider from '../compomemts/BgSlider'
import Testimonials from '../compomemts/Testimonials'
import Upload from '../compomemts/Upload'

const Home = () => {
  return (
    <div>
        <Header />
        <Steps />
        <BgSlider />
        <Testimonials />
        <Upload />
    </div>
  )
}

export default Home