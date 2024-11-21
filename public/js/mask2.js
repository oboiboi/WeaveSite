function nextDigit(formattedValue, cursorPos, isBackspace) {
  if (isBackspace) {
    return cursorPos - 1; // Se for uma tecla de backspace, mova o cursor uma posição para trás
  }
  // Avança até encontrar o próximo caractere não numérico
  for (let i = cursorPos; i < formattedValue.length; i++) {
    if (/\d/.test(formattedValue[i])) {
      return i;
    }
  }
  return formattedValue.length; // Se não encontrar mais números, retorna para o final
}

const number = document.getElementById("telProfile");

number.oninput = (e) => {
  let cursorPos = e.target.selectionStart
  let currentValue = e.target.value
  let cleanValue = currentValue.replace(/\D/g, "");
  let formatInput = patternMatch({
      input: cleanValue,
      template: "(xx) xxxxx-xxxx"
   });
  
  e.target.value = formatInput
  
  let isBackspace = (e?.data==null) ? true: false
  let nextCusPos = nextDigit(formatInput, cursorPos, isBackspace)
  
  number.setSelectionRange(nextCusPos+1, nextCusPos+1);
};

const cpf = document.getElementById("cpfProfile");

cpf.oninput = (e) => {
  let cursorPos = e.target.selectionStart
  let currentValue = e.target.value
  let cleanValue = currentValue.replace(/\D/g, "");
  let formatInput = patternMatch({
      input: cleanValue,
      template: "xxx.xxx.xxx-xx"
   });
  
  e.target.value = formatInput
  
  let isBackspace = (e?.data==null) ? true: false
  let nextCusPos = nextDigit(formatInput, cursorPos, isBackspace)
  
  cpf.setSelectionRange(nextCusPos+1, nextCusPos+1);
};


const birth = document.getElementById("nascProfile")

birth.oninput = (e) => {
  let cursorPos = e.target.selectionStart
  let currentValue = e.target.value
  let cleanValue = currentValue.replace(/\D/g, "")
  let formatInput = patternMatch({
    input: cleanValue,
    template: "xx/xx/xxxx"
  })

  e.target.value = formatInput
  let isBackspace = (e?.data==null) ? true: false
  let nextCusPos = nextDigit(formatInput, cursorPos, isBackspace)

  birth.setSelectionRange(nextCusPos+1, nextCusPos+1)
}

const cep = document.getElementById("cep")

cep.oninput = (e) => {
  let cursorPos = e.target.selectionStart
  let currentValue = e.target.value
  let cleanValue = currentValue.replace(/\D/g, "")
  let formatInput = patternMatch({
    input: cleanValue,
    template: "xxxxx-xxx"
  })

  e.target.value = formatInput
  let isBackspace = (e?.data==null) ? true: false
  let nextCusPos = nextDigit(formatInput, cursorPos, isBackspace)

  cep.setSelectionRange(nextCusPos+1, nextCusPos+1)
}

function patternMatch({ input, template }) {
  try {
    let j = 0;
    let plaintext = "";
    let countj = 0;
    while (j < template.length) {
      if (countj > input.length - 1) {
        template = template.substring(0, j);
        break;
      }

      if (template[j] == input[j]) {
        j++;
        countj++;
        continue;
      }

      if (template[j] == "x") {
        template =
          template.substring(0, j) + input[countj] + template.substring(j + 1);
        plaintext = plaintext + input[countj];
        countj++;
      }
      j++;
    }

    return template;
  } catch {
    return "";
  }
}




