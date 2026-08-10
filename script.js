const nav=document.getElementById('nav');
addEventListener('scroll',()=>nav.classList.toggle('scrolled',scrollY>20));
const menu=document.querySelector('.menu'), mobile=document.querySelector('.mobile-nav');
menu.addEventListener('click',()=>{const o=mobile.classList.toggle('open');menu.setAttribute('aria-expanded',o)});
mobile.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>mobile.classList.remove('open')));
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
document.getElementById('year').textContent=new Date().getFullYear();
document.querySelectorAll('details').forEach(d=>d.addEventListener('toggle',()=>{if(d.open)document.querySelectorAll('details').forEach(x=>{if(x!==d)x.open=false})}));
const leadForm = document.getElementById('leadForm');
const formStatus = document.getElementById('formStatus');

leadForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const submitButton = leadForm.querySelector('button[type="submit"]');
  const originalText = submitButton.innerHTML;

  submitButton.disabled = true;
  submitButton.textContent = 'A enviar...';
  formStatus.textContent = '';

  try {
    const response = await fetch(leadForm.action, {
      method: 'POST',
      body: new FormData(leadForm),
      headers: {
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      formStatus.textContent =
        'Pedido enviado com sucesso. Entraremos em contacto consigo brevemente.';
      
    gtag('event', 'generate_lead', {
        event_category: 'Formulário',
        event_label: 'Pedido de Orçamento'
    });

      leadForm.reset();
    } else {
      formStatus.textContent =
        'Não foi possível enviar o pedido. Tente novamente ou contacte-nos diretamente.';
    }
  } catch (error) {
    formStatus.textContent =
      'Não foi possível enviar o pedido. Verifique a sua ligação e tente novamente.';
  } finally {
    submitButton.disabled = false;
    submitButton.innerHTML = originalText;
  }
});

/* Localised form feedback */
(function(){
  const lang = document.documentElement.lang;
  const m = {
    'pt-PT': {
      sending:'A enviar...',
      success:'Pedido enviado com sucesso. Entraremos em contacto consigo brevemente.',
      error:'Não foi possível enviar o pedido. Tente novamente ou contacte-nos diretamente.',
      offline:'Não foi possível enviar o pedido. Verifique a sua ligação e tente novamente.'
    },
    'en': {
      sending:'Sending...',
      success:'Request sent successfully. We will contact you shortly.',
      error:'We could not send your request. Please try again or contact us directly.',
      offline:'We could not send your request. Please check your connection and try again.'
    },
    'es': {
      sending:'Enviando...',
      success:'Solicitud enviada correctamente. Nos pondremos en contacto contigo pronto.',
      error:'No hemos podido enviar tu solicitud. Inténtalo de nuevo o contacta con nosotros directamente.',
      offline:'No hemos podido enviar tu solicitud. Comprueba tu conexión e inténtalo de nuevo.'
    },
    'fr': {
      sending:'Envoi...',
      success:'Demande envoyée avec succès. Nous vous contacterons prochainement.',
      error:'Nous n’avons pas pu envoyer votre demande. Réessayez ou contactez-nous directement.',
      offline:'Nous n’avons pas pu envoyer votre demande. Vérifiez votre connexion et réessayez.'
    }
  }[lang];
  if(!m) return;
  const form=document.getElementById('leadForm');
  const status=document.getElementById('formStatus');
  if(!form || !status) return;
  form.addEventListener('submit',()=>{
    const button=form.querySelector('button[type="submit"]');
    if(button) setTimeout(()=>{button.textContent=m.sending;},0);
    const obs=new MutationObserver(()=>{
      const t=status.textContent;
      if(t.includes('Pedido enviado')) status.textContent=m.success;
      else if(t.includes('Não foi possível enviar o pedido. Tente')) status.textContent=m.error;
      else if(t.includes('Não foi possível enviar o pedido. Verifique')) status.textContent=m.offline;
    });
    obs.observe(status,{childList:true,subtree:true});
  },{capture:true});
})();
