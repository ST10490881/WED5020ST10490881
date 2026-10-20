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
// GreenFuture SA - Contact Form Validation

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
        const messageType = document.getElementById("message-type").value;

        contactFeedback.textContent =
            "Thank you, " + name + "! Your " +
            messageType.toLowerCase() +
            " has passed validation. Please contact GreenFuture SA directly to arrange submission.";

        contactForm.reset();
    });
}