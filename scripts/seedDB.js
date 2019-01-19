const mongoose = require("mongoose");
const db = require("../models");

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/project-3"
);

const userSeed = [
  {
    username: "admin",
    password: "password"
  },
  {
    username: "Eric",
    password: "supersecurepassword"
  }
];

const challengeSeed =[
    {
      "title": "Korean Spicy Noodle Challenge",
      "image": "https://i.ytimg.com/vi/HxlEpys9Qy8/maxresdefault.jpg",
      "description": "In this challenge, you have to eat hot and spicy noodles, it comes with all the risks associated with eating hot food."
    },
    {
      "title": "Cutest Cat Challenge",
      "image": "https://www.readersdigest.ca/wp-content/uploads/sites/14/2011/01/4-ways-cheer-up-depressed-cat.jpg",
      "description":"Who got the cutest cat? Upload your video here."
    },
    {
      "title": "100 Layer Challenge",
      "image": "https://i.ytimg.com/vi/bQEqhJcQ8jE/maxresdefault.jpg",
      "description":"For this, you will need a whole lot of free time and a lot of makeup, clothes, tin foil anything you want really, as it involves you sitting for ages putting layers and layers of anything you want on your body."
    },
    {
      "title": "Condom Challenge",
      "image": "https://i.ytimg.com/vi/YBggW8yR6h8/maxresdefault.jpg",
      "description":"Don’t get any dirty ideas; this challenge is not half as steamy as the chapstick challenge. All you’re doing is filling a condom with water and dropping it on a friends head, it is pretty risky, as your friend could struggle to breathe. Ensure you have other friends on standby in case things go wrong."
    },
    {
      "title": "Ghost Pepper Challenge",
      "image": "https://i.ytimg.com/vi/XJJRJQzl9Yg/maxresdefault.jpg",
      "description":"Eatting the hotest pepper in the world! Be careful though."
    },
    {
      "title": "Cinnamon challenge",
      "image": "http://www.bioedonline.org/BioEd/cache/file/69E57A28-1626-46A6-8BAF19EFE755F576.jpg",
      "description":"This is one of the hardest YouTube challenges. You have to put a spoonful of cinnamon in your mouth and try to keep it in, it looks so easy except that it is not. It is an iincrediblydangerous challenge that can result in permanent lung damage or even death."
    },
    {
      "title": "Baking Soda and Vinegar Challenge",
      "image": "https://i.ytimg.com/vi/cPL-bDi7dQo/maxresdefault.jpg",
      "description":"The Baking Soda and Vinegar challenge is a dangerous challenge that can lead to death by suffocating. It involves putting a tablespoon of baking soda and a large gulp of vinegar in your mouth at the same time and then you have to try to keep the resulting combination in your mouth for as long as you can."
    },
    {
      "title": "Banana and Sprite Challenge",
      "image": "https://tse4.mm.bing.net/th?id=OIP.upPmBl_MRwfIJiJoUHL1NwHaFj",
      "description":"The Banana and Sprite Challenge is a weird challenge that usually leads to throwing up. For the Banana and Sprite Challenge, each participant has to eat 2 bananas and quickly chug down a can of sprite without vomiting. Good luck!"
    },   
    {
      "title": "Cold Water Challenge",
      "image": "http://mv-winterstettendorf.de/images/bilder/fotoalbum/2014/cold%20water%20challenge/2014.06.23%20cold%20water%20challenge_08.jpg",
      "description":"The cold water challenge is like the Ice Bath Challenge, but unlike the other challenges, it is an outdoor challenge. The Cold Water Challenge requires participants to jump into a cold lake or river and ensure you dunk your head all the way under the water. If you cannot swim, don’t be tempted to take this challenge."
    }, 
    {
      "title": "Extreme Saltine Challenge",
      "image": "https://i.ytimg.com/vi/IE0FV4oQX-Q/maxresdefault.jpg",
      "description":"The extreme saltine challenge requires you and your friends to eat six saltine crackers in a minute. Sounds easy right? You are not allowed to drink any water or soda."
    }, 
    {
      "title": "Ginger Challenge",
      "image": "https://ceenphotography.files.wordpress.com/2018/12/121918ginger_1.jpg?w=800&h=535",
      "description":"You do not want to take this challenge if you hate ginger. It involves you filming yourself taking a spoon full of ground ginger and swallowing it without taking water or any drink."
    },  
    {
      "title": "Habanero Challenge",
      "image": "https://i.ytimg.com/vi/LWsXJz6Rew4/maxresdefault.jpg",
      "description":"Participants challenge themselves on how many Habanero peppers they can eat under one minute. You should not take water or any other fluids when taking the challenge."
    }
]

db.User
  .remove({})
  .then(() => db.User.collection.insertMany(userSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    db.Challenge
  .remove({})
  .then(() => db.Challenge.collection.insertMany(challengeSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
  })
  .catch(err => {
    console.error(err);
  });


