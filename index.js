function allCategory() {
  allCategoryVideoID("1000");
  fetch("https://openapi.programming-hero.com/api/videos/categories")
    .then((response) => response.json())
    .then((json) => allCategoryName(json.data));
}



function allCategoryName(data) {
  const allCategory = document.getElementById("all_category");
  for (let name of data) {
    const div = document.createElement("div");
    div.innerHTML = `
    <button onclick="allCategoryVideoID('${name.category_id}')" class="btn btn-error text-white">${name.category}</button>
    `;
    allCategory.appendChild(div);
  }
  for (let id of data) {
    data = allCategoryVideoID(id);
  }
}



allCategory();

function allCategoryVideoID(id) {
  fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`)
    .then((response) => response.json())
    .then((json) => videosData(json));
  const videoCard = document.getElementById("video_card");
  videoCard.innerHTML = "";
}

function videosData(data) {
  console.log(data.data.length);
  const videoCard = document.getElementById("video_card");

  if (data.data.length == 0) {
    const noData = document.getElementById("no_data");
    noData.classList.remove("hidden");
  } else {
    const noData = document.getElementById("no_data");
    noData.classList.add("hidden");

    for (let video of data.data) {

      let time = video.others.posted_date;
      let updatetime = secondsIntoMint(time);

      const div = document.createElement("div");
      div.innerHTML = `
  <div class="card bg-base-100">
                    <figure class="px-5 pt-10">
                        <img class="rounded-lg w-96 h-40" src="${
                          video.thumbnail
                        }" alt="Shoes" class="rounded-xl"/>
                    </figure>

                    <!-- Start Video Time -->
                    <div class="absolute p-1 bg-[#171717] rounded top-40 left-64 md:top-40 md:left-52 lg:top-40 lg:left-24 xl:top-40 xl:left-44">
                        <h2 class="text-xs text-white">${updatetime}</h2>
                    </div>

                    <!--Video Logo & Title Section -->
                    <div class="flex gap-2 collapse-title justify-start  md:justify-center">
                        <div class="items-start">
                            <img class="rounded-full w-14 h-14" src="${
                              video.authors[0].profile_picture
                            }" alt="">
                        </div>
                        <div class="items-start text-start">
                            <h2 class="card-title text-base font-bold">${
                              video.title
                            }</h2>
                            <div class="flex gap-1">
                                <p class="text-sm text-[#171717b3] leading-loose">${
                                  video.authors[0].profile_name
                                }</p>
                                ${
                                  video.authors[0].verified === true
                                    ? '<img src="./img/verify.svg" alt="">'
                                    : ""
                                }
                            </div>
                            <p class="text-sm text-[#171717b3]">${
                              video.others.views
                            }</p>
                        </div>
                    </div>

                </div>
  `;

      videoCard.appendChild(div);
    }
  }
}

// Second To Hour
function secondsIntoMint(second) {
  second = Number(second);
  let hour = Math.floor(second / 3600);
  let minute = Math.floor((second % 3600) / 60);

  let hDisplay = hour > 0 ? hour + (hour == 1 ? " hour, " : " hrs ") : "";
  let mDisplay =
    minute > 0 ? minute + (minute == 1 ? " minute, " : " min ago") : "";
  return hDisplay + mDisplay;
}