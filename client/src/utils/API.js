import axios from "axios";

export default {
  // Gets all books
  getChallenges: function() {
    return axios.get("/api/challenges");
  },
  // Gets the book with the given id
  getChallenge: function(id) {
    return axios.get("/api/challenges/" + id);
  },
  // Deletes the book with the given id
  deleteChallenge: function(id) {
    return axios.delete("/api/challenges/" + id);
  },
 // getUploads: function(id) {
   // return axios.get("api/challenges/" + id + "uploads");
 // }
  // Saves a book to the database
  //saveChallenge: function(challengeData) {
    //return axios.post("/api/challenge", ChallengeData);
  //}
};
