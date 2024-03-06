<script lang="ts">
	import axios from "axios";
	import Summary from "./Summary.svelte";
	import type { LLMAppResponse } from "../lib/Types";

	let userInput: string;
	let llmAppURI: string;
	let isLoading: boolean;
	let llmAppResponse: string;

	const makeSuggestionToLLM = async (input: string, llmAppURI: string) => {
		try {
			const response = await axios.post(llmAppURI, {
				inputs: [
					{
						role: "user",
						content: input,
					},
				],
				environment: "production",
			});
			return response.data as LLMAppResponse;
		} catch (err) {
			console.log("LLM app error: ", err);
			throw Error("Error making request to kitchen assistant");
		}
	};

	// Load from local storage on component initialization
	$: if (typeof Storage !== "undefined") {
		const storedURI = localStorage.getItem("kitchenAssistantURI");
		if (storedURI) {
			llmAppURI = storedURI;
		}
	}

	const handleLLMAppURIInput = (e: any) => {
		llmAppURI = e.target.value;
	};

	const handleIngredientsInput = (e: any) => {
		userInput = e.target.value;
	};

	const handleCheckboxClick = () => {
		if (typeof Storage !== "undefined" && llmAppURI !== "undefined") {
			localStorage.setItem("kitchenAssistantURI", llmAppURI);
		} else {
			throw Error("Local storage is not supported by your browser");
		}
	};

	const handleButtonClick = async (e: any) => {
		e.preventDefault();
		isLoading = true;

		try {
			const response = await makeSuggestionToLLM(userInput, llmAppURI);
			llmAppResponse = response.message;
		} catch (err) {
			console.error(err);
			throw err;
		} finally {
			// Reset loading state in both success and error cases
			isLoading = false;
		}
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
					value={llmAppURI || ""}
					on:input={handleLLMAppURIInput}
					placeholder="Input your LLM app uri here..."
				/>
			</div>
			<div class="form-input">
				<input
					type="text"
					on:input={handleIngredientsInput}
					placeholder="Type or paste your ingredient(s) here..."
				/>
			</div>
			<div class="form-input-checkbox">
				<input type="checkbox" on:click={handleCheckboxClick} /><span
					class="checkbox-title">Save assistant uri for next time?</span
				>
			</div>

			<div class="form-btn">
				<button disabled={isLoading} on:click={handleButtonClick}
					><span
						>{#if isLoading}
							Processing...
						{:else}
							Suggest
						{/if}</span
					></button
				>
			</div>
		</form>

		{#if llmAppResponse !== undefined}
			<Summary recipeData={llmAppResponse} />
		{/if}
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

	.form-input-checkbox {
		flex: none !important;
		text-align: left;
		padding-bottom: 20px;
	}

	.form-input input {
		flex: 1;
		padding: 10px;
		border: 1px solid #ccc;
		border-radius: 5px;
		font-size: 16px;
	}

	span.checkbox-title {
		font-style: italic;
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
