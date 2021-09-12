export const getData = async (url) => {
    let res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    res = await res.json();

    return res.sort((prev, next) => new Date(next.dateTime).getTime() - new Date(prev.dateTime).getTime());
};

export const postData = async (url, data) => {
    await fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: data
    });
};