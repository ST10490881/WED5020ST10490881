// GreenFuture SA - FAQ Interactive Feature

const faqButtons = document.querySelectorAll(".faq-toggle");

faqButtons.forEach(function (button) {
    button.addEventListener("click", function () {

        const answer = button.nextElementSibling;

        if (answer.hidden) {
            answer.hidden = false;
            button.textContent = "Hide Answer";
            button.setAttribute("aria-expanded", "true");
        } else {
            answer.hidden = true;
            button.textContent = "Show Answer";
            button.setAttribute("aria-expanded", "false");
        }

    });
});
// GreenFuture SA - Project Search

const projectSearch = document.getElementById("project-search");
const searchMessage = document.getElementById("search-message");

if (projectSearch) {
    projectSearch.addEventListener("keyup", function () {
        const searchTerm = projectSearch.value.toLowerCase();
        const sections = document.querySelectorAll("main section");

        let found = 0;

        sections.forEach(function (section, index) {
            // Keep the first section (Our Projects) visible
            if (index === 0) return;

            if (section.textContent.toLowerCase().includes(searchTerm)) {
                section.style.display = "block";
                found++;
            } else {
                section.style.display = "none";
            }
        });

        if (searchTerm === "") {
            sections.forEach(function (section) {
                section.style.display = "block";
            });
            searchMessage.textContent = "";
        } else if (found === 0) {
            searchMessage.textContent = "No matching projects found.";
        } else {
            searchMessage.textContent = found + " matching section(s) found.";
        }
    });
}
// GreenFuture SA - Volunteer Form Validation

const volunteerForm = document.getElementById("volunteer-form");
const volunteerFeedback = document.getElementById("volunteer-feedback");

if (volunteerForm && volunteerFeedback) {
    volunteerForm.addEventListener("submit", function (event) {
        event.preventDefault();

        if (!volunteerForm.checkValidity()) {
            volunteerForm.reportValidity();
            return;
        }

        const volunteerName = document
            .getElementById("volunteer-name")
            .value.trim();

        volunteerFeedback.textContent =
            "Thank you, " + volunteerName +
            "! Your volunteer enquiry has passed validation. " +
            "Please contact GreenFuture SA directly to arrange submission.";

        volunteerForm.reset();
    });
}
// GreenFuture SA - Sponsor Form Validation

const sponsorForm = document.getElementById("sponsor-form");
const sponsorFeedback = document.getElementById("sponsor-feedback");

if (sponsorForm && sponsorFeedback) {
    sponsorForm.addEventListener("submit", function (event) {
        event.preventDefault();

        if (!sponsorForm.checkValidity()) {
            sponsorForm.reportValidity();
            return;
        }

        const sponsorName = document
            .getElementById("sponsor-name")
            .value.trim();

        sponsorFeedback.textContent =
            "Thank you, " + sponsorName +
            "! Your sponsorship enquiry has passed validation. " +
            "Please contact GreenFuture SA directly to arrange submission.";

        sponsorForm.reset();
    });
}
// GreenFuture SA - Contact Form Validation and Email Preparation

const contactForm = document.getElementById("contact-form");
const contactFeedback = document.getElementById("contact-feedback");

if (contactForm && contactFeedback) {
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        if (!contactForm.checkValidity()) {
            contactForm.reportValidity();
            return;
        }

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const messageType = document.getElementById("message-type").value;
        const message = document.getElementById("message").value.trim();

        const recipient = "ST10490881@rcconnect.edu.zas";
        const subject = encodeURIComponent(
            "GreenFuture SA - " + messageType
        );

        const body = encodeURIComponent(
            "Name: " + name + "\n" +
            "Email: " + email + "\n" +
            "Message type: " + messageType + "\n\n" +
            "Message:\n" + message
        );

        contactFeedback.textContent =
            "Your details are ready. Your email application will open so you can review and send your message.";

        window.location.href =
            "mailto:" + recipient +
            "?subject=" + subject +
            "&body=" + body;
    });
}
}
/* Image lightbox for GreenFuture SA */
document.addEventListener("DOMContentLoaded", function () {
    const images = document.querySelectorAll("main img");

    const lightbox = document.createElement("div");
    lightbox.id = "image-lightbox";
    lightbox.style.cssText = `
        display: none;
        position: fixed;
        z-index: 9999;
        inset: 0;
        background: rgba(0, 0, 0, 0.9);
        justify-content: center;
        align-items: center;
        padding: 20px;
        cursor: pointer;
    `;

    const enlargedImage = document.createElement("img");
    enlargedImage.style.cssText = `
        max-width: 90%;
        max-height: 85vh;
        object-fit: contain;
        border: 3px solid white;
        border-radius: 8px;
    `;

    lightbox.appendChild(enlargedImage);
    document.body.appendChild(lightbox);

    images.forEach(function (image) {
        image.style.cursor = "zoom-in";
        image.addEventListener("click", function () {
            enlargedImage.src = image.src;
            enlargedImage.alt = image.alt;
            lightbox.style.display = "flex";
        });
    });

    lightbox.addEventListener("click", function () {
        lightbox.style.display = "none";
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            lightbox.style.display = "none";
        }
    });
});