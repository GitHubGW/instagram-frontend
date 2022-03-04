module.exports = {
  client: {
    tagName: "gql",
    service: {
      name: "instagram-backend",
      url: "http://localhost:4000/graphql",
    },
    includes: ["./src/**/*.{tsx,ts}"],
  },
};
