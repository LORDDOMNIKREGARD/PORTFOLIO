import { useEffect, useRef, useState, type ReactNode } from 'react'
import NoiseBackgroundDemoSecond from './components/ui/noise-background-demo-2'
import FlipCard from './components/ui/FlipCard'
import BounceCards from './components/ui/BounceCards'
import SplitText from './components/ui/SplitText'

const webProjects = [
  {
    title: 'Mocktopus',
    category: 'Web app',
    description: 'A polished web experience with a modern, memorable interface.',
    image: 'MOCKTOPUS.png',
    href: 'https://mocktopus-two.vercel.app/',
    linkLabel: 'Open Mocktopus',
  },
  {
    title: 'Bharat Index',
    category: 'Web app · IPMAT prep',
    description: "A study hub built to help IPMAT aspirants prepare — a searchable index of India's political structure, economy, and states, with study guides and a live news feed.",
    image: 'BHARATINDEX.png',
    href: 'https://thriving-sunburst-2c5550.netlify.app/',
    linkLabel: 'Open Bharat Index',
  },
  {
    title: 'Petrichor Cafe',
    category: 'Mobile app · Figma',
    description: 'A mobile app concept for a sustainable campus cafe — rain-triggered scent pulses, a custom brew builder, and a clay-cup recycling loop.',
    image: 'PETRICHOR.png',
    href: 'https://mesh-long-33863730.figma.site',
    linkLabel: 'Open Petrichor Cafe',
  },
  {
    title: 'Chance Quest',
    category: 'Web game · Probability',
    description: 'A top-down pixel-art RPG that teaches probability — every problem is a situation in the world, from locks to crack to treasure to split, with an online versus mode to race a friend.',
    image: 'CHANCEQUEST.png',
    href: 'https://lorddomnikregard.github.io/chance-quest/',
    linkLabel: 'Play Chance Quest',
  },
]

type DesignItem = {
  title: string
  client: string
  description: string
  images: string[]
  variant: 'slides' | 'wide' | 'portrait'
  href: string
  linkLabel: string
}

const designWork: DesignItem[] = [
  {
    title: 'Induction Hoodie',
    client: 'MASCOM · IIM Amritsar',
    description: 'All-over print hoodie built from organic cell and squiggle patterns in a monochrome palette.',
    images: [1, 2, 3, 4, 5].map((n) => `work/hoodie-${n}.png`),
    variant: 'slides',
    href: 'mascom-hoodie-design.pdf',
    linkLabel: 'View deck',
  },
  {
    title: 'R2 Sweatshirt',
    client: 'MASCOM · IIM Amritsar',
    description: 'Crewneck sweatshirt pairing a woven folk-textile pattern with Golden Temple-inspired details.',
    images: [1, 2, 5, 6, 7].map((n) => `work/sweatshirt-${n}.png`),
    variant: 'slides',
    href: 'mascom-r2-sweatshirt-design.pdf',
    linkLabel: 'View deck',
  },
  {
    title: 'Varsity Jacket',
    client: "Students' Council · IIM Amritsar",
    description: 'Varsity jacket concept with an illustrated sleeve print and the council crest.',
    images: [1, 2, 3, 4, 5].map((n) => `work/jacket-${n}.png`),
    variant: 'slides',
    href: 'student-council-jacket-design.pdf',
    linkLabel: 'View deck',
  },
  {
    title: 'IIM AM I PM',
    client: 'IIM Amritsar',
    description: 'Vintage postage-stamp banner series covering campus life, BSQFE, and the Primus & Novus batches.',
    images: [1, 2, 3].map((n) => `work/ipm-${n}.png`),
    variant: 'wide',
    href: 'work/ipm-1.png',
    linkLabel: 'View banner',
  },
  {
    title: 'Happy Baisakhi',
    client: 'MASCOM · IIM Amritsar',
    description: 'Festival poster pairing bhangra silhouettes with a golden harvest field.',
    images: ['BAISAKHI.png'],
    variant: 'portrait',
    href: 'BAISAKHI.png',
    linkLabel: 'View poster',
  },
  {
    title: 'What Is Quant Finance?',
    client: 'IIM Amritsar · BSQFE',
    description: 'A 9-slide explainer carousel that walks from "the market never sleeps" to why BSQFE is India\'s first UG program built around quant finance.',
    images: [1, 3, 5, 7, 9].map((n) => `work/quant-${n}.png`),
    variant: 'portrait',
    href: 'work/quant-carousel.jpg',
    linkLabel: 'View carousel',
  },
  {
    title: 'Marksense Nationals Winners',
    client: 'Competition poster · IIM Amritsar',
    description: 'Announcement poster for Team Enigma winning the Marksense nationals at DTU.',
    images: ['work/marksense-poster.png'],
    variant: 'portrait',
    href: 'marksense-poster.pdf',
    linkLabel: 'View poster',
  },
]

// Fan n cards out evenly around the centre, alternating tilt.
const fanTransforms = (n: number) =>
  Array.from({ length: n }, (_, i) => {
    const offset = n > 1 ? Math.round((i - (n - 1) / 2) * (320 / (n - 1))) : 0
    const tilt = n > 1 ? (i % 2 === 0 ? 5 : -5) : -3
    return offset ? `rotate(${tilt}deg) translate(${offset}px)` : `rotate(${tilt}deg)`
  })

// Mount children only once scrolled into view, so the bounce plays where it can be seen.
function WhenVisible({ children, height }: { children: ReactNode; height: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true)
        io.disconnect()
      }
    }, { threshold: 0.3 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return <div ref={ref} className="bounce-wrap" style={{ minHeight: height }}>{visible && children}</div>
}

