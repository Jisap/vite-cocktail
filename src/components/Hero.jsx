import { useGSAP } from "@gsap/react"
import gsap, { SplitText } from "gsap/all"



const Hero = () => {

  useGSAP(() => {
    const heroSplit = new SplitText('.title', { type: 'chars, words' })     // Descompone el texto en caracteres y palabras
    const paragraphSplit = new SplitText('.subtitle', { type: 'lines' })    // Descompone el texto en líneas

    heroSplit.chars.forEach((char) => char.classList.add('text-gradient'))  // Agrega la clase gradient a los caracteres

    gsap.from(heroSplit.chars, { // Anima los caracteres
      yPercent: 100,             // Cada letra comienza debajo de su posición final ( fuera de la vista )
      duration: 1.8,
      ease: 'expo.out',
      stagger: 0.06
    });

    gsap.from(paragraphSplit.lines, { // Anima las líneas
      opacity: 0,
      yPercent: 100,
      duration: 1.8,
      ease: 'expo.out',
      stagger: 0.06,
      delay: 1,
    });
  },[])

  return (
    <>
      <section id="hero" className="noisy">
        <h1 className="title">MOJITO</h1>

        <img 
          src="/images/hero-left-leaf.png"
          alt="left-leat"
          className="left-leaf"
        />

        <img 
          src="/images/hero-right-leaf.png"
          alt="right-leat"
          className="right-leaf"
        />

        <div className="body">
          <div className="content">
            <div className="space-y-5 hidden md:block">
              <p>Cool. Crisp. Classic</p>
              <p className="subtitle">
                Sip the Spirit <br/> of Summer
              </p>
            </div>

            <div className="view-cocktails">
              <p className="subtitle">
                Every cocktail on our menu is a blend of premium ingredients, creative flair, and timeless recipes - designed to delight your senses.
              </p>
              <a href="#cocktails">View Cocktails</a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Hero