"use client"

import React, { useRef, useState } from 'react'
import { sliderLists } from '../../constants'

const Menu = () => {

  const contentRef =useRef()
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalCocktails = sliderLists.length;

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
            onClick={() => goToSlide(currentIndex + 1)}
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