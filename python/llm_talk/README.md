# LLM Talk

Jupyter notebook workspace for exploring LLMs with the Hugging Face `transformers` library.

## Requirements

- [uv](https://docs.astral.sh/uv/getting-started/installation/)

## Start the Notebook

```bash
uv run jupyter notebook notebook.ipynb
```

This uses `uv run` to launch Jupyter inside the project's managed virtual environment — no manual venv activation needed.

## Dependencies

- `transformers` — Hugging Face model library
- `torch` — PyTorch backend
- `jupyter` — notebook server
