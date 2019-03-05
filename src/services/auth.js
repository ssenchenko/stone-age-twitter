const auth = {
  isAuthenticated: false,
  signUpWithEmailAndPassword: async (userInfo) => {
    this.isAuthenticated = true;
    await setTimeout(userInfo, 100);
  },
  loginWithEmailAndPassword: (callback) => {
    this.isAuthenticated = true;
    setTimeout(callback, 100); // fake async
  },
  signOut: (callback) => {
    this.isAuthenticated = false;
    setTimeout(callback, 100);
  },
};

export default auth;
