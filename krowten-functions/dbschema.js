//just to know how db looks
let db = {
  users: [
    {
      userId: "qmZMqSNyI0MSnNbdQUShGcXJD0A3",
      email: "user1@email.com",
      handle: "user1",
      createdAt: "2020-08-08T08:08:22.362Z",
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/krowten-ffb6f.appspot.com/o/blankavatar.png?alt=media&",
      bio: "Hello, I am using Krowten!",
      website: "https://user.com",
      location: "London, UK",
    },
  ],
  screams: [
    {
      userHandle: "user",
      body: "this is the scream body",
      createdAt: "2020-08-05T18:02:17.309Z",
      likeCount: 5,
      commentCount: 2,
    },
  ],
  comments: [
    {
      userHandle: "user",
      screamId: "jasdasjdjkhasjdhkajskd",
      body: "Ayo test comment",
      createdAt: "2020-08-05T18:02:17.309Z",
    },
  ],
};

//Redux data
const userDetails = {
  credentials: {
    userId: "qmZMqSNyI0MSnNbdQUShGcXJD0A3",
    email: "user1@email.com",
    handle: "user1",
    createdAt: "2020-08-08T08:08:22.362Z",
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/krowten-ffb6f.appspot.com/o/blankavatar.png?alt=media&",
    bio: "Hello, I am using Krowten!",
    website: "https://user.com",
    location: "London, UK",
  },
  likes: [
    {
      userHandle: "user",
      screamId: "bs123h2nfo121bddo12bd",
    },
    {
      userHandle: "user",
      screamId: "bs123h2nfo121bddo12ad",
    },
  ],
};
