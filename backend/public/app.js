document.addEventListener("click", (event) => {
  if (event.target.dataset.type === "remove") {
    const id = event.target.dataset.id;

    remove(id).then(() => {
      event.target.closest("li").remove();
    });
  }

  if (event.target.dataset.type === "update") {
    const el = event.target.closest("li");
    const title = el.innerText.split("\n")[0];
    const newtitle = prompt("Введите новое название", title);
    if (newtitle) {
      const id = event.target.dataset.id;

      update(id, newtitle).then(() => {
        el.innerHTML = el.innerHTML.replace(title, newtitle);
      });
    }
  }
});

async function remove(id) {
  await fetch(`/${id}`, { method: "DELETE" });
}

async function update(id, title) {
  const data = { title };

  await fetch(`/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}
