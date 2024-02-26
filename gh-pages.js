const ghpages = require("gh-pages");

ghpages.publish(
	"dist", // path to public directory
	{
		branch: "main",
		repo: "https://github.com/aybruhm/sous-chef-ui.git",
		dotfiles: true,
	},
	() => {
		console.log("Deploy Complete!");
	}
);
