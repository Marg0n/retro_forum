const latestPost = async () => {
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/latest-posts`);
    const data = await res.json();
    displayLatestPosts(data);
}

const displayLatestPosts = posts => {
    
    const latestPostContainer = document.getElementById('latestPostContainer');

    posts.forEach(post => {

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

const allPost = async () => {
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts`);
    const data = await res.json();
    displayAllPost(data.posts);
}

const displayAllPost = displayPosts => {    
    // console.log(displayPosts.posts);

    const discussionContainer = document.getElementById("discussionContainer");

    displayPosts.forEach(displayPost => {

        const postDiv = document.createElement("div");
        postDiv.classList = `card w-96 lg:w-full bg-base-100 shadow-xl  flex-row`;
        postDiv.innerHTML = `
        <div class="relative top-8 left-4">
                <figure>
                    <div
                    class="border rounded-full w-4 h-4 bg-contain bg-green-600 bg-no-repeat bg-center relative bottom-4 left-14"
                  ></div>
                  <img
                    class="border rounded-full w-14 h-14 bg-contain bg-slate-600 bg-no-repeat bg-center"
                    src="${displayPost.image}"
                    alt="Shoes"
                  />
                </figure>
        </div>
        <div class="card-body divide-dashed divide-stone-600 divide-y-2">
                <div>
                  <div class="flex">
                    <p># ${displayPost.category}</p>
                    <p>Author : ${displayPost.author.name}</p>
                  </div>
                  <h2 class="card-title mt-2">${displayPost.title}</h2>
                  <p class="text-base mt-2">
                  ${displayPost.description}
                  </p>
                </div>
                <div class="card-normal mt-2">
                  <div class="mt-4 flex justify-between items-center">
                    <div class="flex justify-around gap-16">
                      <div class="flex gap-4 items-center">
                        <i class="fa-regular fa-message"></i>                        
                        <p class="text-base" id="msgCounter">${displayPost.comment_count}</p>
                      </div>
                      <div class="flex gap-4 items-center">
                        <i class="fa-regular fa-eye"></i>                        
                        <p class="text-base" id="viewCounter">${displayPost.view_count}</p>
                      </div>
                      <div class="flex gap-4 items-center">
                        <i class="fa-regular fa-clock"></i>
                        <p class="text-base" id="durationCounter">${displayPost.posted_time} min</p>
                      </div>
                    </div>

                    <div>
                      <button
                        class="btn rounded-full bg-green-600 hover:bg-blue-400"
                      >
                        <i class="fa-regular fa-envelope-open"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
        `; 

        discussionContainer.appendChild(postDiv);

    })
}

allPost();
latestPost();