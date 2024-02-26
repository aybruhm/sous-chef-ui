<script lang="ts">
	export let recipeData: string;

	const messageParts = recipeData.split("\n");
	const ingredients = messageParts.slice(2, 14).slice(1, -1);
	const instructions = messageParts.slice(14);

</script>

<main>
	<div class="recipe-container">
		<div class="ingredients">
			<h3 class="title">Ingredients:</h3>
			{#each ingredients as ingredient}
				<span>{ingredient}</span>
			{/each}
		</div>

		<div class="instructions">
			<h3>Instructions</h3>
			{#each instructions as step}
				<span>{step}</span>
			{/each}
		</div>
	</div>
</main>

<style>
	.recipe-container {
		padding: 20px;
		border: 1px solid #ccc;
		border-radius: 5px;
		max-width: 700px; /* Adjust as needed */
		margin: 20px auto; /* Center the container */
	}

	.ingredients,
	.instructions {
		text-align: left;
	}
	.ingredients span,
	.instructions span {
		display: block;
		padding: 5px 0px;
		margin-left: 15px; /* Indentation */
	}
</style>
