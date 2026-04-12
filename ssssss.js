// ========== ПРОДУКТЫ (оптимизированный набор, ~40 позиций) ==========
const proteinGroup = ["курица", "говядина", "свинина", "рыба белая", "лосось", "креветки", "тунец", "бекон", "ветчина", "колбаса", "фарш"];
const dairyGroup = ["яйца", "молоко", "сыр", "сливки", "масло сливочное", "йогурт", "творог", "сметана", "майонез"];
const veggiesGroup = ["картофель", "помидоры", "огурцы", "лук", "чеснок", "морковь", "капуста", "брокколи", "перец болгарский", "грибы", "кабачок", "баклажан", "зелень", "авокадо", "салат"];
const pantryGroup = ["рис", "паста", "хлеб", "лаваш", "гречка", "овсянка", "консервы рыбные", "кукуруза", "горошек", "оливки", "сухарики", "бульон"];
const saucesGroup = ["соль", "перец", "масло растительное", "соус соевый", "томатный соус", "кетчуп", "горчица", "мед", "лимон", "паприка", "корица", "ванилин"];

function buildCheckboxes() {
    const groups = { "group-protein": proteinGroup, "group-dairy": dairyGroup, "group-veggies": veggiesGroup, "group-pantry": pantryGroup, "group-sauces": saucesGroup };
    for (const [groupId, items] of Object.entries(groups)) {
        const div = document.getElementById(groupId);
        if (div) items.forEach(ing => {
            const label = document.createElement("label");
            const cb = document.createElement("input");
            cb.type = "checkbox"; cb.value = ing; cb.name = "ingredient";
            label.appendChild(cb); label.appendChild(document.createTextNode(" " + ing));
            div.appendChild(label);
        });
    }
}

// ========== ГЕНЕРАЦИЯ 80 ОБЫЧНЫХ + 20 ПРЕМИУМ РЕЦЕПТОВ ==========
const methodNames = { 
    pan: "🍳 Сковорода", microwave: "📡 Микроволновка", airfryer: "💨 Аэрогриль", 
    oven: "🔥 Духовка", cold: "❄️ Без подогрева", boil: "🍲 Варить в кастрюле"
};

