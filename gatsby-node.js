const path = require("path");

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions;

  // GraphQLクエリを実行してデータを取得
  const result = await graphql(`
    {
      allProfileYaml {
        nodes {
          id
          name {
            kanji
          }
          company {
            name
            industry
            address
            description
            overview
            pr
            urls
          }
          lom_name
          entry_year
          phone
          member_pr
          photo_url
        }
      }
    }
  `);

  // エラーハンドリング
  if (result.errors) {
    console.error(result.errors);
    throw result.errors;
  }

  // テンプレートファイルのパスを指定
  const memberTemplate = path.resolve(`src/templates/member-detail.jsx`);

  // 各メンバーに対してページを作成
  result.data.allProfileYaml.nodes.forEach((node) => {
    createPage({
      path: `/${node.id}`,
      component: memberTemplate,
      context: {
        id: node.id,
        memberData: node,
      },
    });
  });
};

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
