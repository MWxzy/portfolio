interface ObserverOptions {
  threshold: number;
  rootMargin: string;
}

class PortfolioAnimations {
  private observerOptions: ObserverOptions;
  private observer: IntersectionObserver;

  constructor() {
    this.observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    };

    this.observer = new IntersectionObserver(
      this.handleIntersection.bind(this),
      this.observerOptions
    );

    this.init();
  }

  private init(): void {
    this.setupScrollReveal();
    this.setupParallax();
    this.setupSmoothScroll();
    this.setupCardHovers();
  }

  private handleIntersection(entries: IntersectionObserverEntry[]): void {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }

  private setupScrollReveal(): void {
    const revealElements = document.querySelectorAll('.scroll-reveal');
    revealElements.forEach((el) => {
      this.observer.observe(el);
    });
  }

  private setupParallax(): void {
    const parallaxElements = document.querySelectorAll('[data-parallax]');

    if (parallaxElements.length === 0) return;

    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;

      parallaxElements.forEach((el) => {
        const parallaxValue = parseFloat(
          el.getAttribute('data-parallax') || '0.5'
        );
        const offset = scrollY * parallaxValue;
        (el as HTMLElement).style.transform = `translateY(${offset}px)`;
      });
    });
  }

  private setupSmoothScroll(): void {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach((link) => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (!href) return;

        const target = document.querySelector(href);
        if (!target) return;

        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      });
    });
  }

  private setupCardHovers(): void {
    const cards = document.querySelectorAll('.pixel-card, .blog-card');

    cards.forEach((card) => {
      card.addEventListener('mouseenter', () => {
        card.classList.add('animate-border-glow');
      });

      card.addEventListener('mouseleave', () => {
        card.classList.remove('animate-border-glow');
      });
    });
  }

  public revealElement(element: Element): void {
    this.observer.observe(element);
  }

  public destroy(): void {
    this.observer.disconnect();
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new PortfolioAnimations();
  });
} else {
  new PortfolioAnimations();
}

export default PortfolioAnimations;
