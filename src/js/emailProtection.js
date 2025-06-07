document.addEventListener("DOMContentLoaded", function() {
    const emailLink = document.getElementById("email-link");
    const encryptedEmail = "bWVAZHVkb3NhLmRldg==";
    const decryptedEmail = atob(encryptedEmail);

    emailLink.href = `mailto:${decryptedEmail}`;
});
