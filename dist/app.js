const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu(){navigation.classList.remove('is-open');menuButton.setAttribute('aria-expanded','false');menuButton.setAttribute('aria-label','Abrir menu');}
menuButton.addEventListener('click',()=>{const open=navigation.classList.toggle('is-open');menuButton.setAttribute('aria-expanded',String(open));menuButton.setAttribute('aria-label',open?'Fechar menu':'Abrir menu');});
navigation.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&navigation.classList.contains('is-open')){closeMenu();menuButton.focus();}});
const sectors = {
  servicos: {title:'Mais tempo para entregar o que você faz de melhor.',description:'Da atuação independente à empresa de serviços, organizamos os números para acompanhar cada fase da sua trajetória.',benefits:['Rotina contábil e fiscal integrada','Acompanhamento de receitas e despesas','Apoio à organização do seu negócio'],label:'Serviços e profissionais liberais'},
  comercio: {title:'Uma visão completa de uma operação em movimento.',description:'Da loja física às vendas digitais, conectamos a rotina contábil ao ritmo do seu comércio.',benefits:['Organização fiscal das operações de venda','Conciliação de recebimentos e canais','Informações para acompanhar seus resultados'],label:'Comércio e e-commerce'},
  industria: {title:'Estrutura para produzir, construir e avançar.',description:'Um acompanhamento contábil que considera a complexidade dos processos, dos custos e dos projetos da sua empresa.',benefits:['Acompanhamento de custos e resultados','Rotinas fiscais e departamento pessoal','Informações gerenciais para o planejamento'],label:'Indústria e construção'},
  saude: {title:'Cuidado com os números de quem cuida de pessoas.',description:'Apoio para profissionais da saúde, clínicas e negócios de bem-estar, com atenção à organização da operação.',benefits:['Gestão das rotinas contábeis e fiscais','Organização financeira do consultório ou clínica','Apoio ao departamento pessoal'],label:'Saúde e bem-estar'},
  tecnologia: {title:'Organização para acompanhar novas possibilidades.',description:'Da estruturação inicial à expansão da equipe, uma parceria contábil que acompanha a evolução do seu modelo de negócio.',benefits:['Abertura e organização societária','Indicadores e acompanhamento financeiro','Rotinas contábeis para cada fase da empresa'],label:'Tecnologia e startups'},
  outros: {title:'Cada atividade merece ser entendida de perto.',description:'Agronegócio, educação, logística e outros segmentos: começamos entendendo sua operação para definir o atendimento adequado.',benefits:['Diagnóstico das necessidades da atividade','Definição de um escopo personalizado','Integração das rotinas contábeis e financeiras'],label:'Agronegócio e outros segmentos'}
};
let activeSector = 'servicos';
const tabs = [...document.querySelectorAll('[data-sector]')];
function activateSector(button){
  activeSector=button.dataset.sector;
  const sector=sectors[activeSector];
  tabs.forEach(tab=>{const active=tab===button;tab.setAttribute('aria-selected',String(active));tab.tabIndex=active?0:-1;});
  document.querySelector('#sector-title').textContent=sector.title;
  document.querySelector('#sector-description').textContent=sector.description;
  const list=document.querySelector('#sector-benefits');list.replaceChildren();
  sector.benefits.forEach(text=>{const item=document.createElement('li');item.textContent=text;list.append(item);});
  document.querySelector('#sector-panel').setAttribute('aria-labelledby',button.id);
}
tabs.forEach((button,index)=>{
  button.addEventListener('click',()=>activateSector(button));
  button.addEventListener('keydown',event=>{
    let next;
    if(event.key==='ArrowDown'||event.key==='ArrowRight')next=(index+1)%tabs.length;
    if(event.key==='ArrowUp'||event.key==='ArrowLeft')next=(index-1+tabs.length)%tabs.length;
    if(event.key==='Home')next=0;
    if(event.key==='End')next=tabs.length-1;
    if(next!==undefined){event.preventDefault();activateSector(tabs[next]);tabs[next].focus();}
  });
});
const form=document.querySelector('#contact-form');
const result=document.querySelector('#form-result');
function goToContact(service){
  form.hidden=false;result.hidden=true;
  if(service)document.querySelector('#contact-service').value=service;
  document.querySelector('#contato').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
  form.elements.name.focus({preventScroll:true});
}
document.querySelectorAll('[data-service]').forEach(button=>button.addEventListener('click',()=>goToContact(button.dataset.service)));
document.querySelector('#sector-contact').addEventListener('click',()=>{
  const message=form.elements.message;
  if(!message.value.trim()||message.dataset.prefilled===message.value){message.value='Meu segmento: '+sectors[activeSector].label+'.';message.dataset.prefilled=message.value;}
  goToContact('Quero conhecer as opções');
});
const whatsappSettings=window.PADULA_CONTACT||window.VERTICE_CONTACT||{};
const rawNumber=whatsappSettings.whatsappNumber||'5521997999043';
const whatsappNumber=String(rawNumber).replace(/[\s()+-]/g,'')||'5521997999043';
const defaultWhatsAppMessage=String(whatsappSettings.whatsappMessage||'Olá! Vim pelo site da Padula Contabilidade e gostaria de saber mais sobre os serviços.');

