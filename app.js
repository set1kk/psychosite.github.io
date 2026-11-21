const specialists = [
  {name:'Анна Соколова', initials:'АС', role:'Психолог · КПТ', topics:['Тревога и стресс','Самооценка'], format:'Онлайн · Челябинск', price:3000, education:'Пример поля: вуз, специальность, год выпуска. Документы не предоставлены.'},
  {name:'Михаил Орлов', initials:'МО', role:'Психолог · Гештальт-подход', topics:['Отношения','Выгорание'], format:'Онлайн · Челябинск', price:4000, education:'Пример поля: основное образование и обучение гештальт-подходу. Документы не предоставлены.'},
  {name:'Елена Миронова', initials:'ЕМ', role:'Психолог · Интегративный подход', topics:['Самооценка','Отношения'], format:'Очно · Челябинск', price:3500, education:'Пример поля: профильное образование и дополнительная подготовка. Документы не предоставлены.'}
];
const cards=document.querySelector('#cards');
const filters=['topic','format','price'].map(id=>document.getElementById(id));
const money=value=>new Intl.NumberFormat('ru-RU').format(value);
function render(){
 const [topic,format,price]=filters.map(el=>el.value);
 const visible=specialists.map((s,id)=>({...s,id})).filter(s=>(topic==='all'||s.topics.includes(topic))&&(format==='all'||s.format===format)&&(price==='all'||s.price<=Number(price)));
 document.querySelector('#count').textContent=`Найдено анкет: ${visible.length} · Все анкеты демонстрационные`;
 cards.innerHTML=visible.length?visible.map(s=>`<article class="card"><div class="profile-top"><div class="avatar" aria-hidden="true">${s.initials}</div><div><h3>${s.name}</h3><small>${s.role}</small></div></div><div class="badge">◌ Демонстрационная анкета</div><p>${s.format} · Индивидуальные консультации</p><div class="tags">${s.topics.map(t=>`<span>${t}</span>`).join('')}</div><button class="profile-link" data-profile="${s.id}">Образование и сведения ↗</button><div class="card-bottom"><strong>${money(s.price)} ₽<small>за 50 минут · пример цены</small></strong><button data-book="${s.id}">Записаться →</button></div></article>`).join(''):'<p class="empty">Нет анкет с такими параметрами. Попробуйте изменить фильтры.</p>';
}
filters.forEach(el=>el.addEventListener('change',render));
document.querySelector('#reset').addEventListener('click',()=>{filters.forEach(el=>el.value='all');render();});
const dialog=document.querySelector('#dialog');
const content=document.querySelector('#dialog-content');
document.querySelector('.close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
dialog.addEventListener('close',()=>{content.replaceChildren();});
cards.addEventListener('click',e=>{
 const profile=e.target.closest('[data-profile]');const book=e.target.closest('[data-book]');if(!profile&&!book)return;
 const s=specialists[Number((profile||book).dataset[profile?'profile':'book'])];
 if(profile){content.innerHTML=`<div class="eyebrow">СВЕДЕНИЯ О СПЕЦИАЛИСТЕ</div><h2 id="dialog-title">${s.name}</h2><p>${s.role}</p><h3>Образование</h3><p>${s.education}</p><h3>Статус проверки</h3><p>Не проверено. Это вымышленный профиль для демонстрации интерфейса. Подтверждающих документов и реального специалиста за этой анкетой нет.</p><h3>Что проверять перед записью</h3><p>Профильное образование, дополнительную подготовку, границы компетенций, формат работы, стоимость и условия отмены консультации.</p>`;}
 else{
  const now=new Date();const today=`${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`;
  content.innerHTML=`<div class="eyebrow">ПРИМЕР ЗАПИСИ</div><h2 id="dialog-title">${s.name}</h2><p>${s.format} · Челябинск · 50 минут · ${money(s.price)} ₽</p><p>Это демонстрация. Доступность дат не проверяется, заявка не отправляется, встреча не бронируется.</p><form id="booking-form"><label>Желаемая дата<input name="date" type="date" min="${today}" required></label><label>Желаемое время (по Челябинску)<select name="time" required><option value="">Выберите время</option><option>10:00</option><option>14:00</option><option>18:00</option></select></label><label>Email<input name="email" type="email" autocomplete="off" required maxlength="150" placeholder="you@example.com"></label><button class="button" type="submit">Проверить выбор →</button><p class="form-status" role="status"></p></form>`;
  content.querySelector('form').addEventListener('submit',e=>{e.preventDefault();e.target.reset();e.target.querySelector('.form-status').textContent='Поля заполнены корректно. Это демо: запись не создана и данные не отправлены.';});
 }
 dialog.showModal();
});
document.querySelector('#contact-form').addEventListener('submit',e=>{e.preventDefault();e.target.reset();e.target.querySelector('.form-status').textContent='Форма прошла проверку. Обращение не отправлено: сервер пока не подключён. Введённые поля очищены.';});
render();
