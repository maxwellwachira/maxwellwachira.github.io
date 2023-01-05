const mySlider = document.getElementById("my-slider");
const sliderValue = document.getElementById("slider-value");
const monthlyCost = document.getElementById("monthly-cost");
const normalCost = document.getElementById("normal-cost");
const contacts = document.getElementById("contacts");
const emailSends = document.getElementById("email-sends");
const moreFeatures = document.getElementById("more-features");
const tooltip = document.getElementById("tooltip");

const numberWithCommas = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const computeEmailAndCost = () => {
    const value = Number(mySlider.value);
    const emailSends = value === 500 ? 0 : value * 5;
    const normally = value === 500 ? 0.00 : value === 1000 ? 25.00 : 25.00 + ((value / 500) - 2) * 2.5;
    const monthlyCost = normally * 0.7;
    return {
        emailSends,
        monthlyCost: monthlyCost.toFixed(2),
        normally: normally.toFixed(2)
    }
}

const featuresList = () => {
    const value = Number(mySlider.value);
    if (value >= 0 && value <= 50000) return (`<li>Community and email support</li>`);
    else if (value > 50000 && value <= 100000) return (

        `<li>Community, email and Zoom support</li>
        <li>Personalised onboarding</li>
        <li>Team training sessions</li>`

    )
    return (

        `<li>Community, email and Zoom support</li>
        <li>Personalised onboarding</li>
        <li>Team training sessions</li>
        <li>Hands-on migration support</li>
        <li>Dedicated success coach</li>
       `
    )
}

const computeOffset = (value) => {
    if(value >= 500 && value <= 40000) return 35;
    else if (value > 40000 && value <= 110000) return 33;
    else if (value > 110000 && value <= 200000) return 30;
    else if (value > 200000 && value <= 350000) return 25;
    return 20;
}

const slider = () => {
    const value = Number(mySlider.value);
    const valPercent = (value / mySlider.max) * 100;
    mySlider.style.background = `linear-gradient(to right, black ${valPercent}%, #d5d5d5 ${valPercent}%)`;
    const width = mySlider.clientWidth - 15;
    const offset = computeOffset(value);
    const position = width * (valPercent / 100) + offset;
    tooltip.style.marginLeft = `${position}px`;
    sliderValue.textContent = numberWithCommas(value);
    monthlyCost.textContent = numberWithCommas(computeEmailAndCost().monthlyCost);
    normalCost.textContent = numberWithCommas(computeEmailAndCost().normally);
    emailSends.textContent = numberWithCommas(computeEmailAndCost().emailSends);
    contacts.textContent = numberWithCommas(value);
    moreFeatures.innerHTML = featuresList();
}

window.onload = () => {
    slider();
}
