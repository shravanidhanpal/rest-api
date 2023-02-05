document.getElementById("adminForm").addEventListener("submit", addProduct);
async function addProduct(e) {
  e.preventDefault();
  let type = document.getElementById("table").value;
  let name = document.getElementById("name").value;
  let amount = document.getElementById("amount").value;
  if (type !== "ChooseOne" && name.trim().length > 0 && amount > 0) {
    const product = {
      type,
      name,
      amount,
    };
    await axios
      .post(
        "https://crudcrud.com/api/762b0866c805492aabe4bcec16750ac1/productData",
        product
      )
      .then(() => {
        document.getElementById("adminForm").reset();
        showProducts();
      })
      .catch((error) => console.error(error));
  } else {
    console.error("All fields are required and amount must be greater than 0.");
  }
}

async function showProducts() {
  const productTables = [
    document.getElementById("foodItems"),
    document.getElementById("skinCare"),
    document.getElementById("electronicItems"),
  ];

  productTables.forEach((table) => {
    table.innerHTML = "";
  });

  await axios
    .get(
      "https://crudcrud.com/api/762b0866c805492aabe4bcec16750ac1/productData"
    )
    .then((response) => {
      response.data.forEach((product) => {
        let tableId;
        switch (product.type) {
          case "Food":
            tableId = "foodItems";
            break;
          case "Skin Care":
            tableId = "skinCare";
            break;
          case "Electronics":
            tableId = "electronicItems";
            break;
          default:
            tableId = "";
        }
        let table = document.getElementById(tableId);
        if (table) {
          table.innerHTML += `
                <tr>
                    <td><ul><li></li></ul></td>
                    <td>${product.name}</td>
                    <td>₹ ${product.amount}</td>
                    <td><button class="btn btn-danger" onclick="deleteProduct('${product._id}')">Delete</button></td>
                </tr>
            `;
        }
      });
    });
}

async function deleteProduct(_id) {
  await axios
    .delete(
      `https://crudcrud.com/api/762b0866c805492aabe4bcec16750ac1/productData/${_id}`
    )
    .then(showProducts);
}
showProducts();