const recipeTemplates = [
    { name: "Яичница", ing: ["яйца", "масло сливочное", "соль", "перец"], steps: "Разогрей сковороду. Разбей яйца. Жарь 2-3 минуты.", method: "pan", time: "5 мин" },
    { name: "Омлет", ing: ["яйца", "молоко", "соль"], steps: "Взбей яйца с молоком. Жарь под крышкой 5 минут.", method: "pan", time: "7 мин" },
    { name: "Гречка рассыпчатая", ing: ["гречка", "вода", "соль", "масло сливочное"], steps: "Залей гречку водой 1:2. Доведи до кипения. Вари 10 минут.", method: "boil", time: "12 мин" },
    { name: "Макароны с сыром", ing: ["паста", "вода", "соль", "сыр"], steps: "Вскипяти воду, посоли. Отвари пасту 7 минут. Слей воду, посыпь сыром.", method: "boil", time: "10 мин" },
    { name: "Рис отварной", ing: ["рис", "вода", "соль", "масло сливочное"], steps: "Промой рис. Залей водой 1:2. Вари 12 минут.", method: "boil", time: "14 мин" },
    { name: "Картофель отварной", ing: ["картофель", "вода", "соль", "масло сливочное"], steps: "Очисти картофель. Вари в подсоленной воде 15 минут.", method: "boil", time: "15 мин" },
    { name: "Суп куриный", ing: ["курица", "картофель", "морковь", "лук", "соль", "вода"], steps: "Вари курицу 10 мин. Добавь овощи. Вари еще 5 мин.", method: "boil", time: "15 мин" },
    { name: "Картофельное пюре", ing: ["картофель", "молоко", "масло сливочное", "соль"], steps: "Отвари картофель. Разомни с молоком и маслом.", method: "boil", time: "15 мин" },
    { name: "Пельмени вареные", ing: ["пельмени", "вода", "соль", "сметана"], steps: "Вскипяти воду, посоли. Вари пельмени 5-7 минут.", method: "boil", time: "10 мин" },
    { name: "Бутерброд с сыром", ing: ["хлеб", "сыр", "масло сливочное"], steps: "Намажь масло, положи сыр.", method: "cold", time: "3 мин" },
    { name: "Салат овощной", ing: ["помидоры", "огурцы", "зелень", "соль", "масло растительное"], steps: "Нарежь овощи. Заправь маслом.", method: "cold", time: "7 мин" },
    { name: "Греческий салат", ing: ["помидоры", "огурцы", "сыр", "оливки", "масло растительное"], steps: "Нарежь всё кубиками. Заправь маслом.", method: "cold", time: "10 мин" },
    { name: "Салат с тунцом", ing: ["тунец консервированный", "кукуруза", "яйца", "майонез"], steps: "Смешай тунец, кукурузу и яйца. Заправь майонезом.", method: "cold", time: "8 мин" },
    { name: "Рис с овощами", ing: ["рис", "морковь", "лук", "масло растительное", "вода"], steps: "Обжарь лук с морковью. Добавь рис и воду. Вари 12 минут.", method: "boil", time: "14 мин" },
    { name: "Гречка с грибами", ing: ["гречка", "грибы", "лук", "масло растительное", "вода"], steps: "Обжарь грибы с луком. Добавь гречку и воду. Вари 12 минут.", method: "boil", time: "15 мин" },
    { name: "Овсяная каша", ing: ["овсянка", "молоко", "сахар", "соль"], steps: "Залей овсянку молоком. Вари 5 минут.", method: "boil", time: "7 мин" },
    { name: "Какао на молоке", ing: ["молоко", "какао-порошок", "сахар"], steps: "Смешай какао с сахаром. Влей горячее молоко.", method: "boil", time: "5 мин" },
    { name: "Компот из сухофруктов", ing: ["сухофрукты", "вода", "сахар"], steps: "Залей сухофрукты водой. Вари 10 минут.", method: "boil", time: "12 мин" },
    { name: "Вареники с творогом", ing: ["вареники", "вода", "соль", "сметана"], steps: "Вскипяти воду. Вари вареники 5 минут.", method: "boil", time: "8 мин" },
    { name: "Курица жареная", ing: ["курица", "соль", "перец", "масло растительное"], steps: "Обжарь кусочки курицы по 5 минут с каждой стороны.", method: "pan", time: "12 мин" }
];

const RECIPES = [];
let id = 1;

for (let i = 0; i < 80; i++) {
    const template = recipeTemplates[i % recipeTemplates.length];
    const variant = Math.floor(i / recipeTemplates.length) + 1;
    let name = template.name;
    if (variant > 1) name = `${template.name} ${variant}`;
    const ingredients = [...template.ing];
    if (Math.random() > 0.7 && template.method !== "cold") ingredients.push("чеснок");
    RECIPES.push({
        id: id++, name: `🍳 ${name}`, time: template.time, method: template.method,
        ingredients: ingredients, steps: template.steps,
        premium: false, detailedSteps: [template.steps, "Подавайте горячим!", "Приятного аппетита!"]
    });
}

