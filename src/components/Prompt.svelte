<script lang="ts">
	import axios from "axios";
	import type { LLMAppResponse } from "../lib/Types";

	let userInput: string = "";
	let llmAppURI: string = "";

	const makeSuggestionToLLM = async (input: string, llmAppURI: string) => {
		try {
			const response = await axios.post(llmAppURI, {
				role: "user",
				content: input,
			});
			return response.data as LLMAppResponse;
		} catch (err) {
			console.log("LLM app error: ", err);
			throw Error("Error making request to kitchen assistant");
		}
	};

	const handleButtonClick = async () => {
		const response = await makeSuggestionToLLM(userInput, llmAppURI);

		// Display message in summary component
		const message = response.message;
	};
</script>

<main>
	<div class="input-section">
		<p class="input-title">
			Partagez tes ingrédients et je te concocterai un plat délicieux.
		</p>

		<form class="input-card">
			<div class="form-input">
				<input
					type="text"
					placeholder="Type or paste your ingredient(s) here..."
				/>
			</div>

			<div class="form-btn">
				<button on:click={handleButtonClick}><span>Suggest</span></button>
			</div>
		</form>
	</div>
</main>

<style>
	.input-title {
		font-size: 1.2rem;
		font-style: italic;
	}

	.input-card {
		box-shadow: 2px 3px 5px 7px rgba(3, 1, 1, 0.1);
		border-radius: 8px;
		padding: 20px;
		margin: 20px 0;
	}

	.form-input {
		display: flex;
		align-items: center;
		margin-bottom: 10px;
	}

	.form-input input {
		flex: 1;
		padding: 10px;
		border: 1px solid #ccc;
		border-radius: 5px;
		font-size: 16px;
	}

	.form-btn button {
		border: none;
		border-radius: 5px;
		cursor: pointer;
		font-style: italic;
		width: 100%;
		transition: background-color 0.3s ease;
	}
</style>
