import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  MapPin, 
  Clock, 
  Activity, 
  AlertTriangle, 
  Check, 
  ArrowLeft, 
  Menu, 
  X, 
  Star,
  Cpu
} from 'lucide-react';

interface LogEntry {
  time: string;
  text: string;
  type: 'info' | 'success' | 'warn' | 'error';
}

function App() {
  // Navigation State
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Pricing State
  const [isYearly, setIsYearly] = useState(false);

  // Testimonial State
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Contact Form State
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', agency: '', message: '' });

  // Simulator State
  const [activeIncident, setActiveIncident] = useState<string | null>(null);
  const [simLogs, setSimLogs] = useState<LogEntry[]>([
    { time: '12:00:00', text: 'המערכת אותחלה בהצלחה. כל היחידות מחוברות.', type: 'info' },
    { time: '12:00:02', text: 'מנוע ניתוב ושיגור מבוסס AI פעיל.', type: 'success' },
    { time: '12:00:05', text: 'בהמתנה לקריאות חירום נכנסות...', type: 'info' }
  ]);
  const [isSimulating, setIsSimulating] = useState(false);

  // Scroll event for transparent header styling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const testimonials = [
    {
      text: "“מערכת EMS Action שינתה לחלוטין את הדרך בה המוקדנים שלנו מטפלים בקריאות חירום קריטיות. זמני התגובה ירדו ב-30% כבר בחודש הראשון. יכולות ה-Offline הן פשוט הצלת חיים אמיתית בשטח.”",
      author: "מפקד שירותי ההצלה שגיא מזרחי",
      role: "מנהל מרחב מחוז מרכז"
    },
    {
      text: "“התעדוף האוטומטי וההכוון בזמן אמת מסייעים לאמבולנסים שלנו לעקוף פקקים ולהגיע מהר יותר. הממשק אינטואיטיבי, מהיר ומציל חיים. אי אפשר לחזור למערכות הישנות אחרי שמנסים את זה.”",
      author: "ד\"ר ליאת כהן",
      role: "מנהלת רפואית, מערך מד\"א"
    },
    {
      text: "“באזורים הרריים ופריפריה שבהם הקליטה הסלולרית חלשה, היכולת לעבוד באופליין מלא מבטיחה שהפרמדיקים תמיד מעודכנים במידע רפואי קריטי. אבטחת המידע ועמידה בתקנים היא מעל ומעבר.”",
      author: "אלון לוי",
      role: "ראש צוות איתור וחילוץ הררי"
    }
  ];

  const triggerSimulation = (type: string) => {
    if (isSimulating) return;
    setIsSimulating(true);
    setActiveIncident(type);

    const now = () => new Date().toTimeString().split(' ')[0];

    const incidentDetails: Record<string, { desc: string, loc: string, severity: string }> = {
      cardiac: { desc: 'דיווח על אירוע לבבי קריטי.', loc: 'גזרה 4 - מרכז העיר', severity: 'קריטי' },
      accident: { desc: 'תאונת דרכים מרובת רכבים.', loc: 'כביש 6, קילומטר 42', severity: 'חמור' },
      rescue: { desc: 'מטייל אבוד בנחל דרגה.', loc: 'מסלול אדום, נקודת ציון 12', severity: 'בינוני' }
    };

    const target = incidentDetails[type];

    // Clear logs and start a simulation sequence
    setSimLogs([
      { time: now(), text: `🚨 קריאת חירום התקבלה: ${target.desc}`, type: 'error' },
    ]);

    setTimeout(() => {
      setSimLogs(prev => [
        ...prev,
        { time: now(), text: `🤖 מנתח AI: מאתר מיקום גיאוגרפי ב-[${target.loc}]`, type: 'info' }
      ]);
    }, 1000);

    setTimeout(() => {
      setSimLogs(prev => [
        ...prev,
        { time: now(), text: `🚑 משגר ניידת טיפול נמרץ #104 (זמן הגעה משוער: 4 דקות)`, type: 'warn' }
      ]);
    }, 2200);

    setTimeout(() => {
      setSimLogs(prev => [
        ...prev,
        { time: now(), text: `✅ ניידת #104 אישרה קבלת קריאה. מסלול ניווט מותאם לעומסי תנועה נשלח.`, type: 'success' }
      ]);
      setIsSimulating(false);
    }, 3500);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email) {
      setFormSubmitted(true);
      // Reset form
      setFormData({ name: '', email: '', agency: '', message: '' });
      setTimeout(() => setFormSubmitted(false), 5000);
    }
  };

  return (
    <>
      {/* Navigation */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="container nav-container">
          <div className="logo">
            <span className="logo-dot"></span>
            EMS <span style={{ color: 'var(--accent)' }}>ACTION</span>
          </div>
          <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`} style={isMenuOpen ? { display: 'flex', flexDirection: 'column', position: 'absolute', top: '70px', left: 0, right: 0, backgroundColor: 'rgba(17, 24, 37, 0.98)', padding: '20px', borderBottom: '1px solid var(--border-color)', gap: '15px' } : {}}>
            <li><a href="#features" className="nav-link" onClick={() => setIsMenuOpen(false)}>מאפיינים</a></li>
            <li><a href="#simulator" className="nav-link" onClick={() => setIsMenuOpen(false)}>הדגמה חיה</a></li>
            <li><a href="#pricing" className="nav-link" onClick={() => setIsMenuOpen(false)}>חבילות ומחירים</a></li>
            <li><a href="#contact" className="nav-link" onClick={() => setIsMenuOpen(false)}>צור קשר</a></li>
            <li>
              <a href="#contact" className="nav-btn" onClick={() => setIsMenuOpen(false)}>תיאום הדגמה</a>
            </li>
          </ul>
          <button className="mobile-menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="תפריט">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-bg-glow"></div>
        <div className="container">
          <div className="hero-badge">
            <Activity size={14} style={{ marginLeft: '6px', color: 'var(--accent)' }} />
            שירותי חירום והצלה מהדור הבא
          </div>
          <h1 className="hero-title">
            <span>כל שנייה קובעת.</span><br />
            <em>ייעול. תיאום. מענה מהיר.</em>
          </h1>
          <p className="hero-subtitle">
            מערכת מתקדמת מבוססת בינה מלאכותית לניהול, תיאום ושיגור כוחות רפואה וחירום. צמצמו את זמני התגובה ב-30%, הבטיחו תקשורת יציבה גם ללא חיבור רשת, והצילו חיים.
          </p>
          <div className="hero-buttons">
            <a href="#contact" className="btn-primary">התחילו עכשיו</a>
            <a href="#simulator" className="btn-secondary">צפו בסימולטור</a>
          </div>

          {/* Mini Interactive Preview of Dashboard */}
          <div className="dashboard-mockup">
            <div className="dashboard-header">
              <div className="dashboard-dots">
                <span className="dashboard-dot red"></span>
                <span className="dashboard-dot yellow"></span>
                <span className="dashboard-dot green"></span>
              </div>
              <div className="dashboard-title">EMS ACTION CONTROL ROOM v3.1</div>
              <div style={{ width: '40px' }}></div>
            </div>
            <div className="dashboard-body" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
              <div style={{ borderLeft: '1px solid var(--border-color)', paddingLeft: '15px' }}>
                <h4 style={{ marginBottom: '12px', fontSize: '14px', color: 'var(--text-secondary)' }}>אירועים פעילים</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ padding: '10px', background: 'rgba(239, 68, 68, 0.08)', borderRight: '4px solid #ef4444', borderRadius: '4px' }}>
                    <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#ff8a8a' }}>דום לב מדווח</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '4px' }}>לפני 10 דק׳ • אמבולנס 104</div>
                  </div>
                  <div style={{ padding: '10px', background: 'rgba(245, 158, 11, 0.08)', borderRight: '4px solid #f59e0b', borderRadius: '4px' }}>
                    <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#fcd34d' }}>תאונת דרכים - כביש 6</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '4px' }}>לפני 24 דק׳ • אמבולנס 112</div>
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h4 style={{ marginBottom: '12px', fontSize: '14px', color: 'var(--text-secondary)' }}>מפת איתור וניווט מהיר</h4>
                  <div style={{ height: '150px', background: '#111827', borderRadius: '8px', position: 'relative', overflow: 'hidden', border: '1px solid #1f2937' }}>
                    {/* Simulated Map Background lines */}
                    <div style={{ position: 'absolute', width: '100%', height: '100%', backgroundImage: 'radial-gradient(var(--border-color) 1px, transparent 0)', backgroundSize: '24px 24px', opacity: '0.3' }}></div>
                    {/* Active Ambulance Marker */}
                    <div style={{ position: 'absolute', top: '40%', right: '30%', color: 'var(--primary)', animation: 'pulse 1.5s infinite' }}>
                      <MapPin size={24} />
                    </div>
                    {/* Incident Marker */}
                    <div style={{ position: 'absolute', top: '55%', right: '70%', color: 'var(--accent)' }}>
                      <AlertTriangle size={24} />
                    </div>
                  </div>
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'flex', justifyContent: 'space-between', marginTop: '10px', direction: 'rtl' }}>
                  <span>סטטוס: 12 יחידות פעילות בשטח</span>
                  <span>דיוק GPS: ±2 מטרים</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Bar */}
      <section className="metrics-section">
        <div className="container">
          <div className="metrics-grid">
            <div className="metric-card">
              <div style={{ color: 'var(--accent)', marginBottom: '8px', display: 'flex', justifyContent: 'center' }}>
                <Clock size={32} />
              </div>
              <h3>30%-</h3>
              <p>זמן תגובה ממוצע</p>
            </div>
            <div className="metric-card">
              <h3>99.99%</h3>
              <p>זמינות מערכת (Uptime)</p>
            </div>
            <div className="metric-card">
              <h3>15,000+</h3>
              <p>חיים שניצלו</p>
            </div>
            <div className="metric-card">
              <h3>200+</h3>
              <p>תחנות ומוקדים פעילים</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="section">
        <div className="container">
          <div className="features-header">
            <h2>טכנולוגיה מתקדמת מצילת חיים</h2>
            <p>כל תכונה במערכת תוכננה בקפידה כדי לספק יציבות מלאה, תגובה מהירה ופעולה קריטית ברגע האמת.</p>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <Cpu size={24} />
              </div>
              <h3>שיגור חכם מבוסס AI</h3>
              <p>המערכת מחשבת עומסי תנועה, סוג המקרה, ורמת הכשירות של הצוותים כדי לשלוח את היחידה המתאימה ביותר באופן אוטומטי ומיידי.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <MapPin size={24} />
              </div>
              <h3>מעקב ואיתור בזמן אמת</h3>
              <p>מעקב אחר כל רכבי וצוותי החירום על גבי מפה מסונכרנת אחת, עם אפשרות לניתוב דינמי תוך כדי נסיעה.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <Shield size={24} />
              </div>
              <h3>אבטחה והתאמה לתקנים</h3>
              <p>עמידה קפדנית בתקני אבטחת מידע רפואי המחמירים ביותר. מידע חסוי ורשומות רפואיות מוצפנים מקצה לקצה בצורה מלאה.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Simulator Section */}
      <section id="simulator" className="section" style={{ backgroundColor: 'rgba(17, 24, 39, 0.3)' }}>
        <div className="container">
          <div className="features-header">
            <h2>הדמיית מוקד חירום דינמי</h2>
            <p>לחצו על אחד מסוגי הקריאה מטה כדי לראות את אלגוריתם הניתוב והשיגור של EMS Action פועל בזמן אמת.</p>
          </div>
          
          <div className="simulator-box">
            <div className="sim-controls">
              <button 
                className={`btn-control ${activeIncident === 'cardiac' ? 'active' : ''}`}
                onClick={() => triggerSimulation('cardiac')}
                disabled={isSimulating}
              >
                אירוע לבבי (עדיפות עליונה)
              </button>
              <button 
                className={`btn-control ${activeIncident === 'accident' ? 'active' : ''}`}
                onClick={() => triggerSimulation('accident')}
                disabled={isSimulating}
              >
                תאונת דרכים קשה
              </button>
              <button 
                className={`btn-control ${activeIncident === 'rescue' ? 'active' : ''}`}
                onClick={() => triggerSimulation('rescue')}
                disabled={isSimulating}
              >
                חילוץ משטח מורכב
              </button>
            </div>

            <div className="sim-output">
              {simLogs.map((log, index) => (
                <div key={index} className="sim-line">
                  <span className="sim-line-time">[{log.time}]</span>
                  <span className={log.type === 'error' ? 'sim-line-error' : log.type === 'warn' ? 'sim-line-info' : 'sim-line-success'}>
                    {log.text}
                  </span>
                </div>
              ))}
              {isSimulating && (
                <div className="sim-loading">
                  <span className="sim-dot"></span>
                  <span className="sim-dot"></span>
                  <span className="sim-dot"></span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section">
        <div className="container">
          <div className="features-header">
            <h2>מפי הלקוחות בשטח</h2>
            <p>צוותי הצלה ורפואה מהמובילים בארץ כבר עברו לשיטת הניהול המתקדמת של EMS Action.</p>
          </div>

          <div className="testimonials-slider">
            <div className="stars-container">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} fill="#fbbf24" stroke="none" />
              ))}
            </div>
            <p className="testimonial-text">{testimonials[activeTestimonial].text}</p>
            <div className="testimonial-author">{testimonials[activeTestimonial].author}</div>
            <div className="testimonial-role">{testimonials[activeTestimonial].role}</div>
            
            <div className="slider-dots">
              {testimonials.map((_, index) => (
                <button 
                  key={index} 
                  className={`slider-dot ${activeTestimonial === index ? 'active' : ''}`}
                  onClick={() => setActiveTestimonial(index)}
                  aria-label={`שקופית מספר ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="section" style={{ backgroundColor: 'rgba(17, 24, 39, 0.3)' }}>
        <div className="container">
          <div className="features-header">
            <h2>תוכניות ומחירים בהתאמה מודולרית</h2>
            <p>בחרו את הפתרון המתאים ביותר להיקף הפעילות שלכם, ללא הפתעות מוסתרות.</p>
          </div>

          <div className="pricing-toggle">
            <span>חיוב חודשי</span>
            <label className="switch">
              <input type="checkbox" checked={isYearly} onChange={() => setIsYearly(!isYearly)} />
              <span className="slider"></span>
            </label>
            <span>חיוב שנתי (חיסכון של 20%)</span>
          </div>

          <div className="pricing-grid">
            <div className="pricing-card">
              <div className="pricing-header">
                <h3>תחנה אזורית / מתנדבים</h3>
                <div className="price-box">
                  <span className="price">${isYearly ? '199' : '249'}</span>
                  <span className="price-sub">/ לחודש</span>
                </div>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '20px' }}>מושלם לתחנות מקומיות קטנות ויחידות מתנדבים ללא חדר בקרה מורכב.</p>
              </div>
              <ul className="pricing-features">
                <li><Check size={16} /> עד 5 כלי רכב פעילים במקביל</li>
                <li><Check size={16} /> מעקב מיקום ושיגור מפה בזמן אמת</li>
                <li><Check size={16} /> מצב עבודה לא מקוון במכשירים ניידים</li>
                <li><Check size={16} /> תמיכה טכנית בשעות הפעילות</li>
              </ul>
              <a href="#contact" className="btn-secondary">רכישה מקוונת</a>
            </div>

            <div className="pricing-card premium">
              <div className="badge-pop">הנפוץ ביותר</div>
              <div className="pricing-header">
                <h3>מרחב עירוני / מוקד הצלה</h3>
                <div className="price-box">
                  <span className="price">${isYearly ? '479' : '599'}</span>
                  <span className="price-sub">/ לחודש</span>
                </div>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '20px' }}>מענה מקיף לארגוני הצלה בגודל בינוני ורשויות מקומיות.</p>
              </div>
              <ul className="pricing-features">
                <li><Check size={16} /> עד 25 כלי רכב פעילים במקביל</li>
                <li><Check size={16} /> עוזר שיגור מתקדם מבוסס AI</li>
                <li><Check size={16} /> תיק רפואי דיגיטלי מאובטח (HIPAA)</li>
                <li><Check size={16} /> תמיכה מלאה 24/7 מוקד טלפוני</li>
              </ul>
              <a href="#contact" className="btn-primary">רכישת מנוי Pro</a>
            </div>

            <div className="pricing-card">
              <div className="pricing-header">
                <h3>ארגוני חירום / Enterprise</h3>
                <div className="price-box">
                  <span className="price">התאמה אישית</span>
                </div>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '20px' }}>מערך שלם של פתרונות תפורים למידות של ארגונים ארציים וענקיים.</p>
              </div>
              <ul className="pricing-features">
                <li><Check size={16} /> כמות כלי רכב ומשתמשים ללא הגבלה</li>
                <li><Check size={16} /> שרתי ענן ייעודיים (Dedicated Node)</li>
                <li><Check size={16} /> אינטגרציית API ומערכות מוקד מורשות</li>
                <li><Check size={16} /> תמיכה ייעודית תחת הסכם רמת שירות</li>
              </ul>
              <a href="#contact" className="btn-secondary">צור קשר לפרטים</a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="section">
        <div className="container">
          <div className="features-header">
            <h2>מוכנים להוביל את שינוי הסטנדרט?</h2>
            <p>כתבו לנו ונציג מקצועי יחזור אליכם לתיאום הדגמה חיה מלאה של המערכת המותאמת לארגונכם.</p>
          </div>

          <div className="contact-container">
            {formSubmitted ? (
              <div className="form-success-alert">
                <h4>פנייתך התקבלה בהצלחה!</h4>
                <p>נציג מצוות הפיתוח של EMS Action יצור עמך קשר בקרוב מאוד.</p>
              </div>
            ) : null}
            <form onSubmit={handleFormSubmit}>
              <div className="form-group">
                <label className="form-label" htmlFor="name">שם מלא</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  className="form-input" 
                  placeholder="ישראל ישראלי" 
                  value={formData.name}
                  onChange={handleFormChange}
                  required 
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="email">אימייל עבודה</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  className="form-input" 
                  placeholder="israel@ems.org" 
                  value={formData.email}
                  onChange={handleFormChange}
                  required 
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="agency">ארגון / שם רשות</label>
                <input 
                  type="text" 
                  id="agency" 
                  name="agency" 
                  className="form-input" 
                  placeholder="לדוגמה: מד'א, הצלה, עירייה" 
                  value={formData.agency}
                  onChange={handleFormChange}
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="message">פרטים נוספים</label>
                <textarea 
                  id="message" 
                  name="message" 
                  className="form-textarea" 
                  placeholder="נשמח לשמוע על היקף הפעילות וצי הרכבים שלכם..."
                  value={formData.message}
                  onChange={handleFormChange}
                ></textarea>
              </div>
              <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                שליחת בקשת הדגמה <ArrowLeft size={16} style={{ marginRight: '8px', verticalAlign: 'middle', display: 'inline-block' }} />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="container">
          <p>&copy; {new Date().getFullYear()} EMS Action. כל הזכויות שמורות לשילוב טכנולוגיה ומענה מציל חיים.</p>
        </div>
      </footer>
    </>
  );
}

export default App;
