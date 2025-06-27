"use client"

import React, { useRef, useState } from 'react'
import { sliderLists } from '../../constants'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const Menu = () => {

  const contentRef =useRef()                           // Usar el valor de current no provoca un nuevo renderizado
  const [currentIndex, setCurrentIndex] = useState(0); // Estado del índice actual que solo se jecuta la primera vez
  const prevIndexRef = useRef(currentIndex);           // Se establece prevIndex en 0 la primera vez
  const totalCocktails = sliderLists.length;

  useGSAP(() => {

    const previousIndex = prevIndexRef.current;  // Se guarda el índice actual de forma persistente.

    gsap.fromTo("#title", 
      { opacity: 0 }, 
      { opacity: 1, duration: 1 }
    )
   
    let direction = currentIndex > previousIndex ? 1 : -1;                    // Determina el sentido de la animación. 1 derecha, -1 izquierda.
    if (previousIndex === totalCocktails - 1 && currentIndex === 0) {         // Del último al primero
      direction = 1;
    } else if (previousIndex === 0 && currentIndex === totalCocktails - 1) { // Del primero al último
      direction = -1;
    }

    gsap.fromTo(".cocktail img", 
      { opacity: 0, xPercent: -100 * direction},
      { opacity: 1, xPercent: 0, duration: 1, ease: "power1.inOut"},
    )
    gsap.fromTo(".details h2 ",
      { yPercent: 100, opacity: 0 },
      { yPercent: 0, opacity: 100, ease: "power1.inOut" } 
    )
    gsap.fromTo(".details p ",
      { yPercent: 100, opacity: 0 },
      { yPercent: 0, opacity: 100, ease: "power1.inOut" } 
    )
    
    prevIndexRef.current = currentIndex;                                   // Actualiza la referencia del índice previo para la siguiente animación
  },[currentIndex]);

  const goToSlide = (index) => {
    const newIndex = (index + totalCocktails) % totalCocktails;
    setCurrentIndex(newIndex)
  }

  const getCocktailAt = (indexOffset) => {
    return sliderLists[(currentIndex + indexOffset + totalCocktails) % totalCocktails]
  }

  const currentCocktail = getCocktailAt(0)
  const nextCocktail = getCocktailAt(1)
  const prevCocktail = getCocktailAt(-1)

  return (
    <section id="menu" aria-labelledby="menu-heading">
      <img 
        src="/images/slider-left-leaf.png"
        alt="Left Leaf"
        id="m-left-leaf"
      />
      <img 
        src="/images/slider-right-leaf.png"
        alt="Right Leaf"
        id="m-right-leaf"
      />

      <h2 id="menu-heading" className="sr-only">
        Cocktail Menu
      </h2>

      <nav className="cocktail-tabs" aria-label="Cocktail Navigation">
        {sliderLists.map((cocktail, index) => {
          const isActive = index === currentIndex
          return (
            <button 
              key={index} 
              className={`${isActive ? "text-white border-white" : "text-white/50 border-white/50"}`}
              onClick={() => goToSlide(index)}  
            >    
              {cocktail.name}
            </button>
          )
        })}
      </nav>

      <div className='content'>
        <div className='arrows'>
          <button
            className='text-left'
            onClick={() => goToSlide(currentIndex - 1)} 
          >
            <span>{prevCocktail.name}</span>
            <img 
              src="/images/right-arrow.png"
              alt="Right Arrow"
              aria-hidden="true"
            />
          </button>
          <button
            className='text-left'
            onClick={() => goToSlide(currentIndex + 1)} // currentIndex se actualiza -> nueva renderización -> se ejecuta la animación con el prevIndex anterior -> se actualiza el prevIndex
          >
            <span>{nextCocktail.name}</span>
            <img 
              src="/images/left-arrow.png"
              alt="Left Arrow"
              aria-hidden="true"
            />
          </button>
        </div>

        <div className='cocktail'>
          <img 
            src={currentCocktail.image}
            alt={currentCocktail.name}
            className='object-contain'
          />
        </div>

        <div className='recipe'>
          <div ref={contentRef} className='info'>
            <p>Recipe for:</p>
            <p id="title">{currentCocktail.name}</p>
          </div>

          <div className='details'>
            <h2>{currentCocktail.title}</h2>
            <p>{currentCocktail.description}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Menu