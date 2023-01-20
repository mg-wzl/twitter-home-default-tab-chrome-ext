// Saves options to chrome.storage
function save_options() {
  var defaultTabText = document.getElementById("tabText").value;
  chrome.storage.sync.set(
    {
      defaultTabText,
    },
    () => {
      var status = document.getElementById("status");
      status.textContent = "Options saved.";
      setTimeout(() => {
        status.textContent = "";
      }, 750);
    }
  );
}

function restore_options() {
  chrome.storage.sync.get(
    {
      defaultTabText: "Following",
    },
    (items) => {
      document.getElementById("tabText").value = items.defaultTabText;
    }
  );
}

document.addEventListener("DOMContentLoaded", restore_options);
document.getElementById("save").addEventListener("click", save_options);
