const fetcher = async (path: string) => {
    const init: RequestInit = {};

    const response = await fetch(`http://localhost:3000${path}`, init);
    return await response.json();
}

export default fetcher;