const premiumTemplates = [
    { name: "Стейк рибай", ing: ["говядина", "розмарин", "чеснок", "масло сливочное"], steps: "Обжарь стейк по 2 минуты с каждой стороны.", method: "pan", time: "10 мин" },
    { name: "Лосось в сливочном соусе", ing: ["лосось", "сливки", "чеснок", "зелень", "лимон"], steps: "Обжарь лосось 2 минуты. Влей сливки, туши 5 минут.", method: "pan", time: "10 мин" },
    { name: "Том Ям суп", ing: ["креветки", "грибы", "бульон", "кокосовое молоко", "имбирь", "лимон"], steps: "Вскипяти бульон. Добавь креветки, грибы. Влей кокосовое молоко.", method: "boil", time: "12 мин" },
    { name: "Борщ красный", ing: ["свекла", "капуста", "картофель", "морковь", "лук", "томатный соус", "бульон"], steps: "Вари овощи 15 минут. Добавь томатный соус.", method: "boil", time: "15 мин" },
    { name: "Солянка сборная", ing: ["колбаса", "ветчина", "огурцы соленые", "оливки", "лимон", "бульон"], steps: "Вскипяти бульон. Добавь мясо, огурцы. Вари 10 минут.", method: "boil", time: "12 мин" },
    { name: "Ризотто с грибами", ing: ["рис", "грибы", "лук", "бульон", "сыр"], steps: "Обжарь лук и грибы. Добавь рис. Постепенно вливай бульон.", method: "boil", time: "14 мин" },
    { name: "Куриный суп с лапшой", ing: ["курица", "лапша", "морковь", "лук", "зелень"], steps: "Вари курицу 10 минут. Добавь лапшу и овощи.", method: "boil", time: "15 мин" },
    { name: "Уха из лосося", ing: ["лосось", "картофель", "морковь", "лук", "зелень"], steps: "Вари рыбу 7 минут. Добавь овощи. Вари еще 5 минут.", method: "boil", time: "14 мин" },
    { name: "Крем-суп из тыквы", ing: ["тыква", "сливки", "лук", "бульон"], steps: "Вари тыкву 10 минут. Пюрируй с добавлением сливок.", method: "boil", time: "12 мин" },
    { name: "Картофель фри в аэрогриле", ing: ["картофель", "масло растительное", "соль", "паприка"], steps: "Нарежь картофель. В аэрогриль на 12 минут.", method: "airfryer", time: "12 мин" },
    { name: "Куриные крылья BBQ", ing: ["курица", "мед", "томатный соус", "чеснок"], steps: "Замаринуй. В аэрогриль на 12 минут.", method: "airfryer", time: "14 мин" },
    { name: "Запеченная рыба", ing: ["рыба белая", "лимон", "соль", "перец"], steps: "Натри рыбу специями. Запекай 12 минут.", method: "oven", time: "14 мин" },
    { name: "Пицца на лаваше", ing: ["лаваш", "томатный соус", "сыр", "колбаса"], steps: "Выложи начинку. Запекай 7 минут.", method: "oven", time: "10 мин" },
    { name: "Чизкейк в кружке", ing: ["творог", "яйца", "сахар", "мука"], steps: "Смешай всё. В микроволновку на 2 минуты.", method: "microwave", time: "5 мин" },
    { name: "Тартар из тунца", ing: ["тунец", "авокадо", "огурец", "соус соевый"], steps: "Нарежь кубиками. Заправь соевым соусом.", method: "cold", time: "8 мин" },
    { name: "Паста карбонара", ing: ["паста", "бекон", "яйца", "сыр", "чеснок"], steps: "Отвари пасту. Обжарь бекон. Смешай с яйцом и сыром.", method: "boil", time: "12 мин" },
    { name: "Плов с курицей", ing: ["курица", "рис", "морковь", "лук", "чеснок"], steps: "Обжарь курицу. Добавь рис и воду. Вари 15 минут.", method: "boil", time: "15 мин" },
    { name: "Запеченные овощи", ing: ["картофель", "морковь", "кабачок", "масло", "специи"], steps: "Нарежь овощи. Запекай 15 минут.", method: "oven", time: "15 мин" },
    { name: "Банановые панкейки", ing: ["банан", "яйца", "мука", "молоко"], steps: "Смешай. Жарь панкейки на сковороде.", method: "pan", time: "10 мин" },
    { name: "Лазанья быстрая", ing: ["фарш", "томатный соус", "сыр", "лаваш"], steps: "Сложи слои. Запекай 10 минут.", method: "oven", time: "12 мин" }
];

for (let i = 0; i < 20; i++) {
    const tpl = premiumTemplates[i];
    RECIPES.push({
        id: id++, name: `⭐ ${tpl.name}`, time: tpl.time, method: tpl.method,
        ingredients: tpl.ing, steps: tpl.steps,
        premium: true, detailedSteps: [tpl.steps, "Подавайте с любовью!"]
    });
}

for (let i = RECIPES.length - 1; i > 0; i--) { 
    const j = Math.floor(Math.random() * (i + 1)); 
    [RECIPES[i], RECIPES[j]] = [RECIPES[j], RECIPES[i]]; 
}

let currentMethodFilter = "all";
let currentRecipes = [];

function getSelectedIngredients() { 
    return Array.from(document.querySelectorAll('input[name="ingredient"]:checked')).map(cb => cb.value); 
}

function getMethodLabel(m) { 
    return methodNames[m] || "🍳 Плита"; 
}

