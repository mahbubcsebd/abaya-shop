const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function getAllProduct(
    search = null,
    category = null,
    page = 1,
    perPage = 4
) {
    const res = await fetch(
        `${baseUrl}/products?search=${search}&category=${category}&page=${page}&perPage=${perPage}`,
        { cache: 'no-store' }
    );

    if (!res.ok) {
        throw new Error('Failed to fetch product');
    }

    return res.json();
}

export async function getProduct(uuid) {
    const res = await fetch(`${baseUrl}/product/${uuid}`, {
        cache: 'no-store',
    });

    if (!res.ok) {
        throw new Error('Failed to fetch product');
    }

    return res.json();
}
