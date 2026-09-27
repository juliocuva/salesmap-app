import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Target, ArrowUpRight, LayoutTemplate, Activity, Globe } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#FAFDFF] font-sans selection:bg-[#ECCE76] selection:text-[#184943]">
      
      {/* Sticky Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-[#0d2a26]/95 backdrop-blur-md border-b border-white/10">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between px-6 md:px-12 py-4">
          <div className="flex items-center">
            <img src="/logo-bemap.svg" alt="Bemap.pro Logo" className="h-12 w-auto" />
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#problema" className="text-sm font-medium hover:text-[#ECCE76] transition-colors text-white">Problema</a>
            <a href="#solucion" className="text-sm font-medium hover:text-[#ECCE76] transition-colors text-white">Plataforma</a>
            <a href="#caso-exito" className="text-sm font-medium hover:text-[#ECCE76] transition-colors text-white">Caso de Éxito</a>
            <a href="#inversion" className="text-sm font-medium hover:text-[#ECCE76] transition-colors text-white">Inversión</a>
          </div>
        </div>
      </nav>

      {/* Header / Hero Section */}
      <div className="relative bg-[#0d2a26] text-[#FAFDFF] overflow-hidden min-h-[85vh] flex flex-col pt-24">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img src="/hero-app.png" alt="Hero" className="w-full h-full object-cover opacity-60 mix-blend-overlay" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d2a26]/95 via-[#0d2a26]/80 to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex-grow flex flex-col justify-center px-6 md:px-12 py-12">
          <div className="max-w-[1400px] mx-auto w-full">
            <div className="max-w-3xl">
              <a href="#problema" className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-[#ECCE76] mb-8 hover:bg-white/10 transition-colors">
                <span className="w-2 h-2 rounded-full bg-[#ECCE76] animate-pulse" />
                Simulador interactivo para ventas inmobiliarias
              </a>
              
              <h1 className="text-[2.2rem] md:text-[3.5rem] leading-[1.1] tracking-tight font-medium mb-6">
                Deje de mostrar planos estáticos.
                <br />
                <span className="text-[#ECCE76]">
                  Empiece a proyectar negocios.
                </span>
              </h1>
              
              <p className="text-sm md:text-base text-white/80 max-w-xl mb-8 font-light leading-relaxed">
                Convierta su sala de ventas en una experiencia interactiva de cierre. Bemap.pro transforma los planos arquitectónicos de su proyecto en un asesor comercial digital activo las 24 horas del día.
              </p>
              
              <div className="flex flex-row items-center gap-4">
                <a href="https://wa.me/573013970002?text=Hola,%20quiero%20agendar%20una%20demostración%20de%20Bemap.pro" target="_blank" rel="noopener noreferrer" className="inline-flex bg-[#ECCE76] text-[#184943] px-4 py-2 rounded-lg text-sm font-semibold hover:bg-white transition-all items-center gap-2 shadow-md">
                  Agendar Demostración <ArrowRight className="w-4 h-4" />
                </a>
                <Link to="/map" className="inline-flex bg-white/10 border border-white/20 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-white/20 transition-all items-center gap-2 backdrop-blur-md">
                  Explorar Plataforma
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Problema */}
      <section id="problema" className="py-24 px-6 md:px-12 bg-[#FAFDFF] relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="grid lg:grid-cols-3 gap-8 items-stretch">
            <div className="lg:col-span-1 flex flex-col justify-center pr-6">
              <span className="uppercase text-xs font-medium tracking-widest text-[#ECCE76] mb-3 block">Análisis de Mercado</span>
              <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-6 leading-tight text-[#184943]">
                Las dos barreras del modelo tradicional
              </h2>
              <p className="text-[#184943]/70 leading-relaxed text-sm mb-0">
                En la comercialización sobre planos, el inversionista promedio se enfrenta a obstáculos técnicos que alargan el ciclo de venta hasta el estancamiento.
              </p>
            </div>
            
            <div className="lg:col-span-1 bg-white border border-[#184943]/10 p-8 rounded-2xl hover:border-[#ECCE76]/50 transition-all flex flex-col h-full shadow-sm relative overflow-hidden group">
              <div className="w-12 h-12 bg-[#184943] rounded-xl flex items-center justify-center mb-6 text-[#ECCE76] font-medium text-lg shadow-md relative z-10">01</div>
              <h3 className="text-xl md:text-2xl font-medium mb-5 text-[#184943] relative z-10">El PDF Incomprensible</h3>
              <p className="text-[#184943]/70 leading-relaxed text-sm flex-grow relative z-10">
                Las líneas técnicas y los números fríos no transmiten el potencial real de un espacio. El cliente es incapaz de visualizar el tamaño, el flujo comercial o el emplazamiento.
              </p>
            </div>
            
            <div className="lg:col-span-1 bg-white border border-[#184943]/10 p-8 rounded-2xl hover:border-[#ECCE76]/50 transition-all flex flex-col h-full shadow-sm relative overflow-hidden group">
              <div className="w-12 h-12 bg-[#184943] rounded-xl flex items-center justify-center mb-6 text-[#ECCE76] font-medium text-lg shadow-md relative z-10">02</div>
              <h3 className="text-xl md:text-2xl font-medium mb-5 text-[#184943] relative z-10">La Indecisión</h3>
              <p className="text-[#184943]/70 leading-relaxed text-sm flex-grow relative z-10">
                Muchos compradores tienen el capital listo, pero dudan profundamente porque no saben qué negocio montar allí ni conocen la competencia real del entorno.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Box Features */}
      <section id="solucion" className="py-24 px-6 md:px-12 bg-[#FBF8F1] text-[#184943]">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="uppercase text-xs font-medium tracking-widest text-[#ECCE76] mb-3 block">Nuestra Plataforma</span>
          <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-6">
            El motor de inteligencia de su equipo de ventas
          </h2>
          <p className="text-[#184943]/70 text-sm">
            No es solo un mapa interactivo; es un simulador de viabilidad comercial e inventario en tiempo real.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-5 max-w-[1400px] mx-auto items-stretch">
          {/* Feature 1 */}
          <div className="bg-[#184943] text-white border border-[#184943]/20 p-6 xl:p-8 rounded-2xl relative overflow-hidden group hover:border-[#ECCE76]/50 transition-colors shadow-lg flex flex-col">
            <div className="mb-5">
              <Target className="w-8 h-8 text-[#ECCE76] mb-4" strokeWidth={1.5} />
              <h3 className="text-xl font-medium m-0 leading-tight">Afinidad IA:<br />Proyecta el negocio</h3>
            </div>
            <p className="text-white/70 mb-6 text-sm leading-relaxed flex-grow">
              El sistema sugiere giros de negocio ideales según el metraje, muestra renders fotorrealistas y entrega indicadores de viabilidad.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-[#184943] text-white border border-[#184943]/20 p-6 xl:p-8 rounded-2xl relative overflow-hidden group hover:border-[#ECCE76]/50 transition-colors shadow-lg flex flex-col">
            <div className="mb-5">
              <Activity className="w-8 h-8 text-[#ECCE76] mb-4" strokeWidth={1.5} />
              <h3 className="text-xl font-medium m-0 leading-tight">Radar de<br />entorno</h3>
            </div>
            <p className="text-white/70 text-sm leading-relaxed flex-grow">
              Bemap analiza la zona de influencia y muestra distancias a marcas clave y nodos estratégicos en tiempo real.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-[#184943] text-white border border-[#184943]/20 p-6 xl:p-8 rounded-2xl relative overflow-hidden group hover:border-[#ECCE76]/50 transition-colors shadow-lg flex flex-col">
            <div className="mb-5">
              <LayoutTemplate className="w-8 h-8 text-[#ECCE76] mb-4" strokeWidth={1.5} />
              <h3 className="text-xl font-medium m-0 leading-tight">Cero<br />fricción</h3>
            </div>
            <p className="text-white/70 text-sm leading-relaxed flex-grow">
              Sus asesores actualizan el estado de los locales desde una simple hoja de cálculo. Se refleja al instante.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="bg-[#184943] text-white border border-[#184943]/20 p-6 xl:p-8 rounded-2xl relative overflow-hidden group hover:border-[#ECCE76]/50 transition-colors shadow-lg flex flex-col">
            <div className="mb-5">
              <Globe className="w-8 h-8 text-[#ECCE76] mb-4" strokeWidth={1.5} />
              <h3 className="text-xl font-medium m-0 leading-tight">Integración<br />Universal</h3>
            </div>
            <p className="text-white/70 text-sm leading-relaxed flex-grow">
              ¿Ya tiene web? Le entregamos un código Iframe para incrustarlo en 5 minutos. ¿No tiene web? Su proyecto opera con un enlace directo y seguro listo para WhatsApp.
            </p>
          </div>
        </div>

        <div className="mt-16 flex justify-center">
          <div className="px-8 py-4 rounded-xl bg-[#184943] border border-[#ECCE76]/40 inline-block shadow-lg">
            <span className="text-base font-medium text-[#ECCE76] tracking-wide">El cliente compra una oportunidad de negocio clara.</span>
          </div>
        </div>
      </section>

      {/* Caso de Exito */}
      <section id="caso-exito" className="py-24 px-6 md:px-12 bg-[#65A5EC]/15 text-[#184943]">
        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white text-[#3F6089] text-xs font-medium uppercase tracking-widest mb-6 shadow-sm">
              Caso de Éxito en Vivo
            </div>
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-6">
              Bahía Guacamayas
            </h2>
            <p className="text-sm md:text-base text-[#184943]/80 mb-8 leading-relaxed font-light">
              Plataforma implementada y operativa con navegación multinivel (primer piso y 3 niveles de sótanos técnicos), filtrado por fechas de entrega, radar de marcas y simulador comercial interactivo.
            </p>
            <Link to="/map" className="inline-flex items-center gap-2 bg-[#184943] text-[#FAFDFF] px-4 py-2 rounded-lg font-medium hover:bg-[#ECCE76] hover:text-[#184943] transition-colors shadow-md">
              Ver Demostración <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="lg:col-span-8 w-full flex items-center justify-center">
            <div className="rounded-2xl overflow-hidden shadow-2xl w-full border-4 border-white/40 relative">
              <img 
                src="/bemap.png" 
                alt="Bahía Guacamayas Mapa" 
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Inversión */}
      <section id="inversion" className="py-24 px-6 md:px-12 bg-[#FAFDFF] text-[#184943]">
        <div className="text-center mb-16 flex flex-col items-center">
          <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-6">Modelo "Llave en Mano"</h2>
          <p className="text-sm md:text-base text-[#184943]/70 max-w-2xl text-center leading-relaxed font-light mb-8">
            Usted solo entrega los planos, nosotros hacemos el resto. No le entregamos una licencia vacía;<br className="hidden md:block" />
            le entregamos la plataforma <span className="font-medium text-[#184943]">completamente lista y funcionando</span>.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-[900px] mx-auto items-stretch">
          {/* Card 1 */}
          <div className="bg-white border border-[#184943]/10 p-8 md:p-10 rounded-2xl hover:border-[#ECCE76]/50 transition-colors shadow-sm flex flex-col md:-translate-y-2">
            <h3 className="text-xl md:text-2xl font-medium mb-1 text-[#184943]">Implementación Integral</h3>
            <p className="text-[#ECCE76] text-[10px] font-medium uppercase tracking-widest mb-6">Setup Único</p>
            <p className="text-[#184943]/70 text-sm leading-relaxed mb-8 flex-grow">
              Digitalización de planos, modelado 3D de entornos, configuración de motor de viabilidad comercial y despliegue del simulador interactivo.
            </p>
            <div className="border-t border-[#184943]/10 pt-6 mt-auto">
              <span className="text-3xl font-medium text-[#184943]">$2,500</span>
              <span className="text-[#184943]/50 text-sm ml-2">USD</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-[#184943] text-[#FAFDFF] border border-[#184943] p-8 md:p-10 rounded-2xl shadow-xl flex flex-col relative md:-translate-y-2">
            <div className="flex justify-between items-start mb-1">
              <h3 className="text-xl md:text-2xl font-medium text-white">Soporte y Nube</h3>
              <span className="bg-[#ECCE76] text-[#184943] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Recomendado
              </span>
            </div>
            <p className="text-[#ECCE76] text-[10px] font-medium uppercase tracking-widest mb-6">Mantenimiento Mensual</p>
            <p className="text-white/70 text-sm leading-relaxed mb-8 flex-grow">
              Hosting de alta velocidad, actualizaciones de plataforma, soporte técnico prioritario 24/7 y respaldos diarios de seguridad.
            </p>
            <div className="border-t border-white/20 pt-6 mt-auto">
              <span className="text-3xl font-medium text-white">$199</span>
              <span className="text-white/50 text-sm ml-2">USD / mes</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 px-6 md:px-12 bg-[#0d2a26] text-[#FAFDFF] text-center border-t border-white/5">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-6 leading-tight">
            El metro cuadrado más costoso es el que permanece desocupado.
          </h2>
          <p className="text-sm md:text-base text-white/70 mb-8 font-light leading-relaxed">
            Permítanos agendar una sesión interactiva de 15 minutos para mostrarle en vivo cómo funciona la plataforma y cómo aplicarla a su proyecto esta misma semana.
          </p>
          <a href="https://wa.me/573013970002?text=Hola,%20quiero%20agendar%20una%20demostración%20de%20Bemap.pro" target="_blank" rel="noopener noreferrer" className="bg-[#ECCE76] text-[#184943] px-8 py-4 rounded-xl font-medium hover:bg-white transition-colors inline-flex items-center gap-2 shadow-lg w-fit mx-auto">
            Agendar Demo de 15 Minutos <ArrowRight className="w-5 h-5" />
          </a>
          <p className="mt-8 text-xs text-white/40 font-light">
            Sin compromisos. Solo un recorrido técnico y funcional.
          </p>
        </div>
      </section>
    </div>
  );
}
