// da pra melhorar, mas ta ok assim
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
/**
 * Retorna a lista de carros salvos
 */
var loadVehicles = function () {
    return localStorage.vehicles
        ? JSON.parse(localStorage.vehicles)
        : [];
};
/**
 * Salva a lista de carros
 */
var saveVehicles = function (vehicles) {
    localStorage.vehicles = JSON.stringify(vehicles);
};
/**
 * Retorna uma nova entrada com base em um template
 */
var newEntrada = (function (template) { return function () {
    var node = template.content.cloneNode(true);
    return node.firstElementChild;
}; })(document.getElementById('entrada-template'));
/**
 * Mostra ou esconde uma mensagem se há algum veiculo estacionado
 */
var showNada = (function (nada) { return function (show) {
    show
        ? nada.classList.remove('hide')
        : nada.classList.add('hide');
}; })(document.getElementById('nada'));
/**
 * Renderiza um veiculo
 */
var renderVehicle = (function (tabela) { return function (vehicle, onDelete) {
    var node = newEntrada();
    var entrada = typeof vehicle.entrada === 'string'
        ? new Date(vehicle.entrada)
        : vehicle.entrada;
    node.querySelector('.nome').innerHTML = vehicle.nome;
    node.querySelector('.placa').innerHTML = vehicle.placa;
    node.querySelector('.entrada').innerHTML = entrada.toLocaleDateString();
    node.querySelector('.excluir').addEventListener('click', function () {
        onDelete(vehicle.id);
        tabela.removeChild(node);
    });
    tabela.appendChild(node);
}; })(document.getElementById('tabela'));
var vehicleStore = (function () {
    var value = [];
    /**
     * Retorna a lista de carros
     */
    var get = function () {
        return value;
    };
    /**
     * Redefine o valor da store
     */
    var set = function (newValue) {
        value = newValue;
        saveVehicles(newValue);
        showNada(newValue.length === 0);
    };
    /**
     * Deleta um veiculo com base no seu id
     */
    var del = function (id) {
        return set(value.filter(function (vehicle) { return vehicle.id !== id; }));
    };
    /**
     * Adiciona um veiculo na lista e a salva
     * @return Retorna o veículo salvo
     */
    var add = function (vehicle) {
        set(__spreadArray(__spreadArray([], value, true), [vehicle], false));
        renderVehicle(vehicle, del);
        return vehicle;
    };
    return { get: get, set: set, add: add, del: del };
})();
window.addEventListener('load', function () {
    var nome = document.getElementById('nome');
    var placa = document.getElementById('placa');
    var cadastrar = document.getElementById('cadastrar');
    vehicleStore
        .set(loadVehicles());
    vehicleStore
        .get()
        .forEach(function (vehicle) {
        return renderVehicle(vehicle, vehicleStore.del);
    });
    /**
     * Ao clicar no botão de cadastrar checa se os campos estão preenchidos,
     * cria um novo veiculo e renderiza
     */
    cadastrar.addEventListener('click', function () {
        if (!nome.value.trim() || !placa.value.trim())
            return alert('Preencha todos os campos');
        vehicleStore.add({
            id: Date.now(),
            entrada: new Date(),
            nome: nome.value.trim(),
            placa: placa.value.trim()
        });
    });
});
