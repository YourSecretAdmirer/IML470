document.addEventListener("DOMContentLoaded", () => {
  const darkToggleBtn = document.getElementById("toggle-dark-float");

  // Check and apply stored preference
  const darkModeEnabled = localStorage.getItem("darkMode") === "true";
  if (darkModeEnabled) {
    document.body.classList.add("dark-mode");
  }

  // Set initial button label
  updateToggleLabel();

  // Click event for toggle
  if (darkToggleBtn) {
    darkToggleBtn.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");

      // Save preference
      const isDark = document.body.classList.contains("dark-mode");
      localStorage.setItem("darkMode", isDark);

      updateToggleLabel();
    });
  }

  function updateToggleLabel() {
    const isDark = document.body.classList.contains("dark-mode");
    if (darkToggleBtn) {
      darkToggleBtn.textContent = isDark ? "Light" : "Dark";
    }
  }

  // Animate sections on scroll
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll("section").forEach(section => {
    observer.observe(section);
  });

  // Floating welcome message
  const welcomeMsg = document.getElementById("chat-welcome");
  if (welcomeMsg) {
    setTimeout(() => welcomeMsg.classList.add("show"), 2000);
    setTimeout(() => welcomeMsg.classList.remove("show"), 8000);
  }

  // Chat toggle
  const chatToggle = document.getElementById("chat-toggle");
  const chatBox = document.getElementById("chat-box");
  if (chatToggle && chatBox) {
    chatToggle.addEventListener("click", () => {
      chatBox.classList.toggle("hidden");
    });
  }

  // Chat form response
  const chatForm = document.getElementById("chat-form");
  const chatMessages = document.getElementById("chat-messages");
  const userInput = document.getElementById("user-input");

  if (chatForm && chatMessages && userInput) {
    chatForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = userInput.value.trim();
      if (!input) return;

      addMessage("You", input);
      addMessage("Auralis Assistant", getBotReply(input));

      userInput.value = "";
      chatMessages.scrollTop = chatMessages.scrollHeight;
    });
  }

  function addMessage(sender, text) {
    const div = document.createElement("div");
    div.textContent = `${sender}: ${text}`;
    chatMessages.appendChild(div);
  }

  function getBotReply(msg) {
    msg = msg.toLowerCase();
    if (msg.includes("hello") || msg.includes("hi")) {
      return "Hi there! How can I assist you at Auralis Library?";
    } else if (msg.includes("farah") || msg.includes("librarian")) {
      return "Farah Hana is our Systems & Collections Manager. She's amazing!";
    } else if (msg.includes("library")) {
      return "Auralis Library is a futuristic space for drama, storytelling, VR, and more.";
    } else if (msg.includes("bye")) {
      return "Goodbye! Come visit the library again soon.";
    } else {
      return "I'm not sure how to help with that. Try asking about the library or the librarian.";
    }
  }
});
