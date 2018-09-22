if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("sw.js")
      .then(reg => {
        console.log("Service Worker: Registered ", reg.scope);
      })
      .catch(error => {
        console.log("Registration failed ", error);
      });
  });
}
