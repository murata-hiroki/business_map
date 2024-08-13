exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  const typeDefs = `
      type ProfileYaml implements Node {
        company: ProfileYamlCompany!
      }
      type ProfileYamlCompany {
        name: String!
        industry: String!
        address: String!
        description: String!
        overview: String!
        pr: String!
        urls: [String!]!
      }
    `;
  createTypes(typeDefs);
};
