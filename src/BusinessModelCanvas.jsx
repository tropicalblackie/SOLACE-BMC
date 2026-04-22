import { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp, X } from "lucide-react";

function StarfieldCanvas() {
  const canvasRef = useRef(null);
  const starsRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;

    const resize = () => {
      canvas.width = canvas.offsetWidth * 2;
      canvas.height = canvas.offsetHeight * 2;
      ctx.scale(2, 2);
    };
    resize();

    if (starsRef.current.length === 0) {
      starsRef.current = Array.from({ length: 80 }, () => ({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        r: Math.random() * 1 + 0.3,
        speed: Math.random() * 0.05 + 0.01,
        opacity: Math.random() * 0.4 + 0.1,
      }));
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      starsRef.current.forEach(s => {
        s.y -= s.speed;
        if (s.y < -2) {
          s.y = canvas.offsetHeight + 2;
          s.x = Math.random() * canvas.offsetWidth;
        }
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(150,200,255,${s.opacity})`;
        ctx.fill();
      });
      animId = requestAnimationFrame(draw);
    };
    draw();

    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ pointerEvents: "none" }} />;
}

function DetailModal({ section, onClose }) {
  if (!section) return null;

  const colors = {
    partnerships: "#3b82f6",
    activities: "#a78bfa",
    resources: "#22d3ee",
    relationships: "#10b981",
    segments: "#06b6d4",
    channels: "#ec4899",
    costs: "#f97316",
    revenue: "#06b6d4",
    value: "#fbbf24",
  };

  const expandedInfo = {
    partnerships: [
      { head: "Garmin & Apple", desc: "Integrazioni hardware per biometria avanzata (HRV, ECG, PPG)" },
      { head: "ESA/NASA", desc: "Accesso a database astronauti e simulazioni in ambienti analoghi (PANGAEA, HI-SEAS)" },
      { head: "Centri Ricerca", desc: "Collaborazioni con neuroscienziati per validazione algoritmi" },
      { head: "Cloud Providers", desc: "AWS/Azure per training distribuito e storage sicuro HIPAA" },
      { head: "Compliance Partners", desc: "Auditor certificati per mantenersi allineati a GDPR/HIPAA" },
    ],
    activities: [
      { head: "IA Predittiva", desc: "Sviluppo algoritmi Transformer multimodali per early warning 48-72h" },
      { head: "Sensori", desc: "Integrazione real-time di 15+ parametri biometrici e psicometrici" },
      { head: "Testing Orbitale", desc: "Validazione software in ISS e simulazioni per Artemis" },
      { head: "Edge Computing", desc: "Inferenza senza cloud per privacy totale e zero latenza in orbita" },
      { head: "Certificazioni", desc: "Class IIa Medical Device per uso diagnostico" },
    ],
    resources: [
      { head: "Algoritmo Proprietario", desc: "Transformer che fonde biometria, psicometrici, pattern vocali" },
      { head: "Dataset Unico", desc: "50,000+ ore di dati da astronauti NASA/ESA (HIPAA-protected)" },
      { head: "Team Expert", desc: "12+ persone: data scientist PhD, cardiologi, neuroscienziati, ingegneri aerospace" },
      { head: "Infrastruttura", desc: "TPU per training; edge devices per satelliti; cloud redundante" },
      { head: "IP Portfolio", desc: "4 patent pending + software proprietario (copyright) + trademark" },
    ],
    value: [
      { head: "Prevenzione Proattiva", desc: "Identifica crolli psicologici 2-3 giorni prima: ROI per missioni miliardarie" },
      { head: "Zero Attrito", desc: "Compagno digitale passivo, mai invasivo, sempre attivo background" },
      { head: "Privacy Totale", desc: "Edge computing: zero dati verso terra, completo GDPR/HIPAA offline" },
      { head: "Zero Latenza", desc: "Decisioni real-time (<50ms) senza dipendenza comunicazioni con Terra" },
      { head: "Offline-First", desc: "Funziona in orbita indipendentemente da qualsiasi comunicazione" },
    ],
    relationships: [
      { head: "Co-creazione Medica", desc: "Lavoro stretto con flight surgeons e mission control per protocolli" },
      { head: "Enterprise SLA", desc: "Contratti long-term con garantie di uptime e supporto H24" },
      { head: "Training Continuo", desc: "Sessioni di onboarding e aggiornamento per ground teams" },
      { head: "Feedback Loop", desc: "Ottimizzazione algoritmo basata su feedback reale da missioni" },
      { head: "Community", desc: "Forum privato per medici aerospaziali per condivisione best practices" },
    ],
    segments: [
      { head: "ESA/NASA", desc: "Gateway, Artemis, ISS next-gen. Contratti €2-5M/anno" },
      { head: "SpaceX/Axiom", desc: "Starship, Axiom Station. Opportunità €500k-1M per missione" },
      { head: "Offshore", desc: "Piattaforme petrolifere deep-sea, operazioni remote drilling (€200k+/anno)" },
      { head: "Ricerca Estrema", desc: "Stazioni Antartide, sommergibili, Concordia. Niche ma strategico" },
      { head: "Spin-off Terrestre", desc: "Ospedali, cliniche, monitoraggio cronici (€1M+/anno potenziale)" },
    ],
    channels: [
      { head: "Vendita Diretta", desc: "B2G con ESA/NASA tramite appalti governativi e procurement" },
      { head: "Bandi Innovazione", desc: "ESA BIC, Horizon Europe H2020, Space4Good funding" },
      { head: "Acceleratori", desc: "OHB Incubator, Copernicus Masters, ESA Business Incubation" },
      { head: "Conferenze", desc: "Aerospace Medicine Congress, ASMA, Space Symposium" },
      { head: "Partnership", desc: "Co-selling con fornitori di sistemi spaziali (Airbus, Thales)" },
    ],
    costs: [
      { head: "R&D 45%", desc: "€450k/anno: 8 data scientist, 4 medici, 6 ingegneri + tools" },
      { head: "Cloud 25%", desc: "€250k/anno: GPU/TPU per training; edge devices; redundancy" },
      { head: "Certificazioni 15%", desc: "€150k/anno: FDA audits, GDPR compliance, quality assurance" },
      { head: "IP/Licensing 10%", desc: "€100k/anno: patent filing, software copyright, librerie" },
      { head: "Operazioni 5%", desc: "€50k/anno: office, travel, partner management, admin" },
    ],
    revenue: [
      { head: "Contratti R&D", desc: "€2.5M/anno: ESA, NASA SBIR, EU H2020 grants + partnerships" },
      { head: "Licenze Software", desc: "€500k/missione: software embarcato + update annuali (10% crescita)" },
      { head: "SaaS Ground", desc: "€50k/mese (€600k/anno): subscription per ground control teams" },
      { head: "Spin-off", desc: "€1M+/anno: piattaforme offshore, ospedali, cliniche terrestri" },
      { head: "Consulting", desc: "€150k/anno: protocolli medici, training specializzato, workshop" },
    ],
  };

  const color = colors[section.key] || "#22d3ee";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div
        className="border-2 rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-8 backdrop-blur-xl"
        style={{ borderColor: color + "60", background: `linear-gradient(135deg, ${color}10 0%, ${color}02 100%)` }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-extralight text-white" style={{ color }}>
            {section.title}
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <div className="space-y-4">
          {expandedInfo[section.key]?.map((item, i) => (
            <div key={i} className="border-l-2 pl-4 py-2" style={{ borderColor: color + "40" }}>
              <h3 className="font-semibold text-white mb-1">{item.head}</h3>
              <p className="text-sm text-slate-300 font-light">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-6 border-t border-white/[0.06]">
          <p className="text-xs text-slate-500 font-light">
            Clicca su altre sezioni per esplorare il modello di business completo di SOLACE.
          </p>
        </div>
      </div>
    </div>
  );
}

function BMCCell({ title, items, color, sectionKey, onDetailClick, hoveredSection }) {
  const [expanded, setExpanded] = useState(false);
  const isHovered = hoveredSection === sectionKey;

  return (
    <div
      className="relative border-2 rounded-xl p-5 backdrop-blur-sm cursor-pointer transition-all h-full group"
      style={{
        borderColor: color + "40",
        background: `linear-gradient(135deg, ${color}08 0%, ${color}02 100%)`,
        boxShadow: `0 0 10px ${color}10`,
      }}
      onClick={() => onDetailClick({ key: sectionKey, title, items })}
    >
      <h3 className="text-xs font-semibold uppercase tracking-wider text-white mb-3 flex items-center justify-between" style={{ color }}>
        {title}
        <span className="text-slate-500 group-hover:text-white transition-colors opacity-0 group-hover:opacity-100">
          {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </span>
      </h3>

      <div
        className={`space-y-2 transition-all overflow-hidden ${
          expanded ? "max-h-96 opacity-100" : "max-h-24 opacity-80"
        }`}
      >
        {items.map((item, i) => (
          <div key={i} className="text-xs text-slate-300 leading-tight">
            <span className="font-light">• {item}</span>
          </div>
        ))}
      </div>

      <button
        onClick={e => { e.stopPropagation(); setExpanded(!expanded); }}
        className="mt-2 text-xs text-slate-500 hover:text-white transition-colors font-light"
      >
        {expanded ? "Mostra meno" : "Mostra più"}
      </button>
    </div>
  );
}

export default function BusinessModelCanvas() {
  const [selectedDetail, setSelectedDetail] = useState(null);
  const [hoveredSection, setHoveredSection] = useState(null);

  const BMC = {
    partnerships: {
      title: "Partnership Chiave",
      color: "#3b82f6",
      key: "partnerships",
      items: [
        "Fornitori hw: Garmin, Apple, ESA/NASA",
        "Centri ricerca e neuroscienza",
        "Agenzie spaziali ESA, NASA, JAXA",
        "Cloud providers AWS/Azure",
        "Compliance partners GDPR/HIPAA",
      ],
    },
    activities: {
      title: "Attività Chiave",
      color: "#a78bfa",
      key: "activities",
      items: [
        "Sviluppo IA predittiva multimodale",
        "Integrazione sensori biometrici",
        "Testing in ambienti analoghi e orbita",
        "Edge computing real-time",
        "Certificazioni mediche Class IIa",
      ],
    },
    resources: {
      title: "Risorse Chiave",
      color: "#22d3ee",
      key: "resources",
      items: [
        "Algoritmo Transformer proprietario",
        "Dataset 50k+ ore astronauti NASA/ESA",
        "Team: 12+ data scientist, medici, ingegneri",
        "Infrastruttura TPU cloud + edge",
        "4 patent pending + IP portfolio",
      ],
    },
    relationships: {
      title: "Relazioni Clienti",
      color: "#10b981",
      key: "relationships",
      items: [
        "Co-creazione con flight surgeons",
        "Contratti Enterprise long-term SLA",
        "Supporto H24 dati sanitari critici",
        "Feedback loop da missioni reali",
        "Training continuo per ground teams",
      ],
    },
    segments: {
      title: "Segmenti Clientela",
      color: "#06b6d4",
      key: "segments",
      items: [
        "Agenzie spaziali: ESA, NASA, JAXA",
        "Operatori privati: SpaceX, Axiom, Blue Origin",
        "Piattaforme offshore deep-sea",
        "Basi ricerca estrema: Antartide, sommergibili",
        "Ospedali e strutture terrestri",
      ],
    },
    channels: {
      title: "Canali",
      color: "#ec4899",
      key: "channels",
      items: [
        "Vendita diretta B2G ESA/NASA",
        "Bandi innovazione: ESA BIC, H2020",
        "Acceleratori Space Economy",
        "Conferenze medicina aerospaziale",
        "Partnership co-selling con grandi contractor",
      ],
    },
    costs: {
      title: "Struttura Costi",
      color: "#f97316",
      key: "costs",
      items: [
        "R&D 45%: team specializzato",
        "Cloud infrastructure 25%: GPU/TPU",
        "Certificazioni mediche 15%: FDA/GDPR",
        "Licensing & IP 10%: patent, copyright",
        "Operazioni 5%: office, travel, partner",
      ],
    },
    revenue: {
      title: "Flussi Ricavi",
      color: "#06b6d4",
      key: "revenue",
      items: [
        "Contratti R&D: €2.5M/anno (ESA, NASA, EU)",
        "Licenze software: €500k per missione",
        "SaaS subscription: €50k/mese ground",
        "Spin-off terrestre: €1M+/anno",
        "Consulting & training: €150k/anno",
      ],
    },
    value: {
      title: "Proposta di Valore",
      color: "#fbbf24",
      key: "value",
      items: [
        "Prevenzione proattiva crolli psicologici 48-72h",
        "Compagno digitale non invasivo zero attrito",
        "Privacy totale edge computing offline",
        "Zero latenza decisioni real-time",
        "Protezione investimenti miliardari + equipaggio",
      ],
    },
  };

  return (
    <div className="w-full min-h-screen bg-black relative" style={{ fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif" }}>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        body { margin: 0; padding: 0; }
        .bmc-grid { display: grid; grid-template-columns: 1fr 1.5fr 1fr; gap: 12px; }
        @media (max-width: 1400px) { .bmc-grid { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 768px) { .bmc-grid { grid-template-columns: 1fr; } }
      `}</style>

      <StarfieldCanvas />

      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cyan-500/[0.02] rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 border-b border-white/[0.06] backdrop-blur-xl bg-black/60">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <h1 className="text-3xl font-extralight text-white tracking-tight mb-1">SOLACE</h1>
          <p className="text-sm text-slate-400 font-light">Business Model Canvas</p>
          <p className="text-xs text-slate-500 font-light mt-3">
            💡 Clicca su una sezione per esplorare i dettagli
          </p>
        </div>
      </header>

      {/* Canvas */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-8 pb-16">
        {/* Top row */}
        <div className="bmc-grid mb-4">
          <BMCCell
            title={BMC.partnerships.title}
            items={BMC.partnerships.items}
            color={BMC.partnerships.color}
            sectionKey={BMC.partnerships.key}
            onDetailClick={setSelectedDetail}
            hoveredSection={hoveredSection}
          />
          <BMCCell
            title={BMC.activities.title}
            items={BMC.activities.items}
            color={BMC.activities.color}
            sectionKey={BMC.activities.key}
            onDetailClick={setSelectedDetail}
            hoveredSection={hoveredSection}
          />
          <BMCCell
            title={BMC.resources.title}
            items={BMC.resources.items}
            color={BMC.resources.color}
            sectionKey={BMC.resources.key}
            onDetailClick={setSelectedDetail}
            hoveredSection={hoveredSection}
          />
        </div>

        {/* Middle row */}
        <div className="grid grid-cols-5 gap-3 mb-4" style={{ minHeight: "300px" }}>
          <div className="col-span-1">
            <BMCCell
              title={BMC.relationships.title}
              items={BMC.relationships.items}
              color={BMC.relationships.color}
              sectionKey={BMC.relationships.key}
              onDetailClick={setSelectedDetail}
              hoveredSection={hoveredSection}
            />
          </div>

          {/* Value Proposition - Centro grande */}
          <div
            className="col-span-3 rounded-xl p-6 border-3 backdrop-blur-sm relative flex flex-col justify-center items-center text-center cursor-pointer transition-all group"
            style={{
              borderColor: BMC.value.color + "40",
              background: `linear-gradient(135deg, ${BMC.value.color}10 0%, ${BMC.value.color}02 100%)`,
              boxShadow: `0 0 20px ${BMC.value.color}15`,
            }}
            onClick={() => setSelectedDetail(BMC.value)}
          >
            <h2 className="text-lg font-semibold uppercase tracking-wider text-white mb-5" style={{ color: BMC.value.color }}>
              {BMC.value.title}
            </h2>
            <div className="space-y-3 max-w-md">
              {BMC.value.items.map((item, i) => (
                <p key={i} className="text-sm font-light text-slate-200 leading-relaxed">
                  • {item}
                </p>
              ))}
            </div>
            <div className="absolute bottom-2 right-2 text-slate-500 group-hover:text-white opacity-0 group-hover:opacity-100 transition-all">
              <ChevronDown size={16} />
            </div>
          </div>

          <div className="col-span-1">
            <BMCCell
              title={BMC.segments.title}
              items={BMC.segments.items}
              color={BMC.segments.color}
              sectionKey={BMC.segments.key}
              onDetailClick={setSelectedDetail}
              hoveredSection={hoveredSection}
            />
          </div>
        </div>

        {/* Bottom row */}
        <div className="bmc-grid">
          <BMCCell
            title={BMC.channels.title}
            items={BMC.channels.items}
            color={BMC.channels.color}
            sectionKey={BMC.channels.key}
            onDetailClick={setSelectedDetail}
            hoveredSection={hoveredSection}
          />
          <BMCCell
            title={BMC.costs.title}
            items={BMC.costs.items}
            color={BMC.costs.color}
            sectionKey={BMC.costs.key}
            onDetailClick={setSelectedDetail}
            hoveredSection={hoveredSection}
          />
          <BMCCell
            title={BMC.revenue.title}
            items={BMC.revenue.items}
            color={BMC.revenue.color}
            sectionKey={BMC.revenue.key}
            onDetailClick={setSelectedDetail}
            hoveredSection={hoveredSection}
          />
        </div>

        {/* Impact */}
        <div className="mt-8 border-2 border-cyan-400/[0.3] rounded-xl p-6 bg-cyan-400/[0.02] backdrop-blur-sm cursor-pointer transition-all hover:border-cyan-400/[0.5] hover:bg-cyan-400/[0.04]">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-cyan-300 mb-3">🚀 Impatto Sociale</h3>
          <p className="text-sm text-slate-300 font-light leading-relaxed">
            Le tecnologie sviluppate per ambienti estremi spaziali convertiranno la diagnostica preventiva di ansia,
            depressione e burnout in uno strumento accessibile per la popolazione generale terrestre. SOLACE rende la
            salute mentale preventiva democratica a livello globale — ogni astronauta monitoriamo oggi insegna a miliardi
            come stare bene domani.
          </p>
        </div>
      </main>

      {/* Detail Modal */}
      {selectedDetail && <DetailModal section={selectedDetail} onClose={() => setSelectedDetail(null)} />}
    </div>
  );
}
