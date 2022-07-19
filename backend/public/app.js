document.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && event.target.id === "save-cancel-input") {
    save(event.target.dataset.id, event.target.closest("li"));
  }
});
document.addEventListener("click", ({ target }) => {
  switch (target.dataset.type) {
    case "remove":
      {
        const id = target.dataset.id;

        remove(id).then(() => {
          target.closest("li").remove();
        });
      }
      break;

    case "edit":
      {
        const root = target.closest("li");
        revert(root);
        const input = root.querySelector("input");
        input.value = root.querySelector("span").innerText;
        input.select();
        input.focus();
      }
      break;
    case "cancel":
      {
        const root = target.closest("li");
        const input = root.querySelector("input");
        input.value = null;
        revert(root);
      }
      break;
    case "save":
      {
        save(target.dataset.id, target.closest("li"));
      }
      break;
    default:
      break;
  }
});

function save(id, root) {
  const input = root.querySelector("input");
  const title = input.value;
  if (title) {
    update({ id, title }).then(() => {
      input.value = null;
      revert(root);
      root.querySelector("span").innerText = title;
    });
  }
}

function revert(root) {
  for (const item of root.children) {
    if (item.style.display) {
      item.style.display = item.style.display === "block" ? "none" : "block";
    }
  }
}

async function update(newNote) {
  await fetch(`/${newNote.id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newNote),
  });
}

async function remove(id) {
  await fetch(`/${id}`, { method: "DELETE" });
}
