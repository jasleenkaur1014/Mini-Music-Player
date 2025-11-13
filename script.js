const allSongs = [
  {
    id: 1,
    name: "MF Gabru",
    artist: "Karan Aujla",
    img: "https://i.scdn.co/image/ab67616d0000b2738afccc951c424d90c532e13f",
    genre: "Punjabi",
    source: "Music/Mf-Gabhru.mp3",
  },
  {
    id: 2,
    name: "52-Bars",
    artist: "Karan Aujla",
    img: "https://c.saavncdn.com/552/Four-You-Punjabi-2023-20230130150304-500x500.jpg",
    genre: "Punjabi",
    source: "Music/52-Bars.mp3",
  },
  {
    id: 3,
    name: "Bye",
    artist: "Aditya Bharadwaj",
    img: "https://c.saavncdn.com/527/Bye-Hindi-2022-20230627005907-500x500.jpg",
    genre: "Hindi",
    source: "Music/Bye.mp3",
  },
  {
    id: 4,
    name: "Raanjhan",
    artist: "Parampara Tandon",
    img: "https://i1.sndcdn.com/artworks-inYzyeVqRrybFq3h-v7EOQA-t500x500.jpg",
    genre: "Hindi",
    source: "Music/Raanjhan.mp3",
  },
  {
    id: 5,
    name: "We Don't Talk Anymore",
    artist: "Charlie Puth",
    img: "https://ar.toneden.io/1972440/tracks/0.45589042994795737?cache=1475695995957",
    genre: "English",
    source: "Music/We-dont-talk-anymore.mp3",
  },
  {
    id: 6,
    name: "Night Changes",
    artist: "One Direction",
    img: "https://upload.wikimedia.org/wikipedia/en/d/d1/One_Direction_-_Night_Changes_Single_Cover.png",
    genre: "English",
    source: "Music/Night-Changes.mp3",
  },
];

const body = document.body;
const toggleBtn = document.querySelector("#mySwitch");
const toggleText = document.querySelector(".mode-txt");
let currentSong = 0;

function toggleTheme() {
  toggleBtn.addEventListener("click", function () {
    body.classList.toggle("dark");

    if (body.classList.contains("dark")) {
      toggleText.textContent = "Dark Mode";
    } else {
      toggleText.textContent = "Light Mode";
    }
  });
}
toggleTheme();

const songList = document.getElementById("songList");

function showSongs(songs) {
  songList.innerHTML = "";

  songs.forEach((song) => {
    const songBtn = document.createElement("li");
    songBtn.textContent = song.name;
    songList.append(songBtn);

    songBtn.addEventListener("click", function () {
      document.querySelectorAll("#songList li").forEach((li) => {
        li.classList.remove("active");
      });

      songBtn.classList.add("active");

      renderCurrentSong(song);
    });
  });
}

const filterOption = document.getElementById("filter-select");
function filterSongs() {
  const selectedFilter = filterOption.value;

  if (selectedFilter == "All") {
    showSongs(allSongs);
  } else {
    const filteredSongs = allSongs.filter(
      (song) => song.genre.toLowerCase() === selectedFilter.toLowerCase()
    );
    showSongs(filteredSongs);
  }
}
showSongs(allSongs);
filterOption.addEventListener("change", filterSongs);

const searchSongValue = document.getElementById("search-content");
function searchSong() {
  const searchSongInput = searchSongValue.value.trim().toLowerCase();

  if (searchSongInput == "") {
    showSongs(allSongs);
    updateActiveSong();
    return;
  }

  const searchedSong = allSongs.find((song) =>
    song.name.toLowerCase().includes(searchSongInput)
  );

  songList.innerHTML = "";

  if (searchedSong) {
    const songBtn = document.createElement("li");
    songBtn.textContent = searchedSong.name;

    songBtn.addEventListener("click", function () {
      currentSong = allSongs.indexOf(searchedSong);
      renderCurrentSong(searchedSong);
      updateActiveSong();
    });

    songList.append(songBtn);
  } else {
    const notFound = document.createElement("li");
    notFound.textContent = "No song found 😞";
    songList.append(notFound);
  }
}

