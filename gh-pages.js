const ghpages = require("gh-pages");

ghpages.publish(
	"dist", // path to public directory
	{
		branch: "gh-pages",
		repo: "https://github.com/aybruhm/sous-chef-ui.git",
	},
	() => {
		console.log("Deploy Complete!");
	}
);
