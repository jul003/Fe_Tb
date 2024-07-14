function toggleSections(section) {
    
    const profileSection = document.getElementById('profileSection');
    const gadgetSection = document.getElementById('gadgetSection');
    
    if (section === 'profile') {
        
        profileSection.style.display = 'block';
        gadgetSection.style.display = 'none';
        
    }

    else if (section === 'gadget') {
        gadgetSection.style.display = 'block';
        profileSection.style.display = 'none';

    }
    

}