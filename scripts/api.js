let count = 0;


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
            <div class="card-body h-80">
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


const categoryBasedPost = async (search) => {
    let res = '';
    if(search){
        res = await fetch(` https://openapi.programming-hero.com/api/retro-forum/posts?category=${search}`);
    }else(
        res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts`)
    )
    const data = await res.json();
    displayAllPost(data.posts);
    // console.log(data.posts)
}

const displayAllPost = displayPosts => {    

    const discussionContainer = document.getElementById("discussionContainer");
    discussionContainer.textContent = '';

    displayPosts.forEach(displayPost => {
        toggleLoading(false);

        const postDiv = document.createElement("div");
        postDiv.classList = `card w-96 lg:w-full bg-base-100 shadow-xl  lg:flex-row`;
        postDiv.innerHTML = `
        <div class=" w-16 relative top-8 left-4">
            <div>
                <div
                    class="border rounded-full w-4 h-4 bg-contain ${displayPost.isActive? "bg-green-600": "bg-red-600"}  bg-no-repeat bg-center relative top-4 left-10"
                ></div>
                <figure>
                  <img
                    class="border rounded-full w-14 h-14 bg-contain bg-slate-600 bg-no-repeat bg-center"
                    src="${displayPost.image}"
                    alt="Shoes"
                  />
                </figure>
            </div>
        </div>
        <div class="card-body divide-dashed divide-stone-600 divide-y-2">
                <div>
                  <div class="flex">
                    <p># ${displayPost.category}</p>
                    <p>Author : ${displayPost.author.name}</p>
                  </div>
                  <h2 class="card-title mt-2" id="titlePost">${displayPost.title}</h2>
                  <p class="text-base mt-2">
                  ${displayPost.description}
                  </p>
                </div>
                <div class="card-normal mt-2">
                  <div class="mt-4 flex lg:justify-between justify-start items-center">
                    <div class="flex justify-around lg:gap-16 w-4/5">
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

                    <div class="text-right w-1/5">
                      <button
                        class="viewCountBtn btn rounded-full bg-green-600 hover:bg-blue-400"
                      >
                        <i class="fa-regular fa-envelope-open"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
        `; 

        discussionContainer.appendChild(postDiv);
        
        // viewCountBtn(displayPost.title, displayPost.view_count);
        
    });

    // hide loading spinner
    // toggleLoading(false);

    const titlePost = document.querySelectorAll("#titlePost");
    const counter = document.querySelectorAll("#viewCounter");
    const viewCountBtns = document.querySelectorAll(".viewCountBtn");
    
    const viewCounterContainer = document.getElementById("viewCounterContainer");

    for (var i = 0; i < viewCountBtns.length; i++){

            const viewCountBtn = viewCountBtns[i];
            
            let title = titlePost[i];
            let viewCounter = counter[i];

            // console.log(viewCountBtns[i], title, viewCounter);

        
        viewCountBtn.addEventListener('click', () =>{
            console.log(viewCountBtn.innerHTML, title.innerText, viewCounter.innerText);
            
            const titleName = title.innerText;
            const viewCount = viewCounter.innerText;

            const viewDiv = document.createElement("div");
            viewDiv.classList = `card w-full bg-base-100 shadow-xl mt-4`;
            viewDiv.innerHTML = `
                <div class="card-body flex lg:flex-row">
                    <h2 class="card-title lg:w-4/5">${title.innerText}</h2>

                    <div class="lg:w-1/5 flex gap-4 items-center">
                        <i class="fa-regular fa-eye"></i>
                        <p class="text-base" id="viewCounter">${viewCounter.innerText}</p>
                    </div>
                </div>
            `;

            viewCounterContainer.appendChild(viewDiv);

            count++; // increment read counter

            document.getElementById("counter").innerText = count;
            // console.log(titleName, viewCount,viewDiv.id);
        });
    }
    

}

// search
const searchPosts = () => {
    toggleLoading(true);
    const searchField = document.getElementById('searchField');
    const searchText = searchField.value;
    // console.log(searchText);
    categoryBasedPost(searchText);

}

// loading spinner
const toggleLoading = (isLoading) => {
    const spinner = document.getElementById('loading');
    if(isLoading){        
        spinner.classList.remove('hidden');
    }else{
        setTimeout(() => {
            spinner.classList.add('hidden');
        }, 2000);
        
    }
    
}

categoryBasedPost();
latestPost();