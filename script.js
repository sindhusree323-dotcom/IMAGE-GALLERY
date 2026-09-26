// ===============================
// SELECT ELEMENTS
// ===============================

const galleryItems = document.querySelectorAll(".gallery-item");

const filterButtons = document.querySelectorAll(".filter-btn");

const lightbox = document.getElementById("lightbox");

const lightboxImage = document.getElementById("lightboxImage");

const lightboxTitle = document.getElementById("lightboxTitle");

const lightboxCategory = document.getElementById("lightboxCategory");

const closeBtn = document.getElementById("closeBtn");

const prevBtn = document.getElementById("prevBtn");

const nextBtn = document.getElementById("nextBtn");


// ===============================
// VARIABLES
// ===============================

let visibleImages = [];

let currentIndex = 0;


// ===============================
// FILTER IMAGES
// ===============================

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        // Remove active class
        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        // Add active class
        button.classList.add("active");

        const filter = button.getAttribute("data-filter");

        galleryItems.forEach(item => {

            const category = item.getAttribute("data-category");

            if (filter === "all" || category === filter) {

                item.style.display = "block";

            } else {

                item.style.display = "none";

            }

        });

    });

});


// ===============================
// GET VISIBLE IMAGES
// ===============================

function updateVisibleImages() {

    visibleImages = Array.from(galleryItems).filter(item => {

        return item.style.display !== "none";

    });

}


// ===============================
// OPEN LIGHTBOX
// ===============================

galleryItems.forEach(item => {

    item.addEventListener("click", () => {

        updateVisibleImages();

        currentIndex = visibleImages.indexOf(item);

        showImage(currentIndex);

        lightbox.classList.add("show");

        // Prevent background scrolling
        document.body.style.overflow = "hidden";

    });

});


// ===============================
// SHOW IMAGE
// ===============================

function showImage(index) {

    if (visibleImages.length === 0) {
        return;
    }

    // Loop back to beginning
    if (index < 0) {

        currentIndex = visibleImages.length - 1;

    }

    // Loop to beginning
    else if (index >= visibleImages.length) {

        currentIndex = 0;

    }

    else {

        currentIndex = index;

    }


    const selectedItem = visibleImages[currentIndex];

    const image = selectedItem.querySelector("img");

    const title = selectedItem.querySelector("h3");

    const category = selectedItem.querySelector("p");


    lightboxImage.src = image.src;

    lightboxImage.alt = image.alt;

    lightboxTitle.textContent = title.textContent;

    lightboxCategory.textContent = category.textContent;

}


// ===============================
// NEXT IMAGE
// ===============================

nextBtn.addEventListener("click", (event) => {

    event.stopPropagation();

    showImage(currentIndex + 1);

});


// ===============================
// PREVIOUS IMAGE
// ===============================

prevBtn.addEventListener("click", (event) => {

    event.stopPropagation();

    showImage(currentIndex - 1);

});


// ===============================
// CLOSE LIGHTBOX
// ===============================

function closeLightbox() {

    lightbox.classList.remove("show");

    document.body.style.overflow = "auto";

}

closeBtn.addEventListener("click", closeLightbox);


// ===============================
// CLICK OUTSIDE IMAGE
// ===============================

lightbox.addEventListener("click", (event) => {

    if (event.target === lightbox) {

        closeLightbox();

    }

});


// ===============================
// KEYBOARD CONTROLS
// ===============================

document.addEventListener("keydown", (event) => {

    if (!lightbox.classList.contains("show")) {
        return;
    }


    if (event.key === "Escape") {

        closeLightbox();

    }


    if (event.key === "ArrowRight") {

        showImage(currentIndex + 1);

    }


    if (event.key === "ArrowLeft") {

        showImage(currentIndex - 1);

    }

});