form.addEventListener('submit',event=>{
  event.preventDefault();
  if(!form.reportValidity())return;
  const data=new FormData(form);
  const name=data.get('name').trim();
  const email=data.get('email').trim();
  const company=data.get('company').trim();
  const phone=data.get('phone').trim();
  const service=data.get('service');
  const userMsg=data.get('message').trim();

  const lines=[
    'Olá, equipe Padula Contabilidade! Vim pelo formulário do site e gostaria de atendimento sobre ' + service + '.',
    '',
    '📋 *Dados do Contato:*',
    '• *Nome:* ' + name,
    '• *E-mail:* ' + email
  ];
  if(company) lines.push('• *Empresa:* ' + company);
  if(phone) lines.push('• *Telefone/WhatsApp:* ' + phone);
  lines.push('• *Solução de interesse:* ' + service);
  if(userMsg) lines.push('', '📝 *Sobre meu momento:*', userMsg);

  const fullText=lines.join('\n');
  const whatsappUrl='https://wa.me/'+whatsappNumber+'?text='+encodeURIComponent(fullText);

  document.querySelector('#request-preview').value=fullText;
  const waResultBtn=document.querySelector('#open-whatsapp-result');
  if(waResultBtn) waResultBtn.href=whatsappUrl;

  form.hidden=true;
  result.hidden=false;
  document.querySelector('#copy-status').textContent='';

  // Abrir WhatsApp diretamente
  window.open(whatsappUrl, '_blank');
  if(waResultBtn) waResultBtn.focus({preventScroll:true});
});

document.querySelector('#edit-request').addEventListener('click',()=>{form.hidden=false;result.hidden=true;form.elements.name.focus({preventScroll:true});});
document.querySelector('#copy-request').addEventListener('click',async()=>{
  const preview=document.querySelector('#request-preview');
  try{await navigator.clipboard.writeText(preview.value);document.querySelector('#copy-status').textContent='Texto copiado com sucesso!';}
  catch{preview.focus();preview.select();document.querySelector('#copy-status').textContent='Selecione e copie o texto da solicitação.';}
});
const privacy=document.querySelector('#privacy-dialog');
document.querySelector('#privacy-button').addEventListener('click',()=>privacy.showModal());
privacy.querySelectorAll('button').forEach(button=>button.addEventListener('click',()=>privacy.close()));
privacy.addEventListener('click',event=>{if(event.target===privacy){const rect=privacy.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)privacy.close();}});
document.querySelector('#year').textContent=new Date().getFullYear();

const whatsappLink=document.querySelector('#whatsapp-link');
if(whatsappLink){
  whatsappLink.href='https://wa.me/'+whatsappNumber+'?text='+encodeURIComponent(defaultWhatsAppMessage);
  whatsappLink.target='_blank';
  whatsappLink.rel='noopener noreferrer';
  whatsappLink.setAttribute('aria-label','Fale com a Padula Contabilidade no WhatsApp (abre em nova aba)');
  whatsappLink.removeAttribute('aria-haspopup');
  whatsappLink.removeAttribute('aria-controls');
  whatsappLink.title='Fale com a Padula Contabilidade no WhatsApp';
  const caption=document.querySelector('#whatsapp-caption');
  if(caption)caption.textContent='Fale conosco';
}
