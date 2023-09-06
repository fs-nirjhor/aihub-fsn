
(async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/ai/tools"
  );
  const result = await response.json();
  const data = result.data.tools;
  if (data) {
    const idsToRemove = ['06', '11', '02', '05', '08', '09'];
    const filterData = data.filter(item => !idsToRemove.includes(item.id));
    const toolsSection = document.getElementById("tools");
    toolsSection.innerHTML = filterData
      .map((tool) => {
        const { image, name, features, published_in, id } = tool;
        return `<div class="col"> 
      <figure class="card h-100 p-3">
        <img src=${image} class="card-img-top rounded" alt=${name}>
        <div class="card-body">
          <figcaption class="card-title fw-semibold h5">Features</figcaption>
          <ol class="card-text">
          ${features.map((feature) => `<li>${feature}</li>`).join("")}
          </ol>
        </div>
        <div class="card-footer bg-white d-flex justify-content-between align-items-center">
        <div>
        <figcaption class="card-title fw-semibold h5">${name}</figcaption>
        <small class="text-body-secondary"><i class="bi bi-calendar3"></i> ${published_in}</small>
        </div>
      <i class="bi bi-arrow-right btn d-block h5  text-danger bg-danger bg-opacity-10 rounded-circle p-2" onclick="handleDetails('${id}')"></i>
    </div>
      </figure>
    </div>`;
      })
      .join("");
  }
})().catch((error) => alert(error.message));

const handleDetails = async (id) => {
  try {
    const response = await fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`);
    const result = await response.json();
    const data = result.data;
    console.log(data)
    if (data) {
      const {description, features, integrations, image_link, tool_name} = data;
      document.getElementById("description").textContent = data.description;
      // const one = '1';
      // const two = '2';
      // const three = '3';
      // document.getElementById("features").innerHTML = `<ul>
      // <li>${features.one.feature_name}</li>
      // <li>${features.two.feature_name}</li>
      // <li>${features.three.feature_name}</li>
      // </ul>`;
      document.getElementById("integrations").innerHTML = integrations.map((integration) => `<li>${integration}</li>`).join("");
      document.getElementById("image").setAttribute("src", image_link);
      document.getElementById("image").setAttribute("alt", tool_name);
      
      const floatingBox = new bootstrap.Modal(document.getElementById("floating-box"));
      floatingBox.show();
      }
  } catch (error) {
    alert(error.message);
  }
}
const closeModal = () => {
  const floatingBox = new bootstrap.Modal(document.getElementById("floating-box"));
      floatingBox.hide();
}
