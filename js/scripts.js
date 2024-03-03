const Modal = {
  open(event) {
    event.preventDefault()
    if (Atividade.allAtivities.length > 0) {
      document.querySelector('.modal-overlay').classList.add('active')
    } else {
      alert('Nenhuma atividade para excluir')
    }
  },
  close(event) {
    event.preventDefault()
    document.querySelector('.modal-overlay').classList.remove('active')
  }
}

const Storage = {
  get() {
    return JSON.parse(localStorage.getItem('atividades')) || []
  },
  set(atividade) {
    localStorage.setItem('atividades', JSON.stringify(atividade))
  },
  clearAll(event) {
    Modal.close(event)
    localStorage.clear()
    DOM.clearAtividades()
  }
}

const Atividade = {
  allAtivities: Storage.get(),

  add(atividade) {
    Atividade.allAtivities.push(atividade)
    App.reload()
  },
  remove(index) {
    Atividade.allAtivities.splice(index, 1)

    App.reload()
  }
}

const DOM = {
  atividadesContainer: document.getElementById('atividadesContainer'),

  addAtividade(atividade, index) {
    let divAtividade = document.createElement('div')
    divAtividade.id = 'atividade' + index
    divAtividade.classList.add('atividade')

    divAtividade.innerHTML = DOM.innerHTMLAtividade(atividade, index)

    atividadesContainer.appendChild(divAtividade)
  },
  innerHTMLAtividade(atividade, index) {
    const dataHora = Utils.formatDate(atividade.dataHora)
    const descricao = atividade.descricao

    const html = `
      <p class="descricao">${descricao}</p>
      <p>${dataHora}</p>
      <div class="imagem">
        <img onclick='Atividade.remove(${index})' src="./assets/delete.png" alt="Remover atividade" title="Remover atividade">
      </div>
      
    `

    return html
  },

  clearAtividades() {
    DOM.atividadesContainer.innerHTML = ''
  }
}

const Form = {
  descricao: document.getElementById('inputDescricao'),
  dataHora: document.getElementById('inputData'),

  getValues() {
    return {
      descricao: Form.descricao.value,
      dataHora: Form.dataHora.value
    }
  },

  validateFilds() {
    let { descricao, dataHora } = Form.getValues()
    if (descricao.trim() === '' || dataHora.trim() === '') {
      throw new Error('Por favor, preencha todos os campos')
    }

    let dataHoraAux = new Date(Date.parse(dataHora))
    if (dataHoraAux < new Date()) {
      throw new Error(
        'A data e hora da atividade deve ser maior que a data e hora atual!'
      )
    }
  },

  formatValues() {
    let { descricao, dataHora } = Form.getValues()

    dataHora = Utils.formatDate(dataHora)

    return {
      descricao,
      dataHora
    }
  },

  clearFields() {
    Form.descricao.value = ''
    Form.dataHora.value = ''
  },

  submit(event) {
    event.preventDefault()

    try {
      Form.validateFilds()
      const atividade = Form.formatValues()
      Atividade.add(atividade)
      Form.clearFields()
    } catch (error) {
      alert(error.message)
    }
  }
}

const Utils = {
  formatDate(dataHora) {
    let dataHoraAux = new Date(Date.parse(dataHora))
    let dataFormatada =
      (dataHoraAux.getDate() < 10
        ? '0' + dataHoraAux.getDate()
        : dataHoraAux.getDate()) +
      '/' +
      (dataHoraAux.getMonth() + 1 < 10
        ? '0' + (dataHoraAux.getMonth() + 1)
        : dataHoraAux.getMonth() + 1) +
      '/' +
      dataHoraAux.getFullYear() +
      ' ' +
      (dataHoraAux.getHours() == 0
        ? dataHoraAux.getHours() + '0'
        : dataHoraAux.getHours()) +
      ':' +
      (dataHoraAux.getMinutes() == 0
        ? dataHoraAux.getMinutes() + '0'
        : dataHoraAux.getMinutes())
    return dataFormatada
  }
}

const App = {
  init() {
    Atividade.allAtivities.forEach((atividade, index) => {
      // varre cada posição das transações e envia para ser criada dentro da DOM
      DOM.addAtividade(atividade, index)
    })

    Storage.set(Atividade.allAtivities)
  },

  reload() {
    DOM.clearAtividades()
    App.init()
  }
}

App.init()

