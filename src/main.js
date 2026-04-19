import './style.css'
import './three/scene.js'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { initProjectsScroll } from './sections/projects.js'

gsap.registerPlugin(ScrollTrigger)

document.querySelectorAll('section').forEach(section => {
  gsap.from(section, {
    opacity: 0,
    y: 60,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: section,
      start: 'top 80%',
    }
  })
})

initProjectsScroll()