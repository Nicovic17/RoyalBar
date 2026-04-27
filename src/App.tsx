import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { MapPin, Clock, Phone, Instagram, MessageCircle, Menu as MenuIcon, X, ChevronRight, Wine, Coffee, GlassWater, Cake } from 'lucide-react';

// --- DATA ---
const MENU_CATEGORIES = ['Cocktail', 'Caffetteria', 'Vini & Champagne', 'Soft Drink', 'Pasticceria'];

const MENU_ITEMS = [
  { id: 1, category: 'Cocktail', name: 'Royal Gold Martini', desc: 'Gin premium, vermouth dry, scaglie d\'oro alimentare 24k.', price: '€22' },
  { id: 2, category: 'Cocktail', name: 'Smoked Negroni', desc: 'Campari, gin artigianale, vermouth rosso, affumicato al legno di ciliegio.', price: '€18' },
  { id: 3, category: 'Cocktail', name: 'Velvet Old Fashioned', desc: 'Bourbon invecchiato 12 anni, sciroppo d\'acero, bitter alle noci.', price: '€20' },
  { id: 4, category: 'Caffetteria', name: 'Espresso Royal', desc: 'Miscela 100% Arabica, tostatura media, servito con cioccolatino fondente 80%.', price: '€4' },
  { id: 5, category: 'Caffetteria', name: 'Cappuccino d\'Autore', desc: 'Espresso, latte montato a freddo, polvere di cacao crudo.', price: '€6' },
  { id: 6, category: 'Caffetteria', name: 'Iced Vanilla Macchiato', desc: 'Doppio espresso, latte, sciroppo di vaniglia del Madagascar.', price: '€8' },
  { id: 7, category: 'Vini & Champagne', name: 'Dom Pérignon Vintage', desc: 'Champagne Brut. Bottiglia 75cl.', price: '€350' },
  { id: 8, category: 'Vini & Champagne', name: 'Barolo Riserva', desc: 'Annata 2015, note di tartufo e frutti rossi. Calice.', price: '€25' },
  { id: 9, category: 'Soft Drink', name: 'Limonata al Basilico', desc: 'Limoni di Amalfi, basilico fresco, sciroppo d\'agave.', price: '€10' },
  { id: 10, category: 'Pasticceria', name: 'Sfera di Cioccolato', desc: 'Cuore morbido al lampone, polvere d\'oro, crumble al pistacchio.', price: '€14' },
  { id: 11, category: 'Pasticceria', name: 'Tiramisù Scomposto', desc: 'Crema al mascarpone, savoiardi artigianali, caffè espresso Royal.', price: '€12' },
  { id: 12, category: 'Pasticceria', name: 'Millefoglie Royal', desc: 'Sfoglia caramellata, crema diplomatica alla vaniglia Bourbon, lamponi freschi.', price: '€15' },
  { id: 13, category: 'Pasticceria', name: 'Macarons Assortiti', desc: 'Selezione di 5 macarons artigianali, gusti classici ed esotici.', price: '€18' },
];