function findRecipesByIngredients(selected) {
    if (!selected.length) return RECIPES.filter(r => !r.premium).slice(0, 15);
    const lowerSelected = selected.map(s => s.toLowerCase());
    const scored = RECIPES.map(recipe => {
        const recipeIngs = recipe.ingredients.map(i => i.toLowerCase());
        let matchCount = lowerSelected.filter(ing => recipeIngs.includes(ing)).length;
        return { recipe, score: matchCount / recipeIngs.length, matchCount };
    });
    let filtered = scored.filter(item => item.score > 0.05);
    if (filtered.length === 0) return RECIPES.filter(r => !r.premium).slice(0, 8);
    filtered.sort((a, b) => b.score - a.score);
    let results = filtered.map(f => ({ ...f.recipe, matchScore: Math.round(f.score * 100) }));
    let premiumAllowed = selected.length >= 4;
    let finalRecipes = results.filter(rec => !rec.premium || premiumAllowed);
    return finalRecipes.slice(0, 20);
}

function getAllRecipesByMethod(method) {
    if (method === "all") return RECIPES.slice(0, 30);
    return RECIPES.filter(r => r.method === method).slice(0, 30);
}

function renderRecipes(recipes, isFromTab = false) {
    currentRecipes = recipes;
    let filtered = recipes;
    if (!isFromTab && currentMethodFilter !== "all") {
        filtered = recipes.filter(r => r.method === currentMethodFilter);
    }
    const container = document.getElementById("recipesList");
    const countSpan = document.getElementById("recipeCount");
    countSpan.textContent = filtered.length ? `(${filtered.length} рецептов)` : `(нет)`;
    if (!filtered.length) {
        container.innerHTML = `<div class="empty-state">🤷 Ничего не нашлось... Попробуйте другие продукты или выберите другой раздел.</div>`;
        return;
    }
    let html = "";
    for (let rec of filtered) {
        html += `<div class="recipe-card">
            <h3>${rec.name} ${rec.premium ? '<span class="premium-tag">⭐ PREMIUM</span>' : ''} ${rec.matchScore ? `<span class="match-score">совпадение ${rec.matchScore}%</span>` : ''} <span class="method-tag">${getMethodLabel(rec.method)}</span></h3>
            <div class="meta"><span>⏱️ ${rec.time}</span></div>
            <div><strong>🥗 Ингредиенты:</strong> ${rec.ingredients.join(", ")}</div>
            <div class="steps-list"><strong>📋 Кратко:</strong> ${rec.steps.substring(0, 80)}...</div>
            <button class="btn-detail" data-id="${rec.id}">📖 Подробнее</button>
            <hr><div style="font-size:0.8rem; color:#b97f44;">✨ AI подобрал по вашим продуктам</div>
        </div>`;
    }
    container.innerHTML = html;
    document.querySelectorAll('.btn-detail').forEach(btn => {
        btn.addEventListener('click', (e) => { 
            const id = parseInt(btn.dataset.id); 
            const recipe = RECIPES.find(r => r.id === id); 
            if (recipe) openModal(recipe); 
        });
    });
}

function showSectionRecipes(method) {
    const sectionRecipes = getAllRecipesByMethod(method);
    currentRecipes = sectionRecipes;
    const container = document.getElementById("recipesList");
    const countSpan = document.getElementById("recipeCount");
    countSpan.textContent = sectionRecipes.length ? `(${sectionRecipes.length} рецептов)` : `(нет рецептов в этом разделе)`;
    if (!sectionRecipes.length) {
        container.innerHTML = `<div class="empty-state">🤷 В разделе "${getMethodLabel(method)}" пока нет рецептов.</div>`;
        return;
    }
    let html = "";
    for (let rec of sectionRecipes) {
        html += `<div class="recipe-card">
            <h3>${rec.name} ${rec.premium ? '<span class="premium-tag">⭐ PREMIUM</span>' : ''} <span class="method-tag">${getMethodLabel(rec.method)}</span></h3>
            <div class="meta"><span>⏱️ ${rec.time}</span></div>
            <div><strong>🥗 Ингредиенты:</strong> ${rec.ingredients.join(", ")}</div>
            <div class="steps-list"><strong>📋 Кратко:</strong> ${rec.steps.substring(0, 80)}...</div>
            <button class="btn-detail" data-id="${rec.id}">📖 Подробнее</button>
            <hr><div style="font-size:0.8rem; color:#b97f44;">✨ Рецепт из раздела ${getMethodLabel(rec.method)}</div>
        </div>`;
    }
    container.innerHTML = html;
    document.querySelectorAll('.btn-detail').forEach(btn => {
        btn.addEventListener('click', (e) => { 
            const id = parseInt(btn.dataset.id); 
            const recipe = RECIPES.find(r => r.id === id); 
            if (recipe) openModal(recipe); 
        });
    });
}

