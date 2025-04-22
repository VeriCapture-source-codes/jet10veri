document.addEventListener('DOMContentLoaded', function() {
    // Get all profile image elements
    const navProfileImg = document.querySelector('.ellipse-img');
    const profilePageImg = document.querySelector('.ellipse-img6');
    const imagePreview = document.getElementById('image-preview');
    const imageUpload = document.getElementById('image-upload');
    
    // Current user data (in a real app, this would come from your backend/database)
    let currentUser = {
        image: "./assets/image/Rectangle 28.png" // Default image path
    };
    
    // Function to update all profile images
    function updateProfileImages(newImageSrc) {
        // Update navigation bar image
        if (navProfileImg) {
            navProfileImg.src = newImageSrc;
        }
        
        // Update profile page image
        if (profilePageImg) {
            profilePageImg.src = newImageSrc;
        }
        
        // Update in the modal preview
        if (imagePreview) {
            imagePreview.src = newImageSrc;
        }
        
        // Update current user data
        currentUser.image = newImageSrc;
        
        
        // saveToBackend(currentUser);
    }
    
    // Handle image upload in the modal
    if (imageUpload) {
        imageUpload.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    // Update all instances of the profile image
                    updateProfileImages(event.target.result);
                };
                reader.readAsDataURL(file);
            }
        });
    }
    
    // Initialize all images with the current user's image
    updateProfileImages(currentUser.image);
    
    // button to change the image (like in your profile page)
    const changeImageBtn = document.querySelector('.change-image-btn');
    if (changeImageBtn) {
        changeImageBtn.addEventListener('click', function() {
            // Trigger the file input click
            imageUpload.click();
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const changeImageBtn = document.getElementById('change-image-btn');
    const editNameBtn = document.getElementById('edit-name-btn');
    const editContactBtn = document.getElementById('edit-contact-btn');
    const editAddressBtn = document.getElementById('edit-address-btn');
    
    // Modal elements
    const profileImageModal = document.getElementById('profile-image-modal');
    const editNameModal = document.getElementById('edit-name-modal');
    const editContactModal = document.getElementById('edit-contact-modal');
    const editAddressModal = document.getElementById('edit-address-modal');
    
    // Close buttons
    const closeImageModal = document.getElementById('close-image-modal');
    const closeNameModal = document.getElementById('close-name-modal');
    const closeContactModal = document.getElementById('close-contact-modal');
    const closeAddressModal = document.getElementById('close-address-modal');
    
    // Save buttons
    const saveImageBtn = document.getElementById('save-image');
    const saveNameBtn = document.getElementById('save-name');
    const saveContactBtn = document.getElementById('save-contact');
    const saveAddressBtn = document.getElementById('save-address');
    
    // Image upload
    const imageUpload = document.getElementById('image-upload');
    const imagePreview = document.getElementById('image-preview');
    const profileImg = document.getElementById('profile-img');
    
    // Profile elements
    const profileName = document.getElementById('profile-name');
    const profileLocation = document.getElementById('profile-location');
    
    // Contact info elements
    const email = document.getElementById('email');
    const gender = document.getElementById('gender');
    
    // Address elements
    const country = document.getElementById('country');
    const state = document.getElementById('state');
    const town = document.getElementById('town');
    
    // Form elements
    const editFirstName = document.getElementById('edit-first-name');
    const editMiddleName = document.getElementById('edit-middle-name');
    const editLastName = document.getElementById('edit-last-name');
    const editEmail = document.getElementById('edit-email');
    const editGender = document.getElementById('edit-gender');
    const editCountry = document.getElementById('edit-country');
    const editState = document.getElementById('edit-state');
    const editTown = document.getElementById('edit-town');
    
    // Current user data
    let currentUser = {
        firstName: "",
        middleName: "",
        lastName: "",
        image: "https://via.placeholder.com/80",
        email: "",
        gender: "",
        country: "",
        state: "",
        town: ""
    };
    
    // Initialize the profile
    function initializeProfile() {
        // Set profile image
        profileImg.src = currentUser.image;
        imagePreview.src = currentUser.image;
        
        // Set profile name
        updateProfileName();
        
        // Set contact info
        email.textContent = currentUser.email;
        gender.textContent = currentUser.gender;
        
        // Set address
        country.textContent = currentUser.country;
        state.textContent = currentUser.state;
        town.textContent = currentUser.town;
        
        // Update location display
        updateLocation();
    }
    
    // Update profile name display
    function updateProfileName() {
        profileName.textContent = `${currentUser.firstName} ${currentUser.middleName} ${currentUser.lastName}`;
    }
    
    // Update location display
    function updateLocation() {
        profileLocation.textContent = `${currentUser.town} ${currentUser.state}, ${currentUser.country}`;
    }
    
    // Open modals
    changeImageBtn.addEventListener('click', () => {
        profileImageModal.style.display = 'flex';
    });
    
    editNameBtn.addEventListener('click', () => {
        editFirstName.value = currentUser.firstName;
        editMiddleName.value = currentUser.middleName;
        editLastName.value = currentUser.lastName;
        editNameModal.style.display = 'flex';
    });
    
    editContactBtn.addEventListener('click', () => {
        editEmail.value = currentUser.email;
        editGender.value = currentUser.gender;
        editContactModal.style.display = 'flex';
    });
    
    editAddressBtn.addEventListener('click', () => {
        editCountry.value = currentUser.country;
        editState.value = currentUser.state;
        editTown.value = currentUser.town;
        editAddressModal.style.display = 'flex';
    });
    
    // Close modals
    closeImageModal.addEventListener('click', () => {
        profileImageModal.style.display = 'none';
    });
    
    closeNameModal.addEventListener('click', () => {
        editNameModal.style.display = 'none';
    });
    
    closeContactModal.addEventListener('click', () => {
        editContactModal.style.display = 'none';
    });
    
    closeAddressModal.addEventListener('click', () => {
        editAddressModal.style.display = 'none';
    });
    
    // Close modals when clicking outside
    profileImageModal.addEventListener('click', (e) => {
        if (e.target === profileImageModal) {
            profileImageModal.style.display = 'none';
        }
    });
    
    editNameModal.addEventListener('click', (e) => {
        if (e.target === editNameModal) {
            editNameModal.style.display = 'none';
        }
    });
    
    editContactModal.addEventListener('click', (e) => {
        if (e.target === editContactModal) {
            editContactModal.style.display = 'none';
        }
    });
    
    editAddressModal.addEventListener('click', (e) => {
        if (e.target === editAddressModal) {
            editAddressModal.style.display = 'none';
        }
    });
    
    // Handle image upload
    imageUpload.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                imagePreview.src = event.target.result;
            };
            reader.readAsDataURL(file);
        }
    });
    
    // Save profile image
    saveImageBtn.addEventListener('click', () => {
        if (imageUpload.files[0]) {
            const reader = new FileReader();
            reader.onload = (event) => {
                currentUser.image = event.target.result;
                profileImg.src = currentUser.image;
                profileImageModal.style.display = 'none';
            };
            reader.readAsDataURL(imageUpload.files[0]);
        } else {
            profileImageModal.style.display = 'none';
        }
    });
    
    // Save name changes
    saveNameBtn.addEventListener('click', () => {
        currentUser.firstName = editFirstName.value || currentUser.firstName;
        currentUser.middleName = editMiddleName.value || currentUser.middleName;
        currentUser.lastName = editLastName.value || currentUser.lastName;
        
        updateProfileName();
        editNameModal.style.display = 'none';
    });
    
    // Save contact info changes
    saveContactBtn.addEventListener('click', () => {
        currentUser.email = editEmail.value || currentUser.email;
        currentUser.gender = editGender.value || currentUser.gender;
        
        email.textContent = currentUser.email;
        gender.textContent = currentUser.gender;
        
        editContactModal.style.display = 'none';
    });
    
    // Save address changes
    saveAddressBtn.addEventListener('click', () => {
        currentUser.country = editCountry.value || currentUser.country;
        currentUser.state = editState.value || currentUser.state;
        currentUser.town = editTown.value || currentUser.town;
        
        country.textContent = currentUser.country;
        state.textContent = currentUser.state;
        town.textContent = currentUser.town;
        
        updateLocation();
        editAddressModal.style.display = 'none';
    });
    
    // Initialize the page
    initializeProfile();
});


document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    
    document.querySelector('.menu-toggle').addEventListener('click', function() {
        document.querySelector('.sidebar').classList.toggle('active');
      });
  });