const FEATURED_PRODUCTS = [
  { id: 1, name: 'Signature Cocktail', img: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&q=80&w=800' },
  { id: 2, name: 'Caffè Premium', img: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { id: 3, name: 'Champagne Reserve', img: 'https://images.unsplash.com/photo-1621866908556-4f0a830707c9?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
];

const ATMOSPHERE_IMAGES = [
  'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1520262454473-a1a82276a574?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?auto=format&fit=crop&q=80&w=800',
  'https://images.unsplash.com/photo-1597290282695-edc43d0e7129?q=80&w=2675&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
];

const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'menu', label: 'Menu' },
  { id: 'pasticceria', label: 'Pasticceria' },
  { id: 'highlights', label: 'Galleria' },
  { id: 'atmosphere', label: 'Atmosfera' },
  { id: 'contact', label: 'Contatti' }
];

// --- COMPONENTS ---

const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-luxury-black overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, ease: 'easeInOut' }}
    >
      {/* Liquid Fill Effect */}
      <motion.div
        className="absolute inset-x-0 bottom-0 bg-[#2A1610]"
        initial={{ height: '0%' }}
        animate={{ height: '100%' }}
        transition={{ duration: 2.5, ease: [0.45, 0, 0.15, 1], delay: 0.2 }}
        onAnimationComplete={() => setTimeout(onComplete, 600)}
      >
        {/* Wave SVG */}
        <motion.svg
          className="absolute top-0 left-0 w-full -translate-y-[99%] text-[#2A1610]"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          initial={{ x: '-50%' }}
          animate={{ x: '0%' }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          style={{ height: '120px' }}
        >
          <path
            fill="currentColor"
            d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,144C672,139,768,181,864,197.3C960,213,1056,203,1152,176C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
          <path
            fill="currentColor"
            opacity="0.5"
            d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,213.3C672,224,768,224,864,208C960,192,1056,160,1152,149.3C1248,139,1344,149,1392,154.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </motion.svg>
      </motion.div>
      
      {/* Glow Effect */}
      <motion.div
        className="absolute inset-0 bg-luxury-gold/5 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      />

      <motion.div
        className="relative z-10 flex flex-col items-center"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, duration: 1.2, ease: "easeOut" }}
      >
        <h1 className="text-luxury-gold font-serif text-4xl md:text-7xl font-bold tracking-[0.2em] uppercase text-shadow-gold text-center">
          Luxury Royal
        </h1>
        <p className="text-luxury-gold-light mt-4 font-sans tracking-[0.3em] text-sm md:text-base uppercase">
          Lounge Bar
        </p>
      </motion.div>
    </motion.div>
  );
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ease-in-out ${scrolled ? 'glass-dark py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="font-serif text-2xl font-bold tracking-widest text-white cursor-pointer" onClick={() => scrollTo('home')}>
          ROYAL<span className="text-luxury-gold">BAR</span>
        </div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 items-center">
          {NAV_ITEMS.map((item) => (
            <button 
              key={item.id} 
              onClick={() => scrollTo(item.id)}
              className="text-[11px] font-sans tracking-[0.15em] uppercase text-white/60 hover:text-luxury-gold transition-colors duration-300"
            >
              {item.label}
            </button>
          ))}
          <button className="bg-luxury-gold text-luxury-black font-semibold rounded-sm px-6 py-2 hover:bg-white hover:text-luxury-black transition-all duration-300 glow-gold-box hover:glow-gold-hover text-[11px] tracking-[0.1em] uppercase"
            onClick={() => scrollTo('menu')}
          >
            Scopri Menu
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={28} /> : <MenuIcon size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full glass-dark flex flex-col items-center py-8 space-y-6 md:hidden border-b border-luxury-gold/20"
          >
            {NAV_ITEMS.map((item) => (
              <button 
                key={item.id} 
                onClick={() => scrollTo(item.id)}
                className="text-lg font-sans tracking-widest uppercase hover:text-luxury-gold transition-colors"
              >
                {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 400]);

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0 w-full h-full z-0">
        <img 
          src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=2000" 
          alt="Luxury Lounge Background" 
          className="w-full h-[120%] object-cover opacity-20 mix-blend-luminosity"
        />
        {/* Soft light overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-transparent to-luxury-black/80" />
      </motion.div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="px-3 py-1 border border-luxury-gold/30 rounded-full text-luxury-gold tracking-[0.3em] uppercase text-[10px] mb-6"
        >
          Excellence in every sip
        </motion.p>
        <motion.h1 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 1 }}
          className="font-serif text-6xl md:text-[82px] leading-[0.9] text-shadow-gold text-luxury-gold mb-6"
        >
          Luxury<br/>Royal Bar
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 1 }}
          className="text-white/70 italic font-sans text-lg mt-4 mb-10 max-w-md"
        >
          Dove l'arte della mixology incontra l'eleganza di un ambiente senza tempo. Un'esperienza sensoriale esclusiva nel cuore della città.
        </motion.p>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
        >
          <button 
            onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-luxury-gold text-luxury-black font-semibold uppercase tracking-[0.1em] px-8 py-4 rounded-sm glow-gold-box hover:bg-white transition-all duration-300"
          >
            Scopri il Menu
          </button>
          <button 
            onClick={() => window.open('https://wa.me/1234567890', '_blank')}
            className="border border-white/20 text-white rounded-sm px-8 py-4 uppercase tracking-widest text-xs hover:border-luxury-gold hover:text-luxury-gold transition-all duration-300 flex items-center justify-center space-x-2"
          >
            <MessageCircle size={18} />
            <span>Prenota un Tavolo</span>
          </button>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-16 flex flex-col md:flex-row items-center gap-6"
        >
          <div className="flex -space-x-4">
            <div className="w-10 h-10 rounded-full border-2 border-luxury-black bg-luxury-green overflow-hidden">
               <img src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&q=80&w=100" className="w-full h-full object-cover opacity-80" alt="Avatar"/>
            </div>
            <div className="w-10 h-10 rounded-full border-2 border-luxury-black bg-luxury-gold overflow-hidden">
               <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100" className="w-full h-full object-cover opacity-80" alt="Avatar"/>
            </div>
            <div className="w-10 h-10 rounded-full border-2 border-luxury-black bg-white/20 overflow-hidden">
               <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=100" className="w-full h-full object-cover opacity-80" alt="Avatar"/>
            </div>
          </div>
          <span className="text-xs text-white/50 tracking-wide">Oltre 500 soci esclusivi hanno scelto il Royal Bar</span>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-luxury-gold/50"
      >
        <div className="w-[1px] h-16 bg-gradient-to-b from-luxury-gold to-transparent mx-auto" />
      </motion.div>
    </section>
  );
};

const MenuViewer = () => {
  const [activeCategory, setActiveCategory] = useState(MENU_CATEGORIES[0]);

  const filteredItems = MENU_ITEMS.filter(item => item.category === activeCategory);

  return (
    <section id="menu" className="py-24 relative z-10">
      
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-serif text-[82px] leading-tight text-white mb-4">Il <span className="text-luxury-gold">Menu</span></h2>
          <div className="w-24 h-[1px] bg-luxury-gold mx-auto" />
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-16">
          {MENU_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-sm md:text-base uppercase tracking-widest pb-2 transition-all duration-300 border-b-2 ${
                activeCategory === cat 
                  ? 'border-luxury-gold text-luxury-gold' 
                  : 'border-transparent text-gray-500 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Menu Items Grid */}
        <motion.div 
          layout
          className="grid md:grid-cols-2 gap-x-16 gap-y-10"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="group relative"
              >
                <div className="flex justify-between items-baseline border-b border-white/10 pb-4 mb-2 group-hover:border-luxury-gold/50 transition-colors duration-500">
                  <h3 className="font-serif text-2xl text-white group-hover:text-luxury-gold text-shadow-gold transition-colors duration-300">
                    {item.name}
                  </h3>
                  <span className="font-serif text-xl text-luxury-gold ml-4">{item.price}</span>
                </div>
                <p className="font-sans text-white/50 text-sm md:text-base pr-8 font-light">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

const PasticceriaSection = () => {
  return (
    <section id="pasticceria" className="py-24 relative z-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 relative aspect-square lg:aspect-[4/5] group overflow-hidden rounded-sm"
          >
            <img
              src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=1000"
              alt="Alta Pasticceria"
              className="w-full h-full object-cover transition-transform duration-[10s] group-hover:scale-110 opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/90 via-transparent to-transparent pointer-events-none" />
            <div className="absolute inset-0 border border-luxury-gold/20 m-6 pointer-events-none transition-all duration-700 group-hover:m-4" />
          </motion.div>

          {/* Text side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:w-1/2"
          >
            <div className="mb-4 px-3 py-1 border border-luxury-gold/30 w-fit rounded-full text-[10px] uppercase tracking-[0.3em] text-luxury-gold">
              Artigianalità
            </div>
            <h2 className="font-serif text-[60px] md:text-[82px] leading-[0.9] text-white mb-8">
              Alta <br/><span className="text-luxury-gold">Pasticceria</span>
            </h2>
            <div className="w-16 h-[1px] bg-luxury-gold mb-8" />
            <p className="text-white/70 italic font-sans text-lg mb-8 max-w-lg">
              Non solo lounge bar. Il Royal Bar vanta un laboratorio di pasticceria interno dove prendono vita creazioni uniche: dai grandi lievitati per la colazione, alla pasticceria mignon, fino a torte monumentali per eventi esclusivi.
            </p>

            <div className="grid grid-cols-2 gap-6 mb-12">
              <div className="glass-dark p-6 rounded-sm border-l-2 border-l-luxury-gold">
                <Cake className="text-luxury-gold mb-4" size={28} />
                <h4 className="font-serif text-white text-xl mb-2">Torte Eventi</h4>
                <p className="text-white/50 text-xs tracking-wider">Creazioni su misura per celebrazioni</p>
              </div>
              <div className="glass-dark p-6 rounded-sm border-l-2 border-l-luxury-gold">
                <Coffee className="text-luxury-gold mb-4" size={28} />
                <h4 className="font-serif text-white text-xl mb-2">Lievitati</h4>
                <p className="text-white/50 text-xs tracking-wider">Colazione premium ogni mattina</p>
              </div>
            </div>

            <button
              onClick={() => window.open('https://wa.me/1234567890?text=Salve%2C%20vorrei%20avere%20informazioni%20sulla%20vostra%20pasticceria%2Fprenotare%20un%20dolce.', '_blank')}
              className="bg-luxury-gold text-luxury-black font-semibold rounded-sm px-8 py-4 hover:bg-white hover:text-luxury-black transition-all duration-300 glow-gold-box hover:glow-gold-hover tracking-[0.1em] uppercase text-xs flex items-center justify-center space-x-3 w-fit"
            >
              <MessageCircle size={18} />
              <span>Ordina Dolci su WhatsApp</span>
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const HighlightsSection = () => {
  return (
    <section id="highlights" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div>
            <h2 className="font-serif text-[82px] leading-tight text-white mb-4">Selezione <span className="text-luxury-gold">Premium</span></h2>
            <div className="w-24 h-[1px] bg-luxury-gold" />
          </div>
          <p className="text-white/60 max-w-sm mt-6 md:mt-0 font-light hidden md:block text-right">
            I prodotti più esclusivi, creati dai nostri mixologist per un'esperienza indimenticabile.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {FEATURED_PRODUCTS.map((prod, idx) => (
            <motion.div 
              key={prod.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: idx * 0.2, duration: 0.8 }}
              className="relative aspect-[3/4] group overflow-hidden cursor-pointer"
            >
              <img 
                src={prod.img} 
                alt={prod.name} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-80 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/90 via-luxury-black/20 to-transparent transition-opacity duration-500" />
              
              <div className="absolute bottom-0 left-0 w-full p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <span className="text-luxury-gold tracking-widest text-xs uppercase block mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  Must Try
                </span>
                <h3 className="font-serif text-2xl md:text-3xl text-white group-hover:text-luxury-gold text-shadow-gold transition-colors duration-300">
                  {prod.name}
                </h3>
              </div>
              
              {/* Highlight Glow Hover */}
              <div className="absolute inset-0 border border-luxury-gold/0 group-hover:border-luxury-gold/50 group-hover:glow-gold transition-all duration-700 pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const AtmosphereSection = () => {
  return (
    <section id="atmosphere" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 flex flex-col items-center">
          <h2 className="font-serif text-[82px] leading-tight text-white mb-4">L'<span className="text-luxury-gold">Atmosfera</span></h2>
          <div className="w-24 h-[1px] bg-luxury-gold mb-8" />
          <p className="text-white/70 max-w-2xl font-light text-lg mb-8 italic text-center">
            Immergiti in un ambiente esclusivo. Il Royal Bar è anche la location perfetta per i tuoi <span className="text-luxury-gold font-medium not-italic">eventi privati</span>. Spazi modulabili, servizio dedicato e la garanzia di un'esperienza indimenticabile.
          </p>
          <button 
            onClick={() => window.open('https://wa.me/1234567890?text=Salve%2C%20vorrei%20avere%20informazioni%20sull\'organizzazione%20di%20un%20evento%20privato.', '_blank')}
            className="border border-white/20 text-white rounded-sm px-8 py-4 uppercase tracking-[0.15em] text-xs hover:border-luxury-gold hover:text-luxury-gold transition-all duration-300 flex items-center justify-center space-x-2 w-fit"
          >
            <MessageCircle size={18} />
            <span>Organizza il tuo Evento</span>
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 md:h-[600px]">
          {ATMOSPHERE_IMAGES.map((img, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.7 }}
              className={`relative overflow-hidden group rounded-sm ${idx === 0 || idx === 3 ? 'md:col-span-2 md:row-span-2 h-64 md:h-full' : 'h-40 md:h-full'}`}
            >
              <img 
                src={img} 
                alt={`Atmosphere ${idx + 1}`} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-luxury-gold/0 group-hover:bg-luxury-gold/10 transition-colors duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ContactSection = () => {
  return (
    <section id="contact" className="py-24 border-t border-white/5 relative overflow-hidden z-10">
      {/* Decorative large LR */}
      <div className="absolute top-1/2 -right-40 -translate-y-1/2 font-serif text-[400px] text-white/[0.02] pointer-events-none tracking-tighter leading-none">
        LR
      </div>

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center relative z-10">
        <div>
          <h2 className="font-serif text-[82px] leading-tight text-white mb-8">Dove <span className="text-luxury-gold">Trovarci</span></h2>
          
          <div className="space-y-8 glass-dark p-10 rounded-sm">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 rounded-full border border-luxury-gold/30 flex items-center justify-center flex-shrink-0 text-luxury-gold">
                <MapPin size={24} />
              </div>
              <div>
                <h4 className="text-white font-serif tracking-wider text-xl mb-1">Indirizzo</h4>
                <p className="text-white/60 font-light">Via del Lusso, 1A<br/>00100 Roma, IT</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 rounded-full border border-luxury-gold/30 flex items-center justify-center flex-shrink-0 text-luxury-gold">
                <Clock size={24} />
              </div>
              <div>
                <h4 className="text-white font-serif tracking-wider text-xl mb-1">Orari</h4>
                <p className="text-white/60 font-light">
                  Lun - Gio: 18:00 - 02:00<br/>
                  Ven - Dom: 18:00 - 04:00
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 rounded-full border border-luxury-gold/30 flex items-center justify-center flex-shrink-0 text-luxury-gold">
                <Phone size={24} />
              </div>
              <div>
                <h4 className="text-white font-serif tracking-wider text-xl mb-1">Prenotazioni</h4>
                <p className="text-white/60 font-light">+39 06 123 4567</p>
              </div>
            </div>
          </div>
          
          <div className="mt-12">
            <button 
              onClick={() => window.open('https://wa.me/1234567890', '_blank')}
              className="bg-transparent border border-luxury-gold text-luxury-gold px-8 py-3 hover:bg-luxury-gold hover:text-luxury-black transition-all duration-300 tracking-[0.15em] text-[11px] uppercase flex items-center inline-flex space-x-2"
            >
              <MessageCircle size={18} />
              <span>Contatta su WhatsApp</span>
            </button>
          </div>
        </div>

        {/* Map Placeholder */}
        <div className="w-full aspect-square md:aspect-auto md:h-full min-h-[450px] glass-dark flex items-center justify-center relative overflow-hidden group rounded-sm p-2">
          <div className="w-full h-full relative overflow-hidden group">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=800')] bg-cover bg-center opacity-40 mix-blend-luminosity transition-transform duration-[20s] group-hover:scale-110" />
            <div className="absolute inset-0 bg-luxury-black/60 group-hover:bg-luxury-black/40 transition-colors duration-700" />
            
            <div className="relative z-10 h-full flex flex-col items-center justify-center px-6">
              <div className="w-16 h-16 bg-luxury-gold rounded-full flex items-center justify-center mx-auto mb-4 p-4 glow-gold-box hover:scale-110 transition-transform duration-300 cursor-pointer">
                <MapPin className="text-luxury-black w-8 h-8" fill="currentColor" />
              </div>
              <h3 className="font-serif text-2xl text-white mb-2">Luxury Royal Bar</h3>
              <p className="font-sans text-[10px] text-luxury-gold tracking-widest uppercase">Visualizza su Maps</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="w-full px-12 py-6 flex flex-col md:flex-row justify-between items-center text-[10px] text-white/40 tracking-widest uppercase border-t border-white/5 relative z-10">
    <div className="flex gap-8 mb-4 md:mb-0">
      <span className="hover:text-luxury-gold transition-colors cursor-pointer">Via del Lusso 1A, Roma</span>
      <span className="hover:text-luxury-gold transition-colors cursor-pointer">+39 06 1234567</span>
    </div>
    <div className="font-serif text-lg font-bold tracking-widest text-white/20 hidden md:block">
      R B
    </div>
    <div className="flex gap-8">
      <span className="hover:text-luxury-gold transition-colors cursor-pointer">Instagram</span>
      <span className="hover:text-luxury-gold transition-colors cursor-pointer">Facebook</span>
      <span className="hover:text-luxury-gold transition-colors cursor-pointer">TripAdvisor</span>
    </div>
  </footer>
);

const FloatingStaticCTAs = () => (
  <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-4">
    <button 
      onClick={() => window.open('https://wa.me/1234567890', '_blank')}
      className="w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-[0_10px_20px_rgba(0,0,0,0.3)] hover:scale-110 hover:shadow-[0_15px_25px_rgba(37,211,102,0.4)] transition-all duration-300"
      aria-label="WhatsApp"
    >
      <MessageCircle size={28} />
    </button>
  </div>
);

// --- MAIN APP ---

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  // Lock scroll during splash
  useEffect(() => {
    if (showSplash) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
      // Fallback for smooth scroll inside the application manually
      document.body.style.scrollBehavior = 'smooth';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showSplash]);

  return (
    <div className="bg-gradient-immersive min-h-screen selection:bg-luxury-gold selection:text-black relative">
      <div className="overlay-pattern fixed inset-0 pointer-events-none z-0"></div>
      <div className="accent-glow fixed top-[-100px] left-[-100px] w-[400px] h-[400px] pointer-events-none z-0"></div>
      
      <AnimatePresence>
        {showSplash ? (
          <SplashScreen key="splash" onComplete={() => setShowSplash(false)} />
        ) : (
          <motion.div
            key="app"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative z-10"
          >
            <Navbar />
            <Hero />
            <MenuViewer />
            <PasticceriaSection />
            <HighlightsSection />
            <AtmosphereSection />
            <ContactSection />
            <Footer />
            <FloatingStaticCTAs />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

