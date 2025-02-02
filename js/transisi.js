function toggleSections(section) {
    const dashboardSection = document.getElementById('dashboardSection');
    const profileSection = document.getElementById('profileSection');
    const dashButton = document.getElementById('buttonData');
    const dataButton = document.getElementById('profileButtons');

    if (section === 'dashboard') {
        dashboardSection.style.display = 'block';
        profileSection.style.display = 'none';
        dataButton.className = 'middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg text-white hover:bg-white/10 active:bg-white/30 w-full flex items-center gap-4 px-4 capitalize';
        dashButton.className = 'middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85] w-full flex items-center gap-4 px-4 capitalize';
    } else if (section === 'profile') {
        dashboardSection.style.display = 'none';
        profileSection.style.display = 'block';
        dataButton.className = 'middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85] w-full flex items-center gap-4 px-4 capitalize';
        dashButton.className = 'middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg text-white hover:bg-white/10 active:bg-white/30 w-full flex items-center gap-4 px-4 capitalize';
    }
}

function logout() {
    sessionStorage.clear();
    alert("Anda telah keluar.");
    window.location.href = "index.html";
}
