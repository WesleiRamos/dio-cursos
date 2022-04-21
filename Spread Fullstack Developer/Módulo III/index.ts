// da pra melhorar, mas ta ok assim

interface Vehicle {
  id: number,
  nome: string,
  placa: string,
  entrada: Date | string
}

type DeleteCallback = (id: number) => void

/**
 * Retorna a lista de carros salvos
 */
const loadVehicles = (): Vehicle[] => {
  return localStorage.vehicles 
    ? JSON.parse(localStorage.vehicles)
    : []
}

/**
 * Salva a lista de carros
 */
const saveVehicles = (vehicles: Vehicle[]): void => {
  localStorage.vehicles = JSON.stringify(vehicles)
}

/**
 * Retorna uma nova entrada com base em um template
 */
const newEntrada = ((template: HTMLTemplateElement) => (): Element => {
  const node = template.content.cloneNode(true) as HTMLElement
  return node.firstElementChild!
})
(document.getElementById('entrada-template') as HTMLTemplateElement)


/**
 * Mostra ou esconde uma mensagem se há algum veiculo estacionado
 */
const showNada = ((nada: Element) => (show: boolean): void => {
  show 
    ? nada.classList.remove('hide')
    : nada.classList.add('hide')
})
(document.getElementById('nada') as HTMLElement)

/**
 * Renderiza um veiculo
 */
const renderVehicle = ((tabela: HTMLTableElement) => (vehicle: Vehicle, onDelete: DeleteCallback): void => {
  const node = newEntrada()
  const entrada = typeof vehicle.entrada === 'string'
    ? new Date(vehicle.entrada)
    : vehicle.entrada

  node.querySelector('.nome')!.innerHTML = vehicle.nome
  node.querySelector('.placa')!.innerHTML = vehicle.placa
  node.querySelector('.entrada')!.innerHTML = entrada.toLocaleDateString()
  node.querySelector('.excluir')!.addEventListener('click', () => {
    onDelete(vehicle.id)
    tabela.removeChild(node)
  })

  tabela.appendChild(node)
})
(document.getElementById('tabela') as HTMLTableElement)


const vehicleStore = (() => {
  let value: Vehicle[] = []

  /**
   * Retorna a lista de carros
   */
  const get = (): Vehicle[] =>
    value

  /**
   * Redefine o valor da store
   */
  const set = (newValue: Vehicle[]) => {
    value = newValue
    saveVehicles(newValue)
    showNada(newValue.length === 0)
  }

  /**
   * Deleta um veiculo com base no seu id
   */
  const del = (id: number) =>
    set(value.filter(vehicle => vehicle.id !== id))

  /**
   * Adiciona um veiculo na lista e a salva
   * @return Retorna o veículo salvo
   */
  const add = (vehicle: Vehicle): Vehicle => {
    set([ ...value, vehicle ])
    renderVehicle(vehicle, del)
    return vehicle
  }

  return { get, set, add, del }
})()


window.addEventListener('load', () => {
  const nome = document.getElementById('nome') as HTMLInputElement
  const placa = document.getElementById('placa') as HTMLInputElement
  const cadastrar = document.getElementById('cadastrar') as HTMLButtonElement

  vehicleStore
    .set(loadVehicles())

  vehicleStore
    .get()
    .forEach(vehicle =>
      renderVehicle(vehicle, vehicleStore.del)
    )

  /**
   * Ao clicar no botão de cadastrar checa se os campos estão preenchidos,
   * cria um novo veiculo e renderiza
   */
  cadastrar.addEventListener('click', () => {
    if (!nome.value.trim() || !placa.value.trim())
      return alert('Preencha todos os campos')

    vehicleStore.add({
      id: Date.now(),
      entrada: new Date(),
      nome: nome.value.trim(),
      placa: placa.value.trim(),
    })
  })
})