function openModal(recipe) {
    const modal = document.getElementById("recipeModal");
    document.getElementById("modalTitle").innerHTML = `📖 ${recipe.name}`;
    let stepsHtml = `<p><strong>⏱️ ${recipe.time}</strong> | ${getMethodLabel(recipe.method)}</p><h3>📝 Приготовление:</h3>`;
    (recipe.detailedSteps || recipe.steps.split('\n')).forEach((step, idx) => { 
        if (step.trim()) stepsHtml += `<div class="modal-step"><div class="step-number">${idx+1}</div><div>${step}</div></div>`; 
    });
    stepsHtml += `<h3>🥗 Ингредиенты:</h3><ul>${recipe.ingredients.map(ing => `<li>${ing}</li>`).join('')}</ul>`;
    document.getElementById("modalBody").innerHTML = stepsHtml;
    modal.style.display = "block"; 
    document.body.style.overflow = "hidden";
}

function closeModal() { 
    document.getElementById("recipeModal").style.display = "none"; 
    document.body.style.overflow = "auto"; 
}

function updateStats() { 
    const s = getSelectedIngredients(); 
    document.getElementById("stats").innerHTML = `<div class="stat-card">📦 Выбрано: ${s.length}</div><div class="stat-card">🍽️ Всего: ${RECIPES.length}</div><div class="stat-card">⭐ Премиум: ${RECIPES.filter(r=>r.premium).length}</div>`; 
}

async function handleAISearch() {
    const selected = getSelectedIngredients();
    if (!selected.length) { 
        document.getElementById("recipesList").innerHTML = '<div class="loading">🤷 Выберите хотя бы один продукт!</div>'; 
        return; 
    }
    document.getElementById("recipesList").innerHTML = '<div class="loading">🤖 AI анализирует 100 рецептов...</div>';
    await new Promise(r => setTimeout(r, 400));
    const matched = findRecipesByIngredients(selected);
    renderRecipes(matched);
    updateStats();
}

function resetFilters() { 
    document.querySelectorAll('input[name="ingredient"]').forEach(cb => cb.checked = false); 
    updateStats(); 
    document.getElementById("recipesList").innerHTML = '<div class="loading">✨ Выберите продукты и нажмите «Найти рецепты»</div>'; 
    document.getElementById("recipeCount").textContent = ''; 
    currentMethodFilter = "all"; 
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active')); 
    document.querySelector('.tab-btn[data-method="all"]').classList.add('active');
    currentRecipes = [];
}

function init() {
    buildCheckboxes(); 
    updateStats(); 
    document.getElementById("recipesList").innerHTML = '<div class="loading">✨ Выберите продукты и нажмите «Найти рецепты»<br>⬅️ Или нажмите на раздел, чтобы посмотреть все рецепты этой категории</div>';
    
    document.getElementById("findRecipeBtn").addEventListener("click", handleAISearch);
    document.getElementById("resetBtn").addEventListener("click", resetFilters);
    document.getElementById("premiumBtn").addEventListener("click", () => alert("✨ БыстроБот Premium: 20 эксклюзивных рецептов, AI-план питания, доставка продуктов. 399₽/мес."));
    
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const method = btn.dataset.method;
            currentMethodFilter = method;
            showSectionRecipes(method);
        });
    });
    
    const modal = document.getElementById("recipeModal");
    document.getElementById("closeModalBtn").addEventListener("click", closeModal);
    modal.addEventListener("click", (e) => { if(e.target === modal) closeModal(); });
    document.addEventListener("keydown", (e) => { if(e.key === "Escape" && modal.style.display === "block") closeModal(); });
}

init();