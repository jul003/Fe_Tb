function toggleSections(section) {
    
    const dashboardSection = document.getElementById('dashboardSection');
    const profileSection = document.getElementById('profileSection');

    
    if (section === 'dashboard') {
        dashboardSection.style.display = 'block';
        profileSection.style.display = 'none';
    }

    else if (section === 'profile') {
        dashboardSection.style.display = 'none';
        profileSection.style.display = 'block';
    }

}