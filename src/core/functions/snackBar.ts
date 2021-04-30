const showSnackBar = (message: String) => {
  let snackBar: HTMLDivElement = document.createElement("div");
  snackBar.classList.add("snack-bar");
  snackBar.id = "snack-bar";
  snackBar.innerHTML = `
    <span>${message}</span><div id="snack-close">close</div>
  `;

  const closeSnackBar = (e) => {
    if (e.target.id === "snack-close") {
      clear();
    }
  };

  const clear = () => {
    document.body.removeChild(snackBar);
    document.removeEventListener<"click">("click", closeSnackBar);
  };

  //document.addEventListener<"click">("click", closeSnackBar);
  setTimeout(clear, 5000);
  document.body.appendChild(snackBar);
};

export default showSnackBar;
