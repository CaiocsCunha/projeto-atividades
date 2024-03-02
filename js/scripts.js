window.addEventListener('load', buscarAtividades)

let atividadesList = []

let atividade = {
  id: 0,
  descricao: null,
  dataHora: null
}

function criarAtividade() {
  if (atividade.descricao == null) {
    window.alert('É necessário alguma descrição!')
    return
  } else if (atividade.dataHora == null) {
    window.alert('É necessário algum horário!')
    return
  }

  atividade.id = atividadesList.length

  let divAtividade = document.createElement('div')
  divAtividade.id = 'atividade' + atividade.id
  divAtividade.classList.add('atividade')
  document.getElementById('atividadesContainer').appendChild(divAtividade)

  let descricao = document.createElement('p')
  descricao.innerHTML = atividade.descricao
  document
    .getElementById(`${'atividade' + atividade.id}`)
    .appendChild(descricao)

  let dataHora = document.createElement('p')
  dataHora.innerHTML =
    (atividade.dataHora.getDate() < 10
      ? '0' + atividade.dataHora.getDate()
      : atividade.dataHora.getDate()) +
    '/' +
    (atividade.dataHora.getMonth() + 1 < 10
      ? '0' + (atividade.dataHora.getMonth() + 1)
      : atividade.dataHora.getMonth() + 1) +
    '/' +
    atividade.dataHora.getFullYear() +
    ' ' +
    (atividade.dataHora.getHours() == 0
      ? atividade.dataHora.getHours() + '0'
      : atividade.dataHora.getHours()) +
    ':' +
    (atividade.dataHora.getMinutes() == 0
      ? atividade.dataHora.getMinutes() + '0'
      : atividade.dataHora.getMinutes())

  document.getElementById(`${'atividade' + atividade.id}`).appendChild(dataHora)

  atividadesList.push(atividade)
  limparCampos()
  guardarValores()
}

function guardarValores() {
  localStorage.setItem(`${atividade.id}`, JSON.stringify(atividade))
  resetarAtividade()
}

function excluirTudo() {
  localStorage.clear()
  document.getElementById('atividadesContainer').replaceChildren()
}

function limparCampos() {
  document.getElementById('inputData').value = null
  document.getElementById('inputDescricao').value = null
}

function resetarAtividade() {
  atividade = {
    id: 0,
    descricao: null,
    dataHora: null
  }
}

function salvarDataHora(value) {
  let dataHoraAux = new Date(Date.parse(value))
  if (dataHoraAux < new Date()) {
    window.alert(
      'A data e hora da atividade deve ser maior que a data e hora atual!'
    )
    document.getElementById('inputData').value = null
    return
  }
  atividade.dataHora = new Date(Date.parse(dataHoraAux))
}

function salvarDescricao(value) {
  atividade.descricao = value
}

function formatarData(dataHora) {
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

function buscarAtividades() {
  atividadesList = Object.values(localStorage)

  if (atividadesList.length > 0) {
    atividadesList.forEach(item => {
      let atividade = JSON.parse(item)
      let divAtividade = document.createElement('div')
      divAtividade.id = 'atividade' + atividade.id
      divAtividade.classList.add('atividade')
      document.getElementById('atividadesContainer').appendChild(divAtividade)

      let descricao = document.createElement('p')
      descricao.innerHTML = atividade.descricao
      document
        .getElementById(`${'atividade' + atividade.id}`)
        .appendChild(descricao)

      let dataHora = document.createElement('p')
      dataHora.innerHTML = formatarData(atividade.dataHora)
    })
  }
}
