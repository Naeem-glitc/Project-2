let CurrentSong = new Audio();
let songs;
let currFolder;
let songUL;

function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}




// Getting songs list from the array of songs
async function getSongs(folder) {
    currFolder = folder
    let songlist = await fetch(`/${currFolder}/`);
    let response = await songlist.text();
    let div = document.createElement("div")
    div.innerHTML = response;
    let as = div.getElementsByTagName("a")
    songs = []
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp4")) {
            songs.push(element.href.split(`/${currFolder}/`)[1])
        }
    }
   
    songUL = document.querySelector(".currentsongs").getElementsByTagName("ul")[0]
    songUL.innerHTML = ""
    for (const song of songs) {
        songUL.innerHTML = songUL.innerHTML + `<li>${song}</li>`;
                          
    }

    Array.from(document.querySelector(".currentsongs").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click",() =>{
            playMusic(e.innerHTML);
           

        })
    })
    
  
  
    
}


//playing music 
const playMusic = (track) => {
    CurrentSong.src = `/${currFolder}/` + track
    CurrentSong.play();
    p.src = "Images/pause.svg";
    document.querySelector(".songname").innerHTML = track;
    
   
}

 async function main() {
    
    p.addEventListener("click",()=>{
        if(CurrentSong.paused){
            CurrentSong.play();
            p.src = "Images/pause.svg"
        }
        else{
            CurrentSong.pause();
            p.src = "Images/play1.svg"
        }
    })

    //add time and duration
    CurrentSong.addEventListener("timeupdate",()=>{
        document.querySelector(".songtiemduration").innerHTML = secondsToMinutesSeconds(CurrentSong.duration) + "/" + secondsToMinutesSeconds(CurrentSong.currentTime)
        document.querySelector(".circle").style.marginLeft = ((CurrentSong.currentTime / CurrentSong.duration) * 100) + "%"
        let progress = (CurrentSong.currentTime / CurrentSong.duration) * 100; // Calculate progress percentage

        let progressBar = document.querySelector(".songprogress");

        progressBar.style.background = `linear-gradient(to right, white ${progress}%, black ${progress}%)`;


     
    })

    //add event listernsto the next button
    next.addEventListener('click', () => {
        let index = songs.indexOf(CurrentSong.src.split("/").pop()); // Extract filename
        console.log("Current Index:", index); // Debugging
    
        if ((index + 1) < songs.length) {
            playMusic(songs[index + 1]); // Update src and play
        } 
    });
    
   //privous list

    privous.addEventListener('click',()=>{
        let index = songs.indexOf(CurrentSong.src.split("/").pop());
       if ((index - 1) >= 0){
           playMusic(songs[index - 1]);
        }

           
    })
    



    // Add an event listener to seekbar
       document.querySelector(".songprogress").addEventListener("click", e=> {
             const persent = (e.offsetX/e.target.getBoundingClientRect().width) * 100;
                document.querySelector(".circle").style.marginLeft = persent + "%";
                CurrentSong.currentTime = ((CurrentSong.duration) *persent)/100;
       })
    

    
  
    //add event lister to the caard
    Array.from(document.getElementsByClassName("c")).forEach(e=>{
        e.addEventListener("click", async item=>{
            await getSongs(`songs/${item.currentTarget.dataset.folder}`)
           
        })
    })

    //addevint lisner to poop up when click on song
    document.addEventListener('DOMContentLoaded', () => {
        document.querySelectorAll('.c').forEach(element => {
          element.addEventListener('click', () => {
            const popup = document.querySelector('.songplayBox');
            if (popup) {
              popup.style.cssTe
              popup.style.position = 'absolute';
              popup.style.bottom = '1%';
              popup.style.transition = 'bottom 90s cubic-bezier(0.25, 1, 0.5, 1)';
              popup.style.padding = '20px';
              popup.style.borderRadius = '12px';
              popup.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.3)';
              popup.style.backgroundColor = '#fff';
              popup.style.zIndex = '1000';
            }
          });
        });
    });

    
      

    
    
    
 }
 

main()