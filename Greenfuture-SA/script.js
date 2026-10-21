/* GreenFuture SA - Complete JavaScript */

/* 1. Project search, FAQ and image lightbox */
document.addEventListener("DOMContentLoaded", function () {

    // Project search
    const searchInput = document.getElementById("project-search");
    const searchMessage = document.getElementById("search-message");

    if (searchInput) {
        searchInput.addEventListener("input", function () {
            const query = searchInput.value.trim().toLowerCase();
            const sections = document.querySelectorAll("main section");
            let matches = 0;

            sections.forEach(function (section, index) {
                if (index === 0) {
                    section.hidden = false;
                    return;
                }

                const match = section.textContent.toLowerCase().includes(query);
                section.hidden = query !== "" && !match;

                if (query === "" || match) {
                    matches++;
                }
            });

            if (searchMessage) {
                searchMessage.textContent = query === ""
                    ? ""
                    : matches === 0
                        ? "No matching projects found."
                        : matches + " matching section(s) found.";
            }
        });
    }

    // FAQ show and hide
    document.querySelectorAll(".faq-toggle").forEach(function (button) {
        button.addEventListener("click", function () {
            const answer = button.nextElementSibling;

            if (!answer) return;

            const opening = answer.hidden;
            answer.hidden = !opening;
            button.setAttribute("aria-expanded", String(opening));
        });
    });

    // Image lightbox
    const images = document.querySelectorAll("main img");
    const lightbox = document.createElement("div");

    lightbox.id = "image-lightbox";
    lightbox.style.cssText =
        "display:none;position:fixed;z-index:9999;inset:0;" +
        "background:rgba(0,0,0,.9);justify-content:center;" +
        "align-items:center;padding:20px;cursor:pointer;";

    const enlargedImage = document.createElement("img");
    enlargedImage.style.cssText =
        "max-width:90%;max-height:85vh;object-fit:contain;" +
        "border:3px solid white;border-radius:8px;";

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


/* 2. Volunteer form */
const volunteerForm = document.getElementById("volunteer-form");
const volunteerFeedback = document.getElementById("volunteer-feedback");

if (volunteerForm && volunteerFeedback) {
    volunteerForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        if (!volunteerForm.checkValidity()) {
            volunteerForm.reportValidity();
            return;
        }

        const formData = new FormData(volunteerForm);

        try {
            const response = await fetch("/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: new URLSearchParams(formData).toString()
            });

            if (!response.ok) {
                throw new Error("Submission failed");
            }

            const name = document.getElementById("volunteer-name").value.trim();

            volunteerFeedback.textContent =
                "Thank you, " + name +
                "! Your volunteer enquiry has been submitted successfully.";

            volunteerForm.reset();
        } catch (error) {
            volunteerFeedback.textContent =
                "Sorry, your enquiry could not be submitted. Please try again later.";
        }
    });
}


/* 3. Sponsor form */
const sponsorForm = document.getElementById("sponsor-form");
const sponsorFeedback = document.getElementById("sponsor-feedback");

if (sponsorForm && sponsorFeedback) {
    sponsorForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        if (!sponsorForm.checkValidity()) {
            sponsorForm.reportValidity();
            return;
        }

        const formData = new FormData(sponsorForm);

        try {
            const response = await fetch("/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: new URLSearchParams(formData).toString()
            });

            if (!response.ok) {
                throw new Error("Submission failed");
            }

            const name = document.getElementById("sponsor-name").value.trim();

            sponsorFeedback.textContent =
                "Thank you, " + name +
                "! Your sponsorship enquiry has been submitted successfully.";

            sponsorForm.reset();
        } catch (error) {
            sponsorFeedback.textContent =
                "Sorry, your sponsorship enquiry could not be submitted. Please try again later.";
        }
    });
}


/* 4. Contact form - prepare an email */
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

        const recipient = "ST10490881@rcconnect.edu.za";

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
            "Opening your email application. Review the message before sending.";

        window.location.href =
            "mailto:" + recipient +
            "?subject=" + subject +
            "&body=" + body;
    });
}