const songSearchBtn = document.getElementById("search-btn");
songSearchBtn.addEventListener("click", searchSong);

searchSongValue.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    searchSong();
  }
});
searchSongValue.addEventListener("input", searchSong);

const imgContainer = document.querySelector(".song-img");
const songNameContainer = document.querySelector(".song-name");
const artistNameContainer = document.querySelector(".artist-name");
const audioMain = document.getElementById("og-audio");
const prevBtn = document.getElementById("prevButton");
const nextBtn = document.getElementById("nextButton");
const addToPlayBtn = document.getElementById("add-to-play");

function renderCurrentSong(song) {
  imgContainer.innerHTML = "";
  const img = document.createElement("img");
  img.src = song.img;

  imgContainer.append(img);

  songNameContainer.textContent = song.name;

  artistNameContainer.textContent = song.artist;

  audioMain.src = song.source;

  currentSong = allSongs.findIndex((s) => s.id === song.id);
}

prevBtn.addEventListener("click", function () {
  currentSong--;
  if (currentSong < 0) {
    currentSong = allSongs.length - 1;
  }
  renderCurrentSong(allSongs[currentSong]);
  updateActiveSong();
});

nextBtn.addEventListener("click", function () {
  currentSong++;
  if (currentSong >= allSongs.length) {
    currentSong = 0;
  }
  renderCurrentSong(allSongs[currentSong]);
  updateActiveSong();
});
addToPlayBtn.addEventListener("click", function () {
  addtoPlaylist(allSongs[currentSong]);
  updateActiveSong();
});
function updateActiveSong() {
  const allList = document.querySelectorAll("#songList li");
  allList.forEach((li, index) => {
    li.classList.toggle("active", index === currentSong);
  });
}

let playlists = [];
let currentPlaylistIndex = null;
const newPlaylistInput = document.getElementById("playlist-name");
const createPlaylistBtn = document.getElementById("create-playlist");
const allPlaylist = document.getElementById("playlist-list");
const songListPlay = document.getElementById("playlist-song-list");

function createPlaylist() {
  const newPlaylistValue = newPlaylistInput.value.trim();

  if (newPlaylistValue === "") return alert("Enter a playlist name!");

  const newPlaylist = {
    name: newPlaylistValue,
    songs: [],
  };

  playlists.push(newPlaylist);
  renderPlaylist();
  newPlaylistInput.value = "";
}

createPlaylistBtn.addEventListener("click", createPlaylist);

function renderPlaylist() {
  allPlaylist.innerHTML = "";

  playlists.forEach((playlist, index) => {
    const li = document.createElement("li");
    li.textContent = playlist.name;
    li.style.cursor = "pointer";

    if (index === currentPlaylistIndex) {
      li.classList.add("active");
    }

    li.addEventListener("click", () => {
      currentPlaylistIndex = index;
      renderPlaylist();
      renderPlaylistSong(index);
    });

    allPlaylist.appendChild(li);
  });
}

function addtoPlaylist(song) {
  if (currentPlaylistIndex === null) {
    alert("Please select a playlist first!");
    return;
  }

  const playlist = playlists[currentPlaylistIndex];
  playlist.songs.push(song);

  alert(`${song.name} added to ${playlist.name}`);
  renderPlaylistSong(currentPlaylistIndex);
}

function renderPlaylistSong(index) {
  const playlist = playlists[index];
  songListPlay.innerHTML = "";

  if (playlist.songs.length === 0) {
    songListPlay.innerHTML = "<li>No songs yet 🎧</li>";
    return;
  }

  playlist.songs.forEach((song) => {
    const li = document.createElement("li");
    li.textContent = song.name;
    li.addEventListener("click", () => renderCurrentSong(song));
    songListPlay.appendChild(li);
  });
}
