import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { SplitText } from 'gsap/all'
import React from 'react'

const About = () => {

  useGSAP(() => {
    const titleSplit = SplitText.create('#about h2', {  // 1. Divide el título en palabras
      type: 'words'
    })

    const scrollTimeline = gsap.timeline({              // 2. Crea una "línea de tiempo" para las animaciones
      scrollTrigger: {
        trigger: '#about',                              // El activador es la sección "About"
        start: 'top center',                            // La animación empieza cuando la parte superior de la sección llega al centro de la pantalla
      }
    })

    scrollTimeline                                      // 3. Define la primera animación (el título)
      .from(titleSplit.words, {                         // Anima cada palabra del título
        opacity: 0,                                     // Empiezan siendo invisibles
        duration: 1,                                    // La animación dura 1 segundo
        yPercent: 100,                                  // Empiezan 100% por debajo de su posición final (efecto de subir)
        ease: 'expo.out',                               // Una curva de aceleración suave para un efecto más natural
        stagger: 0.02                                   // Cada palabra empieza 0.02s después de la anterior 
      })
      .from('.top-grid div, .bottom-grid div', {        // 4. Define la segunda animación (las imágenes) // Anima los contenedores de las imágenes
        opacity: 0,                                     // Empiezan siendo invisibles
        duration: 1,                                    // La animación dura 1 segundo
        ease: 'power1.inOut',                           // Otra curva de aceleración
        stagger: 0.04                                   // Cada imagen empieza 0.04s después de la anterior
      }, '-=0.5')                                       // 5. Control de tiempo: empieza 0.5s ANTES de que la animación anterior termine 
  },[])

  return (
    <div id="about">
      <div className='mb-16 md:px-0 px-5'>
        <div className='content'>
          <div className='md:col-span-8'>
            <p className='badge'>
              Best Cocktail
            </p>
            <h2>
              where every detail matters<span className='text-white'>-</span>
              from muddle to garnish
            </h2>
          </div>

          <div className='sub-content'>
            <p>
              Every cocktail we serve is a reflection of our obsession with deailt -
              from the first muddle to the final garnish. That care is what turns a simple drink into something truly memorable.
            </p>

            <div>
              <p className='md:text-3xl text-xl font-bold'>
                <span>4.5</span>
              </p>
              <p className='text-sm text-white-100'>
                More than +12000 customers
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className='top-grid'>
        <div className='md:col-span-3'>
          <div className='noisy'/>
          <img 
            src="/images/abt1.png"
            alt="grid-img-1"
          />
        </div>
        <div className='md:col-span-6'>
          <div className='noisy'/>
          <img 
            src="/images/abt2.png"
            alt="grid-img-2"
          />
        </div>
        <div className='md:col-span-3'>
          <div className='noisy'/>
          <img 
            src="/images/abt5.png"
            alt="grid-img-5"
          />
        </div>
      </div>

      <div className='bottom-grid'>
        <div className='md:col-span-8'>
          <div className='noisy' />
          <img
            src="/images/abt3.png"
            alt="grid-img-3"
          />
        </div>

        <div className='md:col-span-4'>
          <div className='noisy' />
          <img
            src="/images/abt4.png"
            alt="grid-img-4"
          />
        </div>
      </div>
    </div>
  )
}

export default About