// Layered mountain silhouettes, echoing the peach-and-teal landscape theme.
function Landscape() {
  return (
    <svg className="landscape" viewBox="0 0 1440 460" preserveAspectRatio="none" aria-hidden="true">
      <path fill="#b9c2ad" opacity="0.55" d="M0 210 L120 150 L230 190 L360 110 L470 170 L600 95 L720 160 L850 80 L980 150 L1100 100 L1230 165 L1340 120 L1440 150 V460 H0 Z" />
      <path fill="#8aa197" opacity="0.7" d="M0 270 L140 200 L260 245 L390 170 L520 235 L650 160 L790 230 L920 175 L1060 240 L1190 185 L1320 235 L1440 200 V460 H0 Z" />
      <path fill="#5c7a72" d="M0 330 L110 280 L240 320 L380 250 L500 300 L640 240 L770 305 L900 255 L1040 315 L1180 265 L1310 310 L1440 275 V460 H0 Z" />
      <path fill="#2c4a46" d="M0 390 L160 340 L300 375 L450 320 L600 370 L760 330 L910 380 L1060 335 L1220 375 L1340 345 L1440 365 V460 H0 Z" />
      <path fill="#1f3a38" d="M0 440 L200 405 L380 430 L560 400 L760 435 L960 405 L1160 432 L1320 410 L1440 425 V460 H0 Z" />
    </svg>
  )
}

function App() {
  return (
    <>
      <Landscape />
      <main className="app-shell">
        <section className="demo-panel">
          <div className="hero-copy">
            <p className="eyebrow">Selected work</p>
            <SplitText tag="h1" text="Designing calm, lasting digital experiences." textAlign="left" delay={28} duration={0.9} threshold={0.2} rootMargin="0px" />
            <p>
              Web products, app concepts, and apparel & poster design — shaped around clarity, motion, and a quiet editorial feel.
            </p>
          </div>

          <div className="content-grid">
            <div className="content-card content-card--feature">
              <p className="eyebrow eyebrow--small">Featured project</p>
              <NoiseBackgroundDemoSecond />
            </div>

            <div className="content-card content-card--details">
              <h2>Current focus</h2>
              <ul>
                <li>Mocktopus — a polished web experience with a modern, memorable interface.</li>
                <li>Bharat Index — a study hub built to help IPMAT aspirants prepare, with a searchable index of India's polity, economy, and states.</li>
                <li>Petrichor Cafe — a mobile app concept for a sustainable campus cafe, designed in Figma.</li>
                <li>Chance Quest — a pixel-art RPG that teaches probability, playable in the browser.</li>
                <li>Apparel and poster design for MASCOM and the Students' Council at IIM Amritsar.</li>
              </ul>
              <div className="portfolio-links">
                {webProjects.map((p) => (
                  <a key={p.title} className="portfolio-link" href={p.href} target="_blank" rel="noreferrer">
                    {p.linkLabel}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <main id="web" className="app-shell">
        <section className="demo-panel">
          <div className="hero-copy">
            <p className="eyebrow">Web & product</p>
            <SplitText tag="h1" text="Sites and app concepts." textAlign="left" delay={28} duration={0.9} threshold={0.2} rootMargin="0px" />
            <p>Click or drag a card to flip it.</p>
          </div>

          <div className="flip-grid">
            {webProjects.map((p) => (
              <FlipCard
                key={p.title}
                ariaLabel={`${p.title} — flip for details`}
                width={320}
                height={400}
                radius={24}
                background="#1f3a38"
                color="#f6e7cc"
                tiltMax={10}
                front={
                  <div className="flip-face">
                    <img src={p.image} alt={`${p.title} preview`} className="flip-face__image" draggable={false} />
                    <div className="flip-face__body">
                      <p className="eyebrow eyebrow--small">{p.category}</p>
                      <h3>{p.title}</h3>
                      <span className="flip-face__hint">Flip for details ↻</span>
                    </div>
                  </div>
                }
                back={
                  <div className="flip-face flip-face--back">
                    <p className="eyebrow eyebrow--small">{p.category}</p>
                    <h3>{p.title}</h3>
                    <p>{p.description}</p>
                    <a
                      className="portfolio-link"
                      href={p.href}
                      target="_blank"
                      rel="noreferrer"
                      onPointerDown={(e) => e.stopPropagation()}
                    >
                      {p.linkLabel} →
                    </a>
                  </div>
                }
              />
            ))}
          </div>
        </section>
      </main>

      <main id="design" className="app-shell">
        <section className="demo-panel">
          <div className="hero-copy">
            <p className="eyebrow">Design work</p>
            <SplitText tag="h1" text="Apparel, posters & banners." textAlign="left" delay={28} duration={0.9} threshold={0.2} rootMargin="0px" />
          </div>

          {designWork.map((item) => (
            <div key={item.title} className="content-card design-item">
              <div className="design-item__copy">
                <p className="eyebrow eyebrow--small">{item.client}</p>
                <h2>{item.title}</h2>
                <p>{item.description}</p>
                <a href={item.href} target="_blank" rel="noreferrer" className="portfolio-link">
                  {item.linkLabel}
                </a>
              </div>
              <WhenVisible height={item.variant === 'portrait' ? 300 : 260}>
                <BounceCards
                  className={`bounce--${item.variant}`}
                  images={item.images}
                  containerWidth={500}
                  containerHeight={item.variant === 'portrait' ? 300 : 260}
                  animationDelay={0.2}
                  animationStagger={0.08}
                  easeType="elastic.out(1, 0.5)"
                  transformStyles={fanTransforms(item.images.length)}
                  enableHover
                />
              </WhenVisible>
            </div>
          ))}
        </section>
      </main>
    </>
  )
}

export default App
