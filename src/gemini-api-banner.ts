export function maybeShowApiKeyBanner(key: string, action: string = `enter it at the top of <code>main.js</code>`) {
  if (key === 'TODO') {
    const banner: HTMLDivElement = document.createElement('div');
    banner.className = 'api-key-banner';
    banner.innerHTML = `
      To get started with the Gemini API,
      <a href="https://g.co/ai/idxGetGeminiKey" target="_blank">
      get an API key</a> (Ctrl+Click) and ${action}`;
    document.body.prepend(banner);
  }
}

