const pages = [
    { title: "Sobre como vender.", url: "/public/sup-lib/pv-1.html" },
    { title: "Sobre como cancelar.", url: "/public/sup-lib/pv-2.html" },
    { title: "Sobre pagamentos.", url: "/public/sup-lib/pv-3.html" },
    { title: "Sobre a entrega do produto.", url: "/public/sup-lib/pv-4.html" },
    { title: "Sobre como criar uma conta.", url: "/public/sup-lib/cc-1.html" },
    { title: "Sobre como alterar dados cadastrais.", url: "/public/sup-lib/cc-2.html"},
    { title: "Sobre como excluir a conta.", url: "/public/sup-lib/cc-3.html"},
    { title: "Sobre tarifas do serviço weave.", url: "/public/sup-lib/df-1.html"},
    { title: "Sobre o prazo para receber reembolso.", url: "/public/sup-lib/df-2.html"},
    { title: "Sobre o prazo para realizar devolução.", url: "/public/sup-lib/df-3.html"},
    { title: "Sobre poder trocar a transportadora no envio ou devolução.", url: "/public/sup-lib/df-4.html"},
    { title: "Sobre a weave cobrar taxas por fora.", url: "/public/sup-lib/df-5.html"},
    { title: "Sobre como denunciar um anúncio.", url: "/public/sup-lib/sp-1.html"},
    { title: "Sobre como denunciar um vendedor.", url: "/public/sup-lib/sp-2.html"},
    { title: "Sobre como aumentar sua segurança na transação.", url: "/public/sup-lib/sp-3.html"},
    { title: "Sobre como identificar uma fraude.", url: "/public/sup-lib/sp-4.html"},
    { title: "Sobre cancelamento.", url: "/public/sup-lib/pc-1.html"},
    { title: "Sobre os prazos para reembolso.", url: "/public/sup-lib/pc-2.html"},
    { title: "Sobre pagamentos.", url: "/public/sup-lib/pc-3.html"},
    { title: "Sobre como falar com o vendedor.", url: "/public/sup-lib/pc-4.html"},
    { title: "Sobre a entrega do produto.", url: "/public/sup-lib/pc-5.html"}
];

function searchPages(event) {
    event.preventDefault(); // Previne o envio padrão do formulário
    const searchInput = document.getElementById('searchInput');
    const searchTerm = searchInput.value.toLowerCase();
    const suggestionsList = document.getElementById('suggestionsList');

    // Remove classes quando Enter for pressionado
    searchInput.classList.remove('border-b-2', 'rounded-b-lg');

    if (searchTerm === "") {
        suggestionsList.classList.add('hidden');
        return;
    }

    const filteredPages = pages.filter(page =>
        page.title.toLowerCase().includes(searchTerm)
    );

    if (filteredPages.length > 0) {
        suggestionsList.innerHTML = filteredPages.map(page => `
            <li class="p-2 hover:bg-white text-black cursor-pointer medio-i transition-transform duration-300 hover:text-[#AADAFD]" onclick="selectSuggestion('${page.url}')">
                ${page.title}
            </li>
        `).join('');
        suggestionsList.classList.remove('hidden');
    } else {
        suggestionsList.innerHTML = `<li class="p-2 text-gray-500">Nenhum resultado encontrado.</li>`;
        suggestionsList.classList.remove('hidden');
    }
}

function selectSuggestion(url) {
    window.location.href = url; 
}

document.addEventListener('click', function(event) {
    const searchInput = document.getElementById('searchInput');
    const suggestionsList = document.getElementById('suggestionsList');

    if (!searchInput.contains(event.target) && !suggestionsList.contains(event.target)) {
        suggestionsList.classList.add('hidden');
        searchInput.classList.add('border-b-2', 'rounded-b-lg');
    }
});