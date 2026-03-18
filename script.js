// Form submission
document.getElementById("form")?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        plan: document.getElementById("plan").value
    };

    await fetch("/register", {  // ✅ NO localhost
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

    alert("Registered Successfully!");
});

// Scroll animation
window.addEventListener("scroll", () => {
    document.querySelectorAll(".card").forEach(card => {
        const pos = card.getBoundingClientRect().top;
        if (pos < window.innerHeight - 100) {
            card.style.transform = "translateY(0)";
            card.style.opacity = 1;
        }
    });
});