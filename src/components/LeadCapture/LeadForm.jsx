import React, { useState } from 'react';
import { Send, Sparkles } from 'lucide-react';
import { supabase } from '../../../supabaseClient';

export default function LeadForm({ localId, localName }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    idea: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // 1. Guardar el lead en Supabase de forma silenciosa
      const { error } = await supabase
        .from('leads')
        .insert([
          { 
            local_id: localId,
            local_name: localName,
            name: formData.name,
            contact: formData.contact,
            business_idea: formData.idea,
            created_at: new Date().toISOString()
          }
        ]);
        
      if (error) {
        console.error("Error guardando el lead en base de datos:", error);
      }
    } catch (err) {
      console.error("Error de conexión con Supabase:", err);
    }
    
    // 2. Abrir WhatsApp independientemente de si falló o no la BD para no perder la venta
    setIsSubmitting(false);
    setSubmitted(true);
    
    const text = `Hola, me interesa el ${localName || 'local'}.%0A%0A*Nombre:* ${formData.name}%0A*Contacto:* ${formData.contact}%0A*Idea de negocio:* ${formData.idea || 'No especificada'}%0A%0A_Generado vía SalesMap - Ref: ${localId}_`;
    const waUrl = `https://wa.me/573117369009?text=${text}`;
    window.open(waUrl, '_blank');
  };

  if (submitted) {
    return (
      <div className="p-6 rounded-2xl text-center animate-fade-in shadow-sm" style={{ background: 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)', border: '1px solid #86efac', fontFamily: '"Montserrat", sans-serif' }}>
        <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
          <Sparkles className="text-success" size={28} />
        </div>
        <p className="text-success font-black text-xl mb-2">¡Solicitud enviada!</p>
        <p className="text-sm text-green-800 opacity-90 leading-relaxed font-medium">
          Se abrirá WhatsApp para que hables directamente con un asesor.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white p-2 mt-2" style={{ fontFamily: '"Montserrat", sans-serif', boxSizing: 'border-box', maxWidth: '100%', overflow: 'hidden' }}>
      <div className="flex flex-col text-left" style={{ marginBottom: '48px', boxSizing: 'border-box' }}>
        <p className="text-sm leading-relaxed font-medium" style={{ color: '#64748b', fontFamily: '"Montserrat", sans-serif' }}>
          Para solicitar información detallada o agendar una visita al local, llena este formulario y te contactaremos a la brevedad.
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="text-left" style={{ display: 'flex', flexDirection: 'column', gap: '32px', boxSizing: 'border-box', width: '100%' }}>
        <div className="flex flex-col gap-2" style={{ boxSizing: 'border-box', width: '100%' }}>
          <label className="text-xs font-bold" style={{ color: '#94a3b8', fontFamily: '"Montserrat", sans-serif' }}>Nombre completo</label>
          <input 
            required 
            type="text" 
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            style={{
              boxSizing: 'border-box',
              width: '100%',
              padding: '14px 20px',
              background: '#f1f5f9',
              border: '1px solid #e2e8f0',
              borderRadius: '9999px',
              outline: 'none',
              color: '#334155',
              fontWeight: '500',
              fontSize: '14px',
              fontFamily: '"Montserrat", sans-serif'
            }}
          />
        </div>
        
        <div className="flex flex-col gap-2" style={{ boxSizing: 'border-box', width: '100%' }}>
          <label className="text-xs font-bold" style={{ color: '#94a3b8', fontFamily: '"Montserrat", sans-serif' }}>Correo o Teléfono</label>
          <input 
            required 
            type="text" 
            value={formData.contact}
            onChange={(e) => setFormData({...formData, contact: e.target.value})}
            style={{
              boxSizing: 'border-box',
              width: '100%',
              padding: '14px 20px',
              background: '#f1f5f9',
              border: '1px solid #e2e8f0',
              borderRadius: '9999px',
              outline: 'none',
              color: '#334155',
              fontWeight: '500',
              fontSize: '14px',
              fontFamily: '"Montserrat", sans-serif'
            }}
          />
        </div>
        
        <div className="flex flex-col gap-2" style={{ boxSizing: 'border-box', width: '100%' }}>
          <label className="text-xs font-bold" style={{ color: '#94a3b8', fontFamily: '"Montserrat", sans-serif' }}>Idea de Negocio (Opcional)</label>
          <textarea 
            placeholder="Escribe tu idea de negocio..."
            rows={3}
            value={formData.idea}
            onChange={(e) => setFormData({...formData, idea: e.target.value})}
            style={{
              boxSizing: 'border-box',
              width: '100%',
              padding: '16px 20px',
              background: '#f1f5f9',
              border: '1px solid #e2e8f0',
              borderRadius: '24px',
              outline: 'none',
              color: '#334155',
              fontWeight: '500',
              fontSize: '14px',
              resize: 'none',
              fontFamily: '"Montserrat", sans-serif'
            }}
          ></textarea>
        </div>

        <button 
          type="submit" 
          disabled={isSubmitting}
          style={{ 
            boxSizing: 'border-box',
            background: '#818cf8', /* Soft indigo/purple to match reference image */
            boxShadow: '0 8px 24px rgba(129, 140, 248, 0.4)',
            border: 'none',
            borderRadius: '9999px',
            color: '#ffffff',
            fontWeight: 'bold',
            padding: '14px 32px',
            marginTop: '8px',
            width: 'max-content',
            cursor: 'pointer',
            fontFamily: '"Montserrat", sans-serif'
          }}
        >
          {isSubmitting ? 'Enviando...' : 'Solicitar Asesoría'}
        </button>
      </form>
    </div>
  );
}
