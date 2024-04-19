import { useEffect, useState } from 'react';

function useContentLoader(path: string): string {
  const [content, setContent] = useState('');

  useEffect(() => {
    async function loadContent() {
      try {
        const contentModule = await import(`../${path}.md?raw`);

        setContent(contentModule.default);
      } catch (error) {
        console.error(error);
        setContent(
          '# 404 - oops 😬\nError loading the content.\n[Go home.](/)'
        );
      }
    }

    loadContent();
  }, [path]);

  return content;
}

export { useContentLoader };
