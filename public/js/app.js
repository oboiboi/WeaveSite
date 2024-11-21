const flexButton = document.getElementById('flexButton');
const persoButton = document.getElementById('persoButton');
const circuButton = document.getElementById('circuButton');


function showContent(contentToShow) {

    flexContent.classList.add('hidden');
    persoContent.classList.add('hidden');
    circuContent.classList.add('hidden');

    contentToShow.classList.remove('hidden');
}


flexButton.addEventListener('click', () => showContent(flexContent));
persoButton.addEventListener('click', () => showContent(persoContent));
circuButton.addEventListener('click', () => showContent(circuContent));


function togglePassword(inputId, visibleIconId, hiddenIconId) {
    // Seleciona os elementos de input e os ícones
    const passwordInput = document.getElementById(inputId);
    const visibleIcon = document.getElementById(visibleIconId);
    const hiddenIcon = document.getElementById(hiddenIconId);
    
  
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        visibleIcon.classList.remove('hidden');
        hiddenIcon.classList.add('hidden');
    } else {
        passwordInput.type = 'password';
        visibleIcon.classList.add('hidden');
        hiddenIcon.classList.remove('hidden');
    }
}

function toggleRotation() {
    const arrowIcon = document.getElementById('arrow-icon');
    arrowIcon.classList.toggle('rotate-180');
}

document.querySelectorAll('.toggle-button').forEach((button, index) => {
    button.addEventListener('click', () => {
        const content = document.querySelectorAll('.toggle-content')[index];
        content.classList.toggle('hidden');
    });
});

document.getElementById('adress-btn').addEventListener('click', function() {
    var adressDiv = document.getElementById('adress-div');
    
    // Verifica se a div está escondida, se estiver, mostra, caso contrário, esconde
    if (adressDiv.classList.contains('hidden')) {
        adressDiv.classList.remove('hidden');
    } else {
        adressDiv.classList.add('hidden');
    }
});

function toggleAccordion(index) {
    const content = document.getElementById(`content-${index}`);
    const icon = document.getElementById(`icon-${index}`);
 
    // SVG for Down icon
    const downSVG = `
      <svg  class="w-4 h-4" viewBox="0 0 16 16" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:cc="http://creativecommons.org/ns#" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns="http://www.w3.org/2000/svg" id="svg2" version="1.1" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> 
        <metadata id="metadata7"> <rdf:rdf> <cc:work> <dc:format>image/svg+xml</dc:format> <dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage"></dc:type> <dc:title></dc:title> <dc:date>2021</dc:date> <dc:creator> <cc:agent> <dc:title>Timothée Giet</dc:title> </cc:agent> </dc:creator> <cc:license rdf:resource="http://creativecommons.org/licenses/by-sa/4.0/"></cc:license> </cc:work> <cc:license rdf:about="http://creativecommons.org/licenses/by-sa/4.0/"> 
        <cc:permits rdf:resource="http://creativecommons.org/ns#Reproduction"></cc:permits> 
        <cc:permits rdf:resource="http://creativecommons.org/ns#Distribution"></cc:permits> 
        <cc:requires rdf:resource="http://creativecommons.org/ns#Notice"></cc:requires> 
        <cc:requires rdf:resource="http://creativecommons.org/ns#Attribution"></cc:requires> 
        <cc:permits rdf:resource="http://creativecommons.org/ns#DerivativeWorks"></cc:permits> <cc:requires rdf:resource="http://creativecommons.org/ns#ShareAlike"></cc:requires> </cc:license> </rdf:rdf> </metadata> <g id="layer1" transform="rotate(45 1254.793 524.438)"> <path style="fill:#ffffff;fill-opacity:1;fill-rule:evenodd;stroke:none;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" d="M.536 1044.409v-1.997h9v-9h2v11z" id="path4179"></path> </g> </g>
      </svg>
    `;
 
    // SVG for Up icon
    const upSVG = `
        <svg class="w-4 h-4" viewBox="0 0 16 16" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:cc="http://creativecommons.org/ns#" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns="http://www.w3.org/2000/svg" id="svg2" version="1.1" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <metadata id="metadata7"> <rdf:rdf> <cc:work> <dc:format>image/svg+xml</dc:format> <dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage"></dc:type> <dc:title></dc:title> <dc:date>2021</dc:date> <dc:creator> <cc:agent> <dc:title>Timothée Giet</dc:title> </cc:agent> </dc:creator> <cc:license rdf:resource="http://creativecommons.org/licenses/by-sa/4.0/"></cc:license> 
            </cc:work> <cc:license rdf:about="http://creativecommons.org/licenses/by-sa/4.0/"> <cc:permits rdf:resource="http://creativecommons.org/ns#Reproduction"></cc:permits> <cc:permits rdf:resource="http://creativecommons.org/ns#Distribution"></cc:permits> <cc:requires rdf:resource="http://creativecommons.org/ns#Notice"></cc:requires> <cc:requires rdf:resource="http://creativecommons.org/ns#Attribution"></cc:requires> <cc:permits rdf:resource="http://creativecommons.org/ns#DerivativeWorks"></cc:permits> <cc:requires rdf:resource="http://creativecommons.org/ns#ShareAlike"></cc:requires> </cc:license> </rdf:rdf> </metadata> 
            <g id="layer1" transform="rotate(45 1254.793 524.438)"> <path style="fill:#ffffff;fill-opacity:1;fill-rule:evenodd;stroke:none;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" d="M4.468 1048.341h1.996v-9h9v-2h-11z" id="path4179"></path> </g> </g>
        </svg>
    `;
 
    // Toggle the content's max-height for smooth opening and closing
    if (content.style.maxHeight && content.style.maxHeight !== '0px') {
      content.style.maxHeight = '0';
      icon.innerHTML = upSVG;
    } else {
      content.style.maxHeight = content.scrollHeight + 'px';
      icon.innerHTML = downSVG;
    }
}

    