<script lang="ts">
	import Prompt from "./components/Prompt.svelte";
</script>

<main>
	<h1>Sous Chef AI Assistant 🧑🏾‍🍳</h1>

	<div class="card">
		<Prompt />
	</div>

	<p>
		Read article <a
			href="https://github.com/sveltejs/kit#readme"
			target="_blank"
			class="referrer-link"
			rel="noreferrer">here</a
		>, on getting started!
	</p>
	<button>
		<a
			class="github-button"
			href="https://github.com/aybruhm/sous-chef-ui"
			data-color-scheme="no-preference: light; light: light; dark: dark;"
			data-icon="octicon-star"
			data-size="large"
			aria-label="Star aybruhm/sous-chef-ui on GitHub"
		>
			Star on Github ⭐
		</a>
	</button>
</main>

<style>
	.github-button {
		color: #f1f1f1;
	}
	.referrer-link {
		text-decoration: underline;
		color: #f1f1f1;
		font-style: italic;
	}
</style>
