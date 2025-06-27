"use client"

import React, { useRef, useState } from 'react'
import { sliderLists } from '../../constants'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const Menu = () => {

  const contentRef =useRef()                           // Usar el valor de current no provoca un nuevo renderizado
  const [currentIndex, setCurrentIndex] = useState(0); // Estado del índice actual que solo se jecuta la primera vez
  const prevIndexRef = useRef(currentIndex);           // Se establece prevIndex en 0 la primera vez. Guarda el índice ANTERIOR. Es una ref para que su valor no se pierda entre renderizados.
  const totalCocktails = sliderLists.length;

  useGSAP(() => {
    const previousIndex = prevIndexRef.current;                         // Se obtiene el índice anterior
    const currentSlideIndex = currentIndex;                             // Se obtiene el índice actual

    // Determina la dirección visual de entrada
    let enterSlideDirection = 0;
    if (currentSlideIndex > previousIndex) {                            // Si el índice actual es mayor que el anterior se entra hacia la derecha
      enterSlideDirection = 1; 
    } else if (currentSlideIndex < previousIndex) {                     // Si el índice actual es menor que el anterior se entra hacia la izquierda
      enterSlideDirection = -1; 
    }

    // Manejar casos de envío de contenido
    if (previousIndex === totalCocktails - 1 && currentSlideIndex === 0) {
      enterSlideDirection = 1; // Last to first, new content enters from right
    } else if (previousIndex === 0 && currentSlideIndex === totalCocktails - 1) {
      enterSlideDirection = -1; // First to last, new content enters from left
    }

    const tlEnter = gsap.timeline({                                      // Se crea una línea de tiempo de GSAP para coordinar las animaciones de entrada.
        defaults: { duration: 0.7, ease: "power1.out" }
    });

    // Animación de entrada
    tlEnter.fromTo(".cocktail img",                                      // Se anima la imagen nueva
      { opacity: 0, xPercent: -100 * enterSlideDirection },              // Empieza fuera de la pantalla
      { opacity: 1, xPercent: 0 }                                        // Termina en su posición final
    )
    .fromTo(".details h2 ",                                              // Se anima el título
      { yPercent: 100, opacity: 0 },                                     // Empieza abajo y transparente
      { yPercent: 0, opacity: 100 }                                      // Termina en su posición final y visible
    )
    .fromTo(".details p ",
      { yPercent: 100, opacity: 0 },
      { yPercent: 0, opacity: 100 }
    )
    .fromTo("#title",
      { opacity: 0 },
      { opacity: 1 }
    );

    prevIndexRef.current = currentIndex;                                   // Se actualiza el índice anterior

  },[currentIndex]);                                                       // Se ejecuta la animación cuando el índice cambia

  const goToSlide = (index) => {
    const newIndex = (index + totalCocktails) % totalCocktails;            // Se determina el índice nuevo en base a %

    if (newIndex === currentIndex) return;                                 // No hacer nada si se hace click en la misma diapositiva

    // Determinar la dirección visual 
    // para el contenido que sale
    let exitSlideDirection = 0;
    if (newIndex > currentIndex) {                                         // Si el nuevo índice es mayor que el actual se sale hacia la derecha
      exitSlideDirection = 1; 
    } else if (newIndex < currentIndex) {
      exitSlideDirection = -1;                                             // Si el nuevo índice es menor que el actual se sale hacia la izquierda
    }

    // Manejar casos de envío de contenido
    if (currentIndex === totalCocktails - 1 && newIndex === 0) {           // Si el índice actual es el último y el nuevo índice es el primero
      exitSlideDirection = 1;                                              // Se sale hacia la derecha
    } else if (currentIndex === 0 && newIndex === totalCocktails - 1) {    // Si el índice actual es el primero y el nuevo índice es el último
      exitSlideDirection = -1;                                             // Se sale hacia la izquierda
    }

    const tlExit = gsap.timeline({                                         // Se crea una línea de tiempo de GSAP para coordinar las animaciones de salida.
      defaults: { duration: 0.4, ease: "power1.in" },
      onComplete: () => {                                                  // onComplete permite ejecutar una función después de que la animación haya terminado
        setCurrentIndex(newIndex);                                         // Se actualiza el índice después de que la animación haya terminado
      }
    });

    // Animación de salida
    tlExit.to(".cocktail img", {
        xPercent: 100 * exitSlideDirection,                                // Se anima la imagen antigua según la dirección de salida
        opacity: 0,
        overwrite: true 
    }, 0)
    .to(".details h2, .details p", {
        yPercent: 100,
        opacity: 0,
        overwrite: true
    }, 0)
    .to("#title", {
        opacity: 0,
        overwrite: true
    }, 0);
  }

  const getCocktailAt = (indexOffset) => {
    return sliderLists[(currentIndex + indexOffset + totalCocktails) % totalCocktails]
  }

  const currentCocktail = getCocktailAt(0)
  const nextCocktail = getCocktailAt(1)
  const prevCocktail = getCocktailAt(-1)


  // Resumen ciclo completo (click en siguiente/next)
  // 1º click -> goToSlide(1) -> tlExit -> imagen de salida termina -> setCurrentIndex(1)
  // 2º React rerenderiza -> useGSAP -> tlEnter -> imagen de entrada comienza 
  // Patrón: Animar Salida -> Actualizar Estado -> Animar Entrada
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