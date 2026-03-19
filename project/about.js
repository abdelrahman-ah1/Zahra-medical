

const devices = {
    "Candela Gentlemax Pro": "The Candela Gentlemax Pro is a dual-wavelength laser used for hair removal, skin rejuvenation, and vascular treatments. Fast and effective for all skin types.",
    "Cynosure ElitePlus": "Cynosure ElitePlus is a versatile laser system for hair removal and pigmentation treatments. It combines two wavelengths for optimal results.",
    "Zimmer Cryo 6": "Zimmer Cryo 6 is a cooling device that reduces pain and discomfort during laser or aesthetic procedures, enhancing patient comfort."
};


const modal = document.getElementById("deviceModal");
const modalName = document.getElementById("modalDeviceName");
const modalDesc = document.getElementById("modalDeviceDesc");
const closeBtn = document.querySelector(".close-btn");


document.querySelectorAll(".device-card").forEach(card => {
    card.addEventListener("click", () => {
        const deviceName = card.querySelector(".device-name").textContent;
        modalName.textContent = deviceName;
        modalDesc.textContent = devices[deviceName];
        modal.style.display = "block";
    });
});

closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
});


window.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});