// function criarAtividade() {
//   if (atividade.descricao == null) {
//     window.alert('É necessário alguma descrição!')
//     return
//   } else if (atividade.dataHora == null) {
//     window.alert('É necessário algum horário!')
//     return
//   }

//   atividade.id = atividadesList.length

//   let divAtividade = document.createElement('div')
//   divAtividade.id = 'atividade' + atividade.id
//   divAtividade.classList.add('atividade')
//   document.getElementById('atividadesContainer').appendChild(divAtividade)

//   let descricao = document.createElement('p')
//   descricao.innerHTML = atividade.descricao
//   document
//     .getElementById(`${'atividade' + atividade.id}`)
//     .appendChild(descricao)

//   let dataHora = document.createElement('p')
//   dataHora.innerHTML =
//     (atividade.dataHora.getDate() < 10
//       ? '0' + atividade.dataHora.getDate()
//       : atividade.dataHora.getDate()) +
//     '/' +
//     (atividade.dataHora.getMonth() + 1 < 10
//       ? '0' + (atividade.dataHora.getMonth() + 1)
//       : atividade.dataHora.getMonth() + 1) +
//     '/' +
//     atividade.dataHora.getFullYear() +
//     ' ' +
//     (atividade.dataHora.getHours() == 0
//       ? atividade.dataHora.getHours() + '0'
//       : atividade.dataHora.getHours()) +
//     ':' +
//     (atividade.dataHora.getMinutes() == 0
//       ? atividade.dataHora.getMinutes() + '0'
//       : atividade.dataHora.getMinutes())

//   document.getElementById(`${'atividade' + atividade.id}`).appendChild(dataHora)

//   atividadesList.push(atividade)
//   limparCampos()
//   guardarValores()
// }

// function guardarValores() {
//   localStorage.setItem(`${atividade.id}`, JSON.stringify(atividade))
//   resetarAtividade()
// }

// function excluirTudo() {
//   localStorage.clear()
//   document.getElementById('atividadesContainer').replaceChildren()
// }

// function limparCampos() {
//   document.getElementById('inputData').value = null
//   document.getElementById('inputDescricao').value = null
// }

// function resetarAtividade() {
//   atividade = {
//     id: 0,
//     descricao: null,
//     dataHora: null
//   }
// }

// function salvarDataHora(value) {
//   let dataHoraAux = new Date(Date.parse(value))
//   if (dataHoraAux < new Date()) {
//     window.alert(
//       'A data e hora da atividade deve ser maior que a data e hora atual!'
//     )
//     document.getElementById('inputData').value = null
//     return
//   }
//   atividade.dataHora = new Date(Date.parse(dataHoraAux))
// }

// function salvarDescricao(value) {
//   atividade.descricao = value
// }

// function formatarData(dataHora) {
//   let dataHoraAux = new Date(Date.parse(dataHora))
//   let dataFormatada =
//     (dataHoraAux.getDate() < 10
//       ? '0' + dataHoraAux.getDate()
//       : dataHoraAux.getDate()) +
//     '/' +
//     (dataHoraAux.getMonth() + 1 < 10
//       ? '0' + (dataHoraAux.getMonth() + 1)
//       : dataHoraAux.getMonth() + 1) +
//     '/' +
//     dataHoraAux.getFullYear() +
//     ' ' +
//     (dataHoraAux.getHours() == 0
//       ? dataHoraAux.getHours() + '0'
//       : dataHoraAux.getHours()) +
//     ':' +
//     (dataHoraAux.getMinutes() == 0
//       ? dataHoraAux.getMinutes() + '0'
//       : dataHoraAux.getMinutes())
//   return dataFormatada
// }

// function buscarAtividades() {
//   atividadesList = Object.values(localStorage)

//   if (atividadesList.length > 0) {
//     atividadesList.forEach(item => {
//       let atividade = JSON.parse(item)
//       let divAtividade = document.createElement('div')
//       divAtividade.id = 'atividade' + atividade.id
//       divAtividade.classList.add('atividade')
//       document.getElementById('atividadesContainer').appendChild(divAtividade)

//       let descricao = document.createElement('p')
//       descricao.innerHTML = atividade.descricao
//       document
//         .getElementById(`${'atividade' + atividade.id}`)
//         .appendChild(descricao)

//       let dataHora = document.createElement('p')
//       dataHora.innerHTML = formatarData(atividade.dataHora)
//     })
//   }
// }
