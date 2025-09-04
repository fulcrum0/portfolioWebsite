const lengthBtn = document.getElementById('length-btn');
const lengthConversions = {
    mm: { mm: 1, cm: 0.1, dm: 0.01, m: 0.001, km: 0.000001 },
    cm: { mm: 10, cm: 1, dm: 0.1, m: 0.01, km: 0.00001 },
    dm: { mm: 100, cm: 10, dm: 1, m: 0.1, km: 0.0001 },
    m: { mm: 1000, cm: 100, dm: 10, m: 1, km: 0.001 },
    dam: { mm: 1000, cm: 1000, dm: 100, m: 10, dam: 1, hm: 0.1, km: 0.01 },
    hm: { mm: 10000, cm: 10000, dm: 1000, m: 100, dam: 10, hm: 1, km: 0.1 },
    km: { mm: 1000000, cm: 100000, dm: 10000, m: 1000, km: 1 }
};
lengthBtn.onclick = function (event) {
    event.preventDefault();
    const input = document.getElementById('length-input').value;
    const fromUnit = document.getElementById('length-unit').value;
    const toUnit = document.getElementById('result-length-unit').value;
    const result = document.getElementById('result-length');
    result.value = input * lengthConversions[fromUnit][toUnit];
};
// ---------------------
const areaBtn = document.getElementById('surface-btn');
const areaConversions = {
    mm2: { mm2: 1, cm2: 0.01, dm2: 0.0001, m2: 0.000001, dam2: 1e-8, hm2: 1e-10, km2: 1e-12 },
    cm2: { mm2: 100, cm2: 1, dm2: 0.01, m2: 0.0001, dam2: 1e-6, hm2: 1e-8, km2: 1e-10 },
    dm2: { mm2: 10000, cm2: 100, dm2: 1, m2: 0.01, dam2: 0.0001, hm2: 1e-6, km2: 1e-8 },
    m2: { mm2: 1000000, cm2: 10000, dm2: 100, m2: 1, dam2: 0.01, hm2: 0.0001, km2: 0.000001 },
    dam2: { mm2: 1e8, cm2: 1e6, dm2: 10000, m2: 100, dam2: 1, hm2: 0.01, km2: 0.0001 },
    hm2: { mm2: 1e10, cm2: 1e8, dm2: 1e6, m2: 10000, dam2: 100, hm2: 1, km2: 0.01 },
    km2: { mm2: 1e12, cm2: 1e10, dm2: 1e8, m2: 1e6, dam2: 10000, hm2: 100, km2: 1 }
};
areaBtn.onclick = function (event) {
    event.preventDefault();
    const input = document.getElementById('surface-input').value;
    const fromUnit = document.getElementById('surface-unit').value;
    const toUnit = document.getElementById('result-surface-unit').value;
    const result = document.getElementById('result-surface');

    result.value = input * areaConversions[fromUnit][toUnit];
};
// ---------------------
const volumeBtn = document.getElementById('volume-btn');
const volumeConversions = {
    mm3: { mm3: 1, cm3: 0.001, dm3: 1e-6, m3: 1e-9, dam3: 1e-12, hm3: 1e-15, km3: 1e-18 },
    cm3: { mm3: 1000, cm3: 1, dm3: 0.001, m3: 1e-6, dam3: 1e-9, hm3: 1e-12, km3: 1e-15 },
    dm3: { mm3: 1e6, cm3: 1000, dm3: 1, m3: 0.001, dam3: 1e-6, hm3: 1e-9, km3: 1e-12 },
    m3: { mm3: 1e9, cm3: 1e6, dm3: 1000, m3: 1, dam3: 0.001, hm3: 1e-6, km3: 1e-9 },
    dam3: { mm3: 1e12, cm3: 1e9, dm3: 1e6, m3: 1000, dam3: 1, hm3: 0.001, km3: 1e-6 },
    hm3: { mm3: 1e15, cm3: 1e12, dm3: 1e9, m3: 1e6, dam3: 1000, hm3: 1, km3: 0.001 },
    km3: { mm3: 1e18, cm3: 1e15, dm3: 1e12, m3: 1e9, dam3: 1e6, hm3: 1000, km3: 1 }
}
volumeBtn.onclick = function (event) {
    event.preventDefault();
    const input = document.getElementById('volume-input').value;
    const answer = document.getElementById('result-volume');
    const optVolume = document.getElementById('volume-unit').value;
    const resVolume = document.getElementById('result-volume-unit').value;

    answer.value = input * volumeConversions[optVolume][resVolume];
}
// ---------------------
const weightBtn = document.getElementById('weight-btn');
const weightConversions = {
    mg: { mg: 1, g: 0.001, kg: 0.000001, t: 1e-9 },
    g: { mg: 1000, g: 1, kg: 0.001, t: 1e-6 },
    kg: { mg: 1000000, g: 1000, kg: 1, t: 0.001 },
    t: { mg: 1e9, g: 1e6, kg: 1000, t: 1 }
};
weightBtn.onclick = function () {
    event.preventDefault();
    const input = document.getElementById('weight-input');
    const answer = document.getElementById('result-weight');
    const optWeight = document.getElementById('weight-unit').value;
    const resWeight = document.getElementById('result-weight-unit').value;

    const conversionFactor = weightConversions[optWeight][resWeight];
    answer.value = input.value * conversionFactor;
};
// ---------------------
const temperatureBtn = document.getElementById('temperature-btn');
const temperatureConversions = {
    celsius: {
        celsius: (temp) => temp,
        fahrenheit: (temp) => temp * (9 / 5) + 32,
        kelvin: (temp) => temp + 273.15
    },
    fahrenheit: {
        celsius: (temp) => (temp - 32) * (5 / 9),
        fahrenheit: (temp) => temp,
        kelvin: (temp) => (temp - 32) * (5 / 9) + 273.15
    },
    kelvin: {
        celsius: (temp) => temp - 273.15,
        fahrenheit: (temp) => (temp - 273.15) * (9 / 5) + 32,
        kelvin: (temp) => temp
    }
};
temperatureBtn.onclick = function () {
    event.preventDefault();
    const input = parseFloat(document.getElementById('temperature-input').value);
    const answer = document.getElementById('result-temperature');
    const optTemperature = document.getElementById('temperature-unit').value;
    const resTemperature = document.getElementById('result-temperature-unit').value;
    answer.value = temperatureConversions[optTemperature][resTemperature](input);
};
// ---------------------
const timeBtn = document.getElementById('time-btn');
const timeConversions = {
    ms: { ms: 1, s: 0.001, min: 1 / 60000, h: 1 / 3600000, day: 1 / 86400000, week: 1 / 604800000 },
    s: { ms: 1000, s: 1, min: 1 / 60, h: 1 / 3600, day: 1 / 86400, week: 1 / 604800 },
    min: { ms: 60000, s: 60, min: 1, h: 1 / 60, day: 1 / 1440, week: 1 / 10080 },
    h: { ms: 3600000, s: 3600, min: 60, h: 1, day: 1 / 24, week: 1 / 168 },
    day: { ms: 86400000, s: 86400, min: 1440, h: 24, day: 1, week: 1 / 7 },
    week: { ms: 604800000, s: 604800, min: 10080, h: 168, day: 7, week: 1 }
};
timeBtn.onclick = function () {
    event.preventDefault();
    const input = document.getElementById('time-input');
    const answer = document.getElementById('result-time');
    const optTime = document.getElementById('time-unit');
    const resTime = document.getElementById('result-time-unit');


    timeBtn.onclick = function () {
        event.preventDefault();
        const input = document.getElementById('time-input');
        const answer = document.getElementById('result-time');
        const optTime = document.getElementById('time-unit').value;
        const resTime = document.getElementById('result-time-unit').value;

        const conversionFactor = timeConversions[optTime][resTime];
        answer.value = input.value * conversionFactor;
    };
}