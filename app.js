const sueldoInput = document.getElementById("sueldo");
const mesInput = document.getElementById("mes");
const guardarSueldoButton = document.getElementById("guardarSueldo");
const seccionSueldo = document.getElementById("seccionSueldo");
const seccionMes = document.getElementById("seccionMes");
const seccionGastos = document.getElementById("seccionGastos");

const nombreGasto = document.getElementById("nombreGasto");
const montoGasto = document.getElementById("montoGasto");
const prioridadGasto = document.getElementById("prioridadGasto");
const agregarGastoButton = document.getElementById("agregarGasto");
const pagarButton = document.getElementById("pagar");
const balance = document.getElementById("balance");

const listaEsenciales = document.getElementById("listaEsenciales");
const listaLoQuiero = document.getElementById("listaLoQuiero");
const listaInnecesarios = document.getElementById("listaInnecesarios");

const totalEsenciales = document.getElementById("totalEsenciales");
const totalLoQuiero = document.getElementById("totalLoQuiero");
const totalInnecesarios = document.getElementById("totalInnecesarios");

const sueldoTotal = document.getElementById("sueldoTotal");
const gastoTotal = document.getElementById("gastoTotal");
const saldoRestante = document.getElementById("saldoRestante");

let gastos = {
    Esencial: [],
    "Lo Quiero": [],
    Innecesario: []
};

let sueldo = 0;
let mes = "";

const formatearMonto = (monto) => {
    return monto.replace(/\./g, "").replace(/[^0-9]/g, "");
};

const validarNumero = (input) => {
    return !isNaN(parseFloat(input)) && isFinite(input);
};

const formatearMoneda = (monto) => {
    return monto.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' });
};

const actualizarTotales = () => {
    let totalEsencial = 0;
    let totalLoQuiero = 0;
    let totalInnecesario = 0;

    listaEsenciales.innerHTML = "";
    gastos.Esencial.forEach((gasto, index) => {
        totalEsencial += gasto.monto;
        listaEsenciales.innerHTML += `<li><input type="checkbox" class="checkbox" data-prioridad="Esencial" data-index="${index}" checked> ${gasto.nombre} - ${formatearMoneda(gasto.monto)}</li>`;
    });
    totalEsenciales.textContent = formatearMoneda(totalEsencial);

    listaLoQuiero.innerHTML = "";
    gastos["Lo Quiero"].forEach((gasto, index) => {
        totalLoQuiero += gasto.monto;
        listaLoQuiero.innerHTML += `<li><input type="checkbox" class="checkbox" data-prioridad="Lo Quiero" data-index="${index}"> ${gasto.nombre} - ${formatearMoneda(gasto.monto)}</li>`;
    });
    totalLoQuiero.textContent = formatearMoneda(totalLoQuiero);

    listaInnecesarios.innerHTML = "";
    gastos.Innecesario.forEach((gasto, index) => {
        totalInnecesario += gasto.monto;
        listaInnecesarios.innerHTML += `<li><input type="checkbox" class="checkbox" data-prioridad="Innecesario" data-index="${index}"> ${gasto.nombre} - ${formatearMoneda(gasto.monto)}</li>`;
    });
    totalInnecesarios.textContent = formatearMoneda(totalInnecesario);
};

guardarSueldoButton.addEventListener("click", () => {
    sueldo = parseFloat(formatearMonto(sueldoInput.value));
    mes = mesInput.value;

    if (!validarNumero(sueldo) || !mes) {
        alert("Por favor, ingresa un sueldo válido y el mes.");
        return;
    }

    seccionSueldo.classList.add("hidden");
    seccionMes.classList.add("hidden");
    seccionGastos.classList.remove("hidden");

    sueldoTotal.textContent = formatearMoneda(sueldo);
});

agregarGastoButton.addEventListener("click", () => {
    const nombre = nombreGasto.value;
    const monto = parseFloat(formatearMonto(montoGasto.value));
    const prioridad = prioridadGasto.value;

    if (!nombre || !validarNumero(monto)) {
        alert("Por favor, ingresa un gasto válido.");
        return;
    }

    gastos[prioridad].push({ nombre, monto });

    nombreGasto.value = "";
    montoGasto.value = "";

    actualizarTotales();
});

pagarButton.addEventListener("click", () => {
    const selectedGastos = document.querySelectorAll(".checkbox:checked");
    let totalPagar = 0;

    selectedGastos.forEach(checkbox => {
        const prioridad = checkbox.getAttribute("data-prioridad");
        const index = checkbox.getAttribute("data-index");
        const monto = gastos[prioridad][index].monto;
        totalPagar += monto;
    });

    const saldo = sueldo - totalPagar;

    gastoTotal.textContent = formatearMoneda(totalPagar);
    saldoRestante.textContent = formatearMoneda(saldo);

    balance.classList.remove("hidden");
});
