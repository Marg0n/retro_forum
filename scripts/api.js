const latestPost = async () => {
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/latest-posts`);
    const data = await res.json();
    displayLatestPosts(data);
}

const displayLatestPosts = posts => {

    posts.forEach(post => {

        const latestPostContainer = document.getElementById('latestPostContainer');

        const cardsDiv = document.createElement('div');
        cardsDiv.classList = `card w-96 bg-base-100 shadow-xl`;
        cardsDiv.innerHTML = `
        <figure>
              <img
                src="${post.cover_image}"
                alt="Shoes"
              />
            </figure>
            <div class="card-body">
              <div class="flex gap-4 items-center">
                <i class="fa-regular fa-calendar"></i>
                <p class="text-base" id="latestPostDate">${post.author?.posted_date || "No publish date"}</p>
              </div>
              <h2 class="card-title">
                ${post.title}
              </h2>
              <p>${post.description}</p>
              <div class="flex gap-4">
                <div
                  class="border rounded-full w-14 bg-contain bg-slate-600 bg-no-repeat bg-center"
                  style="background-image: url(${post.profile_image})"
                ></div>
                <div>
                  <p class="text-xl font-bold">${post.author.name}</p>
                  <p class="text-base">${post.author?.designation || "Unknown"}</p>
                </div>
              </div>
            </div>
        `;

        latestPostContainer.appendChild(cardsDiv);
    })
}



latestPost();