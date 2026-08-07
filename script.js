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
