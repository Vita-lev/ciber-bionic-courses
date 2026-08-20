"use strict";

(() => {
	const apiUrlInput = document.getElementById("apiUrl");
	const modelNameInput = document.getElementById("modelName");
	const promptInput = document.getElementById("prompt");
	const runBtn = document.getElementById("runBtn");
	const stopBtn = document.getElementById("stopBtn");
	const clearBtn = document.getElementById("clearBtn");
	const statusEl = document.getElementById("status");
	const outputEl = document.getElementById("output");

	/** @type {AbortController | null} */
	let currentAbort = null;

	function setStatus(text, tone = "muted") {
		statusEl.textContent = text;
		statusEl.style.color = tone === "ok" ? "#22c55e" :
			tone === "err" ? "#ef4444" :
			"#666";
	}

	function setRunning(running) {
		runBtn.disabled = running;
		stopBtn.disabled = !running;
		apiUrlInput.disabled = running;
		modelNameInput.disabled = running;
		promptInput.disabled = running;
	}

	function clearOutput() {
		outputEl.textContent = "";
	}

	async function generate() {
		const apiUrl = apiUrlInput.value.trim();
		const model = modelNameInput.value.trim();
		const prompt = promptInput.value.trim();

		if (!apiUrl) {
			setStatus("Помилка: API URL порожній", "err");
			return;
		}
		if (!model) {
			setStatus("Помилка: назва моделі порожня", "err");
			return;
		}
		if (!prompt) {
			setStatus("Введіть запит для генерації", "err");
			return;
		}

		clearOutput();
		setRunning(true);
		setStatus("⏳ Генерую відповідь...");
		currentAbort = new AbortController();

		try {
			// Ollama /api/generate supports newline-delimited JSON streaming when stream=true (default)
			const response = await fetch(apiUrl, {
				method: "POST",
				signal: currentAbort.signal,
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					model,
					prompt,
					stream: true
				})
			});

			if (!response.ok || !response.body) {
				throw new Error(`HTTP ${response.status} ${response.statusText}`);
			}

			const reader = response.body.getReader();
			const decoder = new TextDecoder("utf-8");
			let buffered = "";

			while (true) {
				const { value, done } = await reader.read();
				if (done) break;
				buffered += decoder.decode(value, { stream: true });

				// Process by lines (NDJSON)
				let lineBreak;
				while ((lineBreak = buffered.indexOf("\n")) >= 0) {
					const line = buffered.slice(0, lineBreak).trim();
					buffered = buffered.slice(lineBreak + 1);
					if (!line) continue;
					try {
						const obj = JSON.parse(line);
						// token chunks come in obj.response; final has obj.done === true
						if (typeof obj.response === "string") {
							outputEl.textContent += obj.response;
							outputEl.scrollTop = outputEl.scrollHeight;
						}
						if (obj.done) {
							// could read obj.total_duration, obj.eval_count, etc.
						}
					} catch {
						// ignore malformed lines
					}
				}
			}

			setStatus("✅ Готово", "ok");
		} catch (err) {
			if (err?.name === "AbortError") {
				setStatus("⛔ Зупинено користувачем", "err");
			} else {
				setStatus(`Помилка: ${err?.message || err}`, "err");
			}
		} finally {
			setRunning(false);
			currentAbort = null;
		}
	}

	runBtn.addEventListener("click", () => generate());
	stopBtn.addEventListener("click", () => {
		if (currentAbort) currentAbort.abort();
	});
	clearBtn.addEventListener("click", () => {
		promptInput.value = "";
		clearOutput();
		setStatus("Готово");
	});

	// Enter to run (Shift+Enter for newline)
	promptInput.addEventListener("keydown", (e) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			if (!runBtn.disabled) generate();
		}
	});
})();


